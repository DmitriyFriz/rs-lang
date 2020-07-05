// router
import Router from 'router/Router';
import { registerRouter, unregisterRouter } from 'router/RouteHandler';

// constants
import { ROUTERS, MAIN_ROUTES, VOCABULARY_ROUTERS } from 'router/Router.Constants';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

import VocabularyLearning from './Vocabulary.View.Learning';
import VocabularyDifficult from './Vocabulary.View.Difficult';
import VocabularyDeleted from './Vocabulary.View.Deleted';

class Games extends BaseComponent {
  prepareData() {
    const vocabularyRoutes = {
      [MAIN_ROUTES.VOCABULARY]: VocabularyLearning,
      [VOCABULARY_ROUTERS.VOCABULARY_DIFFICULT]: VocabularyDifficult,
      [VOCABULARY_ROUTERS.VOCABULARY_DELETED]: VocabularyDeleted,
    };

    this.vocabularyRouter = new Router(
      ROUTERS.VOCABULARY,
      this.component,
      vocabularyRoutes,
      MAIN_ROUTES.VOCABULARY,
    );
    registerRouter(this.vocabularyRouter);
  }

  removeListeners() {
    unregisterRouter(this.vocabularyRouter);
  }
}

export default Games;
