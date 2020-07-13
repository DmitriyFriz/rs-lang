// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

export default function getStatistic(statistic, listOption) {
  const statisticList = createElement({ tag: 'div', className: 'short-statistic' });
  const statisticContainer = createElement({ tag: 'div', className: 'short-statistic__container' });

  if (listOption.isIncorrect) {
    const incorrectResult = createElement({ tag: 'div', className: 'short-statistic__result' });
    const incorrectName = createElement({ tag: 'p', content: `${listOption.incorrectName}` });
    const incorrectTotal = createElement({
      tag: 'p',
      className: 'short-statistic__result_incorrect',
      content: `${statistic.incorrect.length}`,
    });
    incorrectResult.append(incorrectName, incorrectTotal);

    const incorrectList = createElement({ tag: 'ul', className: 'short-statistic__list short-statistic__list_first' });
    const incorrectElements = statistic.incorrect.map((element) => {
      const textContent = `${element.word} ${element.transcription} - ${element.wordTranslate}`;
      return createElement({
        tag: 'li',
        className: 'short-statistic__word',
        content: textContent,
        dataset: {
          audio: element.audio,
        },
      });
    });
    incorrectList.append(...incorrectElements);

    statisticContainer.append(incorrectResult, incorrectList);
  }

  if (listOption.isCorrect) {
    const correctResult = createElement({ tag: 'div', className: 'short-statistic__result' });
    const correctName = createElement({ tag: 'p', content: `${listOption.correctName}` });
    const correctTotal = createElement({
      tag: 'p',
      className: 'short-statistic__result_correct',
      content: `${statistic.correct.length}`,
    });
    correctResult.append(correctName, correctTotal);

    const correctList = createElement({ tag: 'ul', className: 'short-statistic__list' });
    const correctElements = statistic.correct.map((element) => {
      const textContent = `${element.word} ${element.transcription} - ${element.wordTranslate}`;
      return createElement({
        tag: 'li',
        className: 'short-statistic__word',
        content: textContent,
        dataset: {
          audio: element.audio,
        },
      });
    });
    correctList.append(...correctElements);

    statisticContainer.append(correctResult, correctList);
  }

  statisticList.append(statisticContainer);
  return statisticList;
}
