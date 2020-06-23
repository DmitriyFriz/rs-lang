// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

import GamesList from './GamesList/GamesList.View';
import SpeakIt from './SpeakIt/SpeakIt.View';

// router
import Router from '../../router/Router';
import {
  registerRouter,
  onRouteChangeEvent,
  unregisterRouter,
} from '../../router/RouteHandler';

// constants
import { MAIN_ROUTES, ROUTERS, GAMES_ROUTES } from '../../router/Router.Constants';

class Games extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.GAMES;
  }

  prepareData() {
    const gamesRoutes = {
      [GAMES_ROUTES.GAMES_LIST]: GamesList,
      [GAMES_ROUTES.SPEAK_IT]: SpeakIt,
    };

    this.gamesRouter = new Router(
      ROUTERS.GAMES,
      this.component,
      gamesRoutes,
      GAMES_ROUTES.GAMES_LIST,
    );
    registerRouter(this.gamesRouter);
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }

  removeListeners() {
    this.component.removeEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));

    unregisterRouter(this.gamesRouter);
  }
}

export default Games;
