import BaseComponent from 'components/BaseComponent/BaseComponent';
import user from 'domainModels/User/User';
import getRegisterPageLayout from 'components/Authorization/RegisterPage/RegisterPage.Layout';
import { onRouteChangeEvent } from 'router/RouteHandler';
import { HEADER_ROUTES, MAIN_ROUTES, ROUTERS } from 'router/Router.Constants';
import { regEmailRegExp, regPasswordRegEx } from 'components/Authorization/RegisterPage/RegisterPage.Data';
import './RegisterPage.scss';
import '../Authorization.scss';

export default class RegisterPage extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    // this.user = new User();
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
            this.requestHandler(request, event, email, password);
          });
      }
    }
  }

  handlerConfirmEmailInput(event) {
    const email = event.target.value;
    const tag = 'email';
    const password = this.regPassword.value;
    const passwordConfirm = this.regConfirmPassword.value;
    this.submitBtn.disabled = true;

    if (!email) {
      this.changeFieldSet(false, tag, 'Enter Email!');
    } else {
      this.changeFieldSet(false, tag, 'Enter correct Email!');
    }

    if (this.isEmail(email)) {
      this.changeFieldSet(true, tag, 'Success!');

      if (
        password
        && passwordConfirm
        && this.isPasswordMatch(password, passwordConfirm)
      ) {
        this.submitBtn.disabled = false;
      }
    }
  }

  handlerPasswordInput() {
    const tag = 'password';
    const password = this.regPassword.value;
    const passwordConfirm = this.regConfirmPassword;
    const email = this.regEmail.value;
    const passwordLegend = this.legendPassword;
    this.submitBtn.disabled = true;

    if (!password) {
      this.changeFieldSet(false, tag, '');

      if (passwordConfirm.value) {
        passwordLegend.textContent = 'Confirm Password!';
      } else {
        passwordLegend.textContent = 'Enter Password!';
      }
    } else {
      this.changeFieldSet(false, tag, 'Enter correct Password!');
    }

    if (this.isCorrectPassword(password)) {
      if (this.isPasswordMatch(password, passwordConfirm.value)) {
        this.changeFieldSet(true, tag, 'Success!');

        if (this.isEmail(email)) {
          this.submitBtn.disabled = false;
        }
      } else {
        passwordLegend.textContent = 'Passwords doesn\'t match!';
      }
    }
  }

  handlerConfirmPasswordInput() {
    const tag = 'password';
    const password = this.regPassword;
    const passwordConfirm = this.regConfirmPassword.value;
    const email = this.regEmail.value;
    this.submitBtn.disabled = true;

    if (!password.value) {
      this.changeFieldSet(false, tag, 'Enter Password!');
    }

    if (
      this.isCorrectPassword(password.value)
      && !this.isPasswordMatch(password.value, passwordConfirm)
    ) {
      this.changeFieldSet(false, tag, 'Passwords doesn\'t match!');
    }

    if (
      this.isPasswordMatch(password.value, passwordConfirm)
      && this.isCorrectPassword(password.value)
    ) {
      this.changeFieldSet(true, tag, 'Success!');

      if (this.isEmail(email)) {
        this.submitBtn.disabled = false;
      }
    }
  }

  requestHandler(request, event, email, password) {
    const { submitBtn } = this;

    if (request.status === 200) {
      user.signIn({ email, password })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.dataset.destination = HEADER_ROUTES.SIGN_IN;
          onRouteChangeEvent(event, ROUTERS.HEADER);

          submitBtn.dataset.destination = MAIN_ROUTES.MAIN_PAGE;
          onRouteChangeEvent(event, ROUTERS.MAIN);
        });
    }

    if (request.status === 417) {
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
    return string.match(new RegExp(regEmailRegExp));
  }

  isCorrectPassword(string) {
    return string.match(new RegExp(regPasswordRegEx));
  }

  isPasswordMatch(pass, passConfirm) {
    return pass === passConfirm;
  }
}
