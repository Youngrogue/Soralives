import { useEffect, useRef, useState } from 'react';
import { professionalProjects } from './professional-content';
import { MediaViewer } from './MediaViewer';
import type { ProjectMediaSelection } from './MediaViewer';

export function ProjectShowcase({ paused }: { paused: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [media, setMedia] = useState<ProjectMediaSelection | null>(null);

  useEffect(() => {
    const root = container.current;
    if (!root || paused || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scenes = Array.from(root.querySelectorAll<HTMLElement>('.project-chapter')).map((panel, index) => ({
      panel,
      stage: panel.querySelector<HTMLElement>('.showcase-screen-stage'),
      curtain: panel.querySelector<HTMLElement>('.project-curtain'),
      screen: panel.querySelector<HTMLElement>('.showcase-window'),
      direction: index % 2 === 0 ? 1 : -1,
    }));
    const visible = new Set<Element>();
    let frame = 0;

    const reset = () => {
      scenes.forEach(({ curtain, screen }) => {
        curtain?.style.removeProperty('transform');
        screen?.style.removeProperty('transform');
      });
    };
    const update = () => {
      frame = 0;
      if (document.hidden || preference.matches) return;
      const height = window.innerHeight;
      // Read geometry together, then update only the two visual layers.
      const entries = scenes.filter(({ panel }) => visible.has(panel)).map(scene => ({
        ...scene,
        progress: scene.panel.contains(document.activeElement) ? 1 : Math.max(0, Math.min(1,
          (height * .97 - (scene.stage?.getBoundingClientRect().top ?? height)) / (height * .4),
        )),
      }));
      entries.forEach(({ curtain, screen, direction, progress }) => {
        if (curtain) curtain.style.transform = `translate3d(${progress * 105 * direction}%, 0, 0)`;
        if (screen) screen.style.transform = `translate3d(0, ${(1 - progress) * 42}px, 0) rotateX(${(1 - progress) * 7}deg) scale(${.96 + progress * .04})`;
      });
    };
    const schedule = () => {
      if (!frame && visible.size && !document.hidden && !preference.matches) frame = requestAnimationFrame(update);
    };
    const reconcileMotion = () => {
      root.classList.toggle('projects-motion', !preference.matches);
      if (preference.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        reset();
      } else schedule();
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      schedule();
    }, { rootMargin: '120px' });
    scenes.forEach(({ panel }) => observer.observe(panel));
    reconcileMotion();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    root.addEventListener('focusin', schedule);
    root.addEventListener('focusout', schedule);
    preference.addEventListener('change', reconcileMotion);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      root.removeEventListener('focusin', schedule);
      root.removeEventListener('focusout', schedule);
      preference.removeEventListener('change', reconcileMotion);
      document.removeEventListener('visibilitychange', schedule);
      root.classList.remove('projects-motion');
      reset();
    };
  }, [paused]);

  return <>
    <div id="projects" className="professional-projects" ref={container} tabIndex={-1}>
      <div className="project-section-heading reveal">
        <div><p className="tech-kicker">FROM CURIOSITY TO SOMETHING REAL</p><h3>Recent project</h3></div>
        <span className="project-count">THREE IDEAS<br/>TAKING SHAPE</span>
      </div>
      {professionalProjects.map((project, index) => <article className={`showcase-panel project-chapter showcase-${project.id}`} id={project.id} key={project.id} tabIndex={-1} aria-labelledby={`title-${project.id}`}>
        <div className="showcase-copy">
          <span className="project-chapter-number" aria-hidden="true">0{index + 1}</span>
          <div className="showcase-identity">
            <span className="showcase-glyph"><img src={`/media/projects/${project.id}.logo.${project.id === 'delphi' ? 'webp' : 'svg'}`} alt="" width="44" height="44"/></span>
            <h4 id={`title-${project.id}`}>{project.name}</h4>
            <span className={`showcase-status ${project.id === 'odyssey' ? 'status-progress' : ''}`}><i/>{project.status}</span>
          </div>
          <h5>{project.headline}</h5>
          <p className="showcase-summary">{project.summary}</p>
          {project.id === 'odyssey' && <p className="showcase-planned">The vision, currently in development</p>}
          <ul className="showcase-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          <div className="showcase-stack">
            <span>{project.id === 'odyssey' ? 'LANDING STACK' : 'BUILT WITH'}</span>
            <ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          {project.url && <div className="showcase-actions"><a className="project-visit" href={project.url} target="_blank" rel="noreferrer">{project.linkLabel}</a></div>}
        </div>
        <div className="showcase-visual">
          <div className="showcase-screen-stage">
            <div className="project-curtain" aria-hidden="true"/>
            <div className="showcase-window">
              <div className="showcase-window-bar">
                <span aria-hidden="true"><i/><i/><i/></span>
                <span>{project.id === 'odyssey' ? 'ODYSSEY / IN DEVELOPMENT' : project.url?.replace('https://', '').replace(/\/$/, '')}</span>
                <span className="window-view-label">{project.screenshotLabel}</span>
              </div>
              <button type="button" className="project-screen-button" onClick={() => setMedia({ project, kind: 'image' })} aria-label={`Enlarge ${project.name} screenshot`}>
                <img src={project.screenshot} alt={project.screenshotAlt} width={project.id === 'delphi' ? 1600 : project.id === 'odyssey' ? 1440 : 1920} height={project.id === 'delphi' ? 1133 : project.id === 'odyssey' ? 1020 : 1080} loading="lazy"/>
                <span className="screen-enlarge">Take a closer look</span>
              </button>
            </div>
          </div>
          <div className="showcase-media-footer">
            <p className="showcase-caption">{project.id === 'delphi' ? 'Product view, September 2026' : project.screenshotLabel}</p>
            <button className="project-film-card" type="button" onClick={() => setMedia({ project, kind: 'film' })} aria-label={`Watch ${project.name} ${project.filmLabel.toLowerCase()}, ${project.duration}`}>
              <span className="project-film-poster">
                <img src={project.poster} alt="" width="960" height="540" loading="lazy"/>
                <span className="project-film-invitation"><span aria-hidden="true">▶</span> Watch film</span>
              </span>
              <span className="project-film-caption"><span>{project.filmLabel}</span><span className="project-film-duration">{project.duration}</span></span>
            </button>
          </div>
        </div>
      </article>)}
    </div>
    {media && <MediaViewer selection={media} onClose={() => setMedia(null)}/>}
  </>;
}
