import BaseComponent from '../BaseComponent/BaseComponent';
import { vocabularyPageLayout, navTabsLayout } from './Vocabulary.Data';

function getVocabularyInfoLayout(allWordsNum, todayWordsNum) {
  return BaseComponent.createElement({
    tag: vocabularyPageLayout.info.tag,
    content: `${vocabularyPageLayout.info.content1} ${allWordsNum}
    ${vocabularyPageLayout.info.content2} ${todayWordsNum}`,
    className: vocabularyPageLayout.info.className,
  });
}

function getVocabularyNavLayout() {
  const nav = BaseComponent.createElement({
    tag: vocabularyPageLayout.nav.tag,
    className: vocabularyPageLayout.nav.className,
  });

  navTabsLayout.forEach((tab) => {
    nav.append(BaseComponent.createElement({
      tag: tab.tag,
      content: tab.content,
      className: tab.className,
      destination: tab.destination,
    }));
  });
  return nav;
}

function getWordLayout(wordData) {
  const item = BaseComponent.createElement({
    tag: vocabularyPageLayout.item.tag,
    content: wordData.word || '111',
    className: vocabularyPageLayout.item.className,
  });
  return item;
}

function getWordsListLayout(wordsData) {
  const list = BaseComponent.createElement({
    tag: vocabularyPageLayout.list.tag,
    className: vocabularyPageLayout.list.className,
  });
  wordsData.forEach((data) => {
    list.append(getWordLayout(data));
  });
  return list;
}

function getPageLayout(data) {
  return [
    getVocabularyInfoLayout(data.allWordsNum, data.todayWordsNum),
    getWordsListLayout(data.words),
    getVocabularyNavLayout(),
  ];
}

export {
  getVocabularyInfoLayout, getVocabularyNavLayout, getPageLayout,
};
