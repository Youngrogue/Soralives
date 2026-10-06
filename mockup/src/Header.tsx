import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { Arrow, Star } from './Icons';
import { socials } from './content';
import { menuGroups, moveToAnchor, ordinaryClick } from './navigation';

export function Header({ isLibrary }: { isLibrary: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      if (!isLibrary) {
        const sections = ['about', 'music', 'tech', 'culture', 'ideas', 'contact'];
        setActive(sections.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 180).at(-1) ?? '');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.body.classList.remove('menu-open');
    };
  }, [isLibrary]);

  function finishClose(restoreFocus: boolean) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
    dialog.current?.close();
    document.body.classList.remove('menu-open');
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }
  function showMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    dialog.current?.showModal();
    dialog.current?.querySelector('.menu-surface')?.scrollTo(0, 0);
    document.body.classList.add('menu-open');
    closeButton.current?.focus({ preventScroll: true });
    setOpen(true);
  }
  function closeMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
    closeTimer.current = setTimeout(() => finishClose(true), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260);
  }
  function keepMenuFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  function followLink(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!ordinaryClick(event) || !href.startsWith('/')) return;
    const destination = new URL(href, location.origin);
    const samePage = destination.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '');
    if (!samePage) return;
    event.preventDefault();
    finishClose(false);
    if (location.hash !== destination.hash) history.pushState(null, '', destination.pathname + destination.hash);
    if (isLibrary) window.dispatchEvent(new HashChangeEvent('hashchange'));
    const target = isLibrary && destination.hash ? `tab-${destination.hash.slice(1)}` : destination.hash.slice(1) || (isLibrary ? 'library-title' : 'top');
    moveToAnchor(target);
  }
  const linkProps = (href: string) => href.startsWith('https:') ? { target: '_blank', rel: 'noreferrer' } : {};

  return <>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <a className="brand" href="/" aria-label="Sora Lives home"><Star/><span>sora<span className="brand-light">lives</span><span className="brand-dot">.</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {menuGroups.map(group => <a key={group.href} href={group.href} aria-current={!isLibrary && group.href === `/#${active}` ? 'location' : undefined} onClick={e => followLink(e, group.href)}>{group.label}</a>)}
      </nav>
      <button ref={trigger} className="menu-trigger" aria-haspopup="dialog" aria-expanded={open} aria-controls="explore-menu" onClick={showMenu}><span>Explore</span><i className="hamburger" aria-hidden="true"><b/><b/></i></button>
    </header>
    <dialog ref={dialog} id="explore-menu" aria-labelledby="menu-heading" className={`menu-dialog ${open ? 'is-open' : ''}`} onKeyDown={keepMenuFocus} onCancel={e => { e.preventDefault(); closeMenu(); }}>
      <div className="menu-surface">
        <div className="menu-top"><a href="/" className="brand" onClick={e => followLink(e, '/')}><Star/><span>soralives.</span></a><button ref={closeButton} className="menu-trigger close-trigger" onClick={closeMenu}><span>Close</span><i className="hamburger is-close" aria-hidden="true"><b/><b/></i></button></div>
        <div className="directory-intro"><div><p className="eyebrow">THE SORAVERSE</p><h2 id="menu-heading">Find your <em>way.</em></h2></div><nav className="directory-shortcuts" aria-label="Main pages">
          {[{label:'Home',href:'/'},{label:'About Sora',href:'/#about'},{label:'Contact',href:'/#contact'}].map(link => <a key={link.href} href={link.href} onClick={e=>followLink(e,link.href)}>{link.label}<Arrow/></a>)}
        </nav></div>
        <nav className="directory-grid" aria-label="All sections and pages">
          {menuGroups.map(group => <section className="directory-group" key={group.href}>
            <h3><a href={group.href} onClick={e=>followLink(e,group.href)}>{group.label}<Arrow/></a></h3>
            <ul>{group.links.map(link=><li key={link.href + link.label}><a href={link.href} {...linkProps(link.href)} onClick={e=>followLink(e,link.href)}><span>{link.label}{link.note&&<small>{link.note}</small>}</span>{link.href.startsWith('https:')&&<Arrow diagonal/>}</a></li>)}</ul>
          </section>)}
        </nav>
        <div className="directory-footer"><a href="mailto:Him@soralives.xyz" className="directory-email">Him@soralives.xyz<Arrow diagonal/></a><nav aria-label="Social profiles">{socials.filter(s=>s.label!=='Substack').map(s=><a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}<Arrow diagonal/></a>)}</nav></div>
      </div>
    </dialog>
  </>;
}
