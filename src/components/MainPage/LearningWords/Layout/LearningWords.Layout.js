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
  <button class="button button-answer">I don't know</button>
  `;
}

function createRateBlock() {
  const block = createElement({
    tag: 'div',
    className: 'rate',
  });

  block.innerHTML = `
  <div class="rate__vocabulary">
    <button class="button button-hard-vocabulary" data-vocabulary="hard">Add to hard</button>
    <button class="button button-removed-vocabulary" data-vocabulary="removed">Add to removed</button>
  </div>
  <div class="rate__difficulty">
    <button class="button button-hard" data-difficulty="hard">Hard</button>
    <button class="button button-medium" data-difficulty="medium">Medium</button>
    <button class="button button-easy" data-difficulty="easy">Easy</button>
   <button class="button button-again" data-difficulty="again">Again</button>
  </div>
  `;
  return block;
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

export {
  getLayout,
  createWordCard,
  createRateBlock,
};
