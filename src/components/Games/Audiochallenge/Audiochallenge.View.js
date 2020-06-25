// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES, AUDIO_CHALLENGE_ROUTERS } from 'router/Router.Constants';

class AudioChallenge extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.AUDIO_CHALLENGE;
  }

  createLayout() {
    this.component.innerHTML = `
    <div class="start-message">
      <h1>AudioChallenge</h1>
      <p>Listen a word and choose the right translation</p>
      <div>
        <button data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
        <button data-destination=${AUDIO_CHALLENGE_ROUTERS.AUDIO_CHALLENGE_MAIN}>Play</button>
      </div>
    </div>
    `;
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }
}

export default AudioChallenge;
