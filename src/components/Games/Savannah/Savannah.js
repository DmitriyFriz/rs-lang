import BaseComponent from 'components/BaseComponent/BaseComponent';
import Words from 'domainModels/Words/Words';
import './Savannah.scss';
import { onRouteChangeEvent } from 'router/RouteHandler';
import { ROUTERS } from 'router/Router.Constants';
import getLayout from 'components/Games/Savannah/Savannah.Layout';

export default class Savannah extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.words = new Words();
    this.handlerCloseBtn = this.handlerCloseBtn.bind(this);
    this.handlerStartGame = this.handlerStartGame.bind(this);
  }

  createLayout() {
    this.body = document.body;
    this.body.classList.add('game-savanna');
    this.component.innerHTML = getLayout();
    this.buttonBack = this.component.querySelector('#gameListBtn');
    this.buttonGame = this.component.querySelector('#startGameBtn');
    // const button = BaseComponent.createElement({
    //   tag: 'button',
    //   content: 'close',
    //   id: 'closeBtn',
    //   className: 'button',
    //   destination: GAMES_ROUTES.GAMES_LIST,
    // });
    // this.component.append(button);
    // this.button = this.component.querySelector('#closeBtn');

    // this.words.getChunk(3, 0)
    //   .then((result) => {
    //     console.log(result);
    //     const gameWords = result.data.map((el) => BaseComponent.createElement({
    //       tag: 'h3',
    //       content: `Words: ${el.word} - Translate: ${el.wordTranslate}`,
    //       id: el.id,
    //     }));
    //     this.component.append(...gameWords);
    //   });
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
