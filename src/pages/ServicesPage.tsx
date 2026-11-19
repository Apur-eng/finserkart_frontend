import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import React from 'react';
import ServiceList from '../features/services/ServiceList';

export const ServicesPage: React.FC = () => {
  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto', padding: "var(--spacing-fsk-1) var(--spacing-fsk-2) var(--spacing-fsk-3) var(--spacing-fsk-2)" }}>
      {/* Header Banner */}
      <Surface style={{ textAlign: 'center', marginBottom: "var(--spacing-fsk-4)", paddingTop: "var(--spacing-fsk-5)" }}>
        <Badge label="Complete Service Catalogue" variant="blue" />
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-6)", fontWeight: 800, color: "var(--color-fsk-7)", display: 'block', marginTop: "var(--spacing-fsk-8)" }}>
            Financial & Compliance Services
          </Inline>
        </Heading>
        <Text type="supporting">
          <Inline style={{ fontSize: "var(--font-fsk-10)", color: "var(--color-fsk-9)", maxWidth: "var(--spacing-fsk-11)", display: 'inline-block', marginTop: "var(--spacing-fsk-12)" }}>
            Transparent pricing, clear document checklists, and verified chartered accountant support. Search our verified service catalog below.
          </Inline>
        </Text>
      </Surface>

      {/* Main Service List with search and cards */}
      <ServiceList />
    </Surface>
  );
};

export default ServicesPage;

