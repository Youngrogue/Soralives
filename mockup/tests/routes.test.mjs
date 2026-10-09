import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { routes, routeForPath, legacyDestination, worlds } from '../src/routes.mjs';

test('each public world has its own entry and canonical route', () => {
  assert.deepEqual(worlds.map(world=>world.path), ['/tech/', '/sound/', '/arts/', '/freedom/']);
  for (const route of routes) {
    const entry = route.path === '/' ? 'index.html' : route.path.endsWith('.html') ? route.path.slice(1) : `${route.path.slice(1)}index.html`;
    assert.ok(existsSync(new URL(`../${entry}`, import.meta.url)), `${route.id} HTML entry missing`);
    assert.equal(routeForPath(route.path).id, route.id);
    if (route.id !== 'not-found') {
      assert.equal(routeForPath(route.path.replace(/\/$/, '') || '/').id, route.id);
      assert.equal(routeForPath(route.path+'index.html').id, route.id);
    }
  }
  assert.equal(routeForPath('/tech/something-unknown').id, 'not-found');
  assert.equal(routeForPath('/unknown').id, 'not-found');
});

test('shared links from the landing page reach the correct new page and preserve query context', () => {
  const cases = {projects:'tech',hades:'tech',experience:'tech',toolkit:'tech',music:'sound',sets:'sound',playlists:'sound',culture:'arts',gaming:'arts','anime-finds':'arts',ideas:'freedom',histories:'freedom','ideas-wall':'freedom','council-ideas':'freedom'};
  for (const [anchor, page] of Object.entries(cases)) {
    assert.equal(legacyDestination('/', `#${anchor}`), `/${page}/#${anchor}`);
    assert.equal(legacyDestination('/index.html', `#${anchor}`, '?from=old-link'), `/${page}/?from=old-link#${anchor}`);
  }
  assert.equal(legacyDestination('/', '#%70rojects'), '/tech/#projects');
});

test('home, new routes, unknown hashes and library shelves are never redirected', () => {
  for (const hash of ['', '#top', '#about', '#worlds', '#contact', '#unknown', '#%']) assert.equal(legacyDestination('/', hash), null);
  for (const path of ['/tech/', '/sound/', '/arts/', '/freedom/', '/library/']) assert.equal(legacyDestination(path, '#projects'), null);
  assert.equal(legacyDestination('/library/', '#reading'), null);
  assert.equal(legacyDestination('/404.html', '#projects'), null);
});
