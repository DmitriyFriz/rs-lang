import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf-8');
const dom = new JSDOM(html);

document.body.innerHTML = dom.window.document.body.innerHTML;
window.URL.createObjectURL = jest.fn();
