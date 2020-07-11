import get from 'lodash.get';
import SettingsDomain from '../../../domain-models/Settings/Settings';
import { DEFAULT_SETTINGS_LIST, SETTINGS } from '../Settings.Constants';

import checkValidation from '../Settings.Validator';

import { addErrorToLayout } from '../Settings.Layout';

const settingsDomain = new SettingsDomain();

async function getSettings(name = 'main') {
  const { data } = await settingsDomain.getSettings();
  const settings = get(data, `optional.${name}`);
  return settings || DEFAULT_SETTINGS_LIST[name];
}

// ================================= Save ======================================

function prepareSettingsData(list) {
  const validators = [];
  const settings = [...list].reduce((accumulator, setting) => {
    const data = accumulator;
    const [settingName] = setting.dataset.settings.split('.').reverse();
    const validatorName = get(setting, 'dataset.validator');

    if (validatorName) {
      validators.push(validatorName);
    }

    data[settingName] = setting.type === 'checkbox'
      ? setting.checked : setting.value;
    return data;
  }, {});

  return { settings, validators };
}

function checkSettings({ settings, validators }) {
  let isSuccess = true;
  let index = 0;

  while (validators[index] && isSuccess) {
    const validatorName = validators[index];

    isSuccess = checkValidation(validatorName, settings);
    if (!isSuccess) {
      addErrorToLayout(validatorName);
    }
    index += 1;
  }

  return isSuccess;
}

async function saveSettings({ name, list }) {
  const preparedSettings = prepareSettingsData(list);
  const isValid = checkSettings(preparedSettings);

  if (isValid) {
    await settingsDomain.updateSettings(name, preparedSettings.settings);
  }
}

// ================================= Load ======================================

function addSettingsToPage(elementsList, settings) {
  elementsList.forEach((item) => {
    const setting = item;
    const [settingName] = setting.dataset.settings.split('.').reverse();
    const type = setting.type === 'checkbox' ? 'checked' : 'value';
    if (settings[settingName]) {
      setting[type] = settings[settingName];
    }
  });
}

async function loadSettings({ name, list }) {
  const settings = await getSettings(name);
  addSettingsToPage([...list], settings);
}

// ================================= Handle settings ======================================

function getSettingsList(name, root) {
  let list = root.querySelectorAll('[data-settings]');
  list = [...list].filter((setting) => {
    const [nameSettings] = setting.dataset.settings.split('.');
    return nameSettings === name;
  });
  return { name, list };
}

function handleSettings(root, mode) {
  Object.keys(SETTINGS).reduce((promise, settingsName) => {
    const settings = getSettingsList(SETTINGS[settingsName], root);

    if (mode === 'save') {
      return promise.then(() => saveSettings(settings));
    }

    return promise.then(() => loadSettings(settings));
  }, Promise.resolve());
}

export { handleSettings, getSettings };
