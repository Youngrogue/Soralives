# Soraverse v2

Cloud revision, 9 October 2026: the approved cloud study is promoted into `mockup` on `codex/cloud-transitions` for a GitHub branch preview. See [cloud transition notes](CLOUD-TRANSITIONS.md). Production promotion remains pending.

Updated 8 October 2026. The consolidated build was authorised with “perfect lets build”. Implementation is on the local `v2` branch. Nothing has been pushed or deployed during this build.

## Current revision: separate worlds

Approved and implemented on 8 October 2026 after the user said “approved, excute it”. This section is the current source of truth. The review below records the reasoning; the earlier delivered sections record the previous iteration.

Home now contains the existing hero, Sora’s introduction and portrait carousel, four large room links, the approved quote and contact. Tech, Sound, Arts and Society each have a real page. The Library remains within Arts. Shared Explore navigation includes the pages and their sections. Old home hashes forward to their new destinations without an extra Back stop.

The career row now shows Shell, ECM Terminals, GTBank and KPMG together on desktop. Vertical scrolling turns one card, leaves a reading interval, returns it to its cover and advances. KPMG returns before the row releases. Reverse scrolling retraces the movement. Short desktop windows retain the row with manual controls when pinning cannot fit. Phones use a swipe rail and year controls. Motion pause keeps the same composition and changes card faces immediately.

Project films use compact 16:9 poster cards with a label and duration. They open the existing accessible viewer without autoplay. Ordinary links, email actions and linked cards have persistent highlighting or underlines. Repeated decorative arrows were removed; directional carousel and back controls remain.

Text reveals take 300 ms with 12 px travel and no artificial delay. They run once instead of resetting whenever the visitor scrolls away. Page navigation uses a brief native view transition where supported and normal browser navigation elsewhere. Render blocking is preserved in the built HTML so a new page is ready before its incoming snapshot. Pause is remembered for the browser session. Decorative movement remains separate from readable text.

The Curious Council uses the approved description in both relevant pages: “Visual stories and explainers exploring technology, history, power, culture and the ideas shaping our world.” Technical goals are a compact progress index. Further project milestones can be added when supplied.

### Verification for this revision

1. TypeScript and the Vite production build pass. Thirteen tests cover the catalogue, supplied links, project media/status, career ordering/choreography and route/legacy link behaviour.
2. Seven HTML entries, including the custom missing page, were checked in the built output. Page titles, canonicals, render blocking, preview indexing and production sitemap contents were verified. A built local preview serves all pages and returns an actual 404 for an unknown page.
3. Browser checks covered desktop 1440 × 900, 1280 × 720, short desktop 1280 × 600, and phones at 390 and 320 px. Four cards fit the desktop row. Scroll reversal and final release were observed. The phone rail, year controls and keyboard flips were exercised.
4. Hades film opens paused with native controls. Escape closes the viewer and restores focus to the film card. No project video element is mounted before a viewer is requested. Explore closes with Escape and restores its trigger. Repeated Playlists links reopen the disclosure even when the hash has not changed.
5. Home gateway navigation, direct Library access, legacy ideas wall forwarding, and browser Back/Forward were exercised. Music and Society have their own page content; career content stays in Tech. No horizontal page overflow or broken loaded images appeared in the checked layouts.
6. Pause was checked across page navigation and on the career row. Reduced motion rules were reviewed in source. No operating system preference change or device level frame rate benchmark was performed; these checks are not a full accessibility certification.

No dependency, account or environment credential was added. Vercel remains rooted at `mockup`, with `npm ci`, `npm run build` and output `dist`. The new `mockup/vercel.json` serves the real page entries and a custom 404. The Vercel deployment itself still needs to be checked after an authorised push. No push or deployment took place in this revision.

Product clarity: implementation and local verification complete. Owner: Codex. Launch verification remains pending on the actual Vercel preview. Content owner: Sora for future goals, quotes, games and diary material.

## Approved review and design rationale

The following review was approved for the implementation above. References to the previous behaviour describe the state before this revision.

### Assessment and page structure

The expanded content now serves distinct visitor intentions. A shorter home page should introduce Sora and offer four clear destinations. Career information belongs only in Tech & Business. Music should have enough room for its own identity without requiring visitors to traverse the professional material.

| URL | Visible name | Contents |
| --- | --- | --- |
| `/` | The Soraverse | Existing hero, introduction and portrait collection, four large linked room previews, selected quote and contact actions |
| `/tech/` | Tech & Business | Room introduction, Delphi/Hades/Odyssey, goals, career timeline, skills, tools, Council introduction, project/partnership/consultation enquiries |
| `/sound/` | Music & DJ | Life has a soundtrack, music identity and artwork, outbound sets/playlists, music goals, events/photos and booking/collaboration enquiries |
| `/arts/` | Arts & Culture | Films, anime, manga, art, gaming, library entrance, culture goals and creative collaboration |
| `/freedom/` | Society & Ideas | Interests, historical perspectives, ideas wall, writing goals, Curious Council and collaboration |
| `/library/` | The Library | Preserve the existing searchable collection and shelf links; its parent navigation is Arts & Culture |

Use lowercase paths consistently. The public labels remain familiar even where the path is expressive, particularly Society & Ideas at `/freedom/`. Home remains available through the brand and Explore. Each page has its own title, introduction, room artwork, local contents and footer. The home room previews are real links with large click/tap targets, visible labels and keyboard focus. A visitor can choose any world without first scrolling through every world.

Shared structure: navigation, typography, link and button styles, motion settings, footer and contact primitives. Keep distinct chapter colours and room artwork. Avoid loading the home moon/hero film and unrelated page media on every route.

### Findings from the current build

| Current behaviour | Recommendation | Evidence |
| --- | --- | --- |
| The career sequence becomes vertical on short laptop windows | Keep a horizontal company composition; choose motion behaviour separately from layout | `ExperienceTimeline.tsx` currently requires at least 1000 px width and 780 px height plus a measured fit check; `timeline.css` stacks the fallback |
| Animated career mode centres one 344 px card and leaves previous cards back facing | Show four compact fronts and turn only the active card, returning it before advancing | `paint()` in `ExperienceTimeline.tsx`, and `career-progress.mjs` |
| Music and Arts use 650 ms reveals with up to 100 ms additional delay | Quick title arrival, local sequencing and separately timed atmospheric art | `tokens.css`, `v2.css`, `useSectionMotion.ts`; rendered values confirmed in local browser |
| Reveal delays depend on global element order and reset after leaving view | Make timing local and prevent repeated slow text arrivals | `useSectionMotion.ts` uses index modulo three and toggles the reveal on viewport exit |
| Music and Arts have large reserved heading spaces and an abrupt background boundary | Rebalance spacing within the dedicated pages and use one shared page transition | `v2.css`; user screenshots and feedback |
| Council panels say only where the channels are hosted | Explain their editorial purpose, then offer YouTube and TikTok destinations | Current copy in both panels: Find the channel on YouTube and TikTok |
| Project film is a small play glyph and label | A compact, recognisable film thumbnail with title and duration | `ProjectShowcase.tsx`; existing posters and film records already available |
| Repeated arrows carry too much of the link affordance | Use persistent visual link styling and a consistent interactive card treatment | User steering and current project/navigation/action components |
| Tech goals repeat the project descriptions | Keep project information once; make future goals specific next steps when supplied | First user screenshot and current `living-content.ts`; do not invent milestones |

The sluggishness findings above identify pacing and layout issues. They are not a measured frame rate diagnosis. Room image filters and simultaneous scroll handlers are profiling candidates for the next implementation pass.

### Career timeline: corrected interaction

Desktop composition: Shell SNEPCo, ECM Terminals, GTBank and KPMG visible side by side on a single chronological axis. Each compact front emphasises its logo, company, dates, brief role and one sentence. Each back provides a short competency/story summary and selected chips. Show fewer words rather than shrinking text until it becomes unreadable. Retain all existing factual experience content in an accessible detail surface where needed.

Normal vertical scrolling pins the row and drives this sequence:

1. Shell front, turn, back reading interval, return to front.
2. ECM front, turn, back reading interval, return to front.
3. GTBank front, turn, back reading interval, return to front.
4. KPMG front, turn, back reading interval, return to front.
5. Release the pinned row and continue to skills and the remaining Tech content.

The four cards stay in place when they fit. Only the active card turns; other cards remain front facing. Progress moves along the year line. The reading interval uses scroll distance, not a forced timer. Stopping scroll leaves the current state in place as long as desired. Reverse scrolling retraces the sequence. Keep an explicit skip and manual keyboard/click access to each story.

Short desktop viewports retain a horizontal layout. First reduce nonessential spacing; if pinning still cannot fit, show the row with direct card controls. Phones use a swipeable horizontal rail with a neighbouring card visible and a company index. Fitting four readable stories simultaneously on a phone is not a target. Reduced motion and pause keep the composition and offer immediate face changes. Neither should silently switch the page into a large vertical timeline.

### Motion direction

The old Music to Arts transition disappears when those are separate pages. Do not spend the next build polishing a section boundary that the new architecture removes.

Proposed starting values for feel testing: ordinary title arrivals around 300 ms, 10 to 14 px travel, no artificial heading delay; supporting content stagger no more than 40 ms. Decorative room art may settle over roughly 450 ms without blocking the text. Keep the existing easing family. Use one brief chapter colour transition for page navigation, with a plain navigation fallback and reduced motion handling. Important content and links remain usable immediately. Do not add a fake loading delay to complete an effect.

Scroll choreography is reserved for the career sequence and purposeful project presentation. Routine paragraphs, lists and links should not each replay a long entrance. Profile actual frame behaviour during implementation, especially large image shadows, media loading and rapid direction changes.

### Link affordance and video cards

Replace repeated decorative arrows in project highlights, ordinary text links, contact chips and room previews with clear styling. Inline links have an underline or a consistent accent treatment at rest. Linked cards use an explicit action label, a distinct border/background and a visible focus ring. Pointer hover may strengthen that treatment; it must not be the only clue. Noninteractive status or tool chips should not look like actions. Retain arrows only where direction is functional, such as previous/next carousel controls or back navigation.

For each project film, use a small 16:9 poster card, approximately 220 to 280 px wide on desktop, with a film label and visible duration. The whole card is the control. A small play badge may clarify the media type but is no longer the sole presentation. Clicking opens the existing accessible media viewer with native controls. No autoplay or simultaneous downloads of all full videos. On phones the film card can use the available column width. The large project screenshot, project link, stack and film card remain separate controls; do not nest buttons inside a linked card.

Existing films: Delphi product film 0:23, Hades launch film 0:40, Odyssey concept film 0:40. Existing poster files mean no new generated asset is required for this change.

### Curious Council copy

Approved description:

> Visual stories and explainers exploring technology, history, power, culture and the ideas shaping our world.

Use one confirmed description on Tech and Society, with contextual introductions if helpful. Keep YouTube and TikTok as the supplied destinations. No separate Council website URL was provided, and attempts to read the channel pages did not yield usable content. Do not claim a release schedule, episode catalogue or subject expertise not supplied by the user. The implementation uses the description approved with this revision.

### Component map and implementation order

| Deliverable | Workflow | Dependency | Acceptance | Status |
| --- | --- | --- | --- | --- |
| Page structure and home gateway | Godmode, design critique, product clarity | Agreed route/content ownership | Home introduces Sora; four pages open directly and work on refresh/back/forward | Implemented |
| Shared link system | Existing design system, design critique | Route map | Links evident at rest and by keyboard; decorative arrow repetition removed | Implemented |
| Project film cards | Design critique, existing media viewer | Existing posters and films | Recognisable thumbnails, duration, keyboard operation, no autoplay, focus return | Implemented |
| Four card career sequence | Independent source review, existing motion system | Tech page and compact card copy | All four desktop cards visible; sequential return to front; reversible; final release | Implemented |
| Music and chapter motion | Independent source review, design critique | New page boundaries | Prompt text arrival, consistent page transitions, no delayed replay, reduced motion | Implemented |
| Council purpose | Product clarity | User confirms actual editorial focus | Clear reason to visit; truthful supplied destinations | Implemented |
| Discovery and navigation | Product clarity | All routes implemented | Page metadata, sitemap, legacy links, direct loads and Vercel preview checked | Verified locally |

Implement route/content separation first, then the shared interaction styling and film cards, then the corrected career sequence and page motion. Finally check responsive layouts, performance and public discovery together.

Keep the existing Vite/React/TypeScript/Three.js stack and Vercel root `mockup`. Extend the current page entry and metadata approach unless implementation reveals a specific need for another router. No stack migration or new backend is required. Planned routing work must preserve old links: home section hashes should lead to the appropriate new page and anchor, while library shelf links remain functional. Update Explore, header, footer, project goal links, home returns, canonical URLs and sitemap together. The next build should also include a useful unknown page response rather than silently rendering the wrong page.

### Verification and remaining input

Check 1440 × 900 and 1280 × 720 desktop layouts, short desktop windows, 390 px and 320 px phones, keyboard navigation, reduced motion and motion pause. Verify direct route loads, refreshes, Back/Forward, old hash destinations, the video viewer, offscreen media loading and the final timeline release. Unit checks should cover each flip returning to the front before the next starts, reversal and boundaries. Source review alone will not count as animation performance verification.

No new environment credentials, generated art or subscriptions are prerequisites. Useful future input: specific next tasks for the technical projects, additional wall quotes and more game titles. These are content inputs, not a reason to rebuild the backend.

The review was completed before implementation. The approved changes and current verification status are recorded at the top of this document.

## Delivered direction

The site uses colourful editorial chapters, dimensional room art and a shared motion system. The four areas remain Tech & Business, Music & DJ, Arts & Culture, and Society & Ideas. Projects precede the career timeline. The library remains a plain searchable list.

The introduction uses “Hi, I'm Sora” and the full supplied personal description. The portrait area is a manual sliding collection using the three existing approved photographs. Extra photographs, diary entries and weekly social collections remain future content.

The hero reads “The Soraverse” and “Welcome to my wonderland.” Local cloud layers move immediately while the existing film becomes available. Three.js adds a textured full moon, vinyl and orbital diagram. Scroll movement reverses when returning to the hero. Pause, reduced motion, hidden tabs, offscreen scenes and Save Data receive appropriate fallbacks.

## Component map

| Component | Implementation | Workflow | Verification | Status |
| --- | --- | --- | --- | --- |
| Hero | Immediate cloud layers, reversible depth movement, NASA lunar texture, optional Three.js scene and existing film | Godmode, animate, design engineering | Desktop and phone views; pause; source review of reduced motion, loading failure and render cleanup | Implemented |
| Introduction | Latest greeting and supplied voice, sliding photographs, accessible reflection cards | Design system, animate | Pointer and keyboard carousel navigation; unchanged approved photos | Verified locally |
| Hierarchy and Explore | Tech first; projects before experience; directory includes sections, projects, library, anime and history anchors | Product clarity and discovery | Menu opening, keyboard selection, focus and route navigation | Verified locally |
| Projects | Three distinct colour panels, reversible colour curtain and dimensional screenshot entrance, screenshot viewer and films, stack chips | Design system, animate | Desktop and mobile layout; supplied destinations and media tests | Implemented |
| Hades | Live directory at https://hades.soralives.xyz/ | Source review | User corrected the temporary .com address to .xyz; actual package and implementation files reviewed | Verified content |
| Career timeline | Compact cards, chronological milestones, front hold, turn, back hold and advance with normal vertical scrolling | Animate | Five progression tests; browser checks of reversal, direct years, click and keyboard controls, skip and responsive face preservation | Verified locally |
| Rooms | Approved room landscapes introduce the four interests with readable content areas | Design engineering | Desktop and phone compositions | Verified locally |
| Society | Sudan, Palestine, China and Cuban Revolution links; seven archival portrait cards; Curious Council and source credits | Design system, source review | Optimised images decoded; card interaction, hidden links and phone wrapping checked | Verified locally |
| Theme and motion | Shared palette, fonts, spacing, surfaces, control dimensions and timing tokens | Design system, animate | Applied across buttons, chips, menu, carousel, project reveals and flips | Implemented |
| Public discovery | Canonicals, social metadata, robots and sitemap based on Vercel environment | Product clarity and discovery | Production output inspected; preview output checked separately | Implemented |
| Independent review | Source review of timeline, project motion, hero and Society integration | Godmode | Three findings addressed, with follow up review and regression checks | Completed |

## Current project evidence

1. Delphi keeps its existing public website, screenshot, film and verified stack: Next.js, TypeScript, Payload CMS, PostgreSQL and Vercel.
2. Hades is a broad directory of tools, apps, websites and resources, not restricted to the example categories. Its public stack is JavaScript, Node.js, CSS, Google Sheets and Vercel Functions. Evidence: `Project Hades/hades-claude-version/package.json`, `api/index.js`, `lib/runtime.mjs` and related implementation. The README's historical Astro paragraph is superseded by working source and package files. No Hades credentials were copied or requested.
3. Odyssey stays explicitly in development. The displayed stack describes the existing landing implementation. Communities, sidequests, rankings and leaderboards remain product vision, not falsely advertised as available.

Project transitions use the same directional reveal vocabulary but alternate the visual curtain direction. Copy and links remain visible and usable. Animation stops in pause or reduced motion. The full screenshot can be opened, and films play only after visitor interaction.

## Career behaviour

Chronological milestones are 2015, 2017, 2018 to 2021 and 2021 to present. Milestone spacing is ordinal, not a duration chart. The companies are Shell SNEPCo, ECM Terminals, GTBank and KPMG. Medallion remains excluded.

On a sufficiently large and tall viewport, the timeline holds a compact stage while ordinary vertical scroll reveals the front, turns the card, holds the back and advances. Scrolling upward reverses it. A manual turn holds until the next company. Year buttons jump directly, and Skip to skills exits the sequence.

Small or short screens, reduced motion and paused motion use a vertical timeline automatically. Both faces remain available. Resize checks confirmed that a selected GTBank front or back survives changing between desktop and phone layouts.

## Content decisions preserved

1. Music uses supplied outbound links only. No featured music item or embedded player.
2. The unique anime TikTok link is added once under Anime finds. Its title, author and date have not been inferred.
3. The closing quotation remains “Art is how we decorate space, music is how we decorate time”, labelled “Attributed to Jean-Michel Basquiat”.
4. Personal social links are X @soralives and Instagram, TikTok and Threads @rogueskye, with platform icons.
5. The Curious Council links to its supplied YouTube and TikTok profiles in Tech and Society.
6. Society material expresses interests in historical contexts without inventing personal political endorsements. Castro uses the broader Cuban Revolution context.
7. Historical photographs and historical artworks are identified separately. Seven optimised archival images total 771,832 bytes. Original files remain outside the public build; source and licence records accompany the public renditions.
8. Contact remains email and socials. There is no contact form backend.
9. No current Substack publication exists. Keep the profile link; do not imply published articles or a functioning subscription flow.
10. Articles and notes will use repository updates. Diary design, writing, post screenshots, dates and optional weekly groupings remain deferred until supplied. There is no automatic social feed or weekly publishing commitment.

## Product clarity and discovery

Status: Implemented and locally verified, production check pending. Owner: Codex for implementation, Sora for final content review and publication.

Evidence: identity and interests are explicit; project availability and stack are visible; contact links and the complete Explore directory are present. The library route works directly. Production metadata identifies both pages and their canonical addresses. Preview builds remain excluded from indexing.

Next action: review the local v2 experience, approve the branch for publication, then verify the resulting Vercel preview and production URLs. This local verification is not a production deployment check.

## Remaining inputs

No credentials or additional content are needed to review this v2 build. Later enhancements need the user's additional portrait selections, actual diary or article content, original post dates, screenshots and captions. Confirm the contact mailbox receives mail. Substack subscription integration requires an actual publication and remains deferred.

## Goals, gaming and the ideas wall

Added locally on 8 October 2026 following the user's new request.

1. All four categories now have a public goals list. The music goals are the supplied mashup, starting house production, and collating more mixes. Other starter goals draw only on existing project, library and writing plans. Status is edited through the repository, with no visitor state or account system.
2. The working Spotify playlist is available from the music goal and Playlists & selections. Its supplied URL is stored without sharing parameters. The unavailable Spotify metadata was not guessed. Track and artist names in the mashup remain as supplied.
3. Games & gaming sits immediately below Anime finds and links to the existing games shelf. No additional titles or play history were invented.
4. Things I stand by is a horizontal ideas wall after the historical portraits and their source credits. Initial entries use the supplied personal words and the already approved attributed quote. Graffiti lettering, an original vector sculpture, a supplied art photograph and a gold quote panel provide varied visual treatments. Historical portraits remain in their existing collection.
5. Chapter specific enquiry buttons cover product projects, consultations, partnerships, DJ sets, events, music, creative collaborations, gaming and the Curious Council. They open email with a relevant subject and do not send or confirm anything automatically.
6. Explore links to each goals list, gaming and the ideas wall. Maintenance instructions are in `UPDATING-GOALS-AND-WALL.md`; editable content is in `mockup/src/living-content.ts`.

Product clarity and discovery remains locally verified, with production verification pending. Owner: Codex for implementation and Sora for content. New evidence: clear progress states, distinct enquiries for each audience, user sourced wall copy and working internal navigation. Next action: review the additions and supply more wall quotes, images, specific goals or game titles whenever ready.

Verification for this addition: desktop at 1440 px, phone at 390 px and narrow phone at 320 px; no document overflow at either phone width. Checked the wall's keyboard and pointer controls, both boundaries, motion pause, mobile text fit, Explore destinations and the gaming shelf route. All four goal sections and ten specific enquiry destinations are present. No missing local anchors or browser warnings/errors were found in the pass. The existing nine tests and TypeScript/Vite build pass. No push or deployment was performed.

## Verification record

Completed 8 October 2026.

1. All nine tests passed, including five career sequencing and restoration tests and four content integrity tests.
2. TypeScript checking and the Vite production build passed. The optional Three.js engine remains a separate lazy chunk.
3. Browser checks used 1440 × 960, 1280 × 720, 390 × 844 and 320 × 740 layouts. The main page and library had no horizontal overflow at the narrowest width.
4. Tested pointer and keyboard photo changes, menu Escape and focus return, year navigation, scroll reversal, skip to skills, historical card turns and hidden back links, library search and shelf navigation, and the project film dialog with focus restoration.
5. The immediate desktop manual flip followed by phone resize and return was retested after the final fix. Both selected company and face were retained.
6. No broken local anchor destinations, missing static media references or failed loaded images were found. Browser error and warning log was empty in the final pass.
7. Production canonical, Open Graph, robots and sitemap output was inspected. The final local build has preview noindex metadata and a disallow rule. Reduced motion and texture failure safeguards received independent source review; browser pause behaviour was checked. No OS preference emulation or production deployment is claimed.
8. Hades uses the user confirmed https://hades.soralives.xyz/. Its destination change requires no environment key. The temporary .com address was discarded after the user clarified it.
