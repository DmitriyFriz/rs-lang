import { endPoints, createRequest } from '../../services/requestHandler';

const UNAUTHORIZED_STATUS = 401;
const OK_STATUS = 200;
const {
  signIn, register, update, remove,
} = endPoints.users;

export default {
  get isAuthorized() {
    return JSON.parse(localStorage.getItem('isAuthorized'));
  },
  set isAuthorized(value) {
    localStorage.setItem('isAuthorized', value);
  },

  get token() {
    return localStorage.getItem('token');
  },
  set token(token) {
    localStorage.setItem('token', token);
  },

  get userId() {
    return localStorage.getItem('userId');
  },
  set userId(userId) {
    localStorage.setItem('userId', userId);
  },

  async signIn(user) {
    const endPoint = signIn(user);
    const { status, statusText, data } = await createRequest(endPoint);

    if (data && status === OK_STATUS) {
      this.token = data.token;
      this.userId = data.userId;
      this.isAuthorized = true;
    }

    return { status, statusText };
  },

  async register(user) {
    const endPoint = register(user);
    const { status, statusText } = await createRequest(endPoint);
    return { status, statusText };
  },

  async update(user) {
    if (!this.isAuthorized) {
      return null;
    }
    const endPoint = update(this.userId, this.token, user);
    const { status, statusText } = await createRequest(endPoint);
    return { status, statusText };
  },

  async remove() {
    if (!this.isAuthorized) {
      return null;
    }
    const endPoint = remove(this.userId, this.token);
    const { status, statusText } = await createRequest(endPoint);
    this.logOut();
    return { status, statusText };
  },

  logOut() {
    if (!this.isAuthorized) {
      return;
    }
    this.clearSession();
    this.isAuthorized = false;
  },

  async checkAuthStatus() {
    if (!(this.token && this.userId)) {
      this.isAuthorized = false;
      return false;
    }
    const { url, options } = endPoints.settings.update(this.userId, this.token);
    const res = await fetch(url, options);
    this.isAuthorized = (res.status !== UNAUTHORIZED_STATUS);
    return this.isAuthorized;
  },

  clearSession() {
    ['token', 'userId'].forEach((key) => localStorage.setItem(key, ''));
  },

  async init() {
    await this.checkAuthStatus();
  },
};
