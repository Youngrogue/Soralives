import { libraryShelves } from './content.ts';
import { animeSelections } from './anime-content.ts';

// Keep the original supplied lists intact and use one combined view everywhere.
export const expandedLibraryShelves = libraryShelves.map(shelf => shelf.id === 'screen'
  ? { ...shelf, titles: [...new Set([...shelf.titles, ...animeSelections.map(item => item.title)])].sort((a, b) => a.localeCompare(b)) }
  : shelf);
