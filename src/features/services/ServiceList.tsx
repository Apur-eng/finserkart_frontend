import { ActionButton, EmptyState, LoadingIndicator, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import ServiceCard from '../../components/ServiceCard';
import useDebounce from '../../hooks/useDebounce';
import { useServices } from './useServices';

interface ServiceListProps {
  initialSearch?: string;
  limit?: number;
}

export const ServiceList: React.FC<ServiceListProps> = ({ initialSearch = '', limit }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: services, isLoading, isError, refetch } = useServices(debouncedSearch);

  const displayedServices = limit && services ? services.slice(0, limit) : services;

  return (
    <Surface style={{ width: '100%' }}>
      {/* Search Bar */}
      <Surface style={{ maxWidth: "30rem", margin: "0 auto clamp(1rem, 2.769230769230769vw, 2.25rem) auto" }}>
        <Field
          label="Search Services"
          isLabelHidden
          placeholder="Search services (e.g. GST, ITR, Audit, Pvt Ltd)..."
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          hasClear
          width="100%"
          size="lg"
        />
      </Surface>

      {/* Loading State */}
      {isLoading && (
        <Surface style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "clamp(1rem, 4.923076923076923vw, 4rem) 0", gap: "1rem" }}>
          <LoadingIndicator />
          <Inline style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Loading verified financial services...</Inline>
        </Surface>
      )}

      {/* Error State */}
      {isError && (
        <Surface style={{ padding: "clamp(1rem, 2.4615384615384617vw, 2rem)", textAlign: 'center', background: "#fef2f2", border: "0.0625rem solid #fee2e2", borderRadius: "1rem", maxWidth: "37.5rem", margin: '0 auto' }}>
          <h3 style={{ color: "#991b1b", marginBottom: "0.5rem", fontSize: "1.125rem" }}>Failed to retrieve services</h3>
          <p style={{ color: "#b91c1c", fontSize: "0.875rem", marginBottom: "1rem" }}>
            We could not fetch data from the backend. Please check your network connection and try again.
          </p>
          <ActionButton label="Retry Connection" variant="secondary" onClick={() => refetch()} />
        </Surface>
      )}

      {/* Empty State */}
      {!isLoading && !isError && displayedServices && displayedServices.length === 0 && (
        <Surface style={{ padding: "clamp(1rem, 3.6923076923076925vw, 3rem) 1rem" }}>
          <EmptyState
            title="No services found"
            description={`No services matched "${debouncedSearch}". Please try searching with a different term like "GST", "ITR", "Company", or "Audit".`}
            icon={<Search size={40} color="#687d93" />}
            actions={
              <ActionButton
                label="Clear Search"
                variant="secondary"
                onClick={() => setSearchTerm('')}
              />
            }
          />
        </Surface>
      )}

      {/* Services Grid */}
      {!isLoading && !isError && displayedServices && displayedServices.length > 0 && (
        <Surface
          style={{
            display: 'grid',
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 20rem), 1fr))",
            gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
          }}
        >
          {displayedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Surface>
      )}
    </Surface>
  );
};

export default ServiceList;
