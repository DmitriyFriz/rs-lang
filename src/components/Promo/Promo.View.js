// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

class Promo extends BaseComponent {
  createLayout() {
    this.component.innerHTML = `
      This is a promo page!
    `;
  }
}

export default Promo;
