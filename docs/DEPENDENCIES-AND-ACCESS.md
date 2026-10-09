# Dependencies and access

Updated 8 October 2026. Repository: https://github.com/Youngrogue/Soralives. The user successfully pushed the baseline to main. Current local branch: v2. The repository is public.

## Current application

| Dependency | Locked version | Purpose |
| --- | --- | --- |
| Node.js | 24.19.0 in .nvmrc | Local runtime and test runner |
| npm | 11.17.0 used for verification | Install from the existing lockfile |
| React and React DOM | 19.2.8 | Interface |
| Three.js | 0.180.0 | Lazy loaded dimensional hero graphics |
| TypeScript | 5.9.3 | Static checking |
| Vite | 7.3.6 | Development and production build |
| React, React DOM and Three.js type packages | Existing package lock | Type definitions |

The v2 revision uses the existing dependencies. No new runtime package was added. Use the installed stack first. Image and video preparation tools are authoring tools, not website runtime dependencies.

## Environment credentials

**None are required for the current site or the planned visual revision.** Browser code does not call an authenticated service. The build reads Vercel’s automatic VERCEL_ENV value to distinguish production metadata from private previews; this is not a credential. `mockup/.env.example` documents this and intentionally contains no pretend keys.

| Area | What is needed | Where it belongs |
| --- | --- | --- |
| GitHub | Existing account access to Youngrogue/Soralives; working Git push authentication | Git credential manager or SSH, outside the website |
| Hosting | Existing Vercel project connected to the repository | Vercel account integration; no deployment token in browser code |
| Custom domain | Access to DNS for soralives.xyz at launch | Domain provider account; no site .env credential |
| Contact | Existing mailto link needs no credential | Confirm that Him@soralives.xyz receives mail before launch |
| SoundCloud, Spotify and social profiles | Existing public destinations | No OAuth or API key for ordinary links |
| Substack | No publication currently; retain profile link and defer publication or signup integration | No credential required; revisit when a publication exists |
| Higgsfield | Existing generated film is a local file; further generation uses the connected authoring account | Never put generation credentials in browser code |
| Contact form | Not selected; email and socials are sufficient | No form backend or email delivery credential |
| Articles and diary publishing | Repository updates selected; local content files and optional optimised screenshots | No CMS, database or API key required; diary design remains open |
| Optional analytics | Decide whether analytics is wanted | Public site ID or server token according to the chosen provider |

Do not send passwords or tokens in chat. No database, Supabase account, Spotify API application or Substack API credential is a prerequisite for the agreed visual work.

Vite exposes `VITE_` values in the browser bundle. They must contain public configuration only. Private keys require a server boundary. See [Vite environment documentation](https://vite.dev/guide/env-and-mode).

## Deployment inputs

The build runs from `mockup/`, with `npm ci` then `npm run build`. Publish the generated `dist/` directory. Keep the repository root available when running project checks, though current test fixtures are now self contained. The deploy host must serve `/`, `/tech/`, `/sound/`, `/arts/`, `/freedom/` and `/library/` from their HTML entries. `mockup/vercel.json` defines directory redirects, filesystem routing and a custom 404. Do not add a catch all rewrite to the homepage. No backend is currently needed. See [Vite static deployment documentation](https://vite.dev/guide/static-deploy.html).

The v2 build includes canonical links, social metadata, robots.txt and sitemap.xml. Vercel production builds allow indexing; preview and local builds use noindex and disallow crawling. Responsive and interaction verification is recorded in NEXT-REVISION.md. Verify the generated Vercel preview before promotion to production and confirm the contact mailbox. No deployment was performed in this build.

## Branch sequence

1. Baseline has been pushed to `main` at `8da9a26cee14ec2a9e76dd87577de66c7b48318f`.
2. Use existing `v2` for the next revision and Vercel previews through the existing Vercel connection.
3. Review the preview and checks before merging approved changes to `main` for production.

This local build does not publish the website or push either branch.

## Vercel configuration

For the current application: framework preset Vite, root directory `mockup`, install command `npm ci`, build command `npm run build`, output directory `dist`, and production branch `main`. Use a supported Node 24 runtime matching the project's major version. No environment variables are currently required. Revisit build settings if the journal introduces a publishing layer.

Use preview deployments for `v2`. Confirm direct navigation, refresh and Back/Forward on every page in the Vercel preview before launch. Local built output and HTTP routing have been checked. The existing production site is https://www.soralives.xyz/. A journal subdomain remains proposed, not configured.

Remaining user inputs: approval of the v2 preview and future articles, collection content or new photographs. Hosting and the Threads profile are already supplied. Do not request passwords or tokens in chat.

References: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel Git deployments](https://vercel.com/docs/git), and [Vercel environment variables](https://vercel.com/docs/environment-variables).
