import * as THREE from 'three';

export type AtmosphereController = { setRunning: (running: boolean) => void; destroy: () => void };
export function createAtmosphere(container: HTMLDivElement, still: boolean): AtmosphereController {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x2457ee, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.1, 100);
  camera.position.z = 12;
  const canvas = renderer.domElement;
  canvas.className = 'sky-canvas'; container.appendChild(canvas);
  let running = !still, contextLost = false, disposed = false, raf = 0, last = 0, elapsed = still ? 4 : 0;
  let px = 0, py = 0, pointerX = 0, pointerY = 0;
  let framing = 1;
  const texture = new THREE.TextureLoader().load('/assets/cloud.webp', () => { if (!disposed) { render(); container.dataset.mode = 'webgl'; } }, undefined, () => { if (!disposed) { container.dataset.mode = 'fallback'; setRunning(false); } });
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const cloudSettings = [
    { x: -9.9, y: -.1, z: 0, w: 17.5, opacity: .68, angle: -.18 },
    { x: 10.9, y: 1.6, z: -1, w: 18.8, opacity: .60, angle: .32 },
    { x: 1.9, y: -4.5, z: 1, w: 23.5, opacity: .45, angle: -.06 },
    { x: -5, y: 4.5, z: -2, w: 17, opacity: .18, angle: .16 },
  ];
  const clouds = cloudSettings.map((s, i) => {
    const material = new THREE.MeshBasicMaterial({ map: texture, color: i === 2 ? 0xaacced : 0xfff8e5, transparent: true, opacity: s.opacity, depthWrite: false, depthTest: false });
    const mesh = new THREE.Mesh(geometry, material); mesh.scale.set(s.w, s.w * .486, 1); mesh.rotation.z = s.angle;
    mesh.position.set(s.x, s.y, s.z); mesh.renderOrder = i;
    scene.add(mesh); return mesh;
  });
  const dustGeometry = new THREE.BufferGeometry();
  const coords = new Float32Array(180 * 3); let seed = 12345;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 180; i++) { coords[i*3] = (random()-.5)*28; coords[i*3+1] = (random()-.5)*11; coords[i*3+2] = -4; }
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(coords, 3));
  const dustMaterial = new THREE.PointsMaterial({ size: .009, color: 0xc9ccca, transparent: true, opacity: .48, depthWrite: false });
  const dust = new THREE.Points(dustGeometry, dustMaterial); scene.add(dust);
  function render() {
    if (disposed || contextLost) return;
    px += (pointerX-px)*.025; py += (pointerY-py)*.025;
    const reveal = 1-Math.exp(-elapsed*1.2);
    clouds.forEach((mesh,i) => {
      const base = cloudSettings[i];
      mesh.position.x = base.x * framing + (i%2 ? -1 : 1) * (1-reveal)*4.2 * framing + Math.sin(elapsed*.09+i)*.25 + px*(.18+i*.09);
      mesh.position.y = base.y + Math.cos(elapsed*.06+i)*.15 + py*.12;
    });
    dust.rotation.z = elapsed*.0007;
    renderer.render(scene,camera);
  }
  function frame(now: number) {
    if (!running || disposed || contextLost) return;
    raf = requestAnimationFrame(frame);
    if (now-last < 1000/30) return;
    elapsed += Math.min((now-last)/1000, .06); last=now;
    render();
  }
  function setRunning(value: boolean) {
    if (disposed) return;
    running = value; cancelAnimationFrame(raf);
    if (running && !contextLost) { last=performance.now(); raf=requestAnimationFrame(frame); }
    else { elapsed = Math.max(elapsed, 4); render(); }
  }
  function resize() {
    const w=container.clientWidth,h=container.clientHeight;
    if (!w||!h) return;
    const aspect=w/h; camera.left=-5*aspect;camera.right=5*aspect;camera.updateProjectionMatrix();
    framing=Math.max(.4,Math.min(1,aspect/1.6));
    clouds.forEach((mesh,i)=>{const width=cloudSettings[i].w*(.65+.35*framing);mesh.scale.set(width,width*.486,1);});
    const scale=Math.min(1, 1600/w, 1000/h);renderer.setSize(Math.round(w*scale),Math.round(h*scale),false);
    render();
  }
  const observer=new ResizeObserver(resize); observer.observe(container);
  const pointer=(e: PointerEvent) => { if (e.pointerType !== 'mouse') return; const b=container.getBoundingClientRect(); pointerX=(e.clientX/b.width-.5)*2;pointerY=-((e.clientY-b.top)/b.height-.5)*2; };
  window.addEventListener('pointermove',pointer,{passive:true});
  const lost=(e:Event) => {e.preventDefault();contextLost=true;container.dataset.mode='fallback';cancelAnimationFrame(raf);};
  canvas.addEventListener('webglcontextlost',lost);
  const restored=()=>{contextLost=false;container.dataset.mode='webgl';resize();setRunning(running);};
  canvas.addEventListener('webglcontextrestored',restored);
  resize();setRunning(!still);
  return {setRunning,destroy:()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('pointermove',pointer);canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);clouds.forEach(c=>c.material.dispose());geometry.dispose();texture.dispose();dustGeometry.dispose();dustMaterial.dispose();renderer.dispose();canvas.remove();}};
}
