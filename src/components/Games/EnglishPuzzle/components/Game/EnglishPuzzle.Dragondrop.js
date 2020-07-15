function setDragondrop() {
  const pieces = document.querySelectorAll('.puzzle-piece');
  const currentDroppable = document.querySelector('.playboard__sentence_active');

  for (let i = 0; i < pieces.length; i += 1) {
    const addWordToSentence = () => {
      const droppableBelow = document.querySelector('.playboard__sentence_active');

      droppableBelow.append(pieces[i]);
      pieces[i].style.position = 'static';
    };

    pieces[i].addEventListener('dragstart', () => {
      currentDroppable.style.backgroundColor = '#68c2e8';
    });

    currentDroppable.addEventListener('dragover', () => {
      currentDroppable.style.backgroundColor = '#68c2e8';
    });

    currentDroppable.addEventListener('dragleave', () => {
      currentDroppable.style.backgroundColor = '#72d3fc';
    });

    currentDroppable.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    pieces[i].addEventListener('dragend', (event) => {
      currentDroppable.style.backgroundColor = '#fff';

      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      const droppableBelow = elemBelow.closest('.playboard__sentence_active');

      if (currentDroppable === droppableBelow) {
        droppableBelow.append(pieces[i]);
        pieces[i].style.position = 'static';
      } else {
        const startPlace = document.querySelector('.game-screen__puzzle-pieces');

        startPlace.append(pieces[i]);
        pieces[i].style.position = 'static';
      }

      if (droppableBelow) {
        droppableBelow.style.backgroundColor = '#fff';
      }
    });

    pieces[i].addEventListener('click', () => {
      addWordToSentence();
    });
  }
}

export default setDragondrop;
