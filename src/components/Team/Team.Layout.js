const createCard = (data) => {
  const card = document.createElement('div');
  card.className = 'team__item';

  const image = document.createElement('img');
  image.src = data.photo ? data.photo : './assets/img/github.svg';
  image.alt = data.name;
  image.className = 'team__image';

  const name = document.createElement('h3');
  name.innerText = data.name;

  const link = document.createElement('a');
  link.href = `https://github.com/${data.github}/`;
  link.target = '_blank';
  link.innerText = data.github;

  const contributionsList = document.createElement('ul');
  data.contributions.forEach((text) => {
    const contributionsItem = document.createElement('li');
    contributionsItem.innerText = text;
    contributionsList.insertAdjacentElement('beforeend', contributionsItem);
  });

  card.insertAdjacentElement('beforeend', image);
  card.insertAdjacentElement('beforeend', name);
  card.insertAdjacentElement('beforeend', link);
  card.insertAdjacentElement('beforeend', contributionsList);

  return card;
};

export default function (teammates) {
  const element = document.createElement('div');
  element.className = 'team__list';

  teammates.forEach((value) => {
    const card = createCard(value);
    element.insertAdjacentElement('beforeend', card);
  });

  return element;
}
