// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { GAMES_ROUTES } from 'router/Router.Constants';

const { createElement } = BaseComponent;

export default function getLayout() {
  const container = createElement({ tag: 'div', className: 'sprint-container' });
  const card = createElement({ tag: 'div', className: 'sprint-card' });

  const time = createElement({ tag: 'div', className: 'timer', content: '60' });
  const resultIcon = createElement({ tag: 'div', className: 'sprint-card__result-icon' });

  const scoreIcon = createElement({ tag: 'div', className: 'sprint-card__score-icon' });
  const scoreContainer = createElement({ tag: 'div', className: 'sprint-card__score', content: '0' });
  const scoreWrapper = createElement({ tag: 'div', className: 'sprint-card__score-wrapper' });
  scoreWrapper.append(scoreIcon, scoreContainer);

  const wordContainer = createElement({ tag: 'p', className: 'sprint-card__word' });
  const answerContainer = createElement({ tag: 'p', className: 'sprint-card__word' });

  const buttonContainer = createElement({ tag: 'div', className: 'sprint-card__button-container' });
  const falseButton = createElement({
    tag: 'button',
    className: 'sprint-card__button sprint-card__button_incorrect',
    content: 'incorrect',
  });
  const trueButton = createElement({
    tag: 'button',
    className: 'sprint-card__button sprint-card__button_correct',
    content: 'correct',
  });
  buttonContainer.append(falseButton, trueButton);

  const keyContainer = createElement({ tag: 'div', className: 'key-container' });
  const leftKey = createElement({ tag: 'div', className: 'key key_incorrect' });
  const rightKey = createElement({ tag: 'div', className: 'key key_correct' });
  keyContainer.append(leftKey, rightKey);

  const additionalContainer = createElement({
    tag: 'div',
    className: 'sprint-card__button-container sprint-card__additional-container',
  });
  const gamesButton = createElement({
    tag: 'button',
    className: 'sprint-card__button',
    content: 'Games',
    destination: GAMES_ROUTES.GAMES_LIST,
  });
  const soundButton = createElement({
    tag: 'button',
    className: 'sprint-card__button',
    content: 'Sound',
  });
  additionalContainer.append(gamesButton, soundButton);

  card.append(
    time, resultIcon, scoreWrapper, wordContainer,
    answerContainer, buttonContainer, additionalContainer,
  );
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
    gamesButton,
  ];
}
