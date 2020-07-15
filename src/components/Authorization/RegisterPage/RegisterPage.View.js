import BaseComponent from 'components/BaseComponent/BaseComponent';
import user from 'domainModels/User/User';
import getRegisterPageLayout from 'components/Authorization/RegisterPage/RegisterPage.Layout';
import { onRouteChangeEvent } from 'router/RouteHandler';
import { HEADER_ROUTES, MAIN_ROUTES, ROUTERS } from 'router/Router.Constants';
import { regEmailRegExp, regPasswordRegEx } from 'components/Authorization/RegisterPage/RegisterPage.Data';
import STATUSES from '../../../services/requestHandler.Statuses';
import './RegisterPage.scss';
import '../Authorization.scss';

export default class RegisterPage extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleConfirmEmailInput = this.handleConfirmEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
  }

  createLayout() {
    [
      this.formReg, this.submitBtn,
      this.fieldSetEmails, this.fieldSetPasswords] = getRegisterPageLayout();

    [this.legendEmail, this.regEmail] = this.fieldSetEmails.childNodes;

    [
      this.legendPassword, this.regPassword, ,
      this.regConfirmPassword] = this.fieldSetPasswords.childNodes;

    this.component.classList.add('reg');
    this.component.append(this.formReg);
  }

  addListeners() {
    this.submitBtn.addEventListener('click', this.handleRegistration);
    this.regEmail.addEventListener('input', this.handleConfirmEmailInput);
    this.regPassword.addEventListener('input', this.handlePasswordInput);
    this.regConfirmPassword.addEventListener('input', this.handleConfirmPasswordInput);
  }

  removeListeners() {
    this.submitBtn.removeEventListener('click', this.handleRegistration);
    this.regEmail.removeEventListener('input', this.handleConfirmEmailInput);
    this.regPassword.removeEventListener('input', this.handlePasswordInput);
    this.regConfirmPassword.removeEventListener('input', this.handleConfirmPasswordInput);
  }

  handleRegistration(event) {
    event.preventDefault();
    const email = this.regEmail.value;
    const password = this.regPassword.value;
    const confirmPassword = this.regConfirmPassword.value;
    const { submitBtn } = this;

    if (
      email
      && password
      && confirmPassword
    ) {
      if (this.isPasswordMatch(password, confirmPassword)) {
        submitBtn.disabled = true;

        user.register({ email, password })
          .then((request) => {
            this.handleRequest(request, event, email, password);
          });
      }
    }
  }

  handleConfirmEmailInput(event) {
    const email = event.target.value;
    const tag = 'email';
    const password = this.regPassword.value;
    const passwordConfirm = this.regConfirmPassword.value;
    this.submitBtn.disabled = true;

    if (!email) {
      this.changeFieldSet(false, tag, 'Enter Email');
    } else {
      this.changeFieldSet(false, tag, 'Enter correct Email');
    }

    if (this.isEmail(email)) {
      this.changeFieldSet(true, tag, 'Success');

      if (
        password
        && passwordConfirm
        && this.isPasswordMatch(password, passwordConfirm)
      ) {
        this.submitBtn.disabled = false;
      }
    }
  }

  handlePasswordInput() {
    const tag = 'password';
    const password = this.regPassword.value;
    const passwordConfirm = this.regConfirmPassword;
    const email = this.regEmail.value;
    const passwordLegend = this.legendPassword;
    this.submitBtn.disabled = true;

    if (!password) {
      this.changeFieldSet(false, tag, '');

      if (passwordConfirm.value) {
        passwordLegend.textContent = 'Confirm Password';
      } else {
        passwordLegend.textContent = 'Enter Password';
      }
    } else {
      this.changeFieldSet(false, tag, 'Enter correct Password');
    }

    if (this.isCorrectPassword(password)) {
      if (this.isPasswordMatch(password, passwordConfirm.value)) {
        this.changeFieldSet(true, tag, 'Success');

        if (this.isEmail(email)) {
          this.submitBtn.disabled = false;
        }
      } else {
        passwordLegend.textContent = 'Passwords doesn\'t match';
      }
    }
  }

  handleConfirmPasswordInput() {
    const tag = 'password';
    const password = this.regPassword;
    const passwordConfirm = this.regConfirmPassword.value;
    const email = this.regEmail.value;
    this.submitBtn.disabled = true;

    if (!password.value) {
      this.changeFieldSet(false, tag, 'Enter Password');
    }

    if (
      this.isCorrectPassword(password.value)
      && !this.isPasswordMatch(password.value, passwordConfirm)
    ) {
      this.changeFieldSet(false, tag, 'Passwords doesn\'t match');
    }

    if (
      this.isPasswordMatch(password.value, passwordConfirm)
      && this.isCorrectPassword(password.value)
    ) {
      this.changeFieldSet(true, tag, 'Success');

      if (this.isEmail(email)) {
        this.submitBtn.disabled = false;
      }
    }
  }

  handleRequest(request, event, email, password) {
    const { submitBtn } = this;

    if (request.status === STATUSES.OK) {
      user.signIn({ email, password })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.dataset.destination = HEADER_ROUTES.HEADER_AUTHORIZED;
          onRouteChangeEvent(event, ROUTERS.MAIN, ROUTERS.HEADER);

          // submitBtn.dataset.destination = MAIN_ROUTES.MAIN_PAGE;
          // onRouteChangeEvent(event, ROUTERS.MAIN);
        });
    }

    if (request.status === STATUSES.EXPECTATION_FAILED) {
      this.changeFieldSet(false, 'email', 'That Email address is taken. Try another.');
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
    const regExp = new RegExp(regEmailRegExp);
    return regExp.test(string);
  }

  isCorrectPassword(string) {
    const regExp = new RegExp(regPasswordRegEx);
    return regExp.test(string);
  }

  isPasswordMatch(pass, passConfirm) {
    return pass === passConfirm;
  }
}
