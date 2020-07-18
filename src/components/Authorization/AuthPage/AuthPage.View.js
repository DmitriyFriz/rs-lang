import BaseComponent from 'components/BaseComponent/BaseComponent';
import user from 'domainModels/User/User';
import { HEADER_ROUTES, ROUTERS } from 'router/Router.Constants';
import { onRouteChangeEvent } from 'router/RouteHandler';
import STATUSES from '../../../services/requestHandler.Statuses';
import getAuthPageLayout from './AuthPage.Layout';
import { authEmailRegExp, authPasswordRegEx } from './AuthPage.Data';
import './AuthPage.scss';
import '../Authorization.scss';

export default class AuthPage extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.handleAuthorize = this.handleAuthorize.bind(this);
    this.handleEmailInputConfirmation = this.handleEmailInputConfirmation.bind(this);
    this.handlePasswordInputConfirmation = this.handlePasswordInputConfirmation.bind(this);
  }

  createLayout() {
    [
      this.formAuth, this.submitBtn,
      this.fieldSetEmails, this.fieldSetPasswords] = getAuthPageLayout();

    [this.legendEmail, this.authEmail] = this.fieldSetEmails.childNodes;

    [this.legendPassword, this.authPassword] = this.fieldSetPasswords.childNodes;

    this.component.classList.add('auth');
    this.component.append(this.formAuth);
  }

  addListeners() {
    this.submitBtn.addEventListener('click', this.handleAuthorize);
    this.authEmail.addEventListener('input', this.handleEmailInputConfirmation);
    this.authPassword.addEventListener('input', this.handlePasswordInputConfirmation);
  }

  removeListeners() {
    this.submitBtn.removeEventListener('click', this.handleAuthorize);
    this.authEmail.removeEventListener('input', this.handleEmailInputConfirmation);
    this.authPassword.removeEventListener('input', this.handlePasswordInputConfirmation);
  }

  /** Test User
   * id: 5eef79095a08ac00171d8da6,
   * email: test-bdg@gmail.com,
   * password: Qwerty_123,
   * */

  handleAuthorize(event) {
    event.preventDefault();
    const email = this.authEmail.value;
    const password = this.authPassword.value;
    const { submitBtn } = this;

    if (!email || !password) { return; }

    if (
      this.isEmail(email)
      && this.isCorrectPassword(password)
    ) {
      submitBtn.disabled = true;
      user.signIn({ email, password })
        .then((request) => {
          submitBtn.disabled = false;
          this.handleRequest(request, event);
        });
    }
  }

  handleEmailInputConfirmation() {
    const tag = 'email';
    this.changeFieldSet(false, tag, 'Enter correct Email');
    this.submitBtn.disabled = true;

    if (!this.authEmail.value) {
      this.changeFieldSet(false, tag, 'Enter Email');
    }

    if (!this.isEmail(this.authEmail.value)) { return; }

    this.changeFieldSet(true, tag, 'Success');

    if (this.isCorrectPassword(this.authPassword.value)) {
      this.submitBtn.disabled = false;
    }
  }

  handlePasswordInputConfirmation() {
    const { legendPassword } = this;
    const tag = 'password';
    this.submitBtn.disabled = true;

    if (!this.isCorrectPassword(this.authPassword.value)) {
      this.changeFieldSet(false, tag, 'Enter correct Password');

      if (!this.authPassword.value) {
        legendPassword.textContent = 'Enter Password';
      }
    } else {
      this.changeFieldSet(true, tag, 'Success');
    }

    if (
      this.isEmail(this.authEmail.value)
      && this.isCorrectPassword(this.authPassword.value)
    ) {
      this.submitBtn.disabled = false;
    }
  }

  handleRequest(request, event) {
    const { submitBtn } = this;

    if (request.status === STATUSES.OK) {
      submitBtn.dataset.destination = HEADER_ROUTES.HEADER_AUTHORIZED;
      onRouteChangeEvent(event, ROUTERS.MAIN, ROUTERS.HEADER);
    }

    if (request.status === STATUSES.NOT_FOUND) {
      this.changeFieldSet(false, 'email', 'User not found');
    }

    if (request.status === STATUSES.FORBIDDEN) {
      this.changeFieldSet(false, 'password', 'Wrong password');
    }
  }

  changeFieldSet(action, tag, message) {
    if (action) {
      if (tag === 'password') {
        this.fieldSetPasswords.classList.add('confirmed');
        this.fieldSetPasswords.classList.remove('unconfirmed');

        if (message) {
          this.legendPassword.textContent = message;
        }
      }

      if (tag === 'email') {
        this.fieldSetEmails.classList.add('confirmed');
        this.fieldSetEmails.classList.remove('unconfirmed');

        if (message) {
          this.legendEmail.textContent = message;
        }
      }
    }

    if (!action) {
      if (tag === 'password') {
        this.fieldSetPasswords.classList.add('unconfirmed');
        this.fieldSetPasswords.classList.remove('confirmed');

        if (message) {
          this.legendPassword.textContent = message;
        }
      }

      if (tag === 'email') {
        this.fieldSetEmails.classList.add('unconfirmed');
        this.fieldSetEmails.classList.remove('confirmed');

        if (message) {
          this.legendEmail.textContent = message;
        }
      }
    }
  }

  isEmail(string) {
    const regExp = new RegExp(authEmailRegExp);
    return regExp.test(string);
  }

  isCorrectPassword(string) {
    const regExp = new RegExp(authPasswordRegEx);
    return regExp.test(string);
  }
}
