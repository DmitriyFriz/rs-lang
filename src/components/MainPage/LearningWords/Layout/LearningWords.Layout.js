import BaseComponent from 'components/BaseComponent/BaseComponent';
import SETTINGS from '../../../Settings/Settings.Constants';

const { createElement } = BaseComponent;

const TRANSLATIONS = {
  MEANING: 'meaning',
  EXAMPLE: 'example',
  WORD: 'word',
};

function getLayout() {
  return `
  <div class='swiper'>
    <div class="swiper__container">
      <div class="swiper-wrapper">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
  `;
}

function createAnswerBtn(root) {
  const block = createElement({
    tag: 'button',
    className: 'button button-answer',
    content: 'I don\'t know',
  });
  block.dataset.settings = SETTINGS.ANSWER_BUTTON;
  root.append(block);
  return block;
}

function createDifficultyButtons(root) {
  const block = createElement({
    tag: 'div',
    className: 'rate__difficulty',
  });
  block.dataset.settings = SETTINGS.DIFFICULTY_BUTTONS;
  block.innerHTML = `
    <button class="button button-hard" data-difficulty="hard">Hard</button>
    <button class="button button-medium" data-difficulty="medium">Medium</button>
    <button class="button button-easy" data-difficulty="easy">Easy</button>
    <button class="button button-again" data-difficulty="again">Again</button>
  `;
  root.append(block);
  return block;
}

function createVocabularyButtons(root) {
  const block = createElement({
    tag: 'div',
    className: 'rate__vocabulary',
  });
  block.dataset.settings = SETTINGS.VOCABULARY_BUTTONS;

  block.innerHTML = `
    <button class="button button-hard-vocabulary" data-vocabulary="hard">Add to hard</button>
    <button class="button button-removed-vocabulary" data-vocabulary="removed">Add to removed</button>
  `;
  root.append(block);
  return block;
}

function createAssociativeImg(root, image) {
  const block = createElement({
    tag: 'div',
    className: 'swiper-slide__associative',
  });
  block.dataset.settings = SETTINGS.IMAGE;

  block.innerHTML = `<img src="${image}"
      onerror="this.src = 'assets/default.svg'">`;
  root.append(block);
  return block;
}

function createExample(root, textExample) {
  const block = createElement({
    tag: 'div',
    className: 'swiper-slide__example',
  });
  block.dataset.settings = SETTINGS.EXAMPLE;
  block.dataset.translation = TRANSLATIONS.EXAMPLE;
  block.innerHTML = `<p class="example__original" data-cut="textExample">${textExample}</p>`;
  root.append(block);
  return block;
}

function createTranscription(root, transcription) {
  const block = createElement({
    tag: 'div',
    className: 'swiper-slide__word',
  });
  block.dataset.settings = SETTINGS.TRANSCRIPTION;
  block.dataset.translation = TRANSLATIONS.WORD;
  block.innerHTML = `<p class="word__transcription">${transcription}</p>`;
  root.append(block);
  return block;
}

function createMeaning(root, textMeaning) {
  const block = createElement({
    tag: 'div',
    className: 'swiper-slide__meaning',
  });
  block.dataset.settings = SETTINGS.MEANING;
  block.dataset.translation = TRANSLATIONS.MEANING;
  block.innerHTML = `<p class="meaning__original" data-cut="textMeaning">${textMeaning}</p>`;
  root.append(block);
  return block;
}

const translationsList = {
  [TRANSLATIONS.MEANING]: ({ textMeaningTranslate }) => createElement({
    tag: 'p',
    className: `${TRANSLATIONS.MEANING}__translation`,
    content: textMeaningTranslate,
  }),

  [TRANSLATIONS.EXAMPLE]: ({ textExampleTranslate }) => createElement({
    tag: 'p',
    className: `${TRANSLATIONS.EXAMPLE}__translation`,
    content: textExampleTranslate,
  }),

  [TRANSLATIONS.WORD]: ({ wordTranslate }) => createElement({
    tag: 'p',
    className: `${TRANSLATIONS.WORD}__translation`,
    content: wordTranslate,
  }),
};

function createTranslations(root, parameters) {
  const blocks = root.querySelectorAll('[data-translation]');

  [...blocks].forEach((block) => {
    const { translation } = block.dataset;
    block.append(translationsList[translation](parameters));
  });
}

const cardLayout = {
  [SETTINGS.DIFFICULTY_BUTTONS]: (root) => createDifficultyButtons(root),
  [SETTINGS.VOCABULARY_BUTTONS]: (root) => createVocabularyButtons(root),
  [SETTINGS.IMAGE]: (root, { image }) => createAssociativeImg(root, image),
  [SETTINGS.EXAMPLE]: (root, { textExample }) => createExample(root, textExample),
  [SETTINGS.TRANSCRIPTION]: (root, { transcription }) => createTranscription(root, transcription),
  [SETTINGS.TRANSLATION]: (root, parameters) => createTranslations(root, parameters),
  [SETTINGS.MEANING]: (root, { textMeaning }) => createMeaning(root, textMeaning),
  [SETTINGS.ANSWER_BUTTON]: (root) => createAnswerBtn(root),
};

function createWordCard(elementList, { id, word, ...param }) {
  const card = createElement({
    tag: 'div',
    className: 'swiper-slide',
    id,
  });

  elementList.forEach((elem) => {
    cardLayout[elem](card, { ...param });
  });

  const wordInput = createElement({
    tag: 'div',
    className: 'swiper-slide__word-input',
  });

  wordInput.innerHTML = `<input type="text" size=${word.length} maxlength=${word.length}>`;
  card.append(wordInput);

  return card;
}

export {
  getLayout,
  createWordCard,
};
