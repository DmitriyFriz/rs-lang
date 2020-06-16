import BaseComponent from '../BaseComponent/BaseComponent';
import data from './GamesList.Data';
import './GamesList.scss';

const createCard = (game) => {
  const element = document.createElement('div');
  element.className = 'games-item';
  const title = document.createElement('h3');
  title.innerText = game.name;
  const description = document.createElement('p');
  description.innerText = game.description;
  element.appendChild(title);
  element.appendChild(description);
  return element;
};

class GamesList extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.games = data;
  }

  createLayout() {
    const result = [];
    this.games.forEach((game) => {
      const card = createCard(game);
      result.push(card);
    });
    this.component.className = 'games-container';
    this.component.append(...result);
  }
}

export default GamesList;
