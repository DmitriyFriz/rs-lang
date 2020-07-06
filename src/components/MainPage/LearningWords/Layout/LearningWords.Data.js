import { SETTINGS } from '../../../Settings/Settings.Constants';
import { MAIN_PAGE_ROUTES } from '../../../../router/Router.Constants';
import { TRANSLATIONS, BUTTONS } from '../LearningWords.Constants';

const data = {
  training: {
    parent: {
      tag: 'div',
      className: 'training',
    },

    children: [],
  },

  // ======================== swiper ===========================

  swiper: {
    parent: {
      tag: 'div',
      className: 'swiper',
    },

    children: [
      {
        tag: 'div',
        className: 'swiper__container',
        innerHTML: '<div class="swiper-wrapper"></div>',
      },
      {
        tag: 'div',
        className: 'swiper-button-next',
      },
      {
        tag: 'div',
        className: 'swiper-button-prev',
      },
    ],
  },

  // ======================== buttons ==========================

  [SETTINGS.DIFFICULTY_BUTTONS]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__difficulty-buttons',
      id: 'card-difficulty',
      dataset: {
        settings: SETTINGS.DIFFICULTY_BUTTONS,
      },
    },

    children: [
      {
        tag: 'button',
        className: 'button button-hard',
        dataset: {
          difficulty: 'hard',
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Hard',
      },
      {
        tag: 'button',
        className: 'button button-medium',
        dataset: {
          difficulty: 'medium',
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Medium',
      },
      {
        tag: 'button',
        className: 'button button-easy',
        dataset: {
          difficulty: 'easy',
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Easy',
      },
      {
        tag: 'button',
        className: 'button button-again',
        dataset: {
          difficulty: 'again',
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Again',
      },

    ],
  },

  [SETTINGS.VOCABULARY_BUTTONS]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__vocabulary-buttons',
      id: 'card-vocabulary',
      dataset: {
        settings: SETTINGS.VOCABULARY_BUTTONS,
      },
    },

    children: [
      {
        tag: 'button',
        className: 'button button-hard-vocabulary',
        dataset: {
          vocabulary: 'difficult',
          button: BUTTONS.VOCABULARY,
        },
        content: 'Add to hard',
      },
      {
        tag: 'button',
        className: 'button button-removed-vocabulary',
        dataset: {
          vocabulary: 'removed',
          button: BUTTONS.VOCABULARY,
        },
        content: 'Add to removed',
      },
    ],
  },

  [SETTINGS.ANSWER_BUTTON]: {
    parent: {
      tag: 'button',
      className: 'button button-true-word',
      content: 'I don\'t know',
      dataset: {
        settings: SETTINGS.ANSWER_BUTTON,
        button: BUTTONS.TRUE_WORD,
      },
    },

    children: [],
  },

  finishTraining: {
    parent: {
      tag: 'button',
      className: 'button button-finish',
      dataset: {
        button: BUTTONS.FINISH,
      },
      content: 'Finish',
    },

    children: [],
  },

  closeTraining: {
    parent: {
      tag: 'button',
      className: 'button button-close',
      id: 'exit',
      destination: 'START_MENU',
      content: 'Close',
    },

    children: [],
  },

  checkWord: {
    parent: {
      tag: 'button',
      className: 'button button-check-word',
      content: 'Check',
      dataset: {
        button: BUTTONS.CHECK,
      },
    },

    children: [],
  },

  // ======================== texts ==========================

  [SETTINGS.EXAMPLE]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__example',
      dataset: {
        settings: SETTINGS.EXAMPLE,
        translation: TRANSLATIONS.EXAMPLE,
      },
    },

    children: [
      {
        tag: 'p',
        className: 'example__original',
        dataset: {
          cut: 'textExample',
        },
      },
    ],
  },

  [SETTINGS.TRANSCRIPTION]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__word',
      id: 'card-word',
      dataset: {
        settings: SETTINGS.TRANSCRIPTION,
        translation: TRANSLATIONS.WORD,
      },
    },

    children: [
      {
        tag: 'p',
        className: 'word__transcription',
      },
    ],
  },

  [SETTINGS.MEANING]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__meaning',
      dataset: {
        settings: SETTINGS.MEANING,
        translation: TRANSLATIONS.MEANING,
      },
    },

    children: [
      {
        tag: 'p',
        className: 'meaning__original',
        dataset: {
          cut: 'textMeaning',
        },

      },
    ],
  },

  // ======================== images ==========================

  [SETTINGS.IMAGE]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__associative',
      dataset: {
        settings: SETTINGS.IMAGE,
      },
    },

    children: [],
  },

  // ======================== modal blocks ====================

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

const translationsList = {
  [TRANSLATIONS.MEANING]: ({ textMeaningTranslate }) => ({
    tag: 'p',
    className: 'translation',
    id: 'card-meaning-translation',
    content: textMeaningTranslate,
  }),

  [TRANSLATIONS.EXAMPLE]: ({ textExampleTranslate }) => ({
    tag: 'p',
    className: 'translation',
    id: 'card-example-translation',
    content: textExampleTranslate,
  }),

  [TRANSLATIONS.WORD]: ({ wordTranslate }) => ({
    tag: 'p',
    className: 'translation',
    id: 'card-word-translation',
    content: wordTranslate,
  }),
};

export {
  data,
  translationsList,
};
