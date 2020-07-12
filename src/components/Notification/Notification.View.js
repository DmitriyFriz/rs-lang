// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// style
import './Notification.scss';

class Notification extends BaseComponent {
  constructor(parent = document.body, maxQueueLength = 2) {
    super();

    this.parent = parent;
    this.component = document.createElement('div');
    this.component.id = 'notification';

    this.isShow = false;
    this.queue = [];
    this.maxQueueLength = maxQueueLength;

    this.remove = this.remove.bind(this);
  }

  addListeners() {
    this.component.addEventListener('animationend', this.remove);
  }

  removeListeners() {
    this.component.removeEventListener('animationend', this.remove);
  }

  add(content, timer = 4000) {
    if (this.isShow) {
      this.addToQueue({ content, timer });
      return;
    }

    this.createContentLayout(content);
    this.component.className = 'down up';
    this.isShow = true;
    this.show();

    setTimeout(() => this.drop(), timer);
  }

  addToQueue(data) {
    if (this.queue.length > this.maxQueueLength) { return; }
    this.queue.push(data);
  }

  getFromQueue() {
    return this.queue.shift();
  }

  createContentLayout(content) {
    const html = `<div class="description">${content}</div>`;

    this.layout = BaseComponent.createElement(
      {
        tag: 'div',
        className: 'content',
        innerHTML: html,
      },
    );

    this.component.append(this.layout);
  }

  drop() {
    this.component.classList.remove('up');
    this.isShow = false;
  }

  remove() {
    if (this.isShow) { return; }
    this.component.className = '';
    this.layout.remove();

    if (this.queue.length) {
      const { content, timer } = this.getFromQueue();
      this.add(content, timer);
      return;
    }

    this.hide();
  }
}

export default Notification;
