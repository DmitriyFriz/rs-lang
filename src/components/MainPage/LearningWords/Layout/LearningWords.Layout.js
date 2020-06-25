import BaseComponent from 'components/BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

function getLayout() {
  return `
  <div class='swiper'>
    <div class="swiper__container">
      <div class="swiper-wrapper">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
  <div class="dictionary-buttons">
    <button class="button button-hard-dictionary">Add to hard</button>
    <button class="button button-deleted-dictionary">Add to deleted</button>
  </div>
  <button class="button button-answer">I don't know</button>
  `;
}

function createDifficultyButtons() {
  const difficultyBlock = createElement({
    tag: 'div',
    className: 'difficulty',
  });

  difficultyBlock.innerHTML = `
  <button class="button button-hard" id="hard">Hard</button>
  <button class="button button-medium" id="medium">Medium</button>
  <button class="button button-easy" id="easy">Easy</button>
  <button class="button button-again" id="again">Again</button>
  `;

  return difficultyBlock;
}

function createWordCard({
  image,
  textExample,
  textExampleTranslate,
  transcription,
  wordTranslate,
  textMeaning,
  textMeaningTranslate,
  id,
}) {
  const card = createElement({
    tag: 'div',
    className: 'swiper-slide',
    id,
  });

  card.innerHTML = `
  <div class="associative">
    <img src="${image}">
  </div>

  <div class="example">
  <p class="example__original">${textExample}</p>
  <p class="example__translation">${textExampleTranslate}</p>
  </div>

  <div class="word">
    <p class="word__transcription">${transcription}</p>
    <p class="word__translation">${wordTranslate}</p>
  </div>

  <div class="meaning">
    <p class="meaning__original">${textMeaning}</p>
    <p class="meaning__translation">${textMeaningTranslate}</p>
  </div>
`;
  return card;
}

export { getLayout, createWordCard, createDifficultyButtons };
