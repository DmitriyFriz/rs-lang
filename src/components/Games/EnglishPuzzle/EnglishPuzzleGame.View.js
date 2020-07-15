import BaseComponent from 'components/BaseComponent/BaseComponent';
import { ENGLISH_PUZZLE_ROUTES, ROUTERS } from 'router/Router.Constants';
import { onRouteChangeEvent } from 'router/RouteHandler';

// components
import CreateHeader from 'components/Games/EnglishPuzzle/components/Header/EnglishPuzzle.Header';
import CreateMainBlock from 'components/Games/EnglishPuzzle/components/MainBlock/EnglishPuzzle.MainBlock';
import CreateButtons from 'components/Games/EnglishPuzzle/components/ButtonsGame/EnglishPuzzle.ButtonsGame';
import CreateStatistics from 'components/Games/EnglishPuzzle/components/Statistics/EnglishPuzzle.Statistics';
import EnglishPuzzlePrompts from 'components/Games/EnglishPuzzle/components/Game/EnglishPuzzle.Prompts';
import Controller from 'components/Games/EnglishPuzzle/components/Game/EnglishPuzzle.Main';

class EnglishPuzzleGame extends BaseComponent {
  static get name() {
    return ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME;
  }

  createLayout() {
    this.component.innerHTML = `
    <main class="main">
        <div class="content main__content">
            <div class="game-screen">
                ${CreateStatistics()}
                ${CreateHeader()}
                ${CreateMainBlock()}
                ${CreateButtons()}
            </div>
        </div>
    </main>`;
  }

  addEventsForButtons() {
    const btnCheck = document.querySelector('.button__check');
    const btnDknow = document.querySelector('.button__dont-know');
    const soundButton = document.querySelector('.button-for-sound');
    const levelSelector = document.getElementById('level');
    const pageSelector = document.getElementById('page');
    const resultBtn = document.querySelector('.button__results');

    btnCheck.onclick = this.controller.checkSentence.bind(this.controller);
    btnDknow.onclick = this.controller.dontknow.bind(this.controller);
    soundButton.onclick = this.controller.soundCurrentAudio.bind(this.controller);
    resultBtn.onclick = this.controller.openPopup.bind(this.controller);
    levelSelector.onchange = () => {
      this.controller.clearFields();
      this.controller.newRound();
    };
    pageSelector.onchange = () => {
      this.controller.clearFields();
      this.controller.newRound();
    };
  }

  addListeners() {
    const prompts = new EnglishPuzzlePrompts();
    prompts.init();

    this.controller = new Controller();
    this.controller.gameStart();
    this.addEventsForButtons();

    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }

  removeListeners() {}
}

export default EnglishPuzzleGame;
