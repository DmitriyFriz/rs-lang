import STATUSES from 'services/requestHandler.Statuses';
import BaseComponent from '../BaseComponent/BaseComponent';
import Words from '../../domain-models/Words/Words';
import getPageLayout from './Vocabulary.Layout';
import { pageLayout, constants, filterQuery } from './Vocabulary.Data';

import './vocabulary.scss';

class Vocabulary extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);
    this.wordsDomainModel = new Words(0);
    this.categoryWordsAmount = 0;
    this.todayWordsAmount = 0;
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
    const filter = JSON.stringify(filterQuery.learned);

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
    audio.src = this.wordsDomainModel.getFileLink(src.replace(/['"]+/g, ''));
    audio.play();
  }

  addListeners() {
    if (this.categoryWordsAmount) {
      this.words.forEach((element) => element.addEventListener('click', (event) => {
        if (event.target.dataset && event.target.dataset.audio) {
          this.playAudio(event.target.dataset.audio);
        }
      }));
    }
  }
}

export default Vocabulary;
