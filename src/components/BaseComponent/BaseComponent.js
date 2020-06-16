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
}

export default BaseComponent;
