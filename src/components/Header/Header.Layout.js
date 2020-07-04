import BaseComponent from 'components/BaseComponent/BaseComponent';
import { HeaderLayout, HeaderClassName } from './Header.Data';

const { createElement } = BaseComponent;

const buttonBurgerMenu = createElement({
  tag: 'div',
  className: HeaderClassName.burgerMenuButton,
  innerHTML: `
  <input type="checkbox" id="checkbox" class="checkbox visuallyHidden" />
  <label for="checkbox">
    <div class="hamburger">
      <span class="bar bar1"></span>
      <span class="bar bar2"></span>
      <span class="bar bar3"></span>
      <span class="bar bar4"></span>
      <span class="bar bar5"></span>
    </div>
  </label>
  `,
});

// ====================== Authorized =============================

function getAuthorizedLayout(userName) {
  const emailContainer = createElement({
    tag: 'div',
    content: userName,
    className: HeaderClassName.email,
  });

  const buttonOut = createElement({
    tag: 'button',
    content: HeaderLayout.authorized.buttons.title,
    className: HeaderClassName.button,
    destination: HeaderLayout.authorized.buttons.destination,
  });

  return [emailContainer, buttonOut, buttonBurgerMenu];
}

// ====================== Guest =============================

function getGuestLayout() {
  const guestButtons = HeaderLayout.guest.buttons.map((buttonData) => createElement({
    tag: 'button',
    content: buttonData.title,
    className: buttonData.class || HeaderClassName.button,
    destination: buttonData.destination,
  }));
  return [buttonBurgerMenu, ...guestButtons];
}

// ====================== General =============================

function getLayout(isAuthorized, userName) {
  const menu = createElement({ tag: 'div', className: HeaderClassName.menu });
  const menuElementsData = isAuthorized
    ? HeaderLayout.authorized.menuElements : HeaderLayout.guest.MenuElements;

  const menuElements = menuElementsData.map((element) => {
    const elementButton = createElement({
      tag: element.tag || 'button',
      content: element.title,
      className: element.class || HeaderClassName.menuItem,
      destination: element.destination,
    });
    return elementButton;
  });

  menu.append(...menuElements);

  let layoutElements = getGuestLayout();
  if (isAuthorized) {
    layoutElements = getAuthorizedLayout(userName);
  }
  return [menu, ...layoutElements];
}

function switchActive(event) {
  const items = this.menu.querySelectorAll('[data-destination]');
  [...items].forEach((item) => item.classList.remove('active'));

  const nextItem = this.menu
    .querySelector(`button[data-destination="${event.detail.next}"]`);
  if (nextItem) {
    nextItem.classList.add('active');
  }
}

export { getLayout, switchActive };
