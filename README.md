# Soralives

The Soraverse is Sora's personal website for projects, music, culture and ideas.

The working React and TypeScript site is in `mockup/`. It includes local media, an illustrated Higgsfield cloud reveal, a cinematic intro portrait, four career entries, three project showcases and a searchable cultural library.

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

Build output is `mockup/dist`. Home, Tech, Sound, Arts, Society and the Library have separate HTML entry points. Preview builds retain `noindex, nofollow`; Vercel production builds enable discovery.

## Repository scope

The root `.gitignore` deliberately includes the website and public handoff documents, while keeping original photo collections, generation masters, older prototypes, personal intake files and working notes local. Required web media remains tracked in `mockup/public`. Public test fixtures travel with the application; tests do not require the excluded planning documents.

The existing local workspace uses a `node_modules` symlink into a historical prototype. It is ignored and is not a dependency of a fresh clone. Install from `mockup/package-lock.json` with `npm ci` on a fresh clone. Do not remove the shared local symlink target.

## Next work

See [dependencies and access](docs/DEPENDENCIES-AND-ACCESS.md) and [the next revision](docs/NEXT-REVISION.md). The current v2 revision is implemented locally. Review the separate pages and responsive interactions before pushing the next preview.
