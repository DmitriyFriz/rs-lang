// constants
import { GAMES_ROUTES, SPEAK_IT_ROUTERS } from 'router/Router.Constants';

// icons
import logo from 'assets/mini-games-logo/speakItLogo.svg';

export default function getLayout() {
  return `
    <div class="game-message">
      <img class="game-message__logo" src=${logo} alt="game logo">
      <h1 class="game-message__title">SpeakIt</h1>
      <p class="game-message__description">Improve your english pronunciation and lear new words</p>
      <div class="game-message__button-container">
        <button class="game-message__button" data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
        <button class="game-message__button" data-destination=${SPEAK_IT_ROUTERS.SPEAK_IT_MAIN}>Play</button>
      </div>
    </div>
  `;
}
