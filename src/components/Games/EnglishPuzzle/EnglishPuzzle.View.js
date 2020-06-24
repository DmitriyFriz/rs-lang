// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from '../../../router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES, ENGLISH_PUZZLE_ROUTES } from '../../../router/Router.Constants';
import createLayoutGame from './components/StartLayout/EnglishPuzzle.StartLayout';

class EnglishPuzzle extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.ENGLISH_PUZZLE;
  }

  createLayout() {
    this.component.innerHTML = createLayoutGame;
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.ENGLISH_PUZZLE));
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME));
  }
}

export default EnglishPuzzle;
