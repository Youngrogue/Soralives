import { CategoryGoals, CollaborationLinks } from './CategoryGoals';
import { SocialIcon } from './SocialIcon';
import { councilLinks, councilDescription } from './content';
import { Toolkit } from './Toolkit';
import { ProjectShowcase } from './ProjectShowcase';
import { ExperienceTimeline } from './ExperienceTimeline';
import './tech.css';
import './projects.css';

export function TechSection({ paused = false }: { paused?: boolean }) {
  return <section id="tech" className="professional-section" tabIndex={-1} aria-labelledby="professional-title">
    <div className="section-shell">
      <div className="professional-intro"><div className="geometric-light" aria-hidden="true"><div className="light-polyhedron">{[0,1,2,3,4,5].map(face=><i key={face} style={{'--face':face} as React.CSSProperties}/>)}</div></div><img className="professional-room" src="/assets/tech-room.webp" alt="" width="960" height="720" loading="eager"/><div className="professional-intro-heading reveal"><p className="tech-kicker">TECH & BUSINESS</p><h1 id="professional-title">Curiosity.<br/><span>Put to work.</span></h1></div><div className="professional-intro-copy reveal"><p>I connect business needs with technical delivery. From IT operations and corporate banking to technology advisory and building products of my own.</p><a href="https://tobiarogunmati.com/" target="_blank" rel="noreferrer" className="professional-text-link">Check out my Resume</a></div></div>
      <ProjectShowcase paused={paused}/>
      <CategoryGoals category="tech"/>
      <ExperienceTimeline paused={paused}/>
      <Toolkit/>
      <aside id="curious-council" className="council-panel reveal" aria-labelledby="council-title" tabIndex={-1}>
        <div className="council-emblem" aria-hidden="true"><span>C</span><span>C</span><i/></div>
        <div className="council-copy"><p className="tech-kicker">ANOTHER PLACE TO EXPLORE</p><h3 id="council-title">The Curious Council</h3><p>{councilDescription}</p></div>
        <nav className="council-links" aria-label="The Curious Council channels">{councilLinks.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer"><SocialIcon platform={link.label}/><span>{link.label}</span></a>)}</nav>
      </aside>
      <div id="services" className="professional-enquiries reveal" tabIndex={-1}><div><p className="tech-kicker">LET'S BUILD SOMETHING USEFUL</p><h3>A product, a problem<br/>or a possibility?</h3></div><div><p>Product thinking. Technical project management. Business strategy and partnerships. I enjoy making complex things work.</p><CollaborationLinks category="tech"/></div></div>
    </div>
  </section>;
}

export default TechSection;
