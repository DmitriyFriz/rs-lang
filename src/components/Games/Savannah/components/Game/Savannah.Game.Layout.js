import BaseComponent from 'components/BaseComponent/BaseComponent';
import keyboardImg from '../../images/keyboard.svg';

export default function getGameLayout() {
  const savannahWrapper = BaseComponent.createElement({
    tag: 'div',
    className: 'savannah__game-wrapper',
  });

  const wordPlace = BaseComponent.createElement({
    tag: 'div',
    className: 'savannah-game__word',
    id: 'transferWord',
  });

  const word = BaseComponent.createElement({
    tag: 'h1',
    content: 'New Word',
  });

  wordPlace.append(word);

  const keyInfo = BaseComponent.createElement({
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
