import BaseComponent from 'components/BaseComponent/BaseComponent';
import keyboardImg from '../../images/keyboard.svg';

export default function getGameLayout() {
  const savannahWrapper = BaseComponent.createElement({
    tag: 'div',
    className: 'savannah__game-wrapper',
  });

  const word = BaseComponent.createElement({
    tag: 'div',
    className: 'savannah-game__word',
    content: 'New Word',
    id: 'transferWord',
  });

  const keyInfo = BaseComponent.createElement({
    tag: 'div',
    className: 'keyboard-info',
  });

  const keyInfoMessage = `
    <img src="${keyboardImg}">
  `;

  keyInfo.insertAdjacentHTML('afterbegin', keyInfoMessage);

  savannahWrapper.append(word, keyInfo);

  return savannahWrapper;
}
