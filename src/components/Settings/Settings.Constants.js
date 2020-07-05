const SETTINGS = {
  IMAGE: 'image',
  EXAMPLE: 'example',
  MEANING: 'meaning',
  TRANSLATION: 'translation',
  TRANSCRIPTION: 'transcription',
  DIFFICULTY_BUTTONS: 'difficultyButtons',
  VOCABULARY_BUTTONS: 'vocabularyButtons',
  ANSWER_BUTTON: 'answerButton',
  LEVEL: 'level',
  WORDS_PER_DAY: 'wordsPerDay',
  NEW_WORDS: 'newWords',
  COLLECTION_WORDS_MODE: 'wordsMode',
};

const DEFAULT_SETTINGS = {
  [SETTINGS.IMAGE]: true,
  [SETTINGS.EXAMPLE]: true,
  [SETTINGS.MEANING]: false,
  [SETTINGS.TRANSLATION]: true,
  [SETTINGS.TRANSCRIPTION]: false,
  [SETTINGS.DIFFICULTY_BUTTONS]: true,
  [SETTINGS.VOCABULARY_BUTTONS]: true,
  [SETTINGS.ANSWER_BUTTON]: true,
  [SETTINGS.LEVEL]: 0,
  [SETTINGS.WORDS_PER_DAY]: 20,
  [SETTINGS.NEW_WORDS]: 5,
  [SETTINGS.COLLECTION_WORDS_MODE]: 'shuffle',
};

export { DEFAULT_SETTINGS, SETTINGS };
