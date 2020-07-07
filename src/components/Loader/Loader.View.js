// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// style
import './Loader.scss';

const loader = document.querySelector('#loader');

export default class Loader extends BaseComponent {
  constructor() {
    super();

    this.parent = loader;
    this.component = document.createElement('div');
  }

  createLayout() {
    this.component.innerHTML = `
      <div class="preloader-wrapper">
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    `;
  }
}
