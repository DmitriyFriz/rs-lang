// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import STATUSES from 'services/requestHandler.Statuses';
import {
  SETTINGS, NOTIFICATIONS, ERRORS_LIST, BUTTONS, VALIDATOR_GROUPS,
} from '../Settings.Constants';

// layout
import getLayout from './Settings.Repetition.Layout';

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

class SettingsRepetition extends BaseComponent {
  prepareData() {
    this.notification = new Notification(this.component, 0);
    this.functionListForButtons = {
      [BUTTONS.SAVE_REPETITION]: (event) => this.saveRepetitionSettings(event),
    };
  }

  createLayout() {
    this.component.className = 'settings-page__repetition';
    this.component.innerHTML = getLayout();
  }

  async show() {
    await super.show();

    const settings = getSettingsList(this.component);
    await loadSettings(SETTINGS.REPETITION, settings);
  }

  async saveRepetitionSettings() {
    const settingsList = getSettingsList(this.component);
    const settings = prepareSettingsData(settingsList);
    const dataList = [
      [VALIDATOR_GROUPS.TIMERS, settings],
    ];
    const { isSuccess, errorName } = checkData(dataList);

    if (!isSuccess) {
      this.notification.add(ERRORS_LIST[errorName]);
      return;
    }

    const { status } = await saveSettings(SETTINGS.REPETITION, settings);
    if (status !== STATUSES.OK) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    this.notification.add(NOTIFICATIONS.SAVED_SUCCESSFULLY);
  }
}

export default SettingsRepetition;
