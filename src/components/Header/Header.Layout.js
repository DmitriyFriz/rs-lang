import BaseComponent from 'components/BaseComponent/BaseComponent';
import { HeaderLayout, HeaderClassName } from './Header.Data';

const { createElement } = BaseComponent;

// ====================== Authorized =============================

function getAuthorizedLayout(userName) {
  // const logoContainer = createElement({
  //   tag: 'div',
  //   className: HeaderClassName.logo,
  //   destination: HeaderLayout.authorized.logo.destination,
  // });

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

  return [emailContainer, buttonOut, buttonBurgerMenu];
}

// ====================== Guest =============================

function getGuestLayout() {
  const guestButtons = HeaderLayout.guest.buttons.map((buttonData) => createElement({
    tag: 'button',
    content: buttonData.title,
    className: HeaderClassName.button,
    destination: buttonData.destination,
  }));
  return guestButtons;
}

// ====================== General =============================

export default function getLayout(isAuthorized, userName) {
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

  // if (isAuthorized) {
  // const logoContainer = createElement({
  //   tag: 'div',
  //   className: HeaderClassName.logo,
  //   destination: HeaderLayout.authorized.logo.destination,
  // });

  // const userEmail = 'Petrov';
  // const emailContainer = createElement({
  //   tag: 'div',
  //   content: userEmail,
  //   className: HeaderClassName.email,
  // });

  // const buttonOut = createElement({
  //   tag: 'button',
  //   content: HeaderLayout.authorized.buttons.title,
  //   className: HeaderClassName.button,
  //   destination: HeaderLayout.authorized.buttons.destination,
  // });

  // const buttonBurgerMenu = createElement({
  //   tag: 'div',
  //   className: HeaderClassName.burgerMenuButton,
  //   innerHTML: `
  //   <input type="checkbox" id="checkbox" class="checkbox visuallyHidden" />
  //   <label for="checkbox">
  //     <div class="hamburger">
  //       <span class="bar bar1"></span>
  //       <span class="bar bar2"></span>
  //       <span class="bar bar3"></span>
  //       <span class="bar bar4"></span>
  //       <span class="bar bar5"></span>
  //     </div>
  //   </label>
  //   `,
  // });

  // return [logoContainer, menu, emailContainer, buttonOut];
  // }

  // const guestButtons = HeaderLayout.guest.buttons.map((buttonData) => createElement({
  //   tag: 'button',
  //   content: buttonData.title,
  //   className: HeaderClassName.button,
  //   destination: buttonData.destination,
  // }));
  // return [menu, ...guestButtons];
}
