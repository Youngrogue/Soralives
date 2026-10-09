export const worlds = [
  { id: 'tech', path: '/tech/', label: 'Tech & Business', note: 'For the possibilities', image: '/assets/tech-room.webp', summary: 'Products in progress, practical thinking and the work behind them.' },
  { id: 'sound', path: '/sound/', label: 'Music & DJ', note: 'For the feeling', image: '/assets/music-room.webp', summary: 'Recorded sets, selections and nights that bring people together.' },
  { id: 'arts', path: '/arts/', label: 'Arts & Culture', note: 'For the imagination', image: '/assets/culture-room.webp', summary: 'Films, anime, manga, games and the art of making another world.' },
  { id: 'freedom', path: '/freedom/', label: 'Society & Ideas', note: 'For the questions', image: '/assets/ideas-room.webp', summary: 'History, human culture and the ideas I keep coming back to.' },
];

export const routes = [
  { id: 'home', path: '/', label: 'Home', title: 'The Soraverse | Sora Lives', description: 'Hi, I’m Sora. Explore the things I build, the sounds I love and the worlds I am curious about.' },
  ...worlds.map(world => ({ ...world, title: `${world.label} | The Soraverse`, description: world.summary })),
  { id: 'library', path: '/library/', label: 'The Library', title: 'The Library | The Soraverse', description: 'Explore Sora’s growing collection of films, series, anime, manga and games.' },
  { id: 'not-found', path: '/404.html', label: 'Page not found', title: 'Page not found | The Soraverse', description: 'Find your way back to The Soraverse.' },
];

export function routeForPath(pathname) {
  const path = pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  return routes.find(route => (route.path.replace(/\/$/, '') || '/') === path) ?? routes.at(-1);
}

const sections = {
  tech: ['tech', 'projects', 'delphi', 'hades', 'odyssey', 'tech-goals', 'experience', 'toolkit', 'curious-council', 'services'],
  sound: ['music', 'sets', 'playlists', 'music-goals', 'events'],
  arts: ['culture', 'anime-finds', 'gaming', 'culture-goals'],
  freedom: ['ideas', 'histories', 'ideas-wall', 'wall-pieces', 'ideas-goals', 'council-ideas'],
};

/** Retain shared links from the original single page without adding a history stop. */
export function legacyDestination(pathname, hash, search = '') {
  if (routeForPath(pathname).id !== 'home' || !hash) return null;
  let anchor;
  try { anchor = decodeURIComponent(hash.slice(1)); } catch { return null; }
  const owner = Object.entries(sections).find(([, ids]) => ids.includes(anchor));
  return owner ? `/${owner[0]}/${search}#${encodeURIComponent(anchor)}` : null;
}
