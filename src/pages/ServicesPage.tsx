import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ServiceList from '../features/services/ServiceList';

export const ServicesPage: FC = () => {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  return <div className="services-page">
    <section className="services-intro">
      <p className="eyebrow">FINANCIAL &amp; COMPLIANCE SERVICES</p>
      <h1>Financial &amp; Compliance Services</h1>
      <p>Browse the services currently listed in our catalogue. Compare available information and open a service to review its details.</p>
      <Link to="/contact">Not sure where to start? Talk to our team <ArrowRight size={17} /></Link>
    </section>
    <ServiceList key={query} initialSearch={query} />
  </div>;
};
export default ServicesPage;
