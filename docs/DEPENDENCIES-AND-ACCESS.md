# Dependencies and access

Reviewed 6 October 2026. Repository: https://github.com/Youngrogue/Soralives. The repository was empty and public when checked.

## Current application

| Dependency | Locked version | Purpose |
| --- | --- | --- |
| Node.js | 24.19.0 in .nvmrc | Local runtime and test runner |
| npm | 11.17.0 used for verification | Install from the existing lockfile |
| React and React DOM | 19.2.8 | Interface |
| Three.js | 0.180.0 | Existing optional graphics code |
| TypeScript | 5.9.3 | Static checking |
| Vite | 7.3.6 | Development and production build |
| React, React DOM and Three.js type packages | Existing package lock | Type definitions |

No new library is required to reorder sections, change copy, enlarge room art, improve the hero or add reversible motion. Use the installed stack first. Image and video preparation tools are authoring tools, not website runtime dependencies.

## Environment credentials

**None are required for the current site or the planned visual revision.** The checked application source does not read environment variables or call an authenticated service. `mockup/.env.example` documents this and intentionally contains no pretend keys.

| Area | What is needed | Where it belongs |
| --- | --- | --- |
| GitHub | Existing account access to Youngrogue/Soralives; working Git push authentication | Git credential manager or SSH, outside the website |
| Hosting | Choose a host and connect the repository when ready | Hosting account integration; provider secrets only if deployment automation later requires them |
| Custom domain | Access to DNS for soralives.xyz at launch | Domain provider account; no site .env credential |
| Contact | Existing mailto link needs no credential | Confirm that Him@soralives.xyz receives mail before launch |
| SoundCloud, Spotify and social profiles | Existing public destinations | No OAuth or API key for ordinary links |
| Substack | Current profile link works without a key; supply the publication URL and desired subscription destination for a richer integration | Public URL in content; custom domain configuration in provider accounts if selected |
| Higgsfield | Existing generated film is a local file; further generation uses the connected authoring account | Never put generation credentials in browser code |
| Optional contact form | Choose a form or email service and backend first | Future server credential in a host secret store, only if this feature is chosen |
| Optional CMS or diary publishing | Choose an editing workflow before adding a CMS | Static content needs no key; hosted CMS credentials depend on the chosen service |
| Optional analytics | Decide whether analytics is wanted | Public site ID or server token according to the chosen provider |

Do not send passwords or tokens in chat. No database, Supabase account, Spotify API application or Substack API credential is a prerequisite for the agreed visual work.

Vite exposes `VITE_` values in the browser bundle. They must contain public configuration only. Private keys require a server boundary. See [Vite environment documentation](https://vite.dev/guide/env-and-mode).

## Deployment inputs

The build runs from `mockup/`, with `npm ci` then `npm run build`. Publish the generated `dist/` directory. Keep the repository root available when running project checks, though current test fixtures are now self contained. The deploy host must serve `/library/` from its HTML entry point. No backend is currently needed. See [Vite static deployment documentation](https://vite.dev/guide/static-deploy.html).

Before launch, finish responsive, keyboard, motion and media checks; review the preview indexing settings, metadata, canonical URLs, font and media attribution; confirm project links and mail delivery; configure the chosen host and DNS. The current code build is not a claim that production launch checks are complete.

## Branch sequence

1. Preserve the current version on `mockup-v1` with its first reviewed commit and push.
2. Create `next-revision` from that baseline commit.
3. Implement and review the agreed changes there before its next push.

This preparation does not publish the website or push either branch.
