// lodash
import get from 'lodash.get';

// router
import { changeRoute } from 'router/RouteHandler';

// constants
import { ROUTERS, SETTINGS_ROUTES } from 'router/Router.Constants';
import STATUSES from 'services/requestHandler.Statuses';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import { getLayout, getLayoutOfConfirmDelete, getNotificationLayout } from './Settings.User.Layout';
import { addErrorToLayout } from '../Settings.Layout';

// validator
import checkValidation from '../Settings.Validator';

// constants
import { BUTTONS, VALIDATOR_GROUPS } from '../Settings.Constants';
import { MAIN_ROUTES, HEADER_ROUTES } from '../../../router/Router.Constants';

// User
import UserDomain from '../../../domain-models/User/User';

class SettingsUser extends BaseComponent {
  prepareData() {
    this.functionListForButtons = {
      [BUTTONS.DELETE_ACCOUNT]: () => this.deleteAccount(),
      [BUTTONS.CONFIRM_DELETE_ACCOUNT]: () => this.confirmDeleteAccount(),
      [BUTTONS.CANCEL_DELETE_ACCOUNT]: () => this.cancelDeleteAccount(),
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

  async saveUserSettings(event) {
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

    const isValid = this.checkData();
    if (!isValid) { return; }

    const { status, statusText } = await UserDomain.update({
      email: this.email,
      password: this.password,
    });

    if (status !== STATUSES.OK) {
      getNotificationLayout(this.component, statusText);
    }
    console.log('UPDATE COMPLETED === ', status);
  }

  deleteAccount() {
    this.layoutOfConfirmDelete = getLayoutOfConfirmDelete();
    this.component.append(this.layoutOfConfirmDelete);
    console.log('DELETE ACCOUNT');
  }

  cancelDeleteAccount() {
    this.layoutOfConfirmDelete.remove();
  }

  async confirmDeleteAccount() {
    await UserDomain.remove();
    console.log('USER DELETED');
    changeRoute(MAIN_ROUTES.PROMO, ROUTERS.MAIN, ROUTERS.HEADER);
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
