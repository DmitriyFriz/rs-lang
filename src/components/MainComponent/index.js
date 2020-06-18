import Header from './Header/Header.View';

const root = document.querySelector('#root');
const userEmail = 'Petrov@gmail.com';
const isAuthorized = true;

const header = new Header(root, 'header', {
  menuClassName: 'menu',
  menuItemClassName: 'menu-item',
  logoClassName: 'logo',
  emailClassName: 'user-email',
  buttonClassName: 'header-button',
  userEmail,
  buttonId: {
    signUp: 'sign-up',
    signIn: 'sign-in',
    logOut: 'log-out',
  },
  isAuthorized,
});

header.show();
