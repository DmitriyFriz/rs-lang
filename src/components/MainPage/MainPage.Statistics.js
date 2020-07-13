// lodash
import get from 'lodash.get';

import { MAIN_PAGE_ROUTES } from '../../router/Router.Constants';

import StatisticsDomain from '../../domain-models/Statistics/Statistics';

const nameStat = MAIN_PAGE_ROUTES.LEARNING_WORDS;

const MODE = {
  DEFAULT: 'DEFAULT',
  RANDOM: 'RANDOM',
};

// ================================ session statistics ================================

const sessionStatistics = {
  mode: MODE.DEFAULT,

  initSession() {
    this.newWords = 0;
    this.allWords = 0;
    this.successSeries = 0;
    this.fails = 0;
    this.success = 0;
  },

  get successRate() {
    const rate = 100 - Math.floor((this.fails / (this.fails + this.success)) * 100);
    return rate || 0;
  },

  addSuccess(isRepeated) {
    if (isRepeated) { return this; }
    console.log('ADD SUCCESS');
    this.successSeries += 1;
    this.success += 1;
    this.addWord();
    return this;
  },

  addFail(isRepeated) {
    if (isRepeated) { return this; }
    console.log('ADD FAIL');
    this.fails += 1;
    this.successSeries = 0;
    this.addWord();
    return this;
  },

  addNewWord(isNewWord, isRepeated) {
    if (!isNewWord || isRepeated) { return this; }
    console.log('ADD NEW WORD');
    this.newWords += 1;
    return this;
  },

  addWord() {
    this.allWords += 1;
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
      'LAST GAME === ', new Date(this.lastGameDate),
      'ALL WORDS === ', this.allWords,
      'NEW WORDS === ', this.newWords,
      'TRAINING === ', this.trainingNumber,
      'PLAN === ', this.plan);
  },

  handleLastStat() {
    const lastStat = this.longTermStat[this.longTermStat.length - 1];

    [
      this.lastGameDate = 0,
      this.allWords = 0,
      this.newWords = 0,
      this.trainingNumber = 0,
      this.plan = 1,
    ] = lastStat;

    console.log('LAST GAME ===', this.lastGameDate);

    if (this.isNewDay) {
      this.reset();
    }
  },

  addNewTrainingToPlan() {
    this.plan += 1;
  },

  addCompletedTrainingToStat() {
    this.trainingNumber += 1;
  },

  updateStat(all, newWord) {
    this.gameDate = Date.now();
    this.allWords += all;
    this.newWords += newWord;
  },

  reset() {
    this.allWords = 0;
    this.newWords = 0;
    this.trainingNumber = 0;
    this.plan = 1;
  },

  get dailyPlanCompleted() {
    return this.trainingNumber >= this.plan;
  },

  get isNewDay() {
    if (!this.lastGameDate) {
      return false;
    }

    const REAL_TIME = new Date();
    const LAST_GAME_TIME = new Date(this.lastGameDate);
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
    if (this.isNewDay) {
      this.reset();
    }
    this.updateStat(sessionStatistics.allWords, sessionStatistics.newWords);
    const preparedStat = [
      this.gameDate,
      this.allWords,
      this.newWords,
      this.trainingNumber,
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
