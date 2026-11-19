import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceRecord } from '../api/types';
import { formatCurrency, parseDocuments } from '../utils/formatters';
import { StatusTag } from './StatusTag';

export function ServiceCard({ service }: { service: ServiceRecord }) {
  const documents = parseDocuments(service.required_documents);
  const govtFee = parseFloat(service.govt_fees || '0');
  const fallback = '/services/service-1.jpg';
  const imageUrl = service.service_image ? `/services/${service.service_image}` : fallback;
  return <Card elevation="low" padding={0} style={{ height: '100%', overflow: 'hidden' }}>
    <VStack gap={0} height="100%">
      <img src={imageUrl} alt={service.service_name} loading="lazy"
        onError={(event) => { if (!event.currentTarget.src.endsWith(fallback)) event.currentTarget.src = fallback; }}
        style={{ width: '100%', aspectRatio: '16 / 7', objectFit: 'cover', background: 'var(--color-background-muted)' }} />
      <VStack padding={5} gap={4} style={{ flex: 1 }}>
        <HStack><StatusTag label="Verified Service" variant="green" /></HStack>
        <Heading level={3}>{service.service_name}</Heading>
        <HStack gap={2} vAlign="center"><FileText aria-hidden="true" color="var(--color-accent)" />
          <Text type="supporting">{documents.length} Required Documents</Text>
        </HStack>
        <VStack gap={1}>
          {documents.slice(0, 2).map((doc, index) => <Text key={index} type="supporting">{doc}</Text>)}
          {documents.length > 2 && <Text type="supporting">+{documents.length - 2} more documents...</Text>}
        </VStack>
        <VStack gap={3} style={{ marginTop: 'auto', paddingTop: 'var(--spacing-4)', borderTop: 'thin solid var(--color-background-muted)' }}>
          <HStack hAlign="between" vAlign="end" wrap="wrap" gap={2}>
            <VStack gap={1}><Text type="supporting">Total Fee</Text><Text size="2xl" weight="bold" hasTabularNumbers>{formatCurrency(service.total_amt)}</Text></VStack>
            {govtFee > 0 && <Text type="supporting">Govt: {formatCurrency(govtFee)}</Text>}
          </HStack>
          <Link to={`/services/${service.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 'var(--spacing-3)', borderRadius: 'var(--radius-element)', background: 'var(--color-fsk-info-subtle)',
            color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
            View Details &amp; Apply <ArrowUpRight aria-hidden="true" />
          </Link>
        </VStack>
      </VStack>
    </VStack>
  </Card>;
}
export default ServiceCard;
