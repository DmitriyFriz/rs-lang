// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { GAMES_ROUTES } from 'router/Router.Constants';

export default function getLayout() {
  const container = BaseComponent.createElement({ tag: 'div', className: 'sprint-container' });
  const card = BaseComponent.createElement({ tag: 'div', className: 'sprint-card' });

  const time = BaseComponent.createElement({ tag: 'div', className: 'timer', content: '60' });
  const resultIcon = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__result-icon' });

  const scoreIcon = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__score-icon' });
  const scoreContainer = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__score', content: '0' });
  const scoreWrapper = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__score-wrapper' });
  scoreWrapper.append(scoreIcon, scoreContainer);

  const wordContainer = BaseComponent.createElement({ tag: 'p', className: 'sprint-card__word' });
  const answerContainer = BaseComponent.createElement({ tag: 'p', className: 'sprint-card__word' });

  const buttonContainer = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__button-container' });
  const falseButton = BaseComponent.createElement({
    tag: 'button',
    className: 'sprint-card__button sprint-card__button_incorrect',
    content: 'incorrect',
  });
  const trueButton = BaseComponent.createElement({
    tag: 'button',
    className: 'sprint-card__button sprint-card__button_correct',
    content: 'correct',
  });
  buttonContainer.append(falseButton, trueButton);

  const keyContainer = BaseComponent.createElement({ tag: 'div', className: 'key-container' });
  const leftKey = BaseComponent.createElement({ tag: 'div', className: 'key key_incorrect' });
  const rightKey = BaseComponent.createElement({ tag: 'div', className: 'key key_correct' });
  keyContainer.append(leftKey, rightKey);

  const additionalContainer = BaseComponent.createElement({
    tag: 'div',
    className: 'sprint-card__button-container sprint-card__additional-container',
  });
  const gamesButton = BaseComponent.createElement({
    tag: 'button',
    className: 'sprint-card__button',
    content: 'Games',
    destination: GAMES_ROUTES.GAMES_LIST
  });
  const soundButton = BaseComponent.createElement({
    tag: 'button',
    className: 'sprint-card__button',
    content: 'Sound',
  });
  additionalContainer.append(gamesButton, soundButton);


  card.append(time, resultIcon, scoreWrapper, wordContainer, answerContainer, buttonContainer, additionalContainer);
  container.append(card, keyContainer);
  return [
    container,
    time,
    wordContainer,
    answerContainer,
    falseButton,
    trueButton,
    leftKey,
    rightKey,
    resultIcon,
    scoreContainer,
    soundButton,
    gamesButton
  ];
}
