type SocialIconProps = {
  platform: string;
  className?: string;
  size?: number;
};

export function SocialIcon({ platform, className = '', size = 20 }: SocialIconProps) {
  return <svg className={`social-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {platform === 'Instagram' ? <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".85" fill="currentColor" stroke="none"/></>
      : platform === 'X' ? <><path d="m4 3 12.2 18H20L7.8 3H4Z"/><path d="m20 3-6.3 7.3M10.3 14 4 21"/></>
      : platform === 'TikTok' ? <><path d="M14 3v12.5a4.5 4.5 0 1 1-4.5-4.5H10v3H9.5A1.5 1.5 0 1 0 11 15.5V3h3Zm0 0c.4 3.2 2.1 4.9 5 5v3c-2-.2-3.6-.9-5-2"/></>
      : platform === 'Threads' ? <path d="M18.8 8.1C18.2 4.4 15.8 2.5 12 2.5 6.8 2.5 4 5.9 4 12s2.8 9.5 8 9.5c4.4 0 7.3-2.4 7.3-6 0-3.1-2.9-5.2-7-5.2-2.9 0-4.6 1.3-4.6 3.2 0 1.8 1.4 3 3.4 3 3.1 0 4.6-2.4 4.6-6.1 0-3.1-1.3-4.7-3.8-4.7-1.5 0-2.7.6-3.4 1.8"/>
      : platform === 'YouTube' ? <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></>
      : platform === 'Substack' ? <><path d="M4 3h16M4 7h16M4 11h16v10l-8-5-8 5V11Z"/></>
      : <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/></>}
  </svg>;
}
