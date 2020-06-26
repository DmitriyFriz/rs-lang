import get from 'lodash.get';
import WordsDomain from '../../../domain-models/Words/Words';

const wordsDomain = new WordsDomain(0);
const { getFileLink } = wordsDomain;

function pasteInput(text) {
  const regExp = /(?<=<b>)(.*)(?=<\/b>)/g;
  const [word] = text.match(regExp);
  const input = `<input class="original__answer" type="text" size=${word.length}></input>`;
  const res = text.replace(/<b>.*<\/b>/, input);
  return res;
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

  const { data } = await wordsDomain.createUserWord(wordId, difficulty, vocabulary);
  console.log(data);
}

export { getWords, getFileLink, handleRateBlock };
