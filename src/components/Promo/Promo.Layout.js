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
            <p>We applied  a method of interval repetitions. This method is based on the idea that there is an optimal time to repeat what you need to learn.
            The most effective moment is right before you are ready to forget this information.<br><br>
            This approach allows you to learn words much faster!</p>
            <img class="forgetting-img" src="assets/Promo/forgettingcurve.png">
          </div>
        </div>
        <div class="swiper-slide">
        <div class="title" data-swiper-parallax="-300" data-swiper-parallax-opacity="0">Interval repetition method settings</div>
        <div class="subtitle" data-swiper-parallax="-200"></div>
        <div class="text" data-swiper-parallax="-100">
          <p>You can customize timers for difficulty groups and fine-tune interval repetition settings</p>
          <div class="swiper-slide__repetition-settings">

          <div class="swiper-slide__forgetting-speed">
          <label for="forgetting-speed">Speed of forgetting information</label>
          <span class"forgetting-speed__min">-</span>
            <input type="range" id="forgetting-speed"
            min=0.5 max=0.6 step=0.01 value=0.53 disabled>
            <span class"forgetting-speed__max">+</span>
          </div>

          <div class="swiper-slide__memory-rating">
          <label for="memory-rating">Your memory rating</label>
          <span class"memory-rating__bad">Bad</span>
            <input type="range" id="memory-rating"
            min=0.6 max=0.9 step=0.1 value=0.8 disabled>
            <span class"memory-rating__good">Good</span>
          </div>

          <div class="swiper-slide__max-amount">
          <label for="max-amount">Max number of repetitions after which the speed of forgetting information will stop decreasing</label>
          <span class"max-amount__min">1</span>
            <input type="range" id="max-amount"
            min=1 max=7 step=1 value=6 disabled>
            <span class"max-amount__max">7</span>

          </div>
        </div>
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

        <div class="swiper-slide">
        <div class="title" data-swiper-parallax="-300">Register if you are not with us yet!</div>
        <div class="subtitle" data-swiper-parallax="-200"></div>
        <div class="text" data-swiper-parallax="-100">

        <div class="swiper-slide__logo">
        <img src="assets/logo-black.svg">
        </div>

          <div class="swiper-slide__avatars">
          <a href=""></a>
          <img src="https://avatars0.githubusercontent.com/u/60508453?s=460&u=265c9d60fe6f50df6fcdbc67b834f2f6ad255ddb&v=4">
          <img src="https://avatars1.githubusercontent.com/u/52852333?s=460&u=e0752e79575444937fffbf09c0697c953325e170&v=4">
          <img src="https://avatars1.githubusercontent.com/u/51335216?s=460&u=607c60ebe14e35744068d4c62ae090b76aebae6e&v=4">
          <img src="https://avatars2.githubusercontent.com/u/60404055?s=460&u=5665c692aa841cb824735248caa730dcf2b7e1e7&v=4">
          <img src="https://avatars1.githubusercontent.com/u/25509335?s=460&u=a6818be768fecb4948c8f862e8da46c47e584996&v=4">
          <img src="https://avatars2.githubusercontent.com/u/55161018?s=460&u=7bfd25389b7ed59da679441f8d29aa7f569d3f6a&v=4">
          </div>

          <p class="swiper-slide__footer">2020</p>
        </div>
      </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
  `;
}
