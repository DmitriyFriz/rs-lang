import { GAMES_ROUTES } from 'router/Router.Constants';

export default function getSavannahResultLayout() {
  const score = localStorage.getItem('savannah-gameResult');
  const standard = 'you Know';
  const bad = 'Train more';
  const cool = 'Cool';
  return `
<div class="savannah-wrapper">
  <div class="game-message">
    <h1 class="game-message__title">Savannah Game</h1>
    <div class="game-message__result savannah-result">
      <p>${score >= 51 ? cool : bad}, ${standard}</p>
      <div class="game-message__score-wrapper">
        <div class="game-message__score">${score}% words</div>
      </div>
    </div>
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
      <button id="gameListBtn" class="game-message__button" data-destination=${GAMES_ROUTES.GAMES_LIST}>Games</button>
      <button id="startGameBtn" class="game-message__button" data-destination=${GAMES_ROUTES.SAVANNAH_GET_READY}>Repeat</button>
    </div>
  </div>
</div>
  `;
}
