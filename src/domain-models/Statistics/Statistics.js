import endPoints from 'services/endPoints/endPoints.main';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';

const { get, update } = endPoints.statistics;

class Statistics extends BaseDomainModel {
  async getStatistics() {
    const res = await this.getDataOfAuthorizedUser(
      get, this.userId, this.token,
    );
    return res;
  }

  async updateStatistics(data) {
    const res = await this.getDataOfAuthorizedUser(
      update, this.userId, this.token, data,
    );
    return res;
  }
}

export default Statistics;
