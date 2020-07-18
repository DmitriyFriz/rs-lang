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
      content: 'password ',
      nameClass: 'password-requirement',
      id: 'reqRequirement',
    },

    {
      type: 'password',
      placeholder: 'confirm password',
      id: 'regConfirmPassword',
    },
  ],

  requirements: {
    type: 'i',
    content: 'requirements',
  },

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

const regPasswordRegEx = '^(?=.*[0-9])(?=.*[!_+-}{\\@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!_+-}{@#$%^&*]{8,}';

export {
  regPageLayout, regClassName, regEmailRegExp, regPasswordRegEx,
};
