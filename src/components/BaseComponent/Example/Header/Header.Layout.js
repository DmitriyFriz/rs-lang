export default function ({ buttonText, buttonClassName }) {
  return `
    <div>This is a test component</div>
    <button class='${buttonClassName}'>${buttonText}</button>
  `;
}