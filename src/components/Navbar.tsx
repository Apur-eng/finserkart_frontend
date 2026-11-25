import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { SidePanel } from './ui';
import { useCompactViewport } from '../hooks/useCompactViewport';

const roles = [['customer','Customer Login'],['agent','Agent Login'],['franchise','Franchise Login'],['ca','CA Login'],['coordinator','Operations Coordinator Login'],['admin','Main Admin Login']];
function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return <details className="nav-dropdown" onKeyDown={event => { if(event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }}>
    <summary>{label}<ChevronDown size={13} aria-hidden="true" /></summary><div className="nav-dropdown-panel" onClick={event => { if ((event.target as HTMLElement).closest('a')) { const details = event.currentTarget.closest('details'); if(details) details.open = false; } }}>{children}</div>
  </details>;
}
export function Navbar() {
  const compact = useCompactViewport();
  const location = useLocation(); const route = location.pathname + location.search + location.hash;
  const [openAt,setOpenAt] = useState<string|null>(null);
  const nav = <><NavLink to="/" end>Home</NavLink><NavLink to="/services">Services</NavLink><Link to="/#how-it-works">How It Works</Link>
    <Dropdown label="Partner With Us"><Link to="/#agents">Become an Agent</Link><Link to="/#franchise">Franchise Opportunities</Link><Link to="/#professionals">Professional Network</Link></Dropdown>
    <NavLink to="/about">About Us</NavLink><NavLink to="/contact">Contact</NavLink></>;
  const logins = <>{roles.map(([role,label],index)=><span key={role}>{index === 4 && <small className="menu-caption">Staff login</small>}<Link to={`/login?role=${role}`}>{label}</Link></span>)}</>;
  return <header className="site-header"><a className="skip-link" href="#public-content">Skip to content</a>
    <div className="container nav-bar"><Link className="brand" to="/" aria-label="Finservkart home"><span className="brand-mark" aria-hidden="true">f<span>.</span></span>finservkart<span className="brand-dot">.</span></Link>
    {!compact && <><nav aria-label="Main navigation" className="desktop-nav">{nav}</nav><div className="nav-actions"><Link className="nav-demo" to="/explore-demo">Explore Demo</Link><Dropdown label="Login">{logins}</Dropdown><Link to="/register" className="button button-primary">Get Started<ArrowUpRight size={15} aria-hidden="true" /></Link></div></>}
    {compact && <button className="button button-ghost" aria-expanded={openAt===route} aria-controls="mobile-navigation" onClick={()=>setOpenAt(route)}><Menu size={21} aria-hidden="true"/>Menu</button>}</div>
    {compact && <SidePanel label="Main navigation" isOpen={openAt===route} onOpenChange={open=>setOpenAt(open?route:null)}><div id="mobile-navigation" className="mobile-nav"><button className="button button-secondary" onClick={()=>setOpenAt(null)}><X size={18} aria-hidden="true"/>Close menu</button><nav aria-label="Main navigation">{nav}</nav><p className="eyebrow">Your account</p>{logins}<Link className="button button-primary" to="/register">Get Started</Link><Link to="/explore-demo">Explore Demo</Link></div></SidePanel>}
  </header>;
}
export default Navbar;
