// lodash
import get from 'lodash.get';

import { MAIN_PAGE_ROUTES } from '../../../router/Router.Constants';

import StatisticsDomain from '../../../domain-models/Statistics/Statistics';

const statisticsDomain = new StatisticsDomain();
const nameStat = MAIN_PAGE_ROUTES.LEARNING_WORDS;

class LearningWordsStatistics {
  async prepareData() {
    await this.getRemoteStat();
    this.handleLastStat();

    console.log('CURRENT STATISTICS:',
      'LAST GAME === ', new Date(this.lastGameDate),
      'WORDS === ', this.todayStat.words,
      'TRAINING === ', this.todayStat.trainingNumber,
      'PLAN === ', this.todayStat.plan);
  }

  handleLastStat() {
    const lastStat = this.longTermStat[this.longTermStat.length - 1];
    const [lastGameDate, words, trainingNumber, plan] = lastStat;
    this.lastGameDate = lastGameDate;

    this.todayStat = {
      words,
      trainingNumber,
      plan,

      addNewTrainingToPlan() {
        this.plan += 1;
      },

      addCompletedTrainingToStat() {
        this.trainingNumber += 1;
      },

      updateStat(newWords) {
        this.gameDate = Date.now();
        this.words += newWords;
      },

      reset() {
        this.words = 0;
        this.trainingNumber = 0;
        this.plan = 1;
      },

      get dailyPlanCompleted() {
        return this.trainingNumber >= this.plan;
      },
    };

    console.log('LAST GAME ===', this.lastGameDate);

    if (this.isNewDay) {
      this.todayStat.reset();
    }
  }

  get isNewDay() {
    if (!this.lastGameDate) {
      return false;
    }

    const REAL_TIME = new Date();
    const LAST_GAME_TIME = new Date(this.lastGameDate);
    console.log('isNewDay', REAL_TIME.getDate(), ' > ', LAST_GAME_TIME.getDate(), REAL_TIME.getDate() > LAST_GAME_TIME.getDate());
    return REAL_TIME.getDate() > LAST_GAME_TIME.getDate();
  }

  async getRemoteStat() {
    const { data } = await statisticsDomain.getStatistics();
    let statistics = get(data, `optional.${nameStat}`);

    if (!statistics) {
      statistics = [[]];
    }

    this.longTermStat = statistics;
  }

  async saveToRemoteStat() {
    this.todayStat.updateStat(this.newWords);
    const statistics = [
      this.todayStat.gameDate,
      this.todayStat.words,
      this.todayStat.trainingNumber,
      this.todayStat.plan,
    ];

    if (this.isNewDay) {
      this.longTermStat.push(statistics);
    } else {
      this.longTermStat.pop();
      this.longTermStat.push(statistics);
    }

    this.updateRemoteStat();
  }

  async updateRemoteStat() {
    console.log('LONG TERM STAT ====', this.longTermStat);
    await statisticsDomain.updateStatistics(nameStat, this.longTermStat);
  }

  // ================================= session statistics ==============================

  initSession() {
    this.newWords = 0;
    this.allWords = 0;
    this.successSeries = 0;
    this.fails = 0;
    this.success = 0;
  }

  get successRate() {
    const rate = 100 - Math.floor((this.fails / (this.fails + this.success)) * 100);
    return rate || 0;
  }

  addSuccess(isRepeated) {
    if (isRepeated) { return this; }
    console.log('ADD SUCCESS');
    this.successSeries += 1;
    this.success += 1;
    this.addWord();
    return this;
  }

  addFail(isRepeated) {
    if (isRepeated) { return this; }
    console.log('ADD FAIL');
    this.fails += 1;
    this.successSeries = 0;
    this.addWord();
    return this;
  }

  addNewWord(isNewWord, isRepeated) {
    if (!isNewWord || isRepeated) { return this; }
    console.log('ADD NEW WORD');
    this.newWords += 1;
    return this;
  }

  addWord() {
    this.allWords += 1;
    return this;
  }
}

export default LearningWordsStatistics;
