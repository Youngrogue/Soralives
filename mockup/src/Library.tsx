import { useEffect, useRef, useState } from 'react';
import { Arrow, Star } from './Icons';
import { libraryShelves } from './content';
import { moveToAnchor } from './navigation';

const shelfLabels: Record<string,string> = { screen: 'On screen', reading: 'On the page', games: 'Games' };
const shelfDescriptions: Record<string,string> = {
  screen: 'Films, series and animation.',
  reading: 'Manga, manhwa, manhua and other stories on the page.',
  games: 'Worlds to explore through play.',
};
const isShelf = (id:string) => libraryShelves.some(s=>s.id===id);
const readShelf = () => isShelf(location.hash.slice(1)) ? location.hash.slice(1) : 'screen';
const normalise = (value:string) => value.normalize('NFKD').replace(/\p{M}/gu,'').trim().toLowerCase();

export function Library() {
  const [active,setActive] = useState(readShelf);
  const [query,setQuery] = useState('');
  const search = useRef<HTMLInputElement>(null);
  const term = normalise(query);
  const filtered = libraryShelves.map(s=>({...s,titles:s.titles.filter(title=>normalise(title).includes(term))}));
  const selected = filtered.find(s=>s.id===active)!;
  const total = libraryShelves.find(s=>s.id===active)!.titles.length;

  useEffect(()=>{
    const update=()=>{const id=location.hash.slice(1);if(isShelf(id))setActive(id);else if(!id)setActive('screen');};
    window.addEventListener('hashchange',update);
    window.addEventListener('popstate',update);
    if (location.hash){const id=location.hash.slice(1);moveToAnchor(isShelf(id)?`tab-${id}`:id,false);}
    return()=>{window.removeEventListener('hashchange',update);window.removeEventListener('popstate',update);};
  },[]);

  function selectShelf(id:string, keyboard=false) {
    if (id===active) return;
    setActive(id);
    history[keyboard?'replaceState':'pushState'](null,'',`#${id}`);
  }
  function clearSearch() {setQuery('');search.current?.focus();}

  return <div className="library-page section-shell">
    <a className="back-link" href="/arts/"><Arrow/><span>Back to Arts & Culture</span></a>
    <div className="library-heading"><div><p className="eyebrow">ARTS & CULTURE</p><h1 id="library-title" tabIndex={-1}>The <em>Library.</em></h1><p>Films, series, manga and worlds to explore.<br/>Browse the shelves or find a title.</p></div><img src="/assets/culture-room.webp" alt="" width="960" height="720"/></div>
    <div className="library-controls" id="library-browse">
      <div className="library-toolbar">
        <div className="shelf-tabs" role="tablist" aria-label="Library shelves">{filtered.map((s,i)=><button key={s.id} id={`tab-${s.id}`} role="tab" aria-selected={active===s.id} aria-controls={`shelf-${s.id}`} tabIndex={active===s.id?0:-1} onClick={()=>selectShelf(s.id)} onKeyDown={e=>{
          let next=-1;
          if(e.key==='ArrowRight')next=(i+1)%filtered.length;
          if(e.key==='ArrowLeft')next=(i+filtered.length-1)%filtered.length;
          if(e.key==='Home')next=0;
          if(e.key==='End')next=filtered.length-1;
          if(next>=0){e.preventDefault();selectShelf(filtered[next].id,true);document.getElementById(`tab-${filtered[next].id}`)?.focus();}
        }}>{shelfLabels[s.id]}<span>{s.titles.length}</span></button>)}</div>
        <div className="library-search"><label className="sr-only" htmlFor="title-search">Search titles across the Library</label><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5"/></svg><input ref={search} id="title-search" type="search" placeholder="Find a title" value={query} onChange={e=>setQuery(e.target.value)} autoComplete="off"/>{query&&<button onClick={clearSearch} aria-label="Clear title search">Clear</button>}</div>
      </div>
      <div className="library-result-line"><p role="status" aria-live="polite">{term?`${selected.titles.length} of ${total} ${total === 1 ? 'title' : 'titles'} on this shelf`:`${total} ${total === 1 ? 'title' : 'titles'} on this shelf`}</p><span>Alphabetical</span></div>
    </div>
    {filtered.map(s=><section key={s.id} id={`shelf-${s.id}`} role="tabpanel" aria-labelledby={`tab-${s.id}`} hidden={active!==s.id} tabIndex={0} className="shelf-panel">
      <p className="shelf-description">{shelfDescriptions[s.id]} A collection to explore, with personal ratings to come.</p>
      {s.titles.length>0?<ul className="title-list">{s.titles.map(title=><li key={title}><span className="title-dot" aria-hidden="true"/>{title}</li>)}</ul>:<div className="library-empty"><h2>No matching titles on this shelf.</h2><p>Try another shelf or a shorter title.</p><button className="pill-link" onClick={clearSearch}>Clear search<Arrow/></button></div>}
    </section>)}
    <div className="library-end"><Star/><p>There's always another world to discover.</p><a href="#library-title" onClick={e=>{e.preventDefault();moveToAnchor('library-title');}}>Back to the top ↑</a></div>
  </div>;
}

export default Library;
