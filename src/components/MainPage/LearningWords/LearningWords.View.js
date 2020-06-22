// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// layout
import getLayout from './Layout/LearningWords.Layout';

// constants
import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';

class LearningWords extends BaseComponent {
  static get name() {
    return MAIN_PAGE_ROUTES.LEARNING_WORDS;
  }

  createLayout() {
    this.component.innerHTML = getLayout();
  }
}

export default LearningWords;
