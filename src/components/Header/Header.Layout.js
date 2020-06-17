import authorizedMenuElements from './Header.Layout.Data';

function createElement({
  tag, content, className, id,
}) {
  const element = document.createElement(tag);
  if (content) element.textContent = content;
  if (className) element.className = className;
  if (id) element.id = id;
  return element;
}

export default function getLayout({
  menuClassName,
  menuItemClassName,
  emailClassName,
  logOutClassName,
  userEmail,
}) {
  const menu = createElement({ tag: 'div', content: null, className: menuClassName });

  const menuElements = authorizedMenuElements.map((element) => {
    const elementButton = createElement({ tag: 'button', content: element.title, className: menuItemClassName });
    elementButton.dataset.destination = element.destination;

    return elementButton;
  });

  menu.append(...menuElements);

  const emailContainer = createElement({ tag: 'div', content: userEmail, className: emailClassName });
  const buttonOut = createElement({ tag: 'button', content: 'Log out', className: logOutClassName });

  return [menu, emailContainer, buttonOut];
}
