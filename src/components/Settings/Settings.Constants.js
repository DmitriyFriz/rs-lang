import { REPEAT_INTERVAL, DIFFICULTY, DEFAULT_OPTIONS } from '../../domain-models/Words/Words.Constants';

const SETTINGS = {
  MAIN: 'main',
  REPETITION: 'repetition',
};

const SETTINGS_MAIN = {
  IMAGE: 'image',
  EXAMPLE: 'example',
  MEANING: 'meaning',
  WORD_TRANSLATION: 'wordTranslation',
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
  ...DIFFICULTY,
  ...REPEAT_INTERVAL,
};

const VALIDATOR_GROUPS = {
  WORDS: 'WORDS',
  DISPLAYING: 'DISPLAYING',
  TIMERS: 'TIMERS',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  CONFIRM_PASSWORD: 'CONFIRM_PASSWORD',
};

const ERRORS_LIST = {
  [VALIDATOR_GROUPS.WORDS]: `New words per day should
  not exceed the Total words per day`,
  [VALIDATOR_GROUPS.DISPLAYING]: 'Meaning, word translation or example should be marked',
  [VALIDATOR_GROUPS.TIMERS]: `Data must be in the format <##.##>
  and must not be less than zero`,
  [VALIDATOR_GROUPS.EMAIL]: 'Incorrect email',
  [VALIDATOR_GROUPS.PASSWORD]: `Incorrect password.
   The password must contain 8 characters, one uppercase letter,
   one lowercase letter, one number
   and one special character from + -_ @ $!% *? & #.,;: [] {}`,
  [VALIDATOR_GROUPS.CONFIRM_PASSWORD]: 'Passwords doesn\'t match',
};

const DEFAULT_SETTINGS_MAIN = {
  [SETTINGS_MAIN.IMAGE]: true,
  [SETTINGS_MAIN.EXAMPLE]: true,
  [SETTINGS_MAIN.MEANING]: false,
  [SETTINGS_MAIN.WORD_TRANSLATION]: false,
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

const DEFAULT_SETTINGS_REPETITION = DEFAULT_OPTIONS;

const DEFAULT_SETTINGS_LIST = {
  [SETTINGS.MAIN]: DEFAULT_SETTINGS_MAIN,
  [SETTINGS.REPETITION]: DEFAULT_SETTINGS_REPETITION,
};

const BUTTONS = {
  DELETE_ACCOUNT: 'deleteAccount',
  CONFIRM_DELETE_ACCOUNT: 'confirmDeleteAccount',
  CANCEL_DELETE_ACCOUNT: 'cancelDeleteAccount',
  SAVE_MAIN: 'saveMain',
  DEFAULT_MAIN: 'resetMain',
  CONFIRM_DEFAULT_MAIN: 'confirmDefaultMain',
  SAVE_USER: 'saveUser',
  SAVE_REPETITION: 'saveRepetition',
  DEFAULT_REPETITION: 'resetMain',
  CONFIRM_DEFAULT_REPETITION: 'confirmDefaultMain',
  CANCEL: 'Cancel',
};

const NOTIFICATIONS = {
  SAVED_SUCCESSFULLY: 'Saved successfully',
  MAIN_SAVED_SUCCESSFULLY: `Saved successfully. <br>
  The parameters “Total words per day” and “New words per day” will be valid after the end of the daily task`,
  SAVE_ERROR: 'Something went wrong. Please try again later or try to enter other details',
  ACCOUNT_DELETED: 'Account deleted',
  CONFIRM_DELETE_ACCOUNT: 'Are you sure you want to delete your account? All data will be lost!',
  CONFIRM_DEFAULT_SETTINGS: 'Are you sure you want to reset your settings?',
  SUCCESS_DEFAULT_SETTINGS: 'Settings have been reset',
};

export {
  SETTINGS,
  SETTINGS_MAIN,
  DEFAULT_SETTINGS_MAIN,
  SETTINGS_REPETITION,
  DEFAULT_SETTINGS_REPETITION,
  DEFAULT_SETTINGS_LIST,
  VALIDATOR_GROUPS,
  ERRORS_LIST,
  BUTTONS,
  NOTIFICATIONS,
};
