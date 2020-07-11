// styles
import './SprintFinish.scss';

// audio
import finishGameAudio from 'assets/mini-games/audio/finish-game.mp3';

// views
import SprintStart from '../Start/SprintStart.View';

// layout
import getLayout from './SprintFinish.Layout';
import getStatistic from './SprintFinish.Statistic';

class SprintFinish extends SprintStart {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.shortStatistic = JSON.parse(localStorage.getItem('sprint-shortStatistic'));
    this.url = 'https://raw.githubusercontent.com/jack-guzya/rslang-data/master/';

    this.handleClickStatistic = this.handleClickStatistic.bind(this);
  }

  createLayout() {
    this.component.innerHTML = getLayout();
    this.playAudio(finishGameAudio);

    this.statisticList = getStatistic(this.shortStatistic);
    this.component.firstElementChild.append(this.statisticList);
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

  playAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = `${src}`;
    audio.play();
  }
}

export default SprintFinish;
