// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS } from 'router/Router.Constants';

// layout
import getLayout from './Header.Layout';

// styles
import './Header.scss';

class HeaderAuthorized extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.isAuthorized = true;

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleButtonOutClick = this.handleButtonOutClick.bind(this);
  }

  createLayout() {
    [this.menu, this.logo, this.emailContainer, this.buttonOut, this.buttonBurgerMenu] = getLayout(this.isAuthorized);
    this.component.className = 'header-authorized';
    this.component.append(this.logo, this.menu, this.emailContainer, this.buttonOut, this.buttonBurgerMenu);
  }

  addListeners() {
    this.component.addEventListener('click', this.handleMenuClick);
    this.buttonOut.addEventListener('click', this.handleButtonOutClick);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    this.buttonOut.removeEventListener('click', this.handleButtonOutClick);
  }

  handleMenuClick(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  handleButtonOutClick(event) {
    onRouteChangeEvent(event, ROUTERS.HEADER);
  }
}

export default HeaderAuthorized;
