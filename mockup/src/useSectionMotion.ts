import { useEffect } from 'react';

/** Progressive enhancement: content stays readable even when observers are unavailable. */
export function useSectionMotion(paused: boolean, isLibrary: boolean) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (paused || !('IntersectionObserver' in window)) {
      elements.forEach(el => { el.classList.remove('motion-ready'); el.classList.add('in-view'); });
      return;
    }
    elements.forEach(el => {
      el.style.setProperty('--reveal-delay', '0ms');
      el.classList.add('motion-ready');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight || el.classList.contains('in-view')) el.classList.add('in-view');
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Reveal once. Returning to content never makes the reader wait again.
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 50px 0px' });
    elements.filter(el => !el.classList.contains('in-view')).forEach(el => observer.observe(el));
    return () => {
      observer.disconnect();
      elements.forEach(el => el.classList.remove('motion-ready'));
    };
  }, [paused, isLibrary]);

  useEffect(() => {
    const rooms = Array.from(document.querySelectorAll<HTMLElement>('.room-backdrop'));
    if (paused || isLibrary) {
      rooms.forEach(room => { room.style.transform = ''; });
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      rooms.forEach(room => {
        const section = room.closest('section');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const travel = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
        room.style.transform = `translate3d(0, ${travel * 24}px, 0)`;
      });
    };
    const schedule = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      rooms.forEach(room => { room.style.transform = ''; });
    };
  }, [paused, isLibrary]);
}
