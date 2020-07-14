import { SETTINGS_MAIN } from '../../../Settings/Settings.Constants';
import { TRANSLATIONS, BUTTONS } from '../../MainPage.Constants';
import { DIFFICULTY, VOCABULARY } from '../../../../domain-models/Words/Words.Constants';

const data = {
  trainingLayout: {
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

  slide: {
    tag: 'div',
    className: 'swiper-slide',
    innerHTML: `<div class="swiper-slide__answer" data-translation="${TRANSLATIONS.WORD}"></div>`,
  },

  // ======================== buttons ==========================

  [SETTINGS_MAIN.DIFFICULTY_BUTTONS]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__difficulty-buttons',
      innerHTML: '<p class="difficulty-buttons__title">Difficulty</p>',
      dataset: {
        settings: SETTINGS_MAIN.DIFFICULTY_BUTTONS,
      },
    },

    children: [
      {
        tag: 'button',
        className: 'button button-hard',
        dataset: {
          difficulty: DIFFICULTY.HARD,
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Hard',
      },
      {
        tag: 'button',
        className: 'button button-medium',
        dataset: {
          difficulty: DIFFICULTY.MEDIUM,
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Medium',
      },
      {
        tag: 'button',
        className: 'button button-easy',
        dataset: {
          difficulty: DIFFICULTY.EASY,
          button: BUTTONS.DIFFICULTY,
        },
        content: 'Easy',
      },
      {
        tag: 'button',
        className: 'button button-again',
        dataset: {
          button: BUTTONS.AGAIN,
        },
        content: 'Again',
      },

    ],
  },

  [SETTINGS_MAIN.VOCABULARY_BUTTONS]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__vocabulary-buttons',
      innerHTML: '<p class="vocabulary-buttons__title">Vocabulary</p>',
      dataset: {
        settings: SETTINGS_MAIN.VOCABULARY_BUTTONS,
      },
    },

    children: [
      {
        tag: 'button',
        className: 'button button-hard-vocabulary',
        dataset: {
          vocabulary: VOCABULARY.DIFFICULT,
          button: BUTTONS.VOCABULARY,
        },
        content: 'Difficult',
      },
      {
        tag: 'button',
        className: 'button button-removed-vocabulary',
        dataset: {
          vocabulary: VOCABULARY.REMOVED,
          button: BUTTONS.VOCABULARY,
        },
        content: 'Removed',
      },
    ],
  },

  [SETTINGS_MAIN.ANSWER_BUTTON]: {
    parent: {
      tag: 'div',
      className: 'skip-container',
    },

    children: [
      {
        tag: 'button',
        className: 'button button-skip',
        content: 'Skip',
        id: 'card-skip-btn',
        dataset: {
          settings: SETTINGS_MAIN.ANSWER_BUTTON,
          button: BUTTONS.TRUE_WORD,
        },
      },
    ],
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
      dataset: {
        button: BUTTONS.CLOSE,
      },
      content: 'Close',
    },

    children: [],
  },

  checkWord: {
    tag: 'button',
    className: 'button button-check-word',
    content: 'Check',
    id: 'card-check-btn',
    dataset: {
      button: BUTTONS.CHECK,
    },
  },

  playAudioBtn: {
    tag: 'button',
    className: 'button button-play-audio',
    innerHTML: `<img src="assets/speaker.png" data-button="${BUTTONS.PLAY_AUDIO}">`,
    id: 'card-play-audio',
    dataset: {
      button: BUTTONS.PLAY_AUDIO,
    },
  },

  closeNotification: {
    tag: 'div',
    className: 'close-notification-container',
    innerHTML: `<button class="button button-close-notification" data-button="${BUTTONS.CLOSE_NOTIFICATION}">Х</button>`,
  },

  // ======================== texts ==========================

  [SETTINGS_MAIN.WORD_TRANSLATION]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__word-translation',
      dataset: {
        settings: SETTINGS_MAIN.WORD_TRANSLATION,
      },
    },

    children: [
      {
        tag: 'p',
        className: 'word__translation',
      },
    ],
  },

  [SETTINGS_MAIN.EXAMPLE]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__example',
      dataset: {
        settings: SETTINGS_MAIN.EXAMPLE,
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

  [SETTINGS_MAIN.TRANSCRIPTION]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__transcription',
      id: 'card-transcription',
      dataset: {
        settings: SETTINGS_MAIN.TRANSCRIPTION,
      },
    },

    children: [
      {
        tag: 'p',
        className: 'word__transcription',
      },
    ],
  },

  [SETTINGS_MAIN.MEANING]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__meaning',
      dataset: {
        settings: SETTINGS_MAIN.MEANING,
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

  wordInputBlock: {
    tag: 'div',
    className: 'swiper-slide__word-input',
  },

  errorsBlock: {
    className: 'word-input__errors',
  },

  // ======================== images ==========================

  [SETTINGS_MAIN.IMAGE]: {
    parent: {
      tag: 'div',
      className: 'swiper-slide__associative',
      dataset: {
        settings: SETTINGS_MAIN.IMAGE,
      },
    },

    children: [],
  },

  // ============================ progress bar ============================

  progressBar: {
    tag: 'div',
    className: 'progress-bar',
  },

  learnedWordsAmount: {
    tag: 'span',
    className: 'progress-bar__learned-words',
    content: '0',
  },

  progressContainer: {
    tag: 'div',
    className: 'progress-container',
  },

  progress: {
    tag: 'div',
    className: 'progress-container__progress',
    id: 'progress',
  },

  totalWords: {
    tag: 'span',
    className: 'progress-bar__total-words',
    content: '0',
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
