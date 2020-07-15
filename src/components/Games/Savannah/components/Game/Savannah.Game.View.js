import BaseComponent from 'components/BaseComponent/BaseComponent';
import Words from 'domainModels/Words/Words';
import Statistics from 'domainModels/Statistics/Statistics';
import getGameLayout from 'components/Games/Savannah/components/Game/Savannah.Game.Layout';
import get from 'lodash.get';
import { GAMES_ROUTES } from 'router/Router.Constants';

import './SavannahGame.scss';

// Audio
import startGameAudio from 'assets/mini-games/audio/start-game.mp3';
import correctAudio from 'assets/mini-games/audio/correct.mp3';
import errorAudio from 'assets/mini-games/audio/error.mp3';
import supersetAudio from 'assets/mini-games/audio/superset.mp3';

export default class SavannahGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.statistics = new Statistics();
    this.word = new Words();
    this.date = new Date();
    this.sound = true;
    this.wordIndex = 0;
    this.gameArray = JSON.parse(localStorage.getItem('savannah-gameArray'));

    this.handleAnswer = this.handleAnswer.bind(this);
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
    const gameWords = this.getGameWord();
    [, this.transferWord] = this.layout.childNodes;
    const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
    this.addGameData(gameWords, gameWordsBtn);

    this.component.append(this.layout);
  }

  addListeners() {
    const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
    gameWordsBtn.forEach((btn) => {
      btn.addEventListener('click', this.handleAnswer);
    });
  }

  removeListeners() {
    const gameWordsBtn = this.layout.querySelectorAll('#gameBtnBlock button');
    gameWordsBtn.forEach((btn) => {
      btn.removeEventListener('click', this.handleAnswer);
    });
  }

  getGameWord() {
    const rightWord = this.gameArray[this.wordIndex];
    let wordCounter = 0;
    const wrongWord = this.gameArray.map((word) => {
      if (rightWord !== word) {
        if (
          Math.random() >= 0.99
          && wordCounter !== 3
        ) {
          wordCounter += 1;
          return word;
        }
        return null;
      }
    }).filter((word) => word);

    return {
      gameWords: [...wrongWord, rightWord],
      rightWord,
    };
  }

  addGameData(gameWords, gameWordsBtn) {
    const currentGameWord = this.transferWord.querySelector('#currentGameWord');
    const { rightWord } = gameWords;
    this.correctAnswer = rightWord._id;
    const btnArray = this.shuffleArray([...gameWordsBtn]);
    // this.shuffleArray(btnArray);
    console.log(btnArray);

    btnArray.forEach((btn, i) => {
      const id = gameWords.gameWords[i]._id;
      const word = gameWords.gameWords[i].wordTranslate;
      btn.id = id;
      btn.textContent = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
      currentGameWord.textContent = rightWord.word;
      this.transferWord.classList.add('move-word');
    });
  }

  handleAnswer(event) {
    this.checkAnswer(event.target.id);
  }

  checkAnswer(answerId) {
    if (answerId === this.correctAnswer) {
      this.playSound(correctAudio);
    }

    this.playSound(errorAudio);
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

  moveBackground() {

  }

  // moveWord() {
  //   const gameTime = new Date().getSeconds();
  //   const finalGameTime = this.second + this.singTime;
  //
  //   if (gameTime === finalGameTime) {
  //     clearInterval(this.timerId);
  //   }
  //
  //   this.moveWordSape += 0.8;
  //   this.transferWord.style.top = `${this.moveWordSape}px`;
  // }

  // hideWord() {
  //   // this.transferWord.classList.add('hide-word');
  // }
}
