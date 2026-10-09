# Colourful editorial worlds

The Soraverse balances a clear editorial interface with dramatic visual chapters. Shared values live in `mockup/src/tokens.css`; components use these roles rather than introducing separate themes.

## Visual rules

| Role | Treatment |
| --- | --- |
| Foundation | Warm paper #f8f5ed and ink #17202a |
| Tech | Cobalt #2457ee, paper and blue tinted project surfaces |
| Music | Coral #ef6246 with a warm peach chapter background |
| Culture | Gold #f9cf36 |
| Society | Navy #15253e, teal and pale green accents |
| Headings | Bricolage |
| Body | DM Sans |
| Editorial emphasis | Playfair italic |
| Dates and metadata | Overpass Mono |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64 and 96 px |
| Corners | 4 px controls and 8 px cards |
| Actions | Clear label, 44 px minimum target, visible keyboard focus |

Purple is not a UI accent. Recognisable social and company logos retain their original colours. Large rooms and their existing figures introduce the chapters. Content receives quiet reading space rather than being placed over a busy image.

## Motion rules

| Interaction | Behaviour |
| --- | --- |
| Small feedback | 160 ms |
| Menu and carousel | 280 ms |
| Manual flip | 450 ms, shared axis and easing |
| Section reveal | 300 ms, 12 px travel, no delay, first entry only |
| Career sequence | Scroll progress, with stable front and back reading phases |
| Project imagery | Scroll driven colour curtain, restrained perspective and scale |
| Hero | Ambient cloud movement plus reversible scroll depth |
| Page navigation | Native cross document transition, 300 ms arrival, normal navigation fallback |

Keyboard initiated card and carousel changes are immediate. Pause and reduced motion preserve all information. Mobile layouts do not require desktop choreography to work. Long text settles before reading. No automatic slideshow, scroll interception or compulsory video playback.

## Component contracts

Cards have a persistent visible control for their reverse face. Hidden interactive content is removed from keyboard access. Carousels provide labelled previous and next buttons and a visible count; inactive slides are inert. Project and history sources open on their original sites. Dialogs return focus to their trigger on close.

The Explore overlay lists all implemented destinations by area. It contains no placeholder pages. The library keeps its plain lists with search, shelf controls and responsive columns. New content should reuse these systems before adding another component style.

## Goals and living collections

Category goals use a shared editorial list with a heading, numbered marker, explicit status, description and optional link. Status is maintained by Sora through repository updates. It is not an interactive visitor checklist. The list adapts from two columns to one on phones.

The ideas wall sits beside the historical collection in Society & Ideas. Its horizontal gallery mixes graffiti lettering, an original metallic sculpture illustration, supplied photography and editorial quotation panels. The design uses the existing coral, gold, paper and navy palette. Native scrolling, labelled buttons, arrow keys, Home and End provide access. It never advances automatically, and paused or reduced motion removes animated scrolling.

Collaboration links use specific verbs and email subjects for each audience. The primary action has an ink or gold fill; related actions use an outline. Every control retains a minimum 44 px target. Editing instructions are in `UPDATING-GOALS-AND-WALL.md`.


## Pages and link system

Home is the introduction and four room gateway. Tech lives at `/tech/`, Music at `/sound/`, Arts at `/arts/`, Society at `/freedom/` and the catalogue at `/library/`. Shared page chrome adds a breadcrumb, local contents and a session motion preference. Rooms remain large environmental artwork.

Linked cards have a visible action label, distinct surface and focus ring. Ordinary text links are underlined at rest. Decorative arrows are unnecessary when the affordance is already clear. Keep directional arrows for actual navigation controls. Project film cards pair a 16:9 poster with label and duration; the entire card opens the viewer.

Desktop careers share one axis and show all four cards. A single active card turns and returns before the next chapter. Reading is governed by scroll distance rather than a forced timer. The mobile composition is a horizontal rail. Changes in motion preference must not silently replace the row with a vertical stack.

Technical goals use a compact progress index below the projects. Other category goals keep the fuller editorial list. Update the content without inventing release dates or milestones.

Page motion reference: [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using). Hosting reference: [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json).
