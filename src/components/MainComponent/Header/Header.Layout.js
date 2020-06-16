export default function getLayout({
  menuClassName,
  menuItemClassName,
  emailClassName,
  logOutClassName,
  userEmail,
}) {
  return `
    <ul class="${menuClassName}">
      <li><a class="${menuItemClassName}" href="#/main">Main page</a></li>
      <li><a class="${menuItemClassName}" href="#/games">Games</a></li>
      <li><a class="${menuItemClassName}" href="#/vocabulary">Vocabulary</a></li>
      <li><a class="${menuItemClassName}" href="#/statistic">Statistic</a></li>
      <li><a class="${menuItemClassName}" href="#/promo">Promo page</a></li>
      <li><a class="${menuItemClassName}" href="#/about">About Us</a></li>
    </ul>

    <div class="${emailClassName}">${userEmail}</div>
    <button class="${logOutClassName}">Log out</button>
`;
}
