// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

import EnglishPuzzleGame from 'components/Games/EnglishPuzzle/EnglishPuzzleGame.View';
import GamesList from './GamesList/GamesList.View';
import SpeakIt from './SpeakIt/SpeakIt.View';
import EnglishPuzzle from './EnglishPuzzle/EnglishPuzzleMenu.View';
import SpeakItMain from './SpeakIt/components/SpeakItMain.View';
import SprintStart from './Sprint/Start/SprintStart.View';
import SprintGame from './Sprint/Game/SprintGame.View';
import SprintFinish from './Sprint/Finish/SprintFinish.View';

// router
import Router from '../../router/Router';
import {
  registerRouter,
  unregisterRouter,
} from '../../router/RouteHandler';

// constants
import {
  MAIN_ROUTES, ROUTERS, GAMES_ROUTES, SPEAK_IT_ROUTERS, ENGLISH_PUZZLE_ROUTES,
} from '../../router/Router.Constants';

class Games extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.GAMES;
  }

  prepareData() {
    const gamesRoutes = {
      [GAMES_ROUTES.GAMES_LIST]: GamesList,
      [GAMES_ROUTES.SPEAK_IT]: SpeakIt,
      [SPEAK_IT_ROUTERS.SPEAK_IT_MAIN]: SpeakItMain,
      [GAMES_ROUTES.ENGLISH_PUZZLE]: EnglishPuzzle,
      [GAMES_ROUTES.SPRINT]: SprintStart,
      [GAMES_ROUTES.SPRINT_GAME]: SprintGame,
      [GAMES_ROUTES.SPRINT_FINISH]: SprintFinish,
      [ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME]: EnglishPuzzleGame,
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
