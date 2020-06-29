import get from 'lodash.get';
import shuffle from 'lodash.shuffle';
import WordsDomain from '../../../domain-models/Words/Words';

const wordsDomain = new WordsDomain();
const { getFileLink } = wordsDomain;

function replaceWord(targetText, value) {
  const regExp = /(?<=<(b|i)>)(.*)(?=<\/(b|i)>)/g;
  const [word] = targetText.match(regExp);
  const text = targetText.replace(regExp, value);
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
    } = wordData;

    return {
      image: getFileLink(image),
      textExample: replaceWord(textExample, ' ... ').text,
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning: replaceWord(textMeaning, ' ... ').text,
      textMeaningTranslate,
      _id,
      word,
      cutWords: {
        textExample: replaceWord(textExample).word,
        textMeaning: replaceWord(textMeaning).word,
      },
    };
  });

  return res;
}

async function getDayWordsCollection(optional) {
  const { newWords = 5, level = 0, wordsPerDay = 20 } = optional;
  await wordsDomain.selectGroupWords(level);

  const newWordsList = wordsDomain.newWords.slice(0, newWords);
  const repeatWordList = wordsDomain.repeatWords.slice(0, (wordsPerDay - newWords));
  let allWords = newWordsList.concat(repeatWordList);

  if (allWords.length < wordsPerDay) {
    const amount = wordsPerDay - allWords.length;
    const additionalWords = shuffle(wordsDomain.groupWords)
      .slice(0, amount);
    allWords = allWords.concat(additionalWords);
    console.log(allWords);
  }

  return shuffle(handleWords(allWords));
}

async function handleButtons(event, functionsList) {
  const buttonFunction = get(event, 'target.dataset.button');
  if (!buttonFunction) { return; }
  functionsList[buttonFunction]();
  // const activeSlide = document.querySelector('.swiper-slide-active');
  // const wordId = activeSlide.id;

  // const { data } = await wordsDomain.createUserWord(wordId, difficulty, vocabulary);
  // console.log(data);
}

async function addWordDifficulty(event, wordId) {
  const difficulty = get(event, 'target.dataset.difficulty');
  if (!difficulty) { return; }

  const { data } = await wordsDomain.createUserWord(wordId, difficulty);
  console.log(data);
}

async function addWordToVocabulary(event, wordId) {
  const vocabulary = get(event, 'target.dataset.vocabulary');
  if (!vocabulary) { return; }

  const { data } = await wordsDomain.createUserWord(wordId, null, vocabulary);
  console.log(data);
}

export {
  handleWords, getDayWordsCollection, getFileLink, replaceWord, handleButtons, addWordDifficulty, addWordToVocabulary,
};
