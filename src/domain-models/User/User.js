import STATUSES from 'services/requestHandler.Statuses';
import endPoints from 'services/endPoints/endPoints.main';
import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';

const {
  signIn, register, update, remove,
} = endPoints.users;

class User extends BaseDomainModel {
  constructor() {
    super();
    this.checkAuthStatus();
  }

  async signIn(user) {
    const { status, statusText, data } = await this.getData(signIn, user);

    if (data) {
      this.token = data.token;
      this.userId = data.userId;
      this.isAuthorized = true;
    }

    return { status, statusText };
  }

  async register(user) {
    const res = await this.getData(register, user);
    return res;
  }

  /**
  * The update method doesn't work at the moment.
  * The API has problems with password encoding and returns an error (status: 500).
  */

  async update(user) {
    const res = await this.getDataOfAuthorizedUser(
      update, this.userId, this.token, user,
    );
    return res;
  }

  async remove() {
    const res = await this.getDataOfAuthorizedUser(
      remove, this.userId, this.token,
    );
    this.logOut();
    return res;
  }

  /**
  * checkAuthStatus method sends an empty request to API and checks a response status.
  */

  async checkAuthStatus() {
    if (this.token && this.userId) {
      const { status } = await this.update(null);
      this.isAuthorized = (status !== STATUSES.UNAUTHORIZED);
      return this.isAuthorized;
    }

    this.isAuthorized = false;
    return false;
  }

  logOut() {
    if (!this.isAuthorized) {
      return;
    }
    this.clearSession();
    this.isAuthorized = false;
  }

  clearSession() {
    ['token', 'userId'].forEach((key) => localStorage.setItem(key, ''));
  }
}

export default User;