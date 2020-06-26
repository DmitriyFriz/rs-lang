// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// domain
import Words from 'domainModels/Words/Words';

// layout
import getLayout from './SprintGame.Layout';

// styles
import './SprintGame.scss';

class SprintGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.wordForGame = null;

    this.setTimer = this.setTimer.bind(this);
    this.handleFalseButton = this.handleFalseButton.bind(this);
    this.handleTrueButton = this.handleTrueButton.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  async prepareData() {

  }

  static get name() {
    return GAMES_ROUTES.SPRINT_GAME;
  }

  createLayout() {
    [
      this.container,
      this.time,
      this.question,
      this.answer,
      this.falseButton,
      this.trueButton,
      this.leftKey,
      this.rightKey
    ] = getLayout();

    this.question.textContent = 'question';
    this.answer.textContent = 'answer';

    this.component.append(this.container);
    setInterval(this.setTimer, 1000);
  }

  setTimer() {
    let currentTime = +this.time.textContent;
    currentTime -= 1;

    if (currentTime < 10) {
      this.time.textContent = `0${currentTime}`;
    } else {
      this.time.textContent = currentTime;
    }


    if (currentTime === 0) {
      console.log('finish');
    }
  }

  addListeners() {
    this.falseButton.addEventListener('click', this.handleFalseButton);
    this.trueButton.addEventListener('click', this.handleTrueButton);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  removeListeners() {
    this.falseButton.removeEventListener('click', this.handleFalseButton);
    this.trueButton.removeEventListener('click', this.handleTrueButton);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleFalseButton() {
    console.log(false);
  }

  handleTrueButton() {
    console.log(true);
  }

  handleKeyDown(event) {
    if (event.code === 'ArrowRight') {
      if(event.repeat) return;
      console.log('right');
      this.rightKey.classList.add('work-key');
    }
    if (event.code === 'ArrowLeft') {
      if(event.repeat) return;
      console.log('left');
      this.leftKey.classList.add('work-key');
    }
  }

  handleKeyUp(event) {
    if (event.code === 'ArrowRight') {
      this.rightKey.classList.remove('work-key');
    }
    if (event.code === 'ArrowLeft') {
      this.leftKey.classList.remove('work-key');
    }
  }

}

export default SprintGame;
