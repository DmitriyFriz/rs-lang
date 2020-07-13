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
  AGAIN: 'again',
  PLAY_AUDIO: 'playAudio',
};

const HIDDEN_ELEMENTS_LIST = [
  '#card-meaning-translation',
  '#card-example-translation',
  '#card-word-translation',
  '#card-word',
  '#card-difficulty',
  '#card-vocabulary',
  '#card-play-audio',
];

const NOTIFICATIONS = {
  FINISH_TRAINING: 'Congratulations! You have completed the training!',
};

export {
  TRANSLATIONS, BUTTONS, HIDDEN_ELEMENTS_LIST, NOTIFICATIONS, STATISTICS,
};
