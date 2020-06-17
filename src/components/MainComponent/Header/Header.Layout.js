import authorizedMenuElements from './Header.Layout.Data';
import createElement from '../../BaseComponent/Common/createElement';

export default function getLayout({
  menuClassName,
  menuItemClassName,
  logoClassName,
  emailClassName,
  logOutClassName,
  userEmail,
}) {
  const menu = createElement({ tag: 'ul', className: menuClassName });

  const menuElements = authorizedMenuElements.map((element) => {
    const elementContainer = createElement({ tag: 'li' });

    const elementHref = createElement({ tag: 'a', content: element.title, className: menuItemClassName });
    elementHref.href = `#/${element.href}`;

    elementContainer.append(elementHref);
    return elementContainer;
  });

  menu.append(...menuElements);

  const logoContainer = createElement({ tag: 'div', className: logoClassName });
  const emailContainer = createElement({ tag: 'div', content: userEmail, className: emailClassName });
  const buttonOut = createElement({ tag: 'button', content: 'Log out', className: logOutClassName });

  return [logoContainer, menu, emailContainer, buttonOut];
}
