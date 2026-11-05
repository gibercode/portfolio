import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const url = site ? `<url><loc>${new URL('/', site).href}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>` : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url}</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
