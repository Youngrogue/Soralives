import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Arrow } from './Icons';
import { WorldArt } from './WorldArt';
import { experienceItems, professionalProjects, toolkitGroups } from './professional-content';
import { MediaViewer } from './MediaViewer';
import type { ProjectMediaSelection } from './MediaViewer';
import './tech.css';

function SkillIcon({ type }: { type: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === 'delivery' ? <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 10l2 2 5-5M9 16h6"/></>
      : type === 'code' ? <><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></>
      : type === 'systems' ? <><rect x="2" y="3" width="8" height="7" rx="1"/><rect x="14" y="14" width="8" height="7" rx="1"/><path d="M14 6h4v5M6 13v5h4"/></>
      : type === 'design' ? <><path d="M4 19 6 12 16 2l6 6-10 10-8 1Zm2-7 6 6M13 5l6 6M3 22h18"/></>
      : type === 'data' ? <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/></>
      : <><path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2ZM20 2v4m-2-2h4"/></>}
  </svg>;
}

function CompanyMark({ id, name, src }: { id: string; name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  return <span className={`company-mark company-mark-${id}`} aria-hidden="true">{failed ? <b>{id === 'gtbank' ? 'GT' : name}</b> : <img src={src} alt="" width="82" height="60" loading="lazy" onError={() => setFailed(true)}/>}</span>;
}

function ExperienceTimeline({ paused }: { paused: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [wide, setWide] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [list, setList] = useState(false);
  const [current, setCurrent] = useState(0);
  const [stageFits, setStageFits] = useState(false);
  const [resizeEpoch, setResizeEpoch] = useState(0);
  const [geometry, setGeometry] = useState({ travel: 0, height: 0 });
  const preservePosition = useRef<number | null>(null);
  const currentPosition = useRef(0);
  const engaged = useRef(false);
  const previousPaused = useRef(paused);
  const scrollDriven = wide && stageFits && !list && !reduced && !paused;
  const listMode = list || reduced || paused;

  function stops() {
    const rail = track.current;
    const view = viewport.current;
    if (!rail || !view) return [0, 0, 0, 0];
    const cards = Array.from(rail.children) as HTMLElement[];
    const start = cards[0]?.offsetLeft ?? 0;
    const maximum = Math.max(0, rail.scrollWidth - view.clientWidth);
    return cards.map(card => Math.min(maximum, card.offsetLeft - start));
  }

  function updateCurrent(offset: number) {
    if (preservePosition.current !== null) return;
    const positions = stops();
    let next = 0;
    if (offset >= positions[positions.length - 1] - 1 && offset > 0) next = positions.length - 1;
    else positions.forEach((position, index) => { if (Math.abs(position - offset) < Math.abs(positions[next] - offset)) next = index; });
    currentPosition.current = next;
    setCurrent(previous => previous === next ? previous : next);
  }

  useEffect(() => {
    const remember = () => {
      const bounds = wrapper.current?.getBoundingClientRect();
      engaged.current = Boolean(bounds && bounds.top <= 112 && bounds.bottom > 160);
    };
    remember();
    window.addEventListener('scroll', remember, { passive: true });
    return () => window.removeEventListener('scroll', remember);
  }, []);

  useEffect(() => {
    const desktop = matchMedia('(min-width: 1000px) and (min-height: 760px)');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let initial = true;
    const update = () => {
      if (!initial && engaged.current) preservePosition.current = currentPosition.current;
      initial = false;
      setWide(desktop.matches);
      setReduced(motion.matches);
    };
    update();
    desktop.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => { desktop.removeEventListener('change', update); motion.removeEventListener('change', update); };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const travel = Math.max(0, (track.current?.scrollWidth ?? 0) - (viewport.current?.clientWidth ?? 0));
      const height = stage.current?.offsetHeight ?? 0;
      setStageFits(height <= window.innerHeight - 110);
      setGeometry(previous => previous.travel === travel && previous.height === height ? previous : { travel, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (stage.current) observer.observe(stage.current);
    if (viewport.current) observer.observe(viewport.current);
    const resize = () => {
      if (engaged.current) preservePosition.current = currentPosition.current;
      measure();
      setResizeEpoch(value => value + 1);
    };
    window.addEventListener('resize', resize);
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
  }, [scrollDriven, listMode]);

  useLayoutEffect(() => {
    if (previousPaused.current !== paused && engaged.current) preservePosition.current = currentPosition.current;
    previousPaused.current = paused;
  }, [paused]);

  useLayoutEffect(() => {
    const index = preservePosition.current;
    if (index === null) return;
    // Keep the same career chapter visible when the visitor changes reading modes.
    const frame = requestAnimationFrame(() => {
      const rail = track.current;
      const view = viewport.current;
      const sequence = wrapper.current;
      if (!rail || !view || !sequence) return;
      preservePosition.current = null;
      const position = stops()[index];
      if (listMode) {
        const card = rail.querySelector<HTMLElement>(`[data-career-index="${index}"]`);
        if (card) window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - 112, behavior: 'instant' });
      } else if (scrollDriven) {
        window.scrollTo({ top: window.scrollY + sequence.getBoundingClientRect().top - 100 + position, behavior: 'instant' });
      } else {
        view.scrollLeft = position;
        window.scrollTo({ top: window.scrollY + sequence.getBoundingClientRect().top - 112, behavior: 'instant' });
      }
      setCurrent(index);
      currentPosition.current = index;
    });
    return () => cancelAnimationFrame(frame);
  }, [listMode, scrollDriven, geometry, resizeEpoch, paused, reduced]);

  useEffect(() => {
    const timeline = wrapper.current;
    const rail = track.current;
    if (!scrollDriven || !timeline || !rail) {
      if (rail) rail.style.transform = '';
      return;
    }
    if (viewport.current) viewport.current.scrollLeft = 0;
    let frame = 0;
    const update = () => {
      const progress = geometry.travel > 0 ? Math.min(1, Math.max(0, (100 - timeline.getBoundingClientRect().top) / geometry.travel)) : 0;
      rail.style.transform = `translate3d(${-progress * geometry.travel}px,0,0)`;
      timeline.style.setProperty('--career-progress', `${progress * 100}%`);
      updateCurrent(progress * geometry.travel);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); rail.style.transform = ''; };
  }, [scrollDriven, geometry]);

  function reveal(index: number) {
    const next = Math.max(0, Math.min(experienceItems.length - 1, index));
    const position = stops()[next];
    if (scrollDriven && wrapper.current) {
      const top = window.scrollY + wrapper.current.getBoundingClientRect().top - 100;
      window.scrollTo({ top: top + position, behavior: 'smooth' });
    } else if (!listMode && viewport.current) {
      viewport.current.scrollTo({ left: position, behavior: reduced || paused ? 'instant' : 'smooth' });
    }
    setCurrent(next);
    currentPosition.current = next;
  }

  const style = scrollDriven && geometry.travel > 0 ? { height: geometry.height + geometry.travel } : undefined;
  return <div id="experience" className={`experience-sequence ${scrollDriven ? 'experience-scroll-driven' : ''} ${listMode ? 'experience-list-mode' : ''}`} ref={wrapper} style={style} tabIndex={-1}>
    <div className="experience-stage" ref={stage}>
      <div className="experience-heading"><div><p className="tech-kicker">THE JOURNEY SO FAR</p><h3>Different industries.<br/><span>A connected perspective.</span></h3></div><div className="experience-reading-options"><button type="button" onClick={() => { preservePosition.current = current; setList(!list); }} aria-pressed={listMode} aria-controls="experience-track" disabled={reduced || paused}>{listMode ? (reduced || paused ? 'List view' : 'Timeline view') : 'View as list'}<span aria-hidden="true">{listMode ? '↔' : '☷'}</span></button><a href="#projects">Skip to projects <span aria-hidden="true">↓</span></a></div></div>
      <div className="experience-viewport" ref={viewport} onScroll={() => { if (!scrollDriven && !listMode && viewport.current) updateCurrent(viewport.current.scrollLeft); }}>
        <ol id="experience-track" className="experience-track" ref={track} onFocusCapture={event => { const item = (event.target as HTMLElement).closest<HTMLElement>('[data-career-index]'); if (item && !listMode) reveal(Number(item.dataset.careerIndex)); }}>
          {experienceItems.map((item, index) => <li key={item.id} className={`career-item career-${item.accent}`} data-career-index={index}>
            <div className="career-timeline-label"><span className="career-timeline-dot"/><span>{item.year}</span><span className="career-step">0{index + 1}</span></div>
            <article className="career-card" id={`experience-${item.id}`} tabIndex={-1}>
              <div className="career-company"><CompanyMark id={item.id} name={item.company} src={item.logo}/><div><h4>{item.company}{item.id === 'shell' && <small>SNEPCo</small>}</h4><span>{item.sector}</span></div></div>
              <p className="career-period">{item.period}</p><h5>{item.role}</h5><p className="career-position">{item.position}</p><p className="career-story">{item.summary}</p><p className="career-detail">{item.detail}</p><ul className="career-skills" aria-label={`${item.company} skills`}>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            </article>
          </li>)}
        </ol>
      </div>
      <div className="experience-bottom"><p>{listMode ? 'Four chapters. A wider view.' : scrollDriven ? 'Keep scrolling to follow the story' : 'Swipe to explore the timeline'}<span aria-hidden="true">{listMode ? '✦' : '→'}</span></p>{!listMode && <><div className="career-position-nav" aria-label="Choose career chapter">{experienceItems.map((item, index) => <button key={item.id} type="button" onClick={() => reveal(index)} aria-label={`Show ${item.company}`} aria-current={current === index ? 'step' : undefined}><span/></button>)}</div><div className="career-arrows"><span aria-hidden="true">0{current + 1} <small>/ 04</small></span><button type="button" aria-label="Previous career chapter" aria-controls="experience-track" disabled={current === 0} onClick={() => reveal(current - 1)}><Arrow/></button><button type="button" aria-label="Next career chapter" aria-controls="experience-track" disabled={current === experienceItems.length - 1} onClick={() => reveal(current + 1)}><Arrow/></button></div></>}</div>
    </div>
  </div>;
}

export function TechSection({ paused = false }: { paused?: boolean }) {
  const [media, setMedia] = useState<ProjectMediaSelection | null>(null);
  return <section id="tech" className="professional-section" tabIndex={-1} aria-labelledby="professional-title">
    <div className="section-shell">
      <div className="professional-intro"><div><p className="tech-kicker">TECH & BUSINESS</p><h2 id="professional-title">Curiosity.<br/><span>Put to work.</span></h2></div><div className="professional-intro-copy"><WorldArt kind="tech" className="professional-world-art"/><p>I connect business needs with technical delivery. From IT operations and corporate banking to technology advisory and building products of my own.</p><a href="https://tobiarogunmati.com/" target="_blank" rel="noreferrer" className="professional-text-link">The full professional story <Arrow diagonal/></a></div></div>
      <ExperienceTimeline paused={paused}/>
      <div id="toolkit" className="professional-toolkit" tabIndex={-1}><div className="toolkit-intro"><p className="tech-kicker">HOW I WORK</p><h3>A versatile toolkit.<br/>A practical mindset.</h3><p>Business understanding, technical fluency and the tools to bring an idea into the world.</p><a className="professional-text-link" href="https://tobiarogunmati.com/" target="_blank" rel="noreferrer">Explore my skills & tools <Arrow diagonal/></a></div><div className="toolkit-groups">{toolkitGroups.map(group => <div className="toolkit-group" key={group.title}><span className={`toolkit-icon toolkit-icon-${group.icon}`}><SkillIcon type={group.icon}/></span><div><h4>{group.title}</h4><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div></div>)}</div></div>
      <div id="projects" className="professional-projects" tabIndex={-1}><div className="project-section-heading"><div><p className="tech-kicker">FROM CURIOSITY TO SOMETHING REAL</p><h3>Things I'm building<span>.</span></h3></div><span className="project-count">THREE IDEAS<br/>TAKING SHAPE <span aria-hidden="true">↘</span></span></div>
        {professionalProjects.map(project => <article className={`showcase-panel showcase-${project.id}`} id={project.id} key={project.id} tabIndex={-1} aria-labelledby={`title-${project.id}`}>
          <div className="showcase-copy"><div className="showcase-identity"><span className="showcase-glyph"><img src={`/media/projects/${project.id}.logo.${project.id === 'delphi' ? 'webp' : 'svg'}`} alt="" width="44" height="44"/></span><h4 id={`title-${project.id}`}>{project.name}</h4><span className={`showcase-status ${project.id === 'odyssey' ? 'status-progress' : ''}`}><i/>{project.status}</span></div><h5>{project.headline}</h5><p className="showcase-summary">{project.summary}</p>{project.id === 'odyssey' && <p className="showcase-planned">The vision, currently in development</p>}<ul className="showcase-highlights">{project.highlights.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><div className="showcase-stack"><span>{project.id === 'odyssey' ? 'LANDING STACK' : 'BUILT WITH'}</span><ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul></div><div className="showcase-actions">{project.url && <a className="project-visit" href={project.url} target="_blank" rel="noreferrer">{project.linkLabel}<Arrow diagonal/></a>}<button className="project-film-button" type="button" onClick={() => setMedia({ project, kind: 'film' })}><span className="film-play" aria-hidden="true">▶</span><span>Watch {project.filmLabel.toLowerCase()}<small>{project.duration}</small></span></button></div></div>
          <div className="showcase-visual"><div className="showcase-window"><div className="showcase-window-bar"><span aria-hidden="true"><i/><i/><i/></span><span>{project.id === 'odyssey' ? 'ODYSSEY / IN DEVELOPMENT' : project.url?.replace('https://', '').replace(/\/$/, '')}</span><span className="window-view-label">{project.screenshotLabel}</span></div><button type="button" className="project-screen-button" onClick={() => setMedia({ project, kind: 'image' })} aria-label={`Enlarge ${project.name} screenshot`}><img src={project.screenshot} alt={project.screenshotAlt} width={project.id === 'delphi' ? 1600 : project.id === 'odyssey' ? 1440 : 1920} height={project.id === 'delphi' ? 1133 : project.id === 'odyssey' ? 1020 : 1080} loading="lazy"/><span className="screen-enlarge"><svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 3H3v4m10-4h4v4M3 13v4h4m6 0h4v-4"/></svg> Take a closer look</span></button></div><div className="showcase-caption"><span>{project.id === 'delphi' ? 'Product view, September 2026' : project.screenshotLabel}</span><span aria-hidden="true">✦</span></div></div>
        </article>)}
      </div>
      <div id="services" className="professional-enquiries" tabIndex={-1}><div><p className="tech-kicker">LET'S BUILD SOMETHING USEFUL</p><h3>A product, a problem<br/>or a possibility?</h3></div><div><p>Product thinking. Technical project management. Business strategy and partnerships. I enjoy making complex things work.</p><a href="mailto:Him@soralives.xyz">Tell me what you have in mind <Arrow diagonal/></a></div></div>
    </div>
    {media && <MediaViewer selection={media} onClose={() => setMedia(null)}/>}
  </section>;
}
