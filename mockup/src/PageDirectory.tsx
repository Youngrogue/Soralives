import { PageClouds } from './CloudPassage';
import type { RouteId } from './routes.mjs';
import type { PageProps } from './page-types';
import { routes } from './routes.mjs';
import { moveToAnchor, ordinaryClick } from './navigation';
import type { MouseEvent } from 'react';

const contents: Partial<Record<RouteId, { label: string; href: string }[]>> = {
  tech: [{label:'Projects',href:'#projects'},{label:'In progress',href:'#tech-goals'},{label:'Experience',href:'#experience'},{label:'Toolkit',href:'#toolkit'},{label:'Council',href:'#curious-council'},{label:'Work together',href:'#services'}],
  sound: [{label:'Recorded sets',href:'#sets'},{label:'Playlists',href:'#playlists'},{label:'In the making',href:'#music-goals'},{label:'Events & bookings',href:'#events'}],
  arts: [{label:'The Library',href:'/library/'},{label:'Anime finds',href:'#anime-finds'},{label:'Gaming',href:'#gaming'},{label:'What’s next',href:'#culture-goals'}],
  freedom: [{label:'Histories',href:'#histories'},{label:'Wall of ideas',href:'#ideas-wall'},{label:'Writing',href:'#ideas-goals'},{label:'Council',href:'#council-ideas'}],
};

export function PageDirectory({routeId, paused, setPaused, reducedMotion}: PageProps & {routeId: RouteId}) {
  const route = routes.find(route=>route.id===routeId)!;
  function followAnchor(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#') || !ordinaryClick(event)) return;
    event.preventDefault();
    if (location.hash !== href) history.pushState(null, '', href);
    moveToAnchor(href.slice(1), event.detail !== 0 && !paused);
  }
  return <div className="page-directory section-shell"><PageClouds routeId={routeId} paused={paused}/><div className="page-breadcrumb"><nav aria-label="Breadcrumb"><a href="/">The Soraverse</a><span aria-hidden="true">/</span>{routeId==='library'&&<><a href="/arts/">Arts & Culture</a><span aria-hidden="true">/</span></>}<span aria-current="page">{route.label}</span></nav><button className="page-motion" aria-pressed={paused} disabled={reducedMotion} onClick={()=>setPaused(!paused)}>{reducedMotion?'Reduced motion':paused?'Resume motion':'Pause motion'}</button></div>{contents[routeId]&&<nav className="page-contents" aria-label="On this page">{contents[routeId]!.map(link=><a href={link.href} key={link.href} onClick={event=>followAnchor(event,link.href)}>{link.label}</a>)}</nav>}</div>;
}
