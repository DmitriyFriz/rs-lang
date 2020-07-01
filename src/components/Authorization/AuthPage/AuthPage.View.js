import BaseComponent from 'components/BaseComponent/BaseComponent';
import User from 'domainModels/User/User';
import { HEADER_ROUTES, MAIN_ROUTES, ROUTERS } from 'router/Router.Constants';
import { onRouteChangeEvent } from 'router/RouteHandler';
import getAuthPageLayout from './AuthPage.Layout';
import { authEmailRegExp, authPasswordRegEx } from './AuthPage.Data';
import './AuthPage.scss';
import '../Authorization.scss';

export default class AuthPage extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.user = new User();
    this.handlerAuthPage = this.handlerAuthPage.bind(this);
    this.handlerAuthorize = this.handlerAuthorize.bind(this);
    this.handlerEmailInputConfirmation = this.handlerEmailInputConfirmation.bind(this);
    this.handlerPasswordInputConfirmation = this.handlerPasswordInputConfirmation.bind(this);
  }

  createLayout() {
    [this.formAuth, this.backToMainPageBtn, this.submitBtn,
      this.fieldSetEmails, this.fieldSetPasswords] = getAuthPageLayout();

    [this.legendEmail, this.authEmail] = this.fieldSetEmails.childNodes;

    [this.legendPassword, this.authPassword] = this.fieldSetPasswords.childNodes;

    this.component.classList.add('auth');
    this.component.append(this.formAuth, this.backToMainPageBtn);
  }

  addListeners() {
    this.component.addEventListener('click', this.handlerAuthPage);
    this.submitBtn.addEventListener('click', this.handlerAuthorize);
    this.authEmail.addEventListener('input', this.handlerEmailInputConfirmation);
    this.authPassword.addEventListener('input', this.handlerPasswordInputConfirmation);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handlerAuthPage);
    this.submitBtn.removeEventListener('click', this.handlerAuthorize);
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

  handlerAuthorize(event) {
    event.preventDefault();
    const email = this.authEmail.value;
    const password = this.authPassword.value;
    const { submitBtn } = this;

    if (
      email
      && password
    ) {
      if (
        this.isEmail(email)
        && this.isCorrectPassword(password)
      ) {
        submitBtn.disabled = true;
        this.user.signIn({ email, password })
          .then((request) => {
            submitBtn.disabled = false;
            this.requestHandler(request, event);
          });
      }
    }
  }

  handlerEmailInputConfirmation() {
    const tag = 'email';
    this.changeFieldSet(false, tag, 'Enter correct Email!');
    this.submitBtn.disabled = true;

    if (!this.authEmail.value) {
      this.changeFieldSet(false, tag, 'Enter Email!');
    }

    if (this.isEmail(this.authEmail.value)) {
      this.changeFieldSet(true, tag, 'Success!');

      if (this.isCorrectPassword(this.authPassword.value)) {
        this.submitBtn.disabled = false;
      }
    }
  }

  handlerPasswordInputConfirmation() {
    const { legendPassword } = this;
    const tag = 'password';
    this.submitBtn.disabled = true;

    if (!this.isCorrectPassword(this.authPassword.value)) {
      this.changeFieldSet(false, tag, 'Enter correct Password!');

      if (!this.authPassword.value) {
        legendPassword.textContent = 'Enter Password!';
      }
    } else {
      this.changeFieldSet(true, tag, 'Success!');
    }

    if (
      this.isEmail(this.authEmail.value)
      && this.isCorrectPassword(this.authPassword.value)
    ) {
      this.submitBtn.disabled = false;
    }
  }

  requestHandler(request, event) {
    const { submitBtn, authEmail } = this;

    if (request.status === 200) {
      submitBtn.dataset.destination = HEADER_ROUTES.SIGN_IN;
      onRouteChangeEvent(event, ROUTERS.HEADER);

      submitBtn.dataset.destination = MAIN_ROUTES.MAIN_PAGE;
      onRouteChangeEvent(event, ROUTERS.MAIN);
    }

    if (request.status === 404) {
      this.changeFieldSet(false, 'email', `User ${authEmail.value} - ${request.statusText}`);
    }

    if (request.status === 403) {
      this.changeFieldSet(false, 'password', 'Wrong password!');
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
    return string.match(new RegExp(authEmailRegExp));
  }

  isCorrectPassword(string) {
    return string.match(new RegExp(authPasswordRegEx));
  }
}
