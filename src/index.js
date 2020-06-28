import './style/main.scss';
// import UserDomain from './domain-models/User/User';

// router
import Router from './router/Router';
import { registerRouter } from './router/RouteHandler';

// components
import HeaderAuthorized from './components/Header/Header.View.Authorized';
import HeaderGuest from './components/Header/Header.View.Guest';
import MainPage from './components/MainPage/MainPage.View';
import Games from './components/Games/Games.View';
import Team from './components/Team/Team.View';
import Settings from './components/Settings/Settings.View';

// constants
import { ROUTERS, MAIN_ROUTES, HEADER_ROUTES } from './router/Router.Constants';

const header = document.querySelector('#header');
const root = document.querySelector('#root');

// get from localStorage
const isAuthorized = true;

const headerRoutes = {
  [HEADER_ROUTES.SIGN_UP]: HeaderAuthorized,
  [HEADER_ROUTES.SIGN_IN]: HeaderAuthorized,
  [HEADER_ROUTES.LOG_OUT]: HeaderGuest,
};

const mainRoutes = {
  [MAIN_ROUTES.MAIN_PAGE]: MainPage,
  [MAIN_ROUTES.GAMES]: Games,
  [MAIN_ROUTES.ABOUT_TEAM]: Team,
  [MAIN_ROUTES.SETTINGS]: Settings,
  // other endpoints should be added here,
};

const currentHeaderRoute = isAuthorized
  ? HEADER_ROUTES.SIGN_IN : HEADER_ROUTES.LOG_OUT;
const headerRouter = new Router(ROUTERS.HEADER, header, headerRoutes, currentHeaderRoute);
registerRouter(headerRouter);

const mainRouter = new Router(ROUTERS.MAIN, root, mainRoutes, MAIN_ROUTES.MAIN_PAGE);
registerRouter(mainRouter);

// const userDomain = new UserDomain();

// const signInData = {
//   email: 'jack1234@gmail.com',
//   password: 'Ab12345-',
// };

// userDomain.signIn(signInData).then((res) => console.log(res));
