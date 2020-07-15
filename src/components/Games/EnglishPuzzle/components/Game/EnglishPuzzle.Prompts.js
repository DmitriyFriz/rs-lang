const NAME_LOCAL_STORAGE_SETTINGS = 'englishPuzzleSettings';

let updateStateButton;

class EnglishPuzzlePrompts {
  constructor() {
    this.buttonBack = document.querySelector('.button__back');
    this.buttonTranslate = document.querySelector('.button__translate');
    this.buttonSound = document.querySelector('.button__sound');
    this.buttonListen = document.querySelector('.button__listen');
    if (!localStorage.getItem(NAME_LOCAL_STORAGE_SETTINGS)) {
      localStorage.setItem(NAME_LOCAL_STORAGE_SETTINGS, JSON.stringify({
        back: true,
        translate: true,
        sound: true,
        listen: true,
      }));
    }

    const settings = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE_SETTINGS));

    this.setStateButtonMenu(this.buttonBack, settings.back);
    this.setStateButtonMenu(this.buttonTranslate, settings.translate);
    this.setStateButtonMenu(this.buttonSound, settings.sound);
    this.setStateButtonMenu(this.buttonListen, settings.listen);
    updateStateButton = this.updateStateButton.bind();
  }

  setStateButtonMenu(button, state) {
    if (state) {
      button.classList.add('button-active');
    } else {
      button.classList.remove('button-active');
    }
  }

  updateStateButton(property, state) {
    const settings = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE_SETTINGS));
    settings[property] = state;

    localStorage.setItem(NAME_LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  }

  showPicture() {
    const pieces = document.querySelectorAll('.puzzle-piece');

    pieces.forEach((piece) => {
      if (piece.classList.contains('puzzle-piece_hidden')) {
        piece.classList.remove('puzzle-piece_hidden');
      } else {
        piece.classList.add('puzzle-piece_hidden');
      }
    });

    if (this.classList.contains('button-active')) {
      this.classList.remove('button-active');
      updateStateButton('back', false);
    } else {
      this.classList.add('button-active');
      updateStateButton('back', true);
    }
  }

  showTranslation() {
    const sentence = document.querySelector('.game-screen__sentence');

    if (this.classList.contains('button-active')) {
      sentence.style.visibility = 'hidden';
      this.classList.remove('button-active');
      updateStateButton('translate', false);
    } else {
      sentence.style.visibility = 'visible';
      this.classList.add('button-active');
      updateStateButton('translate', true);
    }
  }

  listenSentence() {
    if (this.classList.contains('button-active')) {
      document.querySelector('.button__mute').classList.remove('hidden');
      document.querySelector('.button-for-sound').classList.add('hidden');

      this.classList.remove('button-active');
      updateStateButton('sound', false);
    } else {
      document.querySelector('.button__mute').classList.add('hidden');
      document.querySelector('.button-for-sound').classList.remove('hidden');

      this.classList.add('button-active');
      updateStateButton('sound', true);
    }
  }

  listenCorrectSentence() {
    if (this.classList.contains('button-active')) {
      this.classList.remove('button-active');
      updateStateButton('listen', false);
    } else {
      this.classList.add('button-active');
      updateStateButton('listen', true);
    }
  }

  init() {
    this.buttonBack.onclick = this.showPicture;
    this.buttonTranslate.onclick = this.showTranslation;
    this.buttonSound.onclick = this.listenSentence;
    this.buttonListen.onclick = this.listenCorrectSentence;
  }
}

export default EnglishPuzzlePrompts;
