// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// layout
import createBlock from '../MainPage.Layout';
import data from './StartMenu.Data';

// Statistics
import { statistics } from '../MainPage.Statistics';
import { STATISTICS } from '../MainPage.Constants';

class StartMenu extends BaseComponent {
  async prepareData() {
    await statistics.prepareData();
  }

  createLayout() {
    this.component.className = 'start-menu';
    this.component.append(createBlock(data, 'statistics'));
    this.component.append(BaseComponent.createElement(data.startTraining));
    this.addStatisticsToElements();
  }

  addStatisticsToElements() {
    const elementsList = this.component.querySelectorAll('[data-statistics]');
    [...elementsList].forEach((item) => {
      const element = item;
      const statisticsName = element.dataset.statistics;
      if (statisticsName === STATISTICS.LAST_GAME_DATE) {
        const date = new Date(statistics[statisticsName]);
        element.textContent = date.toString().replace(/GMT.*$/g, '');
        return;
      }
      element.textContent = statistics[statisticsName];
    });
  }
}

export default StartMenu;
