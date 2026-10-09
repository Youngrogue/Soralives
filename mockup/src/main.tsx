import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { App } from './App';
import { legacyDestination, routeForPath } from './routes.mjs';
import type { RouteId } from './routes.mjs';
import type { ComponentType } from 'react';
import type { PageProps } from './page-types';
import './tokens.css';
import './styles.css';
import './v2.css';
import './pages.css';

const destination = legacyDestination(location.pathname, location.hash, location.search);
if (destination) location.replace(destination);
else {
  const route = routeForPath(location.pathname);
  const pages: Record<RouteId, () => Promise<{ default: ComponentType<PageProps> }>> = {
    home: () => import('./Home'), tech: () => import('./TechSection'), sound: () => import('./SoundPage'),
    arts: () => import('./ArtsPage'), freedom: () => import('./SocietySection'),
    library: () => import('./Library'), 'not-found': () => import('./NotFound'),
  };
  document.documentElement.dataset.page = route.id;
  try { document.documentElement.dataset.motion = sessionStorage.getItem('soraverse-motion') === 'paused' ? 'paused' : 'on'; } catch { /* Optional preference. */ }
  const { default: Page } = await pages[route.id]();
  flushSync(() => createRoot(document.getElementById('root')!).render(<App routeId={route.id} Page={Page}/>));
}

// The browser handles ordinary navigation and history. Motion is only an enhancement.
function respectMotionPreference(event: Event) {
  const transition = (event as Event & { viewTransition?: { skipTransition(): void } }).viewTransition;
  if (document.documentElement.dataset.motion === 'paused' || matchMedia('(prefers-reduced-motion: reduce)').matches) transition?.skipTransition();
}
window.addEventListener('pageswap', respectMotionPreference);
window.addEventListener('pagereveal', respectMotionPreference);
