import { SETTINGS } from './Settings.Constants';

function getLayout() {
  return `
  <div class="settings__words">
    <p>Words</p>
    <input type="range" id="total-words" name="total-words" data-settings="${SETTINGS.WORDS_PER_DAY}" min=5 max=50 step=1>
    <label for="image">Total words per day</label>

    <input type="range" id="new-words" name="new-words" data-settings="${SETTINGS.NEW_WORDS}" min="3" max="20" step="1">
    <label for="image">New words per day</label>

  </div>
  <p>Level</p>
  <select id="level" data-settings="${SETTINGS.LEVEL}">
    <option value="0">level 0</option>
    <option value="1">level 1</option>
    <option value="2">level 2</option>
    <option value="3">level 3</option>
    <option value="4">level 4</option>
    <option value="5">level 5</option>
  </select>

  <div class="settings__cards">
    <p>Display on cards</p>
    <input type="checkbox" id="image" name="image" data-settings="${SETTINGS.IMAGE}">
    <label for="image">Associative image</label>

    <input type="checkbox" id="example" name="example" data-settings="${SETTINGS.EXAMPLE}">
    <label for="example">Example</label>

    <input type="checkbox" id="meaning" name="meaning" data-settings="${SETTINGS.MEANING}">
    <label for="meaning">Meaning</label>

    <input type="checkbox" id="transcription" name="transcription" data-settings="${SETTINGS.TRANSCRIPTION}">
    <label for="translate">Transcription</label>

    <input type="checkbox" id="translate" name="translate" data-settings="${SETTINGS.TRANSLATION}">
    <label for="translate">Translation</label>
  </div>

  <div class="settings__buttons">
  <p>Buttons</p>
    <input type="checkbox" id="difficulty" name="difficulty" data-settings="${SETTINGS.DIFFICULTY_BUTTONS}">
    <label for="difficulty">Difficulty buttons</label>

    <input type="checkbox" id="vocabulary" name="vocabulary" data-settings="${SETTINGS.VOCABULARY_BUTTONS}">
    <label for="vocabulary">Vocabulary buttons</label>

    <input type="checkbox" id="answer" name="answer" data-settings="${SETTINGS.ANSWER_BUTTON}">
    <label for="answer">"I don't know" button</label>
  </div>
  `;
}

export default getLayout;
