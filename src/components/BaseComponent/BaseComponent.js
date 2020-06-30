// Since this file shows how to use this component, then
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

/**
 * Should be used to construct any component.
 * The API and lifecycle can be updated
 */
class BaseComponent {
  /**
   * @param {Element} parent - element which should contain a component
   * @param {string} tagName - specifies the type of element to be created.
   */
  constructor(parent, tagName) {
    this.parent = parent;
    this.component = document.createElement(tagName);
  }

  /**
   * Creates a layout of component.
   * If the component is simple than it can be defined inside the function.
   * If not - use <Component>.Layout.js file.
   */
  createLayout() {}

  /**
   * Adds listeners to the component's Nodes.
   */
  addListeners() {}

  /**
   * Removes listeners before the component is destroyed.
   */
  removeListeners() {}

  /**
   * Prepares data which should be used in the component.
   */
  async prepareData() {}

  async show() {
    await this.prepareData();
    this.createLayout();
    this.parent.appendChild(this.component);
    this.addListeners();
  }

  hide() {
    this.removeListeners();
    this.parent.removeChild(this.component);
  }

  static createElement({
    tag, content, className, id, destination, dataset,
  }) {
    const element = document.createElement(tag);
    if (content) {
      element.textContent = content;
    }
    if (className) {
      element.className = className;
    }
    if (id) {
      element.id = id;
    }
    if (destination) {
      element.dataset.destination = destination;
    }
    if (dataset) {
      Object.entries(dataset).forEach(([key, value]) => {
        element.dataset[key] = value;
      });
    }
    return element;
  }
}

export default BaseComponent;
