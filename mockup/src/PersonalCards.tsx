import { useEffect, useRef, useState } from 'react';
import { Arrow, Star } from './Icons';

export function ReflectionCard({ image, alt, title, text, className = '', onFlip }: {image:string;alt:string;title:string;text:string;className?:string;onFlip?:(open:boolean)=>void}) {
  const [flipped,setFlipped]=useState(false);
  const [instant,setInstant]=useState(false);
  return <article className={`reflection-card ${className} ${flipped?'is-flipped':''} ${instant?'instant':''}`}>
    <div className="reflection-turn">
      <div className="reflection-face reflection-front" aria-hidden={flipped}><img src={image} alt={alt} width="800" height="1067" loading="lazy"/></div>
      <div className="reflection-face reflection-back" aria-hidden={!flipped} tabIndex={flipped?0:-1}><Star/><h3>{title}</h3><p>{text}</p><span className="eyebrow">A LITTLE ABOUT MY OUTLOOK</span></div>
    </div>
    <button className="reflection-control" onClick={event=>{setInstant(event.detail===0);setFlipped(!flipped);onFlip?.(!flipped);}} aria-expanded={flipped}><span>{flipped?'Back to the photo':title}</span><span className="turn-icon" aria-hidden="true">↻</span></button>
  </article>;
}
type Photograph = {src:string;alt:string;caption:string;reflection?:{title:string;text:string}};
const photographs: Photograph[] = [
  {src:'/media/personal/dj-clean.webp',alt:'Sora in headphones, concentrating on the DJ decks.',caption:'In my element'},
  {src:'/media/personal/dj-decks.webp',alt:'Sora wearing headphones with his hand on the DJ decks.',caption:'At the decks'},
  {src:'/media/personal/dj-sage.webp',alt:'Sora playing a DJ set, with the original Sage’s House photograph mark visible.',caption:'In the moment'},
];
const portraits: Photograph[] = [
  {src:'/media/personal/sora-intro.webp',alt:'Sora in sunglasses, a white linen shirt and patterned red trousers against a cinematic blue backdrop.',caption:'Hi, I’m Sora',reflection:{title:'Why I make time for this',text:'Our time is finite. I want to spend mine paying attention, making things and discovering more.'}},
  {src:'/media/personal/sora-fullbody.webp',alt:'A full length portrait of Sora in a white shirt and patterned red trousers.',caption:'A little more colour',reflection:{title:'Colour and curiosity',text:'I identify as a sexy main character stuck in a reverse isekai, trying to bring back colour and fun into this unjust world.'}},
  {src:'/media/personal/sora-tan.webp',alt:'Sora in a tan outfit beside a sculpted wall.',caption:'A change of scene',reflection:{title:'Always curious',text:'I love to learn about technology, science, business, history, the universe and human culture.'}},
  {src:'/media/personal/sora-white-shirt.webp',alt:'Sora in a white shirt and blue trousers, taking a mirror portrait.',caption:'Another side of Sora',reflection:{title:'Many sides, one person',text:'Technical project manager, vibe coder, EDM DJ, freedom fighter, animation, movie and TV show fanatic, art and book admirer and overall chill guy.'}},
  {src:'/media/personal/art-portrait.webp',alt:'Sora among framed artworks in a warmly lit interior.',caption:'Among the frames',reflection:{title:'A different way of seeing',text:'I appreciate the imagination and work behind creating something that makes us feel.'}},
  {src:'/media/personal/dj-decks.webp',alt:'Sora wearing headphones with his hand on the DJ decks.',caption:'Finding the rhythm',reflection:{title:'A room finding its rhythm',text:'Good music, shared moments and the people who make a night worth remembering.'}},
];

function PhotoCarousel({photos,label,className='',auto=false,paused=false}:{photos:Photograph[];label:string;className?:string;auto?:boolean;paused?:boolean}) {
  const [active,setActive]=useState(0);
  const root=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false),[hidden,setHidden]=useState(document.hidden);
  const [hover,setHover]=useState(false),[focused,setFocused]=useState(false),[manual,setManual]=useState(false);
  const [reflections,setReflections]=useState<Set<number>>(()=>new Set());
  const [systemReduced,setSystemReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const playing=auto&&!paused&&!systemReduced&&!manual&&!hover&&!focused&&!reflections.has(active)&&visible&&!hidden;
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting&&entry.intersectionRatio>=.25),{threshold:[0,.25]});observer.observe(root.current!);
    const change=()=>setHidden(document.hidden), media=matchMedia('(prefers-reduced-motion: reduce)'),reduce=()=>setSystemReduced(media.matches);
    document.addEventListener('visibilitychange',change);media.addEventListener('change',reduce);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',change);media.removeEventListener('change',reduce);};
  },[]);
  useEffect(()=>{if(!playing)return;const timer=setTimeout(()=>{setInstant(false);setActive(value=>(value+1)%photos.length);},3000);return()=>clearTimeout(timer);},[playing,active,photos.length]);

  const [instant,setInstant]=useState(false);
  const pointer=useRef<{id:number;x:number;y:number}|null>(null);
  const swiped=useRef(false);
  const go=(next:number,keyboard=false)=>{setManual(true);setInstant(keyboard);setActive(Math.max(0,Math.min(photos.length-1,next)));};
  return <div ref={root} className={`photo-carousel ${className}`} onPointerEnter={e=>{if(e.pointerType==='mouse')setHover(true);}} onPointerLeave={()=>setHover(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false);}} role="region" aria-roledescription="carousel" aria-label={label}>
    <div className="carousel-window" onPointerDown={e=>{
      swiped.current=false;
      if(!e.isPrimary || e.button!==0 || (e.target as HTMLElement).closest('button'))return;
      setManual(true);pointer.current={id:e.pointerId,x:e.clientX,y:e.clientY};
      if(e.pointerType!=='mouse')e.currentTarget.setPointerCapture(e.pointerId);
    }} onPointerUp={e=>{
      const start=pointer.current; pointer.current=null;
      if(!start || start.id!==e.pointerId)return;
      const dx=e.clientX-start.x,dy=e.clientY-start.y;
      if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.2){swiped.current=true;go(active+(dx<0?1:-1));}
      if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
    }} onPointerCancel={()=>{pointer.current=null;}} onLostPointerCapture={()=>{pointer.current=null;}}
    onClickCapture={e=>{if(swiped.current){e.preventDefault();e.stopPropagation();swiped.current=false;}}}>
      <div className={`carousel-track ${instant?'instant':''}`} style={{transform:`translate3d(${-active*100}%,0,0)`}}>
        {photos.map((photo,i)=><div className="carousel-slide" key={photo.src} role="group" aria-roledescription="slide" aria-label={`${i+1} of ${photos.length}: ${photo.caption}`} aria-hidden={i!==active} inert={i!==active}>
          {photo.reflection?<ReflectionCard image={photo.src} alt={photo.alt} title={photo.reflection.title} text={photo.reflection.text} onFlip={open=>setReflections(current=>{const next=new Set(current);if(open)next.add(i);else next.delete(i);return next;})}/>:<a className="carousel-image-link" href={photo.src} target="_blank" rel="noreferrer" aria-label={`Open full photo: ${photo.caption}`} draggable={false}><img src={photo.src} alt={photo.alt} width="800" height="1000" loading="lazy" draggable={false}/></a>}
        </div>)}
      </div>
    </div>
    <div className="photo-caption"><p aria-live={playing?'off':'polite'} aria-atomic="true">{photos[active].caption}<small>{String(active+1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')}</small></p><div>
      <button disabled={active===0} onClick={e=>go(active-1,e.detail===0)} aria-label={`Previous ${label.toLowerCase()} photo`}><Arrow className="previous-arrow"/></button>
      <button disabled={active===photos.length-1} onClick={e=>go(active+1,e.detail===0)} aria-label={`Next ${label.toLowerCase()} photo`}><Arrow/></button>
    </div></div>
    {auto&&<button type="button" className="carousel-pause" onClick={()=>setManual(value=>!value)} disabled={paused||systemReduced} aria-pressed={manual||paused||systemReduced}>{paused||systemReduced?'Slideshow paused with motion':manual?'Resume slideshow':'Pause slideshow'}</button>}
  </div>;
}
export function MusicPhotographs(){return <PhotoCarousel photos={photographs} label="Music" className="music-photographs"/>;}
export function IntroPhotographs({paused=false}:{paused?:boolean}){return <PhotoCarousel photos={portraits} label="About Sora" className="intro-photographs" auto paused={paused}/>;}
