// lodash
import get from 'lodash.get';
import isEqual from 'lodash.isequal';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// Swiper
import Swiper from 'swiper';
import swiperOptions from './Swiper.Options';
import 'swiper/css/swiper.min.css';

// layout
import { getMainLayout, createWordCard, createCompletionNotice } from './Layout/LearningWords.Layout';

// Settings
import { getSettings } from '../../Settings/SettingsHandler';
import { SETTINGS } from '../../Settings/Settings.Constants';

// handler
import {
  getDayWordsCollection,
  addWordDifficulty,
  addWordToVocabulary,
  getTrueWords,
} from './LearningWordsHandler';

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  async prepareData() {
    this.isRandomMode = false;
    this.settings = await this.handleSettings();
    await this.initWordsCollection();

    this.hiddenElementsList = [
      '#card-meaning-translation',
      '#card-example-translation',
      '#card-word-translation',
      '#card-word',
      '#card-difficulty',
      '#card-vocabulary',
    ];

    this.functionListForButtons = {
      difficulty: (event) => addWordDifficulty(event, this.currentSlide.id),
      vocabulary: (event) => addWordToVocabulary(event, this.currentSlide.id),
      trueWord: () => this.showTrueWord(),
      check: () => this.checkInputWord(),
      additional: () => this.createAdditionalTraining(),
      randomWords: () => this.createRandomWordsTraining(),
    };
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.component.innerHTML = getMainLayout();

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
        dataset: {
          button: 'check',
        },
      },
    );

    this.component.append(this.exitBtn, this.checkBtn);
  }

  addListeners() {
    this.component.addEventListener('change', () => this.checkInputWord());
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  removeListeners() {
  }

  async show() {
    await super.show();
    this.initSwiper();
    if (this.isEnd) {
      this.completionNotice = createCompletionNotice();
      this.component.append(this.completionNotice);
      return;
    }

    this.addWordToSwiper();
  }

  hide() {
    super.hide();
    this.swiper.destroy(true, true);
    if (!this.isRandomMode) { this.savedWords = this.wordsCollection; }
    console.log('SAVED WORDS', this.savedWords);
  }

  // ========================== swiper ==================================

  initSwiper() {
    this.swiper = new Swiper('.swiper__container', swiperOptions);
    this.swiper.on('transitionEnd', () => {
      if (this.swiper.progress === 1) {
        this.currentInput.focus();
      }
    });
    this.swiper.virtual.removeAllSlides();
  }

  addWordToSwiper() {
    if (this.isEnd) { return; }
    const wordData = this.wordsCollection.pop();
    this.swiper.virtual.appendSlide(
      createWordCard(this.settings.enabled, wordData),
    );
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

  // ========================== layout ==================================

  pasteWordsToTexts(words) {
    const texts = this.currentSlide.querySelectorAll('[data-cut]');

    [...texts].forEach((item) => {
      const text = item;
      const { cut } = text.dataset;
      text.innerHTML = text.innerHTML.replace(/\.{3}/, words[cut]);
    });
  }

  showElementsForTrueWord() {
    this.hiddenElementsList.forEach((selector) => {
      const elem = this.currentSlide.querySelector(selector);
      if (elem) { elem.classList.add('show'); }
    });
  }

  showTrueWord() {
    this.currentInput = this.trueWords[this.currentIndex].word;
    this.checkInputWord();
  }

  get header() {
    return document.querySelector('header');
  }

  // ========================== words ==================================

  async initWordsCollection() {
    if (this.savedWords && !this.settings.isNew) {
      this.getSavedWords();
      return;
    }
    await this.createWordsCollection();
  }

  async createWordsCollection(settings = this.settings.all) {
    this.wordsCollection = await getDayWordsCollection(settings);
    this.trueWords = getTrueWords(this.wordsCollection);
  }

  getSavedWords() {
    this.wordsCollection = this.savedWords;
    this.trueWords = getTrueWords(this.wordsCollection);
  }

  checkInputWord() {
    const { word, cutWords } = this.trueWords[this.currentIndex];

    if (this.currentInput.value === word) {
      this.addWordToSwiper();
      this.pasteWordsToTexts(cutWords);
      this.showElementsForTrueWord();
    }
  }

  get isEnd() {
    return !this.wordsCollection.length;
  }

  get savedWords() {
    return JSON.parse(localStorage.getItem('savedWords'));
  }

  set savedWords(value) {
    localStorage.setItem('savedWords', JSON.stringify(value));
  }

  // ========================== settings ===============================

  async handleSettings() {
    const all = await getSettings();
    const enabled = Object.keys(all)
      .filter((setting) => all[setting] === true);

    if (!this.savedSettings) { this.savedSettings = all; }
    const isNew = !isEqual(all, this.savedSettings);

    if (isNew) { console.log('SAVED SETTINGS!'); this.savedSettings = all; }
    return { enabled, all, isNew };
  }

  get savedSettings() {
    return JSON.parse(localStorage.getItem('savedSettings'));
  }

  set savedSettings(value) {
    localStorage.setItem('savedSettings', JSON.stringify(value));
  }

  // ========================== other ==================================

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.functionListForButtons[buttonFunction](event);
  }

  async createAdditionalTraining() {
    this.component.removeChild(this.completionNotice);
    await this.createWordsCollection();
    this.addWordToSwiper();
  }

  async createRandomWordsTraining() {
    this.component.removeChild(this.completionNotice);
    const settings = this.settings.all;
    settings[SETTINGS.COLLECTION_WORDS_MODE] = 'random';
    this.isRandomMode = true;

    await this.createWordsCollection(settings);
    this.addWordToSwiper();
  }
}

export default LearningWords;
