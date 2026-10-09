import { categoryGoals, enquiryHref } from './living-content';
import type { Category } from './living-content';
import './living.css';

export function CategoryGoals({ category }: { category: Category }) {
  return <section id={`${category}-goals`} className="next-steps" aria-labelledby={`${category}-goals-title`} tabIndex={-1}>
    <div className="next-steps-heading"><h3 id={`${category}-goals-title`}>Next steps</h3><span className="eyebrow">A LITTLE OF WHAT’S NEXT</span></div>
    <ul>{categoryGoals[category].items.map(goal=><li key={goal.id}><span className="goal-status">{goal.status}</span><div><h4>{goal.title}</h4>{goal.detail&&<p>{goal.detail}</p>}</div>{goal.link&&<a href={goal.link.href} target={goal.link.href.startsWith('https:')?'_blank':undefined} rel={goal.link.href.startsWith('https:')?'noreferrer':undefined}>{goal.link.label}</a>}</li>)}</ul>
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
