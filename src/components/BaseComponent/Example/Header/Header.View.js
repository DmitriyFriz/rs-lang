// views
import BaseComponent from '../../BaseComponent';
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

    // Possible solution for a long operations.
    // If needed it can be moved to the BaseComponent
    this.loader = new Loader(parent, 'div');
    this.loader.show();

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  createLayout() {
    console.log('createLayout');
    this.component.innerHTML = getLayout(this.state);
  }

  addListeners() {
    console.log('addListeners');
    this.button = this.component.querySelector('.button');

    this.button.addEventListener('click', this.handleButtonClick);
  }

  removeListeners() {
    console.log('removeListeners');
    this.button.removeEventListener('click', this.handleButtonClick);
  }

  async prepareData() {
    console.log('prepareData');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('prepareData finish');
        this.data = 'It\'s not a real data but it shows the component lifecycle';
        this.loader.hide();
        resolve();
      }, 3000);
    });
  }

  handleButtonClick() {
    console.log('Button click handler');
  }
}

export default Header;
