import get from 'lodash.get';
import WordsDomain from '../../../domain-models/Words/Words';
import STATUSES from '../../../services/requestHandler.Statuses';

const wordsDomain = new WordsDomain();
const { getFileLink } = wordsDomain;

const DIFFICULTY = {
  EASY: 7776000000,
  MEDIUM: 3888000000,
  HARD: 1123200000,
  AGAIN: 600000,
};

function pasteInput(text) {
  const regExp = /(?<=<b>)(.*)(?=<\/b>)/g;
  const [word] = text.match(regExp);
  const input = `<input class="original__answer" type="text" size=${word.length}></input>`;
  const res = text.replace(/<b>.*<\/b>/, input);
  return res;
}

function checkWordStatus(registrationDate, difficulty) {
  const repeatDate = registrationDate + difficulty;
  const date = new Date(repeatDate);
  return date < Date.now() ? 'ready!' : 'pending!';
}

// DEMO

async function getWords() {
  const { data } = await wordsDomain.getChunk(0, 0);
  const res = data.map((word) => {
    const {
      image,
      textExample,
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning,
      textMeaningTranslate,
      id,
    } = word;

    return {
      image: getFileLink(image),
      textExample: pasteInput(textExample),
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning,
      textMeaningTranslate,
      id,
    };
  });

  return res;
}

async function handleRateBlock(event) {
  const difficulty = get(event, 'target.dataset.difficulty');
  const vocabulary = get(event, 'target.dataset.vocabulary');
  if (!difficulty && !vocabulary) { return; }

  const activeSlide = document.querySelector('.swiper-slide-active');
  const wordId = activeSlide.id;

  // const { data } = await wordsDomain.getAllUserWords();
  // const dateArr = data.map((wordData) => {
  //   const { registrationDate } = wordData.optional;
  //   const difficulty = DIFFICULTY[wordData.difficulty.toUpperCase()]
  //   const status = checkWordStatus(registrationDate, difficulty);
  //   return { date, status };
  // });

  const { data } = await wordsDomain.createUserWord(wordId, difficulty, vocabulary);

  console.log(data);
}

export { getWords, getFileLink, handleRateBlock };
