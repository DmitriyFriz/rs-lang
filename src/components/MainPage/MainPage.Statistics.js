// lodash
import get from 'lodash.get';

import { MAIN_PAGE_ROUTES } from '../../router/Router.Constants';

import StatisticsDomain from '../../domain-models/Statistics/Statistics';

import { STATISTICS } from './MainPage.Constants';

const nameStat = MAIN_PAGE_ROUTES.LEARNING_WORDS;

const MODE = {
  DEFAULT: 'DEFAULT',
  RANDOM: 'RANDOM',
  NO_STAT: 'NO_STAT',
};

// ================================ session statistics ================================

const sessionStatistics = {
  mode: MODE.DEFAULT,

  initSession() {
    this[STATISTICS.NEW_WORDS] = 0;
    this[STATISTICS.ALL_WORDS] = 0;
    this[STATISTICS.SUCCESS_SERIES] = 0;
    this.series = 0;
    this.fails = 0;
    this.success = 0;
  },

  get [STATISTICS.SUCCESS_RATE]() {
    const rate = 100 - Math.floor((this.fails / (this.fails + this.success)) * 100);
    return rate || 0;
  },

  addSuccess(isRepeated) {
    if (isRepeated) { return this; }
    console.log('ADD SUCCESS');
    this.success += 1;
    this.series += 1;
    this.addWord();
    return this;
  },

  addFail(isRepeated) {
    if (isRepeated) { return this; }
    console.log('ADD FAIL');
    this.fails += 1;
    if (this[STATISTICS.SUCCESS_SERIES] < this.series) {
      this[STATISTICS.SUCCESS_SERIES] = this.series;
    }
    this.series = 0;
    this.addWord();
    return this;
  },

  addNewWord(isNewWord, isRepeated) {
    if (!isNewWord || isRepeated) { return this; }
    console.log('ADD NEW WORD');
    this[STATISTICS.NEW_WORDS] += 1;
    return this;
  },

  addWord() {
    this[STATISTICS.ALL_WORDS] += 1;
    return this;
  },
};

// ================================ long statistics ================================

const statistics = {
  async prepareData() {
    this.statisticsDomain = new StatisticsDomain();
    await this.getRemoteStat();
    this.handleLastStat();

    console.log('CURRENT STATISTICS:',
      'LAST GAME === ', new Date(this[STATISTICS.LAST_GAME_DATE]),
      'ALL WORDS === ', this[STATISTICS.ALL_WORDS],
      'NEW WORDS === ', this[STATISTICS.NEW_WORDS],
      'TRAINING === ', this[STATISTICS.TRAINING_NUMBER],
      'PLAN === ', this.plan);
  },

  handleLastStat() {
    const lastStat = this.longTermStat[this.longTermStat.length - 1];

    [
      this[STATISTICS.LAST_GAME_DATE] = 0,
      this[STATISTICS.ALL_WORDS] = 0,
      this[STATISTICS.NEW_WORDS] = 0,
      this[STATISTICS.TRAINING_NUMBER] = 0,
      this.plan = 1,
    ] = lastStat;

    console.log('LAST GAME ===', this[STATISTICS.LAST_GAME_DATE]);

    if (this.isNewDay) {
      this.reset();
    }
  },

  addNewTrainingToPlan() {
    this.plan += 1;
  },

  addCompletedTrainingToStat() {
    this[STATISTICS.TRAINING_NUMBER] += 1;
  },

  updateStat(all, newWord) {
    this[STATISTICS.LAST_GAME_DATE] = Date.now();
    this[STATISTICS.ALL_WORDS] += all;
    this[STATISTICS.NEW_WORDS] += newWord;
  },

  reset() {
    this[STATISTICS.ALL_WORDS] = 0;
    this[STATISTICS.NEW_WORDS] = 0;
    this[STATISTICS.TRAINING_NUMBER] = 0;
    this.plan = 1;
  },

  get dailyPlanCompleted() {
    return this[STATISTICS.TRAINING_NUMBER] >= this.plan;
  },

  get isNewDay() {
    if (!this[STATISTICS.LAST_GAME_DATE]) {
      return false;
    }

    const REAL_TIME = new Date();
    const LAST_GAME_TIME = new Date(this[STATISTICS.LAST_GAME_DATE]);
    console.log('isNewDay', REAL_TIME.getDate(), ' > ', LAST_GAME_TIME.getDate(), REAL_TIME.getDate() > LAST_GAME_TIME.getDate());
    return REAL_TIME.getDate() > LAST_GAME_TIME.getDate();
  },

  async getRemoteStat() {
    const { data } = await this.statisticsDomain.getStatistics();
    this.longTermStat = get(data, `optional.${nameStat}`);

    if (!this.longTermStat) {
      this.longTermStat = [[]];
    }
  },

  async saveToRemoteStat() {
    if (this.isNewDay) { this.reset(); }
    this.updateStat(
      sessionStatistics[STATISTICS.ALL_WORDS],
      sessionStatistics[STATISTICS.NEW_WORDS],
    );
    sessionStatistics[STATISTICS.TRAINING_NUMBER] = this[STATISTICS.TRAINING_NUMBER];
    const preparedStat = [
      this[STATISTICS.LAST_GAME_DATE],
      this[STATISTICS.ALL_WORDS],
      this[STATISTICS.NEW_WORDS],
      this[STATISTICS.TRAINING_NUMBER],
      this.plan,
    ];
    if (this.isNewDay) {
      this.longTermStat.push(preparedStat);
    } else {
      this.longTermStat.pop();
      this.longTermStat.push(preparedStat);
    }

    this.updateRemoteStat();
  },

  async updateRemoteStat() {
    console.log('LONG TERM STAT ====', this.longTermStat);
    await this.statisticsDomain.updateStatistics(nameStat, this.longTermStat);
  },
};

export { statistics, sessionStatistics, MODE };
