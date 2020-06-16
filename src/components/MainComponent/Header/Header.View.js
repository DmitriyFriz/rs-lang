// views
import BaseComponent from '../../BaseComponent/BaseComponent';
import Loader from '../Loader/Loader.View';

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

    this.loader = new Loader(parent, 'div');
    this.loader.show();

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleButtonOutClick = this.handleButtonOutClick.bind(this);
  }

  createLayout() {
    this.component.innerHTML = getLayout(this.state);
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

  async prepareData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data = 'It\'s not a real data but it shows the component lifecycle';
        this.loader.hide();
        resolve();
      }, 3000);
    });
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
