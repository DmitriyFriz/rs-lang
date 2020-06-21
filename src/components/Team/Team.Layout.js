import BaseComponent from '../BaseComponent/BaseComponent';

const createCard = (data) => {
  const card = BaseComponent.createElement({
    tag: 'div',
    className: 'team__item',
  });

  const infoWrap = BaseComponent.createElement({
    tag: 'div',
    className: 'team__info',
  });

  const image = BaseComponent.createElement({
    tag: 'img',
    className: 'team__image',
  });
  image.src = data.photo ? data.photo : './assets/img/github.svg';
  image.alt = data.name;

  const name = BaseComponent.createElement({
    tag: 'h3',
    content: data.name,
    className: 'team__name',
  });

  const link = BaseComponent.createElement({
    tag: 'a',
    content: data.github,
    className: 'team__link',
  });
  link.href = `https://github.com/${data.github}/`;
  link.target = '_blank';

  const contributionsList = BaseComponent.createElement({
    tag: 'ul',
    className: 'team__contributions',
  });
  data.contributions.forEach((text) => {
    const contributionsItem = document.createElement('li');
    contributionsItem.innerText = text;
    contributionsList.insertAdjacentElement('beforeend', contributionsItem);
  });

  infoWrap.append(image, name, link);

  card.append(infoWrap, contributionsList);

  return card;
};

export default function (teammates) {
  const element = BaseComponent.createElement({
    tag: 'div',
    className: 'team__list',
  });

  teammates.forEach((value) => {
    const card = createCard(value);
    element.append(card);
  });

  return element;
}
