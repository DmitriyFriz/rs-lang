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
import { getMainLayout, createWordCard } from './Layout/LearningWords.Layout';

// handler
import {
  getDayWordsCollection,
  replaceWord,
  addWordDifficulty,
  addWordToVocabulary,
  splitSettings,
  getTrueWords,
} from './LearningWordsHandler';

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  async prepareData() {
    this.settings = await splitSettings();
    this.wordsCollection = this.savedWordsCollection;
    if (!this.wordsCollection) {
      console.log("!")
      this.wordsCollection = await getDayWordsCollection(this.settings.all);
    }
    console.log(this.wordsCollection);
    this.trueWords = getTrueWords(this.wordsCollection);

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
    this.addWordToSwiper();
  }

  hide() {
    super.hide();
    this.swiper.destroy(true, true);
    this.savedWordsCollection = this.wordsCollection;
    console.log(this.savedWordsCollection)
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper__container', swiperOptions);
    this.swiper.on('transitionEnd', () => {
      if (this.swiper.progress === 1) {
        this.currentInput.focus();
      }
    });
    this.swiper.virtual.removeAllSlides();
  }

  checkInputWord() {
    const { word, cutWords } = this.trueWords[this.currentIndex];

    if (this.currentInput.value === word) {
      this.addWordToSwiper();
      this.pasteWordsToTexts(cutWords);
      this.showElementsForTrueWord();
    }
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

  get isEnd() {
    return !this.wordsCollection.length;
  }

  get savedWordsCollection() {
    return JSON.parse(localStorage.getItem('savedWordsCollection'));
  }

  set savedWordsCollection(value) {
    localStorage.setItem('savedWordsCollection', JSON.stringify(value));
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
      if (elem) { elem.classList.add('show'); }
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
  }
}

export default LearningWords;
