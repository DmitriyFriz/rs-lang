// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// layout
import getLayout from './Layout/StartMenu.Layout';

// constants
import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';

class StartMenu extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.START_MENU;
  }

  createLayout() {
    this.component.innerHTML = getLayout();
  }
}

export default StartMenu;
