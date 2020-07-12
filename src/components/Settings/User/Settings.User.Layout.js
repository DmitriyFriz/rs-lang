// views
import BaseComponent from 'components/BaseComponent/BaseComponent';
import { VALIDATOR_GROUPS, BUTTONS } from '../Settings.Constants';

const { createElement } = BaseComponent;

function getLayout() {
  return `
  <form class="user__form" name="updatedUserData">
  <div>
  <input type="email" id="user-email" name="updatedEmail"
  data-validator="${VALIDATOR_GROUPS.EMAIL}">
  <label for="user-email">User email</label>

  <input type="password" id="user-password" name="updatedPassword"
  data-validator="${VALIDATOR_GROUPS.PASSWORD}">
  <label for="user-password">User password</label>

  <input type="password" id="user-confirm-password" name="updatedConfirmPassword"
  data-validator="${VALIDATOR_GROUPS.CONFIRM_PASSWORD}">
  <label for="user-confirm-password">Confirm password</label>

  <button class="button button-save-user-data" data-button="${BUTTONS.SAVE_USER}">Save</button>
  </div>

  </form>

  <div class="user__delete-account">
  <button class="button button-remove-account" data-button="${BUTTONS.DELETE_ACCOUNT}">Delete your account</button>
  </div>
  `;
}

function getLayoutOfConfirmDelete() {
  return `
      <p class="confirm-delete__description">Are you sure you want to delete your account? All data will be lost!</p>
      <button class="button button-confirm-delete" data-button="${BUTTONS.CONFIRM_DELETE_ACCOUNT}">Yes</button>
      <button class="button button-cancel-delete" data-button="${BUTTONS.CANCEL_DELETE_ACCOUNT}">Cancel</button>
  `;
}

export {
  getLayout,
  getLayoutOfConfirmDelete,
};
