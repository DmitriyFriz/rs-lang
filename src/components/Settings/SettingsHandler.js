import get from 'lodash.get';
import SettingsDomain from '../../domain-models/Settings/Settings';
import { DEFAULT_SETTINGS } from './Settings.Constants';

const settingsDomain = new SettingsDomain();

async function getSettings() {
  const { data } = await settingsDomain.getSettings();
  const settings = get(data, 'optional.main');
  return settings || DEFAULT_SETTINGS;
}

async function saveSettings(settingsList) {
  const settings = [...settingsList].reduce((accumulator, setting) => {
    const data = accumulator;
    const settingName = setting.dataset.settings;
    data[settingName] = setting.type === 'checkbox'
      ? setting.checked : setting.value;
    return data;
  }, {}); console.log(settings);
  await settingsDomain.updateSettings('main', settings);
}

async function loadSettings(settingsList) {
  const settings = await getSettings(); console.log(settings);

  [...settingsList].forEach((item) => {
    const setting = item;
    const settingName = setting.dataset.settings;
    const type = setting.type === 'checkbox' ? 'checked' : 'value';
    setting[type] = settings[settingName];
    return setting;
  });
}

export { saveSettings, loadSettings, getSettings };
