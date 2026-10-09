export type BucketCategory='travel'|'learning'|'career'|'home'|'music'|'recognition'|'personal';
export type BucketItem={id:string;title:string;category:BucketCategory;adult:boolean;status:'unmarked'|'in-progress'|'complete';completedOn?:string;note?:string};
export const bucketCategories:Record<BucketCategory,string>={travel:'Travel',learning:'Learning',career:'Career',home:'Home',music:'Music',recognition:'Recognition',personal:'Personal experiences'};
export const bucketItems:BucketItem[]=[
 {id:'wonders',title:'Travel to all the wonders of the world',category:'travel',adult:false,status:'unmarked'},
 {id:'languages',title:'Learn like 2 languages',category:'learning',adult:false,status:'unmarked'},
 {id:'tech-income',title:'Enter tech and be earning in dollars',category:'career',adult:false,status:'unmarked'},
 {id:'apartment',title:'Get an apartment and make it really nice',category:'home',adult:false,status:'unmarked'},
 {id:'development',title:'Learn software/web development. Learn a programming language',category:'learning',adult:false,status:'unmarked'},
 {id:'income',title:'Earn $5k/month',category:'career',adult:false,status:'unmarked'},
 {id:'international-dj',title:'Be a Headline DJ for an international event',category:'music',adult:false,status:'unmarked'},
 {id:'headline',title:'Headline for an event',category:'music',adult:false,status:'unmarked'},
 {id:'mashup',title:'Make a mashup',category:'music',adult:false,status:'unmarked'},
 {id:'producer',title:'Become a Music producer and drop a track',category:'music',adult:false,status:'unmarked'},
 {id:'award',title:'Win an award',category:'recognition',adult:false,status:'unmarked'},
 {id:'international-award',title:'Win an international aWARD',category:'recognition',adult:false,status:'unmarked'},
 {id:'solo-travel',title:'Travel somewhere alone',category:'travel',adult:false,status:'unmarked'},
 {id:'instrument',title:'Learn a music instrument',category:'learning',adult:false,status:'unmarked'},
 {id:'podcast',title:'Start a podcast',category:'personal',adult:false,status:'unmarked'},
 {id:'newsletter',title:'Start a blog/newsletter',category:'personal',adult:false,status:'unmarked'},
 {id:'company',title:'Start a company',category:'career',adult:false,status:'unmarked'},
 {id:'japan',title:'Travel to japan',category:'travel',adult:false,status:'unmarked'},
 {id:'paid-headliner',title:'Perform as a DJ at a paid event where I’m a headliner',category:'music',adult:false,status:'unmarked'},
];
export function filterBucket(items:BucketItem[],category:string,status:string){return items.filter(item=>(category==='all'||item.category===category)&&(status==='all'||item.status===status));}
