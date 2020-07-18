// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS } from 'router/Router.Constants';

// data
import data from './GamesList.Data';

// styles
import './GamesList.scss';

const createCard = (game) => {
  const element = document.createElement('div');
  element.className = 'games-item';
  element.id = game.id;
  element.dataset.destination = game.destination;

  const logo = document.createElement('img');
  logo.src = `assets/mini-games-logo/${game.logo}`;
  element.appendChild(logo);

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

  addListeners() {
    this.component.addEventListener('click', this.handleGameOpen);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleGameOpen);
  }

  handleGameOpen(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}

export default GamesList;
