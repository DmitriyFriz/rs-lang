// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// styles
import './SprintStart.scss';

class SprintStart extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.SPRINT;
  }

  createLayout() {
    this.component.innerHTML = `
    <div class="start-message">
      <h1>SPRINT</h1>
      <p>Select correct or incorrect translation</p>
      <div>
        <button data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
        <button data-destination=${GAMES_ROUTES.SPRINT_GAME}>Play</button>
      </div>
    </div>
    `;
  }

  addListeners() {
    this.component.addEventListener('click', this.handleClick);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}

export default SprintStart;
