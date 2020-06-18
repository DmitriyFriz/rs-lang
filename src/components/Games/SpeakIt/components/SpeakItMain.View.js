// views
import BaseComponent from '../../../BaseComponent/BaseComponent';

// layout
import getLayout from './SpeakItMain.Layout';

// router
import { onRouteChangeEvent } from '../../../../router/RouteHandler';

// constants
import { ROUTERS, SPEAK_IT_ROUTERS } from '../../../../router/Router.Constants';

class SpeakItMain extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.level = 0;
  }

  createLayout() {
    this.component.innerHTML = getLayout();
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }
}

export default SpeakItMain;
