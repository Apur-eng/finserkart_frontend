import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceRecord } from '../api/types';
import { servicePresentation } from '../features/services/servicePresentation';
export function ServiceCard({ service }: { service: ServiceRecord }) {
  const { Icon, description, tone } = servicePresentation(service.service_name);
  const amount = service.total_amt.trim(); const valid = /^\d+(\.\d+)?$/.test(amount) && Number.isFinite(Number(amount));
  return <article className={`service-card service-tone-${tone} fsk-motion-card fsk-hardware-accelerated`}><div className="service-art" aria-hidden="true"><Icon size={35} strokeWidth={1.4}/><span className="service-art-line"/><span className="service-art-dot"/></div>
    <div className="service-card-body"><h3>{service.service_name}</h3><p>{description}</p><div className="service-card-bottom">{valid && <div className="service-price"><small>Total fee</small><strong>{new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(amount))}</strong></div>}<Link aria-label={`View Details: ${service.service_name}`} to={`/services/${service.id}`}>View Details<ArrowUpRight size={17} aria-hidden="true"/></Link></div></div>
  </article>;
}
export default ServiceCard;
