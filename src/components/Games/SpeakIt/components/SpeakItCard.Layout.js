import BaseComponent from '../../../BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

export default function createWordCard(word, i) {
  const card = createElement({ tag: 'div', className: 'card' });
  card.setAttribute('id', i);

  const text = createElement({ tag: 'p', content: word.word, className: 'word' });
  card.appendChild(text);

  const transcript = createElement({ tag: 'p', content: word.transcription, className: 'transcription' });
  card.appendChild(transcript);

  const icon = createElement({ tag: 'div', className: 'sound-icon' });
  card.appendChild(icon);

  return card;
}
