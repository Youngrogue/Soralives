// Public mockup copy from the supplied link inventory and cultural catalogue.
// Source documents retain provenance and editorial notes.

export type ContentLink = {
  label: string;
  detail: string;
  url: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type LibraryShelf = {
  id: 'screen' | 'reading' | 'games';
  label: string;
  description: string;
  titles: string[];
};

export const musicLinks: ContentLink[] = [
  {
    "label": "Listen on SoundCloud",
    "detail": "SoundCloud profile",
    "url": "https://soundcloud.com/soralive"
  },
  {
    "label": "All music links",
    "detail": "Linktree",
    "url": "https://linktr.ee/rogueskye"
  },
  {
    "label": "Sora Live Set (TSL Mondays)",
    "detail": "DJ set on SoundCloud",
    "url": "https://soundcloud.com/soralive/sora-live-set-tsl-mondays"
  },
  {
    "label": "Sora Live Set (TSL Oct 27th)",
    "detail": "DJ set on SoundCloud",
    "url": "https://soundcloud.com/soralive/sora-live-set-tsl-oct-27th"
  },
  {
    "label": "Sora Live Set (ECHO Nov 22nd)",
    "detail": "DJ set on SoundCloud",
    "url": "https://soundcloud.com/soralive/sora-live-set-echo-nov-22nd"
  },
  {
    "label": "Zone Out Set (Nov 29th)",
    "detail": "DJ set on SoundCloud",
    "url": "https://soundcloud.com/soralive/zone-out-set-nov-29th"
  },
  {
    "label": "Addicted (September 26, 2025 Prep Set)",
    "detail": "DJ set on SoundCloud",
    "url": "https://soundcloud.com/soralive/addicted-september-26-2025-prep-set"
  },
  {
    "label": "Sora Live Set (Tasha’s PopUp)",
    "detail": "DJ set on SoundCloud",
    "url": "https://soundcloud.com/soralive/sora-live-set-tashas-popup"
  }
];

export const playlistLinks: ContentLink[] = [
  {
    label: 'Ideas for my next mixes',
    detail: 'My working Spotify playlist',
    url: 'https://open.spotify.com/playlist/0fnqoYmoa8xndFh369w1FF'
  },
  {
    "label": "Evolution",
    "detail": "Spotify playlist",
    "url": "https://spotify.link/RNSiZjgPtXb"
  },
  {
    "label": "Revenge",
    "detail": "Spotify playlist",
    "url": "https://spotify.link/1vHqe65OtXb"
  },
  {
    "label": "Cool 25🌒",
    "detail": "Spotify playlist",
    "url": "https://spotify.link/qRakhYtOtXb"
  },
  {
    "label": "Collision",
    "detail": "Find on Linktree",
    "url": "https://linktr.ee/rogueskye"
  },
  {
    "label": "House Rave",
    "detail": "Find on Linktree",
    "url": "https://linktr.ee/rogueskye"
  },
  {
    "label": "4th Wave",
    "detail": "Find on Linktree",
    "url": "https://linktr.ee/rogueskye"
  },
  {
    "label": "Triple G",
    "detail": "Find on Linktree",
    "url": "https://linktr.ee/rogueskye"
  }
];

export const socials: SocialLink[] = [
  {
    "label": "Instagram",
    "url": "https://www.instagram.com/rogueskye"
  },
  {
    "label": "TikTok",
    "url": "https://www.tiktok.com/@rogueskye"
  },
  {
    "label": "X",
    "url": "https://x.com/soralives"
  },
  {
    "label": "Threads",
    "url": "https://www.threads.com/@rogueskye"
  },
  {
    "label": "Substack",
    "url": "https://substack.com/@soralives"
  }
];

export const councilLinks: SocialLink[] = [
  { label: 'YouTube', url: 'https://www.youtube.com/@Curiouscouncil' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@curious.council' },
];

export const animeLinks: ContentLink[] = [
  { label: 'Anime on TikTok', detail: 'From my saved discoveries', url: 'https://vt.tiktok.com/ZSbbQswDs/' },
];

export const libraryShelves: LibraryShelf[] = [
  {
    "id": "screen",
    "label": "Screen",
    "description": "Films, series and animation.",
    "titles": [
      "14 peaks: nothing is impossible",
      "3 days of the condor",
      "4 cut hero",
      "A beautiful mind",
      "A certain magical index",
      "A shop for killers",
      "Above the shadows",
      "Abstract: the art of design",
      "Age of shadows",
      "Alias",
      "Allegiance",
      "American horror story",
      "Andor",
      "Arrested Development",
      "Avatar: The Last Airbender (original animated series)",
      "Bad Blood",
      "Black bird",
      "Black light",
      "Black sails",
      "Blood and Bone",
      "Bloodhound",
      "Body of Lies",
      "Bodyguard",
      "Boston legal",
      "Breaking bad",
      "Bridge of Spies",
      "Catch me if you can",
      "Chuck",
      "Condor",
      "Connected",
      "Counterpart",
      "Crazy stupid love",
      "Dangerous liaisons",
      "Dark",
      "Dead in a week",
      "Dirty money",
      "Discovery of witches",
      "Dollface",
      "Dr Brain",
      "Enemy of the state",
      "Extraordinary",
      "Fight club",
      "First reformed",
      "Foundation",
      "Fringe",
      "From",
      "Game of thrones",
      "Get smart with money",
      "Ghost doctor",
      "Godfather of Harlem",
      "Good behavior",
      "Good Luck to You, Leo Grande",
      "Good omen",
      "Heal",
      "His dark materials",
      "His house",
      "Homeland",
      "Inside Job (animated series)",
      "Interview with the Vampire (film, 1994)",
      "Interview with the Vampire (series)",
      "Jack Ryan",
      "Kiss kiss bang bang",
      "Lastman (animated series)",
      "London Spy",
      "Lucky day",
      "Man on wire",
      "Marvelous Mrs Maisel",
      "Mayhem",
      "MI - 5",
      "Minari",
      "Minimalism",
      "Modern love",
      "Mouse",
      "Nevertheless",
      "Night has come",
      "Night Manager",
      "November man",
      "Oldboy (Park Chan-wook film)",
      "Omniscient",
      "Once upon a time",
      "Parallel",
      "Past lives",
      "Patriot",
      "Psych (series)",
      "Severance",
      "Shadow and bone",
      "Shogun",
      "Silo",
      "Sleepy Hollow",
      "Slow Horses",
      "Smiling friends",
      "Source Code",
      "Special Ops: Lioness",
      "Spotlight",
      "Succession",
      "Survivor",
      "Taxi to the dark side",
      "The Americans",
      "The Boys",
      "The Bureau",
      "The cellar",
      "The continental",
      "The covenant",
      "The game changer",
      "The Gentlemen (film)",
      "The Gentlemen (series)",
      "The good wife",
      "The gray man",
      "The great hack",
      "The kid who would be king",
      "The Killer (David Fincher film, 2023)",
      "The last voyage of Demeter",
      "The last witch Hunter",
      "The Lazarus project",
      "The leftovers",
      "The Legend of Heroes: Trails of Cold Steel - Northern War",
      "The legend of vox machina",
      "The Lobster",
      "The man who fell to earth",
      "The mind explained",
      "The minimalist",
      "The peripheral",
      "The playbook a coach’s rules for life",
      "The Pretender",
      "The rookie",
      "The sadness",
      "The social dilemma",
      "The sopranos",
      "The Terminal List",
      "The twilight zone",
      "The Unit",
      "They cloned Tyrone",
      "This is where I leave you",
      "Tick tick boom",
      "Tinker Tailor Soldier Spy",
      "Truman show",
      "Trust no one",
      "Unthinkable",
      "Upload",
      "Vanilla Sky",
      "Wandering earth",
      "Wheel of time",
      "White collar",
      "White House plumbers",
      "Wrath of man",
      "X Company",
      "Young Justice"
    ]
  },
  {
    "id": "reading",
    "label": "Reading",
    "description": "Manga, manhua and more.",
    "titles": [
      "3CM Hunter",
      "A wonderful new world",
      "Adonis",
      "Against the gods",
      "Ancient sovereign of eternity",
      "Arcane sniper",
      "Arifureta",
      "Ascension to godhood",
      "Auto hunting",
      "Blade of evolution",
      "Bug player",
      "Burnout shock",
      "Chronicles of heavenly demon",
      "Code Adam",
      "Crimson karma",
      "Demon magic emperor",
      "Dimensional hunter",
      "Dungeons and artifacts",
      "Eleceed",
      "FFF-class trashero",
      "First order",
      "Flow",
      "Foreigner on the periphery",
      "God of blackfield",
      "Hardcore leveling warriors",
      "Heaven defying sword",
      "Heavenly Inquisition Sword",
      "Hellper",
      "Helmut the forsaken child",
      "Her Summon",
      "Hoarding in hell",
      "I am the sorcerer king",
      "Incompetent villain",
      "IRL quest",
      "Jungle juice",
      "Kill the hero",
      "Landlords little girl",
      "Legend of the northern blade",
      "Leveling up, by only eating",
      "Leveling With The Gods",
      "Light and shadow",
      "Limit breaker",
      "Long live the king",
      "Magic emperor",
      "Memoir of the king of war",
      "Mercenary enrollment",
      "My dad is too strong",
      "My wife is a demon queen",
      "Nano machine",
      "Noblese",
      "Omniscient readers view point",
      "One coin clear",
      "Overgeared",
      "Past life regressor",
      "Promised orchid",
      "Ranker who lives a second time",
      "Rankers return",
      "Record of the war god",
      "Regressor instruction manual",
      "Reincarnated Into A Warlock 66,666 Years Later",
      "Reincarnation Of The Strongest Sword God",
      "Return of the disaster class hero",
      "Return of the frozen player",
      "Return of the legendary spear knight",
      "Return of the SSS-Class Ranker",
      "Return to player",
      "Returner magic should be special",
      "Revival man",
      "Revival of the battle god",
      "Rise from the rubble",
      "Rooftop sword master",
      "Second life ranker",
      "Shugurui",
      "Silent war",
      "Slave B",
      "Solo auto hunting",
      "Solo leveling",
      "Solo Spell caster",
      "Spare me great lord",
      "Sss class gatcha Hunter",
      "Sss class suicide hunter",
      "Strongest abandoned son",
      "Strongest Anti M.E.T.A",
      "Survival story of a king in a fantasy world",
      "Swordmaster’s Youngest Son",
      "Tales of demons and gods",
      "Taming master",
      "Taming monsters",
      "Terror man",
      "The beginning after the end",
      "The boxer",
      "The constellation that returned from hell",
      "The descent of the demonic master",
      "The Executed Sage Is Reincarnated as a Lich and Starts an All-Out War",
      "The first Hunter",
      "The God of highschool",
      "The great mage returns after 4000 years",
      "The last human",
      "The legend of asura the venom dragon",
      "The legendary mechanic",
      "The legendary moonlight sculptor",
      "The live",
      "The max level hero will return",
      "The origin",
      "The planet walks alone",
      "The player that can’t level up",
      "The rebirth of an 8th circled mage",
      "The scholars reincarnation",
      "The second coming of gluttony",
      "The tutorial is too hard",
      "The tutorial tower of advanced player",
      "The undefeatable swords man",
      "Tomb raider king",
      "Tower of God",
      "Trash of the count’s family",
      "Unknown code",
      "Unordinary",
      "Updater",
      "Versatile mage",
      "We Reincarnation of murim clans ranker",
      "Worn and turn newbie"
    ]
  },
  {
    "id": "games",
    "label": "Games",
    "description": "Worlds to get lost in.",
    "titles": [
      "The Elder Scrolls V: Skyrim"
    ]
  }
];

export const councilDescription = 'Visual stories and explainers exploring technology, history, power, culture and the ideas shaping our world.';
