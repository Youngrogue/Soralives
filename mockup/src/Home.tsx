import { HeroAtmosphere } from './HeroAtmosphere';
import { Star } from './Icons';
import { IntroPhotographs } from './PersonalCards';
import { worlds } from './routes.mjs';
import type { PageProps } from './page-types';
import type { ReactNode } from 'react';
function Out({href,children,className=''}:{href:string;children:ReactNode;className?:string}) {return <a href={href} className={className} target={href.startsWith('mailto:')?undefined:'_blank'} rel={href.startsWith('mailto:')?undefined:'noreferrer'}>{children}</a>;}
function Label({children}:{children:ReactNode}) {return <p className="eyebrow section-label"><span/>{children}</p>;}

export default function Home({paused,setPaused,reducedMotion}:PageProps) { return <>
    <section className="hero" aria-labelledby="hero-title">
      <HeroAtmosphere paused={paused}/><div className="hero-print" aria-hidden="true"/>
      <span className="hero-side-note" aria-hidden="true">A LIFE WITH MANY SIDES</span>
      <div className="hero-title-wrap"><div className="hero-kicker"><span className="hero-the">The</span></div><h1 id="hero-title" aria-label="The Soraverse">Soraverse</h1><p className="hero-welcome">Welcome to my <em>wonderland.</em></p></div>

      <div className="hero-bottom"><p>A place for the things I build,<br/>the sounds I love and the worlds I explore.</p><a className="explore-down" href="#about"><span>Come on in</span></a><button className="motion-toggle" onClick={()=>setPaused(!paused)} disabled={reducedMotion} aria-pressed={paused||reducedMotion} aria-label={reducedMotion?'Reduced motion enabled':paused?'Resume atmospheric motion':'Pause atmospheric motion'}><span aria-hidden="true">{paused||reducedMotion?'Ⅱ':'≋'}</span>{reducedMotion?'Reduced motion':paused?'Motion paused':'Motion on'}</button></div>
    </section>


    <section id="about" className="about-section section-shell" tabIndex={-1}>
      <div className="about-portrait reveal"><IntroPhotographs/><span className="portrait-note">Hi, I’m Sora <Star/></span></div>
      <div className="about-copy reveal"><Label>THE PERSON BETWEEN THE INTERESTS</Label><h2>Hi, I’m <em>Sora.</em></h2><p className="about-manifesto">I identify as a sexy main character stuck in a reverse isekai, trying to bring back <span>colour and fun</span> into this unjust world.</p><p>I love to learn about technology, science, business, history, the universe and human culture.</p><p>I'm a technical project manager, vibe coder, EDM DJ, freedom fighter, animation, movie and TV show fanatic, art and book admirer and overall chill guy.</p><details className="profile-details"><summary>A little more about me <span aria-hidden="true">+</span></summary><div><p>I studied Industrial Physics, Electronics & IT at Covenant University. My work has taken me from IT operations and corporate banking into technology advisory and building products.</p><p>I appreciate human creativity in its many forms. Beautiful cinematography, a room finding its rhythm, a new idea that changes how we see things. I want to make room for all of it.</p><Out href="https://tobiarogunmati.com/" className="text-link">My professional background </Out></div></details><div className="about-signoff"><Star/><span>Many interests. One life to explore them.</span></div></div>
    </section>


    <section id="worlds" className="worlds-gateway section-shell" aria-labelledby="worlds-title">
      <div className="worlds-heading"><Label>FOUR WAYS IN</Label><h2 id="worlds-title">Follow your <em>curiosity.</em></h2><p>Different interests. Plenty of common ground.<br/>Pick a room and make yourself at home.</p></div>
      <div className="worlds-grid">{worlds.map((world,index)=><a key={world.id} href={world.path} className={`world-door world-door-${world.id}`}><span className="world-door-number" aria-hidden="true">0{index+1}</span><div className="world-door-art"><img src={world.image} alt="" width="960" height="720" loading="lazy"/></div><div className="world-door-copy"><span className="eyebrow">{world.note}</span><h3>{world.label}</h3><p>{world.summary}</p><span className="world-door-action">Enter {world.label}</span></div></a>)}</div>
    </section>
    <section className="closing-note section-shell reveal"><Star/><figure><blockquote>Art is how we decorate space,<br/><em>music is how we decorate time</em></blockquote><figcaption>Attributed to Jean-Michel Basquiat</figcaption></figure><a href="#contact" className="text-link">Let’s connect</a></section>
  </>;
}
