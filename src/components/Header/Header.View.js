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
  }

  createLayout() {
    [this.menu, this.emailContainer, this.buttonOut] = getLayout(this.state);
    this.component.append(this.menu, this.emailContainer, this.buttonOut);
  }

  addListeners() {
    this.menu.addEventListener('click', this.handleMenuClick);
    this.buttonOut.addEventListener('click', this.handleButtonOutClick);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    this.buttonOut.removeEventListener('click', this.handleButtonOutClick);
  }

  handleMenuClick(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  handleButtonOutClick() {
    console.log('Out');
  }
}

export default Header;
