import BaseComponent from 'components/BaseComponent/BaseComponent';
import Words from 'domainModels/Words/Words';
import Statistics from 'domainModels/Statistics/Statistics';

import getGameLayout from 'components/Games/Savannah/components/Game/Savannah.Game.Layout';
import get from 'lodash.get';
import './SavannahGame.scss';

import startGameAudio from 'assets/mini-games/audio/start-game.mp3';
import correctAudio from 'assets/mini-games/audio/correct.mp3';
import errorAudio from 'assets/mini-games/audio/error.mp3';
import finishGameAudio from 'assets/mini-games/audio/superset.mp3';

import { changeRoute } from 'router/RouteHandler';
import { GAMES_ROUTES, ROUTERS } from 'router/Router.Constants';
import { DIFFICULTY } from 'domainModels/Words/Words.Constants';

import lifeOut from '../../images/life_out.svg';
import soundOn from '../../images/music_on.svg';
import soundOff from '../../images/music_off.svg';

export default class SavannahGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.statistics = new Statistics();
    this.word = new Words();

    this.styleElement = document.head.appendChild(document.createElement('style'));
    this.gameArray = JSON.parse(localStorage.getItem('savannah-gameArray'));

    this.keyId = '_id';
    this.keyWord = 'word';
    this.keyWordTranslate = 'wordTranslate';

    this.keyUserWord = 'userWord';
    this.keyDifficulty = 'difficulty';
    this.repeatParameter = DIFFICULTY.AGAIN;

    this.gameTimePerRound = 5000;
    this.gameRoundTime = 4000;
    this.backgroundStep = 100;
    this.isGame = false;
    this.roundIsDown = false;
    this.gameLife = 5;
    this.wordIndex = 0;
    this.shortStatistic = {
      incorrect: [],
      correct: [],
    };

    this.sound = true;

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleKeyboardKey = this.handleKeyboardKey.bind(this);
    this.handlerSoundControl = this.handlerSoundControl.bind(this);
    this.resumeGame = this.resumeGame.bind(this);
    this.checkIsGame = this.checkIsGame.bind(this);
    this.returnBtnStyle = this.returnBtnStyle.bind(this);
  }

  async prepareData() {
    const { data } = await this.statistics.getStatistics();
    this.statistic = get(data, `optional.${GAMES_ROUTES.SAVANNAH}`);

    if (!data || !this.statistic) {
      this.statistic = [Date.now(), 0, 0];
    }

    [, , this.statisticTotal] = this.statistic;
  }

  createLayout() {
    this.layout = getGameLayout();
    [this.transferWord] = this.layout.childNodes;
    this.gameWords = this.getGameWord();
    this.soundBtn = this.layout.querySelector('#controlSound');
    const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');

    this.addGameData(this.gameWords, gameWordsBtn);
    this.addNumberKeyBtn();
    this.playSound(startGameAudio);

    this.gameTimerStateId = setInterval(this.resumeGame, this.gameTimePerRound);
    this.isGameTimerId = setTimeout(this.checkIsGame, 3500);

    this.component.append(this.layout);
  }

  resumeGame() {
    this.clearGameStatePerRound();

    if (
      this.gameLife > 0
      && this.backgroundStep > 0
    ) {
      const gameWords = this.getGameWord();
      const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');

      this.addGameData(gameWords, gameWordsBtn);
      this.addNumberKeyBtn();
      this.playSound(startGameAudio);
    }

    if (
      this.gameLife === 0
      || this.backgroundStep === 0
    ) {
      this.endGame();
    }

    this.isGameTimerId = setTimeout(this.checkIsGame, this.gameRoundTime);
  }

  clearGameStatePerRound() {
    this.clearBtnStyleAnswer();
    this.handleTransferWordClass();

    this.gameWords = this.getGameWord();
    this.roundIsDown = false;
    this.isGame = false;
    this.userAnswer = null;
    this.correctAnswer = null;
  }

  checkIsGame() {
    if (!this.isGame) {
      this.playSound(errorAudio);
      this.dropGameLife();
      this.gameLife -= 1;
      this.changeStyleAnswerBtn(this.userAnswer, this.correctAnswer);

      this.transferWord.classList.remove('move-word');
      this.transferWord.classList.add('show-word');
    }
  }

  addListeners() {
    const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
    gameWordsBtn.forEach((btn) => {
      btn.addEventListener('click', this.handleAnswer);
    });
    document.addEventListener('keydown', this.handleKeyboardKey);
    this.soundBtn.addEventListener('click', this.handlerSoundControl);
  }

  removeListeners() {
    const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
    gameWordsBtn.forEach((btn) => {
      btn.removeEventListener('click', this.handleAnswer);
    });
    document.removeEventListener('keydown', this.handleKeyboardKey);
    this.soundBtn.removeEventListener('click', this.handlerSoundControl);
    document.head.removeChild(this.styleElement);
    localStorage.removeItem('savannah-gameArray');

    clearInterval(this.activeBtnTimerId);
    clearInterval(this.gameTimerStateId);
    clearInterval(this.isGameTimerId);
  }

  getGameWord() {
    const rightWord = this.gameArray[this.wordIndex];
    let wordCounter = 0;
    const wrongWord = this.gameArray.map((word) => {
      if (rightWord !== word) {
        if (
          Math.random() >= 0.90
          && wordCounter !== 3
        ) {
          wordCounter += 1;
          return word;
        }
        return null;
      }
    }).filter((word) => word);
    this.wordIndex += 1;

    return {
      gameWords: [...wrongWord, rightWord],
      rightWord,
    };
  }

  addGameData(gameWords, gameWordsBtn) {
    const currentGameWord = this.transferWord.querySelector('#currentGameWord');
    const { rightWord } = gameWords;

    this.correctAnswer = rightWord[this.keyId];
    const btnArray = this.shuffleArray([...gameWordsBtn]);

    btnArray.forEach((btn, i) => {
      const id = gameWords.gameWords[i][this.keyId];
      const word = gameWords.gameWords[i][this.keyWordTranslate];
      btn.id = id;
      btn.textContent = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
      currentGameWord.textContent = rightWord[this.keyWord];
    });
  }

  addNumberKeyBtn() {
    const wordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
    [...wordsBtn].forEach((btn, i) => {
      const textBtn = btn.textContent;
      const number = `${i + 1}. `;
      btn.textContent = `${number} ${textBtn}`;
    });
  }

  handleAnswer(event) {
    this.isGame = true;
    if (!this.roundIsDown) {
      this.userAnswer = event.target.id;
      this.checkAnswer(this.userAnswer);
    }
  }

  handleKeyboardKey(event) {
    this.isGame = true;

    if (!this.roundIsDown) {
      const wordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
      const btnOptions = [...wordsBtn]
        .map((btn) => (
          {
            [`Digit${btn.textContent.slice(0, 1)}`]: btn.id,
          }
        ));
      const keyboardKey = ['Digit1', 'Digit2', 'Digit3', 'Digit4'];

      if (keyboardKey.includes(event.code)) {
        btnOptions.forEach((btn) => {
          if (btn[event.code]) {
            const btnId = btn[event.code];
            this.changeStyleActiveBtn(btnId);
            this.userAnswer = btnId;
            this.checkAnswer(this.userAnswer);
          }
        });
      }
    }
  }

  checkAnswer(answerId) {
    this.roundIsDown = true;

    if (answerId === this.correctAnswer) {
      this.moveBackground();
      this.playSound(correctAudio);
      this.handlerRightWord(this.correctAnswer);

      this.transferWord.classList.remove('move-word');
      this.transferWord.classList.add('right-word');
    }

    if (answerId !== this.correctAnswer) {
      this.playSound(errorAudio);
      this.dropGameLife();
      this.gameLife -= 1;
      this.handlerWrongWord(this.userAnswer);

      this.transferWord.classList.remove('move-word');
      this.transferWord.classList.add('show-word');
    }

    this.changeStyleAnswerBtn(this.userAnswer, this.correctAnswer);
  }

  handlerRightWord() {
    const correctWord = this.gameWords.rightWord;
    this.shortStatistic.correct.push(correctWord);
  }

  handlerWrongWord(id) {
    const wordIndex = this.gameArray
      .findIndex((word) => word[this.keyId] === id);
    const wrongWord = this.gameArray[wordIndex];
    this.shortStatistic.incorrect.push(wrongWord);

    if (
      this.keyUserWord in wrongWord
      && (!(wrongWord[this.keyUserWord][this.keyDifficulty] === this.repeatParameter))
    ) {
      this.word.updateUserWord(wrongWord[this.keyId], this.repeatParameter);
    }
  }

  dropGameLife() {
    const lifeArray = [...this.component.querySelectorAll('#gameLifeBlock img')];
    const currentID = `life${(5 - this.gameLife)}`;
    const lifeImg = lifeArray.find((life) => life.id === currentID);
    lifeImg.src = `${lifeOut}`;
  }

  playSound(src) {
    if (this.sound) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = `${src}`;
      audio.play();
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (array.length));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  changeStyleActiveBtn(btnId) {
    this.activeBtn = this.component.querySelector(`button[id='${btnId}']`);
    const timerMS = 300;
    this.activeBtn.classList.add('activeBtn');
    this.activeBtnTimerId = setTimeout(this.returnBtnStyle, timerMS);
  }

  handlerSoundControl() {
    const imgSound = this.component.querySelector('#soundImg');

    if (this.sound) {
      imgSound.src = `${soundOff}`;
      this.sound = false;
    } else {
      imgSound.src = `${soundOn}`;
      this.sound = true;
    }
  }

  handleTransferWordClass() {
    if (this.transferWord.classList.contains('right-word')) {
      this.transferWord.classList.remove('right-word');
    }

    if (!this.transferWord.classList.contains('move-word')) {
      this.transferWord.classList.add('move-word');
    }

    this.transferWord.classList.remove('show-word');
  }

  changeStyleAnswerBtn(userChoseId, correctAnswerId) {
    const correctAnswerBtn = this.component.querySelector(`button[id='${correctAnswerId}']`);

    if (userChoseId) {
      const userChoseBtn = this.component.querySelector(`button[id='${userChoseId}']`);

      if (userChoseId !== correctAnswerId) {
        userChoseBtn.classList.add('incorrect');
      }
    }

    correctAnswerBtn.classList.add('correct');
  }

  clearBtnStyleAnswer() {
    const buttons = this.component.querySelectorAll('#gameBtnBlock button');
    buttons.forEach((btn) => {
      btn.classList.remove('correct');
      btn.classList.remove('incorrect');
    });
  }

  moveBackground() {
    this.backgroundStep -= 5;
    this.styleElement.innerHTML = `.game-savanna:after {background-position-y: ${this.backgroundStep}%;}`;
  }

  endGame() {
    this.score = this.calcPercentCorrectAnswer();
    localStorage.setItem('savannah-gameResult', this.score);
    localStorage.setItem('savannah-shortStatistic', JSON.stringify(this.shortStatistic));

    this.finishStatistic();
    this.playSound(finishGameAudio);
    changeRoute(GAMES_ROUTES.SAVANNAH_RESULT_GAME, ROUTERS.GAMES);
  }

  calcPercentCorrectAnswer() {
    this.shortStatistic.correct = [...new Set(this.shortStatistic.correct)];
    this.shortStatistic.incorrect = [...new Set(this.shortStatistic.incorrect)];
    const correct = this.shortStatistic.correct.length;
    const incorrect = this.shortStatistic.incorrect.length;

    const result = ((correct / (correct + incorrect)) * 100) || 0;
    return result.toFixed(1);
  }

  finishStatistic() {
    const date = Date.now();
    const res = `${this.score}% correct answers.`;
    const total = this.statisticTotal + 1;
    const data = [date, res, total];
    this.statistics.updateStatistics(GAMES_ROUTES.SAVANNAH, data);
  }

  returnBtnStyle() {
    this.activeBtn.classList.remove('activeBtn');
  }
}
