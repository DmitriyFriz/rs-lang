import isEqual from 'lodash.isequal';

import { statistics, sessionStatistics, MODE } from '../MainPage.Statistics';

import {
  getDayWordsCollection,
  getTrueWordsData,
} from './LearningWords.Helpers';

class WordsCollection {
  constructor() {
    this.learnedWords = [];
  }

  async init(settings) {
    if (
      !statistics.dailyPlanCompleted
      && !statistics.isNewDay
      && this.savedWords.length
    ) {
      this.getSavedWords();
      return;
    }
    await this.createWordsCollection(settings);
  }

  async createWordsCollection(settings) {
    this.collection = await getDayWordsCollection(settings);
    this.trueWordsData = getTrueWordsData(this.collection);
  }

  getSavedWords() {
    this.collection = this.savedWords;
    this.trueWordsData = getTrueWordsData(this.collection);
  }

  saveWords() {
    if (!(sessionStatistics.mode === MODE.RANDOM)) {
      this.savedWords = this.collection;
    }
  }

  addWordToRepeat(
    index,
    wordData = this.learnedWords[this.learnedWords.length - 1],
  ) {
    const trueWord = this.trueWordsData[index];
    trueWord.isRepeated = true;
    this.addWordToCollection(wordData, trueWord);
  }

  addWordToLearned() {
    this.learnedWords.push(this.currentWordData);
    this.collection.pop();
  }

  addWordToCollection(wordData, trueWord) {
    const LAST_ELEMENT = 0;
    const previousWordData = this.collection[LAST_ELEMENT];
    const isRepeated = isEqual(wordData, previousWordData);
    if (isRepeated) { return; }
    this.collection.unshift(wordData);
    this.trueWordsData.push(trueWord);
  }

  get savedWords() {
    const wordsData = JSON.parse(localStorage.getItem('savedWords'));
    return wordsData || [];
  }

  set savedWords(value) {
    localStorage.setItem('savedWords', JSON.stringify(value));
  }

  get trueWordsAmount() {
    return this.trueWordsData.length;
  }

  get currentWordData() {
    return this.collection[this.collection.length - 1];
  }
}

export default WordsCollection;
