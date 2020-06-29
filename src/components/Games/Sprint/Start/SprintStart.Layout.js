// constants
import { GAMES_ROUTES } from 'router/Router.Constants';


export default function getLayout() {
  return `
    <div class="start-message">
      <h1>SPRINT</h1>
      <p>Select correct or incorrect translation of the word. You have 60 seconds</p>
      <fieldset>
        <legend>Select level</legend>
        <div class="control-inline">
          <input type="radio" class="custom-control-input" id="defaultInline1" value="0" name="chapter" checked>
          <label class="custom-control-label" for="defaultInline1">1</label>
        </div>
        <div class="control-inline">
          <input type="radio" class="custom-control-input" id="defaultInline2" value="1" name="chapter">
          <label class="custom-control-label" for="defaultInline2">2</label>
        </div>
        <div class="control-inline">
          <input type="radio" class="custom-control-input" id="defaultInline3" value="2" name="chapter">
          <label class="custom-control-label" for="defaultInline3">3</label>
        </div>
        <div class="control-inline">
          <input type="radio" class="custom-control-input" id="defaultInline4" value="3" name="chapter">
          <label class="custom-control-label" for="defaultInline4">4</label>
        </div>
        <div class="control-inline">
          <input type="radio" class="custom-control-input" id="defaultInline5" value="4" name="chapter">
          <label class="custom-control-label" for="defaultInline5">5</label>
        </div>
        <div class="control-inline">
          <input type="radio" class="custom-control-input" id="defaultInline6" value="5" name="chapter">
          <label class="custom-control-label" for="defaultInline6">6</label>
        </div>
      </fieldset>
      <div>
        <button data-destination=${GAMES_ROUTES.GAMES_LIST}>Back</button>
        <button data-destination=${GAMES_ROUTES.SPRINT_GAME}>Play</button>
      </div>
    </div>
  `
}
