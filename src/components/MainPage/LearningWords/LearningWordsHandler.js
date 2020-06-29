// import get from 'lodash.get';
import shuffle from 'lodash.shuffle';
import WordsDomain from '../../../domain-models/Words/Words';

const wordsDomain = new WordsDomain();
const { getFileLink } = wordsDomain;

function pasteInput(text) {
  // const regExp = /(?<=<(b|i)>)(.*)(?=<\/(b|i)>)/g;
  // const [word] = text.match(regExp);
  // const input = ;
  const res = text.replace(/<(b|i)>.*<\/(b|i)>/, ' ... ');
  return res;
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
      id,
      word,
    } = wordData;

    return {
      image: getFileLink(image),
      textExample: pasteInput(textExample),
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning: pasteInput(textMeaning),
      textMeaningTranslate,
      id,
      word,
      // input: `<input class="word-input__input" type="text" size=${word.length}>`,
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

function checkInputWord() {
  console.log('!!');
}

// async function handleRateBlock(event) {
//   const difficulty = get(event, 'target.dataset.difficulty');
//   const vocabulary = get(event, 'target.dataset.vocabulary');
//   if (!difficulty && !vocabulary) { return; }

//   const activeSlide = document.querySelector('.swiper-slide-active');
//   const wordId = activeSlide.id;

//   const { data } = await wordsDomain.createUserWord(wordId, difficulty, vocabulary);
//   console.log(data);
// }

export {
  handleWords, getDayWordsCollection, getFileLink, checkInputWord,
};
