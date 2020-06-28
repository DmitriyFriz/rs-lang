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

class Settings extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.SETTINGS;
  }

  get settingsList() {
    return this.component.querySelectorAll('[data-settings]');
  }

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
    this.saveBtn.addEventListener('click', () => saveSettings(this.settingsList));
  }

  removeListeners() {
  }

  async show() {
    await super.show();
    await loadSettings(this.settingsList);
  }
}

export default Settings;
