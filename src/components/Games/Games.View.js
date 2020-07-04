// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

import GamesList from './GamesList/GamesList.View';
import SpeakIt from './SpeakIt/SpeakIt.View';
import SpeakItMain from './SpeakIt/components/SpeakItMain.View';

// router
import Router from '../../router/Router';
import {
  registerRouter,
  onRouteChangeEvent,
  unregisterRouter,
} from '../../router/RouteHandler';

// constants
import { MAIN_ROUTES, ROUTERS, GAMES_ROUTES, SPEAK_IT_ROUTERS } from '../../router/Router.Constants';

class Games extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.GAMES;
  }

  prepareData() {
    const gamesRoutes = {
      [GAMES_ROUTES.GAMES_LIST]: GamesList,
      [GAMES_ROUTES.SPEAK_IT]: SpeakIt,
      [SPEAK_IT_ROUTERS.SPEAK_IT_MAIN]: SpeakItMain,
    };

    this.gamesRouter = new Router(
      ROUTERS.GAMES,
      this.component,
      gamesRoutes,
      GAMES_ROUTES.GAMES_LIST,
    );
    registerRouter(this.gamesRouter);
  }

  removeListeners() {
    unregisterRouter(this.gamesRouter);
  }
}

export default Games;
