export type CatalogueEntry = {
  id: string; title: string; description: string; category: 'Arts & Culture'|'Music & DJ'|'Tech & Business'|'Society & Ideas';
  url: string; source: string; date?: string; weekOf?: string;
  image?: string; imageAlt?: string; video?: string; cover?: 'isekai'|'releases';
};
export const catalogueEntries: CatalogueEntry[] = [
  {id:'isekai-selection',title:'My top 15 isekai anime',description:'Other worlds, second lives and the stories I keep coming back to. My ranked isekai selection.',category:'Arts & Culture',url:'https://www.tiktok.com/@rogueskye/photo/7694002911180901640',source:'TikTok',cover:'isekai'},
  {id:'anime-releases',title:'Anime on my radar',description:'New releases, returning worlds and a few things to look out for. A release post, rather than a ranking.',category:'Arts & Culture',url:'https://www.tiktok.com/@rogueskye/photo/7626527066757942536',source:'TikTok',cover:'releases'},
];
export type WritingCard = {id:string;title:string;description:string;url:string;image:string;imageAlt:string;kind:'profile'|'article';date?:string};
export const writingCards:WritingCard[]=[
  {id:'substack-profile',title:'More room for a thought.',description:'History, culture, technology and the human experience. Longer thoughts will live on Substack.',url:'https://substack.com/@soralives',image:'/media/personal/art-portrait.webp',imageAlt:'Sora among framed artworks.',kind:'profile'},
];
