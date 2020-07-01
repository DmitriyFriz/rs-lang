import BaseComponent from 'components/BaseComponent/BaseComponent';
import { SETTINGS } from '../../../Settings/Settings.Constants';

const { createElement } = BaseComponent;

const TRANSLATIONS = {
  MEANING: 'meaning',
  EXAMPLE: 'example',
  WORD: 'word',
};

function getMainLayout() {
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

// ========================== buttons ==========================

function createDifficultyButtons(root) {
  const parameters = {
    tag: 'div',
    className: 'swiper-slide__difficulty-buttons',
    id: 'card-difficulty',
    dataset: {
      settings: SETTINGS.DIFFICULTY_BUTTONS,
    },
  };
  const block = createElement(parameters);

  block.innerHTML = `
    <button class="button button-hard" data-difficulty="hard" data-button="difficulty">Hard</button>
    <button class="button button-medium" data-difficulty="medium" data-button="difficulty">Medium</button>
    <button class="button button-easy" data-difficulty="easy" data-button="difficulty">Easy</button>
    <button class="button button-again" data-difficulty="again" data-button="difficulty">Again</button>
  `;
  root.append(block);
  return block;
}

function createVocabularyButtons(root) {
  const parameters = {
    tag: 'div',
    className: 'swiper-slide__vocabulary-buttons',
    id: 'card-vocabulary',
    dataset: {
      settings: SETTINGS.VOCABULARY_BUTTONS,
    },
  };
  const block = createElement(parameters);

  block.innerHTML = `
    <button class="button button-hard-vocabulary" data-vocabulary="hard" data-button="vocabulary">Add to hard</button>
    <button class="button button-removed-vocabulary" data-vocabulary="removed" data-button="vocabulary">Add to removed</button>
  `;
  root.append(block);
  return block;
}

function createTrueWordBtn(root) {
  const parameters = {
    tag: 'button',
    className: 'button button-true-word',
    content: 'I don\'t know',
    dataset: {
      settings: SETTINGS.ANSWER_BUTTON,
      button: 'trueWord',
    },
  };
  const block = createElement(parameters);

  root.append(block);
  return block;
}

// ========================== text ==========================

function createExample(root, textExample) {
  const parameters = {
    tag: 'div',
    className: 'swiper-slide__example',
    dataset: {
      settings: SETTINGS.EXAMPLE,
      translation: TRANSLATIONS.EXAMPLE,
    },
  };
  const block = createElement(parameters);

  block.innerHTML = `<p class="example__original" data-cut="textExample">${textExample}</p>`;
  root.append(block);
  return block;
}

function createTranscription(root, transcription) {
  const block = createElement({
    tag: 'div',
    className: 'swiper-slide__word',
    id: 'card-word',
    dataset: {
      settings: SETTINGS.TRANSCRIPTION,
      translation: TRANSLATIONS.WORD,
    },
  });
  block.innerHTML = `<p class="word__transcription">${transcription}</p>`;
  root.append(block);
  return block;
}

function createMeaning(root, textMeaning) {
  const parameters = {
    tag: 'div',
    className: 'swiper-slide__meaning',
    dataset: {
      settings: SETTINGS.MEANING,
      translation: TRANSLATIONS.MEANING,
    },
  };
  const block = createElement(parameters);

  block.innerHTML = `<p class="meaning__original" data-cut="textMeaning">${textMeaning}</p>`;
  root.append(block);
  return block;
}

const translationsList = {
  [TRANSLATIONS.MEANING]: ({ textMeaningTranslate }) => createElement({
    tag: 'p',
    className: 'translation',
    id: 'card-meaning-translation',
    content: textMeaningTranslate,
  }),

  [TRANSLATIONS.EXAMPLE]: ({ textExampleTranslate }) => createElement({
    tag: 'p',
    className: 'translation',
    id: 'card-example-translation',
    content: textExampleTranslate,
  }),

  [TRANSLATIONS.WORD]: ({ wordTranslate }) => createElement({
    tag: 'p',
    className: 'translation',
    id: 'card-word-translation',
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

// ========================== images ==========================

function createAssociativeImg(root, image) {
  const parameters = {
    tag: 'div',
    className: 'swiper-slide__associative',
    data: {
      settings: SETTINGS.IMAGE,
    },
  };
  const block = createElement(parameters);

  block.innerHTML = `<img src="${image}"
      onerror="this.src = 'assets/default.svg'">`;
  root.append(block);
  return block;
}

// ========================== card ==========================

const cardLayout = {
  [SETTINGS.DIFFICULTY_BUTTONS]: (root) => createDifficultyButtons(root),
  [SETTINGS.VOCABULARY_BUTTONS]: (root) => createVocabularyButtons(root),
  [SETTINGS.IMAGE]: (root, { image }) => createAssociativeImg(root, image),
  [SETTINGS.EXAMPLE]: (root, { textExample }) => createExample(root, textExample),
  [SETTINGS.TRANSCRIPTION]: (root, { transcription }) => createTranscription(root, transcription),
  [SETTINGS.TRANSLATION]: (root, parameters) => createTranslations(root, parameters),
  [SETTINGS.MEANING]: (root, { textMeaning }) => createMeaning(root, textMeaning),
  [SETTINGS.ANSWER_BUTTON]: (root) => createTrueWordBtn(root),
};

function createWordCard(elementList, { _id, word, ...param }) {
  const card = createElement({
    tag: 'div',
    className: 'swiper-slide',
    id: _id,
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

// ========================== completion notice ==========================

function createCompletionNotice() {
  const block = createElement({
    tag: 'div',
    className: 'completion-notice',
  });
  block.innerHTML = `
    <div class="completion-notice__wrapper">
      <div class="completion-notice__content">
        <p>There are no words for today. You can continue training by clicking "Additional"</p>
        <button class="button button-close-training" data-destination="START_MENU">OK</button>
        <button class="button button-additional" data-button="additional">Additional</button>
      </div>
    </div>
  `;
  return block;
}

export {
  getMainLayout,
  createWordCard,
  createCompletionNotice,
};
