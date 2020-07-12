// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import getStatistic from './ShortStatistic.Layout';

// styles
import './ShortStatistic.scss';

class ShortStatistic extends BaseComponent {
  constructor(parent, tagName, shortStatistic) {
    super(parent, tagName);

    this.shortStatistic = shortStatistic;
    this.url = 'https://raw.githubusercontent.com/jack-guzya/rslang-data/master/';

    this.handleClickStatistic = this.handleClickStatistic.bind(this);
  }

  createLayout() {
    this.statisticList = getStatistic(this.shortStatistic);

    this.component.append(this.statisticList);
  }

  addListeners() {
    super.addListeners();

    this.statisticList.addEventListener('click', this.handleClickStatistic);
  }

  removeListeners() {
    super.addListeners();

    this.statisticList.removeEventListener('click', this.handleClickStatistic);
  }

  handleClickStatistic(event) {
    if (event.target.dataset.audio) {
      const src = this.url + event.target.dataset.audio;
      this.playAudio(src);
    }
  }

  reShow(shortStatistic) {
    this.hide();
    this.shortStatistic = shortStatistic;
    this.component.innerHTML = '';
    this.show();
  }

  playAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = `${src}`;
    audio.play();
  }
}

export default ShortStatistic;
