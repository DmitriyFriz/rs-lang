import {
  SETTINGS_REPETITION, VALIDATOR_GROUPS, BUTTONS,
} from '../Settings.Constants';

function getLayout() {
  return `
    <div class="repetition__timers">
      <p>Difficulty buttons <br>(repetition of a next word, days)</p>

      <div class="timers__easy">
        <input class="input" type="number" id="timer-easy"
        data-settings="${SETTINGS_REPETITION.EASY}"
        data-validator="${VALIDATOR_GROUPS.TIMERS}">
        <label for="timer-easy">Easy</label>
      </div>


      <div class="timers__medium">
        <input class="input" type="number" id="timer-medium"
        data-settings="${SETTINGS_REPETITION.MEDIUM}">
        <label for="timer-medium">Medium</label>
      </div>


      <div class="timers__hard">
        <input class="input" type="number" id="timer-hard"
        data-settings="${SETTINGS_REPETITION.HARD}">
        <label for="timer-hard">Hard</label>
      </div>


      <div class="timers__again">
        <input class="input" type="number" id="timer-again"
        data-settings="${SETTINGS_REPETITION.AGAIN}">
        <label for="timer-again">Again</label>
      </div>
    </div>

    <div class="repetition__additional">
      <p>Human memory settings</p>

      <div class="additional__forgetting-speed">
      <label for="forgetting-speed">Speed of forgetting information</label>
      <span class"forgetting-speed__min">-</span>
        <input type="range" id="forgetting-speed"
        data-settings="${SETTINGS_REPETITION.FORGETTING_SPEED}"
        min=0.5 max=0.6 step=0.01>
        <span class"forgetting-speed__max">+</span>

      </div>


      <div class="additional__memory-rating">
      <label for="memory-rating">Your memory rating</label>
      <span class"memory-rating__bad">Bad</span>
        <input type="range" id="memory-rating"
        data-settings="${SETTINGS_REPETITION.RATING}"
        min=0.6 max=0.9 step=0.1>
        <span class"memory-rating__good">Good</span>

      </div>


      <div class="additional__max-amount">
      <label for="max-amount">Max number of repetitions after which the speed of forgetting information will stop decreasing</label>
      <span class"max-amount__min">1</span>
        <input type="range" id="max-amount"
        data-settings="${SETTINGS_REPETITION.MAX_AMOUNT}"
        min=1 max=7 step=1>
        <span class"max-amount__max">7</span>

      </div>
    </div>

  <div class="settings-page__control-block">
    <button class="button--light button-save-main-settings" data-button="${BUTTONS.SAVE_REPETITION}">Save</button>
    <button class="button--light button-default-settings" data-button="${BUTTONS.DEFAULT_REPETITION}">Default</button>
  </div>
 `;
}

export default getLayout;
