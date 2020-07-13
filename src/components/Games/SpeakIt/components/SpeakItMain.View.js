/* eslint-disable no-undef */
// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// loader
import Loader from 'components/Loader/Loader.View';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// domain models
import Words from 'domainModels/Words/Words';
import Statistics from 'domainModels/Statistics/Statistics';

// layout
import getLayout from './SpeakItMain.Layout';
import createWordCard from './SpeakItCard.Layout';
import createResults from './SpeakItResults.Layout';
import defaultImage from '../images/english.jpg';
import starImage from '../images/star-win.svg';

// lodash
import get from 'lodash.get';

// styles
import './SpeakItMain.scss';

const wordsDomainModel = new Words();
const statisticsDomainModel = new Statistics();
let recognition;

// Speech Recognition Mode
if (/Chrome|Edge/.test(navigator.userAgent)) {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 7;
}

console.log(navigator.userAgent);

class SpeakItMain extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.state = {
      level: 0,
      words: null,
      learnedWords: [],
      isGameActive: false,
    };

    this.shortStatistic = {
      incorrect: [],
      correct: [],
    };

    this.needStatistic = true;
  }

  async prepareData() {
    this.loader = new Loader();
    this.loader.show();

    const page = Math.floor(Math.random() * 30);
    const response = await wordsDomainModel.getChunk(page, this.state.level);
    this.state.words = response.data.slice(0, 10);

    if (this.needStatistic) {
      const { data } = await statisticsDomainModel.getStatistics();
      this.statistic = get(data, `optional.${GAMES_ROUTES.SPEAK_IT}`); // Lodash

      if (!data || !this.statistic) {
        this.statistic = [Date.now(), 0, 0]; // [Date, Results, TotalGame]
      }

      [, , this.statisticTotal] = this.statistic;

      console.log(this.statistic);
      this.needStatistic = !this.needStatistic;
    }

    this.loader.hide();
  }

  createWords() {
    return this.state.words.map((word, i) => createWordCard(word, i));
  }

  createLayout() {
    this.component.className = 'speak-it';
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
      });
    }
    this.reset();
  }

  handleWordClick(event) {
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
    if (this.state.isGameActive) {
      return;
    }
    this.speakButton.classList.add('button-active');
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

  handleRecognitionResult(event) {
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
    this.modal.addEventListener('click', (event) => this.handleModal(event));
  }

  handleModal(event) {
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
    this.speakButton.classList.remove('button-active');
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
    this.wordsContainer.addEventListener('click', (event) => this.handleWordClick(event));

    this.speakButton = document.getElementById('speak-button');
    this.speakButton.addEventListener('click', () => this.startGame());

    document.getElementById('results-button').addEventListener('click', () => this.showResults());
    document.getElementById('reset-button').addEventListener('click', () => this.reset());
    recognition.addEventListener('result', (event) => this.handleRecognitionResult(event));

    recognition.addEventListener('end', () => {
      if (this.state.isGameActive) {
        recognition.start();
      }
    });
  }

  removeListeners() {
    this.statisticFinish();
  }

  statisticFinish() {
    const date = Date.now();
    const res = {
      incorrect: this.shortStatistic.incorrect.length,
      correct: this.shortStatistic.correct.length
    };
    const total = this.statisticTotal + 1;
    const data = [date, res, total];
    statisticsDomainModel.updateStatistics(GAMES_ROUTES.SPEAK_IT, data);
  }
}

export default SpeakItMain;
