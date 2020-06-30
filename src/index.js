import './style/main.scss';

// components
import AuthPage from 'components/Authorization/AuthPage/AuthPage.View';
import RegisterPage from 'components/Authorization/RegisterPage/RegisterPage.View';
import User from 'domainModels/User/User';
import Games from './components/Games/Games.View';
import HeaderAuthorized from './components/Header/Header.View.Authorized';
import HeaderGuest from './components/Header/Header.View.Guest';
import MainPage from './components/MainPage/MainPage.View';

// router
import Router from './router/Router';
import { registerRouter } from 'router/RouteHandler';
import { ROUTERS, MAIN_ROUTES, HEADER_ROUTES } from 'router/Router.Constants';

const header = document.querySelector('#header');
const root = document.querySelector('#root');
const user = new User();

// get from localStorage
const { isAuthorized } = user;

const headerRoutes = {
  [HEADER_ROUTES.SIGN_UP]: HeaderAuthorized,
  [HEADER_ROUTES.SIGN_IN]: HeaderAuthorized,
  [HEADER_ROUTES.LOG_OUT]: HeaderGuest,
};

const mainRoutes = {
  [MAIN_ROUTES.MAIN_PAGE]: MainPage,
  [MAIN_ROUTES.SIGN_IN]: AuthPage,
  [MAIN_ROUTES.SIGN_UP]: RegisterPage,
  [MAIN_ROUTES.GAMES]: Games,
  // other endpoints should be added here,
};

const currentHeaderRoute = isAuthorized
  ? HEADER_ROUTES.SIGN_IN : HEADER_ROUTES.LOG_OUT;
const headerRouter = new Router(ROUTERS.HEADER, header, headerRoutes, currentHeaderRoute);
registerRouter(headerRouter);

const mainRouter = new Router(ROUTERS.MAIN, root, mainRoutes, MAIN_ROUTES.MAIN_PAGE);
registerRouter(mainRouter);
