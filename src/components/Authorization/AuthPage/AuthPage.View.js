import BaseComponent from 'components/BaseComponent/BaseComponent';
import User from 'domainModels/User/User';
import { ROUTERS } from 'router/Router.Constants';
import { onRouteChangeEvent } from 'router/RouteHandler';
import getAuthPageLayout from './AuthPage.Layout';
import { authEmailRegExp } from './AuthPage.Data';
import './AuthPage.scss';

export default class AuthPage extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.user = new User();
    this.isAuthorized = false;
    this.handlerAuthPage = this.handlerAuthPage.bind(this);
    this.handlerAuthorization = this.handlerAuthorization.bind(this);
    this.handlerEmailInputConfirmation = this.handlerEmailInputConfirmation.bind(this);
    this.handlerPasswordInputConfirmation = this.handlerPasswordInputConfirmation.bind(this);
  }

  createLayout() {
    [this.formAuth, this.backToMainPageBtn, this.submitBtn] = getAuthPageLayout();
    [this.authEmail, this.authPassword] = this.formAuth;
    this.component.classList.add('auth');
    this.component.append(this.formAuth, this.backToMainPageBtn);
  }

  addListeners() {
    this.component.addEventListener('click', this.handlerAuthPage);
    this.submitBtn.addEventListener('click', this.handlerAuthorization);
    this.authEmail.addEventListener('input', this.handlerEmailInputConfirmation);
    this.authPassword.addEventListener('input', this.handlerPasswordInputConfirmation);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handlerAuthPage);
    this.submitBtn.removeEventListener('click', this.handlerAuthorization);
    this.authEmail.removeEventListener('input', this.handlerEmailInputConfirmation);
    this.authPassword.removeEventListener('input', this.handlerPasswordInputConfirmation);
  }

  handlerAuthPage(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  /** Test User
   * id: 5eef79095a08ac00171d8da6,
   * email: test-bdg@gmail.com,
     * password: Qwerty_123,
   * */

  handlerAuthorization(event) {
    event.preventDefault();
    const email = this.authEmail.value;
    const password = this.authPassword.value;
    const { submitBtn } = this;

    if (email && password) {
      if (this.isEmail(email)) {
        submitBtn.disabled = true;
        this.user.signIn({ email, password })
          .then((request) => {
            submitBtn.disabled = false;
            if (request.statusText === 'OK') {

            }
          });
      }
    }
  }

  handlerEmailInputConfirmation() {
    this.authEmail.classList.add('unconfirmed');
    this.authEmail.classList.remove('confirmed');
    this.submitBtn.disabled = true;

    if (this.isEmail(this.authEmail.value)) {
      this.authEmail.classList.remove('unconfirmed');
      this.authEmail.classList.add('confirmed');

      if (this.authPassword.value) {
        this.submitBtn.disabled = false;
      }
    }
  }

  handlerPasswordInputConfirmation() {
    this.authPassword.classList.add('confirmed');
    this.authPassword.classList.remove('unconfirmed');

    if (!this.authPassword.value) {
      this.authPassword.classList.remove('confirmed');
      this.authPassword.classList.add('unconfirmed');
    }

    if (this.isEmail(this.authEmail.value)) {
      this.submitBtn.disabled = false;
    }
  }

  isEmail(string) {
    return string.match(new RegExp(authEmailRegExp));
  }
}
