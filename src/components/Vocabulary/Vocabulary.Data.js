import { VOCABULARY_ROUTERS, MAIN_ROUTES } from '../../router/Router.Constants';

const vocabularyPageLayout = {
  info: {
    tag: 'div',
    content1: 'AMOUNT OF WORDS:',
    content2: 'ADDED TODAY:',
    className: 'vocabulary__info',
  },
  nav: {
    tag: 'div',
    className: 'vocabulary__nav',
  },
  list: {
    tag: 'div',
    className: 'vocabulary__list',
  },
  item: {
    tag: 'div',
    className: 'vocabulary__item',
  },
};

const navTabsLayout = [
  {
    tag: 'div',
    content: 'Learning words',
    className: 'vocabulary__tab',
    destination: MAIN_ROUTES.VOCABULARY,
  },
  {
    tag: 'div',
    content: 'Difficult words',
    className: 'vocabulary__tab',
    destination: VOCABULARY_ROUTERS.VOCABULARY_DIFFICULT,
  },
  {
    tag: 'div',
    content: 'Deleted words',
    className: 'vocabulary__tab',
    destination: VOCABULARY_ROUTERS.VOCABULARY_DELETED,
  },
];

const tempWords = [
  {
    audio: 'files/02_0621.mp3',
    audioExample: 'files/02_0621_example.mp3',
    audioMeaning: 'files/02_0621_meaning.mp3',
    group: 1,
    id: '5e9f5ee35eb9e72bc21af70c',
    image: 'files/02_0621.jpg',
    page: 1,
    textExample: 'She was <b>anxious</b> about not making her appointment on time.',
    textExampleTranslate: 'Она беспокоилась о том, чтобы не договориться о встрече вовремя',
    textMeaning: '<i>Anxious</i> means feeling worried or nervous.',
    textMeaningTranslate: 'Тревожно означает чувствовать себя обеспокоенным или нервным',
    transcription: '[ǽŋkʃəs]',
    word: 'anxious',
    wordTranslate: 'озабоченный',
    wordsPerExampleSentence: 10,
  }, {
    audio: 'files/02_0621.mp3',
    audioExample: 'files/02_0621_example.mp3',
    audioMeaning: 'files/02_0621_meaning.mp3',
    group: 1,
    id: '5e9f5ee35eb9e72bc21af70c',
    image: 'files/02_0621.jpg',
    page: 1,
    textExample: 'She was <b>anxious</b> about not making her appointment on time.',
    textExampleTranslate: 'Она беспокоилась о том, чтобы не договориться о встрече вовремя',
    textMeaning: '<i>Anxious</i> means feeling worried or nervous.',
    textMeaningTranslate: 'Тревожно означает чувствовать себя обеспокоенным или нервным',
    transcription: '[ǽŋkʃəs]',
    word: 'anxious',
    wordTranslate: 'озабоченный',
    wordsPerExampleSentence: 10,
  },
];

export { vocabularyPageLayout, navTabsLayout, tempWords };
