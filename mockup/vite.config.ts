import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  server: { host: '127.0.0.1', port: 4176, strictPort: true },
  preview: { host: '127.0.0.1', port: 4176, strictPort: true },
  build: { rollupOptions: { input: { home: fileURLToPath(new URL('./index.html', import.meta.url)), library: fileURLToPath(new URL('./library/index.html', import.meta.url)) } } }
});
