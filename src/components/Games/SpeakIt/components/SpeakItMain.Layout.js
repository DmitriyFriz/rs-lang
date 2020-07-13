import defaultImage from '../images/english.jpg';

export default function createLayout() {
  return `
  <section class="main-section">
    <fieldset class="fieldset">
      <legend class="fieldset__legend">Levels</legend>
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
    <button class="button" id="stats-btn"><i class="fas fa-list-ol"></i> statistics</button>
    <div id="picture-card" class="card">
      <img class="card-img" src=${defaultImage} alt="picture">
      <p id="translation">translation</p>
    </div>
    <div class="buttons-group">
      <div id="reset-button">Reset</div>
      <div id="speak-button"><i class="fas fa-microphone"></i>Speak</div>
      <div id="results-button">Results<span id="result"></span></div>
    </div>
    <div class="stars-container"></div>
  </section>`;
}
