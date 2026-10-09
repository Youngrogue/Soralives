import {
  ACESFilmicToneMapping, AmbientLight, CircleGeometry, CylinderGeometry,
  DirectionalLight, Group, Mesh, MeshStandardMaterial, OrthographicCamera,
  Scene, SphereGeometry, SRGBColorSpace, TextureLoader, TorusGeometry, WebGLRenderer,
} from 'three';
import type { BufferGeometry, Material, Texture } from 'three';

export type HeroSceneController = { setRunning: (value: boolean) => void; destroy: () => void };

/** A small, lazy scene. No models, postprocessing, pointer listeners or runtime services. */
export function createHeroScene(container: HTMLDivElement): HeroSceneController {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.className = 'hero-scene-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, .1, 2000);
  camera.position.z = 1000;
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  const geometry = <T extends BufferGeometry>(value: T): T => { geometries.add(value); return value; };
  const material = <T extends Material>(value: T): T => { materials.add(value); return value; };
  scene.add(new AmbientLight(0xc8dcff, 2.3));
  const sun = new DirectionalLight(0xfff7df, 3.1);
  sun.position.set(-180, 300, 1000); scene.add(sun);
  const rim = new DirectionalLight(0x65ceff, 2.4);
  rim.position.set(400, -100, 200); scene.add(rim);

  const lunarMaterial = material(new MeshStandardMaterial({ color: '#f1eee5', roughness: 1, metalness: 0, bumpScale: 1.4 }));
  const moon = new Mesh(geometry(new SphereGeometry(1, 64, 48)), lunarMaterial);
  // The near side of NASA's longitude-centred map faces the camera.
  moon.rotation.set(.08, -Math.PI / 2, -.12);
  scene.add(moon);

  const record = new Group();
  const wax = material(new MeshStandardMaterial({ color: '#111c2b', roughness: .3, metalness: .55 }));
  const groove = material(new MeshStandardMaterial({ color: '#294052', roughness: .34, metalness: .72 }));
  const label = material(new MeshStandardMaterial({ color: '#f6a954', roughness: .5, metalness: .15 }));
  const disc = new Mesh(geometry(new CylinderGeometry(1, 1, .055, 64)), wax);
  disc.rotation.x = Math.PI / 2; record.add(disc);
  for (let i = 0; i < 15; i++) {
    const ring = new Mesh(geometry(new TorusGeometry(.4 + i * .037, .0032, 3, 64)), groove);
    ring.position.z = .031; record.add(ring);
  }
  const centre = new Mesh(geometry(new CircleGeometry(.33, 40)), label);
  centre.position.z = .034; record.add(centre);
  const hole = new Mesh(geometry(new CircleGeometry(.037, 16)), wax);
  hole.position.z = .036; record.add(hole);
  const labelArc = new Mesh(geometry(new TorusGeometry(.24, .009, 4, 40, Math.PI * 1.5)), wax);
  labelArc.position.z = .037; record.add(labelArc);
  record.rotation.set(-.35, -.3, .25); scene.add(record);

  const orbit = new Group();
  const gold = material(new MeshStandardMaterial({ color: '#f7c64d', roughness: .25, metalness: .7 }));
  const glass = material(new MeshStandardMaterial({ color: '#63d9ca', roughness: .24, metalness: .4 }));
  const core = new Mesh(geometry(new SphereGeometry(.23, 24, 16)), glass);
  orbit.add(core);
  for (let i = 0; i < 3; i++) {
    const ring = new Mesh(geometry(new TorusGeometry(.82, .014, 8, 80)), gold);
    ring.rotation.set(.5 + i * .7, i * .9, .3); orbit.add(ring);
    const node = new Mesh(geometry(new SphereGeometry(.057, 12, 8)), i % 2 ? glass : gold);
    node.position.set(Math.cos(i * 2.1) * .8, Math.sin(i * 2.1) * .8, 0); orbit.add(node);
  }
  scene.add(orbit);

  let width = 1, height = 1, running = false, destroyed = false, contextLost = false, surfaceReady = false, surfaceFailed = false;
  let frame = 0, phase = 0, previous = 0, progress = 0;
  const render = () => { if (!destroyed && !contextLost && !surfaceFailed) renderer.render(scene, camera); };
  const position = () => {
    const compact = width < 601;
    const moonRadius = compact ? 54 : Math.min(120, width * .085);
    moon.scale.setScalar(moonRadius);
    moon.position.set(width * (compact ? .3 : .315), height * (compact ? .255 : .285) - progress * height * .085, 0);
    record.scale.setScalar(compact ? 36 : Math.min(70, width * .057));
    record.position.set(-width * (compact ? .33 : .345), -height * .19 + Math.sin(phase * .45) * 5 + progress * height * .1, 15);
    record.rotation.z = .25 + phase * .025 + progress * .65;
    orbit.scale.setScalar(compact ? 40 : Math.min(80, width * .065));
    orbit.position.set(width * .345, -height * .205 + Math.cos(phase * .4) * 6 + progress * height * .12, 15);
    orbit.rotation.set(.15 + phase * .018, .3 + progress * .8, -.2 + phase * .04);
  };
  const resize = () => {
    width = Math.max(1, container.clientWidth); height = Math.max(1, container.clientHeight);
    camera.left = -width / 2; camera.right = width / 2;
    camera.top = height / 2; camera.bottom = -height / 2;
    camera.updateProjectionMatrix(); renderer.setSize(width, height, false);
    position(); render();
  };
  const step = (time: number) => {
    if (!running || destroyed || contextLost || !surfaceReady || surfaceFailed) return;
    const delta = previous ? Math.min((time - previous) / 1000, .05) : 0;
    previous = time; phase += delta;
    const rect = container.getBoundingClientRect();
    progress = Math.max(0, Math.min(1, -rect.top / height));
    position(); render(); frame = requestAnimationFrame(step);
  };
  const loader = new TextureLoader();
  const surface = loader.load('/media/hero/lunar-surface.jpg', texture => {
    if (destroyed) { texture.dispose(); return; }
    lunarMaterial.map = texture; lunarMaterial.needsUpdate = true;
    surfaceReady = true;
    render(); container.dataset.mode = 'webgl';
    if (running && !contextLost) { previous = 0; cancelAnimationFrame(frame); frame = requestAnimationFrame(step); }
  }, undefined, () => {
    surfaceFailed = true; running = false; cancelAnimationFrame(frame);
    container.dataset.mode = 'fallback';
  });
  surface.colorSpace = SRGBColorSpace; textures.add(surface);
  const elevation = loader.load('/media/hero/lunar-elevation.jpg', texture => {
    if (destroyed) { texture.dispose(); return; }
    lunarMaterial.bumpMap = texture; lunarMaterial.needsUpdate = true; render();
  });
  textures.add(elevation);
  const observer = new ResizeObserver(resize); observer.observe(container); resize();
  const lost = (event: Event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); container.dataset.mode = 'fallback'; };
  const restored = () => { contextLost = false; container.dataset.mode = lunarMaterial.map ? 'webgl' : 'fallback'; render(); if (running && surfaceReady && !surfaceFailed) { previous = 0; frame = requestAnimationFrame(step); } };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  renderer.domElement.addEventListener('webglcontextrestored', restored);

  return {
    setRunning(value) {
      if (destroyed || surfaceFailed || value === running) return;
      running = value; cancelAnimationFrame(frame); previous = 0;
      if (running && !contextLost && surfaceReady) frame = requestAnimationFrame(step);
    },
    destroy() {
      destroyed = true; cancelAnimationFrame(frame); observer.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      renderer.domElement.removeEventListener('webglcontextrestored', restored);
      geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose()); textures.forEach(value => value.dispose());
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
