// router
import Router from 'router/Router';
import { registerRouter, unregisterRouter, onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, VOCABULARY_ROUTERS } from 'router/Router.Constants';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

import VocabularyLearning from './Vocabulary.View.Learning';
import VocabularyDifficult from './Vocabulary.View.Difficult';
import VocabularyDeleted from './Vocabulary.View.Deleted';

// data
import { pageLayout } from './Vocabulary.Data';

// layout
import { getVocabularyNavLayout, getContainerLayout } from './Vocabulary.Layout';

class Games extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.container = getContainerLayout();

    this.switchActive = this.switchActive.bind(this);
  }

  createLayout() {
    this.component.className = pageLayout.component.className;

    this.nav = getVocabularyNavLayout();

    this.component.append(
      this.nav,
      this.container,
    );
  }

  prepareData() {
    const vocabularyRoutes = {
      [VOCABULARY_ROUTERS.VOCABULARY_LEARNING]: VocabularyLearning,
      [VOCABULARY_ROUTERS.VOCABULARY_DIFFICULT]: VocabularyDifficult,
      [VOCABULARY_ROUTERS.VOCABULARY_DELETED]: VocabularyDeleted,
    };

    this.vocabularyRouter = new Router(
      ROUTERS.VOCABULARY,
      this.container,
      vocabularyRoutes,
      VOCABULARY_ROUTERS.VOCABULARY_LEARNING,
    );
    registerRouter(this.vocabularyRouter);
  }

  addListeners() {
    this.component.addEventListener('click', this.handleSwitchTab);

    document.body.addEventListener('changeRoute', this.switchActive);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleSwitchTab);

    document.body.removeEventListener('changeRoute', this.switchActive);

    unregisterRouter(this.vocabularyRouter);
  }

  handleSwitchTab(event) {
    onRouteChangeEvent(event, ROUTERS.VOCABULARY);
  }

  switchActive(event) {
    const nextItem = this.nav
      .querySelector(`[data-destination="${event.detail.next}"]`);
    if (!nextItem) { return; }

    const items = this.nav.querySelectorAll('[data-destination]');
    [...items].forEach((item) => item.classList.remove('vocabulary__tab--active'));

    nextItem.classList.add('vocabulary__tab--active');
  }
}

export default Games;
