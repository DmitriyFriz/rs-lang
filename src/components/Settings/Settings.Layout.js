import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { SETTINGS_ROUTES } from 'router/Router.Constants';
import { ERRORS_LIST } from './Settings.Constants';

const { createElement } = BaseComponent;

function getLayout() {
  return `
    <button class="button button-settings-page" data-destination="${SETTINGS_ROUTES.MAIN}">Main</button>
    <button class="button button-settings-user" data-destination="${SETTINGS_ROUTES.USER}">User</button>
`;
}

function addErrorToLayout(validatorGroup) {
  const errorBlock = document
    .querySelector(`[data-validator=${validatorGroup}]`)
    .parentNode;
  errorBlock.classList.add('error');

  const errorDescription = createElement({
    tag: 'p',
    content: ERRORS_LIST[validatorGroup],
    className: 'error',
  });
  errorBlock.append(errorDescription);

  errorBlock.addEventListener('animationend', () => {
    errorBlock.classList.remove('error');
    errorDescription.remove();
  }, { once: true });
}

export { getLayout, addErrorToLayout };
