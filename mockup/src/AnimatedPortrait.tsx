import { useEffect, useRef, useState } from 'react';
/** A silent decorative clip. The supplied first frame appears before any video download. */
export function AnimatedPortrait({paused}:{paused:boolean}) {
  const ref=useRef<HTMLVideoElement>(null);const [playing,setPlaying]=useState(false);
  useEffect(()=>{
    const video=ref.current!;let visible=false,disposed=false;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{if(!paused&&!preference.matches&&!document.hidden&&visible){video.play().catch(()=>setPlaying(false));}else{video.pause();setPlaying(false);}};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.1});observer.observe(video);
    const started=()=>{if(disposed||paused||preference.matches||document.hidden||!visible){video.pause();return;}setPlaying(true);};
    video.addEventListener('playing',started);document.addEventListener('visibilitychange',sync);preference.addEventListener('change',sync);
    return()=>{disposed=true;observer.disconnect();video.pause();video.removeEventListener('playing',started);document.removeEventListener('visibilitychange',sync);preference.removeEventListener('change',sync);};
  },[paused]);
  return <><video ref={ref} muted playsInline loop preload="none" poster="/media/personal/dj-animated.poster.webp" aria-hidden="true" src="/media/personal/dj-animated.mp4"/>{<img style={{opacity:playing?0:1}} className="animated-portrait-poster" src="/media/personal/dj-animated.poster.webp" alt="Illustrated portrait of Sora at the decks surrounded by colourful energy." width="960" height="1280"/>}<span className="image-stamp">IN MY ELEMENT</span></>;
}
