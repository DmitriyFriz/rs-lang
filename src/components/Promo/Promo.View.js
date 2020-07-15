// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import getLayout from './Promo.Layout';

// style
import './Promo.scss';

// Swiper
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';

class Promo extends BaseComponent {
  createLayout() {
    this.component.innerHTML = getLayout();
  }

  async show() {
    await super.show();

    new Swiper('.promo-container', {
      speed: 600,
      parallax: true,
      // grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

export default Promo;
