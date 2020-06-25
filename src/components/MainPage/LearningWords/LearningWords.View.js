// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// Swiper
import Swiper from 'swiper';
import swiperOptions from './Swiper.Options';
import 'swiper/css/swiper.min.css';

// layout
import { getLayout, createWordCard, createDifficultyButtons } from './Layout/LearningWords.Layout';

// handler
import { getWords, handleDifficultyButtons } from './LearningWordsHandler';

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.component.innerHTML = getLayout();
    this.exitBtn = BaseComponent.createElement(
      {
        tag: 'button',
        className: 'button',
        id: 'exit',
        destination: 'START_MENU',
        content: 'Finish training',
      },
    );
    this.difficultyBlock = createDifficultyButtons();
    this.component.append(this.exitBtn, this.difficultyBlock);
  }

  addListeners() {
    this.difficultyBlock.addEventListener('click', handleDifficultyButtons);
  }

  removeListeners() {
    this.difficultyBlock.removeEventListener('click', handleDifficultyButtons);
  }

  async prepareData() {
    this.data = await getWords();
  }

  async show() {
    await super.show();
    this.swiper = new Swiper('.swiper__container', swiperOptions);
    this.swiper.virtual.removeAllSlides();

    this.data.forEach((word) => {
      this.swiper.virtual.appendSlide(createWordCard(word));
    });
    this.swiper.update();
  }

  hide() {
    super.hide();
    this.swiper.destroy(true, true);
  }
}

export default LearningWords;
