export default function getLayout() {
  return `
    <div class="promo-container">
      <div class="parallax-bg" data-swiper-parallax="-23%"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="title" data-swiper-parallax="-300">Hi, my Friend!</div>
            <div class="subtitle" data-swiper-parallax="-200"></div>
            <div class="text" data-swiper-parallax="-100">
              <p>
              Our team hope, that you'll like it! <br>
              If you wanna improve your english skills, you should use our application every day for an hour!
              </p>
              <a href="https://github.com/jack-guzya/rs-lang">
                <img src="assets/img/github.svg">
              </a>
            </div>
        </div>
        <div class="swiper-slide">
          <div class="title" data-swiper-parallax="-300" data-swiper-parallax-opacity="0">Interval repetitions method</div>
          <div class="subtitle" data-swiper-parallax="-200"></div>
          <div class="text" data-swiper-parallax="-100">
            <p>We have developed a method of interval repetitions. you can choose the time period and how many times to repeat the word. this approach allows you to learn words much faster! <br><br> You can buy our method. Hurry up before someone else does it!</p>
            <img class="forgetting-img" src="assets/Promo/forgettingcurve.png">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="title" data-swiper-parallax="-300">Mini games</div>
          <div class="subtitle" data-swiper-parallax="-200"></div>
          <div class="text" data-swiper-parallax="-100">
            <p>Mini-games are very effective in training and use the interval repetition method. It doesn't make you miss it!</p>
            <div class="logo-list">
            <img src="assets/mini-games-logo/englishPuzzleLogo.svg">
            <img src="assets/mini-games-logo/savannahLogo.svg">
            <img src="assets/mini-games-logo/speakItLogo.svg">
            <img src="assets/mini-games-logo/sprinterLogo.svg">
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
  `;
}
