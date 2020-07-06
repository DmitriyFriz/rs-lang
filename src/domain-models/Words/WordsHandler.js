import get from 'lodash.get';
import { DIFFICULTY, VOCABULARY } from './Words.Constants';

const TIMERS = {
  [DIFFICULTY.EASY]: 7776000000,
  [DIFFICULTY.MEDIUM]: 3888000000,
  [DIFFICULTY.HARD]: 1123200000,
  [DIFFICULTY.AGAIN]: 600000,
};

function checkWordStatus(repeatDate) {
  const date = new Date(repeatDate);
  return date < Date.now();
}

function checkGroupWordsStatus(group) {
  return group.map((word) => {
    const repeat = get(word, 'userWord.optional.repeat');
    if (!repeat) { return word; }

    const res = word;
    res.userWord.optional.repeat.status = checkWordStatus(repeat.date);
    return res;
  });
}

function registrationWord(data, difficulty, vocabulary) {
  const parameters = data;

  parameters.optional.date = Date.now();
  if (parameters.optional.amount === undefined) {
    parameters.optional.amount = 0;
  }
  parameters.optional.amount += 1;

  if (DIFFICULTY[difficulty]) {
    parameters.difficulty = difficulty;
    parameters.optional.repeat = {};
    parameters.optional.repeat.date = Date.now() + TIMERS[difficulty];
    parameters.optional.repeat.status = false;
  }
  if (VOCABULARY[vocabulary]) {
    parameters.optional.vocabulary = vocabulary;
  }

  return parameters;
}

export { checkGroupWordsStatus, registrationWord };
