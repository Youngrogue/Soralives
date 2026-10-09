# Soralives

The Soraverse is Sora's personal website for projects, music, culture and ideas.

The working React and TypeScript site is in `mockup/`. It includes local media, procedural Aceternity clouds with transitions between pages, a cinematic intro portrait, four career entries, three project showcases a searchable cultural library, an editable Catalogue and a personal Bucket List. Shared cloud transitions and a small Three.js staff connect the pages.

## Run

Use the Node version in `.nvmrc`. On a fresh clone:

```sh
nvm install
nvm use
cd mockup
npm ci
npm run dev
```

The development URL is http://127.0.0.1:4176/. No environment variables are required.

```sh
npm test
npm run build
```

Build output is `mockup/dist`. Home, Tech, Sound, Arts, Society the Library and the Catalogue have separate HTML entry points. Preview builds retain `noindex, nofollow`; Vercel production builds enable discovery.

## Repository scope

The root `.gitignore` deliberately includes the website and public handoff documents, while keeping original photo collections, generation masters, older prototypes, personal intake files and working notes local. Required web media remains tracked in `mockup/public`. Public test fixtures travel with the application; tests do not require the excluded planning documents.

The existing local workspace uses a `node_modules` symlink into a historical prototype. It is ignored and is not a dependency of a fresh clone. Install from `mockup/package-lock.json` with `npm ci` on a fresh clone. Do not remove the shared local symlink target.

## Next work

The current approved scope is [the final revision plan](docs/FINAL-REVISION-PLAN.md). Content editing is documented in [Updating the Soraverse](docs/UPDATING-CATALOGUE-AND-CONTENT.md). Verification is recorded in [the final revision checklist](docs/FINAL-REVISION-CHECKLIST.md).

See [dependencies and access](docs/DEPENDENCIES-AND-ACCESS.md) and [the next revision](docs/NEXT-REVISION.md). The `codex/cloud-transitions` branch contains the reviewed cloud direction and separate world pages. Vercel can build a preview using the existing `mockup` root. See [cloud transition notes](docs/CLOUD-TRANSITIONS.md).
