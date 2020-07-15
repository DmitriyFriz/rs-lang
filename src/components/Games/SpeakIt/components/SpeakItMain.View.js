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

// short statistic
import get from 'lodash.get';
import ShortStatistic from '../../ShortStatistic/ShortStatistic.View';

// layout
import getLayout from './SpeakItMain.Layout';
import createWordCard from './SpeakItCard.Layout';
import defaultImage from '../images/english.jpg';
import starImage from '../images/star-win.svg';
import getModal from './SpeakItModal.Layout';

// lodash

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

class SpeakItMain extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.state = {
      level: 0,
      words: null,
      learnedWords: [],
      notLearnedWords: [],
      isGameActive: false,
    };

    this.longStatistic = {
      incorrect: [],
      correct: [],
    };

    this.statisticOption = {
      incorrectName: 'Not learned',
      isIncorrect: true,
      correctName: 'Learned',
      isCorrect: true,
    };

    this.needStatistic = true;

    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  async prepareData() {
    this.loader = new Loader();
    this.loader.show();

    const page = Math.floor(Math.random() * 30);
    const response = await wordsDomainModel.getChunk(page, this.state.level);
    this.shuffleWords(response);
    this.state.words = response.data.slice(0, 10);

    if (this.needStatistic) {
      const { data } = await statisticsDomainModel.getStatistics();
      this.statistic = get(data, `optional.${GAMES_ROUTES.SPEAK_IT}`); // Lodash

      if (!data || !this.statistic) {
        this.statistic = [Date.now(), 0, 0]; // [Date, Results, TotalGame]
      }

      [, , this.statisticTotal] = this.statistic;

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

    [
      this.resultSection,
      this.statisticContainer,
      this.closeButton,
    ] = getModal();

    this.component.append(this.resultSection);

    this.statisticList = new ShortStatistic(
      this.statisticContainer,
      this.longStatistic,
      this.statisticOption,
    );
    this.statisticList.show();
  }

  switchLevels(event) {
    if (event.target.tagName === 'INPUT') {
      this.state.level = event.target.value;
      this.getNewWords();
    }
  }

  getNewWords() {
    this.setIncorrectWords();
    this.prepareData().then(() => {
      this.wordsContainer.innerHTML = '';
      this.wordsContainer.append(...this.createWords());
    });
    this.reset();
  }

  shuffleWords(words) {
    const array = words;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (array.length));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  setIncorrectWords() {
    this.setNotLearnedWords();

    const incorrectWords = this.state.notLearnedWords.reduce((arr, word) => {
      if (!this.longStatistic.incorrect.includes(word)) {
        arr.push(word);
        return arr;
      }
      return arr;
    }, []);

    this.longStatistic.incorrect.push(...incorrectWords);
  }

  handleWordClick(event) {
    const card = event.target.closest('.card');
    if (!card) return;
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
    this.speakButton.classList.add('speak-it__button_active');
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
    if (id >= 0 && !this.state.learnedWords.includes(words[id])) {
      document.getElementById('translation').textContent = word;
      this.state.learnedWords.push(words[id]);
      const card = document.getElementById(`${id}`);
      card.classList.add('card-active');
      this.setImage(words[id].image);
      this.addStar();
      if (!this.longStatistic.correct.includes(words[id])) {
        this.longStatistic.correct.push(words[id]);
      }
      if (this.state.learnedWords.length === words.length) {
        this.showResults();
        this.getNewWords();
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

  showStatistic() {
    this.statisticList.reShow(this.longStatistic);
    this.resultSection.classList.add('display-flex');
  }

  showResults() {
    this.setNotLearnedWords();

    const statistic = {
      incorrect: this.state.notLearnedWords,
      correct: this.state.learnedWords,
    };

    this.statisticList.reShow(statistic);
    this.resultSection.classList.add('display-flex');
  }

  setNotLearnedWords() {
    this.state.notLearnedWords = this.state.words.reduce((arr, word) => {
      if (!this.state.learnedWords.includes(word)) {
        arr.push(word);
        return arr;
      }
      return arr;
    }, []);
  }

  reset() {
    this.speakButton.classList.remove('speak-it__button_active');
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
    document.getElementById('next-button').addEventListener('click', () => this.getNewWords());
    document.getElementById('statistic-button').addEventListener('click', () => this.showStatistic());

    recognition.addEventListener('result', (event) => this.handleRecognitionResult(event));

    recognition.addEventListener('end', () => {
      if (this.state.isGameActive) {
        recognition.start();
      }
    });

    this.closeButton.addEventListener('click', this.handleCloseButton);
  }

  removeListeners() {
    this.statisticFinish();
  }

  handleCloseButton() {
    this.resultSection.classList.remove('display-flex');
  }

  statisticFinish() {
    const date = Date.now();
    const res = {
      incorrect: this.longStatistic.incorrect.length,
      correct: this.longStatistic.correct.length,
    };
    const total = this.statisticTotal + 1;
    const data = [date, res, total];
    statisticsDomainModel.updateStatistics(GAMES_ROUTES.SPEAK_IT, data);
  }
}

export default SpeakItMain;
