import BaseComponent from '../BaseComponent/BaseComponent';
import { VOCABULARY } from '../../domain-models/Words/Words.Constants';
import { pageLayout, navTabsLayout, constants } from './Vocabulary.Data';

const { createElement } = BaseComponent;

function getVocabularyInfoLayout(allWordsNum, todayWordsNum) {
  return createElement({
    tag: 'div',
    content: `${pageLayout.info.content1} ${allWordsNum}
    ${pageLayout.info.content2} ${todayWordsNum}`,
    className: pageLayout.info.className,
  });
}

function getVocabularyGroup(targetGroup) {
  const groups = createElement({
    tag: 'div',
    className: 'vocabulary__groups',
  });

  const fieldset = createElement({
    tag: 'fieldset',
    className: 'vocabulary__groups',
    innerHTML: '<legend>Groups</legend>',
  });
  groups.append(fieldset);

  [...Array(constants.groupsAmount).keys()].forEach((index) => {
    const input = createElement({
      tag: 'input',
      id: `group_${index}`,
    });
    input.type = 'radio';
    input.name = 'groups';
    input.value = index;
    if (index === targetGroup) {
      input.checked = true;
    }
    const label = createElement({
      tag: 'label',
      content: `Group ${index}`,
    });
    label.htmlFor = `group_${index}`;
    fieldset.append(input, label);
  });

  return groups;
}

function getVocabularyNavLayout() {
  const nav = createElement({
    tag: 'div',
    className: pageLayout.nav.className,
  });

  navTabsLayout.forEach((tab) => {
    nav.append(createElement({
      tag: 'div',
      content: tab.content,
      className: tab.className,
      destination: tab.destination,
    }));
  });
  return nav;
}

function getWordLayout(wordData, layoutType) {
  const {
    id,
    image,
    wordText,
    audio,
    wordTranslate,
    wordTranscription,
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    date,
    amount,
    repeatDate,
  } = wordData;

  const children = [];

  const item = createElement({
    tag: 'div',
    className: pageLayout.item.className,
    id,
  });

  const img = createElement({
    tag: 'img',
    className: pageLayout.image.className,
  });
  img.src = image;
  img.alt = wordText;
  children.push(img);

  const wordInfoWrap = createElement({
    tag: 'div',
    className: pageLayout.wordInfo.className,
  });
  children.push(wordInfoWrap);

  const word = createElement({
    tag: 'div',
    content: wordText,
    className: pageLayout.word.className,
  });
  wordInfoWrap.append(word);

  const audioButton = createElement({
    tag: 'button',
    className: pageLayout.audio.className,
    dataset: { audio: JSON.stringify(audio) },
  });
  audioButton.title = pageLayout.audio.content;
  wordInfoWrap.append(audioButton);

  // example
  const translateWrap = createElement({
    tag: 'div',
    className: pageLayout.text.className,
  });
  wordInfoWrap.append(translateWrap);

  const translation = createElement({
    tag: 'div',
    content: wordTranslate,
    className: pageLayout.translation.className,
  });
  translateWrap.append(translation);

  const transcription = createElement({
    tag: 'div',
    content: wordTranscription,
    className: pageLayout.transcription.className,
  });
  translateWrap.append(transcription);

  // meaning
  const meaning = createElement({
    tag: 'div',
    className: pageLayout.text.className,
  });
  wordInfoWrap.append(meaning);

  const meaningText = createElement({
    tag: 'p',
    innerHTML: textMeaning,
  });

  const meaningTranslate = createElement({
    tag: 'p',
    innerHTML: textMeaningTranslate,
  });
  meaning.append(meaningText, meaningTranslate);

  // example
  const example = createElement({
    tag: 'div',
    className: pageLayout.text.className,
  });
  wordInfoWrap.append(example);

  const exampleText = createElement({
    tag: 'p',
    innerHTML: textExample,
  });

  const exampleTranslate = createElement({
    tag: 'p',
    innerHTML: textExampleTranslate,
  });
  example.append(exampleText, exampleTranslate);

  // statistic
  const statisticWrap = createElement({
    tag: 'div',
    className: pageLayout.statistic.className,
  });
  wordInfoWrap.append(statisticWrap);

  const addingDate = createElement({
    tag: 'div',
    innerHTML: `Added: <span>${date}</span>`,
  });

  const repeatAmount = createElement({
    tag: 'div',
    innerHTML: `Repeats: <span>${amount}</span>`,
  });

  const nextRepeatDate = createElement({
    tag: 'div',
    innerHTML: `Next repeat: <span>${repeatDate}</span>`,
  });

  statisticWrap.append(addingDate, repeatAmount, nextRepeatDate);

  // buttons
  const buttonsWrap = createElement({
    tag: 'div',
    className: pageLayout.buttons.className,
  });
  children.push(buttonsWrap);

  const removeButton = createElement({
    tag: 'button',
    content: pageLayout.remove.content,
    className: pageLayout.remove.className,
    dataset: {
      id,
      remove: layoutType,
    },
  });
  removeButton.title = layoutType === VOCABULARY.RESTORED
    ? 'Remove' : 'Restore';
  buttonsWrap.append(removeButton);

  if (layoutType === VOCABULARY.RESTORED) {
    const difficultButton = createElement({
      tag: 'button',
      className: 'vocabulary__difficult button',
      dataset: {
        id,
        difficult: 'true',
      },
    });
    difficultButton.title = 'Difficult word';
    buttonsWrap.append(difficultButton);
  }

  item.append(...children);

  return item;
}

function getWordsListLayout(wordsData, layoutType) {
  const list = createElement({
    tag: 'div',
    content: wordsData ? '' : pageLayout.noWords,
    className: pageLayout.list.className,
  });
  let wordsLayout;
  if (wordsData) {
    wordsLayout = wordsData.map((data) => getWordLayout(data, layoutType));

    list.append(...wordsLayout);
  } else {
    wordsLayout = null;
  }
  return [list, wordsLayout];
}

function getPaginationLayout(hasPrevNav, hasNextNav) {
  const pagination = createElement({
    tag: 'div',
    className: pageLayout.pagination.className,
  });

  const prev = createElement({
    tag: 'button',
    content: pageLayout.prev.content,
    className: pageLayout.prev.className,
  });
  if (!hasPrevNav) {
    prev.disabled = true;
  }
  pagination.append(prev);

  const next = createElement({
    tag: 'button',
    content: pageLayout.next.content,
    className: pageLayout.next.className,
  });
  if (!hasNextNav) {
    next.disabled = true;
  }
  pagination.append(next);

  return pagination;
}

function getVocabularyInnerLayout(data) {
  const {
    allWordsNum,
    todayWordsNum,
    words,
    layoutType,
    hasNextNav,
    hasPrevNav,
    activeGroup,
  } = data;
  return [
    getVocabularyGroup(activeGroup),
    getVocabularyInfoLayout(allWordsNum, todayWordsNum),
    getWordsListLayout(words, layoutType),
    getPaginationLayout(hasPrevNav, hasNextNav),
  ];
}

function getContainerLayout() {
  return createElement({
    tag: 'div',
    className: pageLayout.container.className,
  });
}

export {
  getVocabularyNavLayout,
  getVocabularyGroup,
  getVocabularyInnerLayout as getLayout,
  getContainerLayout,
  getWordsListLayout,
  getPaginationLayout,
  getVocabularyInfoLayout,
};
