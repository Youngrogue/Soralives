import { BucketList } from './BucketList';
import { WritingCards } from './Catalogue';
import { useId, useState } from 'react';
import { SocialIcon } from './SocialIcon';
import { councilLinks, councilDescription } from './content';
import './society.css';
import { CategoryGoals, CollaborationLinks } from './CategoryGoals';
import { IdeasWall } from './IdeasWall';

type HistoricalFigure = {
  id: string;
  name: string;
  place: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  topic: string;
  context: string;
  wiki: string;
  credit: string;
  source: string;
  license: string;
  licenseUrl?: string;
  wide?: boolean;
};

const figures: HistoricalFigure[] = [
  {id:'nobunaga',name:'Oda Nobunaga',place:'Sengoku Japan',image:'nobunaga.webp',width:600,height:1343,alt:'Historical portrait of Oda Nobunaga by Kanō Sōshū, 1583.',topic:'Unification & upheaval',context:'A central figure in the struggle to unify sixteenth century Japan. Power, ambition and a changing political order.',wiki:'Oda_Nobunaga',credit:'Kanō Sōshū / Historiographical Institute, University of Tokyo',source:'Oda-Nobunaga.jpg',license:'Public domain artwork and faithful reproduction, as classified by Wikimedia Commons'},
  {
    id: 'sankara', name: 'Thomas Sankara', place: 'Burkina Faso',
    image: 'sankara.webp', width: 298, height: 400,
    alt: 'Archival portrait of Thomas Sankara reproduced in a 1986 CIA report.',
    topic: 'Revolution & self determination',
    context: 'Political change, sovereignty and the possibilities of a different future.',
    wiki: 'Thomas_Sankara', credit: 'Unknown photographer / United States Central Intelligence Agency',
    source: 'Photo_of_Thomas_Sankara_by_CIA.png',
    license: 'Public domain in the United States, as classified by Wikimedia Commons',
  },
  {
    id: 'lumumba', name: 'Patrice Lumumba', place: 'Congo',
    image: 'lumumba.webp', width: 750, height: 1000,
    alt: 'Patrice Lumumba in Brussels on 26 January 1960, photographed by Harry Pot.',
    topic: 'Independence & power',
    context: 'Decolonisation, independence and the struggle to shape a nation.',
    wiki: 'Patrice_Lumumba', credit: 'Harry Pot / Anefo / Nationaal Archief',
    source: 'PatriceLumumba1960.jpg', license: 'Creative Commons Attribution 4.0 International',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    id: 'nkrumah', name: 'Kwame Nkrumah', place: 'Ghana',
    image: 'nkrumah.webp', width: 680, height: 931,
    alt: 'Portrait of Kwame Nkrumah from the UK National Archives collection.',
    topic: 'Pan Africanism & nationhood',
    context: 'African independence, shared identity and the question of unity.',
    wiki: 'Kwame_Nkrumah', credit: 'The National Archives UK; source crop and retouching by Wabbuh',
    source: 'Kwame_Nkrumah_Portrait,_The_National_Archives_UK.jpg', license: 'Open Government Licence 1.0',
    licenseUrl: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/1/',
  },
  {
    id: 'che', name: 'Che Guevara', place: 'Latin America',
    image: 'che.webp', width: 765, height: 1000,
    alt: 'Alberto Korda’s 1960 portrait of Che Guevara, Guerrillero Heroico.',
    topic: 'Revolution & its imagery',
    context: 'Revolutionary movements, their ideas and the images that outlive them.',
    wiki: 'Che_Guevara', credit: 'Alberto Korda / Museo Che Guevara',
    source: 'Che_Guevara,_Guerrillero_Heroico.jpg',
    license: 'Public domain in Cuba and the United States, as classified by Wikimedia Commons',
  },
  {
    id: 'castro', name: 'Fidel Castro', place: 'The Cuban Revolution',
    image: 'castro.webp', width: 732, height: 541, wide: true,
    alt: 'Fidel Castro signing as Prime Minister of Cuba on 16 February 1959.',
    topic: 'Cuba & the Cold War',
    context: 'The Cuban Revolution and the ways a movement changes a country.',
    wiki: 'Cuban_Revolution', credit: 'Unknown photographer / Instituto Cubano del Arte e Industrias Cinematográficos',
    source: 'Fidel_Castro_firma_como_Primer_Ministro_-_1959.jpg',
    license: 'Public domain in Cuba and the United States, as classified by Wikimedia Commons',
  },
  {
    id: 'alexander', name: 'Alexander the Great', place: 'The ancient world',
    image: 'alexander.webp', width: 750, height: 1000,
    alt: 'Detail of Alexander the Great from the ancient Alexander Mosaic.',
    topic: 'Empire & ambition',
    context: 'Conquest, cultural exchange and the traces empires leave behind.',
    wiki: 'Alexander_the_Great', credit: 'Unknown ancient artist; Wikimedia Commons crop by Wabbuh',
    source: 'Alexander_Mosaic_detail_of_Alexander_the_Great_(3x4_cropped).jpg',
    license: 'Public domain artwork and faithful reproduction, as classified by Wikimedia Commons',
  },
  {
    id: 'genghis', name: 'Genghis Khan', place: 'The Mongol Empire',
    image: 'genghis.webp', width: 787, height: 1000,
    alt: 'Posthumous Yuan dynasty painting of Genghis Khan from the National Palace Museum.',
    topic: 'Power across continents',
    context: 'The expansion of empires and their effects on the people within them.',
    wiki: 'Genghis_Khan', credit: 'Unknown Yuan artist / National Palace Museum, via Shuge and Wikimedia Commons',
    source: 'YuanEmperorAlbumGenghisPortrait.jpg',
    license: 'Public domain artwork and faithful reproduction, as classified by Wikimedia Commons',
  },
];

const countries = [
  { name: 'Sudan', kind: 'sudan', topic: 'People, history & identity', wiki: 'History_of_Sudan' },
  { name: 'Palestine', kind: 'palestine', topic: 'Land, culture & memory', wiki: 'History_of_Palestine' },
  { name: 'China', kind: 'china', topic: 'Civilisation, power & change', wiki: 'History_of_China' },
  { name: 'Cuba', kind: 'cuba', topic: 'Revolution & its aftermath', wiki: 'Cuban_Revolution' },
] as const;

const star = '0,-10 2.94,-4.05 9.51,-3.09 4.76,1.55 5.88,8.09 0,5 -5.88,8.09 -4.76,1.55 -9.51,-3.09 -2.94,-4.05';

function CountryFlag({ kind }: { kind: typeof countries[number]['kind'] }) {
  return <svg viewBox={kind === 'china' ? '0 0 120 80' : '0 0 120 60'} aria-hidden="true" focusable="false" className="country-flag">
    {kind === 'sudan' ? <>
      <path fill="#d5262d" d="M0 0h120v20H0z"/><path fill="#fff" d="M0 20h120v20H0z"/>
      <path fill="#111" d="M0 40h120v20H0z"/><path fill="#078647" d="m0 0 40 30L0 60z"/>
    </> : kind === 'palestine' ? <>
      <path fill="#111" d="M0 0h120v20H0z"/><path fill="#fff" d="M0 20h120v20H0z"/>
      <path fill="#078647" d="M0 40h120v20H0z"/><path fill="#e32932" d="m0 0 40 30L0 60z"/>
    </> : kind === 'china' ? <>
      <path fill="#de2910" d="M0 0h120v80H0z"/><g fill="#ffde00">
        <polygon points={star} transform="translate(20 20) scale(1.2)"/>
        {[[40, 8], [48, 16], [48, 28], [40, 36]].map(([x, y]) => <polygon key={y} points={star} transform={`translate(${x} ${y}) rotate(${Math.atan2(20 - x, y - 20) * 180 / Math.PI}) scale(.4)`}/>)}
      </g>
    </> : <>
      <path fill="#fff" d="M0 0h120v60H0z"/><path fill="#002a8f" d="M0 0h120v12H0zM0 24h120v12H0zM0 48h120v12H0z"/>
      <path fill="#cf142b" d="m0 0 52 30L0 60z"/><polygon fill="#fff" points={star} transform="translate(18 30)"/>
    </>}
  </svg>;
}

function HistoryCard({ person, index }: { person: HistoricalFigure; index: number }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  return <article className={`history-card reveal${person.wide ? ' history-card-wide' : ''}${open ? ' is-turned' : ''}`} aria-label={person.name}>
    <div className="history-turn">
      <div className="history-face history-front" aria-hidden={open} inert={open}>
        <img src={`/media/history/${person.image}`} alt={person.alt} width={person.width} height={person.height} loading="lazy" decoding="async"/>
        <span className="history-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div className="history-caption"><span>{person.place}</span><h4>{person.name}</h4></div>
      </div>
      <div id={detailId} className="history-face history-back" aria-hidden={!open} inert={!open}>
        <span className="eyebrow">A THREAD TO EXPLORE</span>
        <h4>{person.topic}</h4><p>{person.context}</p>
        <a href={`https://en.wikipedia.org/wiki/${person.wiki}`} target="_blank" rel="noreferrer" aria-label={`Read historical context for ${person.name} on Wikipedia`}>Read the context </a>
      </div>
    </div>
    <button className="history-flip" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={detailId} aria-label={`${open ? 'Show image of' : 'Explore the history of'} ${person.name}`}>
      <span>{open ? 'Back to the image' : 'Explore the history'}</span><span className="history-turn-symbol" aria-hidden="true">↻</span>
    </button>
  </article>;
}

export function SocietySection({ paused = false }: { paused?: boolean }) {
  return <section id="ideas" className="ideas-section society-section room-section" tabIndex={-1} aria-labelledby="society-title">
    <div className="society-opening section-shell">
      <div className="room-backdrop society-room" aria-hidden="true"><img src="/assets/ideas-room.webp" alt="" width="960" height="720" loading="lazy" decoding="async"/></div>
      <div className="society-opening-copy reveal">
        <p className="eyebrow section-label"><span/>SOCIETY & IDEAS</p>
        <h1 id="society-title">The world is<br/>worth <em>wondering<br/>about.</em></h1>
        <p>History, politics, psychology, culture and belief. I'm interested in how people have shaped one another across time, and what those stories reveal about the world we live in.</p>
        <div className="society-interests"><span>History & power</span><span>Culture & belief</span><span>Human behaviour</span><span>Espionage & intrigue</span></div>
        <a href="#histories" className="pill-link">Follow the threads </a>
      </div>
      <span className="society-room-label eyebrow">THE ROOM FOR BIG QUESTIONS</span>
    </div>

    <div className="section-shell society-content">
      <div className="society-places-heading reveal"><p className="eyebrow">PLACES & PERSPECTIVES</p><p>Different places. Connected histories.</p></div>
      <div className="country-grid">{countries.map(country => <a className="country-card reveal" href={`https://en.wikipedia.org/wiki/${country.wiki}`} key={country.kind} target="_blank" rel="noreferrer" aria-label={`Explore ${country.name === 'Cuba' ? 'the Cuban Revolution' : `the history of ${country.name}`} on Wikipedia`}>
        <CountryFlag kind={country.kind}/><span><strong>{country.name}</strong><small>{country.topic}</small></span>
      </a>)}</div>

      <div id="histories" className="history-heading reveal" tabIndex={-1}>
        <div><p className="eyebrow">PEOPLE, IDEAS & THEIR LEGACIES</p><h3>Lives that changed<br/><em>the conversation.</em></h3></div>
        <p>Independence and revolution. Empire and conquest. The people, choices and consequences that still shape our world.</p>
      </div>
      <div className="history-grid">{figures.map((person, index) => <HistoryCard key={person.id} person={person} index={index}/>)}</div>

      <details className="history-credits">
        <summary>About the images & sources <span aria-hidden="true">+</span></summary>
        <div className="history-credits-content">
          <p>Archival photographs and historical artwork from Wikimedia Commons. Web images are resized and compressed, with responsive presentation crops. Alexander is shown in an ancient mosaic; Genghis Khan in a posthumous painting.</p>
          <ul>{figures.map(person => <li key={person.id}>
            <a href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(person.source)}`} target="_blank" rel="noreferrer">{person.name}</a>: {person.credit}. {person.licenseUrl ? <a href={person.licenseUrl} target="_blank" rel="noreferrer">{person.license}</a> : person.license}.
          </li>)}</ul>
          <a href="/media/history/SOURCES.md" className="history-source-record">Full source and rendition record </a>
        </div>
      </details>

      <IdeasWall paused={paused}/>
      <BucketList/>
      <CategoryGoals category="ideas"/>
      <WritingCards/>
      <div id="council-ideas" className="society-channel reveal" tabIndex={-1}>
        <div className="society-channel-copy"><p className="eyebrow">KEEP THE CURIOSITY GOING</p><h3>The Curious<br/><em>Council</em></h3><p>{councilDescription}</p></div>
        <div className="society-channel-links">{councilLinks.map(link => <a href={link.url} key={link.label} target="_blank" rel="noreferrer" aria-label={`The Curious Council on ${link.label}`}><SocialIcon platform={link.label}/><span>{link.label}</span></a>)}<a href="https://substack.com/@soralives" target="_blank" rel="noreferrer"><SocialIcon platform="Substack"/><span>My Substack profile</span></a></div>
      </div>
      <div className="society-collaboration reveal"><h3>A conversation worth starting.</h3><p>For thoughtful collaborations, community projects and ideas that deserve a wider conversation.</p><CollaborationLinks category="ideas"/></div>
    </div>
  </section>;
}

export default SocietySection;
