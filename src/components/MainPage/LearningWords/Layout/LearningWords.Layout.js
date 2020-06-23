import BaseComponent from 'components/BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

function getLayout() {
  return `
  <div class='swiper'>
    <div class="swiper__container">
      <div class="slider-wrapper"></div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>`;
}

function createWordCard() {
  return `
    <div class="swiper-slide"></div>
  `;
}

export { getLayout, createWordCard };
