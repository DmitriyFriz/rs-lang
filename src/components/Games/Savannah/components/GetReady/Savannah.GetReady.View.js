import BaseComponent from 'components/BaseComponent/BaseComponent';
import Words from 'domainModels/Words/Words';
import Loader from 'components/Loader/Loader.View';
import getGetReadyLayout from 'components/Games/Savannah/components/GetReady/Savannah.GetReady.Layout';

import './Savannah.GetReady.scss';
import { changeRoute } from 'router/RouteHandler';
import { GAMES_ROUTES, ROUTERS } from 'router/Router.Constants';

export default class SavannahGetReady extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.body = document.body;
    this.loader = new Loader();
    this.words = new Words();
    this.level = localStorage.getItem('savannah-level');
    this.timerMiliSeconds = 1000;
    this.countdown = 5;

    this.startGame = this.startGame.bind(this);
    this.countTimer = this.countTimer.bind(this);

    this.loader.show();
  }

  async prepareData() {
    this.group = await this.words.selectGroupWords(this.level);
    const { repeatWords } = this.words;
    const { newWords } = this.words;
    this.gameArray = [...repeatWords, ...newWords, ...this.group];
    this.shuffleWords(this.gameArray);
    localStorage.setItem('savannah-gameArray', JSON.stringify(this.gameArray));
  }

  removeListeners() {
    clearInterval(this.timerId);
    clearInterval(this.timeSetIntervalID);
  }

  createLayout() {
    if (!this.body.classList.contains('game-savanna')) {
      this.body.classList.add('game-savanna');
    }
    const layout = getGetReadyLayout();
    this.timerTitle = layout.querySelector('#countdown');
    this.timerId = setInterval(this.countTimer, this.timerMiliSeconds);
    this.component.append(layout);
    this.timeSetIntervalID = setTimeout(this.startGame, 5500);

    this.loader.hide();
  }

  startGame() {
    changeRoute(GAMES_ROUTES.SAVANNAH_GAME, ROUTERS.GAMES);
  }

  countTimer() {
    this.countdown -= 1;
    this.timerTitle.textContent = this.countdown;

    if (this.countdown === 0) {
      this.timerTitle.textContent = 'GO';
      clearInterval(this.timerId);
    }
  }

  shuffleWords(words) {
    const array = words;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (array.length));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
