// views
import SprintStart from '../Start/SprintStart.View';

// layout
import getLayout from './SprintFinish.Layout';

// styles
import './SprintFinish.scss';

// audio
import finishGameAudio from '../../../../assets/mini-games/audio/finish-game.mp3';

class SprintFinish extends SprintStart {
  createLayout() {
    this.component.innerHTML = getLayout();
    this.playAudio(finishGameAudio);
  }

  playAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = `${src}`;
    audio.play();
  }
}

export default SprintFinish;
