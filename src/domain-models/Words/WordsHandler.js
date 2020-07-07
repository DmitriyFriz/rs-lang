import get from 'lodash.get';
import {
  DIFFICULTY,
  VOCABULARY,
  OPTIONAL,
  REPEAT,
  REPEAT_INTERVAL,
} from './Words.Constants';

const MILLISECONDS_OF_DAY = 86400000;

// ================== Interval repetition method ======================

function getChangeForgettingSpeed(forgettingSpeed = 0.5, number) {
  return forgettingSpeed ** number;
}

function getMemoryRating(rating = 0.9) {
  return Math.log(rating);
}

function getDayOfRepeat(rating, forgettingSpeed, number) {
  return (getMemoryRating(rating) / getChangeForgettingSpeed(forgettingSpeed, number)) ** 2;
}

// ====================================================================

function checkWordStatus(repeatDate) {
  const date = new Date(repeatDate);
  return date < Date.now();
}

function checkGroupWordsStatus(group) {
  return group.map((word) => {
    const repeat = get(word, `userWord.optional.${[OPTIONAL.REPEAT]}`);
    if (!repeat) { return word; }

    const res = word;
    res
      .userWord
      .optional[OPTIONAL.REPEAT][REPEAT.STATUS] = checkWordStatus(repeat[REPEAT.DATE]);
    return res;
  });
}

function updateRepeatParameters(date) {
  const updateParameters = {
    [REPEAT.DATE]: Date.now() + date,
    [REPEAT.STATUS]: false,
  };
  return updateParameters;
}

// ====================== registration word =============================

function registrationWord(
  data,
  difficulty,
  vocabulary,
  options,
) {
  const parameters = data;

  parameters.optional[OPTIONAL.DATE] = Date.now();
  if (parameters.optional[OPTIONAL.AMOUNT] === undefined) {
    parameters.optional[OPTIONAL.AMOUNT] = 0;
  }
  parameters.optional[OPTIONAL.AMOUNT] += 1;

  const forgettingSpeed = options[REPEAT_INTERVAL.FORGETTING_SPEED];
  const rating = options[REPEAT_INTERVAL.RATING];
  const maxAmount = options[REPEAT_INTERVAL.MAX_AMOUNT];
  let amount = parameters.optional[OPTIONAL.AMOUNT];
  amount = (amount > maxAmount ? maxAmount : amount);

  const date = MILLISECONDS_OF_DAY * getDayOfRepeat(
    rating, forgettingSpeed, amount,
  );
  parameters.optional[OPTIONAL.REPEAT] = updateRepeatParameters(date);

  if (DIFFICULTY[difficulty]) {
    parameters.difficulty = difficulty;
    parameters.optional[OPTIONAL.REPEAT] = updateRepeatParameters(
      options[REPEAT_INTERVAL.TIMERS][DIFFICULTY[difficulty]],
    );
  }

  if (VOCABULARY[vocabulary]) {
    parameters.optional[OPTIONAL.VOCABULARY] = vocabulary;
  }

  return parameters;
}

export { checkGroupWordsStatus, registrationWord };
