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
import { BUTTONS, HIDDEN_ELEMENTS_LIST } from './LearningWords.Constants';

// layout
import {
  createWordSlide, createCompletionNotice, createBlock,
} from './Layout/LearningWords.Layout';
import { data } from './Layout/LearningWords.Data';

// Settings
import { getSettings } from '../../Settings/SettingsHandler';
import { SETTINGS_MAIN, SETTINGS } from '../../Settings/Settings.Constants';

// Statistics
import {
  getStatistics,
  sessionStatistics,
  updateStatistics,
} from './LearningWords.Statistics';

// Audio control
import AudioControl from './LearningWords.AudioControl';

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
  async prepareData() {
    await this.initSettings();
    await this.initStatistics();

    this.functionListForButtons = {
      [BUTTONS.DIFFICULTY]: (event) => addWordDifficulty(
        event, this.currentSlide.id, this.settings[SETTINGS.REPETITION].all,
      ),
      [BUTTONS.VOCABULARY]: (event) => addWordToVocabulary(event, this.currentSlide.id),
      [BUTTONS.TRUE_WORD]: (event) => this.showTrueWord(event),
      [BUTTONS.CHECK]: () => this.checkResult(),
      [BUTTONS.ADDITIONAL]: () => this.createAdditionalTraining(),
      [BUTTONS.RANDOM_WORDS]: () => this.createRandomWordsTraining(),
      [BUTTONS.FINISH]: () => this.finishTraining(),
      [BUTTONS.AGAIN]: () => this.addWordToRepeat(),
      [BUTTONS.PLAY_AUDIO]: () => this.audioControl.initAudio(
        this.trueWordsData[this.currentIndex], this.settings[SETTINGS.MAIN].all,
      ),
    };

    this.checkResult = this.checkResult.bind(this);
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.swiperLayout = createBlock('swiper');
  }

  addListeners() {
    this.component.addEventListener('change', this.checkResult);
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  removeListeners() {
  }

  async show() {
    await super.show();
    await this.initTraining();
  }

  hide() {
    super.hide();
    if (this.isTrainingEnabled) {
      this.endTraining();
    }
    console.log('SAVED WORDS', this.savedWords);
  }

  // ========================== main ==================================

  checkResult() {
    const { word, isNewWord, isRepeated } = this.trueWordsData[this.currentIndex];

    if (this.currentInput.value === word) {
      sessionStatistics.addSuccess(isNewWord, isRepeated);
      this.handleSuccessResult();
    } else {
      sessionStatistics.addFail(isNewWord, isRepeated);
      this.showLetterErrors();
      this.addWordToRepeat(this.currentSlideData);
    }
  }

  handleSuccessResult() {
    const { cutWords } = this.trueWordsData[this.currentIndex];
    const currentTrueWordData = this.trueWordsData[this.currentIndex];
    const mainSettings = this.settings[SETTINGS.MAIN].all;
    const settingsOfRepetitionMethod = this.settings[SETTINGS.REPETITION].all;
    const currentWordId = this.currentSlideData._id;

    this.audioControl.checkAutoAudioPlay(currentTrueWordData, mainSettings);
    this.currentInput.disabled = true;
    this.addWordToLearned();
    registrationWord(currentWordId, settingsOfRepetitionMethod);
    this.addWordToSwiper();
    this.pasteWordsToTexts(cutWords);
    this.showElementsForTrueWord();
    this.updateProgress();

    if (
      this.currentIndex === (this.trueWordsAmount - 1)
    ) {
      this.checkBtn.replaceWith(this.finishBtn);
    }
  }

  async initTraining() {
    if (
      this.dailyPlanCompleted
      && !this.isNewDay
      && !this.isNewSettings
      && !this.isRandomMode
    ) {
      console.log('INIT TRAINING === ', this.trainingNumber >= this.plan, 'isNewDate === ', this.isNewDay);
      this.addCompletionNotice();
      return;
    }

    await this.initWordsCollection();
    this.initTrainingLayout();
    this.initSwiper();
    this.addWordToSwiper();
    this.audioControl = new AudioControl(this.component);
    this.updateProgress();
    this.isTrainingEnabled = true;
    sessionStatistics.reset();
    console.log('WORDS COLLECTION ==', this.wordsCollection);
  }

  endTraining() {
    console.log('STATISTICS ==== ', sessionStatistics, sessionStatistics.rate());
    this.destroySwiper();
    this.audioControl.destroy();
    this.saveStatistics();
    this.trainingLayout.remove();
    this.saveWords();
  }

  finishTraining() {
    this.isTrainingEnabled = false;
    this.addCompletedTrainingToStat();
    this.endTraining();
    this.addCompletionNotice();
  }

  get dailyPlanCompleted() {
    return this.trainingNumber >= this.plan;
  }

  get isNewSettings() {
    return this.settings[SETTINGS.MAIN].isNew;
  }

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.functionListForButtons[buttonFunction](event);
  }

  // ========================== swiper ==================================

  initSwiper() {
    this.trainingLayout.append(this.swiperLayout);
    this.swiper = new Swiper('.swiper__container', swiperOptions);
    this.swiper.on('transitionEnd', () => this.handleSwiperTransition());
    this.swiper.virtual.removeAllSlides();
  }

  handleSwiperTransition() {
    if (this.audioControl) {
      this.audioControl.stopAudio();
    }

    if (this.swiper.progress === 1) {
      this.currentInput.focus();
    }
  }

  destroySwiper() {
    this.swiper.destroy(true, true);
    this.swiperLayout.remove();
  }

  addWordToSwiper() {
    if (!this.wordsCollection.length) { return; }

    const enabledSettings = this.settings[SETTINGS.MAIN].enabled;
    const slide = createWordSlide(enabledSettings, this.currentSlideData);
    this.swiper.virtual.appendSlide(slide);
    this.swiper.update();
  }

  get currentIndex() {
    return get(this, 'swiper.activeIndex') || 0;
  }

  get currentInput() {
    return this.swiper.virtual.slides[this.currentIndex]
      .querySelector(`.${data.wordInputBlock.className} > input`);
  }

  set currentInput(value) {
    this.swiper.virtual.slides[this.currentIndex]
      .querySelector(`.${data.wordInputBlock.className} > input`).value = value;
  }

  get errorsBlock() {
    return this.swiper.virtual.slides[this.currentIndex]
      .querySelector(`.${data.errorsBlock.className}`);
  }

  set errorsBlock(text) {
    this.swiper.virtual.slides[this.currentIndex]
      .querySelector(`.${data.errorsBlock.className}`).innerHTML = text;
  }

  get currentSlide() {
    return this.swiper.virtual.slides[this.currentIndex];
  }

  get currentSlideData() {
    return this.wordsCollection[this.wordsCollection.length - 1];
  }

  // ========================== layout ==================================

  initTrainingLayout() {
    this.trainingLayout = createElement(data.trainingLayout.parent);
    this.exitBtn = createElement(data.closeTraining.parent);
    this.checkBtn = createElement(data.checkWord.parent);
    this.finishBtn = createElement(data.finishTraining.parent);
    this.trainingLayout.append(
      this.exitBtn,
      this.checkBtn,
      this.createProgressBar(),
    );
    this.component.append(this.trainingLayout);
  }

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
    this.handleSuccessResult();
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
    this.totalWords.textContent = this.trueWordsAmount;
    const progress = (
      (this.trueWordsAmount - this.learnedWords.length)
      / this.trueWordsAmount
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
    if (
      !this.dailyPlanCompleted
      && !this.isNewDay
      && this.savedWords.length
    ) {
      console.log('GETTING SAVED WORDS: ',
        'SAVED WORDS === ', this.savedWords,
        'NEW SETTINGS === ', this.settings[SETTINGS.MAIN].isNew);
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

  saveWords() {
    if (!this.isRandomMode) {
      this.savedWords = this.wordsCollection;
    }
  }

  addWordToRepeat(word = this.learnedWords[this.learnedWords.length - 1]) {
    const trueWord = this.trueWordsData[this.currentIndex];
    trueWord.isRepeated = true;
    this.addWordToCollection(word, trueWord);
  }

  addWordToLearned() {
    this.learnedWords.push(this.currentSlideData);
    this.wordsCollection.pop();
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

  get trueWordsAmount() {
    return this.trueWordsData.length;
  }
  // ========================== settings ===============================

  async handleSettings(name) {
    const all = await getSettings(name);
    const enabled = Object.keys(all)
      .filter((setting) => all[setting] === true);

    if (!this.savedSettings) {
      this.savedSettings = { [name]: all };
    }

    const updatedSettings = this.savedSettings;
    const isNew = !isEqual(all, updatedSettings[name]);

    if (isNew) {
      console.log('SAVE SETTINGS!');
      updatedSettings[name] = all;
      this.savedSettings = updatedSettings;
    }
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
    this.addNewTrainingToPlan();
    this.completionNotice.remove();
    this.initTraining();
  }

  async createRandomWordsTraining() {
    this.completionNotice.remove();
    const settings = this.settings[SETTINGS.MAIN].all;
    settings[SETTINGS_MAIN.COLLECTION_WORDS_MODE] = 'random';
    this.isRandomMode = true;
    this.initTraining();
  }

  // ========================= statistics =============================

  async initStatistics() {
    this.longTermStatistics = await getStatistics();

    [
      this.lastGameDate = 0,
      this.words = 0,
      this.trainingNumber = 0,
      this.plan = 1] = this.longTermStatistics[this.longTermStatistics.length - 1];
    console.log('LAST GAME ===', this.lastGameDate);
    if (this.isNewDay) {
      this.words = 0;
      this.trainingNumber = 0;
      this.plan = 1;
    }

    console.log('CURRENT STATISTICS:',
      'LAST GAME === ', new Date(this.lastGameDate),
      'WORDS === ', this.words,
      'TRAINING === ', this.trainingNumber,
      'PLAN === ', this.plan);
  }

  updateStatistics() {
    this.lastGameDate = Date.now();
    this.words += sessionStatistics.newWords;
  }

  addNewTrainingToPlan() {
    this.plan += 1;
  }

  addCompletedTrainingToStat() {
    this.trainingNumber += 1;
  }

  async saveStatistics() {
    this.updateStatistics();
    const statistics = [
      this.lastGameDate,
      this.words,
      this.trainingNumber,
      this.plan,
    ];

    if (this.isNewDay) {
      this.longTermStatistics.push(statistics);
    } else {
      this.longTermStatistics.pop();
      this.longTermStatistics.push(statistics);
    }

    updateStatistics(this.longTermStatistics);
  }

  get isNewDay() {
    if (!this.lastGameDate) {
      return false;
    }

    const REAL_TIME = new Date();
    const LAST_GAME_TIME = new Date(this.lastGameDate);
    console.log('isNewDay', REAL_TIME.getDate(), ' > ', LAST_GAME_TIME.getDate(), REAL_TIME.getDate() > LAST_GAME_TIME.getDate());
    return REAL_TIME.getDate() > LAST_GAME_TIME.getDate();
  }
}

export default LearningWords;
