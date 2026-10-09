import { useEffect, useRef } from 'react';
import type { createStaffScene } from './StaffScene';
import './magic.css';

export function MagicCompanion({ paused }: { paused: boolean }) {
  const host=useRef<HTMLDivElement>(null), body=useRef<HTMLDivElement>(null);
  const pausedRef=useRef(paused);pausedRef.current=paused;
  const syncRef=useRef<()=>void>(()=>{});
  useEffect(()=>{
    const element=host.current!, model=body.current!;
    const touch=matchMedia('(max-width: 700px), (pointer: coarse)'), reduce=matchMedia('(prefers-reduced-motion: reduce)');
    let scene:ReturnType<typeof createStaffScene>|undefined, disposed=false, loading=false;
    let frame=0, last=0, phase=0, castUntil=0, targetX=0,targetY=0;
    let x=innerWidth-58,y=innerHeight*.66,rotation=-.25;
    const effects=new Map<HTMLElement,number>();
    const halted=()=>pausedRef.current||reduce.matches||document.hidden;
    const draw=(now:number)=>{
      frame=0;if(halted())return;
      const elapsed=last?Math.min((now-last)/1000,.05):0;last=now;phase+=elapsed;
      const casting=now<castUntil;
      if(touch.matches&&!casting){element.style.opacity='0';last=0;return;}
      const tx=casting?targetX:innerWidth-50, ty=casting?targetY:innerHeight*.66+Math.sin(phase*.7)*12;
      const mix=1-Math.exp(-elapsed*(casting?10:4));x+=(tx-x)*mix;y+=(ty-y)*mix;
      const desired=casting?Math.max(-.8,Math.min(.8,(targetX-x)*.006)):-.25+Math.sin(phase*.4)*.08;
      rotation+=(desired-rotation)*mix;
      element.style.transform=`translate3d(${x-70}px,${y-100}px,0) rotate(${rotation}rad)`;
      element.style.opacity=casting?'1':'.85';element.dataset.casting=String(casting);
      scene?.render(phase,casting);frame=requestAnimationFrame(draw);
    };
    const sync=()=>{
      cancelAnimationFrame(frame);frame=0;last=0;
      if(halted()){element.style.opacity='0';return;}
      if(!scene&&!loading){loading=true;import('./StaffScene').then(({createStaffScene})=>{if(disposed)return;try{scene=createStaffScene(model);}catch{model.dataset.render='fallback';}}).catch(()=>{model.dataset.render='fallback';});}
      if(!touch.matches||performance.now()<castUntil)frame=requestAnimationFrame(draw);
      else element.style.opacity='0';
    };
    const respond=(target:HTMLElement|null,clientY?:number)=>{
      if(document.hidden||!target||target.closest('[inert]')||target.getAttribute('aria-disabled')==='true')return;
      clearTimeout(effects.get(target));target.classList.add('spell-target');
      effects.set(target,window.setTimeout(()=>{target.classList.remove('spell-target');effects.delete(target);},650));
      if(halted())return;
      const rect=target.getBoundingClientRect();
      const cy=clientY??rect.top+rect.height/2;
      targetX=rect.right+125<innerWidth?rect.right+76:rect.left>125?rect.left-76:innerWidth-48;targetY=Math.max(110,Math.min(innerHeight-105,cy+75));
      // Native dialogs are in the top layer. The target highlight stays inside it; no overlay blocks it.
      if(target.closest('dialog[open]'))return;
      if(touch.matches){x=targetX;y=targetY;}
      castUntil=performance.now()+800;sync();
    };
    const activate=(event:MouseEvent)=>{
      if(event.button!==0)return;
      const target=event.target instanceof Element?event.target.closest<HTMLElement>('a[href],button:not(:disabled),summary,[role="tab"],[role="button"]'):null;
      respond(target,event.detail===0?undefined:event.clientY);
    };
    const activateTab=(event:KeyboardEvent)=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||!(event.target instanceof Element)||event.target.getAttribute('role')!=='tab'||!event.defaultPrevented)return;
      // React's tab handler moves focus first. Feedback follows the newly selected tab.
      queueMicrotask(()=>{if(!disposed&&document.activeElement instanceof HTMLElement&&document.activeElement.getAttribute('role')==='tab')respond(document.activeElement);});
    };
    syncRef.current=sync;document.addEventListener('click',activate,true);document.addEventListener('keydown',activateTab);
    document.addEventListener('visibilitychange',sync);touch.addEventListener('change',sync);reduce.addEventListener('change',sync);
    sync();
    return()=>{disposed=true;cancelAnimationFrame(frame);syncRef.current=()=>{};document.removeEventListener('click',activate,true);document.removeEventListener('keydown',activateTab);document.removeEventListener('visibilitychange',sync);touch.removeEventListener('change',sync);reduce.removeEventListener('change',sync);effects.forEach((timer,target)=>{clearTimeout(timer);target.classList.remove('spell-target');});scene?.destroy();};
  },[]);
  useEffect(()=>syncRef.current(),[paused]);
  return <div ref={host} className="magic-companion" aria-hidden="true"><div ref={body} className="staff-model"><span className="staff-fallback"/></div><span className="spell-circle"/><i className="spell-trail"/></div>;
}
