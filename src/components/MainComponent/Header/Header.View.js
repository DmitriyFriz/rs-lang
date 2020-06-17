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
  }

  createLayout() {
    this.component.append(...getLayout(this.state));
  }

  addListeners() {
    this.menu = this.component.querySelector(`.${this.state.menuClassName}`);
    this.menu.addEventListener('click', this.handleMenuClick);

    this.buttonOut = this.component.querySelector(`.${this.state.logOutClassName}`);
    this.buttonOut.addEventListener('click', this.handleButtonOutClick);
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    this.buttonOut.removeEventListener('click', this.handleButtonOutClick);
  }

  handleMenuClick(event) {
    const menuItem = event.target;
    if (menuItem.classList.contains(`${this.state.menuItemClassName}`)) {
      console.log(menuItem.href);
    }
  }

  handleButtonOutClick() {
    console.log('Out');
  }
}

export default Header;
