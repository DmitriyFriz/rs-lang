// lodash
import get from 'lodash.get';

// constants
import { ROUTERS, SETTINGS_ROUTES } from 'router/Router.Constants';

// router
import Router from 'router/Router';
import {
  registerRouter,
  onRouteChangeEvent,
  unregisterRouter,
} from 'router/RouteHandler';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';
import SettingsMain from './Main/Settings.Main.View';
import SettingsUser from './User/Settings.User.View';
import SettingsRepetition from './Repetition/Settings.Repetition.View';

// styles
import './Settings.scss';

// layout
import { getLayout } from './Settings.Layout';

const { createElement } = BaseComponent;

class Settings extends BaseComponent {
  async prepareData() {
    const settingsRoutes = {
      [SETTINGS_ROUTES.MAIN]: SettingsMain,
      [SETTINGS_ROUTES.USER]: SettingsUser,
      [SETTINGS_ROUTES.REPETITION]: SettingsRepetition,
    };

    this.component.className = 'settings-page';
    this.root = createElement(
      {
        tag: 'div',
        className: 'settings-page__root',
        id: 'settings-root',
      },
    );
    this.component.append(this.root);

    this.settingsRouter = new Router(
      ROUTERS.SETTINGS,
      this.root,
      settingsRoutes,
      SETTINGS_ROUTES.MAIN,
    );
    registerRouter(this.settingsRouter);

    this.handleButtons = this.handleButtons.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
  }

  createLayout() {
    this.header = createElement(
      {
        tag: 'div',
        className: 'settings-page__header',
        innerHTML: getLayout(),
      },
    );
    this.component.append(this.header);
  }

  addListeners() {
    this.component.addEventListener('click', this.handleTabs);
    this.component.addEventListener('click', this.handleButtons);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleTabs);
    this.component.removeEventListener('click', this.handleButtons);
    unregisterRouter(this.settingsRouter);
  }

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.settingsRouter
      .currentRoute
      .functionListForButtons[buttonFunction](event);
  }

  handleTabs(event) {
    this.switchActive(event);
    onRouteChangeEvent(event, ROUTERS.SETTINGS);
  }

  switchActive(event) {
    const path = get(event, 'target.dataset.destination');
    if (!path) { return; }

    const items = this.header.querySelectorAll('[data-destination]');
    [...items].forEach((item) => item.classList.remove('active'));

    event.target.classList.add('active');
  }
}

export default Settings;
