export type Skill = { name: string; icon?: string };
export type SkillGroup = { title: string; icon: string; primary?: boolean; items: Skill[] };
const icons: Record<string,string> = { React:'react', TypeScript:'typescript', 'Next.js':'next', Vercel:'vercel', GitHub:'github', Figma:'figma' };
const items=(names:string[]):Skill[]=>names.map(name=>({name,icon:icons[name]}));
// Source reviewed 9 October 2026: https://tobiarogunmati.com/#skills
export const skillGroups: SkillGroup[] = [
  {title:'Product delivery & requirements',icon:'delivery',primary:true,items:items(['Product delivery','Requirements & Business Analysis','QA & UAT Management','Vendor & SI Management','Agile / Scrum','Requirements Traceability (RTM)','SDLC'])},
  {title:'AI engineering',icon:'ai',primary:true,items:items(['Agentic Product Engineering','Claude Code','Codex','Manus','Z AI','Qwen'])},
  {title:'Software & product development',icon:'code',primary:true,items:items(['Next.js','React','TypeScript','Payload CMS','PostgreSQL','Neon','Vercel','Cloudflare','GitHub'])},
  {title:'Delivery, design & collaboration',icon:'design',items:items(['Jira','Confluence','MS Project','Azure Test Plans','Power BI','Figma','Canva'])},
  {title:'Integration & data',icon:'data',items:items(['API & Middleware Integration','Microservices Architecture','ETL & Data Migration','SQL','PostgreSQL','Postman'])},
  {title:'Enterprise & banking platforms',icon:'systems',items:items(['Calypso','Oracle FLEXCUBE','Temenos Transact','Temenos Digital','Finacle','Finacle Treasury','Oracle Lending','Oracle Trade','Kastle','Microsoft Dynamics','SAP'])},
  {title:'Strategy, banking & methods',icon:'strategy',items:items(['Enterprise Digital Transformation','Technology Advisory & Strategy','Banking Operations Expertise','Waterfall','Risk Management','Change Management','Lending & credit','Trade finance','Treasury & money markets','Cards & digital payments'])},
];
