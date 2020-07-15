// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

export default function getModal() {
  const resultSection = createElement({ tag: 'div', className: 'results-section' });
  const resultContainer = createElement({ tag: 'div', className: 'results-container' });

  const statisticContainer = createElement({ tag: 'div' });
  const closeButton = createElement({
    tag: 'button',
    className: 'button results-container__button',
    content: 'close',
  });

  resultContainer.append(statisticContainer, closeButton);
  resultSection.append(resultContainer);

  return [resultSection, statisticContainer, closeButton];
}
