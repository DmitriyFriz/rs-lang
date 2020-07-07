/* eslint-disable no-console */
import Settings from './Settings';

const settingsDomainModel = new Settings();

/*
  if you use an authorized user method and the user is not authorized,
  the method return:

 {
  status: 401,
  statusText: 'Unauthorized',
 };
*/

// ============ updateSettings() - get settings of authorized user =========

const data = {
  displayExample: true,
  displayImg: false,
};

settingsDomainModel.updateSettings('mySettings', data).then((res) => console.log(res));

/*
  console log:
 {
  data:{
    id: "5eefb858b089455bd925c680",
    optional: {
      mySettings: {
        displayExample: true,
        displayImg: false
      }
    },
    wordsPerDay: 50,
  }
 },
  status: 200,
  statusText: "OK",
  }
*/

// ============ getSettings() - get settings of authorized user =========

settingsDomainModel.getSettings().then((res) => console.log(res));

/*
 console log:
 {
  data:{
    id: "5eefb858b089455bd925c680",
    optional: {
      mySettings: {
        displayExample: true,
        displayImg: false
      }
    },
    wordsPerDay: 50,
  }
 },
  status: 200,
  statusText: "OK",
  }
*/
