# Cloud transition revision

Branch: `codex/cloud-transitions`. Prepared 9 October 2026 following approval to push the reviewed cloud preview.

## Included

The runnable application is in `mockup`, matching the existing Vercel root. It includes the current separate world pages, project media cards, horizontal career timeline, library, goals and ideas wall, together with the reviewed cloud direction.

The hero uses Aceternity's procedural cloud shader. Cloud study controls adjust palette, drift speed and density. The comparison link opens the existing public site, not a localhost address. Page openings and the links to other worlds have subtle, colour matched shader fields. Cloud banks cover internal page navigation over 420ms and reveal the destination over 600ms.

Local anchors, external links, new tab clicks and downloads retain normal behaviour. Pause and reduced motion bypass the page wipe. Offscreen cloud fields suspend rendering. Browser history uses normal navigation and clears stale overlays. On slow first visits, full document navigation can still show browser loading between pages.

## Provenance

Component: https://ui.aceternity.com/components/cloud-shader
Registry: https://ui.aceternity.com/registry/cloud-shader.json
Author: Manu Arora, Aceternity UI.

Original component source: `mockup/reference/cloud-shader.original.tsx.txt`. Adaptation: `mockup/src/CloudShader.tsx`. The original shader math is retained with ordered smoothstep edges. The wrapper adds local styles, bounded resolution, a controlled clock, visibility suspension, live motion preferences and context restoration. Page wipes use the previously approved local cloud image.

## Build and hosting

Vercel root: `mockup`. Install: `npm ci`. Build: `npm run build`. Output: `dist`. No additional dependencies or environment credentials. Production branch remains `main`.

Preview deployments are noindex. The existing production metadata behaviour remains controlled by Vercel's automatic `VERCEL_ENV`. Required photos, rooms, media, fonts and source credits are included. Local dependencies, review screenshots, old drafts, secrets and raw asset collections remain excluded.

## Verification and remaining review

The local cloud preview passed the production build, all 13 inherited tests and desktop and phone checks. Navigation checks covered world links, Explore to the Library reading shelf, local playlist links, pause and browser history. A fresh dependency installation from package-lock.json passed all 13 tests, TypeScript, Vite build and the seven page output checks. No dependency symlink is part of the branch.

Product clarity and discovery: local copy and navigation verified; Vercel preview verification remains pending. Owner: Codex for technical checks, Sora for content and publication. Next action: review the generated Vercel preview before merging to main. Additional diary content, writing and the previously noted hero refinements remain separate pending work.

The original v2 working directory and local comparison preview are preserved. This branch does not merge to main or deliberately promote a production deployment.
