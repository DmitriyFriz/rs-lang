// constants
import { SETTINGS_ROUTES } from 'router/Router.Constants';


function getLayout() {
  return `
    <button class="button button-settings-main" data-destination="${SETTINGS_ROUTES.MAIN}">Main</button>
    <button class="button button-settings-repetition" data-destination="${SETTINGS_ROUTES.REPETITION}">Interval repetition method</button>
    <button class="button button-settings-user" data-destination="${SETTINGS_ROUTES.USER}">User</button>
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

export { getLayout, addErrorToLayout };
