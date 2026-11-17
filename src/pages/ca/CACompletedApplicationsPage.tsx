import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Download,
  Star
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { INITIAL_CA_COMPLETED_APPLICATIONS } from '../../features/ca/caData';

export const CACompletedApplicationsPage: React.FC = () => {
  const completed = INITIAL_CA_COMPLETED_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return completed.filter((c) => {
      return (
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [completed, searchQuery]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Completed Filings Archive
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Historical archive of approved regulatory filings, client handovers, and performance ratings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ maxWidth: '420px' }}>
          <TextInput
            label="Search Archive"
            placeholder="Search completed archive by ID, service, or client..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </div>
      </Card>

      {/* Completed Applications Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Application ID &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Timeline</th>
                <th style={{ padding: '14px 18px' }}>CA Fee</th>
                <th style={{ padding: '14px 18px' }}>Client Rating</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                    <div style={{ fontSize: '11.5px', color: '#059669', fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{app.businessName}</div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12.5px' }}>
                    <div>Assigned: {app.assignedDate}</div>
                    <div style={{ color: '#059669', fontWeight: 600 }}>Completed: {app.deadline}</div>
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a' }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: 700 }}>
                      <Star size={14} fill="#d97706" /> 5.0 / 5.0
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge label="Completed &amp; Released" variant="green" />
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      title="Download Archived Handover"
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        cursor: 'pointer',
                        color: '#475569',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Download size={13} /> Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CACompletedApplicationsPage;
