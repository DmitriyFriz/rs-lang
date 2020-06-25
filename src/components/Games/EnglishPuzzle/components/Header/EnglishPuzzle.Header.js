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
        <div class="btn button__listen">
            <img class="button-img" src='${speaker}' alt="picture">
        </div>
        <div class="btn button__translate">
            <img class="button-img" src='${translate}' alt="picture">
        </div>
        <div class="btn button__sound">
            <img class="button-img" src='${sound}' alt="picture">
        </div>
        <div class="btn button__back">
            <img class="button-img" src='${background}' alt="picture">
        </div>
    </div>
   </div>
   <div class="game-screen__sentence" />
  `
);

export default CreateHeader;
