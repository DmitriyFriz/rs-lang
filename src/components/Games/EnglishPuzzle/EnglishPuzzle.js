import BaseComponent from 'components/BaseComponent/BaseComponent';
import { ENGLISH_PUZZLE_ROUTES } from 'router/Router.Constants';

// components
import CreateHeader from 'components/Games/EnglishPuzzle/components/Header/EnglishPuzzle.Header';
import CreateMainBlock from 'components/Games/EnglishPuzzle/components/MainBlock/EnglishPuzzle.MainBlock';
import CreateButtons from 'components/Games/EnglishPuzzle/components/ButtonsGame/EnglishPuzzle.ButtonsGame';

class EnglishPuzzleGame extends BaseComponent {
  static get name() {
    return ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME;
  }

  createLayout() {
    this.component.innerHTML = `
    <main class="main">
        <div class="content main__content">
            <div class="game-screen">
                ${CreateHeader()}
                ${CreateMainBlock()}
                ${CreateButtons()}
            </div>
        </div>
    </main>`;
  }

  addListeners() {

  }

  removeListeners() {

  }
}

export default EnglishPuzzleGame;
