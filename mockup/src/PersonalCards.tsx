import { useRef, useState } from 'react';
import { Arrow, Star } from './Icons';

export function ReflectionCard({ image, alt, title, text, className = '' }: {image:string;alt:string;title:string;text:string;className?:string}) {
  const [flipped,setFlipped]=useState(false);
  return <article className={`reflection-card ${className} ${flipped?'is-flipped':''}`}>
    <div className="reflection-turn">
      <div className="reflection-face reflection-front" aria-hidden={flipped}><img src={image} alt={alt} width="800" height="1067" loading="lazy"/></div>
      <div className="reflection-face reflection-back" aria-hidden={!flipped} tabIndex={flipped?0:-1}><Star/><h3>{title}</h3><p>{text}</p><span className="eyebrow">A LITTLE ABOUT MY OUTLOOK</span></div>
    </div>
    <button className="reflection-control" onClick={()=>setFlipped(!flipped)} aria-expanded={flipped}><span>{flipped?'Back to the photo':title}</span><span className="turn-icon" aria-hidden="true">↻</span></button>
  </article>;
}
const photographs=[
  {src:'/media/personal/dj-decks.webp',alt:'Sora wearing headphones with his hand on the DJ decks.',caption:'At the decks'},
  {src:'/media/personal/dj-sage.webp',alt:'Sora playing a DJ set, with the original Sage’s House photograph mark visible.',caption:'In the moment'},
];
export function MusicPhotographs() {
  const [active,setActive]=useState(0);
  const track=useRef<HTMLDivElement>(null);
  const pointer=useRef<number|null>(null);
  const swiped=useRef(false);
  const go=(next:number)=>setActive(Math.max(0,Math.min(photographs.length-1,next)));
  return <div className="music-photographs">
    <div className="photo-window" ref={track} onPointerDown={e=>{pointer.current=e.clientX;swiped.current=false;}} onPointerUp={e=>{if(pointer.current!==null&&Math.abs(e.clientX-pointer.current)>45){swiped.current=true;go(active+(e.clientX<pointer.current?1:-1));}pointer.current=null;}} onClickCapture={e=>{if(swiped.current){e.preventDefault();swiped.current=false;}}} onPointerCancel={()=>pointer.current=null}>
      {photographs.map((photo,i)=><a key={photo.src} href={photo.src} target="_blank" rel="noreferrer" hidden={i!==active} aria-label={`Open full photo: ${photo.caption}`}><img src={photo.src} alt={photo.alt} width="800" height="1000" loading="lazy" draggable={false}/></a>)}
    </div>
    <div className="photo-caption"><p aria-live="polite">{photographs[active].caption}<small>{active+1} of {photographs.length}</small></p><div><button disabled={active===0} onClick={()=>go(active-1)} aria-label="Previous photo"><Arrow className="previous-arrow"/></button><button disabled={active===photographs.length-1} onClick={()=>go(active+1)} aria-label="Next photo"><Arrow/></button></div></div>
  </div>;
}
