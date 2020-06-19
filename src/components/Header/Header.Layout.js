import HeaderLayoutData from './Header.Layout.Data';
import BaseComponent from '../BaseComponent/BaseComponent';

export default function getLayout({
  menuClassName,
  menuItemClassName,
  logoClassName,
  emailClassName,
  buttonClassName,
  userEmail,
  isAuthorized,
}) {
  const menu = BaseComponent.createElement({ tag: 'div', content: null, className: menuClassName });
  const menuElementsData = isAuthorized
    ? HeaderLayoutData.authorized.menuElements : HeaderLayoutData.guest.MenuElements;


  const menuElements = menuElementsData.map((element) => {
    const elementButton = BaseComponent.createElement({ tag: 'button', content: element.title, className: menuItemClassName });
    elementButton.dataset.destination = element.destination;

    return elementButton;
  });

  menu.append(...menuElements);

  if (isAuthorized) {
    const logoContainer = BaseComponent.createElement({ tag: 'div', className: logoClassName });
    const emailContainer = BaseComponent.createElement({ tag: 'div', content: userEmail, className: emailClassName });
    const buttonOut = BaseComponent.createElement({
      tag: 'button',
      content: HeaderLayoutData.authorized.buttons.title,
      className: buttonClassName,
      id: HeaderLayoutData.authorized.buttons.id,
    });

    return [logoContainer, menu, emailContainer, buttonOut];
  }
  const guestButtons = HeaderLayoutData.guest.buttons.map((buttonData) => BaseComponent.createElement({
    tag: 'button', content: buttonData.title, className: buttonClassName, id: buttonData.id,
  }));
  return [menu, ...guestButtons];
}
