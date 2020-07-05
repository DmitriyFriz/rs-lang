import BaseComponent from 'components/BaseComponent/BaseComponent';
import User from 'domainModels/User/User';
import Words from 'domainModels/Words/Words';
import './Savannah.scss';

export default class Savannah extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.user = new User();
    this.words = new Words();
    this.handlerCloseBtn = this.handlerCloseBtn.bind(this);
  }

  createLayout() {
    this.component.classList.add('game-savanna');
    const button = BaseComponent.createElement({
      tag: 'button',
      content: 'close',
      id: 'closeBtn',
      className: 'button',
    });
    this.component.append(button);

    this.button = this.component.querySelector('#closeBtn');

    console.log(this.button);

    this.words.getChunk(3, 0)
      .then((result) => {
        console.log(result);
        const gameWords = result.data.map((el) => BaseComponent.createElement({
          tag: 'h3',
          content: `Words: ${el.word} - Translate: ${el.wordTranslate}`,
          id: el.id,
        }));
        this.component.append(...gameWords);
      });
  }

  addListeners() {
    this.button.addEventListener('click', this.handlerCloseBtn);
  }

  removeListeners() {
    this.button.removeEventListener('click', this.handlerCloseBtn);
  }

  handlerCloseBtn() {
    this.hide();
  }
}
