import BaseComponent from 'components/BaseComponent/BaseComponent';
import Words from 'domainModels/Words/Words';
import Statistics from 'domainModels/Statistics/Statistics';
import getGameLayout from 'components/Games/Savannah/components/Game/Savannah.Game.Layout';
import get from 'lodash.get';
import { GAMES_ROUTES } from 'router/Router.Constants';

import './SavannahGame.scss';

export default class SavannahGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.statistics = new Statistics();
    this.word = new Words();
    this.date = new Date();
    // this.second = this.date.getSeconds();
    this.wordIndex = 0;
    this.moveWordSape = 0;
    this.singTime = 6;
    // this.animateWordMsec = 4000;
    this.gameArray = JSON.parse(localStorage.getItem('savannah-gameArray'));

    // this.moveWord = this.moveWord.bind(this);
    this.hideWord = this.hideWord.bind(this);
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
    const layout = getGameLayout();
    const gameWords = this.getGameWord();
    [, this.transferWord] = layout.childNodes;
    const gameWordsBtn = layout.querySelectorAll('#gameBtnBlock button');
    this.addGameData(gameWords, gameWordsBtn);

    this.component.append(layout);
  }

  addListeners() {
  }

  removeListeners() {
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
    gameWordsBtn.forEach((btn, i) => {
      const id = gameWords.gameWords[i]._id;
      const word = gameWords.gameWords[i].wordTranslate;
      btn.id = id;
      btn.textContent = `${i + 1}. ${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
      currentGameWord.textContent = rightWord.word;
      this.transferWord.classList.add('move-word');
    });
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

  hideWord() {
    // this.transferWord.classList.add('hide-word');
  }
}
