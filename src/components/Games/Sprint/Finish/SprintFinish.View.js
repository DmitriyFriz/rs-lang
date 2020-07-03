// views
import SprintStart from '../Start/SprintStart.View';

// layout
import getLayout from './SprintFinish.Layout';

// styles
import '../../GameStart.scss';
import './SprintFinish.scss'

class SprintFinish extends SprintStart {
  createLayout() {
    this.component.innerHTML = getLayout();
  }
}

export default SprintFinish;
