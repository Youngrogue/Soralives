import { HeroScene } from './HeroScene';
import { CloudShader } from './CloudShader';
import './hero-atmosphere.css';
import './cloud-study.css';

export function HeroAtmosphere({ paused }: { paused: boolean }) {
  return <div className="hero-atmosphere" aria-hidden="true">
    <CloudShader paused={paused} speed={.7} count={6} skyTopColor="#173b83" skyBottomColor="#8cbde0" cloudColor="#fbf8f2"/>
    <div className="cloud-study-scrim"/>
    <HeroScene paused={paused}/>
    <div className="moon-cloud-veil"><img src="/assets/cloud.webp" alt="" width="1440" height="699"/></div>
  </div>;
}
