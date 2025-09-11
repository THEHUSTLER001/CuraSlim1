import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import logoSrc from '../../assets/images/Logo1.JPG';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const btnRef = useRef(null);

  // close menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 900 && open) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  // close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        navRef.current && !navRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const links = [
    { label: 'Home', href: '#' },
    { label: 'Pages', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Shop', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  return (
    <header className="site-header">
      {/* Mobile top bar: logo left, burger right */}
      <div className="site-header__mobilebar">
        <div className="container site-header__mobile-inner">
          <div className="logo">
            {logoSrc ? (
              <img src={logoSrc} alt="Cura logo" className="logo__img logo__img--mobile" />
            ) : (
              <span className="logo__text">Cura</span>
            )}
          </div>

          <button
            ref={btnRef}
            className={`nav-toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(s => !s)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="hamburger">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop layout: centered big logo + nav under it */}
      <div className="site-header__desktop">
        <div className="container site-header__inner--desktop">
          <div className="logo logo--desktop">
            {logoSrc ? (
              <img src={logoSrc} alt="Cura logo" className="logo__img logo__img--desktop" />
            ) : (
              <span className="logo__text logo__text--desktop">Cura</span>
            )}
          </div>

          <nav className="main-nav main-nav--desktop" aria-label="Main navigation">
            <ul className="main-nav__list main-nav__list--desktop">
              {links.map(l => (
                <li className="main-nav__item" key={l.label}>
                  <a className="main-nav__link" href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile slide-down nav (animated) */}
      <nav
        id="main-navigation"
        ref={navRef}
        className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}
        aria-hidden={!open}
      >
        <ul className="mobile-nav__list">
          {links.map(l => (
            <li key={l.label} className="mobile-nav__item">
              <a
                className="mobile-nav__link"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
