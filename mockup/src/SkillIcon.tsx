export function SkillIcon({ type }: { type: string }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type==='react'?<><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>
    :type==='typescript'?<><rect x="2" y="2" width="20" height="20" rx="2" fill="#3178c6" stroke="none"/><text x="5" y="17" fill="white" stroke="none" fontSize="10" fontWeight="700" fontFamily="Arial">TS</text></>
    :type==='next'?<><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8 16V8l9 12M16 8v7" stroke="var(--paper,#fff)"/></>
    :type==='vercel'?<path d="m12 3 10 17H2Z" fill="currentColor" stroke="none"/>
    :type==='figma'?<><path d="M12 2H8a4 4 0 0 0 0 8h4Z" fill="#f24e1e" stroke="none"/><path d="M12 2h4a4 4 0 0 1 0 8h-4Z" fill="#ff7262" stroke="none"/><path d="M12 10H8a4 4 0 0 0 0 8h4Z" fill="#a259ff" stroke="none"/><circle cx="16" cy="14" r="4" fill="#1abcfe" stroke="none"/><path d="M12 18H8a4 4 0 1 0 4 4Z" fill="#0acf83" stroke="none"/></>
    :type==='github'?<><path d="M8 21v-3c-4 1-4-2-5-2m13 5v-4c3-1 4-3 4-6 0-2-1-3-2-4V3l-4 2a12 12 0 0 0-4 0L6 3v4c-1 1-2 2-2 4 0 3 2 5 4 6"/></>
    :type==='delivery'?<><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 10l2 2 5-5M9 16h6"/></>
    :type==='code'?<><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></>
    :type==='systems'?<><rect x="2" y="3" width="8" height="7" rx="1"/><rect x="14" y="14" width="8" height="7" rx="1"/><path d="M14 6h4v5M6 13v5h4"/></>
    :type==='design'?<><path d="m4 19 2-7L16 2l6 6-10 10-8 1Zm2-7 6 6M13 5l6 6M3 22h18"/></>
    :type==='data'?<><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/></>
    :type==='strategy'?<><path d="m3 8 9-5 9 5H3Zm2 0v11m7-11v11m7-11v11M3 21h18"/></>
    :<><path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2ZM20 2v4m-2-2h4"/></>}
  </svg>;
}
