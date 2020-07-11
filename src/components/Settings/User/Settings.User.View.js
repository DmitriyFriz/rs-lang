// lodash
import get from 'lodash.get';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import getLayout from './Settings.User.Layout';

import { BUTTONS } from '../Settings.Constants';

class SettingsUser extends BaseComponent {
  prepareData() {
    this.functionListForButtons = {
      [BUTTONS.DELETE_ACCOUNT]: () => this.deleteAccount(),
      [BUTTONS.SAVE_USER]: (event) => this.saveUserSettings(event),
    };
  }

  createLayout() {
    this.component.className = 'settings-page__user';
    this.component.innerHTML = getLayout();
  }

  addListeners() {
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.functionListForButtons[buttonFunction](event);
  }

  saveUserSettings(event) {
    event.preventDefault();
    console.log('SAVE USER PROFILE');
  }

  deleteAccount(event) {
    console.log('DELETE ACCOUNT');
  }
}

export default SettingsUser;
