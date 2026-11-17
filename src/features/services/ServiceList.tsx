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
    <div style={{ width: '100%' }}>
      {/* Search Bar */}
      <div style={{ maxWidth: '480px', margin: '0 auto 36px auto' }}>
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
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', gap: '16px' }}>
          <Spinner />
          <span style={{ color: '#64748b', fontSize: '14px' }}>Loading verified financial services...</span>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div style={{ padding: '32px', textAlign: 'center', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ color: '#991b1b', marginBottom: '8px', fontSize: '18px' }}>Failed to retrieve services</h3>
          <p style={{ color: '#b91c1c', fontSize: '14px', marginBottom: '16px' }}>
            We could not fetch data from the backend. Please check your network connection and try again.
          </p>
          <Button label="Retry Connection" variant="secondary" onClick={() => refetch()} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && displayedServices && displayedServices.length === 0 && (
        <div style={{ padding: '48px 16px' }}>
          <EmptyState
            title="No services found"
            description={`No services matched "${debouncedSearch}". Please try searching with a different term like "GST", "ITR", "Company", or "Audit".`}
            icon={<Search size={40} color="#94a3b8" />}
            actions={
              <Button
                label="Clear Search"
                variant="secondary"
                onClick={() => setSearchTerm('')}
              />
            }
          />
        </div>
      )}

      {/* Services Grid */}
      {!isLoading && !isError && displayedServices && displayedServices.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {displayedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
