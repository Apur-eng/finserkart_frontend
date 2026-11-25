import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useServices } from '../features/services/useServices';
const copyrightYear = new Date().getFullYear();
export function Footer() {
  const { data: services = [] } = useServices();
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><div><Link className="brand" to="/">finservkart.</Link><p>Financial services for every<br/>stage of your business.</p><Link to="/contact" className="footer-contact">Contact our team <ArrowUpRight size={16}/></Link></div>
    <div><h2>Popular services</h2>{services.slice(0,4).map(s=><Link key={s.id} to={`/services/${s.id}`}>{s.service_name}</Link>)}<Link to="/services">All services</Link></div>
    <div><h2>Customers</h2><Link to="/#how-it-works">How it works</Link><Link to="/register">Create an account</Link><Link to="/login?role=customer">Customer login</Link><Link to="/explore-demo">Explore Demo</Link><Link to="/contact">Support & enquiries</Link></div>
    <div><h2>Our network</h2><Link to="/#agents">Become an agent</Link><Link to="/#franchise">Franchise opportunities</Link><Link to="/login?role=agent">Agent login</Link><Link to="/login?role=franchise">Franchise login</Link><Link to="/login?role=ca">Professional login</Link><Link to="/login?role=coordinator">Operations Coordinator</Link><Link to="/login?role=admin">Main Admin</Link></div></div>
    <div className="footer-bottom"><span>&copy; {copyrightYear} Finservkart. All rights reserved.</span><div><Link to="/about">About us</Link><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-and-conditions">Terms & conditions</Link></div></div>
  </div></footer>;
}
export default Footer;
