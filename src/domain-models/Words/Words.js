import get from 'lodash.get';
import endPoints from 'services/endPoints/endPoints.main';
import STATUSES from 'services/requestHandler.Statuses';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';
import { checkGroupWordsStatus, registrationWord } from './WordsHandler';
import {
  VOCABULARY, OPTIONAL, REPEAT, DEFAULT_OPTIONS,
} from './Words.Constants';

const {
  getChunk,
  getWordById,
  createUserWord,
  getUserWordById,
  getAllUserWords,
  updateUserWord,
  deleteUserWord,
  getAggregatedWords,
  getAggregatedWordData,
} = endPoints.words;

const pathToWordStatus = `userWord.optional.${OPTIONAL.REPEAT}.${REPEAT.STATUS}`;

class Words extends BaseDomainModel {
  async getChunk(page, group) {
    const res = await this.getData(getChunk, page, group);
    return res;
  }

  async getWordById(wordId) {
    const res = await this.getData(getWordById, wordId);
    return res;
  }

  async createUserWord(wordId, difficulty, vocabulary, options = DEFAULT_OPTIONS) {
    const parameters = registrationWord({ optional: {} }, difficulty, vocabulary, options);
    console.log(parameters);
    let res = await this.getDataOfAuthorizedUser(
      createUserWord, this.userId, this.token, wordId, parameters,
    );

    if (res.status === STATUSES.EXPECTATION_FAILED) {
      res = await this.updateUserWord(wordId, difficulty, vocabulary, options);
    }

    return res;
  }

  async getUserWordById(wordId) {
    const res = await this.getDataOfAuthorizedUser(
      getUserWordById, this.userId, this.token, wordId,
    );
    return res;
  }

  async getAllUserWords() {
    const res = await this.getDataOfAuthorizedUser(
      getAllUserWords, this.userId, this.token,
    );
    return res;
  }

  async updateUserWord(wordId, newDifficulty, newVocabulary, options = DEFAULT_OPTIONS) {
    const { data, status, statusText } = await this.getUserWordById(wordId);
    if (!data) {
      return { status, statusText };
    }

    const { difficulty, optional } = data;
    const parameters = registrationWord(
      { difficulty, optional }, newDifficulty, newVocabulary, options,
    );

    const res = await this.getDataOfAuthorizedUser(
      updateUserWord, this.userId, this.token, wordId, parameters,
    );
    return res;
  }

  async getAggregatedWords(filter) {
    const res = await this.getDataOfAuthorizedUser(
      getAggregatedWords, this.userId, this.token, filter,
    );
    return res;
  }

  async getAggregatedWordData(filter) {
    const res = await this.getDataOfAuthorizedUser(
      getAggregatedWordData, this.userId, this.token, filter,
    );
    return res;
  }

  async selectGroupWords(group) {
    const ALL_WORDS = 600;
    const filter = {
      $or: [
        { [pathToWordStatus]: false },
        { [pathToWordStatus]: true },
        { userWord: null }],
    };

    const parameters = {
      group,
      wordsPerPage: ALL_WORDS,
      filter: encodeURIComponent(JSON.stringify(filter)),
    };

    const { data, status, statusText } = await this.getAggregatedWords(parameters);
    if (status === STATUSES.UNAUTHORIZED) {
      return { status, statusText };
    }

    const [res] = data;
    this.groupWords = checkGroupWordsStatus(res.paginatedResults);

    return this.groupWords;
  }

  get repeatWords() {
    const pathToVocabulary = `userWord.optional.${OPTIONAL.VOCABULARY}`;
    return this.groupWords.filter((word) => {
      const status = get(word, pathToWordStatus);
      const vocabulary = get(word, pathToVocabulary);
      return (
        !!status
        && (!vocabulary || vocabulary === VOCABULARY.RESTORED)
      );
    });
  }

  get newWords() {
    return this.groupWords.filter((word) => {
      const userWord = get(word, 'userWord');
      return !userWord;
    });
  }

  async deleteUserWord(wordId) {
    const res = await this.getDataOfAuthorizedUser(
      deleteUserWord, this.userId, this.token, wordId,
    );
    return res;
  }

  getFileLink(file) {
    const url = 'https://raw.githubusercontent.com/jack-guzya/rslang-data/master/';
    return `${url}${file}`;
  }
}

export default Words;
