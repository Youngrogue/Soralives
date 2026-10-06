import { useEffect, useRef, useState } from 'react';
import './hero-atmosphere.css';

const HERO_FILM = '/media/hero/soraverse-cloud-reveal.mp4';
const HERO_POSTER = '/media/hero/soraverse-cloud-poster.webp';

type ConnectionPreference = EventTarget & { saveData?: boolean };

/** A decorative introduction. The still remains useful when motion is unavailable. */
export function HeroAtmosphere({ paused }: { paused: boolean }) {
  const element = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [intersecting, setIntersecting] = useState(false);
  const [painted, setPainted] = useState(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 600px)');
    const connection = (navigator as Navigator & { connection?: ConnectionPreference }).connection;
    const updatePreferences = () => setEligible(!motion.matches && !smallScreen.matches && !connection?.saveData);
    const updateVisibility = () => setVisible(!document.hidden);
    updatePreferences();
    updateVisibility();
    motion.addEventListener('change', updatePreferences);
    smallScreen.addEventListener('change', updatePreferences);
    connection?.addEventListener('change', updatePreferences);
    document.addEventListener('visibilitychange', updateVisibility);

    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      setIntersecting(entries.some(entry => entry.isIntersecting));
    }, { threshold: 0.02 });
    if (observer && element.current) observer.observe(element.current);
    else setIntersecting(true);

    // Two frames leave the poster and page content a first paint before any film request.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setPainted(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer?.disconnect();
      motion.removeEventListener('change', updatePreferences);
      smallScreen.removeEventListener('change', updatePreferences);
      connection?.removeEventListener('change', updatePreferences);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (painted && eligible && visible && intersecting && !paused && !finished && !failed) setRequested(true);
  }, [painted, eligible, visible, intersecting, paused, finished, failed]);

  useEffect(() => {
    // A new static preference releases an already requested video for this visit.
    if (requested && !eligible) setFinished(true);
  }, [requested, eligible]);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (paused || !eligible || !visible || !intersecting || finished || failed) {
      player.pause();
      return;
    }
    let cancelled = false;
    player.muted = true;
    player.play().catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
      player.pause();
    };
  }, [requested, paused, eligible, visible, intersecting, finished, failed]);

  const showVideo = requested && eligible && !finished && !failed;
  useEffect(() => {
    const player = video.current;
    return () => {
      if (!player) return;
      player.pause();
      player.removeAttribute('src');
      player.load();
    };
  }, [showVideo]);

  return <div
    className="hero-atmosphere"
    ref={element}
    aria-hidden="true"
    data-state={failed ? 'poster' : finished ? 'complete' : ready && showVideo ? 'ready' : 'poster'}
  >
    <img
      className="hero-atmosphere-poster"
      src={HERO_POSTER}
      alt=""
      width="1920"
      height="1080"
      fetchPriority="high"
      decoding="async"
      draggable="false"
      onError={event => { event.currentTarget.hidden = true; }}
    />
    {showVideo && <video
      className="hero-atmosphere-film"
      ref={video}
      src={HERO_FILM}
      poster={HERO_POSTER}
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
      onEnded={() => setFinished(true)}
      onError={() => setFailed(true)}
    />}
  </div>;
}
