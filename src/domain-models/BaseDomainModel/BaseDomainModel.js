/**
 * This base domain model is used to create other models
 * that receive and send data to the main app service.
 */

import createRequest from 'services/requestHandler';
import STATUSES from 'services/requestHandler.Statuses';

class BaseDomainModel {
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

  async getData(endPointGetter, ...param) {
    const res = await createRequest(endPointGetter, ...param);
    return res;
  }

  async getDataOfAuthorizedUser(endPointGetter, ...param) {
    if (this.isAuthorized) {
      return this.getData(endPointGetter, ...param);
    }

    return {
      status: STATUSES.UNAUTHORIZED,
      statusText: 'Unauthorized',
    };
  }
}

export default BaseDomainModel;
