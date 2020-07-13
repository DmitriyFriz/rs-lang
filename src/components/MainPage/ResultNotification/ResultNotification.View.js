// lodash
import get from 'lodash.get';

// constants
import { ROUTERS, MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// layout
import { data, BUTTONS } from './ResultNotification.Data';
import createBlock from '../MainPage.Layout';

// statistics
import { statistics, sessionStatistics, MODE } from '../MainPage.Statistics';

// // status
// import { status, MODES } from '../MainPage.Status';

import { changeRoute } from '../../../router/RouteHandler';

class Notification extends BaseComponent {
  async prepareData() {
    this.functionListForButtons = {
      [BUTTONS.ADDITIONAL]: () => this.createAdditionalTraining(),
      [BUTTONS.RANDOM_WORDS]: () => this.createRandomWordsTraining(),
    };
  }

  createLayout() {
    this.component.className = 'result-notification';
    this.component.append(createBlock(data, 'completionNotice'));
    if (sessionStatistics.mode === MODE.NO_STAT) { return; }
    this.addStatistics();
  }

  addStatistics() {
    this.component.append(createBlock(data, 'statistics'));
    const elementsList = this.component.querySelectorAll('[data-statistics]');
    [...elementsList].forEach((item) => {
      const element = item;
      const statisticsName = element.dataset.statistics;
      element.textContent = sessionStatistics[statisticsName];
    });
  }

  addListeners() {
    this.component.addEventListener('click', (event) => this.handleButtons(event));
  }

  async createAdditionalTraining() {
    statistics.addNewTrainingToPlan();
    changeRoute(MAIN_PAGE_ROUTES.LEARNING_WORDS, ROUTERS.MAIN_PAGE);
  }

  async createRandomWordsTraining() {
    sessionStatistics.mode = MODE.RANDOM;
    changeRoute(MAIN_PAGE_ROUTES.LEARNING_WORDS, ROUTERS.MAIN_PAGE);
  }

  async handleButtons(event) {
    const buttonFunction = get(event, 'target.dataset.button');
    if (!buttonFunction) { return; }
    this.functionListForButtons[buttonFunction](event);
  }
}

export default Notification;
