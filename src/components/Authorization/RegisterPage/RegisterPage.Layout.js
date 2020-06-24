import BaseComponent from 'components/BaseComponent/BaseComponent';

import { regClassName, regPageLayout } from './RegisterPage.Data';

export default function getRegisterPageLayout() {
  const formReg = BaseComponent.createElement({
    tag: 'form',
    className: regClassName.regForm,
  });
  formReg.autocomplete = 'off';

  const inputDataEmail = regPageLayout.inputRegEmail.map((element) => {
    if (element.type === 'email') {
      const input = BaseComponent.createElement({
        tag: 'input',
        className: regClassName.regInput,
        id: element.id,
      });
      input.type = element.type;
      input.placeholder = element.placeholder;
      return input;
    }

    if (element.type === 'legend') {
      const label = BaseComponent.createElement({
        tag: element.type,
        content: element.content,
        id: element.id,
        className: element.nameClass,
      });
      label.style.visibility = element.visibility;
      return label;
    }
  });

  const inputDataPassword = regPageLayout.inputRegPassword.map((element) => {
    if (element.type === 'password') {
      const input = BaseComponent.createElement({
        tag: 'input',
        className: regClassName.regInput,
        id: element.id,
      });
      input.type = element.type;
      input.placeholder = element.placeholder;
      return input;
    }

    if (element.type === 'span') {
      return BaseComponent.createElement({
        tag: 'span',
        content: element.content,
        className: element.nameClass,
        id: element.id,
      });
    }

    if (element.type === 'legend') {
      const label = BaseComponent.createElement({
        tag: element.type,
        content: element.content,
        id: element.id,
        className: element.nameClass,
      });
      label.style.visibility = element.visibility;
      return label;
    }
  });

  const fieldSetEmails = BaseComponent.createElement({
    tag: regPageLayout.fieldSetEmail.type,
    className: regPageLayout.fieldSetEmail.nameClass,
    id: regPageLayout.fieldSetEmail.id,
  });

  const fieldSetPasswords = BaseComponent.createElement({
    tag: regPageLayout.fieldSetPassword.type,
    className: regPageLayout.fieldSetPassword.nameClass,
    id: regPageLayout.fieldSetPassword.id,
  });

  const submitBtn = BaseComponent.createElement({
    tag: regPageLayout.submit.tag,
    className: regClassName.submit,
    id: regPageLayout.submit.id,
    destination: regPageLayout.submit.destination,
  });
  submitBtn.type = regPageLayout.submit.type;
  submitBtn.value = regPageLayout.submit.value;
  submitBtn.disabled = true;

  const backToMainPageBtn = BaseComponent.createElement({
    tag: regPageLayout.button.tag,
    content: regPageLayout.button.content,
    className: regPageLayout.button.className,
    destination: regPageLayout.button.destination,
  });

  fieldSetEmails.append(...inputDataEmail);
  fieldSetPasswords.append(...inputDataPassword);

  formReg.append(fieldSetEmails, fieldSetPasswords, submitBtn);

  return [formReg, backToMainPageBtn, submitBtn, fieldSetEmails, fieldSetPasswords];
}
