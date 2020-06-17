export default function createElement({
  tag, content, className, id,
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
  return element;
}
