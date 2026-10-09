import { useEffect, useRef } from 'react';
import type { HeroSceneController } from './HeroSceneEngine';

type ConnectionPreference = EventTarget & { saveData?: boolean };

/** The moon has a CSS fallback; WebGL only enhances decoration, never navigation. */
export function HeroScene({ paused }: { paused: boolean }) {
  const element = useRef<HTMLDivElement>(null);
  const controller = useRef<HeroSceneController | null>(null);
  const syncRef = useRef<() => void>(() => {});
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    const container = element.current!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: ConnectionPreference }).connection;
    let cancelled = false;
    let loading = false;
    let visible = true;
    const sync = () => {
      const running = !pausedRef.current && !motion.matches && !connection?.saveData && !document.hidden && visible;
      controller.current?.setRunning(running);
      // Save Data keeps the lightweight still and does not fetch Three.js or the elevation map.
      if (connection?.saveData || controller.current || loading) return;
      loading = true;
      import('./HeroSceneEngine').then(({ createHeroScene }) => {
        if (cancelled) return;
        try { controller.current = createHeroScene(container); sync(); }
        catch { container.dataset.mode = 'fallback'; }
      }).catch(() => { container.dataset.mode = 'fallback'; });
    };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer?.observe(container);
    syncRef.current = sync;
    motion.addEventListener('change', sync);
    connection?.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelled = true; observer?.disconnect(); syncRef.current = () => {};
      motion.removeEventListener('change', sync);
      connection?.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      controller.current?.destroy(); controller.current = null;
    };
  }, []);
  useEffect(() => { syncRef.current(); }, [paused]);
  return <div className="hero-scene" ref={element} data-mode="fallback"><div className="hero-moon-fallback"/></div>;
}
