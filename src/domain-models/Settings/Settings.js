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

  async updateSettings(data) {
    const res = await this.getDataOfAuthorizedUser(
      update, this.userId, this.token, data,
    );
    return res;
  }
}

export default Settings;
