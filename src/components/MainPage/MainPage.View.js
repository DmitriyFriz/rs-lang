// constants
import { ROUTERS, MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// router
import Router from 'router/Router';
import {
  registerRouter,
  onRouteChangeEvent,
  unregisterRouter,
} from 'router/RouteHandler';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';
import StartMenu from './StartMenu/StartMenu.View';
import LearningWords from './LearningWords/LearningWords.View';
import ResultNotification from './ResultNotification/ResultNotification.View';

// styles
import './MainPage.scss';

class MainPage extends BaseComponent {
  async prepareData() {
    const mainPageRoutes = {
      [MAIN_PAGE_ROUTES.START_MENU]: StartMenu,
      [MAIN_PAGE_ROUTES.LEARNING_WORDS]: LearningWords,
      [MAIN_PAGE_ROUTES.NOTIFICATION]: ResultNotification,
    };

    this.component.className = 'main-page';
    this.mainPageRouter = new Router(
      ROUTERS.MAIN_PAGE,
      this.component,
      mainPageRoutes,
      MAIN_PAGE_ROUTES.START_MENU,
    );
    registerRouter(this.mainPageRouter);

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  addListeners() {
    this.component.addEventListener('click', this.handleChangeEvent);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleChangeEvent);

    unregisterRouter(this.mainPageRouter);
  }

  handleChangeEvent(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN_PAGE);
  }
}

export default MainPage;
