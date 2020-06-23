// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// Swiper
import Swiper from 'swiper';
import swiperOptions from './Swiper.Options';
import 'swiper/css/swiper.min.css';

// layout
import { getLayout } from './Layout/LearningWords.Layout';

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  createLayout() {
    this.component.innerHTML = getLayout();
    this.component.className = 'learning-words';
    this.exitBtn = BaseComponent.createElement(
      {
        tag: 'button',
        className: 'button',
        id: 'exit',
        destination: 'START_MENU',
        content: 'Finish training',
      },
    );
    this.component.append(this.exitBtn);
    this.swiper = new Swiper('.swiper__container', swiperOptions);
  }
}

export default LearningWords;
