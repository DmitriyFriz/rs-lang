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
import { handleWords, handleRateBlock, getDayWordsCollection } from './LearningWordsHandler';

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
    // this.rateBlock = createRateBlock();
    this.component.append(this.exitBtn, this.rateBlock);
  }

  addListeners() {
    // this.rateBlock.addEventListener('click', handleRateBlock);
  }

  removeListeners() {
    // this.rateBlock.removeEventListener('click', handleRateBlock);
  }

  async show() {
    await super.show();
    this.swiper = new Swiper('.swiper__container', swiperOptions);
    this.swiper.virtual.removeAllSlides();

    this.data.forEach((word) => {
      this.swiper.virtual.appendSlide(createWordCard(this.enabledSettings, word));
    });
    this.swiper.update();
  }

  hide() {
    super.hide();
    this.swiper.destroy(true, true);
  }
}

export default LearningWords;
