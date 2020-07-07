// lodash
import get from 'lodash.get';
import isEqual from 'lodash.isequal';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// Swiper
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import swiperOptions from 'components/MainPage/LearningWords/Swiper.Options';

// constants
import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';
import { BUTTONS, HIDDEN_ELEMENTS_LIST } from './LearningWords.Constants';

// layout
import {
  createWordCard, createCompletionNotice, createBlock,
} from './Layout/LearningWords.Layout';
import { data } from './Layout/LearningWords.Data';

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

const { createElement } = BaseComponent;

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  async prepareData() {
    this.isRandomMode = false;
    this.settings = await this.handleSettings();
    await this.initWordsCollection();

    this.functionListForButtons = {
      [BUTTONS.DIFFICULTY]: (event) => addWordDifficulty(event, this.currentSlide.id),
      [BUTTONS.VOCABULARY]: (event) => addWordToVocabulary(event, this.currentSlide.id),
      [BUTTONS.TRUE_WORD]: () => this.showTrueWord(),
      [BUTTONS.CHECK]: () => this.checkInputWord(),
      [BUTTONS.ADDITIONAL]: () => this.createAdditionalTraining(),
      [BUTTONS.RANDOM_WORDS]: () => this.createRandomWordsTraining(),
      [BUTTONS.FINISH]: () => this.finishTraining(),
      [BUTTONS.AGAIN]: () => this.repeatWord(),
    };
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.training = createElement(data.training.parent);
    this.swiperLayout = createBlock('swiper');
  }

  addListeners() {
    this.component.addEventListener('change', () => this.checkInputWord());
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  removeListeners() {
  }

  async show() {
    await super.show();
    this.initTraining();
  }

  hide() {
    super.hide();
    if (!this.isEnd) {
      this.endTraining();
    }
    console.log('SAVED WORDS', this.savedWords);
  }

  // ========================== swiper ==================================

  initSwiper() {
    this.training.append(this.swiperLayout);
    this.swiper = new Swiper('.swiper__container', swiperOptions);
    this.swiper.on('transitionEnd', () => {
      if (this.swiper.progress === 1) {
        this.currentInput.focus();
      }
    });
    this.swiper.virtual.removeAllSlides();
  }

  destroySwiper() {
    this.swiper.destroy(true, true);
    this.swiperLayout.remove();
  }

  addWordToSwiper() {
    if (this.isEnd) { return; }
    this.currentSlideData = this.wordsCollection.pop();
    this.swiper.virtual.appendSlide(
      createWordCard(this.settings.enabled, this.currentSlideData),
    );
    this.swiper.update();
  }

  get currentIndex() {
    return get(this, 'swiper.activeIndex') || 0;
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
    HIDDEN_ELEMENTS_LIST.forEach((selector) => {
      const elem = this.currentSlide.querySelector(selector);
      if (elem) { elem.classList.add('show'); }
    });
  }

  showTrueWord() {
    this.currentInput = this.trueWords[this.currentIndex].word;
    this.checkInputWord();
  }

  addCompletionNotice() {
    this.completionNotice = createCompletionNotice();
    this.component.append(this.completionNotice);
  }

  get header() {
    return document.querySelector('header');
  }

  // ========================== words ==================================

  async initWordsCollection() {
    this.learnedWords = [];
    if (this.savedWords && !this.settings.isNew) {
      this.getSavedWords();
      return;
    }
    await this.createWordsCollection();
  }

  async createWordsCollection(settings = this.settings.all) {
    this.wordsCollection = await getDayWordsCollection(settings);
    this.trueWords = getTrueWords(this.wordsCollection); // console.log(this.wordsCollection);
  }

  getSavedWords() {
    this.wordsCollection = this.savedWords;
    this.trueWords = getTrueWords(this.wordsCollection);
  }

  checkInputWord() {
    const { word, cutWords } = this.trueWords[this.currentIndex];

    if (this.currentInput.value === word) {
      this.learnedWords.push(this.currentSlideData);
      this.addWordToSwiper();
      this.pasteWordsToTexts(cutWords);
      this.showElementsForTrueWord();
    } else {
      const trueWord = this.trueWords[this.currentIndex];
      this.addWordToCollection(this.currentSlideData, trueWord);
    }

    if (
      this.isEnd
      && this.currentIndex === (this.trueWords.length - 1)
    ) {
      this.checkBtn.replaceWith(this.finishBtn);
    }
  }

  repeatWord() {
    const trueWord = this.trueWords[this.currentIndex];
    const againWord = this.learnedWords[this.learnedWords.length - 1];
    this.addWordToCollection(againWord, trueWord);
  }

  addWordToCollection(wordData, trueWord) {
    const LAST_ELEMENT = 0;
    const previousWordData = this.wordsCollection[LAST_ELEMENT];
    const isRepeated = isEqual(wordData, previousWordData);
    if (isRepeated) { return; }
    this.wordsCollection.unshift(wordData);
    this.trueWords.push(trueWord);
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

  // ========================== modes ==================================

  async createAdditionalTraining() {
    this.component.removeChild(this.completionNotice);
    await this.createWordsCollection();
    this.initTraining();
  }

  async createRandomWordsTraining() {
    this.component.removeChild(this.completionNotice);
    const settings = this.settings.all;
    settings[SETTINGS.COLLECTION_WORDS_MODE] = 'random';
    this.isRandomMode = true;

    await this.createWordsCollection(settings);
    this.initTraining();
  }

  // ========================== other ==================================

  initTraining() {
    if (this.isEnd) {
      this.addCompletionNotice();
      return;
    }

    this.exitBtn = createElement(data.closeTraining.parent);
    this.checkBtn = createElement(data.checkWord.parent);
    this.finishBtn = createElement(data.finishTraining.parent);
    this.training.append(this.exitBtn, this.checkBtn);
    this.component.append(this.training);
    this.initSwiper();
    this.addWordToSwiper();
  }

  endTraining() {
    this.destroySwiper();
    this.exitBtn.remove();
    this.training.remove();
    if (!this.isRandomMode) {
      this.savedWords = this.wordsCollection;
    }
  }

  finishTraining() {
    this.finishBtn.remove();
    this.endTraining();
    this.addCompletionNotice();
  }

  get isEnd() {
    return !this.wordsCollection.length;
  }

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.functionListForButtons[buttonFunction](event);
  }
}

export default LearningWords;
