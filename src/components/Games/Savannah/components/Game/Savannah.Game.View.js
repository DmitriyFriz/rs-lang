import BaseComponent from 'components/BaseComponent/BaseComponent';

import getGameLayout from 'components/Games/Savannah/components/Game/Savannah.Game.Layout';

import Loader from 'components/Loader/Loader.View';

import Words from 'domainModels/Words/Words';

import './SavannahGame.scss';

export default class SavannahGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.loader = new Loader();
    this.date = new Date();
    this.second = this.date.getSeconds();
    this.moveWordSape = 0;
    this.singTime = 6;
    this.animateWordMsec = 4000;
    this.loader.show();

    this.moveWord = this.moveWord.bind(this);
    this.hideWord = this.hideWord.bind(this);
  }

  async prepareData() {

    this.loader.hide();
  }

  createLayout() {
    const layout = getGameLayout();
    [this.transferWord] = layout.childNodes;

    this.transferWord.style.top = `${this.moveWordSape}px`;

    this.component.append(layout);

    this.transferWord.classList.add('move-word');
    this.timerId = setInterval(this.moveWord, 10);
    setTimeout(this.hideWord, this.animateWordMsec);
  }

  addListeners() {
  }

  removeListeners() {
  }

  moveWord() {
    const gameTime = new Date().getSeconds();
    const finalGameTime = this.second + this.singTime;

    if (gameTime === finalGameTime) {
      clearInterval(this.timerId);
    }

    this.moveWordSape += 0.8;
    this.transferWord.style.top = `${this.moveWordSape}px`;
  }

  hideWord() {
    this.transferWord.classList.add('hide-word');
  }
}
