import { useEffect, useRef, useState } from 'react';
import { useSectionMotion } from './useSectionMotion';
import { Header } from './Header';
import { moveToAnchor, ordinaryClick } from './navigation';
import { Star } from './Icons';
import { SocialIcon } from './SocialIcon';
import { socials } from './content';
import type { RouteId } from './routes.mjs';
import { worlds } from './routes.mjs';
import type { PageProps } from './page-types';
import { PageDirectory } from './PageDirectory';
import type { ReactNode, AnchorHTMLAttributes, ComponentType } from 'react';

function External({ href, children, className = '', ...rest }: { href: string; children: ReactNode; className?: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const email = href.startsWith('mailto:');
  return <a {...rest} href={href} className={className} target={email ? undefined : '_blank'} rel={email ? undefined : 'noreferrer'}>{children}</a>;
}
function Label({ children }: { children: ReactNode }) { return <p className="eyebrow section-label"><span/>{children}</p>; }

function Footer() {
  const [copyState,setCopyState] = useState('idle');
  const copyTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(copyTimer.current)clearTimeout(copyTimer.current);},[]);
  async function copyEmail() {if(copyTimer.current)clearTimeout(copyTimer.current);try {await navigator.clipboard.writeText('Him@soralives.xyz');setCopyState('copied');}catch {setCopyState('failed');}copyTimer.current=setTimeout(()=>setCopyState('idle'),4000);}
  return <footer id="contact" className="site-footer" tabIndex={-1}><div className="section-shell"><div className="footer-top"><Label>LET'S CROSS PATHS</Label><h2>Good things begin<br/>with <em>a conversation.</em></h2><div className="email-line"><a href="mailto:Him@soralives.xyz">Him@soralives.xyz </a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.4"/></svg><span role="status">{copyState==='copied'?'Copied':copyState==='failed'?'Copy failed':'Copy'}</span></button></div></div><div className="footer-links"><div><span className="eyebrow">LISTEN</span><External href="https://soundcloud.com/soralive">SoundCloud </External><External href="https://linktr.ee/rogueskye">Playlists & more </External></div><div><span className="eyebrow">EXPLORE</span><External href="https://delphiatlas.com/">Delphi Atlas </External><External href="https://hades.soralives.xyz/">Hades </External><a href="/library/">The Library </a><External href="https://tobiarogunmati.com/">Professional site </External></div><div><span className="eyebrow">ELSEWHERE</span><External href="https://substack.com/@soralive">Substack profile </External></div><div><span className="eyebrow">CONNECT</span>{socials.filter(s=>s.label!=='Substack').map(s=><External key={s.label} href={s.url}><SocialIcon platform={s.label}/><span>{s.label}</span></External>)}</div></div><div className="footer-base"><a className="brand" href="/"><Star/><span>soralives.</span></a><span>A LITTLE CORNER OF A VERY BIG UNIVERSE.</span><a href="#top" onClick={e=>{if(ordinaryClick(e)){e.preventDefault();moveToAnchor('top');}}}>Back to top ↑</a></div></div></footer>;
}

export function App({ routeId, Page }: { routeId: RouteId; Page: ComponentType<PageProps> }) {
  const isLibrary = routeId === 'library';
  const [reducedMotion,setReducedMotion] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused,setPaused] = useState(()=>{try{return sessionStorage.getItem('soraverse-motion')==='paused';}catch{return false;}});
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReducedMotion(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  useEffect(()=>{try{sessionStorage.setItem('soraverse-motion',paused?'paused':'on');}catch{/* Storage can be unavailable in private contexts. */}document.documentElement.dataset.motion=paused||reducedMotion?'paused':'on';},[paused,reducedMotion]);
  useSectionMotion(paused || reducedMotion, isLibrary);
  useEffect(()=>{
    const onHash=()=>{let id='';try{id=decodeURIComponent(window.location.hash.slice(1));}catch{return;}if(id)moveToAnchor(id,false);};
    if(!isLibrary){onHash();window.addEventListener('hashchange',onHash);}
    return()=>{window.removeEventListener('hashchange',onHash);};
  },[isLibrary]);
  return <div id="top" data-page={routeId} className={`site page-${routeId}${paused||reducedMotion?' motion-paused':''}`}><a className="skip-link" href="#main" onClick={e=>{if(ordinaryClick(e)){e.preventDefault();moveToAnchor('main',false);}}}>Skip to content</a><Header routeId={routeId} paused={paused||reducedMotion}/><main id="main" tabIndex={-1}>{routeId!=='home'&&routeId!=='not-found'&&<PageDirectory routeId={routeId} paused={paused||reducedMotion} setPaused={setPaused} reducedMotion={reducedMotion}/>}<Page paused={paused||reducedMotion} setPaused={setPaused} reducedMotion={reducedMotion}/></main>{worlds.some(world=>world.id===routeId)&&<nav className="other-worlds section-shell" aria-label="Explore another world"><span className="eyebrow">ANOTHER SIDE OF THE SORAVERSE</span><div>{worlds.filter(world=>world.id!==routeId).map(world=><a key={world.id} href={world.path}>{world.label}</a>)}</div></nav>}<Footer/></div>;
}
