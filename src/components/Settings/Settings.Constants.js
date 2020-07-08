import { REPEAT_INTERVAL, DIFFICULTY } from '../../domain-models/Words/Words.Constants';

const SETTINGS_MAIN = {
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
  AUDIO_AUTOPLAY: 'audioAutoplay',
};

const SETTINGS_REPETITION = {
  TIMER_EASY: 'timerEasy',
  TIMER_MEDIUM: 'timerMedium',
  TIMER_HARD: 'timerHard',
  TIMER_AGAIN: 'timerAgain',
  FORGETTING_SPEED: 0.5,
  MEMORY_RATING: 0.9,
  MAX_AMOUNT: 7,
};

const DEFAULT_SETTINGS = {
  [SETTINGS_MAIN.IMAGE]: true,
  [SETTINGS_MAIN.EXAMPLE]: true,
  [SETTINGS_MAIN.MEANING]: false,
  [SETTINGS_MAIN.TRANSLATION]: true,
  [SETTINGS_MAIN.TRANSCRIPTION]: false,
  [SETTINGS_MAIN.DIFFICULTY_BUTTONS]: true,
  [SETTINGS_MAIN.VOCABULARY_BUTTONS]: true,
  [SETTINGS_MAIN.ANSWER_BUTTON]: true,
  [SETTINGS_MAIN.AUDIO_AUTOPLAY]: false,
  [SETTINGS_MAIN.LEVEL]: 0,
  [SETTINGS_MAIN.WORDS_PER_DAY]: 20,
  [SETTINGS_MAIN.NEW_WORDS]: 5,
  [SETTINGS_MAIN.COLLECTION_WORDS_MODE]: 'shuffle',
};

export { DEFAULT_SETTINGS, SETTINGS_MAIN };
