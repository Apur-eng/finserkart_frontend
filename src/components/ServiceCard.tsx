import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import type { ServiceRecord } from '../api/types';
import { serviceCategory } from '../features/services/serviceCategories';
import { formatCurrency } from '../utils/formatters';

const descriptions: Record<string, string> = {
  'GST Registration': 'Registration assistance and document coordination for businesses exploring GST enrolment.',
  'ITR Filing': 'Organised support for preparing and filing an income tax return from your supplied records.',
  'Private Limited Company Registration': 'Company formation assistance with a clear view of the information and documents involved.',
  'Accounting & Bookkeeping Services': 'Ongoing support to organise business accounts, statements, and transaction records.',
  'Tax Audit & Auditing': 'Audit support and financial record preparation, with scope confirmed for each engagement.',
  'CIBIL Improvement & Resolution': 'Guidance for reviewing credit records and preparing a dispute or resolution request.',
  'Project Report for Bank Loan': 'A structured project report prepared from your business plan and financial information.',
  'Labour Law & Shop Act Compliance': 'Support to understand the documents and administrative steps for local compliance needs.',
  'Trust & NGO Registration': 'Formation support for trusts and non-profit organisations, based on the selected structure.',
  'HUF Registration & Deeds': 'Assistance preparing HUF documentation and the related service application.',
};

export function ServiceCard({ service }: { service: ServiceRecord }) {
  const [imageFailed, setImageFailed] = useState(false);
  const total = Number(service.total_amt);
  const hasPrice = Number.isFinite(total) && total >= 0 && service.total_amt.trim() !== '';
  const image = service.service_image ? `/services/${service.service_image}` : '';
  return <article className="service-card">
    {image && !imageFailed && <div className="service-card__image"><img src={image} alt="" loading="lazy" onError={() => setImageFailed(true)} /></div>}
    <div className="service-card__body">
      <div className="service-card__meta"><span>{serviceCategory(service.service_name)}</span><Check size={15} aria-label="Available in catalogue" /></div>
      <h3>{service.service_name}</h3>
      <p>{descriptions[service.service_name] || `Explore available assistance for ${service.service_name.toLowerCase()}, with scope confirmed before you apply.`}</p>
      <div className="service-card__footer">
        <div>{hasPrice ? <><span>Listed total</span><strong>{formatCurrency(total)}</strong></> : <span>Ask us about pricing</span>}</div>
        <Link to={`/services/${service.id}`} aria-label={`View details for ${service.service_name}`}>View details <ArrowUpRight size={17} /></Link>
      </div>
    </div>
  </article>;
}
export default ServiceCard;
