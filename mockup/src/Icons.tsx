export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Star({ className = '' }: { className?: string }) {
  return <svg className={className} width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 3C34 23 41 30 61 32C41 34 34 41 32 61C30 41 23 34 3 32C23 30 30 23 32 3Z" fill="currentColor" /></svg>;
}
export function Orb({ className = '' }: { className?: string }) {
  return <svg className={className} width="80" height="80" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth=".7"/><ellipse cx="50" cy="50" rx="14" ry="34" stroke="currentColor" strokeWidth=".7" transform="rotate(-28 50 50)"/><ellipse cx="50" cy="50" rx="45" ry="12" stroke="currentColor" strokeWidth=".8" transform="rotate(-28 50 50)"/></svg>;
}
