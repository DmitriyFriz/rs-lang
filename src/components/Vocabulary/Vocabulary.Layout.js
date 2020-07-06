import BaseComponent from '../BaseComponent/BaseComponent';
import { pageLayout, navTabsLayout } from './Vocabulary.Data';

function getVocabularyInfoLayout(allWordsNum, todayWordsNum) {
  return BaseComponent.createElement({
    tag: 'div',
    content: `${pageLayout.info.content1} ${allWordsNum}
    ${pageLayout.info.content2} ${todayWordsNum}`,
    className: pageLayout.info.className,
  });
}

function getVocabularyNavLayout() {
  const nav = BaseComponent.createElement({
    tag: 'div',
    className: pageLayout.nav.className,
  });

  navTabsLayout.forEach((tab) => {
    nav.append(BaseComponent.createElement({
      tag: 'div',
      content: tab.content,
      className: tab.className,
      destination: tab.destination,
    }));
  });
  return nav;
}

function getWordLayout(wordData) {
  const {
    _id: id,
    word: wordText,
    userWord: { difficulty },
    audio,
    image,
    wordTranslate,
    transcription: wordTranscription,
    textExample,
    textMeaning,
  } = wordData;

  const item = BaseComponent.createElement({
    tag: 'div',
    className: pageLayout.item.className,
    id,
  });

  const word = BaseComponent.createElement({
    tag: 'div',
    content: wordText,
    className: pageLayout.word.className,
  });

  const audioButton = BaseComponent.createElement({
    tag: 'button',
    content: pageLayout.audio.content,
    className: pageLayout.audio.className,
    dataset: { audio: JSON.stringify(audio) },
  });

  const translation = BaseComponent.createElement({
    tag: 'div',
    content: wordTranslate,
    className: pageLayout.translation.className,
  });

  const img = BaseComponent.createElement({
    tag: 'img',
    className: pageLayout.image.className,
  });
  img.src = image;
  img.alt = wordText;

  const transcription = BaseComponent.createElement({
    tag: 'div',
    content: wordTranscription,
    className: pageLayout.transcription.className,
  });

  const meaning = BaseComponent.createElement({
    tag: 'div',
    content: textMeaning,
    className: pageLayout.meaning.className,
  });

  const example = BaseComponent.createElement({
    tag: 'div',
    content: textExample,
    className: pageLayout.example.className,
  });

  const removeButton = BaseComponent.createElement({
    tag: 'button',
    content: pageLayout.remove.content,
    className: pageLayout.remove.className,
    dataset: {
      id,
      difficulty,
    },
  });

  item.append(img, word, audioButton, translation, transcription, meaning, example, removeButton);

  return item;
}

function getWordsListLayout(wordsData) {
  const list = BaseComponent.createElement({
    tag: 'div',
    content: wordsData ? '' : pageLayout.noWords,
    className: pageLayout.list.className,
  });
  let wordsLayout;
  if (wordsData) {
    wordsLayout = wordsData.map((data) => getWordLayout(data));

    list.append(...wordsLayout);
  } else {
    wordsLayout = null;
  }
  return [list, wordsLayout];
}

function getPaginationLayout() {
  const pagination = BaseComponent.createElement({
    tag: 'div',
    className: pageLayout.pagination.className,
  });
  const prev = BaseComponent.createElement({
    tag: 'button',
    content: pageLayout.prev.content,
    className: pageLayout.prev.className,
  });
  const next = BaseComponent.createElement({
    tag: 'button',
    content: pageLayout.next.content,
    className: pageLayout.next.className,
  });

  pagination.append(prev, next);
  return pagination;
}

function getPageLayout(data) {
  const { allWordsNum, todayWordsNum, words } = data;
  return [
    getVocabularyInfoLayout(allWordsNum, todayWordsNum),
    getVocabularyNavLayout(),
    getWordsListLayout(words),
    getPaginationLayout(),
  ];
}

export default getPageLayout;
