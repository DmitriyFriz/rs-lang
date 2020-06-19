import { MAIN_ROUTES } from '../../router/Router.Constants';

const HeaderLayoutData = {

  authorized: {
    menuElements: [
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
      id: 'log-out',
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
        id: 'sign-up',
      },
      {
        title: 'Sign in',
        id: 'sign-in',
      },
    ],
  },

};

export default HeaderLayoutData;
