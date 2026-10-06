// Génère, après « vite build », une page HTML statique par route :
// le contenu est directement lisible par Google et les autres robots (sans JavaScript),
// avec un <title>, une description et une URL canonique propres à chaque page.
// Génère aussi sitemap.xml à partir de la même liste de pages.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, ROUTES, SITE_URL } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const replaceOnce = (html, regex, value, label) => {
  if (!regex.test(html)) throw new Error(`Balise introuvable dans index.html : ${label}`);
  return html.replace(regex, value);
};

for (const route of ROUTES) {
  const url = SITE_URL + route.path;
  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, 'title');
  html = replaceOnce(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(route.description)}" />`, 'description');
  html = replaceOnce(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${route.noindex ? 'noindex, follow' : 'index, follow'}" />`, 'robots');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(route.title)}" />`, 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(route.description)}" />`, 'og:description');
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(route.path)}</div>`, 'root');

  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), html);
  console.log(`pré-rendu : ${route.path} -> dist/${file}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ROUTES.filter((r) => !r.noindex)
    .map(
      (r) =>
        `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod>` +
        (r.sitemapPriority != null ? `<priority>${r.sitemapPriority.toFixed(1)}</priority>` : '') +
        '</url>'
    )
    .join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log('sitemap.xml généré');
