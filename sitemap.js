import { writeFile } from 'fs/promises';
import path from 'path';

async function generateSitemap() {
  const baseUrl = 'https://sysym.dev/1001-tools';
  const routes = [
    '',
    '/json',
    '/toml',
    '/qr',
    '/date',
    '/date-and-time',
    '/json-to-toml',
    '/toml-to-json',
    '/qr-scanner',
    '/qr-generator',
    '/timer',
  ];

  const list = routes
    .map((route) => `<url><loc>${baseUrl}${route}</loc></url>`)
    .join('\r\n');

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${list}
</urlset>`;

  await writeFile(path.resolve('./public', 'sitemap.xml'), sitemap);
}

generateSitemap();
