// lodash
import get from 'lodash.get';

// router
import { ROUTERS, MAIN_PAGE_ROUTES } from 'router/Router.Constants';
import { changeRoute } from 'router/RouteHandler';

// Swiper
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import swiperOptions from 'components/MainPage/LearningWords/Swiper.Options';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';
import Notification from 'components/Notification/Notification.View';
import Loader from 'components/Loader/Loader.View';

// constants
import {
  BUTTONS,
  HIDDEN_ELEMENTS_LIST,
  HIDDEN_BUTTONS_LIST,
} from 'components/MainPage/MainPage.Constants';
import { SETTINGS, SETTINGS_MAIN } from 'components/Settings/Settings.Constants';

// layout
import {
  createWordSlide,
  buttonsList,
  addEnabledElements,
  pasteWordsToTexts,
  showElements,
  hideElements,
} from './Layout/LearningWords.Layout';
import { data } from './Layout/LearningWords.Data';
import createBlock from '../MainPage.Layout';

// Audio control
import AudioControl from './LearningWords.AudioControl';

// handler
import {
  addWordDifficulty,
  addWordToVocabulary,
  registrationWord,
  getLetterErrors,
  initSettings,
} from './LearningWords.Helpers';

// other
import WordsCollection from './LearnedWords.WordsCollection';
import { statistics, sessionStatistics, MODE } from '../MainPage.Statistics';

// style
import './Styles/LearningWords.scss';

const { createElement } = BaseComponent;

class LearningWords extends BaseComponent {
  async prepareData() {
    this.settings = await initSettings();

    this.functionListForButtons = {
      [BUTTONS.DIFFICULTY]: (event) => {
        this.notification.drop();
        addWordDifficulty(event, this.currentSlide.id, this.settings[SETTINGS.REPETITION].all);
      },
      [BUTTONS.VOCABULARY]: (event) => {
        this.notification.drop();
        addWordToVocabulary(event, this.currentSlide.id);
      },
      [BUTTONS.TRUE_WORD]: (event) => this.showTrueWord(event),
      [BUTTONS.CHECK]: () => this.checkResult(),
      [BUTTONS.FINISH]: () => this.finishTraining(),
      [BUTTONS.CLOSE]: () => this.closeTraining(),
      [BUTTONS.AGAIN]: () => this.wordsCollection.addWordToRepeat(this.currentIndex),
      [BUTTONS.PLAY_AUDIO]: () => this.audioControl.initAudio(
        this.wordsCollection.trueWordsData[this.currentIndex], this.settings[SETTINGS.MAIN].all,
      ),
      [BUTTONS.CLOSE_NOTIFICATION]: () => this.notification.drop(),
    };

    this.checkResult = this.checkResult.bind(this);
    this.notification = new Notification(this.component, 1);
  }

  createLayout() {
    this.component.className = 'learning-words';
    this.swiperLayout = createBlock(data, 'swiper');
  }

  addListeners() {
    this.component.addEventListener('change', this.checkResult);
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  removeListeners() {
  }

  async show() {
    this.loader = new Loader();
    await this.loader.show();
    await super.show();
    await this.initTraining();
    this.loader.hide();
  }

  // ========================== main ==================================

  checkResult() {
    const { word, isNewWord, isRepeated } = this.wordsCollection.trueWordsData[this.currentIndex];

    if (this.currentInput.value === word) {
      sessionStatistics
        .addSuccess(isRepeated)
        .addNewWord(isNewWord, isRepeated);
      this.addControlBlock();
      this.handleSuccessResult();
    } else {
      sessionStatistics
        .addFail(isRepeated)
        .addNewWord(isNewWord, isRepeated);
      this.showLetterErrors();
      this.wordsCollection.addWordToRepeat(
        this.currentIndex, this.wordsCollection.currentWordData,
      );
    }
  }

  handleSuccessResult() {
    const { cutWords } = this.wordsCollection.trueWordsData[this.currentIndex];
    const currentTrueWordData = this.wordsCollection.trueWordsData[this.currentIndex];
    const mainSettings = this.settings[SETTINGS.MAIN].all;
    const settingsOfRepetitionMethod = this.settings[SETTINGS.REPETITION].all;
    const currentWordId = this.wordsCollection.currentWordData._id;

    this.audioControl.checkAutoAudioPlay(currentTrueWordData, mainSettings);
    this.currentInput.disabled = true;
    this.wordsCollection.addWordToLearned();
    registrationWord(currentWordId, settingsOfRepetitionMethod);
    this.addWordToSwiper();
    pasteWordsToTexts(cutWords, this.currentSlide);
    showElements(HIDDEN_ELEMENTS_LIST, this.currentSlide);
    hideElements(HIDDEN_BUTTONS_LIST, this.currentSlide);
    this.updateProgress();

    if (this.currentIndex === (this.wordsCollection.trueWordsAmount - 1)) {
      this.exitBtn.replaceWith(this.finishBtn);
    }
  }

  async initTraining() {
    if (
      statistics.dailyPlanCompleted
      && !statistics.isNewDay
      && !(sessionStatistics.mode === MODE.RANDOM)
    ) {
      sessionStatistics.mode = MODE.NO_STAT;
      changeRoute(MAIN_PAGE_ROUTES.NOTIFICATION, ROUTERS.MAIN_PAGE);
      return;
    }

    this.wordsCollection = new WordsCollection();
    await this.wordsCollection.init(this.settings[SETTINGS.MAIN].all);
    sessionStatistics.initSession();
    this.initTrainingLayout();
    this.initSwiper();
    this.addWordToSwiper();
    this.audioControl = new AudioControl(this.component);
    this.updateProgress();
  }

  endTraining() {
    this.destroySwiper();
    this.audioControl.destroy();
    statistics.saveToRemoteStat();
    this.trainingLayout.remove();
    this.wordsCollection.saveWords();
    sessionStatistics.mode = MODE.DEFAULT;
  }

  finishTraining() {
    statistics.addCompletedTrainingToStat();
    this.endTraining();
    changeRoute(MAIN_PAGE_ROUTES.NOTIFICATION, ROUTERS.MAIN_PAGE);
  }

  closeTraining() {
    this.endTraining();
    changeRoute(MAIN_PAGE_ROUTES.START_MENU, ROUTERS.MAIN_PAGE);
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
    if (!this.wordsCollection.collection.length) { return; }

    const enabledSettings = this.settings[SETTINGS.MAIN].enabled;
    const slide = createWordSlide(enabledSettings, this.wordsCollection.currentWordData);
    hideElements(HIDDEN_ELEMENTS_LIST, slide);
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

  // ========================== layout ==================================

  initTrainingLayout() {
    this.trainingLayout = createElement(data.trainingLayout.parent);
    this.exitBtn = createElement(data.closeTraining.parent);
    this.finishBtn = createElement(data.finishTraining.parent);
    this.trainingLayout.append(
      this.exitBtn,
      this.createProgressBar(),
    );
    this.component.append(this.trainingLayout);
  }

  showTrueWord() {
    this.currentInput = this.wordsCollection.trueWordsData[this.currentIndex].word;
    this.handleSuccessResult();
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
    this.learnedWordsAmount.textContent = this.wordsCollection.learnedWords.length;
    this.totalWords.textContent = this.wordsCollection.trueWordsAmount;
    const progress = (
      (this.wordsCollection.trueWordsAmount - this.wordsCollection.learnedWords.length)
      / this.wordsCollection.trueWordsAmount
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
    const trueWord = this.wordsCollection.trueWordsData[this.currentIndex];
    this.errorsBlock = getLetterErrors(this.currentInput.value, trueWord.word);
    this.hideInput();
    this.currentInput = '';
    this.currentInput.addEventListener('input', () => this.showInput(), { once: true });
  }

  addControlBlock() {
    const enabledSettings = this.settings[SETTINGS.MAIN].enabled;
    if (
      !enabledSettings.includes(SETTINGS_MAIN.DIFFICULTY_BUTTONS)
      && !enabledSettings.includes(SETTINGS_MAIN.VOCABULARY_BUTTONS)
    ) {
      return;
    }
    const closeBtn = createElement(data.closeNotification);
    this.notification.add('');
    this.notification.layout.append(closeBtn);
    addEnabledElements(
      this.settings[SETTINGS.MAIN].enabled,
      buttonsList,
      this.notification.layout,
    );
    this.swiper.once('transitionStart', () => this.notification.drop());
  }
}

export default LearningWords;
