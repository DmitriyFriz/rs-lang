import BaseComponent from 'components/BaseComponent/BaseComponent';
import User from 'domainModels/User/User';
import getRegisterPageLayout from 'components/Authorization/RegisterPage/RegisterPage.Layout';
import { onRouteChangeEvent } from 'router/RouteHandler';
import { ROUTERS } from 'router/Router.Constants';
import { regEmailRegExp, regPasswordRegEx } from 'components/Authorization/RegisterPage/RegisterPage.Data';
import './RegisterPage.scss';
import '../Authorization.scss';

export default class RegisterPage extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.user = new User();
    this.handlerRegPage = this.handlerRegPage.bind(this);
    this.handlerRegistration = this.handlerRegistration.bind(this);
    this.handlerConfirmEmailInput = this.handlerConfirmEmailInput.bind(this);
    this.handlerPasswordInput = this.handlerPasswordInput.bind(this);
    this.handlerConfirmPasswordInput = this.handlerConfirmPasswordInput.bind(this);
  }

  createLayout() {
    [this.formReg, this.backToMainPageBtn, this.submitBtn,
      this.fieldSetEmails, this.fieldSetPasswords] = getRegisterPageLayout();
    [this.legendEmail, this.regEmail] = this.fieldSetEmails.childNodes;
    [this.legendPassword, this.regPassword, ,
      this.regConfirmPassword] = this.fieldSetPasswords.childNodes;
    this.component.classList.add('reg');
    this.component.append(this.formReg, this.backToMainPageBtn);
  }

  addListeners() {
    this.component.addEventListener('click', this.handlerRegPage);
    this.submitBtn.addEventListener('click', this.handlerRegistration);
    this.regEmail.addEventListener('input', this.handlerConfirmEmailInput);
    this.regPassword.addEventListener('input', this.handlerPasswordInput);
    this.regConfirmPassword.addEventListener('input', this.handlerConfirmPasswordInput);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handlerRegPage);
    this.submitBtn.removeEventListener('click', this.handlerRegistration);
    this.regEmail.removeEventListener('input', this.handlerConfirmEmailInput);
    this.regPassword.removeEventListener('input', this.handlerPasswordInput);
    this.regConfirmPassword.removeEventListener('input', this.handlerConfirmPasswordInput);
  }

  handlerRegPage(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  handlerRegistration(event) {
    event.preventDefault();
    const email = this.regEmail;
    const password = this.regPassword;
    const confirmPassword = this.regConfirmPassword;
    event.preventDefault();
    if (email && password && confirmPassword) {
      if (this.isPasswordMatch(password, confirmPassword)) {
        console.log('Match = ', this.isPasswordMatch(password, confirmPassword));
      } else {
        console.log('Not Match = ', this.isPasswordMatch(password, confirmPassword));
      }
    }
  }

  handlerConfirmEmailInput(event) {
    const email = event.target.value;
    const emailLegend = this.legendEmail;
    const password = this.regPassword.value;
    const passwordConfirm = this.regConfirmPassword.value;
    this.submitBtn.disabled = true;

    if (!email) {
      this.fieldSetEmails.classList.add('unconfirmed');
      this.fieldSetEmails.classList.remove('confirmed');

      emailLegend.textContent = 'Enter Email!';
    } else {
      this.fieldSetEmails.classList.remove('confirmed');
      this.fieldSetEmails.classList.add('unconfirmed');

      emailLegend.textContent = 'Enter correct Email!';
    }

    if (this.isEmail(email)) {
      this.fieldSetEmails.classList.remove('unconfirmed');
      this.fieldSetEmails.classList.add('confirmed');
      emailLegend.textContent = 'Success!';

      if (password
        && passwordConfirm
        && this.isPasswordMatch(password, passwordConfirm)) {
        this.submitBtn.disabled = false;
      }
    }
  }

  handlerPasswordInput() {
    const password = this.regPassword.value;
    const passwordConfirm = this.regConfirmPassword;
    const email = this.regEmail.value;
    const passwordLegend = this.legendPassword;
    this.submitBtn.disabled = true;

    if (!password) {
      this.fieldSetPasswords.classList.remove('confirmed');
      this.fieldSetPasswords.classList.add('unconfirmed');

      if (passwordConfirm.value) {
        passwordLegend.textContent = 'Confirm Password!';
      } else {
        passwordLegend.textContent = 'Enter Password!';
      }
    } else {
      this.fieldSetPasswords.classList.remove('confirmed');
      this.fieldSetPasswords.classList.add('unconfirmed');

      passwordLegend.textContent = 'Enter correct Password!';
    }

    if (this.isCorrectPassword(password)) {
      if (this.isPasswordMatch(password, passwordConfirm.value)) {
        this.fieldSetPasswords.classList.remove('unconfirmed');
        this.fieldSetPasswords.classList.add('confirmed');
        passwordLegend.textContent = 'Success!';
        if (this.isEmail(email)) {
          this.submitBtn.disabled = false;
        }
      } else {
        passwordLegend.textContent = 'Passwords doesn\'t match!';
      }
    }
  }

  handlerConfirmPasswordInput() {
    const password = this.regPassword;
    const passwordConfirm = this.regConfirmPassword.value;
    const email = this.regEmail.value;
    const passwordLegend = this.legendPassword;
    this.submitBtn.disabled = true;

    if (!password.value) {
      this.fieldSetPasswords.classList.add('unconfirmed');
      this.fieldSetPasswords.classList.remove('confirmed');
      passwordLegend.textContent = 'Enter Password!';
    }

    if (this.isCorrectPassword(password.value)
      && !this.isPasswordMatch(password.value, passwordConfirm)) {
      this.fieldSetPasswords.classList.add('unconfirmed');
      this.fieldSetPasswords.classList.remove('confirmed');

      passwordLegend.textContent = 'Passwords doesn\'t match!';
    }

    if (this.isPasswordMatch(password.value, passwordConfirm)
      && this.isCorrectPassword(password.value)) {
      this.fieldSetPasswords.classList.remove('unconfirmed');
      this.fieldSetPasswords.classList.add('confirmed');
      passwordLegend.textContent = 'Success!';
      if (this.isEmail(email)) {
        this.submitBtn.disabled = false;
      }
    }
  }

  isEmail(string) {
    return string.match(new RegExp(regEmailRegExp));
  }

  isCorrectPassword(string) {
    return string.match(new RegExp(regPasswordRegEx));
  }

  isPasswordMatch(pass, passConfirm) {
    return pass === passConfirm;
  }
}
