// lodash
import get from 'lodash.get';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import getLayout from './Settings.User.Layout';
import { addErrorToLayout } from '../Settings.Layout';

// validator
import checkValidation from '../Settings.Validator';

// constants
import { BUTTONS, VALIDATOR_GROUPS } from '../Settings.Constants';

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
    this.email = document.forms
      .updatedUserData
      .updatedEmail
      .value;
    this.password = document.forms
      .updatedUserData
      .updatedPassword
      .value;
    this.confirmedPassword = document.forms
      .updatedUserData
      .updatedConfirmPassword
      .value;

    this.checkData();

    console.log('SAVE USER PROFILE');
  }

  deleteAccount(event) {
    console.log('DELETE ACCOUNT');
  }

  checkData() {
    let isSuccess = true;

    [
      [VALIDATOR_GROUPS.EMAIL, this.email],
      [VALIDATOR_GROUPS.PASSWORD, this.password],
      [VALIDATOR_GROUPS.CONFIRM_PASSWORD, {
        password: this.password,
        confirmedPassword: this.confirmedPassword,
      }],
    ].forEach((item) => {
      if (!isSuccess) { return; }
      const [name, data] = item;
      isSuccess = checkValidation(name, data);

      if (!isSuccess) {
        addErrorToLayout(name);
      }
    });

    return isSuccess;
  }
}

export default SettingsUser;
