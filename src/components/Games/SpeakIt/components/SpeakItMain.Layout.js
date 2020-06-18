import defaultImage from '../images/english.jpg';

export default function() {
  return `
  <section class="main-section hidden">
<fieldset>
  <legend>Levels</legend>
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" class="custom-control-input" id="defaultInline1" value="0" name="chapter" checked>
    <label class="custom-control-label" for="defaultInline1">1</label>
  </div>
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" class="custom-control-input" id="defaultInline2" value="1" name="chapter">
    <label class="custom-control-label" for="defaultInline2">2</label>
  </div>
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" class="custom-control-input" id="defaultInline3" value="2" name="chapter">
    <label class="custom-control-label" for="defaultInline3">3</label>
  </div>
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" class="custom-control-input" id="defaultInline4" value="3" name="chapter">
    <label class="custom-control-label" for="defaultInline4">4</label>
  </div>
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" class="custom-control-input" id="defaultInline5" value="4" name="chapter">
    <label class="custom-control-label" for="defaultInline5">5</label>
  </div>
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" class="custom-control-input" id="defaultInline6" value="5" name="chapter">
    <label class="custom-control-label" for="defaultInline6">6</label>
  </div>
</fieldset>
<button id="stats-btn" class="button"><i class="fas fa-list-ol"></i> statistics</button>
<div id="picture-card" class="card">
  <div class="card-body">
    <img class="card-img-top" src=${defaultImage} alt="picture">
    <p>translation</p>
  </div>
</div>
<div class="buttons-group">
  <div class="button" id="reset-button">Reset</div>
  <div id="speak-button"><i class="fas fa-microphone"></i>Speak</div>
  <div id="results-button">Results<span id="result"></span></div>
</div>
<div class="stars-container"></div>
<div class="words-container d-flex flex-wrap"></div>
</section>`;
}
