import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {routes, worlds} from '../src/routes.mjs';

const workspace=fileURLToPath(new URL('../..',import.meta.url));
const output=resolve(workspace,process.argv[2] || 'mockup/dist');
const origin=process.argv[3];
const production=process.argv.includes('--production');
for (const route of routes) {
 const entry=route.path==='/'?'index.html':route.path.endsWith('.html')?route.path.slice(1):`${route.path.slice(1)}index.html`;
 const html=readFileSync(resolve(output,entry),'utf8');
 assert.ok(html.includes(`<title>${route.title}</title>`), `Incorrect title: ${entry}`);
 assert.ok(html.includes(`content="${production&&route.id!=='not-found'?'index, follow':'noindex, nofollow'}"`),`Incorrect indexing: ${entry}`);
 if(route.id!=='not-found') assert.ok(html.includes(`href="https://www.soralives.xyz${route.path}"`),`Canonical missing: ${entry}`);
 for (const script of html.matchAll(/<script[^>]*type="module"[^>]*>/g)) assert.ok(script[0].includes('blocking="render"'), `Render blocking lost: ${entry}`);
 if(origin&&!origin.startsWith('--')) {
  const response=await fetch(origin+route.path,{headers:{Accept:'text/html'}});
  assert.equal(response.status,200,`Route not served: ${route.path}`);
  assert.ok((await response.text()).includes(`<title>${route.title}</title>`),`Wrong page served: ${route.path}`);
 }
}
for (const world of worlds) assert.ok(existsSync(resolve(output,world.image.slice(1))),`Room missing: ${world.image}`);
const sitemap=readFileSync(resolve(output,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length, production?6:0);
if(origin&&!origin.startsWith('--')) {
 const response=await fetch(origin+'/not-a-world',{headers:{Accept:'text/html'}});
 assert.equal(response.status,404,'Unknown page needs a genuine 404');
 assert.match(await response.text(),/Page not found \| The Soraverse/);
}
console.log(`Verified seven HTML entries, room assets, render blocking, ${production?'production':'preview'} discovery${origin&&!origin.startsWith('--')?', HTTP routing and 404':''}.`);
