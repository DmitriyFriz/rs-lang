import BaseComponent from '../BaseComponent/BaseComponent';
import teammates from './Team.Data';
import getLayout from './Team.Layout';

import './Team.scss';

class Team extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.data = teammates;
  }

  createLayout() {
    this.component.className = 'team';
    const layout = getLayout(this.data);
    this.component.append(layout);
  }
}

export default Team;
