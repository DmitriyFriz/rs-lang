// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

class SpeakIt extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.SPEAK_IT;
  }

  createLayout() {
    this.component.innerHTML = `
      SpeakIt Game
      <button data-destination=${GAMES_ROUTES.GAMES_LIST}>Go back to Games</button>
    `;
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }
}

export default SpeakIt;
