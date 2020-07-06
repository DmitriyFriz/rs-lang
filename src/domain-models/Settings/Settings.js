import endPoints from 'services/endPoints/endPoints.main';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';

const { get, update } = endPoints.settings;

class Settings extends BaseDomainModel {
  async getSettings() {
    const res = await this.getDataOfAuthorizedUser(
      get, this.userId, this.token,
    );
    return res;
  }

  async updateSettings(name, updateData) {
    const { data, status, statusText } = await this.getSettings();
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

export default Settings;
