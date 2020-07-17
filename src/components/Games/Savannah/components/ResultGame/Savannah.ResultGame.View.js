import BaseComponent from 'components/BaseComponent/BaseComponent';
import Statistics from 'domainModels/Statistics/Statistics';
import ShortStatistic from 'components/Games/ShortStatistic/ShortStatistic.View';
import getSavannahResultLayout from 'components/Games/Savannah/components/ResultGame/Savanna.ResultGame.Layout';

import './Savanna.ResultGame.scss';
import { onRouteChangeEvent } from 'router/RouteHandler';
import { ROUTERS } from 'router/Router.Constants';

export default class SavannahResultGameView extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.body = document.body;
    this.statistics = new Statistics();
    this.shortStatistic = JSON.parse(localStorage.getItem('savannah-shortStatistic'));

    this.handlerGetReady = this.handlerGetReady.bind(this);
    this.handlerCloseBtn = this.handlerCloseBtn.bind(this);
  }

  createLayout() {
    this.component.innerHTML = getSavannahResultLayout();

    this.buttonBack = this.component.querySelector('#gameListBtn');
    this.buttonGame = this.component.querySelector('#startGameBtn');
    this.levelGroup = document.getElementsByName('chapter');

    this.statisticList = new ShortStatistic(this.component.firstElementChild, this.shortStatistic);
    this.statisticList.show();
  }

  addListeners() {
    this.buttonBack.addEventListener('click', this.handlerCloseBtn);
    this.buttonGame.addEventListener('click', this.handlerGetReady);
  }

  removeListeners() {
    this.buttonBack.removeEventListener('click', this.handlerCloseBtn);
    this.buttonGame.removeEventListener('click', this.handlerGetReady);

    super.removeListeners();
    this.statisticList.hide();
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

    this.body.removeAttribute('class');
    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}
