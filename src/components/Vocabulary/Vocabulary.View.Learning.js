// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import STATUSES from 'services/requestHandler.Statuses';
import { ROUTERS } from 'router/Router.Constants';
import { VOCABULARY } from '../../domain-models/Words/Words.Constants';

// view
import BaseComponent from '../BaseComponent/BaseComponent';

// domain-models
import Words from '../../domain-models/Words/Words';

// loader
import Loader from '../Loader/Loader.View';

// import Settings from '../../domain-models/Settings/Settings';

// layout
import getPageLayout from './Vocabulary.Layout';

// data
import { pageLayout, constants, filterQuery } from './Vocabulary.Data';

// styles
import './vocabulary.scss';

class VocabularyLearning extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.wordsDomainModel = new Words(0);
    this.categoryWordsAmount = 0;
    this.todayWordsAmount = 0;
    this.words = null;
    this.vocabularyType = VOCABULARY.RESTORED;

    this.handleWordButtons = this.handleWordButtons.bind(this);

    this.loader = new Loader();
    this.loader.show();
  }

  createLayout() {
    this.component.className = pageLayout.container.className;
    [
      this.info,
      this.nav,
      [
        this.wordsContainer,
        this.words,
      ],
      this.pagination,
    ] = getPageLayout({
      allWordsNum: this.categoryWordsAmount,
      todayWordsNum: this.todayWordsAmount,
      words: this.words,
    });

    this.component.append(
      this.nav,
      this.info,
      this.wordsContainer,
      this.pagination,
    );

    this.loader.hide();
  }

  async prepareData() {
    const filter = JSON.stringify(filterQuery[this.vocabularyType]);
    console.group('vocabulary: ', this.vocabularyType);

    const wordsData = await this.wordsDomainModel.getAggregatedWords({
      group: constants.group,
      wordsPerPage: constants.wordsPerPage,
      filter,
    });

    if (
      STATUSES.isSuccess(wordsData.status)
      && wordsData.data[0].totalCount[0]
      && wordsData.data[0].totalCount[0].count
    ) {
      this.categoryWordsAmount = wordsData.data[0].totalCount[0].count;
      this.words = [];
      console.log(wordsData.data[0].paginatedResults);
      wordsData.data[0].paginatedResults.forEach((element) => {
        const resultElement = {
          // eslint-disable-next-line no-underscore-dangle
          id: element._id,
          image: this.wordsDomainModel.getFileLink(element.image),
          wordText: element.word,
          audio: element.audio,
          wordTranslate: element.wordTranslate,
          wordTranscription: element.transcription,
          textExample: element.textExample,
          textExampleTranslate: element.textExampleTranslate,
          textMeaning: element.textMeaning,
          textMeaningTranslate: element.textMeaningTranslate,
          date: this.getDate(element.userWord.optional.DATE),
          amount: element.userWord.optional.AMOUNT,
          repeatDate: this.getDate(element.userWord.optional.REPEAT.DATE),
        };

        this.words.push(resultElement);
      });
    } else {
      this.categoryWordsAmount = 0;
      this.words = null;
    }
    console.log(wordsData);
  }

  playAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = src;
    audio.play();
  }

  getDate(timestamp, lang = 'en') {
    return (new Date(timestamp))
      .toLocaleString(lang, {
        weekday: 'short', month: 'long', day: 'numeric',
      });
  }

  addListeners() {
    this.component.addEventListener('click', this.handleSwitchTab);

    this.component.addEventListener('click', this.handleWordButtons);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleSwitchTab);

    this.component.removeEventListener('click', this.handleWordButtons);

    console.groupEnd('vocabulary: ', this.vocabularyType);
  }

  handleSwitchTab(event) {
    onRouteChangeEvent(event, ROUTERS.VOCABULARY);
  }

  handleWordButtons(event) {
    const { target } = event;
    if (target.dataset && target.dataset.audio) {
      const src = this
        .wordsDomainModel
        .getFileLink(target.dataset.audio.replace(/['"]+/g, ''));
      this.playAudio(src);
    }

    if (target.classList.contains(pageLayout.remove.className)) {
      this.handleRemove(target.dataset.id);
    }
  }

  handleRemove(wordId) {
    const removeType = this.vocabularyType !== VOCABULARY.RESTORED
      ? VOCABULARY.RESTORED
      : VOCABULARY.REMOVED;
    this.loader.show();
    this
      .wordsDomainModel
      .updateUserWord(wordId, null, removeType)
      .then((res) => {
        if (STATUSES.isSuccess(res.status)) {
          console.log(res);
          this.hideWord(wordId);
        }
        this.loader.hide();
      });
  }

  hideWord(id) {
    const wordItem = document.getElementById(id);
    wordItem.classList.add(pageLayout.hidden);
    this.wordsContainer.removeChild(wordItem);
  }
}

export default VocabularyLearning;
