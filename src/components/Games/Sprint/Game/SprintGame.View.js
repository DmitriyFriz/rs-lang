// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// domain
import Words from 'domainModels/Words/Words';
const wordsDomainModel = new Words();

// layout
import getLayout from './SprintGame.Layout';

// styles
import './SprintGame.scss';

class SprintGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.groupIndex = 0;
    this.repeatWordsIndex = 0;
    this.newWordsIndex = 0;
    this.streakWinning = 0;
    this.superWinning = 4;
    this.score = 0;
    this.basePoints = 10;
    this.awardedPoints = this.basePoints;

    this.setTimer = this.setTimer.bind(this);
    this.handleFalseButton = this.handleFalseButton.bind(this);
    this.handleTrueButton = this.handleTrueButton.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  async prepareData() {
    this.group = await wordsDomainModel.selectGroupWords(0);
    this.repeatWords = wordsDomainModel.repeatWords;
    this.newWords = wordsDomainModel.newWords
    this.shuffleWords(this.group);
    this.shuffleWords(this.repeatWords);
    this.shuffleWords(this.newWords);
  }

  static get name() {
    return GAMES_ROUTES.SPRINT_GAME;
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
      this.scoreContainer
    ] = getLayout();

    this.getNewWord();

    this.component.append(this.container);
    this.intervalID = setInterval(this.setTimer, 1000);
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
      console.log('finish');
    }
  }

  getNewWord() {
    if (this.repeatWords.length > this.repeatWordsIndex) {
      this.currentWord = this.repeatWords[this.repeatWordsIndex];
      this.repeatWordsIndex += 1;
    } else if (this.newWords.length > this.newWordsIndex) {
      this.currentWord = this.newWords[this.newWordsIndex];
      this.newWordsIndex += 1;
    } else {
      this.currentWord = this.group[this.groupIndex];
      this.groupIndex += 1;
    }

    this.wordContainer.textContent = this.currentWord.word;

    this.getNewAnswer();
  }

  getNewAnswer() {
    const rightAnswer = this.randomNumber(1) === 1;
    if (rightAnswer) {
      this.answerContainer.textContent = this.currentWord.wordTranslate;
    } else {
      const randomIndex = this.randomNumber(this.group.length)
      const falseAnswer = this.group[randomIndex].wordTranslate;
      this.answerContainer.textContent = falseAnswer;
    }
  }

  randomNumber(number) {
    return Math.round(Math.random() * number);
  }

  shuffleWords(words) {
    const array = words;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (array.length));
      [array[i], array[j]] = [array[j], array[i]];
    }
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
    if (event.code === 'ArrowLeft') {
      if(event.repeat) return;
      this.leftKey.classList.add('work-key');
      this.handleAnswer(false);
    }
    if (event.code === 'ArrowRight') {
      if(event.repeat) return;
      this.rightKey.classList.add('work-key');
      this.handleAnswer(true);
    }
    this.getNewWord();
  }

  handleKeyUp(event) {
    if (event.code === 'ArrowRight') {
      this.rightKey.classList.remove('work-key');
    }
    if (event.code === 'ArrowLeft') {
      this.leftKey.classList.remove('work-key');
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
    this.streakWinning += 1;

    if (this.streakWinning === this.superWinning) {
      this.awardedPoints *= 2
      this.score += this.awardedPoints;
      this.streakWinning = 0;
    } else {
      this.score += this.awardedPoints;
    }

    this.scoreContainer.textContent = this.score;
  }

  handleIncorrectAnswer() {
    this.streakWinning = 0;
    this.awardedPoints = this.basePoints;
  }
}

export default SprintGame;
