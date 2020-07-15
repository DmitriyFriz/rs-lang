// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// styles
import './Statistics.scss';

class Statistics extends BaseComponent {
  createLayout() {
    this.component.className = 'statistics-page';
    this.component.innerHTML = 'Statistics';
  }
}

export default Statistics;
