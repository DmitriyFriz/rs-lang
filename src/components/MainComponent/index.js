import Header from './Header/Header.View';

const root = document.querySelector('#root');
const currentUserMail = 'Petrov@gmail.com'

const header = new Header(root, 'header', {
  menuClassName: 'menu',
  menuItemClassName: 'menu-item',
  emailClassName: 'user-email',
  logOutClassName: 'log-out',
  userEmail: currentUserMail,
});

header.show();

setTimeout(() => {
  header.hide();
}, 8000);
