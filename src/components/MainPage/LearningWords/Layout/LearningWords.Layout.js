import BaseComponent from 'components/BaseComponent/BaseComponent';
import { SETTINGS_MAIN } from '../../../Settings/Settings.Constants';
import { data, translationsList } from './LearningWords.Data';

const { createElement } = BaseComponent;

function createBlock(blocksData, blockName, content) {
  const parent = createElement(blocksData[blockName].parent);
  const { children } = blocksData[blockName];

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

function addBlock(root, blocksData, blockName, content) {
  const parent = createBlock(blocksData, blockName, content);
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
  const block = createElement(data[SETTINGS_MAIN.IMAGE].parent);
  block.innerHTML = `
    <img src="${url}" onerror="this.src = 'assets/default.svg'">
  `;
  root.append(block);
}

const slideLayout = {
  [SETTINGS_MAIN.DIFFICULTY_BUTTONS](root) {
    addBlock(root, data, SETTINGS_MAIN.DIFFICULTY_BUTTONS);
  },
  [SETTINGS_MAIN.VOCABULARY_BUTTONS](root) {
    addBlock(root, data, SETTINGS_MAIN.VOCABULARY_BUTTONS);
  },
  [SETTINGS_MAIN.IMAGE](root, { image }) {
    createAssociativeImg(root, image);
  },
  [SETTINGS_MAIN.EXAMPLE](root, { textExample }) {
    addBlock(root, data, SETTINGS_MAIN.EXAMPLE, textExample);
  },
  [SETTINGS_MAIN.TRANSCRIPTION](root, { transcription }) {
    addBlock(root, data, SETTINGS_MAIN.TRANSCRIPTION, transcription);
  },
  [SETTINGS_MAIN.TRANSLATION](root, parameters) {
    createTranslations(root, parameters);
  },
  [SETTINGS_MAIN.MEANING](root, { textMeaning }) {
    addBlock(root, data, SETTINGS_MAIN.MEANING, textMeaning);
  },
  [SETTINGS_MAIN.WORD_TRANSLATION](root, { wordTranslate }) {
    addBlock(root, data, SETTINGS_MAIN.WORD_TRANSLATION, wordTranslate);
  },
  [SETTINGS_MAIN.ANSWER_BUTTON](root) {
    addBlock(root, data, SETTINGS_MAIN.ANSWER_BUTTON);
  },
};

function createWordSlide(enabledSettings, { _id, word, ...param }) {
  const card = createElement({
    tag: data.slide.tag,
    className: data.slide.className,
    id: _id,
    innerHTML: enabledSettings.includes(SETTINGS_MAIN.WORD_TRANSLATION) ? '' : data.slide.innerHTML,
  });

  enabledSettings.forEach((setting) => {
    if (!slideLayout[setting]) { return; }
    slideLayout[setting](card, { ...param });
  });

  const wordInput = createElement({
    ...data.wordInputBlock,
    innerHTML: `
    <p class="${data.errorsBlock.className}"></p>
     <input class="word-input__input" type="text" size=${word.length} maxlength=${word.length}>
    `,
  });

  const playAudioBtn = createElement(data.playAudioBtn);

  card.append(playAudioBtn, wordInput);
  return card;
}

export {
  createWordSlide,
  createBlock,
};
