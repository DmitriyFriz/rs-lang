import { createRequest } from '../../services/requestHandler';

const STATUSES = {
  OK: 200,
  UNAUTHORIZED: 401,
};

class BaseDomainModel {
  constructor() {
    this.STATUSES = STATUSES;
  }

  get isAuthorized() {
    return JSON.parse(localStorage.getItem('isAuthorized'));
  }

  set isAuthorized(value) {
    localStorage.setItem('isAuthorized', value);
  }

  get token() {
    return localStorage.getItem('token');
  }

  set token(token) {
    localStorage.setItem('token', token);
  }

  get userId() {
    return localStorage.getItem('userId');
  }

  set userId(userId) {
    localStorage.setItem('userId', userId);
  }

  async getData(endPoint) {
    const data = await createRequest(endPoint);
    if (data.status === this.STATUSES.UNAUTHORIZED) {
      this.isAuthorized = false;
    }

    return data;
  }

  async getDataOfAuthorizedUser(endPoint) {
    if (this.isAuthorized) {
      return this.getData(endPoint);
    }

    return {
      status: this.STATUSES.UNAUTHORIZED,
      statusText: 'Unauthorized',
    };
  }
}

export default BaseDomainModel;
