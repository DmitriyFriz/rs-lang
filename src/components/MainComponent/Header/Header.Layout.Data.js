const HeaderLayoutData = {

  authorized: {
    menuElements: [
      {
        title: 'Main page',
        href: 'main',
      },
      {
        title: 'Games',
        href: 'games',
      },
      {
        title: 'Vocabulary',
        href: 'vocabulary',
      },
      {
        title: 'Statistic',
        href: 'statistic',
      },
      {
        title: 'Promo page',
        href: 'promo',
      },
      {
        title: 'About Us',
        href: 'about',
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
        href: 'promo',
      },
      {
        title: 'About Us',
        href: 'about',
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
