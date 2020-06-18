import './style/main.scss';

// router
import Router from './router/Router';
import { registerRouter } from './router/RouteHandler';

// components
import './components/Header';
import MainPage from './components/MainPage/MainPage.View';
import Games from './components/Games/Games.View';

// constants
import { ROUTERS, MAIN_ROUTES } from './router/Router.Constants';

const root = document.querySelector('#root');

const mainRoutes = {
  [MAIN_ROUTES.MAIN_PAGE]: MainPage,
  [MAIN_ROUTES.GAMES]: Games,
  // other endpoints should be added here,
};

const mainRouter = new Router(ROUTERS.MAIN, root, mainRoutes, MAIN_ROUTES.MAIN_PAGE);
registerRouter(mainRouter);
