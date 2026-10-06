import { useEffect, useRef } from 'react';
import type { ProfessionalProject } from './professional-content';

export type ProjectMediaSelection = { project: ProfessionalProject; kind: 'image' | 'film' };

export function MediaViewer({ selection, onClose }: { selection: ProjectMediaSelection; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { project, kind } = selection;

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      video.current?.pause();
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog className={`project-viewer ${kind === 'image' ? 'project-viewer-image' : ''}`} ref={dialog} aria-labelledby="project-viewer-title" aria-describedby="project-viewer-description" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="project-viewer-inner">
      <div className="project-viewer-heading"><div><span>{project.name}</span><h2 id="project-viewer-title">{kind === 'film' ? project.filmLabel : project.screenshotLabel}</h2></div><button autoFocus type="button" onClick={onClose} aria-label="Close media viewer"><span aria-hidden="true">×</span><span>Close</span></button></div>
      {kind === 'film'
        ? <video ref={video} controls playsInline preload="metadata" poster={project.poster} aria-label={`${project.name} ${project.filmLabel.toLowerCase()}`}><source src={project.film} type="video/mp4"/>Your browser does not support this video. <a href={project.film}>Open the film</a>.</video>
        : <img src={project.screenshot} alt={project.screenshotAlt}/>}
      <p id="project-viewer-description">{kind === 'film' ? project.filmDescription : project.screenshotAlt}</p>
    </div>
  </dialog>;
}
