import BaseComponent from '../../../BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

export default function createResults(learnedWords, words) {
  const learned = learnedWords.length;
  const modal = createElement({ tag: 'div', className: 'results-section' });
  const message = createElement({ tag: 'div', className: 'result-modal' });
  modal.appendChild(message);

  const learnedList = createElement({
    tag: 'ul',
    content: 'Learned: ',
    className: 'list-learned',
  });
  message.appendChild(learnedList);
  const learnedCount = createElement({
    tag: 'span',
    content: learned,
    id: 'correct-count',
  });
  learnedList.appendChild(learnedCount);

  const notLearnedList = createElement({
    tag: 'ul',
    content: 'Not learned: ',
    className: 'list-not-learned',
  });
  message.appendChild(notLearnedList);
  const notLearnedCount = createElement({
    tag: 'span',
    content: words.length - learned,
    id: 'incorrect-count',
  });
  notLearnedList.appendChild(notLearnedCount);

  const back = createElement({
    tag: 'button',
    content: 'Back',
    id: 'back',
  });
  message.appendChild(back);

  const newGame = createElement({
    tag: 'button',
    content: 'New Game',
    id: 'modal-reset',
  });
  message.appendChild(newGame);

  words.forEach((el) => {
    const textContent = `${el.word} ${el.transcription} - ${el.wordTranslate}`;
    const item = createElement({ tag: 'li', content: textContent, id: el.word });

    if (learnedWords.includes(el.word.toLowerCase())) {
      learnedList.appendChild(item);
    } else {
      notLearnedList.appendChild(item);
    }
  });
  return modal;
}
