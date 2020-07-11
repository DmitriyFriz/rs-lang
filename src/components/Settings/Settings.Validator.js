import { DIFFICULTY } from '../../domain-models/Words/Words.Constants';

import {
  VALIDATOR_GROUPS,
  SETTINGS_MAIN,
} from './Settings.Constants';

function checkWords(data) {
  if (+data[SETTINGS_MAIN.NEW_WORDS] > +data[SETTINGS_MAIN.WORDS_PER_DAY]) {
    return false;
  }
  return true;
}

function checkDisplaying(data) {
  const example = data[SETTINGS_MAIN.EXAMPLE];
  const meaning = data[SETTINGS_MAIN.MEANING];
  if (!example && !meaning) {
    return false;
  }
  return true;
}

function checkTimers(data) {
  let isFail = false;
  [
    +data[DIFFICULTY.EASY],
    +data[DIFFICULTY.MEDIUM],
    +data[DIFFICULTY.HARD],
    +data[DIFFICULTY.AGAIN],
  ].forEach((timer) => {
    if (isFail) { return; }
    if (!timer || timer < 0) {
      isFail = true;
    }
  });

  return !isFail;
}

const validatorList = {
  [VALIDATOR_GROUPS.WORDS]: (data) => checkWords(data),
  [VALIDATOR_GROUPS.DISPLAYING]: (data) => checkDisplaying(data),
  [VALIDATOR_GROUPS.TIMERS]: (data) => checkTimers(data),
};

function checkValidation(validationName, data) {
  if (!validationName) { return true; }
  const res = validatorList[validationName](data);
  return res;
}

export default checkValidation;
