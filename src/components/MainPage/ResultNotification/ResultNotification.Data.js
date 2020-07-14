import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';
import { STATISTICS } from '../MainPage.Constants';

const BUTTONS = {
  ADDITIONAL: 'additional',
  RANDOM_WORDS: 'randomWords',
};

const data = {
  buttons: {
    parent: {
      tag: 'div',
      className: 'completion-notice__buttons',
    },

    children: [
      {
        tag: 'button',
        className: 'button button-close-training',
        content: 'OK',
        dataset: {
          destination: MAIN_PAGE_ROUTES.START_MENU,
        },
      },
      {
        tag: 'button',
        className: 'button button-additional',
        content: 'Additional',
        dataset: {
          button: BUTTONS.ADDITIONAL,
        },
      },
      {
        tag: 'button',
        className: 'button button-random-words',
        content: 'Random words training',
        dataset: {
          button: BUTTONS.RANDOM_WORDS,
        },
      },
    ],
  },

  completionNotice: {
    parent: {
      tag: 'div',
      className: 'result-notification__completion-notice',
    },

    children: [
      {
        tag: 'p',
        className: 'completion-notice__description',
        content: 'There are no words for today. You can continue training by clicking "Additional" or "Random words training"',
      },
    ],
  },

  statistics: {
    parent: {
      tag: 'div',
      className: 'result-notification__statistics',
    },

    children: [
      {
        tag: 'h2',
        className: 'completion-notice__title',
        content: 'Congratulations!',
      },
      {
        tag: 'div',
        className: 'training-number',
        innerHTML: `<div class="training-number__value" data-statistics="${STATISTICS.TRAINING_NUMBER}"></div>`,
      },
      {
        tag: 'h3',
        className: 'series-completed',
        content: 'Series completed!',
      },
      {
        tag: 'div',
        className: 'all-words',
        innerHTML: `<p class="all-words__title">
          All words: <span class="all-words__value" data-statistics="${STATISTICS.ALL_WORDS}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'success-rate',
        innerHTML: `<p class="success-rate__title">
          Success rate: <span class="success-rate__value" data-statistics="${STATISTICS.SUCCESS_RATE}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'new-words',
        innerHTML: `<p class="new-words__title">
          New words: <span class="new-words__value" data-statistics="${STATISTICS.NEW_WORDS}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'success-series',
        innerHTML: `<p class="success-series__title">
          Success series: <span class="success-series__value" data-statistics="${STATISTICS.SUCCESS_SERIES}"></span></p>`,
      },
    ],
  },
};

export { data, BUTTONS };
