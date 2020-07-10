import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';

import StatisticsDomain from '../../../domain-models/Statistics/Statistics';
import STATUSES from '../../../services/requestHandler.Statuses';

const statisticsDomain = new StatisticsDomain();

async function getStatistics() {
  const { data, status } = await statisticsDomain.getStatistics();

  if (
    status === STATUSES.NOT_FOUND
    || !data.optional[MAIN_PAGE_ROUTES.LEARNING_WORDS]
  ) {
    return [[]];
  }

  const statistics = data.optional[MAIN_PAGE_ROUTES.LEARNING_WORDS];
  return statistics;
}

async function updateStatistics(statistics) {
  console.log('LONG TERM STAT ====', statistics);
  await statisticsDomain
    .updateStatistics(MAIN_PAGE_ROUTES.LEARNING_WORDS, statistics);
}

const sessionStatistics = {
  newWords: 0,
  allWords: 0,
  successSeries: 0,
  fails: 0,
  success: 0,

  rate() {
    const rate = 100 - Math.floor((this.fails / (this.fails + this.success)) * 100);
    return rate || 0;
  },

  addSuccess(isNewWord, isRepeated) {
    if (isRepeated) {
      return this;
    }
    console.log('ADD SUCCESS');
    this.successSeries += 1;
    this.success += 1;
    this.addWord();

    if (isNewWord) {
      console.log('ADD NEW WORD');
      this.addNewWord();
    }

    return this;
  },

  addFail(isNewWord, isRepeated) {
    if (isRepeated) {
      return this;
    }
    console.log('ADD FAIL');
    this.fails += 1;
    this.successSeries = 0;
    this.addWord();

    if (isNewWord) {
      console.log('ADD NEW WORD');
      this.addNewWord();
    }
    return this;
  },

  addNewWord() {
    this.newWords += 1;
    return this;
  },

  addWord() {
    this.allWords += 1;
    return this;
  },

  reset() {
    Object.keys(this).forEach((key) => {
      if (typeof this[key] !== 'function') {
        this[key] = 0;
      }
    });
    return this;
  },
};

export { sessionStatistics, getStatistics, updateStatistics };
