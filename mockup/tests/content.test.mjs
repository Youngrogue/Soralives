import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { libraryShelves, musicLinks, playlistLinks, socials } from '../src/content.ts';

import { professionalProjects, experienceItems } from '../src/professional-content.ts';

const catalogue = readFileSync(new URL('./fixtures/catalogue.md', import.meta.url), 'utf8');
const inventory = readFileSync(new URL('./fixtures/links.md', import.meta.url), 'utf8');

function sourceTitles(heading) {
  const section = catalogue.split(`## ${heading}\n`)[1]?.split('\n## ')[0];
  assert.ok(section, `Missing source shelf: ${heading}`);
  return section.split('\n').filter(line => line.startsWith('- ')).map(line => line.slice(2));
}

function displayTitle(title) {
  if (title.includes(' — provisional match for ')) return title.split(' — provisional match for ')[0];
  const [name, format] = title.split(' — ');
  return format ? `${name} (${format.replace(/ \((\d{4})\)$/, ', $1')})` : name;
}

test('every current catalogue entry appears once in its source order', () => {
  const expectedShelves = [
    { id: 'screen', heading: 'Viewing shelf', count: 147 },
    { id: 'reading', heading: 'Reading shelf', count: 121 },
    { id: 'games', heading: 'Games — provisional', count: 1 },
  ];

  assert.deepEqual(libraryShelves.map(shelf => shelf.id), expectedShelves.map(shelf => shelf.id));
  for (const expected of expectedShelves) {
    const shelf = libraryShelves.find(item => item.id === expected.id);
    const titles = sourceTitles(expected.heading).map(displayTitle);
    assert.equal(shelf.titles.length, expected.count);
    assert.deepEqual(shelf.titles, titles);
    assert.equal(new Set(shelf.titles).size, expected.count);
    assert.ok(shelf.titles.every(title => !title.includes(' — ') && !title.includes('provisional')));
  }
  assert.deepEqual(libraryShelves.at(-1).titles, ['The Elder Scrolls V: Skyrim']);
});

test('outbound destinations use supplied URLs and include all six DJ sets', () => {
  const suppliedUrls = new Set(inventory.match(/https:\/\/[^\s`)<]+/g));
  const outbound = [...musicLinks, ...playlistLinks, ...socials, ...professionalProjects.filter(project => project.url)];
  for (const entry of outbound) assert.ok(suppliedUrls.has(entry.url), `URL missing from inventory: ${entry.url}`);

  const directSets = [...inventory.matchAll(/\]\((https:\/\/soundcloud\.com\/soralive\/[a-z0-9-]+)\)/g)].map(match => match[1]);
  const displayedSets = musicLinks.filter(link => link.url.startsWith('https://soundcloud.com/soralive/')).map(link => link.url);
  assert.equal(directSets.length, 6);
  assert.deepEqual(displayedSets, directSets);
  assert.equal(musicLinks.length, 8);
  assert.ok(musicLinks.some(link => link.url === 'https://soundcloud.com/soralive'));
  assert.ok(musicLinks.some(link => link.url === 'https://linktr.ee/rogueskye'));
  assert.ok(musicLinks.every(link => !/[-–—]/u.test(link.label)));
  assert.equal(playlistLinks.filter(link => link.url.startsWith('https://spotify.link/')).length, 3);
  assert.deepEqual(socials.map(link => link.label), ['Instagram', 'TikTok', 'X', 'Substack']);
});

test('project status and destinations follow verified current evidence', () => {
  assert.equal(professionalProjects.length, 3);
  assert.equal(professionalProjects.find(p => p.id === 'hades').status, 'Live');
  assert.equal(professionalProjects.find(p => p.id === 'hades').url, 'https://hades.soralives.xyz/');
  assert.equal(professionalProjects.find(p => p.id === 'odyssey').status, 'In development');
  assert.equal(professionalProjects.find(p => p.id === 'odyssey').url, null);
  assert.equal(professionalProjects.find(p => p.id === 'delphi').url, 'https://delphiatlas.com/');
  for (const project of professionalProjects) {
    for (const key of ['screenshot', 'poster', 'film']) {
      assert.ok(readFileSync(new URL(`../public${project[key]}`, import.meta.url)).byteLength > 0, `${project.id} ${key} missing`);
    }
  }
});

test('career sequence excludes Medallion and preserves distinct tenure and progression', () => {
  assert.deepEqual(experienceItems.map(item => item.id), ['shell', 'ecm', 'gtbank', 'kpmg']);
  const kpmg = experienceItems.find(item => item.id === 'kpmg');
  assert.equal(kpmg.period, 'OCTOBER 2021 TO PRESENT');
  assert.match(kpmg.position, /Experienced Analyst to Assistant Manager/);
});
