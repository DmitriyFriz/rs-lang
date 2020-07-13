// constants
import { SETTINGS_ROUTES } from 'router/Router.Constants';
import { BUTTONS, NOTIFICATIONS } from './Settings.Constants';

function getLayout() {
  return `
    <button class="button button-settings-main" data-destination="${SETTINGS_ROUTES.MAIN}">Main</button>
    <button class="button button-settings-repetition" data-destination="${SETTINGS_ROUTES.REPETITION}">Interval repetition method</button>
    <button class="button button-settings-user" data-destination="${SETTINGS_ROUTES.USER}">User</button>
`;
}

function getConfirmLayout() {
  return `
  <p class="confirm-default">${NOTIFICATIONS.CONFIRM_DEFAULT_SETTINGS}</p>
  <button class="button button-confirm-default-main" data-button="${BUTTONS.CONFIRM_DEFAULT_MAIN}">Yes</button>
  <button class="button button-cancel-settings" data-button="${BUTTONS.CANCEL}">Cancel</button>
  `;
}

function addErrorToLayout(validatorGroup) {
  const errorBlock = document
    .querySelector(`[data-validator=${validatorGroup}]`)
    .parentNode;
  errorBlock.classList.add('error');

  errorBlock.addEventListener('animationend', () => {
    errorBlock.classList.remove('error');
  }, { once: true });
}

export { getLayout, addErrorToLayout, getConfirmLayout };
