// constants
import { MAIN_ROUTES } from 'router/Router.Constants';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// styles
import './Settings.scss';

// layout
import getLayout from './Settings.Layout';

// handler
import { saveSettings, loadSettings } from './SettingsHandler';

import { SETTINGS } from './Settings.Constants';

class Settings extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.SETTINGS;
  }

  // get mainSettingsList() {
  //   const list = this.component.querySelectorAll(`[data-settings-${SETTINGS.MAIN}]`);
  //   return { name: SETTINGS_MAIN, list };
  // }

  // get repetitionSettingsList() {
  //   const list = this.component.querySelectorAll(`[data-settings-${SETTINGS.REPETITION}]`);
  //   return { name: SETTINGS_REPETITION, list };
  // }

  createLayout() {
    this.component.className = 'Settings';
    this.component.innerHTML = getLayout();
    this.saveBtn = BaseComponent.createElement({
      tag: 'button',
      className: 'button button-save-settings',
      content: 'Save',
    });
    this.component.append(this.saveBtn);
  }

  addListeners() {
    this.saveBtn.addEventListener('click', () => this.handleSettings('save'));
  }

  removeListeners() {
  }

  async show() {
    await super.show();
    await this.handleSettings();
  }

  getSettingsList(name) {
    let list = this.component.querySelectorAll('[data-settings]');
    list = [...list].filter((setting) => {
      const [nameSettings] = setting.dataset.settings.split('.');
      return nameSettings === name;
    });
    return { name, list };
  }

  async handleSettings(mode) {
    const promises = Object.keys(SETTINGS).map(async (settingsName) => {
      const settings = this.getSettingsList(SETTINGS[settingsName]);
      if (mode === 'save') {
        await saveSettings(settings);
        return;
      }
      await loadSettings(settings);
    });

    await Promise.all(promises);
  }

  // async handleLoadSettings() {
  //   const promises = Object.keys(SETTINGS).map(async (settingsName) => {
  //     const settings = this.getSettingsList(SETTINGS[settingsName]);
  //     await loadSettings(settings);
  //   });

  //   await Promise.all(promises);
  // }
}

export default Settings;
