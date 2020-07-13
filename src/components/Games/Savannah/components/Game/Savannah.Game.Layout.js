import BaseComponent from 'components/BaseComponent/BaseComponent';
import keyboardImg from '../../images/keyboard.svg';

export default function getGameLayout() {
  const { createElement } = BaseComponent;
  const savannahWrapper = createElement({
    tag: 'div',
    className: 'savannah__game-wrapper',
  });

  const wordPlace = createElement({
    tag: 'div',
    className: 'savannah-game__word',
    id: 'transferWord',
  });

  const word = createElement({
    tag: 'h1',
    content: 'New Word',
  });

  wordPlace.append(word);

  const keyInfo = createElement({
    tag: 'div',
    className: 'keyboard-info',
  });

  const keyInfoMessage = `
    <img src="${keyboardImg}">
  `;

  keyInfo.insertAdjacentHTML('afterbegin', keyInfoMessage);

  savannahWrapper.append(wordPlace, keyInfo);

  return savannahWrapper;
}
