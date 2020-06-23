import endPoints from 'services/endPoints/endPoints.main';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';

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

  async createUserWord(wordId, parameters) {
    const res = await this.getDataOfAuthorizedUser(
      createUserWord, this.userId, this.token, wordId, parameters,
    );
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

  async updateUserWord(wordId, parameters) {
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
}

export default Words;
