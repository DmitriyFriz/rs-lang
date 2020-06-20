import { HeaderLayout, HeaderClassName } from './Header.Data';
import BaseComponent from '../BaseComponent/BaseComponent';

export default function getLayout(isAuthorized) {
  const menu = BaseComponent.createElement({ tag: 'div', className: HeaderClassName.menu });
  const menuElementsData = isAuthorized
    ? HeaderLayout.authorized.menuElements : HeaderLayout.guest.MenuElements;

  const menuElements = menuElementsData.map((element) => {
    const elementButton = BaseComponent.createElement({
      tag: 'button',
      content: element.title,
      className: HeaderClassName.menuItem,
      destination: element.destination,
    });
    return elementButton;
  });

  menu.append(...menuElements);

  if (isAuthorized) {
    const logoContainer = BaseComponent.createElement({
      tag: 'div',
      className: HeaderClassName.logo,
      destination: HeaderLayout.authorized.logo.destination,
    });
    const userEmail = 'Petrov';
    const emailContainer = BaseComponent.createElement({
      tag: 'div',
      content: userEmail,
      className: HeaderClassName.email,
    });
    const buttonOut = BaseComponent.createElement({
      tag: 'button',
      content: HeaderLayout.authorized.buttons.title,
      className: HeaderClassName.button,
      destination: HeaderLayout.authorized.buttons.destination,
    });

    return [logoContainer, menu, emailContainer, buttonOut];
  }
  const guestButtons = HeaderLayout.guest.buttons.map((buttonData) => BaseComponent.createElement({
    tag: 'button',
    content: buttonData.title,
    className: HeaderClassName.button,
    destination: buttonData.destination,
  }));
  return [menu, ...guestButtons];
}
