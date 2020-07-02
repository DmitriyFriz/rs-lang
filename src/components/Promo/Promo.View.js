// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { MAIN_ROUTES } from 'router/Router.Constants';

class Promo extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.PROMO;
  }

  createLayout() {
    this.component.innerHTML = `
      This is a promo page!
    `;
  }
}

export default Promo;
