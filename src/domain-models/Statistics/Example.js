/* eslint-disable no-console */
import Statistics from './Statistics';

const statisticsDomainModel = new Statistics();

/*
  if you use an authorized user method and the user is not authorized,
  the method return:

 {
  status: 401,
  statusText: 'Unauthorized',
 };
*/

// ============ updateStatistics() - get statistics of authorized user =========

const data = {
  learnedWords: 30,
  optional: {
    learnedWordsToday: 12,
    deletedWords: 3,
    completedTaskToday: 1,
  },
};

statisticsDomainModel.updateStatistics(data).then((res) => console.log(res));

/*
  console log:
 {
  data:{
    id: "5eefb858b089455bd925c680",
    learnedWords: 30,
    optional: {
      completedTaskToday: 1,
      deletedWords: 3,
      learnedWordsToday: 12,
    },
  }
 },
  status: 200,
  statusText: "OK",
  }
*/

// ============ getStatistics() - get statistics of authorized user =========

statisticsDomainModel.getStatistics().then((res) => console.log(res));

/*
  console log:
 {
  data:{
    id: "5eefb858b089455bd925c680",
    learnedWords: 30,
    optional: {
      completedTaskToday: 1,
      deletedWords: 3,
      learnedWordsToday: 12,
    },
  }
 },
  status: 200,
  statusText: "OK",
  }
*/
