import { MAIN_ROUTES } from 'router/Router.Constants';

const authPageLayout = {
  inputAuth: [
    {
      type: 'email',
      placeholder: 'E-MAIL',
      id: 'authEmail',
    },
    {
      type: 'password',
      placeholder: 'PASSWORD',
      id: 'authPassword',
    },
  ],

  submit: {
    tag: 'input',
    type: 'submit',
    value: 'SIGN IN',
    id: 'authSignIn',
    destination: '',
  },

  button: {
    tag: 'button',
    className: 'button_', // fake class
    content: 'Go to Main Page',
    destination: MAIN_ROUTES.MAIN_PAGE,
  },
};

const authClassName = {
  auth: 'auth',
  authForm: 'form form--for-input',
  authInput: 'auth__input',
  submit: 'button_', // fake class
};

const authEmailRegExp = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export { authPageLayout, authClassName, authEmailRegExp };
