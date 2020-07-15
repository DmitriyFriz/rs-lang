import { GAMES_ROUTES } from 'router/Router.Constants';
import defaultImage from '../images/english.jpg';

// constants

export default function createLayout() {
  return `
  <section class="main-section">
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Select level</legend>
      <div class="fieldset__control-inline">
        <input class="fieldset__radio" type="radio" id="defaultInline1" value="0" name="chapter" checked>
        <label class="fieldset__label" for="defaultInline1">1</label>
      </div>
      <div class="fieldset__control-inline">
        <input class="fieldset__radio" type="radio" id="defaultInline2" value="1" name="chapter">
        <label class="fieldset__label" for="defaultInline2">2</label>
      </div>
      <div class="fieldset__control-inline">
        <input class="fieldset__radio" type="radio" id="defaultInline3" value="2" name="chapter">
        <label class="fieldset__label" for="defaultInline3">3</label>
      </div>
      <div class="fieldset__control-inline">
        <input class="fieldset__radio" type="radio" id="defaultInline4" value="3" name="chapter">
        <label class="fieldset__label" for="defaultInline4">4</label>
      </div>
      <div class="fieldset__control-inline">
        <input class="fieldset__radio" type="radio" id="defaultInline5" value="4" name="chapter">
        <label class="fieldset__label" for="defaultInline5">5</label>
      </div>
      <div class="fieldset__control-inline">
        <input class="fieldset__radio" type="radio" id="defaultInline6" value="5" name="chapter">
        <label class="fieldset__label" for="defaultInline6">6</label>
      </div>
    </fieldset>
    <div id="picture-card" class="card">
      <img class="card-img" src=${defaultImage} alt="picture">
      <p id="translation">translation</p>
    </div>
    <div class="speak-it__buttons-group speak-it__buttons-group_first">
      <div class="speak-it__button" id="reset-button">Reset</div>
      <div class="speak-it__button" id="speak-button">Speak</div>
      <div class="speak-it__button" id="results-button">Results<span id="result"></span></div>
    </div>
    <div class="speak-it__buttons-group">
      <div class="speak-it__button" id="games-button" data-destination=${GAMES_ROUTES.GAMES_LIST}>Games</div>
      <div class="speak-it__button" id="next-button">Next</div>
      <div class="speak-it__button" id="statistic-button">Statistics</div>
    </div>
    <div class="stars-container"></div>
  </section>`;
}
