function getLayout() {
  return `
  <div class="settings__words">
    <p>Words</p>
    <input type="range" id="total-words" name="total-words" data-settings="wordsPerDay" min=5 max=50 step=1>
    <label for="image">Total words per day</label>

    <input type="range" id="new-words" name="new-words" data-settings="newWords" min="3" max="20" step="1">
    <label for="image">New words per day</label>

  </div>
  <p>Level</p>
  <select id="level" data-settings="level">
    <option value="0">level 0</option>
    <option value="1">level 1</option>
    <option value="2">level 2</option>
    <option value="3">level 3</option>
    <option value="4">level 4</option>
    <option value="5">level 5</option>
  </select>

  <div class="settings__cards">
    <p>Display on cards</p>
    <input type="checkbox" id="image" name="image" data-settings="image">
    <label for="image">Associative image</label>

    <input type="checkbox" id="example" name="example" data-settings="example">
    <label for="example">Example</label>

    <input type="checkbox" id="meaning" name="meaning" data-settings="meaning">
    <label for="meaning">Meaning</label>

    <input type="checkbox" id="translate" name="translate" data-settings="translation">
    <label for="translate">Translation</label>
  </div>

  <div class="settings__buttons">
  <p>Buttons</p>
    <input type="checkbox" id="difficulty" name="difficulty" data-settings="difficultyButtons">
    <label for="difficulty">Difficulty buttons</label>

    <input type="checkbox" id="vocabulary" name="vocabulary" data-settings="vocabularyButtons">
    <label for="vocabulary">Vocabulary buttons</label>
  </div>
  `;
}

export default getLayout;
