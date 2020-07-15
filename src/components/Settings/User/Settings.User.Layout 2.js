import { VALIDATOR_GROUPS, BUTTONS, NOTIFICATIONS } from '../Settings.Constants';

function getLayout() {
  return `
  <p class="change-data__title">Change user data</p>
  <form class="user__form" name="updatedUserData">

  <div class="change-data__email">
    <label for="user-email">User email</label>
    <input class="input" type="email" id="user-email" name="updatedEmail"
    data-validator="${VALIDATOR_GROUPS.EMAIL}">
  </div>

  <div class="change-data__password">
    <label for="user-password">User password</label>
    <input class="input" type="password" id="user-password" name="updatedPassword"
    data-validator="${VALIDATOR_GROUPS.PASSWORD}">

  </div>

  <div class="change-data__confirm-password">
    <label for="user-confirm-password">Confirm password</label>
    <input class="input" type="password" id="user-confirm-password" name="updatedConfirmPassword"
    data-validator="${VALIDATOR_GROUPS.CONFIRM_PASSWORD}">
  </div>

  <button class="button--light button-save-user-data" data-button="${BUTTONS.SAVE_USER}">Save</button>
  </form>

  <div class="user__delete-account">
  <button class="button button-remove-account" data-button="${BUTTONS.DELETE_ACCOUNT}">Delete your account</button>
  </div>
  `;
}

function getLayoutOfConfirmDelete() {
  return `
      <p class="confirm-delete__description">${NOTIFICATIONS.CONFIRM_DELETE_ACCOUNT}</p>
      <button class="button--light button-confirm-delete" data-button="${BUTTONS.CONFIRM_DELETE_ACCOUNT}">Yes</button>
      <button class="button--light button-cancel-delete" data-button="${BUTTONS.CANCEL_DELETE_ACCOUNT}">Cancel</button>
  `;
}

export {
  getLayout,
  getLayoutOfConfirmDelete,
};
