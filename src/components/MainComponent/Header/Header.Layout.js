import HeaderLayoutData from './Header.Layout.Data';
import createElement from '../../BaseComponent/Common/createElement';

export default function getLayout({
  menuClassName,
  menuItemClassName,
  logoClassName,
  emailClassName,
  buttonClassName,
  userEmail,
  isAuthorized,
}) {
  const menu = createElement({ tag: 'ul', className: menuClassName });
  const menuElementsData = isAuthorized
    ? HeaderLayoutData.authorized.menuElements : HeaderLayoutData.guest.MenuElements;
  const menuElements = menuElementsData.map((element) => {
    const elementContainer = createElement({ tag: 'li' });

    const elementHref = createElement({ tag: 'a', content: element.title, className: menuItemClassName });
    elementHref.href = `#/${element.href}`;

    elementContainer.append(elementHref);
    return elementContainer;
  });

  menu.append(...menuElements);

  if (isAuthorized) {
    const logoContainer = createElement({ tag: 'div', className: logoClassName });
    const emailContainer = createElement({ tag: 'div', content: userEmail, className: emailClassName });
    const buttonOut = createElement({
      tag: 'button',
      content: HeaderLayoutData.authorized.buttons.title,
      className: buttonClassName,
      id: HeaderLayoutData.authorized.buttons.id,
    });

    return [logoContainer, menu, emailContainer, buttonOut];
  }
  const guestButtons = HeaderLayoutData.guest.buttons.map((buttonData) => createElement({
    tag: 'button', content: buttonData.title, className: buttonClassName, id: buttonData.id,
  }));
  return [menu, ...guestButtons];
}
