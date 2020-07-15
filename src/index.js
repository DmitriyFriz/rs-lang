import './style/main.scss';

// router
import user from 'domainModels/User/User';
import AuthPage from 'components/Authorization/AuthPage/AuthPage.View';
import RegisterPage from 'components/Authorization/RegisterPage/RegisterPage.View';
import Router from './router/Router';
import { registerRouter } from './router/RouteHandler';

// components
import HeaderAuthorized from './components/Header/Header.View.Authorized';
import HeaderGuest from './components/Header/Header.View.Guest';
import MainPage from './components/MainPage/MainPage.View';
import Games from './components/Games/Games.View';
import Team from './components/Team/Team.View';
import Settings from './components/Settings/Settings.View';
import Promo from './components/Promo/Promo.View';

// constants
import { ROUTERS, MAIN_ROUTES, HEADER_ROUTES } from './router/Router.Constants';

const header = document.querySelector('#header');
const root = document.querySelector('#root');

const headerRoutes = {
  [HEADER_ROUTES.HEADER_AUTHORIZED]: HeaderAuthorized,
  [HEADER_ROUTES.HEADER_GUEST]: HeaderGuest,
};

const mainRoutes = {
  [MAIN_ROUTES.MAIN_PAGE]: MainPage,
  [MAIN_ROUTES.SIGN_IN]: AuthPage,
  [MAIN_ROUTES.SIGN_UP]: RegisterPage,
  [MAIN_ROUTES.GAMES]: Games,
  [MAIN_ROUTES.ABOUT_TEAM]: Team,
  [MAIN_ROUTES.SETTINGS]: Settings,
  [MAIN_ROUTES.PROMO]: Promo,
  // other endpoints should be added here,
};

async function init() {
  await user.checkAuthStatus();

  const currentHeaderRoute = user.isAuthorized
    ? HEADER_ROUTES.HEADER_AUTHORIZED : HEADER_ROUTES.HEADER_GUEST;

  const currentMainRoute = user.isAuthorized
    ? MAIN_ROUTES.MAIN_PAGE : MAIN_ROUTES.PROMO;

  const headerRouter = new Router(ROUTERS.HEADER, header, headerRoutes, currentHeaderRoute);
  registerRouter(headerRouter);

  const mainRouter = new Router(ROUTERS.MAIN, root, mainRoutes, currentMainRoute);
  registerRouter(mainRouter);
}

init();
