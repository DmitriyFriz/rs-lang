import BaseComponent from 'components/BaseComponent/BaseComponent';

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

  const gameWord = createElement({
    tag: 'h1',
    content: 'New Word',
    id: 'currentGameWord',
  });

  const gameBtnBlock = createElement({
    tag: 'div',
    className: 'gameBtn-block',
    id: 'gameBtnBlock',
  });

  const firstBlock = createElement({
    tag: 'div',
    className: 'first-btn-block',
  });

  const secondBlock = createElement({
    tag: 'div',
    className: 'second-btn-block',
  });

  const gameBtn = [...Array(4)]
    .map(() => createElement({
      tag: 'button',
      className: 'savannah-button',
      content: 'type',
    }));

  firstBlock.append(gameBtn[0], gameBtn[1]);
  secondBlock.append(gameBtn[2], gameBtn[3]);

  gameBtnBlock.append(firstBlock, secondBlock);
  wordPlace.append(gameWord);
  savannahWrapper.append(gameBtnBlock, wordPlace);

  return savannahWrapper;
}
