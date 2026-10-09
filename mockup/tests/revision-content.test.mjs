import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { catalogueEntries, writingCards } from '../src/catalogue-content.ts';
import { groupCatalogue, validDate } from '../src/collection-utils.ts';
import { bucketItems, filterBucket } from '../src/bucket-content.ts';
import { adultBucketItems } from '../src/bucket-adult.ts';
import { animeSelections } from '../src/anime-content.ts';
import { skillGroups } from '../src/skills-content.ts';
import { libraryShelves } from '../src/content.ts';
import { expandedLibraryShelves } from '../src/library-content.ts';

test('catalogue keeps undated posts undated and groups real dates or supplied weekly collections',()=>{
 const base=catalogueEntries[0];
 const result=groupCatalogue([{...base,id:'old',date:'2026-09-20'},{...base,id:'a',date:'2026-10-08'},{...base,id:'b',date:'2026-10-08'},{...base,id:'invalid',date:'2026-02-30'},{...base,id:'unknown',weekOf:'2026-10-05'},{...base,id:'weekly',date:'2026-10-07',weekOf:'2026-10-05'}]);
 assert.deepEqual(result.map(group=>group.key),['2026-10-08','week:2026-10-05','2026-09-20','undated']);
 assert.deepEqual(result[0].entries.map(entry=>entry.id),['a','b']);
 assert.deepEqual(result.at(-1).entries.map(entry=>entry.id),['invalid','unknown']);
 assert.equal(validDate('2024-02-29'),true);assert.equal(validDate('2025-02-29'),false);
 assert.equal(groupCatalogue(catalogueEntries)[0].label,'From the collection');
 assert.ok(catalogueEntries.every(entry=>!entry.date&&!entry.weekOf));
});
test('writing starts with the confirmed profile, with no invented article or date',()=>{
 assert.equal(writingCards.length,1);assert.equal(writingCards[0].kind,'profile');assert.equal(writingCards[0].url,'https://substack.com/@soralives');assert.equal(writingCards[0].date,undefined);
 for(const card of writingCards)assert.ok(existsSync(new URL('../public'+card.image,import.meta.url)));
});
test('all 25 aspirations survive with intimate content separate and completion unmarked',()=>{
 const all=[...bucketItems,...adultBucketItems];assert.equal(all.length,25);assert.equal(new Set(all.map(item=>item.id)).size,25);
 assert.equal(adultBucketItems.length,6);assert.ok(bucketItems.every(item=>!item.adult));assert.ok(adultBucketItems.every(item=>item.adult));
 assert.ok(all.every(item=>item.status==='unmarked'&&!item.completedOn));
 assert.equal(adultBucketItems.find(item=>item.id==='car').note,'20 July 2022');
 assert.equal(filterBucket(bucketItems,'music','all').length,5);assert.equal(filterBucket(all,'all','complete').length,0);
 assert.equal(filterBucket([{...bucketItems[0],status:'complete',completedOn:'2026-10-09'}],'travel','complete').length,1);
});
test('anime provenance keeps release selections unranked and preserves every original Library title',()=>{
 assert.equal(animeSelections.length,4);assert.equal(animeSelections.find(item=>item.title==='One Piece').rank,undefined);
 assert.ok(animeSelections.filter(item=>item.rank).every(item=>item.post.endsWith('7694002911180901640')));
 const original=libraryShelves.find(shelf=>shelf.id==='screen').titles;
 const combined=new Set(expandedLibraryShelves.find(shelf=>shelf.id==='screen').titles);
 assert.ok(original.every(title=>combined.has(title)));assert.equal(combined.size,151);
});
test('every source skill and tool remains available, with product and AI first',()=>{
 const names=new Set(skillGroups.flatMap(group=>group.items.map(item=>item.name)));
 const required=['Enterprise Digital Transformation','Agentic Product Engineering','Banking Operations Expertise','Technology Advisory & Strategy','Vendor & SI Management','QA & UAT Management','Requirements & Business Analysis','Calypso','Oracle FLEXCUBE','Temenos Transact','Temenos Digital','Finacle','Finacle Treasury','Oracle Lending','Oracle Trade','Kastle','Microsoft Dynamics','SAP','Next.js','React','TypeScript','Payload CMS','PostgreSQL','Neon','Vercel','Cloudflare','GitHub','API & Middleware Integration','Microservices Architecture','ETL & Data Migration','SQL','Postman','Claude Code','Codex','Manus','Z AI','Qwen','Jira','Confluence','MS Project','Azure Test Plans','Power BI','Figma','Canva','Agile / Scrum','Waterfall','SDLC','Requirements Traceability (RTM)','Risk Management','Change Management'];
 for(const name of required)assert.ok(names.has(name),name);
 assert.deepEqual(skillGroups.filter(group=>group.primary).map(group=>group.icon),['delivery','ai','code']);
});
