import { GAMES_ROUTES, ENGLISH_PUZZLE_ROUTES } from '../../../../../router/Router.Constants';

const createLayoutGame = () => (
  `<div class="start-display">
    <img class="logo-of-game" src="./../../../../../assets/mini-games-logo/englishPuzzleLogo.svg" alt="">
    <h1 class="name-of-game">English–Puzzle</h1>
    <h3 class="description-of-game">Practice your writing English skills</h3>
    <div class="button-for-game">
      <button class="button" data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
      <button class="button" data-destination=${ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME}>Play</button>
    </div>
  </div>`
);

export default createLayoutGame();
