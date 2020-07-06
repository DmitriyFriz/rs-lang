// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import STATUSES from 'services/requestHandler.Statuses';
import { ROUTERS } from 'router/Router.Constants';

// view
import BaseComponent from '../BaseComponent/BaseComponent';

// domain-models
import Words from '../../domain-models/Words/Words';

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
    this.pageType = constants.pageType.learning;
    this.handleWordButtons = this.handleWordButtons.bind(this);
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
      this.info,
      this.nav,
      this.wordsContainer,
      this.pagination,
    );
  }

  async prepareData() {
    const filter = JSON.stringify(filterQuery[this.pageType]);
    console.group('vocabulary: ', this.pageType);
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

      this.words = wordsData.data[0].paginatedResults;
      this.words.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.image = this.wordsDomainModel.getFileLink(element.image);
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

  addListeners() {
    this.component.addEventListener('click', this.handleSwitchTab);

    this.component.addEventListener('click', this.handleWordButtons);
  }

  removeListeners() {
    this.component.removeEventListener('click', this.handleSwitchTab);

    this.component.removeEventListener('click', this.handleWordButtons);

    console.groupEnd('vocabulary: ', this.pageType);
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
    this
      .wordsDomainModel
      .updateUserWord(wordId, null, constants.pageType.difficult)
      .then((res) => {
        if (STATUSES.isSuccess(res.status)) {
          console.log(res);
          this.hideWord(wordId);
        }
      });
  }

  hideWord(id) {
    const wordItem = document.getElementById(id);
    wordItem.classList.add(pageLayout.hidden);
    this.wordsContainer.removeChild(wordItem);
  }
}

export default VocabularyLearning;
