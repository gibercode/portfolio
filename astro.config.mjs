import { defineConfig } from 'astro/config';

// Set SITE_URL (e.g. https://tudominio.com) at build time to enable canonical, social previews and sitemap.
export default defineConfig({ site: process.env.SITE_URL || undefined });
