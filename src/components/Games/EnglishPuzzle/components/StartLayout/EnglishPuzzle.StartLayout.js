import { GAMES_ROUTES, ENGLISH_PUZZLE_ROUTES } from 'router/Router.Constants';

// logo
import logo from 'assets/mini-games-logo/englishPuzzleLogo.svg';

const createLayoutGame = () => (
  `<div class="game-message">
    <img class="game-message__logo" src="${logo}" alt="">
    <h1 class="game-message__title">English–Puzzle</h1>
    <p class="game-message__description">Practice your writing English skills</p>
    <div class="game-message__button-container">
      <button class="game-message__button" data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
      <button class="game-message__button" data-destination=${ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME}>Play</button>
    </div>
  </div>`
);

export default createLayoutGame();
