// constants
import { MAIN_ROUTES } from 'router/Router.Constants';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// styles
import './Settings.scss';

// layout
import getLayout from './Settings.Layout';

class Settings extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.SETTINGS;
  }

  createLayout() {
    this.component.className = 'Settings';
    this.component.innerHTML = getLayout();
  }

  addListeners() {

  }

  removeListeners() {
  }
}

export default Settings;
