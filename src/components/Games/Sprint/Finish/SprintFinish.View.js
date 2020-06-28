// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// styles
import './SprintFinish.scss';

class SprintFinish extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.SPRINT_FINISH;
  }

  createLayout() {
    this.score = localStorage.getItem('sprint-score');
    this.component.innerHTML = `
    <div class="start-message">
      <h1>Yor result ${this.score}</h1>
      <div>
        <button data-destination=${GAMES_ROUTES.GAMES_LIST}>Games</button>
        <button data-destination=${GAMES_ROUTES.SPRINT_GAME}>Repeat</button>
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

export default SprintFinish;
