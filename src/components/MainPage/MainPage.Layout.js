import BaseComponent from 'components/BaseComponent/BaseComponent';

const { createElement } = BaseComponent;

function createBlock(blocksData, blockName, content) {
  const parent = createElement(blocksData[blockName].parent);
  const { children } = blocksData[blockName];

  children.forEach((childParameters) => {
    let parameters = childParameters;
    if (content) {
      parameters = { ...childParameters, content };
    }
    const child = createElement(parameters);
    parent.append(child);
  });

  return parent;
}

export default createBlock;
