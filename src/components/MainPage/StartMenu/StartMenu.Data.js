import { MAIN_PAGE_ROUTES } from 'router/Router.Constants';
import { STATISTICS } from '../MainPage.Constants';

const data = {
  statistics: {
    parent: {
      tag: 'div',
      className: 'start-menu__statistics',
    },

    children: [
      {
        tag: 'div',
        className: 'today',
        innerHTML: `<p class="today__title">Today<span class="today__value" data-statistics="${STATISTICS.ALL_WORDS}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'new-words',
        innerHTML: `<p class="new-words__title">
        New words: <span class="new-words__value" data-statistics="${STATISTICS.NEW_WORDS}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'completed',
        innerHTML: `<p class="completed__title">
          Completed: <span class="completed__value" data-statistics="${STATISTICS.TRAINING_NUMBER}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'last-training',
        innerHTML: `<p class="last-training__title">
          Last training: <span class="last-training__value" data-statistics="${STATISTICS.LAST_GAME_DATE}"></span></p>`,
      },
    ],
  },

  startTraining: {
    tag: 'div',
    className: 'start-menu__start-training',
    content: 'Start training',
    dataset: {
      destination: MAIN_PAGE_ROUTES.LEARNING_WORDS,
    },
  },
};

export default data;
