// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// layout
import getLayout from './SprintStart.Layout';

class SprintStart extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.handleClick = this.handleClick.bind(this);
  }

  createLayout() {
    this.component.innerHTML = getLayout();
  }

  addListeners() {
    this.levelGroup = document.getElementsByName('chapter');

    this.component.addEventListener('click', this.handleClick);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    this.levelGroup.forEach((level) => {
      if (level.checked) {
        localStorage.setItem('sprint-level', level.value);
      }
    });

    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}

export default SprintStart;
