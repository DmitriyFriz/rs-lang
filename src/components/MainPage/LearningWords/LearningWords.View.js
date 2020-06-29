// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// Swiper
import Swiper from 'swiper';
import swiperOptions from './Swiper.Options';
import 'swiper/css/swiper.min.css';

// layout
import { getLayout, createWordCard } from './Layout/LearningWords.Layout';

// handler
import { getDayWordsCollection } from './LearningWordsHandler';

// domains
import SettingsDomain from '../../../domain-models/Settings/Settings';
import WordsDomain from '../../../domain-models/Words/Words';

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  async prepareData() {
    const settingsDomain = new SettingsDomain();
    const settingsData = await settingsDomain.getSettings();
    const { optional } = settingsData.data;
    this.enabledSettings = Object.keys(optional)
      .filter((setting) => optional[setting] === true);
    console.log(this.enabledSettings, optional);

    this.data = await getDayWordsCollection(optional);
    this.trueWords = this.data
      .map((wordData) => wordData.word)
      .reverse();
    console.log(this.trueWords);
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.component.innerHTML = getLayout();
    this.exitBtn = BaseComponent.createElement(
      {
        tag: 'button',
        className: 'button button-finish',
        id: 'exit',
        destination: 'START_MENU',
        content: 'Finish training',
      },
    );
    this.checkBtn = BaseComponent.createElement(
      {
        tag: 'button',
        className: 'button button-check-word',
        content: 'Check',
      },
    );

    this.component.append(this.exitBtn, this.checkBtn);
  }

  addListeners() {
    this.checkBtn.addEventListener('click', () => this.checkInputWord());
    this.component.addEventListener('change', () => this.checkInputWord());
  }

  removeListeners() {
    // this.rateBlock.removeEventListener('click', handleRateBlock);
  }

  async show() {
    await super.show();
    this.swiper = new Swiper('.swiper__container', swiperOptions);

    this.swiper.on('transitionEnd', () => {
      if (this.swiper.progress === 1) {
        this.addFocusToInput();
      }
    });

    this.swiper.virtual.removeAllSlides();
    this.addWordToSwiper();
    // this.data.forEach((word) => {
    //   this.swiper.virtual.appendSlide(createWordCard(this.enabledSettings, word));
    // });
    // this.swiper.update();
  }

  hide() {
    super.hide();
    this.swiper.destroy(true, true);
  }

  checkInputWord() {
    const { input, index } = this.currentSlide;
    if (input.value === this.trueWords[index]) {
      this.addWordToSwiper();
    }
    console.log(input.value, index);
  }

  addWordToSwiper() {
    const wordData = this.data.pop();
    this.swiper.virtual.appendSlide(createWordCard(this.enabledSettings, wordData));
    this.swiper.update();
  }

  get currentSlide() {
    const index = this.swiper.activeIndex;
    const input = this.swiper.virtual.slides[index]
      .querySelector('.swiper-slide__word-input > input');
    return { input, index };
  }

  addFocusToInput() {
    const { input } = this.currentSlide;
    input.focus();
  }
}

export default LearningWords;
