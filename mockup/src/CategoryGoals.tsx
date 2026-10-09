import { categoryGoals, enquiryHref } from './living-content';
import type { Category } from './living-content';
import './living.css';

export function CategoryGoals({ category }: { category: Category }) {
  const goals = categoryGoals[category];
  if (category === 'tech') return <section id="tech-goals" className="project-progress" aria-labelledby="tech-goals-title" tabIndex={-1}><div><span className="eyebrow">WORK IN PROGRESS</span><h3 id="tech-goals-title">Still taking shape.</h3></div><ul>{goals.items.map(goal=><li key={goal.id}><span className="goal-status">{goal.status}</span><a href={goal.link?.href}>{goal.title}</a></li>)}</ul></section>;
  return <section id={`${category}-goals`} className={`category-goals goals-${category} reveal`} aria-labelledby={`${category}-goals-title`} tabIndex={-1}>
    <div className="goals-heading"><span className="eyebrow">GOALS & WORK IN PROGRESS</span><h3 id={`${category}-goals-title`}>{goals.title}</h3><p>A little look at what’s taking shape.</p></div>
    <ul className="goals-list" role="list">{goals.items.map((goal, index) => <li key={goal.id}>
      <span className={`goal-marker${goal.status === 'Complete' ? ' goal-complete' : ''}`} aria-hidden="true">{goal.status === 'Complete' ? '✓' : String(index + 1).padStart(2, '0')}</span>
      <div className="goal-copy"><span className={`goal-status status-${goal.status.replaceAll(' ', '').toLowerCase()}`}>{goal.status}</span><h4>{goal.title}</h4><p>{goal.detail}</p>{goal.link && <a href={goal.link.href} target={goal.link.href.startsWith('https:') ? '_blank' : undefined} rel={goal.link.href.startsWith('https:') ? 'noreferrer' : undefined}>{goal.link.label}</a>}</div>
    </li>)}</ul>
  </section>;
}

export function CollaborationLinks({ category }: { category: Category }) {
  const actions: Record<Category, { label: string; subject: string }[]> = {
    tech: [{ label: 'Discuss a project', subject: 'Let’s build a product' }, { label: 'Book a consultation', subject: 'Technology and business consultation' }, { label: 'Explore a partnership', subject: 'A project partnership' }],
    music: [{ label: 'Book a DJ set', subject: 'DJ booking enquiry' }, { label: 'Plan an event together', subject: 'Event organising and partnerships' }, { label: 'Collaborate on music', subject: 'Music collaboration' }],
    culture: [{ label: 'Create something together', subject: 'Art and creative collaboration' }, { label: 'Connect over gaming', subject: 'Gaming and community ideas' }],
    ideas: [{ label: 'Collaborate with the Council', subject: 'The Curious Council collaboration' }, { label: 'Share an idea', subject: 'An idea for the Soraverse' }],
  };
  return <div className="collaboration-links">{actions[category].map(action => <a key={action.label} href={enquiryHref(action.subject)}>{action.label}</a>)}</div>;
}
