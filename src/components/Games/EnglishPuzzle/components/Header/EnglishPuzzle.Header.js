import BaseComponent from '../../../../BaseComponent/BaseComponent';
import { ENGLISH_PUZZLE_ROUTES } from '../../../../../router/Router.Constants';

// image
import speaker from '../../../../../assets/EnglishPuzzle/speaker.svg';
import sound from '../../../../../assets/EnglishPuzzle/sound.svg';
import background from '../../../../../assets/EnglishPuzzle/background.svg';
import translate from '../../../../../assets/EnglishPuzzle/translate.svg';

const CreateHeader = () => (
  `<div class="game-screen__header game-screen-header">
    <div class="game-screen-header__left">
        <div class="game-screen-header__lvl">
            <span>Level:</span> <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div class="game-screen-header__page">
            <span>Page:</span> <select name="" id="pages">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
    </div>

    <div class="game-screen-header__right">
        <div class="btn btn__listen">
            <img class="button-img" src='${speaker}' alt="picture">
        </div>
        <div class="btn btn__translate">
            <img class="button-img" src='${translate}' alt="picture">
        </div>
        <div class="btn btn__sound">
            <img class="button-img" src='${sound}' alt="picture">
        </div>
        <div class="btn btn__back">
            <img class="button-img" src='${background}' alt="picture">
        </div>
    </div>
   </div>
   <div class="game-screen__sentence" />
  `
);

const CreateMainBlock = () => (
  ` <div class="game-screen__playboard playboard">
        <div class="final-pic"></div>
        <div class="playboard__row">
            <div class="playboard__number">1</div>
            <div class="playboard__sentence playboard__sentence_active"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">2</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">3</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">4</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">5</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">6</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">7</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">8</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">9</div>
            <div class="playboard__sentence"></div>
        </div>
        <div class="playboard__row">
            <div class="playboard__number">10</div>
            <div class="playboard__sentence"></div>
        </div>
    </div>
    <div class="game-screen__puzzle-pieces" /> `
);

const CreateButtons = () => (
  ` <div class="game-screen__buttons">
        <div class="button button__dont-know">I don't know</div>
        <div class="button button__check">Check</div>
        <div class="button button__continue">Continue</div>
        <div class="button button__results">Results</div>
    </div>
    <div class="measure" />`
);

class EnglishPuzzleHeader extends BaseComponent {
  static get name() {
    return ENGLISH_PUZZLE_ROUTES.ENGLISH_PUZZLE_GAME;
  }

  constructor(parent, tagName) {
    super(parent, tagName);

    const menuOptions = [];
  }

  createLayout() {
    this.component.innerHTML = `
    <main class="main">
        <div class="content main__content">
            <div class="game-screen">
                ${CreateHeader()} ${CreateMainBlock()} ${CreateButtons()}
            </div>
        </div>
    </main>`;
  }

  addListeners() {

  }

  removeListeners() {

  }
}

export default EnglishPuzzleHeader;
