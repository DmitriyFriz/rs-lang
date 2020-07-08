import get from 'lodash.get';
import SettingsDomain from '../../domain-models/Settings/Settings';
import { DIFFICULTY } from '../../domain-models/Words/Words.Constants';
import {
  DEFAULT_SETTINGS_LIST,
  CHECKING_GROUPS,
  SETTINGS_MAIN,
  ERRORS_LIST,
  SETTINGS,
} from './Settings.Constants';
import BaseComponent from '../BaseComponent/BaseComponent';

const settingsDomain = new SettingsDomain();
const { createElement } = BaseComponent;

// ========================= check settings =============================

function addError(checkingGroup) {
  const errorBlock = document
    .querySelector(`[data-check=${checkingGroup}]`)
    .parentNode;
  errorBlock.classList.add('error');

  const errorDescription = createElement({
    tag: 'p',
    content: ERRORS_LIST[checkingGroup],
    className: 'error',
  });
  errorBlock.append(errorDescription);

  errorBlock.addEventListener('animationend', () => {
    errorBlock.classList.remove('error');
    errorDescription.remove();
  }, { once: true });
}

function checkMainSettings(data) {
  if (+data[SETTINGS_MAIN.NEW_WORDS] > +data[SETTINGS_MAIN.WORDS_PER_DAY]) {
    addError(CHECKING_GROUPS.WORDS);
    return false;
  }

  const example = data[SETTINGS_MAIN.EXAMPLE];
  const meaning = data[SETTINGS_MAIN.MEANING];
  if (!example && !meaning) {
    addError(CHECKING_GROUPS.DISPLAY);
    return false;
  }

  return true;
}

function checkRepeatedSettings(data) {
  let isFail = false;
  [
    +data[DIFFICULTY.EASY],
    +data[DIFFICULTY.MEDIUM],
    +data[DIFFICULTY.HARD],
    +data[DIFFICULTY.AGAIN],
  ].forEach((timer) => {
    if (isFail) { return; }
    if (!timer || timer < 0) {
      addError(CHECKING_GROUPS.TIMERS);
      isFail = true;
    }
  });

  return !isFail;
}

const checkingList = {
  [SETTINGS.MAIN]: (data) => checkMainSettings(data),
  [SETTINGS.REPETITION]: (data) => checkRepeatedSettings(data),
};

// =======================================================================

async function getSettings(name = 'main') {
  const { data } = await settingsDomain.getSettings();
  const settings = get(data, `optional.${name}`);
  return settings || DEFAULT_SETTINGS_LIST[name];
}

async function saveSettings({ name, list }) {
  const settings = [...list].reduce((accumulator, setting) => {
    const data = accumulator;
    const [settingName] = setting.dataset.settings.split('.').reverse();

    data[settingName] = setting.type === 'checkbox'
      ? setting.checked : setting.value;
    return data;
  }, {});

  const isSuccess = checkingList[name](settings);
  if (!isSuccess) { return; }

  await settingsDomain.updateSettings(name, settings);
}

async function loadSettings({ name, list }) {
  const settings = await getSettings(name);

  [...list].forEach((item) => {
    const setting = item;
    const [settingName] = setting.dataset.settings.split('.').reverse();
    const type = setting.type === 'checkbox' ? 'checked' : 'value';

    setting[type] = settings[settingName];
    return setting;
  });
}

export { saveSettings, loadSettings, getSettings };
