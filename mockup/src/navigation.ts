import type { MouseEvent } from 'react';

export type MenuLink = { label: string; href: string; note?: string };
export const menuGroups: { label: string; href: string; links: MenuLink[] }[] = [
  { label: 'Music & DJ', href: '/#music', links: [
    { label: 'Recorded sets', href: '/#sets' },
    { label: 'Playlists & selections', href: '/#playlists' },
    { label: 'DJ sets & events', href: '/#events' },
  ] },
  { label: 'Tech & Business', href: '/#tech', links: [
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills & tools', href: '/#toolkit' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Delphi Atlas', href: '/#delphi' },
    { label: 'Project Hades', href: '/#hades', note: 'Live' },
    { label: 'Project Odyssey', href: '/#odyssey', note: 'In development' },
    { label: 'Product & business enquiries', href: '/#services' },
    { label: 'Professional website', href: 'https://tobiarogunmati.com/' },
  ] },
  { label: 'Arts & Culture', href: '/#culture', links: [
    { label: 'The Library', href: '/library/' },
    { label: 'Films, series & animation', href: '/library/#screen' },
    { label: 'Manga & reading', href: '/library/#reading' },
    { label: 'Games', href: '/library/#games' },
  ] },
  { label: 'Society & Ideas', href: '/#ideas', links: [
    { label: 'Interests & perspectives', href: '/#ideas' },
    { label: 'Writing on Substack', href: 'https://substack.com/@soralive' },
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
