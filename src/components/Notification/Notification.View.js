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
    this.isDrop = false;
    this.queue = [];
    this.maxQueueLength = maxQueueLength;
  }

  add(content, timer) {
    if (this.isShow) {
      this.addToQueue({ content, timer });
      return;
    }

    this.component.className = 'down up';
    this.createContentLayout(content);
    this.isShow = true;
    this.show();

    if (timer) { setTimeout(() => this.drop(), timer); }
  }

  addToQueue(data) {
    if (this.queue.length >= this.maxQueueLength) { return; }
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
    if (this.isDrop) { return; }
    this.isDrop = true;
    this.component.classList.remove('up');
    this.component.addEventListener('animationend', () => {
      this.isShow = false;
      this.isDrop = false;
      this.remove();
    }, { once: true });
  }

  remove() {
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
