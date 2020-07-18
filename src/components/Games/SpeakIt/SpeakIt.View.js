// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS } from 'router/Router.Constants';

// layout
import getLayout from './SpeakIt.Layout';

class SpeakIt extends BaseComponent {
  createLayout() {
    this.component.innerHTML = getLayout();
  }

  addListeners() {
    this.component.addEventListener('click', this.handleClick);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
  }
}

export default SpeakIt;
