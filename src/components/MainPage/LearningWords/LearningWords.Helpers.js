// lodash
import get from 'lodash.get';
import shuffle from 'lodash.shuffle';

import WordsDomain from '../../../domain-models/Words/Words';

import { sessionStatistics, MODE } from '../MainPage.Statistics';

import { getSettings } from '../../Settings/Settings.Handler';
import { SETTINGS } from '../../Settings/Settings.Constants';

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

function getRandomWords() {
  return shuffle(wordsDomain.groupWords);
}

async function getDayWordsCollection(optional) {
  const {
    newWords,
    level,
    wordsPerDay,
    wordsMode,
  } = optional;
  await wordsDomain.selectGroupWords(+level);

  if (sessionStatistics.mode === MODE.RANDOM) {
    return handleWords(getRandomWords());
  }

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
      allWords = getRandomWords();
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

function getLetterErrors(word, trueWord) {
  let res = '';
  Array.from(trueWord).forEach((trueLetter, index) => {
    const letter = word[index];
    if (trueLetter === letter) {
      res += `<span class="success">${trueLetter}</span>`;
      return;
    }
    res += `<span class="fail">${trueLetter}</span>`;
  });
  return res;
}

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

// ======================== settings ===========================

async function handleSettings(name) {
  const all = await getSettings(name);
  const enabled = Object.keys(all)
    .filter((setting) => all[setting] === true);
  return { enabled, all };
}

async function initSettings() {
  const settings = {};
  const promises = Object
    .keys(SETTINGS)
    .map(async (settingsName) => {
      settings[SETTINGS[settingsName]] = await handleSettings(SETTINGS[settingsName]);
    });

  await Promise.all(promises);
  return settings;
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
  getLetterErrors,
  initSettings,
};
