import { VOCABULARY_ROUTERS, MAIN_ROUTES } from '../../router/Router.Constants';

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
  pageType: {
    learning: 'learning',
    difficult: 'difficult',
    deleted: 'deleted',
  },
};

const filterQuery = {
  learning: {
    $and: [
      { 'userWord.optional.vocabulary': { $ne: 'removed' } },
      {
        $or: [
          { 'userWord.difficulty': 'easy' },
          { 'userWord.difficulty': 'medium' },
        ],
      },
    ],
  },
  difficult: {
    $and: [
      { 'userWord.optional.vocabulary': { $ne: 'removed' } },
      { 'userWord.difficulty': 'hard' },
    ],
  },
  deleted: { 'userWord.optional.vocabulary': 'removed' },
};

export {
  pageLayout, navTabsLayout, constants, filterQuery,
};
