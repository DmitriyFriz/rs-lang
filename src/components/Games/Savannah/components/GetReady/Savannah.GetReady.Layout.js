import BaseComponent from 'components/BaseComponent/BaseComponent';
import keyboardImg from '../../images/keyboard.svg';
import key1 from '../../images/key_1.png';
import key2 from '../../images/key_2.png';
import key3 from '../../images/key_3.png';
import key4 from '../../images/key_4.png';

export default function getGetReadyLayout() {
  const { createElement } = BaseComponent;

  const layout = createElement({
    tag: 'div',
    className: 'getReady-wrapper',
  });

  const timer = createElement({
    tag: 'div',
    className: 'getReady-timer',
    id: 'timerBlock',
  });

  const countdown = createElement({
    tag: 'h1',
    className: 'countdown-timer countLoad',
    content: '5',
    id: 'countdown',
  });

  const keyInfo = createElement({
    tag: 'div',
    className: 'keyboard-info',
  });

  const keyInfoMessage = `
    <img src="${keyboardImg}" alt="Key 1">
    <p class="keyboard-info__text">Use keys
    <img src="${key1}" alt="Use key 1">
    <img src="${key2}" alt="Use Key 2">
    <img src="${key3}" alt="Use Key 3"> and
    <img src="${key4}" alt="Use Key 4">
    to give a quick answer.</p>
  `;

  timer.append(countdown);
  keyInfo.insertAdjacentHTML('afterbegin', keyInfoMessage);
  layout.append(timer, keyInfo);

  return layout;
}
