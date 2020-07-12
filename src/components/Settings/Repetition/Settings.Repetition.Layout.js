import {
  SETTINGS_REPETITION, VALIDATOR_GROUPS, BUTTONS,
} from '../Settings.Constants';

function getLayout() {
  return `
  <p>Interval repetition method</p>
    <div class="interval-repetition__timers">
      <p>Difficulty buttons settings</p>

      <input type="number" id="timer-easy"
      data-settings="${SETTINGS_REPETITION.EASY}"
      data-validator="${VALIDATOR_GROUPS.TIMERS}">
      <label for="timer-easy">Easy</label>

      <input type="number" id="timer-medium"
      data-settings="${SETTINGS_REPETITION.MEDIUM}"
      <label for="timer-medium">Medium</label>

      <input type="number" id="timer-hard"
      data-settings="${SETTINGS_REPETITION.HARD}"
      <label for="timer-hard">Hard</label>

      <input type="number" id="timer-again"
      data-settings="${SETTINGS_REPETITION.AGAIN}"
      <label for="timer-again">Again</label>
    </div>

    <div class="interval-repetition_other">
      <p>Human memory settings</p>

      <input type="range" id="forgetting-speed"
      data-settings="${SETTINGS_REPETITION.FORGETTING_SPEED}"
      min=0.5 max=0.6 step=0.01>
      <label for="forgetting-speed">Forgetting speed</label>

      <input type="range" id="memory-rating"
      data-settings="${SETTINGS_REPETITION.RATING}"
      min=0.6 max=0.9 step=0.1>
      <label for="memory-rating">Memory rating</label>

      <input type="range" id="max-amount"
      data-settings="${SETTINGS_REPETITION.MAX_AMOUNT}"
      min=1 max=7 step=1>
      <label for="max-amount">Max number of repetitions after which the rate of forgetting will stop decreasing</label>
    </div>

    <button class="button button-save-settings" data-button="${BUTTONS.SAVE_REPETITION}">Save</button>
 `;
}

export default getLayout;
