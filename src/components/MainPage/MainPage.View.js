// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { MAIN_ROUTES } from 'router/Router.Constants';

class MainPage extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.MAIN_PAGE;
  }

  createLayout() {
    this.component.innerHTML = `
      Main Page
    `;
  }
}

export default MainPage;
