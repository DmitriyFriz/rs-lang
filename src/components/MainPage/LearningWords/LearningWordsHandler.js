// lodash
import get from 'lodash.get';
import shuffle from 'lodash.shuffle';

import WordsDomain from '../../../domain-models/Words/Words';

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
  return shuffle(wordsDomain.groupWords).slice(0, amount);
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
    .slice(0, (+wordsPerDay - +newWords));// !!!!
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
      allWords = getRandomWords(+wordsPerDay);
      break;
  }

  return handleWords(allWords);
}

function getTrueWordsData(collection) {
  return collection.map((wordData) => {
    const {
      word, cutWords, audio, audioExample, audioMeaning,
    } = wordData;
    return {
      word, cutWords, audio, audioExample, audioMeaning,
    };
  })
    .reverse();
}

function registrationWord(wordId) {
  wordsDomain.createUserWord(wordId);
}

// ===================== buttons =============================

async function handleButtons(event, functionsList) {
  const buttonFunction = get(event, 'target.dataset.button');
  if (!buttonFunction) { return; }
  functionsList[buttonFunction]();
}

async function addWordDifficulty(event, wordId) {
  const difficulty = get(event, 'target.dataset.difficulty');
  if (!difficulty) { return; }
  await wordsDomain.createUserWord(wordId, difficulty);
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
};
