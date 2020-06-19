function createElement(tag, content, className, id) {
  const element = document.createElement(tag);
  if (content) { element.innerHTML = content; }
  if (className) { element.className = className; }
  if (id) { element.id = id; }
  return element;
}

export default function createWordCard(word) {
  const card = createElement('div', null, 'card');

  const text = createElement('p', word.word, 'word');
  card.appendChild(text);

  const transcript = createElement('p', word.transcription, 'transcription');
  card.appendChild(transcript);

  const icon = createElement('div', null, 'sound-icon');
  card.appendChild(icon);

  return card;
}
