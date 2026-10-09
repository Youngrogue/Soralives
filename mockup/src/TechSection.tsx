import { CategoryGoals, CollaborationLinks } from './CategoryGoals';
import { SocialIcon } from './SocialIcon';
import { councilLinks, councilDescription } from './content';
import { toolkitGroups } from './professional-content';
import { ProjectShowcase } from './ProjectShowcase';
import { ExperienceTimeline } from './ExperienceTimeline';
import './tech.css';
import './projects.css';

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

export function TechSection({ paused = false }: { paused?: boolean }) {
  return <section id="tech" className="professional-section" tabIndex={-1} aria-labelledby="professional-title">
    <div className="section-shell">
      <div className="professional-intro"><img className="professional-room" src="/assets/tech-room.webp" alt="" width="960" height="720" loading="eager"/><div className="professional-intro-heading reveal"><p className="tech-kicker">TECH & BUSINESS</p><h1 id="professional-title">Curiosity.<br/><span>Put to work.</span></h1></div><div className="professional-intro-copy reveal"><p>I connect business needs with technical delivery. From IT operations and corporate banking to technology advisory and building products of my own.</p><a href="https://tobiarogunmati.com/" target="_blank" rel="noreferrer" className="professional-text-link">The full professional story </a></div></div>
      <ProjectShowcase paused={paused}/>
      <CategoryGoals category="tech"/>
      <ExperienceTimeline paused={paused}/>
      <div id="toolkit" className="professional-toolkit reveal" tabIndex={-1}><div className="toolkit-intro"><p className="tech-kicker">HOW I WORK</p><h3>A versatile toolkit.<br/>A practical mindset.</h3><p>Business understanding, technical fluency and the tools to bring an idea into the world.</p><a className="professional-text-link" href="https://tobiarogunmati.com/" target="_blank" rel="noreferrer">Explore my skills & tools </a></div><div className="toolkit-groups">{toolkitGroups.map(group => <div className="toolkit-group" key={group.title}><span className={`toolkit-icon toolkit-icon-${group.icon}`}><SkillIcon type={group.icon}/></span><div><h4>{group.title}</h4><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div></div>)}</div></div>
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
