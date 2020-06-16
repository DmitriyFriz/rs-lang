import BaseComponent from '../../BaseComponent';

export default class Loader extends BaseComponent {
  createLayout() {
    this.component.innerHTML = 'Loading';
  }
}
