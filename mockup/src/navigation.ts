import type { MouseEvent } from 'react';

export type MenuLink = { label: string; href: string; note?: string };
export const menuGroups: { label: string; href: string; links: MenuLink[] }[] = [
  { label: 'Tech & Business', href: '/tech/', links: [
    { label: 'Recent Projects', href: '/tech/#projects' },
    { label: 'Delphi Atlas', href: '/tech/#delphi' },
    { label: 'Project Hades', href: '/tech/#hades', note: 'Live' },
    { label: 'Project Odyssey', href: '/tech/#odyssey', note: 'In development' },
    { label: 'Next steps', href: '/tech/#tech-goals' },
    { label: 'Experience', href: '/tech/#experience' },
    { label: 'Skills & tools', href: '/tech/#toolkit' },
    { label: 'The Curious Council', href: '/tech/#curious-council' },
    { label: 'Product & business enquiries', href: '/tech/#services' },
    { label: 'Professional website', href: 'https://tobiarogunmati.com/' },
  ] },
  { label: 'Music & DJ', href: '/sound/', links: [
    { label: 'Recorded sets', href: '/sound/#sets' },
    { label: 'Playlists & selections', href: '/sound/#playlists' },
    { label: 'Next steps', href: '/sound/#music-goals' },
    { label: 'DJ sets & events', href: '/sound/#events' },
  ] },
  { label: 'Arts & Culture', href: '/arts/', links: [
    { label: 'The Library', href: '/library/' },
    { label: 'Catalogue', href: '/catalogue/' },
    { label: 'Anime finds', href: '/arts/#anime-finds' },
    { label: 'Films, series & animation', href: '/library/#screen' },
    { label: 'Manga & reading', href: '/library/#reading' },
    { label: 'Games & gaming', href: '/arts/#gaming' },
    { label: 'Games shelf', href: '/library/#games' },
    { label: 'Next steps', href: '/arts/#culture-goals' },
  ] },
  { label: 'Society & Ideas', href: '/freedom/', links: [
    { label: 'Interests & perspectives', href: '/freedom/#ideas' },
    { label: 'Histories & perspectives', href: '/freedom/#histories' },
    { label: 'Wall of ideas', href: '/freedom/#ideas-wall' },
    { label: 'Bucket List', href: '/freedom/#bucket-list' },
    { label: 'Writing on Substack', href: '/freedom/#writing' },
    { label: 'Catalogue', href: '/catalogue/' },
    { label: 'Next steps', href: '/freedom/#ideas-goals' },
    { label: 'The Curious Council', href: '/freedom/#council-ideas' },
    { label: 'My Substack profile', href: 'https://substack.com/@soralives' },
  ] },
];

export function moveToAnchor(id: string, smooth = true) {
  const target = document.getElementById(id);
  if (!target) return;
  if (target instanceof HTMLDetailsElement) target.open = true;
  target.closest('details')?.setAttribute('open', '');
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

export function ordinaryClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
