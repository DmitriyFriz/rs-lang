import BaseComponent from 'components/BaseComponent/BaseComponent';

export default function getLayout() {
  const container = BaseComponent.createElement({ tag: 'div', className: 'sprint-container'});
  const card = BaseComponent.createElement({ tag: 'div', className: 'sprint-card'});

  const time = BaseComponent.createElement({ tag: 'div', className: 'time', content: '60'});
  const question = BaseComponent.createElement({ tag: 'p', className: null});
  const answer = BaseComponent.createElement({ tag: 'p', className: null});

  const buttonContainer = BaseComponent.createElement({tag: 'div'});
  const falseButton = BaseComponent.createElement({tag: 'button', className:null, content: 'incorrect'});
  const trueButton = BaseComponent.createElement({tag: 'button', className:null, content: 'correct'});
  buttonContainer.append(falseButton, trueButton);

  const keyContainer = BaseComponent.createElement({tag: 'div'});
  const leftKey = BaseComponent.createElement({tag: 'div', className: 'key', content: '←'});
  const rightKey = BaseComponent.createElement({tag: 'div', className: 'key', content: '→'});
  keyContainer.append(leftKey, rightKey);

  card.append(time, question, answer, buttonContainer);
  container.append(card, keyContainer);
  return [container, time, question, answer, falseButton, trueButton, leftKey, rightKey];
}
