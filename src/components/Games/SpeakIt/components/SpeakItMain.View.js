// views
import BaseComponent from '../../../BaseComponent/BaseComponent';

// layout
import getLayout from './SpeakItMain.Layout';
import createWordCard from './SpeakItCard.Layout';

// router
import { onRouteChangeEvent } from '../../../../router/RouteHandler';

// constants
import { ROUTERS, SPEAK_IT_ROUTERS } from '../../../../router/Router.Constants';

// services
import { endPoints, createRequest } from '../../../../services/requestHandler';

// styles
import './SpeakItMain.scss';

class SpeakItMain extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.state = {
      level: 0,
      words: null,
      isGameActive: false,
    };
  }

  async prepareData() {
    const page = Math.floor(Math.random() * 30);
    const endPoint = endPoints.words.getChunk({ page, group: this.state.level });
    const data = await createRequest(endPoint);
    this.state.words = data.slice(0, 10);
    console.log(this.state.words);
  }

  createWords() {
    return this.state.words.map((word) => createWordCard(word));
  }

  createLayout() {
    this.component.innerHTML = getLayout();
    this.wordsContainer = document.createElement('div');
    this.wordsContainer.className = 'words-container';
    this.wordsContainer.append(...this.createWords());
    this.component.append(this.wordsContainer);
  }

  switchLevels(event) {
    if (event.target.tagName === 'INPUT') {
      this.state.level = event.target.value;
      this.prepareData().then(() => {
        this.wordsContainer.innerHTML = '';
        this.wordsContainer.append(...this.createWords());
      });
    }
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
    document.querySelector('fieldset').addEventListener('click', (event) => this.switchLevels(event));
  }
}

export default SpeakItMain;
