import BaseComponent from 'components/BaseComponent/BaseComponent';
import { SETTINGS_MAIN } from 'components/Settings/Settings.Constants';
import createBlock from 'components/MainPage/MainPage.Layout';
import { data, translationsList } from './LearningWords.Data';

const { createElement } = BaseComponent;

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

const slideElementsList = {
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

const buttonsList = {
  [SETTINGS_MAIN.DIFFICULTY_BUTTONS](root) {
    addBlock(root, data, SETTINGS_MAIN.DIFFICULTY_BUTTONS);
  },
  [SETTINGS_MAIN.VOCABULARY_BUTTONS](root) {
    addBlock(root, data, SETTINGS_MAIN.VOCABULARY_BUTTONS);
  },
};

function addEnabledElements(settings, elementsList, root, param) {
  settings.forEach((setting) => {
    if (!elementsList[setting]) { return; }
    elementsList[setting](root, param);
  });
}

function createWordSlide(enabledSettings, { _id, word, ...param }) {
  const card = createElement({
    tag: data.slide.tag,
    className: data.slide.className,
    id: _id,
    innerHTML: enabledSettings.includes(SETTINGS_MAIN.WORD_TRANSLATION) ? '' : data.slide.innerHTML,
  });

  addEnabledElements(enabledSettings, slideElementsList, card, { ...param });

  const checkBtn = createElement(data.checkWord);
  const wordInput = createElement({
    ...data.wordInputBlock,
    innerHTML: `
    <p class="${data.errorsBlock.className}"></p>
     <input class="word-input__input" type="text" size=${word.length} maxlength=${word.length}>
    `,
  });

  const playAudioBtn = createElement(data.playAudioBtn);

  card.append(playAudioBtn, wordInput, checkBtn);
  return card;
}

function pasteWordsToTexts(words, slide) {
  const texts = slide.querySelectorAll('[data-cut]');

  [...texts].forEach((item) => {
    const text = item;
    const { cut } = text.dataset;
    text.innerHTML = text.innerHTML
      .replace(/\.{3}/, `<span class="success-word">${words[cut]}</span>`);
  });
}

function showElements(list, slide) {
  list.forEach((selector) => {
    const elem = slide.querySelector(selector);
    if (elem) {
      elem.classList.remove('hide');
      elem.classList.add('show');
    }
  });
}

function hideElements(list, slide) {
  list.forEach((selector) => {
    const elem = slide.querySelector(selector);
    if (elem) { elem.classList.add('hide'); }
  });
}

export {
  buttonsList,
  createWordSlide,
  addEnabledElements,
  pasteWordsToTexts,
  showElements,
  hideElements,
};
