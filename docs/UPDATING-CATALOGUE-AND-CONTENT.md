# Updating the Soraverse

The website is maintained through repository edits. No CMS, database, subscription form, automatic Substack sync or website environment credentials are required.

## Where content lives

| Content | Editable file in mockup/src |
| --- | --- |
| Catalogue posts, dates and optional weekly collections | catalogue-content.ts |
| Substack profile and future article cards | catalogue-content.ts |
| Anime selections, post links and optional ranks | anime-content.ts |
| Original searchable Library titles | content.ts |
| Combined Library view and shared counts | library-content.ts |
| Skills and tools, grouped by priority | skills-content.ts |
| Public bucket aspirations and progress | bucket-content.ts |
| Intimate bucket aspirations | bucket-adult.ts |
| Next steps and ideas wall | living-content.ts |
| Project stack, screenshots and films | professional-content.ts |
| Introduction and music photographs | PersonalCards.tsx |

## Catalogue and writing

Each Catalogue entry needs a stable id, title, description, category, original url and source name. Image, imageAlt, video, date and weekOf are optional. Media paths refer to files in mockup/public. Keep descriptions short. Do not use someone else’s post as an invented personal achievement.

Use a real supplied calendar date in YYYY-MM-DD form. Entries with the same date appear together. Set weekOf to the supplied collection week only when intentionally grouping dated entries into that collection. Invalid or absent dates go under From the collection. Do not derive dates from relative platform timestamps or filenames.

The two initial entries retain their supplied TikTok destinations. Their illustrated covers are website compositions using the approved room artwork, not screenshots claimed to be taken from those posts. The isekai ranks and the anime release selection remain distinct.

Long writing lives on Substack. Until individual article links are available, the only writing card is the honest profile card at https://substack.com/@soralives. For a future article, set kind to article, supply its exact URL, title, image, imageAlt and short description. Add a date only when established. Profile and article cards have different link labels.

## Bucket progress

Status is unmarked, in-progress or complete. It describes Sora’s progress. Visitors can filter it but cannot change it. Add completedOn in YYYY-MM-DD form only for a confirmed completed item. It displays only with complete status. Notes are independent of completion. The car entry’s 20 July 2022 note is not a completion date.

All 25 supplied aspirations are retained. Nineteen appear in Life list, and six intimate entries load only after the 18+ confirmation. Keep intimate items in bucket-adult.ts and out of Catalogue, Home previews and public lists. The confirmation is a presentation gate, not private storage or identity verification. Repository source and downloaded assets are not secret. No preference is persisted between page loads.

## Photos and films

Use WebP portraits around 1400 pixels across or smaller. Retain originals outside the public website. Strip unneeded metadata during export. Existing public filenames are safe for deployment. New mirror photographs remain reserved until a caption or context is supplied.

The introduction includes six photos. Its three second advance runs only when visible, idle and motion is enabled. Manual navigation pauses it until Resume slideshow is chosen. Hover, keyboard focus and an open reflection also pause it. Moving away from a focused control is necessary before autoplay can resume.

Project screenshots and films share a width. Keep complete films, native controls, posters and short descriptions. Playing a film pauses the other project films. The existing Odyssey captions are retained. The supplied five second DJ portrait was compressed from about 15 MB to about 1.2 MB, with an immediate WebP poster and visible only silent playback.

## Skills and links

Primary groups lead with product delivery, requirements, AI and software development. All source professional skills and tools are retained, with secondary groups in the expandable toolkit. A skill can specify an icon; otherwise its group icon is used. The professional referral label is Check out my Resume.

Keep contact at Him@soralives.xyz. Do not change project launch status without confirmation. Hades uses https://hades.soralives.xyz/. Odyssey remains in development. Preserve personal quotes as supplied and do not invent attribution dates.

## Validate an update

From mockup, run npm test and npm run build. Review the local page, mobile layout, links, motion pause and any new media. Commit to the revision branch and inspect its Vercel preview. Production promotion is a separate owner decision. Vercel uses the mockup root, npm run build and dist output.
