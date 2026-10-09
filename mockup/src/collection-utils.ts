import type { CatalogueEntry } from './catalogue-content.ts';
/** Accept only real calendar dates. An undated post must never inherit a guessed date. */
export function validDate(date?:string):date is string {return !!date&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date))&&new Date(`${date}T00:00:00Z`).toISOString().slice(0,10)===date;}
export function dateLabel(date:string){return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`));}
export function groupCatalogue(entries:CatalogueEntry[]){
 const groups=new Map<string,{key:string;label:string;date?:string;entries:CatalogueEntry[]}>();
 for(const entry of entries){const dated=validDate(entry.date),week=dated&&validDate(entry.weekOf)?entry.weekOf:undefined;
  const key=dated?(week?`week:${week}`:entry.date!):'undated';
  if(!groups.has(key))groups.set(key,{key,label:dated?(week?`Week of ${dateLabel(week)}`:dateLabel(entry.date!)):'From the collection',date:week||(dated?entry.date:undefined),entries:[]});
  groups.get(key)!.entries.push(entry);
 }
 return [...groups.values()].sort((a,b)=>a.date&&b.date?b.date.localeCompare(a.date):a.date?-1:b.date?1:0);
}
