import { Surface, Inline } from '../../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { Spinner } from '@astryxdesign/core/Spinner';
import { TextInput } from '@astryxdesign/core/TextInput';
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
      <Surface style={{ maxWidth: "var(--spacing-fsk-151)", margin: "0 auto var(--spacing-fsk-122) auto" }}>
        <TextInput
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
        <Surface style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "var(--spacing-fsk-13) 0", gap: "var(--spacing-fsk-5)" }}>
          <Spinner />
          <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)" }}>Loading verified financial services...</Inline>
        </Surface>
      )}

      {/* Error State */}
      {isError && (
        <Surface style={{ padding: "var(--spacing-fsk-114)", textAlign: 'center', background: "var(--color-fsk-51)", border: "var(--spacing-fsk-22) solid var(--color-fsk-43)", borderRadius: "var(--radius-fsk-28)", maxWidth: "var(--spacing-fsk-106)", margin: '0 auto' }}>
          <h3 style={{ color: "var(--color-fsk-44)", marginBottom: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-30)" }}>Failed to retrieve services</h3>
          <p style={{ color: "var(--color-fsk-60)", fontSize: "var(--font-fsk-24)", marginBottom: "var(--spacing-fsk-5)" }}>
            We could not fetch data from the backend. Please check your network connection and try again.
          </p>
          <Button label="Retry Connection" variant="secondary" onClick={() => refetch()} />
        </Surface>
      )}

      {/* Empty State */}
      {!isLoading && !isError && displayedServices && displayedServices.length === 0 && (
        <Surface style={{ padding: "var(--spacing-fsk-4) var(--spacing-fsk-5)" }}>
          <EmptyState
            title="No services found"
            description={`No services matched "${debouncedSearch}". Please try searching with a different term like "GST", "ITR", "Company", or "Audit".`}
            icon={<Search size={40} color="var(--color-fsk-57)" />}
            actions={
              <Button
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
            gap: "var(--spacing-fsk-20)",
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
