import WordsDomain from '../../../domain-models/Words/Words';

const wordsDomain = new WordsDomain();
const { getFileLink } = wordsDomain;

function getInput(text) {
  const regExp = /(?<=<b>)(.*)(?=<\/b>)/g;
  const [word] = text.match(regExp);
  const input = `<input class="original__answer" type="text" size=${word.length}></input>`;
  const res = text.replace(/<b>.*<\/b>/, input);
  return res;
}

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
    } = word;

    return {
      image: getFileLink(image),
      textExample: getInput(textExample),
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning,
      textMeaningTranslate,
    };
  });

  return res;
}

export { getWords, getFileLink };
