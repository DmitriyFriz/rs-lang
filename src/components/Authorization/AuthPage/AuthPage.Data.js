import { MAIN_ROUTES } from 'router/Router.Constants';

const authPageLayout = {
  inputAuthEmail: [
    {
      type: 'legend',
      id: 'emailLegend',
      nameClass: 'legend-form',
      content: 'Email',
    },
    {
      type: 'email',
      placeholder: 'e-mail',
      id: 'authEmail',
    },
  ],

  inputAuthPassword: [
    {
      type: 'legend',
      id: 'passwordLegend',
      nameClass: 'legend-form',
      content: 'Password',
    },
    {
      type: 'password',
      placeholder: 'password',
      id: 'authPassword',
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
    value: 'sign in',
    id: 'authSignIn',
    destination: MAIN_ROUTES.MAIN_PAGE,
  },
};

const authClassName = {
  authForm: 'form form--for-input authorization',
  authInput: 'input',
  submit: 'button',
};
// Copied from this source: https://emailregex.com/
const authEmailRegExp = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

const authPasswordRegEx = '^(?=.*[0-9])(?=.*[!_+-}{\\@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!_+-}{@#$%^&*]{8,}';

export {
  authPageLayout, authClassName, authEmailRegExp, authPasswordRegEx,
};
