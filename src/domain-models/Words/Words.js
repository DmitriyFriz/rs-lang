import get from 'lodash.get';
import endPoints from 'services/endPoints/endPoints.main';
import STATUSES from 'services/requestHandler.Statuses';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';
import { checkGroupWordsStatus, registrationWord } from './WordsHandler';

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

class Words extends BaseDomainModel {
  async getChunk(page, group) {
    const res = await this.getData(getChunk, page, group);
    return res;
  }

  async getWordById(wordId) {
    const res = await this.getData(getWordById, wordId);
    return res;
  }

  async createUserWord(wordId, difficulty, vocabulary) {
    const parameters = registrationWord({ optional: {} }, difficulty, vocabulary);

    let res = await this.getDataOfAuthorizedUser(
      createUserWord, this.userId, this.token, wordId, parameters,
    );

    if (res.status === STATUSES.EXPECTATION_FAILED) {
      res = await this.updateUserWord(wordId, difficulty, vocabulary);
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

  async updateUserWord(wordId, newDifficulty, newVocabulary) {
    const { data, status, statusText } = await this.getUserWordById(wordId);
    if (status === STATUSES.UNAUTHORIZED) {
      return { status, statusText };
    }

    const { difficulty, optional } = data;
    const parameters = registrationWord(
      { difficulty, optional }, newDifficulty, newVocabulary,
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
        { 'userWord.optional.repeat.status': false },
        { 'userWord.optional.repeat.status': true },
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
    return this.groupWords.filter((word) => {
      const status = get(word, 'userWord.optional.repeat.status');
      return !!status;
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
