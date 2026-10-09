import { AmbientLight, DirectionalLight, WebGLRenderer, Scene, OrthographicCamera, Group, Mesh, MeshStandardMaterial, SphereGeometry, CylinderGeometry, TorusGeometry, OctahedronGeometry, ACESFilmicToneMapping, SRGBColorSpace } from 'three';
import type { BufferGeometry, Material } from 'three';

/** A single small transparent canvas. Original goldwork, not a character or franchise model. */
export function createStaffScene(host: HTMLElement) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setSize(140, 200); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace; renderer.toneMapping = ACESFilmicToneMapping;
  host.append(renderer.domElement);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1.4, 1.4, 2, -2, .1, 50); camera.position.z = 10;
  scene.add(new AmbientLight(0xd3eaff, 2.6));
  const key = new DirectionalLight(0xfff0c5, 4); key.position.set(-3, 4, 6); scene.add(key);
  const rim = new DirectionalLight(0x63e9e0, 3); rim.position.set(3, -1, 3); scene.add(rim);
  const staff = new Group(); scene.add(staff);
  const geometries: BufferGeometry[] = [], materials: Material[] = [];
  const gold = new MeshStandardMaterial({color:0xe2b64d,metalness:.83,roughness:.23});
  const wood = new MeshStandardMaterial({color:0x382c25,metalness:.16,roughness:.5});
  const jewel = new MeshStandardMaterial({color:0x75f5e3,emissive:0x1ba8a4,emissiveIntensity:1,metalness:.2,roughness:.18});
  materials.push(gold,wood,jewel);
  const mesh = (g: BufferGeometry, m: Material, x=0,y=0,z=0) => { geometries.push(g); const o=new Mesh(g,m);o.position.set(x,y,z);staff.add(o);return o; };
  mesh(new CylinderGeometry(.043,.025,2.35,16),wood,0,-.3);
  mesh(new CylinderGeometry(.062,.045,.4,16),gold,0,-1.32);
  mesh(new SphereGeometry(.075,16,12),gold,0,-1.58);
  for(let i=0;i<7;i++) { const band=mesh(new TorusGeometry(.057,.012,6,24),gold,0,-.94+i*.17);band.rotation.x=Math.PI/2; }
  mesh(new CylinderGeometry(.14,.055,.32,16),gold,0,.82);
  const crown=mesh(new TorusGeometry(.47,.046,10,56,Math.PI*1.65),gold,0,1.24);crown.rotation.z=-Math.PI*.32;
  const inner=mesh(new TorusGeometry(.36,.018,8,48,Math.PI*1.55),gold,0,1.24,.02);inner.rotation.z=-Math.PI*.26;
  for(const direction of [-1,1]) {
    const leaf=mesh(new TorusGeometry(.2,.033,8,32,Math.PI*1.15),gold,direction*.27,.96,.02);leaf.rotation.z=direction*.65;
    mesh(new SphereGeometry(.063,16,12),gold,direction*.24,1.63);
  }
  const gem=mesh(new OctahedronGeometry(.23),jewel,0,1.27,.05);
  mesh(new SphereGeometry(.045,16,12),jewel,0,-1.63);
  let disposed=false,contextLost=false;
  const render=(phase:number,casting=false)=>{if(disposed||contextLost)return;staff.rotation.y=Math.sin(phase*.5)*.22;gem.rotation.y=phase*.6;jewel.emissiveIntensity=casting?2:1;renderer.render(scene,camera);};
  render(0);
  const lost=(event:Event)=>{event.preventDefault();contextLost=true;host.dataset.render='fallback';};
  const restored=()=>{contextLost=false;host.dataset.render='ready';render(0);};
  renderer.domElement.addEventListener('webglcontextlost',lost);renderer.domElement.addEventListener('webglcontextrestored',restored);
  host.dataset.render='ready';
  return {render,destroy(){disposed=true;renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('webglcontextrestored',restored);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();}};
}
