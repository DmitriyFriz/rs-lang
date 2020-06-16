// Place it insted of main file to see how this example works

import Header from './components/BaseComponent/Example/Header/Header.View';

const root = document.querySelector('#root');

const header = new Header(root, 'header', {
  buttonText: 'Click Me!',
  buttonClassName: 'button',
});

header.show();

setTimeout(() => {
  header.hide();
}, 5000);