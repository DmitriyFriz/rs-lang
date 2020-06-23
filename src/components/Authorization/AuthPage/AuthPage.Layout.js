import BaseComponent from 'base/BaseComponent';

import { authPageLayout, authClassName } from './AuthPage.Data';

export default function getAuthPageLayout() {
  const formAuth = BaseComponent.createElement({
    tag: 'form',
    className: authClassName.authForm,
  });
  formAuth.autocomplete = 'off';

  const inputData = authPageLayout.inputAuth.map((element) => {
    const input = BaseComponent.createElement({
      tag: 'input',
      className: authClassName.authInput,
      id: element.id,
    });
    input.type = element.type;
    input.placeholder = element.placeholder;
    return input;
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

  formAuth.append(...inputData, submitBtn);

  return [formAuth, backToMainPageBtn, submitBtn];
}
