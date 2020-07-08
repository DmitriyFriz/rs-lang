import BaseComponent from 'components/BaseComponent/BaseComponent';
import { SETTINGS } from '../../../Settings/Settings.Constants';
import { data, translationsList } from './LearningWords.Data';

const { createElement } = BaseComponent;

function createBlock(blockName, content) {
  const parent = createElement(data[blockName].parent);
  const { children } = data[blockName];

  children.forEach((childParameters) => {
    let parameters = childParameters;
    if (content) {
      parameters = { ...childParameters, content };
    }
    const child = createElement(parameters);
    parent.append(child);
  });

  return parent;
}

function addBlock(root, blockName, content) {
  const parent = createBlock(blockName, content);
  root.append(parent);
}

function createTranslations(root, parameters) {
  const blocks = root.querySelectorAll('[data-translation]');

  [...blocks].forEach((block) => {
    const { translation } = block.dataset;
    const translationElement = createElement(translationsList[translation](parameters));
    block.append(translationElement);
  });
}

function createAssociativeImg(root, url) {
  const block = createElement(data[SETTINGS.IMAGE].parent);
  block.innerHTML = `
    <img src="${url}" onerror="this.src = 'assets/default.svg'">
  `;
  root.append(block);
}

const cardLayout = {
  [SETTINGS.DIFFICULTY_BUTTONS](root) {
    addBlock(root, SETTINGS.DIFFICULTY_BUTTONS);
  },
  [SETTINGS.VOCABULARY_BUTTONS](root) {
    addBlock(root, SETTINGS.VOCABULARY_BUTTONS);
  },
  [SETTINGS.IMAGE](root, { image }) {
    createAssociativeImg(root, image);
  },
  [SETTINGS.EXAMPLE](root, { textExample }) {
    addBlock(root, SETTINGS.EXAMPLE, textExample);
  },
  [SETTINGS.TRANSCRIPTION](root, { transcription }) {
    addBlock(root, SETTINGS.TRANSCRIPTION, transcription);
  },
  [SETTINGS.TRANSLATION](root, parameters) {
    createTranslations(root, parameters);
  },
  [SETTINGS.MEANING](root, { textMeaning }) {
    addBlock(root, SETTINGS.MEANING, textMeaning);
  },
  [SETTINGS.ANSWER_BUTTON](root) {
    addBlock(root, SETTINGS.ANSWER_BUTTON);
  },
};

function createWordCard(elementList, { _id, word, ...param }) {
  const card = createElement({
    ...data.slide,
    id: _id,
  });

  elementList.forEach((elem) => {
    if (!cardLayout[elem]) { return; }
    cardLayout[elem](card, { ...param });
  });

  const wordInput = createElement({
    ...data.wordInput,
    innerHTML: `
    <p class="word-input__success"></p>
     <input class="word-input__input" type="text" size=${word.length} maxlength=${word.length}>
    `,
  });

  const playAudioBtn = createElement(data.playAudioBtn);

  card.append(playAudioBtn, wordInput);
  return card;
}

// ========================== modal blocks ==========================

function createCompletionNotice() {
  const block = createBlock('completionNotice');
  return block;
}

export {
  createWordCard,
  createCompletionNotice,
  createBlock,
};
