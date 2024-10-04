import { writeFile } from 'fs/promises';
import path from 'path';

async function generateSitemap() {
  const baseUrl = 'http://localhost:5173';
  const routes = ['', '/json', '/json-to-toml'];

  const list = routes
    .map((route) => `<url><loc>${baseUrl}${route}</loc></url>`)
    .join('\r\n');

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${list}
</urlset>`;

  await writeFile(path.resolve('./public', 'sitemap.xml'), sitemap);
}

generateSitemap();
