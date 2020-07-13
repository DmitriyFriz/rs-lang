// styles
import './SprintFinish.scss';

// audio
import finishGameAudio from 'assets/mini-games/audio/finish-game.mp3';

// views
import SprintStart from '../Start/SprintStart.View';

// short statistic
import ShortStatistic from '../../ShortStatistic/ShortStatistic.View';

// layout
import getLayout from './SprintFinish.Layout';

class SprintFinish extends SprintStart {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.shortStatistic = JSON.parse(localStorage.getItem('sprint-shortStatistic'));
  }

  createLayout() {
    this.component.innerHTML = getLayout();
    this.playAudio(finishGameAudio);

    this.statisticList = new ShortStatistic(this.component.firstElementChild, this.shortStatistic);
    this.statisticList.show();
  }

  removeListeners() {
    super.removeListeners();

    this.statisticList.hide();
  }

  playAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = `${src}`;
    audio.play();
  }
}

export default SprintFinish;
