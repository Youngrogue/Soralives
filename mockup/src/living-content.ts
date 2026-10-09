// Edit these lists to publish new goals and wall pieces through the repository.
// Status describes Sora's progress. Visitors cannot mark a personal goal complete.
export type Category = 'tech' | 'music' | 'culture' | 'ideas';
export type Goal = {
  id: string;
  title: string;
  detail: string;
  status: 'In progress' | 'Next up' | 'Complete';
  link?: { label: string; href: string };
};

export const mixingPlaylist = 'https://open.spotify.com/playlist/0fnqoYmoa8xndFh369w1FF';

export const categoryGoals: Record<Category, { title: string; items: Goal[] }> = {
  tech: { title: 'Ideas I’m bringing to life.', items: [
    { id: 'delphi', title: 'Build Delphi Atlas', detail: 'Making the technology ecosystem easier to explore.', status: 'In progress', link: { label: 'Explore Delphi', href: '#delphi' } },
    { id: 'hades', title: 'Grow Project Hades', detail: 'A directory of useful tools, apps and resources across interests.', status: 'In progress', link: { label: 'Explore Hades', href: '#hades' } },
    { id: 'odyssey', title: 'Bring Odyssey to life', detail: 'Turning interests into sidequests, discoveries and communities.', status: 'In progress', link: { label: 'Explore the vision', href: '#odyssey' } },
  ] },
  music: { title: 'Still in the making.', items: [
    { id: 'mashup', title: 'Armed and Dangerous × 10 Parttern', detail: 'Working on a mashup of the tracks by Victony & Young Jon and DJ Cliad.', status: 'In progress' },
    { id: 'produce-house', title: 'Start producing house music', detail: 'From finding the feeling to making the sound.', status: 'Next up' },
    { id: 'mix-selection', title: 'Collate the next mixes', detail: 'Gathering sounds and ideas for what comes next.', status: 'In progress', link: { label: 'Open my working playlist', href: mixingPlaylist } },
  ] },
  culture: { title: 'More worlds to get lost in.', items: [
    { id: 'gaming-shelf', title: 'Build out my gaming shelf', detail: 'A home for the games and worlds I want to share.', status: 'Next up', link: { label: 'Visit the games shelf', href: '/library/#games' } },
    { id: 'library-ratings', title: 'Give my favourites their flowers', detail: 'Add my own ratings and rankings to the film and reading lists.', status: 'Next up', link: { label: 'Browse the library', href: '/library/' } },
  ] },
  ideas: { title: 'Questions worth staying with.', items: [
    { id: 'writing', title: 'Make more room for writing', detail: 'Notes on history, culture, human behaviour and the questions that stay with me.', status: 'Next up' },
    { id: 'ideas-wall', title: 'Keep growing the wall', detail: 'Collect the words, images and ideas I want to carry forward.', status: 'In progress', link: { label: 'Visit the wall', href: '#ideas-wall' } },
  ] },
};

export type WallPiece = {
  id: string;
  kind: 'graffiti' | 'sculpture' | 'photo' | 'quote';
  label: string;
  text: string;
  credit: string;
  image?: string;
  alt?: string;
};

// Sora's own words from the supplied profile and the previously approved quote.
// Add verified attribution/source information when adding somebody else's words.
export const wallPieces: WallPiece[] = [
  { id: 'colour', kind: 'graffiti', label: 'A little rebellion', text: 'Bring back colour and fun into this unjust world.', credit: 'From my personal manifesto' },
  { id: 'curiosity', kind: 'sculpture', label: 'Leave the door open', text: 'Curiosity makes room for more.', credit: 'Sora' },
  { id: 'creativity', kind: 'photo', label: 'Human creativity', text: 'I generally appreciate expressions of human creativity in all its forms.', credit: 'Sora', image: '/media/personal/art-portrait.webp', alt: 'Sora standing among framed works of art.' },
  { id: 'space-time', kind: 'quote', label: 'Space / time', text: 'Art is how we decorate space, music is how we decorate time', credit: 'Attributed to Jean-Michel Basquiat' },
];

export function enquiryHref(subject: string) {
  return `mailto:Him@soralives.xyz?subject=${encodeURIComponent(subject)}`;
}
