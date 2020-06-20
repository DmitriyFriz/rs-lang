function createElement(tag, content, className, id) {
  const element = document.createElement(tag);
  if (content) { element.innerHTML = content; }
  if (className) { element.className = className; }
  if (id) { element.id = id; }
  return element;
}

export default function createResults(learnedWords, words) {
  const modal = createElement('div', null, 'results-section');
  const message = createElement('div', null, 'result-modal');
  modal.appendChild(message);

  const learnedList = createElement('ul', 'Learned: ', 'list-learned');
  message.appendChild(learnedList);
  const learnedCount = createElement('span', learnedWords.length, null, 'correct-count');
  learnedList.appendChild(learnedCount);

  const notLearnedList = createElement('ul', 'Not learned: ', 'list-not-learned');
  message.appendChild(notLearnedList);
  const notLearnedCount = createElement('span', words.length - learnedWords.length, null, 'incorrect-count');
  notLearnedList.appendChild(notLearnedCount);

  const back = createElement('button', 'Back', null, 'back');
  message.appendChild(back);

  const newGame = createElement('button', 'New Game', null, 'modal-reset');
  message.appendChild(newGame);

  words.forEach((el) => {
    const textContent = `${el.word} ${el.transcription} - ${el.wordTranslate}`;
    const item = createElement('li', textContent, null, el.word);

    if (learnedWords.includes(el.word.toLowerCase())) {
      learnedList.appendChild(item);
    } else {
      notLearnedList.appendChild(item);
    }
  });
  return modal;
}
