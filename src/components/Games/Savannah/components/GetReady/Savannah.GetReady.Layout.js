import BaseComponent from 'components/BaseComponent/BaseComponent';

export default function getGetReadyLayout() {
  const { createElement } = BaseComponent;

  const layout = createElement({
    tag: 'div',
  });

  const timer = createElement({
    tag: 'div',
    className: 'getReady-timer',
    id: 'timerBlock',
    content: 'This is Timer Block',
  });

  layout.append(timer);

  return layout;
}
