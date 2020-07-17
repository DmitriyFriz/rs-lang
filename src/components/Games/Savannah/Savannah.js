import BaseComponent from 'components/BaseComponent/BaseComponent';

import Words from 'domainModels/Words/Words';

import './Savannah.scss';

import { onRouteChangeEvent } from 'router/RouteHandler';

import { ROUTERS } from 'router/Router.Constants';

import getLayout from 'components/Games/Savannah/Savannah.Layout';

export default class Savannah extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.body = document.body;
    this.words = new Words();

    this.handlerCloseBtn = this.handlerCloseBtn.bind(this);
    this.handlerGetReady = this.handlerGetReady.bind(this);
  }

  createLayout() {
    this.body.classList.add('game-savanna');

    this.component.insertAdjacentHTML('afterbegin', getLayout());

    this.buttonBack = this.component.querySelector('#gameListBtn');
    this.buttonGame = this.component.querySelector('#startGameBtn');
    this.levelGroup = document.getElementsByName('chapter');
  }

  addListeners() {
    this.buttonBack.addEventListener('click', this.handlerCloseBtn);
    this.buttonGame.addEventListener('click', this.handlerGetReady);
  }

  removeListeners() {
    this.buttonBack.removeEventListener('click', this.handlerCloseBtn);
    this.buttonGame.removeEventListener('click', this.handlerGetReady);
    localStorage.removeItem('savannah-gameArray');
  }

  handlerCloseBtn(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
    this.body.removeAttribute('class');
  }

  handlerGetReady(event) {
    this.levelGroup
      .forEach((level) => {
        if (level.checked) {
          localStorage.setItem('savannah-level', level.value);
        }
      });

    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}
