import { useEffect, useId, useRef, useState } from 'react';
import { Arrow } from './Icons';
import { wallPieces } from './living-content';
import './living.css';

function Sculpture() {
  const id = useId().replaceAll(':', '');
  return <svg className="wall-sculpture" viewBox="0 0 400 340" aria-hidden="true">
    <defs><linearGradient id={`${id}-metal`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f8f5ed"/><stop offset=".22" stopColor="#a5c2de"/><stop offset=".4" stopColor="#203a65"/><stop offset=".52" stopColor="#f8f5ed"/><stop offset=".7" stopColor="#7b9abd"/><stop offset="1" stopColor="#17202a"/></linearGradient><radialGradient id={`${id}-shadow`}><stop stopColor="#17202a" stopOpacity=".4"/><stop offset="1" stopColor="#17202a" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="210" cy="295" rx="150" ry="30" fill={`url(#${id}-shadow)`}/>
    <path d="m100 272 128-21 90 23-125 28Z" fill="#fffdf8"/><path d="m100 272 93 30v16l-93-29Z" fill="#a9b8c8"/><path d="m193 302 125-28v16l-125 28Z" fill="#d7e1e9"/>
    <g fill="none" stroke={`url(#${id}-metal)`} strokeWidth="30"><ellipse cx="205" cy="150" rx="64" ry="113" transform="rotate(-30 205 150)"/><ellipse cx="202" cy="152" rx="110" ry="55" transform="rotate(-52 202 152)"/></g>
    <path d="M158 56c-24 22-23 75 0 127" fill="none" stroke="#fffdf8" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}

export function IdeasWall({ paused }: { paused: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 3) { setActive(children.length - 1); return; }
      const left = el.getBoundingClientRect().left;
      let closest = 0;
      children.forEach((child, index) => { if (Math.abs(child.getBoundingClientRect().left - left) < Math.abs(children[closest].getBoundingClientRect().left - left)) closest = index; });
      setActive(closest);
    };
    el.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    update();
    return () => { el.removeEventListener('scroll', update); resize.disconnect(); };
  }, []);

  function go(index: number, instant = false) {
    const el = track.current;
    if (!el) return;
    const positions = Array.from(el.children).map(child => Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + child.getBoundingClientRect().left - el.getBoundingClientRect().left)));
    // Several cards can share the same end position on a wide screen.
    // Step back to an earlier reachable position instead of staying at the end.
    if (index < active) while (index > 0 && positions[index] >= el.scrollLeft - 3) index--;
    if (positions[index] === undefined) return;
    el.scrollTo({ left: positions[index], behavior: paused || instant ? 'instant' : 'smooth' });
  }

  return <section id="ideas-wall" className="ideas-wall" aria-labelledby="wall-title" tabIndex={-1}>
    <div className="wall-heading"><div><p className="eyebrow">A WALL, ALWAYS IN THE MAKING</p><h3 id="wall-title">Things I<br/><em>stand by.</em></h3></div><div><p>Words to live with. Art to think through.<br/>A little colour against the ordinary.</p><a href="#wall-pieces" className="wall-instruction">Scroll across to explore <Arrow/></a></div></div>
    <div ref={track} id="wall-pieces" className="wall-track" role="region" aria-label="Wall of ideas. Use the arrow keys to explore." tabIndex={0} onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      const next = event.key === 'ArrowRight' ? Math.min(active + 1, wallPieces.length - 1) : event.key === 'ArrowLeft' ? Math.max(active - 1, 0) : event.key === 'Home' ? 0 : event.key === 'End' ? wallPieces.length - 1 : null;
      if (next !== null) { event.preventDefault(); go(next, true); }
    }}>
      {wallPieces.map((piece, index) => <figure className={`wall-piece wall-${piece.kind}`} key={piece.id} aria-label={`Wall piece ${index + 1} of ${wallPieces.length}`}>
        <span className="wall-piece-label">{piece.label}</span>
        {piece.kind === 'sculpture' && <Sculpture/>}
        {piece.image && <img src={piece.image} alt={piece.alt} width="1086" height="1448" loading="lazy"/>}
        {piece.kind === 'graffiti' && <span className="wall-graffiti-mark" aria-hidden="true">✳</span>}
        <div className="wall-words"><blockquote>{piece.text}</blockquote><figcaption>{piece.credit}</figcaption></div>
        <span className="wall-piece-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} / SORA</span>
      </figure>)}
    </div>
    <div className="wall-controls"><span className="wall-count" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} <span>/ {String(wallPieces.length).padStart(2, '0')}</span></span><div><button type="button" onClick={event => go(active - 1, event.detail === 0)} disabled={active === 0} aria-label="Previous wall piece" aria-controls="wall-pieces"><Arrow/></button><button type="button" onClick={event => go(active + 1, event.detail === 0)} disabled={active === wallPieces.length - 1} aria-label="Next wall piece" aria-controls="wall-pieces"><Arrow/></button></div></div>
  </section>;
}
