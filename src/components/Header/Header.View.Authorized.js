// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS } from 'router/Router.Constants';

// layout
import { getLayout, switchActive } from './Header.Layout';

// styles
import './Header.scss';

// burger-menu
import handleBurgerButton from './Header.BurgerMenuHandler';

// user domain
import user from '../../domain-models/User/User';

class HeaderAuthorized extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.body = document.body;
    this.isAuthorized = true;

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleButtonOutClick = this.handleButtonOutClick.bind(this);
    this.handleBurgerButton = handleBurgerButton.bind(this);
    this.switchActive = switchActive.bind(this);
  }

  createLayout() {
    [
      this.menu,
      this.emailContainer,
      this.buttonOut,
      this.buttonBurgerMenu] = getLayout(this.isAuthorized, user.userName);

    this.component.className = 'header-authorized';

    this.component.append(
      this.menu, this.emailContainer, this.buttonOut, this.buttonBurgerMenu,
    );
  }

  addListeners() {
    this.menu.addEventListener('click', this.handleMenuClick);
    this.buttonOut.addEventListener('click', this.handleButtonOutClick);
    this.buttonBurgerMenu.addEventListener('input', this.handleBurgerButton);
    document.body.addEventListener('changeRoute', this.switchActive);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    this.buttonOut.removeEventListener('click', this.handleButtonOutClick);
    this.buttonBurgerMenu.removeEventListener('input', this.handleBurgerButton);
    document.body.removeEventListener('changeRoute', this.switchActive);
  }

  handleMenuClick(event) {
    this.body.removeAttribute('class');
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  handleButtonOutClick(event) {
    user.logOut();
    onRouteChangeEvent(event, ROUTERS.HEADER, ROUTERS.MAIN);
  }
}

export default HeaderAuthorized;
