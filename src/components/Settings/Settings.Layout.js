import { SETTINGS_MAIN } from './Settings.Constants';
import { } from '../../domain-models/Words/Words.Constants';

function getLayout() {
  return `
  <div class="settings__words">
    <p>Words</p>
    <input type="range" id="total-words" name="total-words" data-settings="${SETTINGS_MAIN.WORDS_PER_DAY}" min=5 max=50 step=1>
    <label for="image">Total words per day</label>

    <input type="range" id="new-words" name="new-words" data-settings="${SETTINGS_MAIN.NEW_WORDS}" min="3" max="20" step="1">
    <label for="image">New words per day</label>

    <p>Collection words mode</p>
      <select id="words-mode" data-settings="${SETTINGS_MAIN.COLLECTION_WORDS_MODE}">
        <option value="shuffle">Shuffle</option>
        <option value="new">Only new words</option>
        <option value="repeated">Only repeated words</option>
      </select>

    <input type="checkbox" id="autoplay" name="autoplay" data-settings="${SETTINGS_MAIN.AUDIO_AUTOPLAY}">
    <label for="autoplay">Voice autoplay </label>

  </div>
  <p>Level</p>
  <select id="level" data-settings="${SETTINGS_MAIN.LEVEL}">
    <option value=0>level 0</option>
    <option value=1>level 1</option>
    <option value=2>level 2</option>
    <option value=3>level 3</option>
    <option value=4>level 4</option>
    <option value=5>level 5</option>
  </select>

  <div class="settings__cards">
    <p>Display on cards</p>
    <input type="checkbox" id="image" name="image" data-settings="${SETTINGS_MAIN.IMAGE}">
    <label for="image">Associative image</label>

    <input type="checkbox" id="example" name="example" data-settings="${SETTINGS_MAIN.EXAMPLE}">
    <label for="example">Example</label>

    <input type="checkbox" id="meaning" name="meaning" data-settings="${SETTINGS_MAIN.MEANING}">
    <label for="meaning">Meaning</label>

    <input type="checkbox" id="transcription" name="transcription" data-settings="${SETTINGS_MAIN.TRANSCRIPTION}">
    <label for="translate">Transcription</label>

    <input type="checkbox" id="translate" name="translate" data-settings="${SETTINGS_MAIN.TRANSLATION}">
    <label for="translate">Translation</label>
  </div>

  <div class="settings__buttons">
  <p>Buttons</p>
    <input type="checkbox" id="difficulty" name="difficulty" data-settings="${SETTINGS_MAIN.DIFFICULTY_BUTTONS}">
    <label for="difficulty">Difficulty buttons</label>

    <input type="checkbox" id="vocabulary" name="vocabulary" data-settings="${SETTINGS_MAIN.VOCABULARY_BUTTONS}">
    <label for="vocabulary">Vocabulary buttons</label>

    <input type="checkbox" id="answer" name="answer" data-settings="${SETTINGS_MAIN.ANSWER_BUTTON}">
    <label for="answer">"I don't know" button</label>
  </div>

  <div class="settings__interval-repetition">
  <p>Interval repetition method</p>
    <div class="interval-repetition__timers">
      <p>Difficulty buttons settings</p>
      <input type="number" id="timer-easy" data-settings="${SETTINGS_MAIN.TIMER_EASY}">
      <label for="timer-easy">Easy</label>

      <input type="number" id="timer-easy" data-settings="${SETTINGS_MAIN.TIMER_EASY}">
      <label for="timer-easy">Easy</label>
    </div>
    <input type="checkbox" id="difficulty" name="difficulty" data-settings="${SETTINGS_MAIN.DIFFICULTY_BUTTONS}">
    <label for="difficulty">Difficulty buttons</label>

    <input type="checkbox" id="vocabulary" name="vocabulary" data-settings="${SETTINGS_MAIN.VOCABULARY_BUTTONS}">
    <label for="vocabulary">Vocabulary buttons</label>

    <input type="checkbox" id="answer" name="answer" data-settings="${SETTINGS_MAIN.ANSWER_BUTTON}">
    <label for="answer">"I don't know" button</label>
  </div>
  `;
}

export default getLayout;
