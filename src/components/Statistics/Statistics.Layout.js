// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

function getNoStatNotification() {
  return `
      <p class="no-stat__title">Do at least one training and I'll show you everything</p>
  `;
}

function getGamesStatLayout(name, lastGameDate, res, totalGames) {
  return `
    <p class="game-stat__title">${name}</p>
    <div class="game-stat__last-game">
      <p class="last-game__title">Last game: <span class="value">${lastGameDate}</span></p>
    </div>

    <div class="game-stat__res">
      <p class="res__title">Result: <span class="value">${res}</span></p>
    </div>

    <div class="game-stat__total-games">
      <p class="total-games__title">Total games: <span class="value">${totalGames}</span></p>
    </div>
  `;
}

function initMainStatLayout(root, stat) {
  const noStatNotification = createElement(
    {
      tag: 'div',
      className: 'statistics-page__no-stat',
      innerHTML: getNoStatNotification(),
    },
  );

  if (!stat) {
    root.append(noStatNotification);
    return;
  }

  const chartContainer = createElement({
    tag: 'div',
    id: 'statistics-chart',
  });
  root.append(chartContainer);
}

export { initMainStatLayout, getGamesStatLayout };
