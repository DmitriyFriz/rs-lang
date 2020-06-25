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
    const parameters = { optional: {} };

    if (difficulty) {
      parameters.difficulty = difficulty;
      parameters.optional.registrationDate = Date.now();
    }
    if (vocabulary) {
      parameters.optional.vocabulary = vocabulary;
    }

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
    const parameters = { difficulty, optional };

    if (newDifficulty) {
      parameters.difficulty = newDifficulty;
      parameters.optional.registrationDate = Date.now();
    }
    if (newVocabulary) {
      parameters.optional.vocabulary = newVocabulary;
    }

    const res = await this.getDataOfAuthorizedUser(
      updateUserWord, this.userId, this.token, wordId, parameters,
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
