// views
import BaseComponent from '../BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from '../../router/RouteHandler';

// layout
import getLayout from './Header.Layout';

// constants
import { ROUTERS } from '../../router/Router.Constants';

// styles
import './Header.scss';

class HeaderGuest extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.isAuthorized = false;

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  createLayout() {
    [this.menu, this.buttonUp, this.buttonIn] = getLayout(this.isAuthorized);
    this.component.append(this.menu, this.buttonUp, this.buttonIn);
  }

  addListeners() {
    this.component.addEventListener('click', this.handleMenuClick);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
  }

  handleMenuClick(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }
}

export default HeaderGuest;
