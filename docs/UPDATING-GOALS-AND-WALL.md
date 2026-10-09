# Updating goals and the ideas wall

Content is maintained in `mockup/src/living-content.ts`. Changes go through the same repository and Vercel workflow as the rest of the site. No database, login, API key or environment variable is needed.

## Goals

`categoryGoals` has four keys: `tech`, `music`, `culture` and `ideas`. Each list appears within its chapter and has its own Explore menu link.

To add a goal, add an object to the relevant `items` array:

```ts
{
  id: 'a-unique-name',
  title: 'The thing I want to make',
  detail: 'A short description of what I am working towards.',
  status: 'Next up',
  link: { label: 'See more', href: 'https://example.com/' },
}
```

The link is optional. Supported statuses are `Next up`, `In progress` and `Complete`. Change the status when your progress changes. These are public updates about Sora's goals, not checkboxes visitors can change. There are no invented deadlines or percentage estimates.

The initial goals draw on the supplied conversation. The music list includes the mashup, starting house production and collating mixes. The working Spotify URL is also listed under Playlists & selections in `mockup/src/content.ts`. Its title and track metadata could not be independently retrieved. The mashup's track and artist spelling is preserved from the supplied note pending a later editorial correction.

## Wall of ideas

Add entries to `wallPieces` in the same file. The sequence follows array order. Four visual treatments are available:

| Kind | Presentation |
| --- | --- |
| `graffiti` | Bold tilted lettering, halftone dots and painted colour blocks |
| `sculpture` | Original abstract metallic ribbon illustration with a quotation |
| `photo` | Supplied photograph with a readable gradient and caption |
| `quote` | Large editorial lettering on a gold grid |

```ts
{
  id: 'a-unique-wall-piece',
  kind: 'quote',
  label: 'A short theme',
  text: 'The exact words to display.',
  credit: 'Author or attribution',
}
```

Photo entries also need `image` and `alt`. Add optimised images to `mockup/public/media/` and use their public URL such as `/media/personal/photo.webp`. Supply the original image, desired crop, caption and credit when asking Codex to prepare a new piece.

Keep quotations faithful to the source and distinguish personal words from somebody else's quote. The initial wall uses Sora's supplied statements plus the already approved quote attributed to Jean-Michel Basquiat. The sculpture is decorative original vector artwork, not a photograph of an existing artist's work.

The wall supports native horizontal scrolling, buttons, arrow keys, Home and End. It has no automatic advance. Motion pause and reduced motion make button navigation immediate. The historical portraits remain a separate collection above the wall.

## Gaming and enquiries

The Games & gaming panel is directly after Anime finds. It links to the existing games shelf without inventing games, ratings or play history. Add future confirmed game titles to the `games` shelf in `mockup/src/content.ts`, and update the catalogue fixture used by the content tests.

The `CollaborationLinks` component in `mockup/src/CategoryGoals.tsx` holds the enquiries for each category. Every button opens the visitor's email application addressed to `Him@soralives.xyz`, with a relevant subject. It does not send mail automatically or confirm a booking.

## Before publishing

Run `npm --prefix mockup test` and `npm --prefix mockup run build` from the Soralives root. Review desktop and phone layouts, then commit and push the desired branch. The current additions are local until that publication step.
