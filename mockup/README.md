# The Soraverse website

Current baseline prepared for GitHub on 6 October 2026. The visual revision requested after the mockup remains planned.

## Run from a fresh clone

```sh
cd mockup
nvm install
nvm use
npm ci
npm run dev
```

Open http://127.0.0.1:4176/. No credentials or .env file are needed. `npm test` runs content checks; `npm run build` runs TypeScript checking and produces `dist/`. `npm run preview` serves the built site on port 4176 when the development server is stopped.

## Included

1. Colourful homepage and the organised Explore menu.
2. Higgsfield cloud film, still fallback and motion controls.
3. Cinematic full length intro portrait and selected personal photographs.
4. Music links, four employer entries, skills and three project showcases with screenshots and films.
5. All 269 cultural entries, searchable shelves and direct Library navigation.
6. Local room illustrations, company marks, project logos and fonts.
7. Contact and supplied social and Substack links.

All 52 files in `public/` are included in the repository. These are the web assets, including the required photographs and videos. Original generation masters and unused photo archives remain in the local parent workspace and are not needed to run the site.

## Content and structure

`src/Home.tsx` holds homepage sections. `src/TechSection.tsx` holds career and project presentation. `src/professional-content.ts` holds professional records. `src/content.ts` holds music, social links and the cultural catalogue. `src/navigation.ts` defines the Explore directory. `src/Library.tsx` handles browsing and search. `src/HeroAtmosphere.tsx` handles the current video atmosphere. Existing Three.js experiments remain in source but are not mounted by the current hero.

Content tests use `tests/fixtures/`, so a fresh clone does not depend on excluded parent notes. Update the approved fixture and application content together when the underlying supplied content changes.

## Deployment

Set the hosting project root to `mockup`, install with `npm ci`, build with `npm run build`, and publish `dist`. `/` and `/library/` are separate HTML entry points. The current app expects hosting at the domain root. A GitHub Pages project URL with a repository subpath needs a separate path review before deployment.

The preview retains `noindex, nofollow`. Hosting, domain setup, production metadata, final accessibility and media attribution review remain launch work. No CMS, newsletter submission or contact backend is configured.

See [dependencies and access](../docs/DEPENDENCIES-AND-ACCESS.md), [next revision](../docs/NEXT-REVISION.md) and [repository checks](../docs/REPOSITORY-CHECKS.md).
