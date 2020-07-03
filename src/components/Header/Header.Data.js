import { MAIN_ROUTES } from 'router/Router.Constants';

const HeaderLayout = {

  authorized: {
    menuElements: [
      {
        tag: 'div',
        destination: MAIN_ROUTES.MAIN_PAGE,
        class: 'logo menu-item',
      },
      {
        title: 'Main page',
        destination: MAIN_ROUTES.MAIN_PAGE,
      },
      {
        title: 'Games',
        destination: MAIN_ROUTES.GAMES,
      },
      {
        title: 'Vocabulary',
        destination: MAIN_ROUTES.VOCABULARY,
      },
      {
        title: 'Statistic',
        destination: MAIN_ROUTES.STATISTIC,
      },
      {
        title: 'Promo page',
        destination: MAIN_ROUTES.PROMO,
      },
      {
        title: 'About Us',
        destination: MAIN_ROUTES.ABOUT_TEAM,
      },
    ],

    buttons: {
      title: 'Log out',
      destination: MAIN_ROUTES.LOG_OUT,
    },
  },

  guest: {
    MenuElements: [
      {
        title: 'Promo page',
        destination: MAIN_ROUTES.PROMO,
      },
      {
        title: 'About Us',
        destination: MAIN_ROUTES.ABOUT_TEAM,
      },
    ],

    buttons: [
      {
        title: 'Sign up',
        destination: MAIN_ROUTES.SIGN_UP,
      },
      {
        title: 'Sign in',
        destination: MAIN_ROUTES.SIGN_IN,
      },
    ],
  },

};

const HeaderClassName = {
  menu: 'menu',
  menuItem: 'button menu-item',
  logo: 'logo',
  email: 'user-email',
  button: 'button header-button',
  burgerMenuButton: 'header__burger-menu',
};

export { HeaderLayout, HeaderClassName };
