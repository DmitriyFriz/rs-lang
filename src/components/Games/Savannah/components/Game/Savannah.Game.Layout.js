import BaseComponent from 'components/BaseComponent/BaseComponent';
import lifeIn from '../../images/life_in.svg';
import soundOn from '../../images/music_on.svg';

export default function getGameLayout() {
  const { createElement } = BaseComponent;
  const savannahWrapper = createElement({
    tag: 'div',
    className: 'savannah__game-wrapper',
  });

  const wordPlace = createElement({
    tag: 'div',
    className: 'savannah-game__word move-word',
    id: 'transferWord',
  });

  const controlGame = createElement({
    tag: 'div',
    className: 'control-game',
  });

  const soundBlock = createElement({
    tag: 'div',
    className: 'soundBlock',
  });

  const lifeGameBlock = createElement({
    tag: 'div',
    className: 'game-life-block',
    id: 'gameLifeBlock',
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

  const gameLife = [...Array(5)].map((img, index) => createElement({
    tag: 'img',
    className: 'gameLife',
    id: `life${index}`,
  }));

  gameLife.forEach((element) => {
    element.src = `${lifeIn}`;
  });

  const soundControl = createElement({
    tag: 'button',
    className: 'sound-control-btn',
    id: 'controlSound',
  });

  const soundImg = createElement({
    tag: 'img',
    className: 'savannah-sound-img',
    id: 'soundImg',
  });

  soundImg.src = soundOn;
  soundControl.append(soundImg);

  const gameBtn = [...Array(4)]
    .map(() => createElement({
      tag: 'button',
      className: 'savannah-button',
      content: 'type',
    }));

  soundBlock.append(soundControl);
  lifeGameBlock.append(...gameLife);

  controlGame.append(soundBlock, lifeGameBlock);

  firstBlock.append(gameBtn[0], gameBtn[1]);
  secondBlock.append(gameBtn[2], gameBtn[3]);

  gameBtnBlock.append(firstBlock, secondBlock);
  wordPlace.append(gameWord);
  savannahWrapper.append(wordPlace, gameBtnBlock, controlGame);

  return savannahWrapper;
}
