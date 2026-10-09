import { useEffect, useRef, useState } from 'react';
import { HeroScene } from './HeroScene';
import './hero-atmosphere.css';

const HERO_FILM = '/media/hero/soraverse-cloud-reveal.mp4';
const HERO_POSTER = '/media/hero/soraverse-cloud-poster.webp';
type ConnectionPreference = EventTarget & { saveData?: boolean };

/** Content paints immediately. Local cloud layers carry motion while the film buffers. */
export function HeroAtmosphere({ paused }: { paused: boolean }) {
  const element = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const leftCloud = useRef<HTMLDivElement>(null);
  const rightCloud = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const [filmEligible, setFilmEligible] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = element.current!;
    const hero = root.closest('section')!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 601px)');
    const connection = (navigator as Navigator & { connection?: ConnectionPreference }).connection;
    let inView = true;
    let frame = 0;
    const update = () => {
      const permitted = !motion.matches && !connection?.saveData;
      setFilmEligible(permitted && desktop.matches);
      setActive(permitted && !document.hidden && inView);
    };
    const position = () => {
      frame = 0;
      if (motion.matches || connection?.saveData || pausedRef.current || document.hidden) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      // Set transforms on their elements rather than invalidating every descendant.
      if (backdrop.current) backdrop.current.style.transform = `translate3d(0,${progress * 100}px,0) scale(${1.025 + progress * .075})`;
      if (leftCloud.current) leftCloud.current.style.transform = `translate3d(${-progress * 30}%,${progress * 10}%,0)`;
      if (rightCloud.current) rightCloud.current.style.transform = `translate3d(${progress * 30}%,${progress * 15}%,0)`;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(position); };
    const preferences = () => { update(); if (motion.matches || connection?.saveData) {
      backdrop.current?.style.removeProperty('transform');
      leftCloud.current?.style.removeProperty('transform');
      rightCloud.current?.style.removeProperty('transform');
    } else scroll(); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => { inView = entries[0].isIntersecting; update(); }, { threshold: 0 });
    observer?.observe(hero);
    update(); position();
    motion.addEventListener('change', preferences);
    desktop.addEventListener('change', preferences);
    connection?.addEventListener('change', preferences);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame); observer?.disconnect();
      motion.removeEventListener('change', preferences);
      desktop.removeEventListener('change', preferences);
      connection?.removeEventListener('change', preferences);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (!active || paused || failed) { player.pause(); return; }
    // Preserve the final sky instead of removing the film and flashing its first frame.
    if (player.ended) return;
    let cancelled = false;
    player.play().catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; player.pause(); };
  }, [active, paused, filmEligible, failed]);

  const moving = active && !paused;
  return <div className="hero-atmosphere" ref={element} aria-hidden="true" data-motion={moving ? 'running' : 'paused'} data-state={ready && !failed && filmEligible ? 'ready' : 'poster'}>
    <div className="hero-sky-backdrop" ref={backdrop}>
      <img className="hero-atmosphere-poster" src={HERO_POSTER} alt="" width="1920" height="1080" fetchPriority="high" decoding="async" draggable="false"/>
      {filmEligible && !failed && <video className="hero-atmosphere-film" ref={video} src={HERO_FILM} poster={HERO_POSTER} muted playsInline preload="auto" disablePictureInPicture disableRemotePlayback tabIndex={-1} onPlaying={() => setReady(true)} onError={() => setFailed(true)}/>}
    </div>
    <div className="hero-sky-tint"/>
    <HeroScene paused={!moving}/>
    <div ref={leftCloud} className="hero-cloud-bank hero-cloud-bank-left"><img src="/assets/cloud.webp" width="1440" height="699" alt="" draggable="false"/></div>
    <div ref={rightCloud} className="hero-cloud-bank hero-cloud-bank-right"><img src="/assets/cloud.webp" width="1440" height="699" alt="" draggable="false"/></div>
  </div>;
}
