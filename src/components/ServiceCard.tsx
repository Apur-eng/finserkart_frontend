import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ServiceRecord } from '../api/types';
import { formatCurrency, parseDocuments } from '../utils/formatters';

interface ServiceCardProps {
  service: ServiceRecord;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const documents = parseDocuments(service.required_documents);
  const govtFee = parseFloat(service.govt_fees || '0');

  const imageUrl = service.service_image
    ? `/services/${service.service_image}`
    : '/services/service-1.jpg';

  return (
    <Card elevation="low" padding={0}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {/* Service Image Banner */}
        <div style={{ position: 'relative', height: '180px', width: '100%', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
          <img
            src={imageUrl}
            alt={service.service_name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/services/service-1.jpg';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '4px 10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Badge label="Verified Service" variant="green" />
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <VStack gap={2}>
            <Heading level={4}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                {service.service_name}
              </span>
            </Heading>

            {/* Document Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
              <FileText size={15} color="#0066cc" />
              <span>{documents.length} Required Documents</span>
            </div>

            {/* Document preview bullets (first 2) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {documents.slice(0, 2).map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: '#475569' }}>
                  <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc}</span>
                </div>
              ))}
              {documents.length > 2 && (
                <span style={{ fontSize: '11px', color: '#94a3b8', paddingLeft: '19px' }}>
                  +{documents.length - 2} more documents...
                </span>
              )}
            </div>
          </VStack>

          {/* Pricing & CTA */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' }}>
              <div>
                <Text type="supporting">
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Total Fee</span>
                </Text>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0052a3' }}>
                  {formatCurrency(service.total_amt)}
                </div>
              </div>

              {govtFee > 0 && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Govt: {formatCurrency(govtFee)}
                  </span>
                </div>
              )}
            </div>

            <Button
              label="View Details & Apply"
              variant="primary"
              size="sm"
              width="100%"
              endContent={<ArrowRight size={14} style={{ marginLeft: '4px' }} />}
              onClick={() => navigate(`/services/${service.id}`)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;

