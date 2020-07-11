// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import getLayout from './Settings.Main.Layout';

// handler
import { handleSettings } from './Settings.Main.Handler';

class SettingsMain extends BaseComponent {
  createLayout() {
    this.component.className = 'settings';
    this.component.innerHTML = getLayout();
    this.saveBtn = BaseComponent.createElement({
      tag: 'button',
      className: 'button button-save-settings',
      content: 'Save',
    });
    this.component.append(this.saveBtn);
  }

  addListeners() {
    this.saveBtn.addEventListener('click', () => handleSettings(this.component, 'save'));
  }

  removeListeners() {
  }

  async show() {
    await super.show();
    await handleSettings(this.component);
  }
}

export default SettingsMain;
