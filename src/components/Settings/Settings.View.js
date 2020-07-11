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
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.SETTINGS));
  }

  removeListeners() {
    this.component.removeEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.SETTINGS));

    unregisterRouter(this.settingsRouter);
  }
}

export default Settings;
