import BaseComponent from '../BaseComponent/BaseComponent';

import './vocabulary.scss';

class Vocabulary extends BaseComponent {
  createLayout() {
    this.component.className = 'vocabulary';
    this.component.innerHTML = `
    <div class="vocabulary__info">
      AMOUNT OF WORDS: 30 (ADDED TODAY: 0)
    </div>
    <nav class="vocabulary__nav">
      <div class="vocabulary__tab vocabulary__tab--active">LEARNING WORDS</div>
      <div class="vocabulary__tab">DIFFICULT WORDS</div>
      <div class="vocabulary__tab">DELETED WORDS</div>
    </nav>
    <div class="vocabulary__list">
      <div class="vocabulary__item">
        <div class="vocabulary__word">anxious</div>
        <button class="vocabulary__audio">play</button>
        <div class="vocabulary__translation">озабоченный</div>
        <div class="vocabulary__meaning">"<i>Anxious</i> means feeling worried or nervous."</div>
        <div class="vocabulary__example">She was <b>anxious</b> about not making her appointment on time.</div>
        <button class="vocabulary__delete">x</button>
      </div>
      <div class="vocabulary__item">
        <div class="vocabulary__word">anxious</div>
        <button class="vocabulary__audio">play</button>
        <div class="vocabulary__translation">озабоченный</div>
        <div class="vocabulary__meaning">"<i>Anxious</i> means feeling worried or nervous."</div>
        <div class="vocabulary__example">She was <b>anxious</b> about not making her appointment on time.</div>
        <button class="vocabulary__delete">x</button>
      </div>
    </div>
    <div class="vocabulary__pagination">
      <button class="vocabulary__prev"><<</button>
      <button class="vocabulary__next">>></button>
    </div>
    `;
  }
}

export default Vocabulary;
