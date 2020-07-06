import { MAIN_ROUTES } from 'router/Router.Constants';

const regPageLayout = {
  inputRegEmail: [
    {
      type: 'legend',
      id: 'emailLegend',
      nameClass: 'legend-form',
      content: 'Email',
    },
    {
      type: 'email',
      placeholder: 'e-mail',
      id: 'regEmail',
    },
  ],
  inputRegPassword: [
    {
      type: 'legend',
      id: 'passwordLegend',
      nameClass: 'legend-form',
      content: 'Password',
    },
    {
      type: 'password',
      placeholder: 'password',
      id: 'regPassword',
    },
    {
      type: 'span',
      content: 'THE PASSWORD MUST CONTAINS LETTERS OF BOTH REGISTERS AN A DIGIT',
      nameClass: 'password-requirement',
      id: 'reqPassword',
    },
    {
      type: 'password',
      placeholder: 'confirm password',
      id: 'regConfirmPassword',
    },
  ],

  fieldSetEmail:
  {
    type: 'fieldset',
    nameClass: 'reg-fieldsetEmail',
    id: 'fieldEmail',
  },

  fieldSetPassword:
  {
    type: 'fieldset',
    nameClass: 'reg-fieldsetPassword',
    id: 'fieldPassword',
  },

  submit: {
    tag: 'input',
    type: 'submit',
    value: 'sign up',
    id: 'regSignIn',
    destination: MAIN_ROUTES.MAIN_PAGE,
  },
};

const regClassName = {
  regForm: 'form form--for-input registration',
  regInput: 'input',
  submit: 'button',
};

// Copied from this source: https://emailregex.com/
const regEmailRegExp = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

// Copied from this source: //https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
const regPasswordRegEx = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

export {
  regPageLayout, regClassName, regEmailRegExp, regPasswordRegEx,
};
