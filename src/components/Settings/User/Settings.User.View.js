// constants
import STATUSES from 'services/requestHandler.Statuses';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';
import Loader from 'components/Loader/Loader.View';
import Notification from 'components/Notification/Notification.View';

// layout
import { getLayout, getLayoutOfConfirmDelete } from 'components/Settings/User/Settings.User.Layout';

// constants
import {
  BUTTONS, VALIDATOR_GROUPS, NOTIFICATIONS, ERRORS_LIST,
} from 'components/Settings/Settings.Constants';

// User domain
import UserDomain from 'domainModels/User/User';

// handler
import { checkData } from 'components/Settings/Settings.Handler';
import { changeRoute } from 'router/RouteHandler';
import { MAIN_ROUTES, ROUTERS } from 'router/Router.Constants';

// Style
import './Settings.User.scss';

class SettingsUser extends BaseComponent {
  prepareData() {
    this.notification = new Notification(this.component, 1);
    this.functionListForButtons = {
      [BUTTONS.DELETE_ACCOUNT]: () => this.deleteAccount(),
      [BUTTONS.CONFIRM_DELETE_ACCOUNT]: () => this.confirmDeleteAccount(),
      [BUTTONS.CANCEL_DELETE_ACCOUNT]: () => this.cancelDeleteAccount(),
      [BUTTONS.SAVE_USER]: (event) => this.saveUserSettings(event),
    };
    this.loader = new Loader();
  }

  createLayout() {
    this.component.className = 'settings-page__user';
    this.component.innerHTML = getLayout();
  }

  async saveUserSettings(event) {
    event.preventDefault();
    await this.loader.show();

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

    const dataList = [
      [VALIDATOR_GROUPS.EMAIL, this.email],
      [VALIDATOR_GROUPS.PASSWORD, this.password],
      [VALIDATOR_GROUPS.CONFIRM_PASSWORD, {
        password: this.password,
        confirmedPassword: this.confirmedPassword,
      }],
    ];
    const { isSuccess, errorName } = checkData(dataList);

    if (!isSuccess) {
      this.loader.hide();
      this.notification.add(ERRORS_LIST[errorName], 5000);
      return;
    }

    const { status } = await UserDomain.update(
      {
        email: this.email,
        password: this.password,
      },
    );
    if (status !== STATUSES.OK) {
      this.loader.hide();
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    this.loader.hide();
    this.notification.add(NOTIFICATIONS.SAVED_SUCCESSFULLY, 2000);
  }

  deleteAccount() {
    const html = getLayoutOfConfirmDelete();
    this.notification.add(html);
  }

  cancelDeleteAccount() {
    this.notification.drop();
  }

  async confirmDeleteAccount() {
    this.notification.drop();
    this.loader.show();
    const { status } = await UserDomain.remove();

    if (status !== STATUSES.NO_CONTENT) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      this.loader.hide();
      return;
    }
    this.loader.hide();
    changeRoute(MAIN_ROUTES.PROMO, ROUTERS.MAIN, ROUTERS.HEADER);
  }
}

export default SettingsUser;
