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

class Header extends BaseComponent {
  constructor(parent, tagName, options) {
    super(parent, tagName);

    this.state = {
      ...options,
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleButtonOutClick = this.handleButtonOutClick.bind(this);
    this.handleButtonInClick = this.handleButtonInClick.bind(this);
    this.handleButtonUpClick = this.handleButtonUpClick.bind(this);
  }

  createLayout() {
    [this.logo, this.menu, this.emailContainer, this.buttonOut] = getLayout(this.state);
    this.component.append(this.logo, this.menu, this.emailContainer, this.buttonOut);
  }

  addListeners() {
    this.menu.addEventListener('click', this.handleMenuClick);
    this.buttonOut.addEventListener('click', this.handleButtonOutClick);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    if (this.state.isAuthorized) {
      this.buttonOut.removeEventListener('click', this.handleButtonOutClick);
    } else {
      this.buttonIn.removeEventListener('click', this.handleButtonInClick);
      this.buttonUp.removeEventListener('click', this.handleButtonUpClick);
    }
  }

  reShow(authorizedStation) {
    this.hide();
    this.state.isAuthorized = authorizedStation;
    this.component.innerHTML = '';
    this.show();
  }

  handleMenuClick(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  handleButtonOutClick() {
    this.reShow(false);
  }

  handleButtonInClick() {
    this.reShow(true);
  }

  handleButtonUpClick() {
    console.log('Sign Up');
  }
}

export default Header;
