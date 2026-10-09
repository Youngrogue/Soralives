# The Soraverse website

The current v2 implementation uses a short home page and four dedicated worlds. All changes are local until pushed and deployed.

## Run

From the repository root:

```sh
nvm install
nvm use
cd mockup
npm ci
npm run dev
```

Open http://127.0.0.1:4176/. No credentials or .env file are needed.

```sh
npm test
npm run build
node scripts/check-pages.mjs
npm run preview
```

Stop the dev server before using preview on the same port. To run both, use `npm run preview -- --port 4177`. To check its HTTP routes from the repository root, run `node mockup/scripts/check-pages.mjs mockup/dist http://127.0.0.1:4177`.

## Pages

| Path | Content |
| --- | --- |
| `/` | Hero, introduction, portrait carousel, room gateway, quote and contact |
| `/tech/` | Projects, films, progress, career timeline, toolkit, Council and enquiries |
| `/sound/` | Music identity, six sets, playlists, music goals, photos and bookings |
| `/arts/` | Stories, art, anime, gaming, cultural goals and Library entrance |
| `/freedom/` | Society, histories, ideas wall, writing goals and Council |
| `/library/` | Searchable screen, reading and games shelves |

Old home section hashes forward to the correct page. Unknown paths show a useful 404.

## Editing

Page components live in `src/Home.tsx`, `TechSection.tsx`, `SoundPage.tsx`, `ArtsPage.tsx`, `SocietySection.tsx` and `Library.tsx`. `src/routes.mjs` holds page metadata and legacy destinations. `navigation.ts` defines Explore; `PageDirectory.tsx` holds local contents.

`professional-content.ts` holds factual career and project records. `content.ts` holds supplied music links, socials, Council copy and the cultural catalogue. `living-content.ts` holds editable goals and ideas wall entries. Update approved content fixtures alongside any intentional catalogue or destination changes.

Required optimised media and fonts live in `public/`. Original archives and generation masters are not required to run the website. The Three.js hero and its media load on home. Other pages load their own components rather than the entire experience.

## Hosting

Vercel project root: `mockup`. Install: `npm ci`. Build: `npm run build`. Output: `dist`. `vercel.json` serves the separate HTML pages and custom 404; do not rewrite every route to `/index.html`.

Vercel production builds allow indexing and include six pages in the sitemap. Preview and local builds remain outside search indexes. The application reads only Vercel’s automatic `VERCEL_ENV` for this purpose. Email and public platform links need no integration credentials. No CMS, contact backend or newsletter signup service is configured.

See [dependencies and access](../docs/DEPENDENCIES-AND-ACCESS.md), [revision record](../docs/NEXT-REVISION.md) and [design system](../docs/DESIGN-SYSTEM.md).


## Cloud transition revision

This branch uses Aceternity procedural clouds in the hero and page margins, plus a cloud wipe between internal pages. The public component source and adaptation are documented in `../docs/CLOUD-TRANSITIONS.md`. No extra packages or credentials are required. Vercel root remains `mockup`.
