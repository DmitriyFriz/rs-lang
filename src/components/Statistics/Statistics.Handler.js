// Lodash
import get from 'lodash.get';

import { GAMES_ROUTES } from 'router/Router.Constants';
import { getGamesStatLayout } from './Statistics.Layout';

const GAMES_NAMES = {
  [GAMES_ROUTES.SPEAK_IT]: 'Speak It',
  [GAMES_ROUTES.ENGLISH_PUZZLE]: 'English Puzzle',
  [GAMES_ROUTES.SAVANNAH]: 'Savannah',
  [GAMES_ROUTES.SPRINT]: 'Sprint',
};

function getLineData(name) {
  return {
    type: 'line',
    name,
    showInLegend: true,
    markerSize: 0,
    yValueFormatString: '',
    dataPoints: [],
  };
}

function getDataPoint(date, words) {
  return { x: new Date(date), y: words };
}

function getChartData(statData) {
  const newWordsChartData = getLineData('New words');
  const allWordsChartData = getLineData('All words');

  statData.forEach((stat) => {
    const [lastGameDate, allWords, newWords] = stat;
    newWordsChartData.dataPoints.push(
      getDataPoint(lastGameDate, newWords),
    );
    allWordsChartData.dataPoints.push(
      getDataPoint(lastGameDate, allWords),
    );
  });

  return [newWordsChartData, allWordsChartData];
}

function createGamesStatLayout(name, date, res, total) {
  const layout = document.createElement('div');
  layout.className = 'game-stat';
  layout.innerHTML = getGamesStatLayout(name, date, res, total);
  return layout;
}

function createGamesStat(root, stat) {
  Object.keys(GAMES_ROUTES).forEach((key) => {
    const gameStat = get(stat, `optional.${GAMES_ROUTES[key]}`);
    if (!gameStat) { return; }
    const [lastDate, res, total] = gameStat;
    const date = new Date(lastDate);
    root.append(
      createGamesStatLayout(GAMES_NAMES[GAMES_ROUTES[key]], date.toString().replace(/GMT.*$/g, ''), res, total),
    );
  });
}

export { getChartData, createGamesStat };
