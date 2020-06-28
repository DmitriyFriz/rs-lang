import SettingsDomain from '../../domain-models/Settings/Settings';

const settingsDomain = new SettingsDomain();

async function saveSettings(settingsList) {
  const optional = [...settingsList].reduce((accumulator, setting) => {
    const data = accumulator;
    const settingName = setting.dataset.settings;
    data[settingName] = setting.type === 'checkbox'
      ? setting.checked : +setting.value;
    return data;
  }, {});

  await settingsDomain.updateSettings({ optional });
}

async function loadSettings(settingsList) {
  const { data } = await settingsDomain.getSettings();

  [...settingsList].forEach((item) => {
    const setting = item;
    const settingName = setting.dataset.settings;
    const type = setting.type === 'checkbox' ? 'checked' : 'value';
    setting[type] = data.optional[settingName];
    return data;
  });
}

export { saveSettings, loadSettings };
