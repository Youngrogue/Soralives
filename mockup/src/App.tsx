import { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { Library } from './Library';
import { moveToAnchor, ordinaryClick } from './navigation';
import { Home } from './Home';
import { Arrow, Star } from './Icons';
import { socials } from './content';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

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
  return <footer id="contact" className="site-footer" tabIndex={-1}><div className="section-shell"><div className="footer-top"><Label>LET'S CROSS PATHS</Label><h2>Good things begin<br/>with <em>a conversation.</em></h2><div className="email-line"><a href="mailto:Him@soralives.xyz">Him@soralives.xyz <Arrow diagonal/></a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.4"/></svg><span role="status">{copyState==='copied'?'Copied':copyState==='failed'?'Copy failed':'Copy'}</span></button></div></div><div className="footer-links"><div><span className="eyebrow">LISTEN</span><External href="https://soundcloud.com/soralive">SoundCloud <Arrow diagonal/></External><External href="https://linktr.ee/rogueskye">Playlists & more <Arrow diagonal/></External></div><div><span className="eyebrow">EXPLORE</span><External href="https://delphiatlas.com/">Delphi Atlas <Arrow diagonal/></External><External href="https://hades.soralives.xyz/">Hades <Arrow diagonal/></External><a href="/library/">The Library <Arrow/></a><External href="https://tobiarogunmati.com/">Professional site <Arrow diagonal/></External></div><div><span className="eyebrow">READ</span><External href="https://substack.com/@soralive">Substack <Arrow diagonal/></External></div><div><span className="eyebrow">CONNECT</span>{socials.filter(s=>s.label!=='Substack').map(s=><External key={s.label} href={s.url}>{s.label}<Arrow diagonal/></External>)}</div></div><div className="footer-base"><a className="brand" href="/"><Star/><span>soralives.</span></a><span>A LITTLE CORNER OF A VERY BIG UNIVERSE.</span><a href="#top" onClick={e=>{if(ordinaryClick(e)){e.preventDefault();moveToAnchor('top');}}}>Back to the sky ↑</a></div></div></footer>;
}

export function App({ isLibrary }: { isLibrary: boolean }) {
  const [reducedMotion,setReducedMotion] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused,setPaused] = useState(false);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReducedMotion(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
    document.querySelectorAll('.reveal,.world-section').forEach(el=>observer.observe(el));
    const onHash=()=>{let id='';try{id=decodeURIComponent(window.location.hash.slice(1));}catch{return;}if(id)moveToAnchor(id,false);};
    if(!isLibrary){onHash();window.addEventListener('hashchange',onHash);}
    return()=>{observer.disconnect();window.removeEventListener('hashchange',onHash);};
  },[isLibrary]);
  return <div id="top" className={paused||reducedMotion?'site motion-paused':'site'}><a className="skip-link" href="#main" onClick={e=>{if(ordinaryClick(e)){e.preventDefault();moveToAnchor('main',false);}}}>Skip to content</a><Header isLibrary={isLibrary}/><main id="main" tabIndex={-1}>{isLibrary?<Library/>:<Home paused={paused || reducedMotion} setPaused={setPaused} reducedMotion={reducedMotion}/>}</main><Footer/></div>;
}
