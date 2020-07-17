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

function getLineData(name, color) {
  return {
    name,
    showInLegend: true,
    legendMarkerType: 'square',
    type: 'area',
    color,
    markerSize: 0,
    dataPoints: [],
  };
}

function getDataPoint(date, words) {
  return { x: new Date(date), y: words };
}

function getChartData(statData) {
  const newWordsChartData = getLineData('New words', 'rgba(14, 113, 138, 0.7)');
  const allWordsChartData = getLineData('All words', 'rgba(62, 178, 207, 0.6)');

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

function checkGameStat(gameStat) {
  const [lastDate, res, total] = gameStat;

  if (
    typeof lastDate === 'number'
    && (typeof res === 'number' || typeof res === 'string')
    && (typeof total === 'number' || typeof total === 'string')
  ) {
    return { lastDate, res, total };
  }
  return false;
}

function createGamesStat(root, stat) {
  Object.keys(GAMES_ROUTES).forEach((key) => {
    const gameStat = get(stat, `optional.${GAMES_ROUTES[key]}`);

    if (
      !gameStat
      || !GAMES_NAMES[GAMES_ROUTES[key]]
    ) { return; }

    const checkedData = checkGameStat(gameStat);
    if (!checkedData) { return; }

    // const [lastDate, res, total] = gameStat;
    const date = new Date(checkedData.lastDate);

    root.append(
      createGamesStatLayout(
        GAMES_NAMES[GAMES_ROUTES[key]],
        date.toString().replace(/GMT.*$/g, ''),
        checkedData.res,
        checkedData.total,
      ),
    );
  });
}

export { getChartData, createGamesStat };
