import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
const loadingMarkup = readFileSync(new URL('./loading.html', import.meta.url), 'utf8');
import { routes, routeForPath } from './src/routes.mjs';

const origin = 'https://www.soralives.xyz';
const production = process.env.VERCEL_ENV === 'production';
const entry = (path: string) => path === '/' ? 'index.html' : path.endsWith('.html') ? path.slice(1) : `${path.slice(1)}index.html`;
function discovery(): Plugin {
  return {
    name: 'soraverse-discovery',
    transformIndexHtml: { order: 'post', handler(html, context) {
      const route = routeForPath(context.path);
      const url = `${origin}${route.path}`;
      const indexable = production && route.id !== 'not-found';
      return {
        html: html.replace('<body>', `<body>${loadingMarkup}`)
          .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
          .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${route.description}" />`)
          .replace('content="noindex, nofollow"', `content="${indexable ? 'index, follow' : 'noindex, nofollow'}"`),
        tags: [
          ...(route.id === 'not-found' ? [] : [{ tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' as const }]),
          ...[
            ['og:type', 'website'], ['og:title', route.title], ['og:description', route.description],
            ['og:url', url], ['og:site_name', 'The Soraverse'],
            ['og:image', `${origin}/media/hero/soraverse-cloud-poster.webp`],
            ['og:image:alt', 'A cinematic blue sky and clouds from The Soraverse'],
          ].map(([property, content]) => ({ tag: 'meta', attrs: { property, content }, injectTo: 'head' as const })),
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:site', content: '@soralives' }, injectTo: 'head' },
        ],
      };
    } },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: production
        ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
        : 'User-agent: *\nDisallow: /\n' });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + (production ? routes.filter(route=>route.id!=='not-found').map(route => `<url><loc>${origin}${route.path}</loc></url>`).join('') : '') + '</urlset>\n' });
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = new URL(req.url || '/', 'http://localhost').pathname;
        if (!req.headers.accept?.includes('text/html') || routeForPath(path).id !== 'not-found' || path === '/404.html') return next();
        try {
          const source = await readFile(fileURLToPath(new URL('./404.html', import.meta.url)), 'utf8');
          const html = await server.transformIndexHtml('/404.html', source);
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(html);
        } catch (error) { next(error as Error); }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = new URL(req.url || '/', 'http://localhost').pathname;
        if (!req.headers.accept?.includes('text/html') || routeForPath(path).id !== 'not-found' || path === '/404.html') return next();
        try { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(await readFile(fileURLToPath(new URL('./dist/404.html', import.meta.url)), 'utf8')); }
        catch (error) { next(error as Error); }
      });
    },
  };
}
export default defineConfig({
  appType: 'mpa',
  cacheDir: '.vite',
  plugins: [discovery()],
  server: { host: '127.0.0.1', port: 4176, strictPort: true },
  preview: { host: '127.0.0.1', port: 4176, strictPort: true },
  build: { target: 'es2022', rollupOptions: { input: Object.fromEntries(routes.map(route=>[route.id,fileURLToPath(new URL(`./${entry(route.path)}`, import.meta.url))])) } }
});
