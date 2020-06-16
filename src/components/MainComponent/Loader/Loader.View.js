import BaseComponent from '../../BaseComponent/BaseComponent';

export default class Loader extends BaseComponent {
  createLayout() {
    this.component.innerHTML = 'Loading';
  }
}
