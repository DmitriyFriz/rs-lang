// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import STATUSES from 'services/requestHandler.Statuses';
import {
  SETTINGS, NOTIFICATIONS, ERRORS_LIST, BUTTONS, VALIDATOR_GROUPS, DEFAULT_SETTINGS_MAIN,
} from '../Settings.Constants';

// layout
import getLayout from './Settings.Main.Layout';
import { getConfirmLayout } from '../Settings.Layout';

// Notification
import Notification from '../../Notification/Notification.View';

// handler
import {
  getSettingsList,
  loadSettings,
  prepareSettingsData,
  checkData,
  saveSettings,
} from '../Settings.Handler';

class SettingsMain extends BaseComponent {
  prepareData() {
    this.notification = new Notification(this.component, 1);
    this.functionListForButtons = {
      [BUTTONS.SAVE_MAIN]: () => this.saveMainSettings(),
      [BUTTONS.DEFAULT_MAIN]: () => this.resetSettings(),
      [BUTTONS.CONFIRM_DEFAULT_MAIN]: () => this.confirmDefaultSettings(),
      [BUTTONS.CANCEL]: () => this.cancel(),
    };
  }

  createLayout() {
    this.component.className = 'settings-page__main';
    this.component.innerHTML = getLayout();
  }

  async show() {
    await super.show();

    const settings = getSettingsList(this.component);
    await loadSettings(SETTINGS.MAIN, settings);
  }

  async saveMainSettings() {
    const settingsList = getSettingsList(this.component);
    const settings = prepareSettingsData(settingsList);
    const dataList = [
      [VALIDATOR_GROUPS.WORDS, settings],
      [VALIDATOR_GROUPS.DISPLAYING, settings],
    ];
    const { isSuccess, errorName } = checkData(dataList);

    if (!isSuccess) {
      this.notification.add(ERRORS_LIST[errorName], 5000);
      return;
    }

    const { status } = await saveSettings(SETTINGS.MAIN, settings);
    if (status !== STATUSES.OK) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    this.notification.add(NOTIFICATIONS.MAIN_SAVED_SUCCESSFULLY, 6000);
  }

  resetSettings() {
    const html = getConfirmLayout();
    this.notification.add(html);
  }

  async confirmDefaultSettings() {
    this.notification.drop();
    const { status } = await saveSettings(SETTINGS.MAIN, DEFAULT_SETTINGS_MAIN);
    if (status !== STATUSES.OK) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    const settings = getSettingsList(this.component);
    await loadSettings(SETTINGS.MAIN, settings);
    this.notification.add(NOTIFICATIONS.SUCCESS_DEFAULT_SETTINGS, 3000);
  }

  cancel() {
    this.notification.drop();
  }
}

export default SettingsMain;
