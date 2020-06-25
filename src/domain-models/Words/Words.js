import endPoints from 'services/endPoints/endPoints.main';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';
import STATUSES from '../../services/requestHandler.Statuses';

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

const DIFFICULTY = {
  EASY: 7776000000,
  MEDIUM: 3888000000,
  HARD: 1123200000,
  AGAIN: 600000,
};

function checkWordStatus(repeatDate) {
  const date = new Date(repeatDate);
  return date < Date.now();
}

function registrationWord(data, difficulty, vocabulary) {
  const parameters = data;

  parameters.optional.date = Date.now();
  if (parameters.optional.amount === undefined) {
    parameters.optional.amount = 0;
  }
  parameters.optional.amount += 1;

  if (difficulty) {
    parameters.difficulty = difficulty;
    parameters.optional.repeat = {};
    parameters.optional.repeat.date = Date.now() + DIFFICULTY[difficulty.toUpperCase()];
    parameters.optional.repeat.status = false;
  }
  if (vocabulary) {
    parameters.optional.vocabulary = vocabulary;
  }

  return parameters;
}

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
    const { data } = await this.getUserWordById(wordId);
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
