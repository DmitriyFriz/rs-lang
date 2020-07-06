// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS } from 'router/Router.Constants';

// layout
import { getLayout, switchActive } from './Header.Layout';

// burger-menu
import handleBurgerButton from './Header.BurgerMenuHandler';

// styles
import './Header.scss';

class HeaderGuest extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.isAuthorized = false;

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleBurgerButton = handleBurgerButton.bind(this);
    this.switchActive = switchActive.bind(this);
  }

  createLayout() {
    [this.menu, this.buttonBurgerMenu, this.buttonUp, this.buttonIn] = getLayout(this.isAuthorized);
    this.component.className = 'header-guest';
    this.component.append(this.menu, this.buttonBurgerMenu, this.buttonUp, this.buttonIn);
  }

  addListeners() {
    this.component.addEventListener('click', this.handleMenuClick);
    this.buttonBurgerMenu.addEventListener('input', this.handleBurgerButton);
    document.body.addEventListener('changeRoute', this.switchActive);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    this.buttonBurgerMenu.removeEventListener('input', this.handleBurgerButton);
    document.body.removeEventListener('changeRoute', this.switchActive);
  }

  handleMenuClick(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }
}

export default HeaderGuest;
