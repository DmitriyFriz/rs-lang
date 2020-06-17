import BaseComponent from '../BaseComponent/BaseComponent';
import data from './GamesList.Data';
import './GamesList.scss';

const createCard = (game) => {
  const element = document.createElement('div');
  element.className = 'games-item';
  element.id = game.id;

  const title = document.createElement('h3');
  title.innerText = game.name;
  element.appendChild(title);

  const description = document.createElement('p');
  description.innerText = game.description;
  element.appendChild(description);

  return element;
};

class GamesList extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.games = data;
  }

  createLayout() {
    this.component.className = 'games-container';
    this.component.append(...this.games.map((game) => createCard(game)));
  }
}

export default GamesList;
