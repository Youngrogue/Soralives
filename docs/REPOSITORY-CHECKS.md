# Repository preparation checks

Checked 6 October 2026.

1. The supplied GitHub repository was empty and public. The local repository is initialised on `mockup-v1`, with `origin` set to `https://github.com/Youngrogue/Soralives.git`. No commit or push was performed.
2. Ignore rules retain source, package manifests, the lockfile, public media, safe environment documentation and public test fixtures. Raw collections, old prototypes, working notes, local credentials, dependency installations and build output are excluded.
3. All 52 public assets are included, totalling 17,642,123 bytes. Every literal media and font path found in application source resolves locally. Dynamic project film, poster and screenshot paths pass the existing content tests.
4. Public test fixtures were extracted from the original approved catalogue and link inventory. Only test source paths changed. The site content, visual design and navigation implementation were not changed by repository preparation.
5. A separate temporary copy containing only files selected by the Git ignore rules installed from the package lock with `npm ci --offline --no-audit --no-fund`. It had no shared dependency symlink and no original asset folders. All four tests and the TypeScript plus Vite production build passed.
6. The clean production build was served locally. Browser checks verified Explore, the direct reading shelf route, title search, returning to Arts & Culture, opening the Delphi screenshot and closing its viewer with focus returned. No missing current page anchor targets, broken loaded images, document horizontal overflow or browser errors were found in these checks.
7. No environment file was required. No credentials were added, displayed or transmitted.

These are repository portability and navigation checks, not a full production accessibility audit. Final responsive and motion review, media licensing and attribution, external link health, metadata, hosting and DNS remain launch checks. The planned new visual revision is recorded separately.

[Asset manifest](WEBSITE-ASSETS.md) · [Dependencies and access](DEPENDENCIES-AND-ACCESS.md) · [Next revision](NEXT-REVISION.md)
