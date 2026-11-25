import { useSearchParams } from 'react-router-dom';
import ServiceList from '../features/services/ServiceList';
export function ServicesPage() {
  const [params] = useSearchParams(); const query = params.get('q') ?? '';
  return <div className="catalogue-page"><header className="page-heading"><div className="container"><p className="eyebrow">THE SERVICE DIRECTORY</p><h1>Financial & Compliance Services</h1><p>Find the support your business needs. Review service fees, document requirements and the next steps in one place.</p></div></header><div className="container section-space"><ServiceList key={query} initialSearch={query}/></div></div>;
}
export default ServicesPage;
