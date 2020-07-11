import { VOCABULARY_ROUTERS, MAIN_ROUTES } from '../../router/Router.Constants';
import { VOCABULARY } from '../../domain-models/Words/Words.Constants';

const pageLayout = {
  container: {
    className: 'vocabulary',
  },
  info: {
    content1: 'AMOUNT OF WORDS:',
    content2: 'ADDED TODAY:',
    className: 'vocabulary__info',
  },
  nav: {
    className: 'vocabulary__nav',
  },
  list: {
    className: 'vocabulary__list',
  },
  item: {
    className: 'vocabulary__item',
  },
  word: {
    className: 'vocabulary__word',
  },
  transcription: {
    className: 'vocabulary__transcription',
  },
  audio: {
    content: 'play',
    className: 'vocabulary__audio',
  },
  translation: {
    className: 'vocabulary__translation',
  },
  image: {
    className: 'vocabulary__image',
  },
  meaning: {
    className: 'vocabulary__meaning',
  },
  example: {
    className: 'vocabulary__example',
  },
  remove: {
    content: 'x',
    className: 'vocabulary__remove',
  },
  noWords: 'Nothing to show',
  pagination: {
    className: 'vocabulary__pagination',
  },
  prev: {
    content: '<<',
    className: 'vocabulary__prev',
  },
  next: {
    content: '>>',
    className: 'vocabulary__next',
  },
  hidden: 'hidden',
};

const navTabsLayout = [
  {
    content: 'Learning words',
    className: 'vocabulary__tab',
    destination: MAIN_ROUTES.VOCABULARY,
  },
  {
    content: 'Difficult words',
    className: 'vocabulary__tab',
    destination: VOCABULARY_ROUTERS.VOCABULARY_DIFFICULT,
  },
  {
    content: 'Deleted words',
    className: 'vocabulary__tab',
    destination: VOCABULARY_ROUTERS.VOCABULARY_DELETED,
  },
];

const constants = {
  wordsPerPage: 10,
  group: 0,
};

const filterQuery = {
  RESTORED: {
    $and: [
      { 'userWord.optional.VOCABULARY': { $ne: `${VOCABULARY.REMOVED}` } },
      { 'userWord.optional.VOCABULARY': { $ne: `${VOCABULARY.DIFFICULT}` } },
      { userWord: { $ne: null } },
    ],
  },
  DIFFICULT: { 'userWord.optional.VOCABULARY': `${VOCABULARY.DIFFICULT}` },
  REMOVED: { 'userWord.optional.VOCABULARY': `${VOCABULARY.REMOVED}` },
};

export {
  pageLayout, navTabsLayout, constants, filterQuery,
};
