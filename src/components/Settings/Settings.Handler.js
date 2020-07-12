import get from 'lodash.get';
import SettingsDomain from '../../domain-models/Settings/Settings';
import { DEFAULT_SETTINGS_LIST } from './Settings.Constants';

import checkValidation from './Settings.Validator';

import { addErrorToLayout } from './Settings.Layout';

const settingsDomain = new SettingsDomain();

async function getSettings(name = 'main') {
  const { data } = await settingsDomain.getSettings();
  const settings = get(data, `optional.${name}`);
  return settings || DEFAULT_SETTINGS_LIST[name];
}

// ================================= Save ======================================

function prepareSettingsData(list) {
  const settings = [...list].reduce((accumulator, setting) => {
    const data = accumulator;
    const settingName = setting.dataset.settings;
    data[settingName] = setting.type === 'checkbox'
      ? setting.checked : setting.value;
    return data;
  }, {});

  return settings;
}

function checkData(dataList) {
  let isSuccess = true;
  let errorName;

  dataList.forEach((item) => {
    if (!isSuccess) { return; }
    const [name, data] = item;
    isSuccess = checkValidation(name, data);

    if (!isSuccess) {
      addErrorToLayout(name);
      errorName = name;
    }
  });

  return { isSuccess, errorName };
}

async function saveSettings(name, settings) {
  return settingsDomain.updateSettings(name, settings);
}

// ================================= Load ======================================

function addSettingsToPage(elementsList, settings) {
  elementsList.forEach((item) => {
    const setting = item;
    const settingName = setting.dataset.settings;
    const type = setting.type === 'checkbox' ? 'checked' : 'value';
    if (settings[settingName]) {
      setting[type] = settings[settingName];
    }
  });
}

async function loadSettings(name, list) {
  const settings = await getSettings(name);
  addSettingsToPage([...list], settings);
}

function getSettingsList(root) {
  return root.querySelectorAll('[data-settings]');
}

export {
  getSettings,
  getSettingsList,
  addSettingsToPage,
  prepareSettingsData,
  loadSettings,
  saveSettings,
  checkData,
};
