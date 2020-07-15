import { VOCABULARY_ROUTERS } from 'router/Router.Constants';
import { VOCABULARY } from 'domain-models/Words/Words.Constants';

const pageLayout = {
  component: {
    className: 'vocabulary',
  },
  container: {
    className: 'vocabulary__container',
  },
  inner: {
    className: 'vocabulary__inner',
  },
  info: {
    content1: 'AMOUNT OF WORDS:',
    content2: 'REPEATED TODAY:',
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
  wordInfo: {
    className: 'vocabulary__word-info',
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
  text: {
    className: 'vocabulary__text',
  },
  statistic: {
    className: 'vocabulary__statistic',
  },
  buttons: {
    className: 'vocabulary__buttons',
  },
  remove: {
    content: 'x',
    className: 'vocabulary__remove button',
  },
  noWords: 'Nothing to show',
  pagination: {
    className: 'vocabulary__pagination',
  },
  prev: {
    content: '<<',
    className: 'vocabulary__prev button',
  },
  next: {
    content: '>>',
    className: 'vocabulary__next button',
  },
  hidden: 'hidden',
};

const navTabsLayout = [
  {
    content: 'Learning words',
    className: 'vocabulary__tab vocabulary__tab--active',
    destination: VOCABULARY_ROUTERS.VOCABULARY_LEARNING,
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
  wordsPerGroupe: 600,
  wordsPerPage: 10,
  groupZero: 0,
  groupsAmount: 6,
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
