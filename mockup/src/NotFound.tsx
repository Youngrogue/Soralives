import { worlds } from './routes.mjs';

export default function NotFound() {
  return <section className="not-found section-shell"><p className="eyebrow">404 / A LITTLE OFF COURSE</p><h1>This world is<br/><em>still a mystery.</em></h1><p>That page isn’t here. There are four good places to start.</p><nav aria-label="Find a world">{worlds.map(world=><a href={world.path} key={world.id}>{world.label}</a>)}</nav><a className="pill-link" href="/">Back to The Soraverse</a></section>;
}
