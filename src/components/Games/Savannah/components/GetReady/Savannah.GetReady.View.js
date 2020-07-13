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
    this.loader = new Loader();
    this.words = new Words();
    this.timerSeconds = 5;
    this.startGame = this.startGame.bind(this);
    this.loader.show();
  }

  async prepareData() {
    this.group = await this.words.selectGroupWords(0);
    console.log(this.group);
    this.loader.hide();
  }

  createLayout() {
    const layout = getGetReadyLayout();
    this.component.classList.add('getReady-wrapper');
    this.component.append(layout);
    setTimeout(this.startGame, 3000);
  }

  startGame() {
    changeRoute(GAMES_ROUTES.SAVANNAH_GAME, ROUTERS.GAMES);
  }
}
