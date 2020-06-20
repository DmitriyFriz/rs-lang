import BaseDomainModel from '../BaseDomainModel/BaseDomainModel';
import { endPoints } from '../../services/requestHandler';

const {
  signIn, register, update, remove,
} = endPoints.users;

class User extends BaseDomainModel {
  constructor() {
    super();
    this.checkAuthStatus();
  }

  async signIn(user) {
    const { status, statusText, data } = await this.getData(signIn(user));

    if (data && status === this.STATUSES.OK) {
      this.token = data.token;
      this.userId = data.userId;
      this.isAuthorized = true;
    }

    return { status, statusText };
  }

  async register(user) {
    const { status, statusText } = await this.getData(register(user));
    return { status, statusText };
  }

  async update(user) {
    if (!this.isAuthorized) {
      return null;
    }
    const endPoint = update(this.userId, this.token, user);
    const { status, statusText } = await this.getData(endPoint);
    return { status, statusText };
  }

  async remove() {
    if (!this.isAuthorized) {
      return null;
    }
    const endPoint = remove(this.userId, this.token);
    const { status, statusText } = await this.getData(endPoint);
    this.logOut();
    return { status, statusText };
  }

  async checkAuthStatus() {
    if (!(this.token && this.userId)) {
      this.isAuthorized = false;
      return false;
    }
    const { status } = await this.update();
    this.isAuthorized = (status !== this.STATUSES.UNAUTHORIZED);
    return this.isAuthorized;
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
