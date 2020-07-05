// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { changeRoute } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// domain
import Words from 'domainModels/Words/Words';

// layout

// styles
import './SprintGame.scss';

// icons
import correctIcon from 'assets/mini-games/img/correct-icon.svg';
import incorrectIcon from 'assets/mini-games/img/incorrect-icon.svg';

// audio
import startGameAudio from 'assets/mini-games/audio/start-game.mp3';
import correctAudio from 'assets/mini-games/audio/correct.mp3';
import errorAudio from 'assets/mini-games/audio/error.mp3';
import supersetAudio from 'assets/mini-games/audio/superset.mp3';
import getLayout from './SprintGame.Layout';

const wordsDomainModel = new Words();

class SprintGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.level = localStorage.getItem('sprint-level');
    this.gameIndex = 0;
    this.streakWinning = 0;
    this.superWinning = 4;
    this.score = 0;
    this.basePoints = 10;
    this.awardedPoints = this.basePoints;
    this.keyUserWord = 'userWord';
    this.keyDifficulty = 'difficulty';
    this.repeatParameter = 'again';
    this.keyActiveClassName = 'key_active';
    this.keyId = '_id';

    this.setTimer = this.setTimer.bind(this);
    this.handleFalseButton = this.handleFalseButton.bind(this);
    this.handleTrueButton = this.handleTrueButton.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  async prepareData() {
    this.group = await wordsDomainModel.selectGroupWords(this.level);
    const { repeatWords } = wordsDomainModel;
    const { newWords } = wordsDomainModel;
    this.shuffleWords(this.group);
    this.shuffleWords(repeatWords);
    this.shuffleWords(newWords);
    this.gameArray = [];
    this.gameArray.push(...repeatWords, ...newWords, ...this.group);
  }

  createLayout() {
    [
      this.container,
      this.time,
      this.wordContainer,
      this.answerContainer,
      this.falseButton,
      this.trueButton,
      this.leftKey,
      this.rightKey,
      this.resultIcon,
      this.scoreContainer,
    ] = getLayout();

    this.getNewWord();

    this.component.append(this.container);
    this.intervalID = setInterval(this.setTimer, 1000);
    this.playAudio(startGameAudio);
  }

  setTimer() {
    let currentTime = +this.time.textContent;
    currentTime -= 1;
    if (currentTime < 10) {
      this.time.textContent = `0${currentTime}`;
    } else {
      this.time.textContent = currentTime;
    }

    if (currentTime === 0) {
      clearInterval(this.intervalID);
      setTimeout(this.handleFinish, 500);
    }
  }

  getNewWord() {
    if (this.gameArray.length <= this.gameIndex) {
      this.handleFinish();
      return;
    }

    this.currentWord = this.gameArray[this.gameIndex];
    this.gameIndex += 1;

    this.wordContainer.textContent = this.currentWord.word;

    this.getNewAnswer();
  }

  getNewAnswer() {
    const rightAnswer = this.randomNumber(1) === 1;
    if (rightAnswer) {
      this.answerContainer.textContent = this.currentWord.wordTranslate;
    } else {
      const randomIndex = this.randomNumber(this.group.length - 1);
      const falseAnswer = this.group[randomIndex].wordTranslate;
      this.answerContainer.textContent = falseAnswer;
    }
  }

  randomNumber(number) {
    return Math.round(Math.random() * number);
  }

  /**
   * Fisher–Yates shuffle algorithm
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   * @param {Array} words
   */
  shuffleWords(words) {
    const array = words;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (array.length));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  playAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = `${src}`;
    audio.play();
  }

  addListeners() {
    this.falseButton.addEventListener('click', this.handleFalseButton);
    this.trueButton.addEventListener('click', this.handleTrueButton);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  removeListeners() {
    this.falseButton.removeEventListener('click', this.handleFalseButton);
    this.trueButton.removeEventListener('click', this.handleTrueButton);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    clearInterval(this.intervalID);
  }

  handleFalseButton() {
    this.handleAnswer(false);
    this.getNewWord();
  }

  handleTrueButton() {
    this.handleAnswer(true);
    this.getNewWord();
  }

  handleKeyDown(event) {
    if (event.repeat) return;

    if (event.code === 'ArrowLeft') {
      this.leftKey.classList.add(this.keyActiveClassName);
      this.handleAnswer(false);
      this.getNewWord();
    }
    if (event.code === 'ArrowRight') {
      this.rightKey.classList.add(this.keyActiveClassName);
      this.handleAnswer(true);
      this.getNewWord();
    }
  }

  handleKeyUp(event) {
    if (event.code === 'ArrowRight') {
      this.rightKey.classList.remove(this.keyActiveClassName);
    }
    if (event.code === 'ArrowLeft') {
      this.leftKey.classList.remove(this.keyActiveClassName);
    }
  }

  handleAnswer(userAnswer) {
    const rightAnswer = this.currentWord.wordTranslate === this.answerContainer.textContent;
    const result = userAnswer === rightAnswer;
    if (result) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  }

  handleCorrectAnswer() {
    this.playAudio(correctAudio);
    this.streakWinning += 1;

    if (this.streakWinning === this.superWinning) {
      this.playAudio(supersetAudio);
      this.awardedPoints *= 2;
      this.streakWinning = 0;
    }

    this.score += this.awardedPoints;
    this.scoreContainer.textContent = this.score;

    this.resultIcon.style.backgroundImage = `url(${correctIcon})`;
  }

  handleIncorrectAnswer() {
    this.playAudio(errorAudio);
    this.streakWinning = 0;
    this.awardedPoints = this.basePoints;
    this.resultIcon.style.backgroundImage = `url(${incorrectIcon})`;

    if (
      this.keyUserWord in this.currentWord
      && (!(this.currentWord[this.keyUserWord][this.keyDifficulty] === this.repeatParameter))
    ) {
      wordsDomainModel.updateUserWord(this.currentWord[this.keyId], this.repeatParameter);
    }
  }

  handleFinish() {
    localStorage.setItem('sprint-score', this.score);
    changeRoute(GAMES_ROUTES.SPRINT_FINISH, ROUTERS.GAMES);
  }
}

export default SprintGame;
