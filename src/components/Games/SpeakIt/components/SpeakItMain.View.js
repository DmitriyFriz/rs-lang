// views
import BaseComponent from '../../../BaseComponent/BaseComponent';

// layout
import getLayout from './SpeakItMain.Layout';
import createWordCard from './SpeakItCard.Layout';
import createResults from './SpeakItResults.Layout';
import defaultImage from '../images/english.jpg';
import starImage from '../images/star-win.svg';

// router
import { onRouteChangeEvent } from '../../../../router/RouteHandler';

// constants
import { ROUTERS } from '../../../../router/Router.Constants';

// services
import { endPoints, createRequest } from '../../../../services/requestHandler';

// styles
import './SpeakItMain.scss';

// Speech Recognition Mode

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 7;

class SpeakItMain extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.state = {
      level: 0,
      words: null,
      learnedWords: [],
      isGameActive: false,
    };
    this.results = {
      correctCount: 0,
    };
  }

  async prepareData() {
    const page = Math.floor(Math.random() * 30);
    const endPoint = endPoints.words.getChunk({ page, group: this.state.level });
    const data = await createRequest(endPoint);
    this.state.words = data.slice(0, 10);
  }

  createWords() {
    return this.state.words.map((word, i) => createWordCard(word, i));
  }

  createLayout() {
    this.component.innerHTML = getLayout();
    this.wordsContainer = document.createElement('div');
    this.wordsContainer.className = 'words-container';
    this.wordsContainer.append(...this.createWords());
    this.component.append(this.wordsContainer);
  }

  switchLevels(event) {
    if (event.target.tagName === 'INPUT') {
      this.state.level = event.target.value;
      this.prepareData().then(() => {
        this.wordsContainer.innerHTML = '';
        this.wordsContainer.append(...this.createWords());
        this.resetImage();
      });
    }
  }

  wordClickHandler(event) {
    const card = event.target.closest('.card');
    const { words, isGameActive } = this.state;
    if (isGameActive) {
      return;
    }
    const translationElement = document.getElementById('translation');
    const i = card.id;
    translationElement.textContent = words[i].wordTranslate;
    translationElement.style.visibility = 'visible';
    this.setActiveCard(card);
    this.setImage(words[i].image);
    const audioSrc = `https://raw.githubusercontent.com/ana-karp/rslang/rslang-data/data/${words[i].audio}`;
    const audio = new Audio(audioSrc);
    audio.play();
  }

  setImage(url) {
    const img = document.querySelector('.card-img');
    img.setAttribute('src', `https://github.com/ana-karp/rslang/blob/rslang-data/data/${url}?raw=true`);
  }

  resetImage() {
    document.querySelector('.card-img').setAttribute('src', defaultImage);
    document.getElementById('translation').style.visibility = 'hidden';
  }

  setActiveCard(element) {
    document.querySelectorAll('.card').forEach((el) => {
      el.classList.remove('card-active');
    });
    element.classList.add('card-active');
  }

  startGame() {
    this.state.isGameActive = true;
    this.resetImage();
    document.querySelectorAll('.card').forEach((el) => {
      el.classList.remove('card-active');
    });
    recognition.start();
    document.getElementById('speak-button').classList.add('card-active');
  }

  checkSpelling(word) {
    const { words } = this.state;
    const id = words.findIndex((el) => el.word.toLowerCase() === word);
    if (id >= 0 && !this.state.learnedWords.includes(word)) {
      document.getElementById('translation').textContent = word;
      this.state.learnedWords.push(word);
      const card = document.getElementById(`${id}`);
      card.classList.add('card-active');
      this.setImage(words[id].image);
      this.addStar();
      if (this.state.learnedWords.length === words.length) {
        this.showResults();
      }
    }
  }

  addStar() {
    const container = document.querySelector('.stars-container');
    const img = document.createElement('img');
    img.setAttribute('src', starImage);
    img.setAttribute('alt', 'star');
    container.appendChild(img);
  }

  recognitionResultHandler(event) {
    const alternatives = event.results[0];
    if (alternatives.isFinal) {
      const translationElement = document.getElementById('translation');
      translationElement.textContent = 'No matches...';
      translationElement.style.visibility = 'visible';
      for (let i = 0; i < alternatives.length; i += 1) {
        const word = alternatives[i].transcript;
        this.checkSpelling(word.toLowerCase());
      }
    }
  }

  showResults() {
    this.modal = createResults(this.state.learnedWords, this.state.words);
    this.component.appendChild(this.modal);
    this.modal.addEventListener('click', (event) => this.modalHandler(event));
  }

  modalHandler(event) {
    if (event.target.id === 'back') {
      this.component.removeChild(this.modal);
    }
    if (event.target.id === 'modal-reset') {
      this.component.removeChild(this.modal);
      this.reset();
    }
    if (event.target.tagName === 'LI') {
      const word = event.target.id;
      const { words } = this.state;
      const i = words.findIndex((el) => el.word === word);
      const audioSrc = `https://raw.githubusercontent.com/ana-karp/rslang/rslang-data/data/${words[i].audio}`;
      const audio = new Audio(audioSrc);
      audio.play();
    }
  }

  reset() {
    this.state.isGameActive = false;
    this.state.learnedWords = [];
    recognition.stop();
    document.querySelectorAll('.card').forEach((el) => {
      el.classList.remove('card-active');
    });
    this.resetImage();
    document.querySelector('.stars-container').innerHTML = '';
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
    document.querySelector('fieldset').addEventListener('click', (event) => this.switchLevels(event));
    this.wordsContainer.addEventListener('click', (event) => this.wordClickHandler(event));
    document.getElementById('speak-button').addEventListener('click', () => this.startGame());
    document.getElementById('results-button').addEventListener('click', () => this.showResults());
    document.getElementById('reset-button').addEventListener('click', () => this.reset());
    recognition.addEventListener('result', (event) => this.recognitionResultHandler(event));

    recognition.addEventListener('end', () => {
      if (this.state.isGameActive) {
        recognition.start();
      }
    });
  }
}

export default SpeakItMain;
