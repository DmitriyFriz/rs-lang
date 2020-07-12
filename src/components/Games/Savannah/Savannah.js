import BaseComponent from 'components/BaseComponent/BaseComponent';

import Words from 'domainModels/Words/Words';

import './Savannah.scss';

import { onRouteChangeEvent } from 'router/RouteHandler';

import { ROUTERS } from 'router/Router.Constants';

import getLayout from 'components/Games/Savannah/Savannah.Layout';

export default class Savannah extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.parent = parent;
    this.words = new Words();
    this.handlerCloseBtn = this.handlerCloseBtn.bind(this);
    this.handlerStartGame = this.handlerStartGame.bind(this);
  }

  createLayout() {
    this.parent.classList.add('game-savanna');
    this.component.innerHTML = getLayout();
    this.buttonBack = this.component.querySelector('#gameListBtn');
    this.buttonGame = this.component.querySelector('#startGameBtn');
  }

  addListeners() {
    this.buttonBack.addEventListener('click', this.handlerCloseBtn);
    this.buttonGame.addEventListener('click', this.handlerStartGame);
  }

  removeListeners() {
    this.buttonBack.removeEventListener('click', this.handlerCloseBtn);
    this.buttonGame.removeEventListener('click', this.handlerStartGame);
  }

  handlerCloseBtn(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
    this.body.removeAttribute('class');
  }

  handlerStartGame(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}
