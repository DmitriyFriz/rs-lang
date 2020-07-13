import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';

const BUTTONS = {
  ADDITIONAL: 'additional',
  RANDOM_WORDS: 'randomWords',
};

const data = {
  completionNotice: {
    parent: {
      tag: 'div',
      className: 'completion-notice',
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
};

export { data, BUTTONS };
