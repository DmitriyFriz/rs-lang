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

  async updateStatistics(name, updateData) {
    const { data, status, statusText } = await this.getStatistics();
    if (!data) {
      return { status, statusText };
    }

    const { optional } = data;
    optional[name] = updateData;
    const res = await this.getDataOfAuthorizedUser(
      update, this.userId, this.token, { optional },
    );
    return res;
  }
}

export default Statistics;
