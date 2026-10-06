import { useEffect, useRef } from 'react';
import type { AtmosphereController } from './atmosphere-scene';

export function Atmosphere({ paused }: { paused: boolean }) {
  const element = useRef<HTMLDivElement>(null);
  const engine = useRef<AtmosphereController | null>(null);
  const pausedRef = useRef(paused); pausedRef.current = paused;
  const intersecting = useRef(true);
  useEffect(() => {
    const container = element.current!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    const update = () => engine.current?.setRunning(!pausedRef.current && !motion.matches && intersecting.current && !document.hidden);
    const observer = new IntersectionObserver(entries => { intersecting.current = entries[0].isIntersecting; update(); }, { threshold: 0.02 });
    observer.observe(container);
    import('./atmosphere-scene').then(({ createAtmosphere }) => {
      if (cancelled) return;
      try { engine.current = createAtmosphere(container, motion.matches || pausedRef.current); update(); }
      catch { container.dataset.mode = 'fallback'; }
    }).catch(() => { container.dataset.mode = 'fallback'; });
    motion.addEventListener('change', update); document.addEventListener('visibilitychange', update);
    return () => { cancelled = true; observer.disconnect(); motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); engine.current?.destroy(); engine.current = null; };
  }, []);
  useEffect(() => { engine.current?.setRunning(!paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && intersecting.current && !document.hidden); }, [paused]);
  return <div className="atmosphere" ref={element} aria-hidden="true"><div className="sky-fallback"><img src="/assets/cloud.webp" alt="" width="1440" height="699"/></div></div>;
}
