import { HeaderClassName } from './Header.Data';

let burgerMenuButton;

function shiftMenuToLeft(menu) {
  menu.classList.remove('to-right');
  menu.classList.add('to-left');
}

function hideMenu(event) {
  const { classList } = event.target;

  if (
    !event.target.closest(`.${HeaderClassName.burgerMenuButton}`)
    && !classList.contains(HeaderClassName.menu)
  ) {
    const inputEvent = new Event('input', { bubbles: true });
    burgerMenuButton.checked = false;
    burgerMenuButton.dispatchEvent(inputEvent);
  }
}

export default function handleBurgerButton(event) {
  burgerMenuButton = event.target;

  if (burgerMenuButton.checked) {
    this.menu.classList.add('to-right');
    document.body.addEventListener('click', hideMenu);
    return;
  }

  shiftMenuToLeft(this.menu);
  document.body.removeEventListener('click', hideMenu);

  this.menu.addEventListener('animationend', () => {
    this.menu.classList.remove('to-left');
  }, { once: true });
}
