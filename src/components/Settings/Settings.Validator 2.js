import { DIFFICULTY } from 'domainModels/Words/Words.Constants';

import {
  VALIDATOR_GROUPS,
  SETTINGS_MAIN,
} from './Settings.Constants';

import { regEmailRegExp, regPasswordRegEx } from '../Authorization/RegisterPage/RegisterPage.Data';

function checkWords(data) {
  let isFail = false;
  if (+data[SETTINGS_MAIN.NEW_WORDS] > +data[SETTINGS_MAIN.WORDS_PER_DAY]) {
    return isFail;
  }

  [
    +data[SETTINGS_MAIN.NEW_WORDS],
    +data[SETTINGS_MAIN.WORDS_PER_DAY],
  ].forEach((words) => {
    if (isFail) { return; }
    if (!words || words < 0) {
      isFail = true;
    }
  });

  return !isFail;
}

function checkDisplaying(data) {
  const example = data[SETTINGS_MAIN.EXAMPLE];
  const meaning = data[SETTINGS_MAIN.MEANING];
  const wordTranslation = data[SETTINGS_MAIN.WORD_TRANSLATION];
  if (!example && !meaning && !wordTranslation) {
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

function checkEmail(email) {
  const regExp = new RegExp(regEmailRegExp);
  return regExp.test(email);
}

function checkPassword(password) {
  const regExp = new RegExp(regPasswordRegEx);
  return regExp.test(password);
}

function checkConfirmedPassword({ password, confirmedPassword }) {
  return password === confirmedPassword;
}

const validatorList = {
  [VALIDATOR_GROUPS.WORDS]: (data) => checkWords(data),
  [VALIDATOR_GROUPS.DISPLAYING]: (data) => checkDisplaying(data),
  [VALIDATOR_GROUPS.TIMERS]: (data) => checkTimers(data),
  [VALIDATOR_GROUPS.EMAIL]: (email) => checkEmail(email),
  [VALIDATOR_GROUPS.PASSWORD]: (password) => checkPassword(password),
  [VALIDATOR_GROUPS.CONFIRM_PASSWORD]:
    (data) => checkConfirmedPassword(data),
};

function checkValidation(validationName, data) {
  if (!validationName) { return true; }
  const res = validatorList[validationName](data);
  return res;
}

export default checkValidation;
