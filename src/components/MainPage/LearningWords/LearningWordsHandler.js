// lodash
import get from 'lodash.get';
import shuffle from 'lodash.shuffle';

import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';

import WordsDomain from '../../../domain-models/Words/Words';

import StatisticsDomain from '../../../domain-models/Statistics/Statistics';
import STATUSES from '../../../services/requestHandler.Statuses';

// ===================== words =============================

const wordsDomain = new WordsDomain();
const { getFileLink } = wordsDomain;
const HIDE_WORD = ' ... ';

function replaceWord(targetText, value) {
  const regExp = /(?<=<(b|i)>)(.*)(?=<\/(b|i)>)/g;
  const [word] = targetText.match(regExp);
  const text = targetText.replace(/<(b|i)>(.*)<\/(b|i)>/g, value);
  return { word, text };
}

function handleWords(data) {
  const res = data.map((wordData) => {
    const {
      image,
      textExample,
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning,
      textMeaningTranslate,
      _id,
      word,
      audio,
      audioExample,
      audioMeaning,
      userWord,
    } = wordData;

    return {
      image: getFileLink(image),
      textExample: replaceWord(textExample, HIDE_WORD).text,
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning: replaceWord(textMeaning, HIDE_WORD).text,
      textMeaningTranslate,
      _id,
      word,
      isNewWord: !userWord,
      audio: getFileLink(audio),
      audioExample: getFileLink(audioExample),
      audioMeaning: getFileLink(audioMeaning),
      cutWords: {
        textExample: replaceWord(textExample).word,
        textMeaning: replaceWord(textMeaning).word,
      },
    };
  });

  return res;
}

function getRandomWords(amount) {
  return shuffle(wordsDomain.groupWords);// .slice(0, amount);
}

async function getDayWordsCollection(optional) {
  const {
    newWords,
    level,
    wordsPerDay,
    wordsMode,
  } = optional;
  await wordsDomain.selectGroupWords(+level);

  const newWordsList = shuffle(wordsDomain.newWords)
    .slice(0, +newWords);
  const repeatWordList = shuffle(wordsDomain.repeatWords)
    .slice(0, (+wordsPerDay - +newWords));
  let allWords = newWordsList.concat(repeatWordList);

  switch (wordsMode) {
    case 'shuffle':
      allWords = newWordsList.concat(repeatWordList);
      break;

    case 'new':
      allWords = newWordsList;
      break;

    case 'repeated':
      allWords = repeatWordList;
      break;

    default:
      allWords = getRandomWords();// (+wordsPerDay);
      break;
  }

  return handleWords(allWords);
}

function getTrueWordsData(collection) {
  return collection.map((wordData) => {
    const {
      word, cutWords, audio, audioExample, audioMeaning, isNewWord,
    } = wordData;
    return {
      word, cutWords, audio, audioExample, audioMeaning, isNewWord,
    };
  })
    .reverse();
}

function registrationWord(wordId, repeatedSettings) {
  wordsDomain.createUserWord(wordId, null, null, repeatedSettings);
}

// ===================== statistics =========================

const statisticsDomain = new StatisticsDomain();

async function getStatistics() {
  const { data, status } = await statisticsDomain.getStatistics();

  if (
    status === STATUSES.NOT_FOUND
    || !data.optional[MAIN_PAGE_ROUTES.LEARNING_WORDS]
  ) {
    return [[]];
  }

  const statistics = data.optional[MAIN_PAGE_ROUTES.LEARNING_WORDS];
  return statistics;
}

async function updateStatistics(statistics) {
  console.log('LONG TERM STAT ====', statistics);
  await statisticsDomain
    .updateStatistics(MAIN_PAGE_ROUTES.LEARNING_WORDS, statistics);
}

const sessionStatistics = {
  newWords: 0,
  allWords: 0,
  successSeries: 0,
  fails: 0,
  success: 0,

  rate() {
    const rate = 100 - Math.floor((this.fails / (this.fails + this.success)) * 100);
    return rate || 0;
  },

  addSuccess(isNewWord, isRepeated) {
    if (isRepeated) {
      return this;
    }
    console.log('ADD SUCCESS');
    this.successSeries += 1;
    this.success += 1;
    this.addWord();

    if (isNewWord) {
      console.log('ADD NEW WORD');
      this.addNewWord();
    }

    return this;
  },

  addFail(isNewWord, isRepeated) {
    if (isRepeated) {
      return this;
    }
    console.log('ADD FAIL');
    this.fails += 1;
    this.successSeries = 0;
    this.addWord();

    if (isNewWord) {
      console.log('ADD NEW WORD');
      this.addNewWord();
    }
    return this;
  },

  addNewWord() {
    this.newWords += 1;
    return this;
  },

  addWord() {
    this.allWords += 1;
    return this;
  },

  reset() {
    Object.keys(this).forEach((key) => {
      if (typeof this[key] !== 'function') {
        this[key] = 0;
      }
    });
    return this;
  },
};

// ===================== buttons =============================

async function handleButtons(event, functionsList) {
  const buttonFunction = get(event, 'target.dataset.button');
  if (!buttonFunction) { return; }
  functionsList[buttonFunction]();
}

async function addWordDifficulty(event, wordId, repeatedSettings) {
  const difficulty = get(event, 'target.dataset.difficulty');
  if (!difficulty) { return; }
  await wordsDomain.createUserWord(wordId, difficulty, null, repeatedSettings);
}

async function addWordToVocabulary(event, wordId) {
  const vocabulary = get(event, 'target.dataset.vocabulary');
  if (!vocabulary) { return; }
  await wordsDomain.createUserWord(wordId, null, vocabulary);
}

export {
  handleWords,
  getDayWordsCollection,
  getFileLink,
  replaceWord,
  handleButtons,
  addWordDifficulty,
  addWordToVocabulary,
  getTrueWordsData,
  getRandomWords,
  registrationWord,
  getStatistics,
  updateStatistics,
  sessionStatistics,
};
