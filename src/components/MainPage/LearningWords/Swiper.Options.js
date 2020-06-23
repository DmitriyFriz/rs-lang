const swiperOptions = {
  slidesPerView: 3,
  spaceBetween: 10,
  centerInsufficientSlides: true,
  centeredSlides: true,
  preloadImages: true,
  updateOnImagesReady: true,
  grabCursor: false,
  watchOverflow: true,
  preventInteractionOnTransition: true,
  // touchEventsTarget: 'container',

  breakpoints: {

    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  virtual: {
    renderSlide(slide) {
      // slide.setAttribute('data-swiper-slide-index', index);
      return slide;
    },
    cache: true,
    addSlidesBefore: 2,
    addSlidesAfter: 2,
  },
};

export default swiperOptions;
