// Lodash
import get from 'lodash.get';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// Constants
import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';

// styles
import './Statistics.scss';

// Chart
import initChart from './Statistics.Chart';

// Statistics
import StatisticsDomain from '../../domain-models/Statistics/Statistics';

// Handler
import { getChartData, createGamesStat } from './Statistics.Handler';

// Layout
import { getNoStatNotification } from './Statistics.Layout';

const { createElement } = BaseComponent;

class Statistics extends BaseComponent {
  async prepareData() {
    this.statisticsDomain = new StatisticsDomain();
    const { data } = await this.statisticsDomain.getStatistics();
    this.data = data;
    this.mainStat = get(data, `optional.${MAIN_PAGE_ROUTES.LEARNING_WORDS}`);
  }

  createLayout() {
    this.component.className = 'statistics-page';
    const noStatNotification = createElement(
      {
        tag: 'div',
        className: 'statistics-page__no-stat',
        innerHTML: getNoStatNotification(),
      },
    );

    if (!this.mainStat) {
      this.component.append(noStatNotification);
      return;
    }

    this.chartContainer = createElement({
      tag: 'div',
      id: 'statistics-chart',
    });
    this.component.append(this.chartContainer);

    if (this.data) {
      createGamesStat(this.component, this.data);
    }
  }

  async show() {
    await super.show();
    if (!this.mainStat) { return; }
    const chartData = getChartData(this.mainStat);
    initChart(this.chartContainer.id, chartData);
  }
}

export default Statistics;
