import { useEffect, useRef, useState } from 'react';
import { routeForPath } from './routes.mjs';
import { CloudShader } from './CloudShader';
import type { RouteId } from './routes.mjs';
import './cloud-passage.css';

const HANDOFF = 'soraverse-cloud-passage';
const COVER_MS = 420;
const REVEAL_MS = 600;
type Stage = 'idle' | 'cover' | 'reveal';

function incoming(): Stage {
  try {
    const saved = JSON.parse(sessionStorage.getItem(HANDOFF) || 'null');
    const allowed = !matchMedia('(prefers-reduced-motion: reduce)').matches && sessionStorage.getItem('soraverse-motion') !== 'paused';
    return allowed && saved && saved.path === location.pathname + location.search + location.hash && Date.now() - saved.at < 12000 ? 'reveal' : 'idle';
  } catch { return 'idle'; }
}

/** Full document navigation stays native; clouds bridge the old and new documents. */
export function CloudPassage({paused}: {paused: boolean}) {
  const [stage, setStage] = useState<Stage>(incoming);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    let navigateTimer = 0, clearTimer = 0, recoveryTimer = 0;
    let pending: URL | null = null;
    let previousFocus: HTMLElement | null = null;
    const site = document.querySelector<HTMLElement>('.site');
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const forget = () => { try { sessionStorage.removeItem(HANDOFF); } catch { /* Optional enhancement. */ } };
    const settle = (restoreFocus = false) => {
      clearTimeout(navigateTimer); clearTimeout(clearTimer); clearTimeout(recoveryTimer);
      pending = null; forget(); setStage('idle');
      if (site) site.inert = false;
      if (restoreFocus) previousFocus?.focus({preventScroll:true});
    };
    if (incoming() === 'reveal') {
      forget();
      if (site) site.inert = true;
      clearTimer = window.setTimeout(() => settle(), REVEAL_MS);
    }
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || pausedRef.current || media.matches) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const next = new URL(link.href,location.href);
      if (next.origin !== location.origin || !/^https?:$/.test(next.protocol) || routeForPath(next.pathname).id === 'not-found' || routeForPath(next.pathname).id === routeForPath(location.pathname).id) return;
      // If storage is unavailable, preserve immediate ordinary navigation.
      try { sessionStorage.setItem(HANDOFF, JSON.stringify({path:next.pathname+next.search+next.hash,at:Date.now()})); } catch { return; }
      event.preventDefault();
      if (pending) return;
      pending = next;
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setStage('cover');
      if (site) site.inert = true;
      navigateTimer = window.setTimeout(() => {
        if (pending) location.assign(pending.href);
      }, COVER_MS);
      // Recover the old page if navigation is cancelled by the browser or cannot complete.
      recoveryTimer = window.setTimeout(() => settle(true), 10000);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') settle(true); };
    const restore = (event: PageTransitionEvent) => { if (event.persisted) settle(true); };
    const preference = () => {
      if (!media.matches) return;
      const destination = pending;
      settle();
      if (destination) location.assign(destination.href);
    };
    document.addEventListener('click',click);
    document.addEventListener('keydown',escape);
    window.addEventListener('pageshow',restore);
    media.addEventListener('change',preference);
    return () => {
      clearTimeout(navigateTimer); clearTimeout(clearTimer); clearTimeout(recoveryTimer);
      document.removeEventListener('click',click); document.removeEventListener('keydown',escape);
      window.removeEventListener('pageshow',restore); media.removeEventListener('change',preference);
      if (site) site.inert = false;
    };
  }, []);
  return <div className="cloud-passage" data-stage={stage} aria-hidden="true">
    <div className="cloud-passage-fill"/>
    <img className="cloud-passage-bank cloud-passage-bank-left" src="/assets/cloud.webp" width="1440" height="699" alt=""/>
    <img className="cloud-passage-bank cloud-passage-bank-right" src="/assets/cloud.webp" width="1440" height="699" alt=""/>
  </div>;
}

const palettes: Partial<Record<RouteId,{skyTopColor:string;skyBottomColor:string;cloudColor:string}>> = {
  tech:{skyTopColor:'#dbe7f5',skyBottomColor:'#f8f5ed',cloudColor:'#fffdf8'},
  sound:{skyTopColor:'#edc7b9',skyBottomColor:'#f5a58f',cloudColor:'#fff3e7'},
  arts:{skyTopColor:'#f2de9c',skyBottomColor:'#f9cf36',cloudColor:'#fff9e9'},
  freedom:{skyTopColor:'#14273a',skyBottomColor:'#234858',cloudColor:'#bdd3d6'},
  library:{skyTopColor:'#dbe7f5',skyBottomColor:'#f8f5ed',cloudColor:'#fffdf8'},
};
export function PageClouds({routeId,paused,placement='opening'}:{routeId:RouteId;paused:boolean;placement?:'opening'|'gateway'}) {
  const palette = palettes[routeId] || palettes.tech!;
  return <div className={`page-clouds page-clouds-${placement}`} aria-hidden="true"><CloudShader paused={paused} speed={.3} count={4} {...palette}/></div>;
}
