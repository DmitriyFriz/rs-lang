import STATUSES from 'services/requestHandler.Statuses';
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

  async updateStatistics(name, statistics) {
    const { data, status, statusText } = await this.getStatistics();
    if (
      !data
      && status !== STATUSES.NOT_FOUND
    ) {
      return { status, statusText };
    }

    let updateData;

    if (status === STATUSES.NOT_FOUND) {
      updateData = {
        optional: {
          [name]: statistics,
        },
      };
    } else {
      const { optional } = data;
      optional[name] = statistics;
      updateData = { optional };
    }

    const res = await this.getDataOfAuthorizedUser(
      update, this.userId, this.token, updateData,
    );
    return res;
  }
}

export default Statistics;
