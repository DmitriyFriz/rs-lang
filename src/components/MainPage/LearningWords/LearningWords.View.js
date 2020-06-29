// lodash
import get from 'lodash.get';

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
import { getDayWordsCollection, replaceWord, addWordDifficulty, addWordToVocabulary } from './LearningWordsHandler';

// domains
import SettingsDomain from '../../../domain-models/Settings/Settings';
// import WordsDomain from '../../../domain-models/Words/Words';

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
      .map((wordData) => {
        const { word, cutWords } = wordData;
        return { word, cutWords };
      })
      .reverse();

    this.hiddenElementsList = [
      '[data-translation] .translation',
      '.swiper-slide__word',
      '.swiper-slide__difficulty-buttons',
      '.swiper-slide__vocabulary-buttons',
    ];

    this.functionListForButtons = {
      difficulty: (event) => addWordDifficulty(event, this.currentSlide.id),
      vocabulary: (event) => addWordToVocabulary(event, this.currentSlide.id),
      trueWord: () => this.showTrueWord(),
      check: () => this.checkInputWord(),
    };
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
    this.checkBtn.dataset.button = 'check';

    this.component.append(this.exitBtn, this.checkBtn);
  }

  addListeners() {
    this.checkBtn.addEventListener('click', () => this.checkInputWord());
    this.component.addEventListener('change', () => this.checkInputWord());
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  removeListeners() {
    // this.rateBlock.removeEventListener('click', handleRateBlock);
  }

  async show() {
    await super.show();
    this.swiper = new Swiper('.swiper__container', swiperOptions);

    this.swiper.on('transitionEnd', () => {
      if (this.swiper.progress === 1) {
        this.currentInput.focus();
      }
    });

    this.swiper.virtual.removeAllSlides();
    this.addWordToSwiper();
  }

  hide() {
    super.hide();
    this.swiper.destroy(true, true);
  }

  checkInputWord() {
    const { word, cutWords } = this.trueWords[this.currentIndex];

    if (this.currentInput.value === word) {
      this.addWordToSwiper();
      this.pasteWordsToTexts(cutWords);
      this.showElementsForTrueWord();
    }
    console.log(this.currentInput.value, this.currentIndex);
  }

  addWordToSwiper() {
    const wordData = this.data.pop();
    this.swiper.virtual.appendSlide(createWordCard(this.enabledSettings, wordData));
    this.swiper.update();
  }

  get currentIndex() {
    return this.swiper.activeIndex;
  }

  get currentInput() {
    return this.swiper.virtual.slides[this.currentIndex]
      .querySelector('.swiper-slide__word-input > input');
  }

  set currentInput(value) {
    this.swiper.virtual.slides[this.currentIndex]
      .querySelector('.swiper-slide__word-input > input').value = value;
  }

  get currentSlide() {
    return this.swiper.virtual.slides[this.currentIndex];
  }

  pasteWordsToTexts(words) {
    const texts = this.currentSlide.querySelectorAll('[data-cut]');

    [...texts].forEach((item) => {
      const text = item;
      const { cut } = text.dataset;
      text.innerHTML = replaceWord(text.innerHTML, words[cut]).text;
    });
  }

  showElementsForTrueWord() {
    this.hiddenElementsList.forEach((selector) => {
      const elem = this.currentSlide.querySelector(selector);
      elem.classList.add('show');
    });
  }

  showTrueWord() {
    this.currentInput = this.trueWords[this.currentIndex].word;
    this.checkInputWord();
  }

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.functionListForButtons[buttonFunction](event);
    // const activeSlide = document.querySelector('.swiper-slide-active');
    // const wordId = activeSlide.id;

    // const { data } = await wordsDomain.createUserWord(wordId, difficulty, vocabulary);
    // console.log(data);
  }
}

export default LearningWords;
