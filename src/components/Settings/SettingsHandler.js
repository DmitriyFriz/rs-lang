import get from 'lodash.get';
import SettingsDomain from '../../domain-models/Settings/Settings';
import { DEFAULT_SETTINGS_LIST } from './Settings.Constants';

const settingsDomain = new SettingsDomain();

async function getSettings(name) {
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
