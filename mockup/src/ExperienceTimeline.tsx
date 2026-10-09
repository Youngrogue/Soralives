import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { experienceItems } from './professional-content';
import { careerChapterProgress, careerFaceProgress, careerFrame } from './career-progress.mjs';
import type { CareerFrame } from './career-progress.mjs';
import './timeline.css';

const STICKY_TOP = 104;
const TOTAL = experienceItems.length;
type Layout = { mode: 'scroll' | 'row' | 'rail'; stageHeight: number; travel: number };
type Scene = { chapter: number; back: boolean };
type ReadingPosition = { inside: boolean; progress: number; chapter: number; back: boolean; mode: Layout['mode']; width: number; height: number };

function CompanyMark({ id, name, src }: { id: string; name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  return <span className={`journey-company-mark journey-mark-${id}`} aria-hidden="true">{failed ? <b>{id === 'gtbank' ? 'GT' : name}</b> : <img src={src} alt="" width="76" height="56" loading="lazy" onError={() => setFailed(true)}/>}</span>;
}

export function ExperienceTimeline({ paused = false }: { paused?: boolean }) {
  const wrapper = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const progressLine = useRef<HTMLSpanElement>(null);
  const chapters = useRef<(HTMLLIElement | null)[]>([]);
  const rotators = useRef<(HTMLDivElement | null)[]>([]);
  const [layout, setLayout] = useState<Layout>({ mode: 'row', stageHeight: 0, travel: 2400 });
  const layoutRef = useRef(layout);
  const [scene, setScene] = useState<Scene>({ chapter: 0, back: false });
  const sceneRef = useRef(scene);
  const [manualFaces, setManualFaces] = useState<Record<number, boolean>>({});
  const facesRef = useRef(manualFaces);
  const frameRef = useRef<CareerFrame>(careerFrame(0, TOTAL));
  const readingPosition = useRef<ReadingPosition | null>(null);
  const pendingPosition = useRef<ReadingPosition | null>(null);
  const motionReduced = useRef(false);

  function updateScene(next: Scene) {
    if (next.chapter !== sceneRef.current.chapter || next.back !== sceneRef.current.back) {
      sceneRef.current = next;
      setScene(next);
    }
  }

  function rememberPosition() {
    if (!wrapper.current || pendingPosition.current) return;
    const bounds = wrapper.current.getBoundingClientRect();
    readingPosition.current = {
      inside: bounds.top <= STICKY_TOP + 32 && bounds.bottom > STICKY_TOP + 80,
      progress: frameRef.current.progression,
      chapter: sceneRef.current.chapter,
      back: layoutRef.current.mode === 'scroll' ? sceneRef.current.back : Boolean(facesRef.current[sceneRef.current.chapter]),
      mode: layoutRef.current.mode,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  function paint(frame: CareerFrame, animateManual = false) {
    frameRef.current = frame;
    if (progressLine.current) progressLine.current.style.transform = `scaleX(${frame.progression})`;
    rotators.current.forEach((rotator, index) => {
      if (!rotator) return;
      const selected = index === frame.chapter;
      const transform = `rotateY(${-180 * (selected ? frame.turn : 0)}deg)`;
      if (rotator.style.transform !== transform) {
        rotator.style.transition = selected && animateManual ? 'transform var(--duration-flip, 450ms) var(--ease-in-out)' : 'none';
        rotator.style.transform = transform;
      }
    });
    updateScene({ chapter: frame.chapter, back: frame.turn >= 0.5 });
  }

  function positionRail(index: number, smooth = false) {
    const host = viewport.current;
    const node = chapters.current[index];
    if (!host || !node) return;
    const distance = node.getBoundingClientRect().left - host.getBoundingClientRect().left;
    host.scrollTo({ left: host.scrollLeft + distance, behavior: smooth && !paused && !motionReduced.current ? 'smooth' : 'instant' });
  }

  useLayoutEffect(() => {
    const desktop = matchMedia('(min-width: 1000px)');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const measure = () => {
      if (!stage.current || !wrapper.current) return;
      motionReduced.current = motion.matches;
      const stageHeight = Math.ceil(stage.current.getBoundingClientRect().height);
      const fits = stageHeight <= window.innerHeight - STICKY_TOP - 20;
      const mode: Layout['mode'] = !desktop.matches ? 'rail' : fits && !paused && !motion.matches ? 'scroll' : 'row';
      const next: Layout = { mode, stageHeight, travel: Math.round(Math.max(580, Math.min(740, window.innerHeight * 0.75))) * TOTAL };
      const previous = layoutRef.current;
      const saved = readingPosition.current;
      const resized = saved && (saved.width !== window.innerWidth || saved.height !== window.innerHeight);
      if (mode === previous.mode && stageHeight === previous.stageHeight && next.travel === previous.travel && !resized) return;
      // Only restore a reader actually inside this section. In particular, a
      // resize after navigation must never pull them back from another section.
      if (!pendingPosition.current && saved?.inside && (resized || previous.mode !== mode || previous.travel !== next.travel)) {
        pendingPosition.current = { ...saved };
      }
      if (previous.mode === 'scroll' && mode !== 'scroll') {
        const selected = pendingPosition.current ?? saved;
        facesRef.current = selected ? { [selected.chapter]: selected.back } : {};
        setManualFaces(facesRef.current);
      }
      layoutRef.current = next;
      setLayout(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (stage.current) observer.observe(stage.current);
    desktop.addEventListener('change', measure);
    motion.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      desktop.removeEventListener('change', measure);
      motion.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, [paused]);

  useLayoutEffect(() => {
    const root = wrapper.current;
    if (!root || layoutRef.current !== layout) return;
    const saved = pendingPosition.current;
    pendingPosition.current = null;
    if (layout.mode !== 'scroll') {
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${sceneRef.current.chapter / Math.max(1, TOTAL - 1)})`;
      rotators.current.forEach((node, index) => {
        if (node) { node.style.transition = 'none'; node.style.transform = `rotateY(${facesRef.current[index] ? -180 : 0}deg)`; }
      });
    }
    if (saved?.inside) {
      updateScene({ chapter: saved.chapter, back: saved.back });
      if (layout.mode === 'scroll') {
        const progress = saved.mode === 'scroll' ? saved.progress : careerFaceProgress(saved.chapter, TOTAL, saved.back);
        window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top - STICKY_TOP + progress * layout.travel, behavior: 'instant' });
        paint(careerFrame(progress, TOTAL));
      } else {
        window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top - STICKY_TOP, behavior: 'instant' });
      }
    }
    if (layout.mode === 'rail') positionRail(sceneRef.current.chapter);
    rememberPosition();
  }, [layout]);

  useEffect(() => {
    let request = 0;
    const update = () => {
      request = 0;
      const root = wrapper.current;
      const saved = readingPosition.current;
      if (!root || pendingPosition.current || layoutRef.current !== layout || (saved && (saved.width !== window.innerWidth || saved.height !== window.innerHeight))) return;
      if (layout.mode === 'scroll') paint(careerFrame((STICKY_TOP - root.getBoundingClientRect().top) / layout.travel, TOTAL));
      rememberPosition();
    };
    const schedule = () => { if (!request) request = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => { window.removeEventListener('scroll', schedule); cancelAnimationFrame(request); };
  }, [layout]);

  function selectChapter(index: number, smooth = false) {
    const root = wrapper.current;
    if (!root) return;
    if (layout.mode === 'scroll') {
      const progress = careerChapterProgress(index, TOTAL);
      window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top - STICKY_TOP + progress * layout.travel, behavior: 'instant' });
      paint(careerFrame(progress, TOTAL));
    } else {
      updateScene({ chapter: index, back: Boolean(facesRef.current[index]) });
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${index / Math.max(1, TOTAL - 1)})`;
      if (layout.mode === 'rail') positionRail(index, smooth);
    }
    rememberPosition();
  }

  function turnCard(index: number, keyboard = false) {
    const wasBack = layout.mode === 'scroll' ? index === sceneRef.current.chapter && sceneRef.current.back : Boolean(facesRef.current[index]);
    if (layout.mode === 'scroll') {
      const root = wrapper.current;
      if (!root) return;
      // Manual turns choose an actual stationary interval on the same scroll
      // sequence, so continued scrolling still closes this card and advances.
      const progress = careerFaceProgress(index, TOTAL, !wasBack);
      window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top - STICKY_TOP + progress * layout.travel, behavior: 'instant' });
      paint(careerFrame(progress, TOTAL), !keyboard);
    } else {
      const back = !wasBack;
      facesRef.current = { ...facesRef.current, [index]: back };
      setManualFaces(facesRef.current);
      updateScene({ chapter: index, back });
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${index / Math.max(1, TOTAL - 1)})`;
      const rotator = rotators.current[index];
      if (rotator) {
        rotator.style.transition = keyboard || paused || motionReduced.current ? 'none' : 'transform var(--duration-flip, 450ms) var(--ease-in-out)';
        rotator.style.transform = `rotateY(${back ? -180 : 0}deg)`;
      }
    }
    rememberPosition();
  }

  function followRail() {
    if (layout.mode !== 'rail' || !viewport.current) return;
    const left = viewport.current.getBoundingClientRect().left;
    let closest = 0;
    chapters.current.forEach((node, index) => {
      if (node && Math.abs(node.getBoundingClientRect().left - left) < Math.abs((chapters.current[closest]?.getBoundingClientRect().left ?? left) - left)) closest = index;
    });
    updateScene({ chapter: closest, back: Boolean(facesRef.current[closest]) });
    if (progressLine.current) progressLine.current.style.transform = `scaleX(${closest / Math.max(1, TOTAL - 1)})`;
    rememberPosition();
  }

  return <section id="experience" ref={wrapper} className={`career-journey journey-${layout.mode}`} style={layout.mode === 'scroll' ? { height: layout.stageHeight + layout.travel } : undefined} tabIndex={-1} aria-labelledby="journey-title">
    <div className="career-journey-stage" ref={stage}>
      <header className="journey-heading"><div><p className="tech-kicker">THE JOURNEY SO FAR</p><h3 id="journey-title">Different industries.<span>A connected perspective.</span></h3></div><a href="#toolkit" className="journey-skip">Skip to skills</a></header>
      <nav className="journey-years" aria-label="Career chapters"><div className="journey-year-line" aria-hidden="true"><span ref={progressLine}/></div>{experienceItems.map((item, index) => <button key={item.id} type="button" onClick={event => selectChapter(index, event.detail !== 0)} aria-current={scene.chapter === index ? 'step' : undefined} aria-controls={`experience-${item.id}`} className={`journey-year journey-accent-${item.accent}`}><span className="journey-year-dot" aria-hidden="true"/><span>{item.year === '2021 to now' ? '2021 to present' : item.year}</span><small>{item.company}</small></button>)}</nav>
      <div className="journey-viewport" ref={viewport} onScroll={followRail} tabIndex={layout.mode === 'rail' ? 0 : undefined} role={layout.mode === 'rail' ? 'region' : undefined} aria-label={layout.mode === 'rail' ? 'Career cards. Swipe or use the year buttons to explore.' : undefined} onKeyDown={event => {
        if (event.target !== event.currentTarget || layout.mode !== 'rail' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        selectChapter(Math.max(0, Math.min(TOTAL - 1, sceneRef.current.chapter + (event.key === 'ArrowRight' ? 1 : -1))));
      }}><ol className="journey-track" aria-label="Professional experience">{experienceItems.map((item, index) => {
        const active = scene.chapter === index;
        const back = layout.mode === 'scroll' ? active && scene.back : Boolean(manualFaces[index]);
        return <li key={item.id} ref={node => { chapters.current[index] = node; }} className={`journey-chapter journey-accent-${item.accent} ${active ? 'is-current' : ''}`} data-journey-index={index}>
          <article className="journey-card" id={`experience-${item.id}`} aria-label={`${item.company}, ${item.year}`}>
            <div className="journey-card-perspective" onClick={() => turnCard(index)}><div className="journey-card-turn" ref={node => { rotators.current[index] = node; }}>
              <div className="journey-card-face journey-card-front" aria-hidden={back}><div className="journey-company"><CompanyMark id={item.id} name={item.company} src={item.logo}/><h4>{item.company}{item.id === 'shell' && <small>SNEPCo</small>}</h4><p>{item.sector}</p></div><p className="journey-period">{item.period}</p><h5>{item.role}</h5><p className="journey-position">{item.position}</p><span className="journey-card-number" aria-hidden="true">0{index + 1}</span></div>
              <div className="journey-card-face journey-card-back" id={`journey-detail-${item.id}`} aria-hidden={!back}><p className="journey-back-label">THE {item.company.toUpperCase()} CHAPTER</p><h4>{item.summary}</h4><p className="journey-detail">{item.detail}</p><ul className="journey-skills" aria-label={`${item.company} skills`}>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
            </div></div>
            <button className="journey-card-control" type="button" onClick={event => turnCard(index, event.detail === 0)} aria-pressed={back} aria-controls={`journey-detail-${item.id}`} aria-label={`Turn ${item.company} card to ${back ? 'show the overview' : 'read the story'}`}><span>{back ? 'Show overview' : 'Read the story'}</span><span className="journey-face-indicator" aria-hidden="true"><i className={!back ? 'is-visible' : ''}/><i className={back ? 'is-visible' : ''}/></span></button>
          </article>
        </li>;
      })}</ol></div>
      <div className="journey-footnote"><p>{layout.mode === 'scroll' ? 'Scroll to turn each chapter. Stop to read. Scroll back to revisit.' : layout.mode === 'rail' ? 'Swipe through the years. Tap a card to read its story.' : 'Four chapters, one connected perspective. Tap a card to read its story.'}</p><span>0{scene.chapter + 1}<span aria-hidden="true"> / </span><span className="sr-only">of </span>04</span></div>
    </div>
  </section>;
}
