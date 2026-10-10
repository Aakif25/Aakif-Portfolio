// Next.js 15's local-font manifest can be empty on Windows. Derive preload URLs
// from the emitted CSS, so the static export discovers its actual hashed fonts
// before layout. Do not duplicate a preload already emitted by Next.js.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../out/', import.meta.url));
function walk(dir) {
  return readdirSync(dir, {withFileTypes:true}).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
}
const files = walk(root);
const fonts = new Set();
for (const file of files.filter(file => file.endsWith('.css'))) {
  for (const match of readFileSync(file,'utf8').matchAll(/url\(([^)]+\.woff2)\)/g)) {
    const relative = match[1].replace(/["']/g,'');
    const absolute = path.resolve(path.dirname(file),relative);
    const publicPath = relative.startsWith('/') ? relative : '/'+path.relative(root,absolute).split(path.sep).join('/');
    if(publicPath.startsWith('/_next/')) fonts.add(publicPath);
  }
}
for (const file of files.filter(file => file.endsWith('.html'))) {
  let html = readFileSync(file,'utf8');
  const links = [...fonts].filter(font => !html.includes(`href="${font}"`))
    .map(font => `<link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin="anonymous"/>`).join('');
  html=html.replace('</head>',links+'</head>');
  writeFileSync(file,html);
}
console.log(`Static export ready; ${fonts.size} local fonts discovered for early preload.`);
