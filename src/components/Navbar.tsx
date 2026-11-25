import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, ShieldCheck, X } from 'lucide-react';
import { useCompactViewport } from '../hooks/useCompactViewport';
import { serviceCategory } from '../features/services/serviceCategories';
import api, { VERIFIED_INITIAL_SERVICES } from '../api/client';
import type { ServiceRecord } from '../api/types';

const roles = [
  ['customer', 'Customer Login'], ['agent', 'Agent Login'], ['franchise', 'Franchise Login'],
  ['ca', 'CA Login'], ['coordinator', 'Operations Coordinator Login'], ['admin', 'Main Admin Login'],
];
const itemStyle = { color: 'inherit', textDecoration: 'none' } as const;

export function Navbar() {
  const compact = useCompactViewport();
  const { pathname } = useLocation();
  const [services, setServices] = useState<ServiceRecord[]>(VERIFIED_INITIAL_SERVICES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Business registration');
  const [mobileCategory, setMobileCategory] = useState('');
  const rootRef = useRef<HTMLElement>(null);
  const home = pathname === '/';
  const grouped = useMemo(() => {
    const result = new Map<string, typeof services>();
    services.forEach((service) => {
      const category = serviceCategory(service.service_name);
      result.set(category, [...(result.get(category) || []), service]);
    });
    return [...result.entries()];
  }, [services]);
  const activeServices = grouped.find(([category]) => category === activeCategory)?.[1] || grouped[0]?.[1] || [];

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setMobileOpen(false);
        rootRef.current?.querySelector<HTMLButtonElement>('[data-services-trigger]')?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeEscape);
    };
  }, []);

  const navLink = (to: string, label: string) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `fsk-nav__link${isActive ? ' is-active' : ''}`} style={itemStyle} onClick={close}>{label}</NavLink>;
  const close = () => { setMenuOpen(false); setMobileOpen(false); };

  useEffect(() => {
    let active = true;
    void api.searchServices().then((records) => { if (active && records.length) setServices(records); });
    return () => { active = false; };
  }, []);

  return <header ref={rootRef} className={`fsk-nav${home ? ' fsk-nav--home' : ''}`}>
    <a className="skip-link" href="#public-content">Skip to content</a>
    <div className="fsk-nav__bar">
      <Link to="/" aria-label="Finservkart home" className="fsk-nav__brand">
        <ShieldCheck aria-hidden="true" size={25} strokeWidth={2.1} />
        <span>finservkart</span>
      </Link>
      {!compact && <nav className="fsk-nav__links" aria-label="Main navigation">
        {navLink('/', 'Home')}{navLink('/about', 'About Us')}
        <button data-services-trigger type="button" aria-expanded={menuOpen} aria-controls="services-mega-menu"
          className={`fsk-nav__link fsk-nav__trigger${menuOpen || pathname.startsWith('/services') ? ' is-active' : ''}`}
          onMouseEnter={() => setMenuOpen(true)} onFocus={() => setMenuOpen(true)}
          onClick={() => setMenuOpen((open) => !open)}>
          Services <ArrowDown size={15} aria-hidden="true" />
        </button>
        {navLink('/contact', 'Contact')}
      </nav>}
      <div className="fsk-nav__actions">
        <Link className="fsk-nav__demo" to="/explore-demo">Explore Demo</Link>
        {!compact && <details className="fsk-nav__login">
          <summary>Login <ArrowDown size={14} aria-hidden="true" /></summary>
          <div className="fsk-nav__login-menu">{roles.map(([role, label]) => <Link key={role} to={`/login?role=${role}`} onClick={close}>{label}</Link>)}</div>
        </details>}
        <Link className="fsk-nav__cta" to="/register">Create account <ArrowUpRight size={15} aria-hidden="true" /></Link>
        {compact && <button className="fsk-nav__mobile-trigger" type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X /> : <Menu />}<span className="sr-only">Menu</span>
        </button>}
      </div>
    </div>

    {!compact && menuOpen && <div id="services-mega-menu" className="fsk-mega" onMouseLeave={() => setMenuOpen(false)}>
      <div className="fsk-mega__inner">
        <div className="fsk-mega__categories" aria-label="Service categories">
          <p className="fsk-mega__eyebrow">EXPLORE BY CATEGORY</p>
          {grouped.map(([category]) => <button key={category} type="button" className={activeCategory === category ? 'is-selected' : ''}
            onMouseEnter={() => setActiveCategory(category)} onFocus={() => setActiveCategory(category)} onClick={() => setActiveCategory(category)}>
            {category}<ArrowRight size={15} aria-hidden="true" />
          </button>)}
          <Link className="fsk-mega__all" to="/services" onClick={close}>View all services <ArrowUpRight size={15} /></Link>
        </div>
        <div className="fsk-mega__services" aria-live="polite">
          <div><p className="fsk-mega__eyebrow">AVAILABLE SERVICES</p><h2>{activeCategory}</h2></div>
          <div className="fsk-mega__service-grid">{activeServices.map((service) => <Link key={service.id} to={`/services/${service.id}`} onClick={close}>
            <span>{service.service_name}</span><ArrowUpRight size={16} aria-hidden="true" />
          </Link>)}</div>
          <Link className="fsk-mega__browse" to="/services" onClick={close}>Browse the full catalogue <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>}

    {compact && mobileOpen && <div className="fsk-mobile-menu">
      <nav className="fsk-mobile-menu__links" aria-label="Mobile navigation">
        {navLink('/', 'Home')}{navLink('/about', 'About Us')}
        <Link className="fsk-nav__link" to="/services" onClick={close}>All services</Link>
        {grouped.map(([category, items]) => <section className="fsk-mobile-menu__category" key={category}>
          <button type="button" aria-expanded={mobileCategory === category} onClick={() => setMobileCategory(mobileCategory === category ? '' : category)}>{category}<ArrowDown size={15} /></button>
          {mobileCategory === category && <div>{items.map((service) => <Link key={service.id} to={`/services/${service.id}`} onClick={close}>{service.service_name}</Link>)}</div>}
        </section>)}
        {navLink('/contact', 'Contact')}
      </nav>
      <div className="fsk-mobile-menu__account"><p>Your account</p>{roles.map(([role, label]) => <Link key={role} to={`/login?role=${role}`} onClick={close}>{label}</Link>)}<Link to="/register" onClick={close}>Create an account</Link></div>
      <Link className="fsk-mobile-menu__demo" to="/explore-demo" onClick={close}>Explore Demo <ArrowUpRight size={15} /></Link>
    </div>}
  </header>;
}
export default Navbar;
