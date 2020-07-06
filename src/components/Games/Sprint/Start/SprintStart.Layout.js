// constants
import { GAMES_ROUTES } from 'router/Router.Constants';

// icons
import logo from 'assets/mini-games-logo/sprinterLogo.svg';

export default function getLayout() {
  return `
    <div class="game-message">
      <img class="game-message__logo" src=${logo} alt="game logo">
      <h1 class="game-message__title">Sprint</h1>
      <p class="game-message__description">Learn how to quickly translate from english</p>
      <fieldset class="fieldset">
        <legend class="fieldset__legend">Select level</legend>
        <div class="fieldset__control-inline">
          <input class="fieldset__radio" type="radio" class="custom-control-input" id="defaultInline1" value="0" name="chapter" checked>
          <label class="fieldset__label" for="defaultInline1">1</label>
        </div>
        <div class="fieldset__control-inline">
          <input class="fieldset__radio" type="radio" class="custom-control-input" id="defaultInline2" value="1" name="chapter">
          <label class="fieldset__label" for="defaultInline2">2</label>
        </div>
        <div class="fieldset__control-inline">
          <input class="fieldset__radio" type="radio" class="custom-control-input" id="defaultInline3" value="2" name="chapter">
          <label class="fieldset__label" for="defaultInline3">3</label>
        </div>
        <div class="fieldset__control-inline">
          <input class="fieldset__radio" type="radio" class="custom-control-input" id="defaultInline4" value="3" name="chapter">
          <label class="fieldset__label" for="defaultInline4">4</label>
        </div>
        <div class="fieldset__control-inline">
          <input class="fieldset__radio" type="radio" class="custom-control-input" id="defaultInline5" value="4" name="chapter">
          <label class="fieldset__label" for="defaultInline5">5</label>
        </div>
        <div class="fieldset__control-inline">
          <input class="fieldset__radio" type="radio" class="custom-control-input" id="defaultInline6" value="5" name="chapter">
          <label class="fieldset__label" for="defaultInline6">6</label>
        </div>
      </fieldset>
      <div class="game-message__button-container">
        <button class="game-message__button" data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
        <button class="game-message__button" data-destination=${GAMES_ROUTES.SPRINT_GAME}>Play</button>
      </div>
    </div>
  `;
}
