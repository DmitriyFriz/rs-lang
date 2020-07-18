// Swiper
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import { getLayout, addAvatars } from './Promo.Layout';

// style
import './Promo.scss';

class Promo extends BaseComponent {
  createLayout() {
    this.component.innerHTML = getLayout();
    addAvatars(this.component);
  }

  async show() {
    await super.show();

    return new Swiper('.promo-container', {
      speed: 1200,
      parallax: true,
      direction: 'vertical',
      touchEventsTarget: 'container',
      mousewheel: {
        invert: false,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
      },
      autoplay: {
        delay: 7000,
      },
      keyboard: {
        enabled: true,
      },
    });
  }
}

export default Promo;
