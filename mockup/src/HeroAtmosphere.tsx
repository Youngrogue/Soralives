import { useState } from 'react';
import { HeroScene } from './HeroScene';
import { CloudShader } from './CloudShader';
import './hero-atmosphere.css';
import './cloud-study.css';

const skies = {
  soraverse: { label: 'Soraverse blue', skyTopColor: '#173b83', skyBottomColor: '#8cbde0', cloudColor: '#fbf8f2' },
  aceternity: { label: 'Original sky', skyTopColor: '#3876ba', skyBottomColor: '#8cbfe8', cloudColor: '#fbf8f2' },
};

export function HeroAtmosphere({ paused }: { paused: boolean }) {
  const [sky, setSky] = useState<keyof typeof skies>('soraverse');
  const [speed, setSpeed] = useState(.7);
  const [count, setCount] = useState(6);
  return <>
    <div className="hero-atmosphere cloud-study-atmosphere" aria-hidden="true">
      <CloudShader paused={paused} speed={speed} count={count} {...skies[sky]}/>
      <div className="cloud-study-scrim"/>
      <HeroScene paused={paused}/>
    </div>
    <details className="cloud-study-controls">
      <summary>Cloud study <span>Adjust sky</span></summary>
      <div className="cloud-study-panel">
        <p className="cloud-study-label">Aceternity cloud shader</p>
        <p>A live cloud field across the Soraverse.</p>
        <fieldset><legend>Sky palette</legend><div className="cloud-study-palettes">{Object.entries(skies).map(([id,value])=><button key={id} type="button" aria-pressed={sky===id} onClick={()=>setSky(id as keyof typeof skies)}>{value.label}</button>)}</div></fieldset>
        <label htmlFor="cloud-speed">Drift speed <output>{speed.toFixed(1)}×</output></label>
        <input id="cloud-speed" type="range" min="0" max="2" step="0.1" value={speed} onChange={event=>setSpeed(Number(event.target.value))}/>
        <label htmlFor="cloud-count">Cloud count <output>{count}</output></label>
        <input id="cloud-count" type="range" min="1" max="6" step="1" value={count} onChange={event=>setCount(Number(event.target.value))}/>
        <p className="cloud-study-hint">Use the page’s motion control to pause. Reduced motion keeps the sky still.</p>
        <a href="https://www.soralives.xyz/" target="_blank" rel="noreferrer">Compare live site</a>
      </div>
    </details>
  </>;
}
