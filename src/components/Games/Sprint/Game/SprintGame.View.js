// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// styles
import './SprintGame.scss';

class SprintGame extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.SPRINT_GAME;
  }

  createLayout() {
    this.component.innerHTML = `
    <div class="start-message">
      <h1>SPRINT GAME</h1>
    </div>
    `;
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }
}

export default SprintGame;
