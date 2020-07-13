import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';
import { STATISTICS } from '../MainPage.Constants';

const BUTTONS = {
  ADDITIONAL: 'additional',
  RANDOM_WORDS: 'randomWords',
};

const data = {
  completionNotice: {
    parent: {
      tag: 'div',
      className: 'result-notification__completion-notice',
    },

    children: [
      {
        tag: 'h2',
        className: 'completion-notice__title',
        content: 'Congratulations!',
      },
      {
        tag: 'p',
        className: 'completion-notice__description',
        content: 'There are no words for today. You can continue training by clicking "Additional"',
      },
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

  statistics: {
    parent: {
      tag: 'div',
      className: 'result-notification__statistics',
    },

    children: [
      {
        tag: 'div',
        className: 'training-number',
        innerHTML: `<div class="training-number__value" data-statistics="${STATISTICS.TRAINING_NUMBER}"></div>`,
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
          Success rate: <span class="all-words__success-rate" data-statistics="${STATISTICS.SUCCESS_RATE}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'new-words',
        innerHTML: `<p class="new-words__title">
          New words: <span class="all-words__new-words" data-statistics="${STATISTICS.NEW_WORDS}"></span></p>`,
      },
      {
        tag: 'div',
        className: 'success-series',
        innerHTML: `<p class="success-series__title">
          Success series: <span class="all-words__success-series" data-statistics="${STATISTICS.SUCCESS_SERIES}"></span></p>`,
      },
    ],
  },
};

export { data, BUTTONS };
