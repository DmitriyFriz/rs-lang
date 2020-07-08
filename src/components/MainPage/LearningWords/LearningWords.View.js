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
import { SETTINGS_MAIN, SETTINGS } from '../../Settings/Settings.Constants';

// handler
import {
  getDayWordsCollection,
  addWordDifficulty,
  addWordToVocabulary,
  getTrueWordsData,
  registrationWord,
} from './LearningWordsHandler';

const { createElement } = BaseComponent;

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  async prepareData() {
    this.isRandomMode = false;
    this.isPlayAudio = false;
    // this.settings = await this.handleSettings();
    await this.initSettings();
    await this.initWordsCollection();

    this.functionListForButtons = {
      [BUTTONS.DIFFICULTY]: (event) => addWordDifficulty(event, this.currentSlide.id),
      [BUTTONS.VOCABULARY]: (event) => addWordToVocabulary(event, this.currentSlide.id),
      [BUTTONS.TRUE_WORD]: (event) => this.showTrueWord(event),
      [BUTTONS.CHECK]: () => this.checkResult(),
      [BUTTONS.ADDITIONAL]: () => this.createAdditionalTraining(),
      [BUTTONS.RANDOM_WORDS]: () => this.createRandomWordsTraining(),
      [BUTTONS.FINISH]: () => this.finishTraining(),
      [BUTTONS.AGAIN]: () => this.repeatWord(),
      [BUTTONS.PLAY_AUDIO]: () => this.initAudio(),
    };

    this.handleAudioEvent = this.handleAudioEvent.bind(this);
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.audio = createElement({ tag: 'audio' });
    this.training = createElement(data.training.parent);
    this.training.append(this.audio);
    this.swiperLayout = createBlock('swiper');
  }

  addListeners() {
    this.component.addEventListener('change', () => this.checkResult());
    this.component.addEventListener('click', (event) => this.handleButtons(event));
    this.audio.addEventListener('ended', this.handleAudioEvent);
  }

  removeListeners() {
    this.audio.removeEventListener('ended', this.handleAudioEvent);
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
      this.stopAudio();
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
      createWordCard(this.settings[SETTINGS.MAIN].enabled, this.currentSlideData),
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

  get errorsBlock() {
    return this.swiper.virtual.slides[this.currentIndex]
      .querySelector('.word-input__success');
  }

  set errorsBlock(text) {
    this.swiper.virtual.slides[this.currentIndex]
      .querySelector('.word-input__success').innerHTML = text;
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
    this.hideTrueWordBtn();
    HIDDEN_ELEMENTS_LIST.forEach((selector) => {
      const elem = this.currentSlide.querySelector(selector);
      if (elem) { elem.classList.add('show'); }
    });
  }

  showTrueWord() {
    this.currentInput = this.trueWordsData[this.currentIndex].word;
    this.checkResult();
  }

  hideTrueWordBtn() {
    const trueWordBtn = this.currentSlide
      .querySelector(`[data-button=${BUTTONS.TRUE_WORD}]`);
    trueWordBtn.style.display = 'none';
  }

  addCompletionNotice() {
    this.completionNotice = createCompletionNotice();
    this.component.append(this.completionNotice);
  }

  createProgressBar() {
    this.progressBar = createElement(data.progressBar);
    const progressContainer = createElement(data.progressContainer);

    this.learnedWordsAmount = createElement(data.learnedWordsAmount);
    this.progress = createElement(data.progress);
    this.totalWords = createElement(data.totalWords);

    progressContainer.append(this.progress);
    this.progressBar.append(this.learnedWordsAmount, progressContainer, this.totalWords);
    return this.progressBar;
  }

  updateProgress() {
    this.learnedWordsAmount.textContent = this.learnedWords.length;
    this.totalWords.textContent = this.allWordsCollection;
    const progress = (
      (this.allWordsCollection - this.learnedWords.length)
      / this.allWordsCollection
    );
    const RED = 255;
    const GREEN = 194;
    const BLUE = 232;
    this.progress.style.width = `${(1 - progress) * 100}%`;
    this.progress.style.backgroundColor = `rgb(${progress * RED}, ${GREEN}, ${BLUE})`;
  }

  hideInput() {
    this.currentInput.classList.add('hide-input');
  }

  showInput() {
    this.currentInput.classList.remove('hide-input');
  }

  showLetterErrors() {
    const trueWord = this.trueWordsData[this.currentIndex];
    this.errorsBlock = this.getLetterErrors(this.currentInput.value, trueWord.word);
    this.hideInput();
    this.currentInput = '';
    this.currentInput.addEventListener('input', () => this.showInput(), { once: true });
  }

  get header() {
    return document.querySelector('header');
  }

  // ========================== words ==================================

  async initWordsCollection() {
    this.learnedWords = [];
    if (this.savedWords && !this.settings[SETTINGS.MAIN].isNew) {
      this.getSavedWords();
      return;
    }
    await this.createWordsCollection();
  }

  async createWordsCollection(settings = this.settings[SETTINGS.MAIN].all) {
    this.wordsCollection = await getDayWordsCollection(settings);
    this.trueWordsData = getTrueWordsData(this.wordsCollection);
  }

  getSavedWords() {
    this.wordsCollection = this.savedWords;
    this.trueWordsData = getTrueWordsData(this.wordsCollection);
  }

  repeatWord(word = this.learnedWords[this.learnedWords.length - 1]) {
    const trueWord = this.trueWordsData[this.currentIndex];
    this.addWordToCollection(word, trueWord);
  }

  addWordToCollection(wordData, trueWord) {
    const LAST_ELEMENT = 0;
    const previousWordData = this.wordsCollection[LAST_ELEMENT];
    const isRepeated = isEqual(wordData, previousWordData);
    if (isRepeated) { return; }
    this.wordsCollection.unshift(wordData);
    this.trueWordsData.push(trueWord);
  }

  getLetterErrors(word, trueWord) {
    let res = '';
    Array.from(trueWord).forEach((trueLetter, index) => {
      const letter = word[index];
      if (trueLetter === letter) {
        res += `<span class="success">${trueLetter}</span>`;
        return;
      }
      res += `<span class="fail">${trueLetter}</span>`;
    });
    return res;
  }

  get savedWords() {
    return JSON.parse(localStorage.getItem('savedWords'));
  }

  set savedWords(value) {
    localStorage.setItem('savedWords', JSON.stringify(value));
  }

  get allWordsCollection() {
    return this.trueWordsData.length;
  }
  // ========================== settings ===============================

  async handleSettings(name) {
    const all = await getSettings(name);
    const enabled = Object.keys(all)
      .filter((setting) => all[setting] === true);

    if (!this.savedSettings) {
      this.savedSettings = {};
      this.savedSettings[name] = all;
    }
    const isNew = !isEqual(all, this.savedSettings[name]);

    if (isNew) { console.log('SAVED SETTINGS!'); this.savedSettings[name] = all; }
    return { enabled, all, isNew };
  }

  async initSettings() {
    this.settings = {};
    const promises = Object
      .keys(SETTINGS)
      .map(async (settingsName) => {
        this.settings[SETTINGS[settingsName]] = await this.handleSettings(SETTINGS[settingsName]);
      });

    await Promise.all(promises);
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
    const settings = this.settings[SETTINGS.MAIN].all;
    settings[SETTINGS_MAIN.COLLECTION_WORDS_MODE] = 'random';
    this.isRandomMode = true;

    await this.createWordsCollection(settings);
    this.initTraining();
  }

  // ========================== audio =================================

  playAudio() {
    const voice = this.audioData.pop();
    this.audio.src = voice;
    this.audio.play();
    this.isPlayAudio = true;
  }

  handleAudioEvent() {
    if (!this.audioData.length) { return; }
    this.playAudio();
  }

  stopAudio() {
    this.audioData = [];
    this.audio.pause();
    this.isPlayAudio = false;
  }

  initAudio() {
    if (this.isPlayAudio) {
      this.stopAudio();
      return;
    }

    const { audio, audioExample, audioMeaning } = this.trueWordsData[this.currentIndex];
    this.audioData = []; console.log(this.settings[SETTINGS.MAIN]);
    if (this.settings[SETTINGS.MAIN].all[SETTINGS_MAIN.MEANING]) {
      this.audioData.push(audioMeaning);
    }
    if (this.settings[SETTINGS.MAIN].all[SETTINGS_MAIN.EXAMPLE]) {
      this.audioData.push(audioExample);
    }

    this.audioData.push(audio);
    this.playAudio();
  }

  checkAutoAudioPlay() {
    if (this.settings[SETTINGS.MAIN].all[SETTINGS_MAIN.AUDIO_AUTOPLAY]) {
      this.initAudio();
    }
  }

  // ========================== other ==================================

  checkResult() {
    const { word, cutWords } = this.trueWordsData[this.currentIndex];

    if (this.currentInput.value === word) {
      this.checkAutoAudioPlay();
      this.currentInput.disabled = true;
      this.learnedWords.push(this.currentSlideData);
      registrationWord(this.currentSlideData._id);
      this.addWordToSwiper();
      this.pasteWordsToTexts(cutWords);
      this.showElementsForTrueWord();
      this.updateProgress();
    } else {
      this.showLetterErrors();
      this.repeatWord(this.currentSlideData);
    }

    if (
      this.isEnd
      && this.currentIndex === (this.trueWordsData.length - 1)
    ) {
      this.checkBtn.replaceWith(this.finishBtn);
    }
  }

  initTraining() {
    if (this.isEnd) {
      this.addCompletionNotice();
      return;
    }

    this.exitBtn = createElement(data.closeTraining.parent);
    this.checkBtn = createElement(data.checkWord.parent);
    this.finishBtn = createElement(data.finishTraining.parent);
    this.training.append(
      this.exitBtn,
      this.checkBtn,
      this.createProgressBar(),
    );
    this.component.append(this.training);
    this.initSwiper();
    this.addWordToSwiper();
    this.updateProgress();
  }

  endTraining() {
    this.destroySwiper();
    this.exitBtn.remove();
    this.training.remove();
    this.progressBar.remove();
    this.learnedWords = [];
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
