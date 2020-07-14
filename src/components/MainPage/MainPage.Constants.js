const STATISTICS = {
  TRAINING_NUMBER: 'TRAINING_NUMBER',
  ALL_WORDS: 'ALL_WORDS',
  SUCCESS_RATE: 'SUCCESS_RATE',
  NEW_WORDS: 'NEW_WORDS',
  SUCCESS_SERIES: 'SUCCESS_SERIES',
  LAST_GAME_DATE: 'LAST_GAME_DATE',
};

const TRANSLATIONS = {
  MEANING: 'meaning',
  EXAMPLE: 'example',
  WORD: 'word',
};

const BUTTONS = {
  DIFFICULTY: 'difficulty',
  VOCABULARY: 'vocabulary',
  TRUE_WORD: 'trueWord',
  CHECK: 'check',
  FINISH: 'finish',
  CLOSE: 'close',
  CLOSE_NOTIFICATION: 'closeNotification',
  AGAIN: 'again',
  PLAY_AUDIO: 'playAudio',
};

const HIDDEN_ELEMENTS_LIST = [
  '#card-meaning-translation',
  '#card-example-translation',
  '#card-word-translation',
  '#card-transcription',
  '#card-play-audio',
];

const HIDDEN_BUTTONS_LIST = [
  '#card-skip-btn',
  '#card-check-btn',
];

export {
  TRANSLATIONS,
  BUTTONS,
  HIDDEN_ELEMENTS_LIST,
  STATISTICS,
  HIDDEN_BUTTONS_LIST,
};
