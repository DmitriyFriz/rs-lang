import BaseComponent from 'components/BaseComponent/BaseComponent';
import { authClassName, authPageLayout } from './AuthPage.Data';

export default function getAuthPageLayout() {
  const formAuth = BaseComponent.createElement({
    tag: 'form',
    className: authClassName.authForm,
  });

  const inputAuthEmail = authPageLayout.inputAuthEmail.map((element) => {
    if (element.type === 'email') {
      const input = BaseComponent.createElement({
        tag: 'input',
        className: authClassName.authInput,
        id: element.id,
      });
      input.type = element.type;
      input.placeholder = element.placeholder;
      return input;
    }

    if (element.type === 'legend') {
      return BaseComponent.createElement({
        tag: element.type,
        content: element.content,
        id: element.id,
        className: element.nameClass,
      });
    }
    return null;
  });

  const inputAuthPassword = authPageLayout.inputAuthPassword.map((element) => {
    if (element.type === 'password') {
      const input = BaseComponent.createElement({
        tag: 'input',
        className: authClassName.authInput,
        id: element.id,
      });
      input.type = element.type;
      input.placeholder = element.placeholder;
      return input;
    }

    if (element.type === 'legend') {
      return BaseComponent.createElement({
        tag: element.type,
        content: element.content,
        id: element.id,
        className: element.nameClass,
      });
    }
    return null;
  });

  const fieldSetEmails = BaseComponent.createElement({
    tag: authPageLayout.fieldSetEmail.type,
    className: authPageLayout.fieldSetEmail.nameClass,
    id: authPageLayout.fieldSetEmail.id,
  });

  const fieldSetPasswords = BaseComponent.createElement({
    tag: authPageLayout.fieldSetPassword.type,
    className: authPageLayout.fieldSetPassword.nameClass,
    id: authPageLayout.fieldSetPassword.id,
  });

  const submitBtn = BaseComponent.createElement({
    tag: authPageLayout.submit.tag,
    className: authClassName.submit,
    id: authPageLayout.submit.id,
    destination: authPageLayout.submit.destination,
  });
  submitBtn.type = authPageLayout.submit.type;
  submitBtn.value = authPageLayout.submit.value;
  submitBtn.disabled = true;

  const backToMainPageBtn = BaseComponent.createElement({
    tag: authPageLayout.button.tag,
    content: authPageLayout.button.content,
    className: authPageLayout.button.className,
    destination: authPageLayout.button.destination,
  });

  fieldSetEmails.append(...inputAuthEmail);
  fieldSetPasswords.append(...inputAuthPassword);

  formAuth.append(fieldSetEmails, fieldSetPasswords, submitBtn);

  return [formAuth, backToMainPageBtn, submitBtn, fieldSetEmails, fieldSetPasswords];
}
