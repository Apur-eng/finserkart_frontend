import { Badge } from '@astryxdesign/core/Badge';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import React from 'react';
import ServiceList from '../features/services/ServiceList';

export const ServicesPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '16px' }}>
        <Badge label="Complete Service Catalogue" variant="blue" />
        <Heading level={1}>
          <span style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '12px' }}>
            Financial & Compliance Services
          </span>
        </Heading>
        <Text type="supporting">
          <span style={{ fontSize: '16px', color: '#64748b', maxWidth: '640px', display: 'inline-block', marginTop: '8px' }}>
            Transparent pricing, clear document checklists, and verified chartered accountant support. Search our verified service catalog below.
          </span>
        </Text>
      </div>

      {/* Main Service List with search and cards */}
      <ServiceList />
    </div>
  );
};

export default ServicesPage;

