// views
import BaseComponent from '../BaseComponent/BaseComponent';
import StartMenu from './StartMenu/StartMenu.View';
import LearningWords from './LearningWords/LearningWords.View';

// router
import Router from '../../router/Router';
import {
  registerRouter,
  onRouteChangeEvent,
  unregisterRouter,
} from '../../router/RouteHandler';

// constants
import { ROUTERS, MAIN_ROUTES, MAIN_PAGE_ROUTES } from '../../router/Router.Constants';

class MainPage extends BaseComponent {
  static get name() {
    return MAIN_ROUTES.MAIN_PAGE;
  }

  prepareData() {
    const mainPageRoutes = {
      [MAIN_PAGE_ROUTES.START_MENU]: StartMenu,
      [MAIN_PAGE_ROUTES.LEARNING_WORDS]: LearningWords,
    };

    this.mainPageRouter = new Router(
      ROUTERS.MAIN_PAGE,
      this.component,
      mainPageRoutes,
      MAIN_PAGE_ROUTES.START_MENU,
    );
    registerRouter(this.mainPageRouter);
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.MAIN_PAGE));
  }

  removeListeners() {
    this.component.removeEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.MAIN_PAGE));

    unregisterRouter(this.mainPageRouter);
  }
}

export default MainPage;
