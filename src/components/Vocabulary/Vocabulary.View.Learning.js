// constants
import STATUSES from 'services/requestHandler.Statuses';
import { VOCABULARY } from '../../domain-models/Words/Words.Constants';

// view
import BaseComponent from '../BaseComponent/BaseComponent';

// domain-models
import Words from '../../domain-models/Words/Words';

// loader
import Loader from '../Loader/Loader.View';

// import Settings from '../../domain-models/Settings/Settings';

// layout
import {
  getLayout,
  getWordsListLayout,
  getPaginationLayout,
  getVocabularyInfoLayout,
} from './Vocabulary.Layout';

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
    this.handlePaginationButtons = this.handlePaginationButtons.bind(this);
    this.handleGroups = this.handleGroups.bind(this);

    this.loader = new Loader();
    this.loader.show();

    this.page = 0;
    this.group = constants.groupZero;

    this.groupsLayout = null;
    this.infoLayout = null;
    this.wordsContainerLayout = null;
    this.wordLayouts = null;
    this.paginationLayout = null;
  }

  createLayout() {
    this.component.className = `${pageLayout.inner.className} ${this.vocabularyType.toLowerCase()}`;
    [
      this.groupsLayout,
      this.infoLayout,
      [
        this.wordsContainerLayout,
        this.wordLayouts,
      ],
      this.paginationLayout,
    ] = getLayout({
      activeGroup: this.group,
      allWordsNum: this.categoryWordsAmount,
      todayWordsNum: this.todayWordsAmount,
      words: this.wordsOnPage,
      layoutType: this.vocabularyType,
      hasNextNav: this.hasNextPage(),
      hasPrevNav: this.hasPrevPage(),
    });

    this.component.append(
      this.groupsLayout,
      this.infoLayout,
      this.wordsContainerLayout,
      this.paginationLayout,
    );

    this.loader.hide();
  }

  async prepareData() {
    const filter = JSON.stringify(filterQuery[this.vocabularyType]);
    console.group('vocabulary: ', this.vocabularyType);

    const wordsData = await this.wordsDomainModel.getAggregatedWords({
      group: this.group,
      wordsPerPage: constants.wordsPerGroupe,
      filter,
    });

    if (
      STATUSES.isSuccess(wordsData.status)
      && wordsData.data[0].totalCount[0]
      && wordsData.data[0].totalCount[0].count
    ) {
      this.categoryWordsAmount = wordsData.data[0].totalCount[0].count;
      this.words = [];
      console.log(wordsData.data[0]);
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

      this.prepareWordsPerPage();
    } else {
      this.categoryWordsAmount = 0;
      this.words = null;
    }
  }

  prepareWordsPerPage() {
    if (this.words) {
      const offsetStart = this.page * constants.wordsPerPage;
      const offsetLimit = offsetStart + constants.wordsPerPage;
      this.wordsOnPage = this.words.slice(offsetStart, offsetLimit);
    } else {
      this.wordsOnPage = null;
    }
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
    this.component.addEventListener('click', this.handleWordButtons);

    this.component.addEventListener('click', this.handlePaginationButtons);

    this.component.addEventListener('change', this.handleGroups);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleWordButtons);

    this.component.removeEventListener('click', this.handlePaginationButtons);

    this.component.removeEventListener('change', this.handleGroups);

    console.groupEnd('vocabulary: ', this.vocabularyType);
  }

  handleWordButtons(event) {
    const { target } = event;
    if (target.dataset && target.dataset.audio) {
      const src = this
        .wordsDomainModel
        .getFileLink(target.dataset.audio.replace(/['"]+/g, ''));
      this.playAudio(src);
    }

    if (target.dataset && target.dataset.remove) {
      this.handleRemove(target.dataset.id);
    }

    if (target.dataset && target.dataset.difficult) {
      this.handleRemove(target.dataset.id, VOCABULARY.DIFFICULT);
    }
  }

  async handleRemove(wordId, type = null) {
    const removeType = type || (this.vocabularyType !== VOCABULARY.RESTORED
      ? VOCABULARY.RESTORED
      : VOCABULARY.REMOVED);

    this.loader.show();

    await this
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

  handlePaginationButtons(event) {
    const { target } = event;

    if (target.classList.contains('vocabulary__prev') && this.hasPrevPage()) {
      this.page -= 1;
      this.updatePage();
    }

    if (
      target.classList.contains('vocabulary__next')
      && this.hasNextPage()) {
      this.page += 1;
      this.updatePage();
    }
  }

  updatePage() {
    this.prepareWordsPerPage();
    const [list, wordLayouts] = getWordsListLayout(this.wordsOnPage, this.vocabularyType);
    this.wordLayouts = wordLayouts;
    this.wordsContainerLayout.replaceWith(list);
    this.wordsContainerLayout = list;

    const pagination = getPaginationLayout(this.hasPrevPage(), this.hasNextPage());
    this.paginationLayout.replaceWith(pagination);
    this.paginationLayout = pagination;

    const info = getVocabularyInfoLayout(this.categoryWordsAmount, this.todayWordsAmount);
    this.infoLayout.replaceWith(info);
    this.infoLayout = info;
  }

  async handleGroups(event) {
    if (event.target.name === 'groups') {
      this.group = event.target.value;
      this.page = 0;
      this.loader.show();

      await this.prepareData();
      this.updatePage();
      this.loader.hide();
    }
  }

  hasPrevPage() {
    return this.page > 0;
  }

  hasNextPage() {
    return this.page < (Math.ceil(this.categoryWordsAmount / constants.wordsPerPage) - 1);
  }

  hideWord(id) {
    const wordItem = document.getElementById(id);
    wordItem.classList.add(pageLayout.hidden);
    this.words = this.words.filter((item) => item.id !== id);
    this.categoryWordsAmount -= 1;
    this.updatePage();
  }
}

export default VocabularyLearning;
