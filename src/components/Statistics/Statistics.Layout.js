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

export { getNoStatNotification, getGamesStatLayout };
