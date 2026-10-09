import './living.css';

export function GamingSection() {
  return <aside id="gaming" className="gaming-invite reveal" aria-labelledby="gaming-title" tabIndex={-1}>
    <svg className="gaming-symbol" viewBox="0 0 220 160" aria-hidden="true"><path d="M55 39c24-9 38-8 55-4 18-4 34-5 57 4 15 6 37 78 25 91-15 17-37-24-53-25H82c-16 1-38 42-54 25C16 117 40 44 55 39Z" fill="#f9cf36" stroke="#080d17" strokeWidth="5"/><path d="M56 41c20-7 40-3 54 0 20-4 37-8 54 0" fill="none" stroke="#fffdf8" strokeWidth="4"/><path d="M51 129c12-14 21-26 31-28h57c17 3 30 21 41 30" fill="none" stroke="#c68e19" strokeWidth="7"/><path d="M62 59h12v13h13v12H74v13H62V84H49V72h13Z" fill="#17202a"/><circle cx="151" cy="63" r="8" fill="#ef6246"/><circle cx="169" cy="80" r="8" fill="#2457ee"/><circle cx="100" cy="96" r="12" fill="#17202a"/><circle cx="128" cy="96" r="12" fill="#17202a"/><circle cx="100" cy="94" r="7" fill="#535d66"/><circle cx="128" cy="94" r="7" fill="#535d66"/></svg>
    <div><span className="eyebrow">GAMES & GAMING</span><h3>Some worlds<br/><em>let you play.</em></h3><p>Another side of the imagination. Games, exploration and stories I can step into, alongside the anime and films I love.</p></div>
    <a href="/library/#games">Explore my games shelf </a>
  </aside>;
}
