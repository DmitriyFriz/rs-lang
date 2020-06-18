// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// layout
import getLayout from './Header.Layout';

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
    this.component.append(...getLayout(this.state));
  }

  addListeners() {
    this.menu = this.component.querySelector(`.${this.state.menuClassName}`);
    this.menu.addEventListener('click', this.handleMenuClick);

    if (this.state.isAuthorized) {
      this.buttonOut = this.component.querySelector(`#${this.state.buttonId.logOut}`);
      this.buttonOut.addEventListener('click', this.handleButtonOutClick);
    } else {
      this.buttonIn = this.component.querySelector(`#${this.state.buttonId.signIn}`);
      this.buttonIn.addEventListener('click', this.handleButtonInClick);

      this.buttonUp = this.component.querySelector(`#${this.state.buttonId.signUp}`);
      this.buttonUp.addEventListener('click', this.handleButtonUpClick);
    }
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
    const menuItem = event.target;
    if (menuItem.classList.contains(`${this.state.menuItemClassName}`)) {
      console.log(menuItem.href);
    }
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
