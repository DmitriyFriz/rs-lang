import endPoints from 'services/endPoints/endPoints.main';
import STATUSES from 'services/requestHandler.Statuses';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';

const { get, update } = endPoints.settings;

class Settings extends BaseDomainModel {
  async getSettings() {
    const res = await this.getDataOfAuthorizedUser(
      get, this.userId, this.token,
    );
    return res;
  }

  async updateSettings(name, settings) {
    const { data, status, statusText } = await this.getSettings();
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
          [name]: settings,
        },
      };
    } else {
      const { optional } = data;
      optional[name] = settings;
      updateData = { optional };
    }

    const res = await this.getDataOfAuthorizedUser(
      update, this.userId, this.token, updateData,
    );
    return res;
  }
}

export default Settings;
