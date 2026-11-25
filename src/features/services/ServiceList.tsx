import { useDeferredValue, useState, type FC } from 'react';
import { Search, X } from 'lucide-react';
import type { ServiceRecord } from '../../api/types';
import ServiceCard from '../../components/ServiceCard';
import { SERVICE_CATEGORIES, serviceCategory } from './serviceCategories';
import { useServices } from './useServices';

interface ServiceListProps { initialSearch?: string; limit?: number; }

export const ServiceList: FC<ServiceListProps> = ({ initialSearch = '', limit }) => {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<string>('All services');
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const { data: services = [], isLoading, isError, refetch } = useServices();
  const matching = services.filter((service: ServiceRecord) => {
    const matchesText = !deferredSearch || `${service.service_name} ${serviceCategory(service.service_name)}`.toLowerCase().includes(deferredSearch);
    return matchesText && (category === 'All services' || serviceCategory(service.service_name) === category);
  });
  const displayed = limit ? matching.slice(0, limit) : matching;
  const categories = ['All services', ...SERVICE_CATEGORIES.filter((name) => services.some((service) => serviceCategory(service.service_name) === name))];

  return <div className="service-catalogue">
    <div className="service-catalogue__toolbar">
      <label className="service-search"><Search size={20} aria-hidden="true" /><span className="sr-only">Search services</span>
        <input type="search" placeholder="Search by service or category" value={search} onChange={(event) => setSearch(event.target.value)} />
        {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={18} /></button>}
      </label>
      <div className="service-categories" role="group" aria-label="Filter services by category">
        {categories.map((name) => <button key={name} type="button" aria-pressed={category === name} className={category === name ? 'is-active' : ''} onClick={() => setCategory(name)}>{name}</button>)}
      </div>
    </div>
    {isLoading && <p className="service-catalogue__status" role="status">Loading available services…</p>}
    {isError && <div className="service-catalogue__status" role="alert"><p>We couldn’t load the service catalogue.</p><button type="button" onClick={() => void refetch()}>Try again</button></div>}
    {!isLoading && !isError && displayed.length > 0 && <div className="service-grid">{displayed.map((service) => <ServiceCard key={service.id} service={service} />)}</div>}
    {!isLoading && !isError && displayed.length === 0 && <div className="service-empty"><Search size={24} /><h3>No matching services</h3><p>Try another search or choose a different category.</p><button type="button" onClick={() => { setSearch(''); setCategory('All services'); }}>Clear filters</button></div>}
    {limit && matching.length > limit && <p className="service-catalogue__more">Showing {limit} of {matching.length} available services.</p>}
  </div>;
};

export default ServiceList;
