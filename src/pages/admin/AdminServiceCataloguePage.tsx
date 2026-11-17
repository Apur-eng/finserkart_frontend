import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Clock,
  FolderKanban,
  Plus,
  Power
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_ADMIN_SERVICES,
  type AdminServiceItem
} from '../../features/admin/adminData';

export const AdminServiceCataloguePage: React.FC = () => {
  const [services, setServices] = useState<AdminServiceItem[]>(INITIAL_ADMIN_SERVICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // New Service Drawer / Form state
  const [isAdding, setIsAdding] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newCategory, setNewCategory] = useState('Company Registration');
  const [newPrice, setNewPrice] = useState('4999');
  const [newGovtFee, setNewGovtFee] = useState('1000');
  const [newCACommission, setNewCACommission] = useState('1500');
  const [newAgentCommission, setNewAgentCommission] = useState('800');
  const [newSLA, setNewSLA] = useState('5');

  const categories = ['All', 'Company Registration', 'Taxation', 'Compliance', 'Licensing'];

  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || srv.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleStatus = (id: string, name: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'Active' ? 'Inactive' : 'Active';
          setBannerMessage(`Service "${name}" status changed to ${nextStatus}.`);
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newService: AdminServiceItem = {
      id: `SRV-0${services.length + 1}`,
      name: newServiceName.trim(),
      category: newCategory,
      price: Number(newPrice) || 0,
      govtFee: Number(newGovtFee) || 0,
      caCommission: Number(newCACommission) || 0,
      agentCommission: Number(newAgentCommission) || 0,
      turnaroundDays: Number(newSLA) || 5,
      status: 'Active',
    };

    setServices([newService, ...services]);
    setBannerMessage(`Service "${newService.name}" created successfully and published.`);
    setIsAdding(false);
    setNewServiceName('');
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
            <FolderKanban size={16} /> Platform Product Management
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
            Service Catalogue & Pricing Management
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
            Manage offered financial compliance packages, statutory government fees, and partner commissions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '8px',
            background: '#dc2626',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> {isAdding ? 'Close Editor' : 'Create New Service'}
        </button>
      </div>

      {bannerMessage && (
        <Banner
          status="success"
          title="Catalogue Updated"
          description={bannerMessage}
        />
      )}

      {/* Creation Modal / Inline Form */}
      {isAdding && (
        <Card elevation="med" padding={5}>
          <form onSubmit={handleCreateService} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Configure New Platform Service
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Define commercial pricing, statutory costs, and partner payouts.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <TextInput
                label="Service Title"
                placeholder="e.g. LLP Registration & Agreement Filing"
                value={newServiceName}
                onChange={(val) => setNewServiceName(val)}
              />

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    background: '#ffffff',
                    color: '#0f172a',
                  }}
                >
                  <option value="Company Registration">Company Registration</option>
                  <option value="Taxation">Taxation</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Licensing">Licensing</option>
                </select>
              </div>

              <TextInput
                label="Commercial Price (₹)"
                placeholder="8999"
                value={newPrice}
                onChange={(val) => setNewPrice(val)}
              />

              <TextInput
                label="Government / Statutory Fee (₹)"
                placeholder="2000"
                value={newGovtFee}
                onChange={(val) => setNewGovtFee(val)}
              />

              <TextInput
                label="CA Commission Allocation (₹)"
                placeholder="2500"
                value={newCACommission}
                onChange={(val) => setNewCACommission(val)}
              />

              <TextInput
                label="Agent Commission Allocation (₹)"
                placeholder="1800"
                value={newAgentCommission}
                onChange={(val) => setNewAgentCommission(val)}
              />

              <TextInput
                label="SLA Target Turnaround (Days)"
                placeholder="7"
                value={newSLA}
                onChange={(val) => setNewSLA(val)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Publish Service to Platform
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? '1px solid #dc2626' : '1px solid #e2e8f0',
                  background: selectedCategory === cat ? '#fee2e2' : '#ffffff',
                  color: selectedCategory === cat ? '#991b1b' : '#64748b',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ width: '280px' }}>
            <TextInput
              label="Search Catalogue"
              placeholder="Filter by title or code..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </div>
        </div>
      </Card>

      {/* Services Table */}
      <Card elevation="low" padding={5}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Service Code</th>
                <th style={{ padding: '12px 16px' }}>Package Title</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Consumer Fee</th>
                <th style={{ padding: '12px 16px' }}>Govt Fee</th>
                <th style={{ padding: '12px 16px' }}>CA Payout</th>
                <th style={{ padding: '12px 16px' }}>Agent Payout</th>
                <th style={{ padding: '12px 16px' }}>Target SLA</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((srv) => (
                <tr key={srv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {srv.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {srv.name}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge label={srv.category} variant="blue" />
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    ₹{srv.price.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    ₹{srv.govtFee.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#7c3aed', fontWeight: 600 }}>
                    ₹{srv.caCommission.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#d97706', fontWeight: 600 }}>
                    ₹{srv.agentCommission.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="#64748b" /> {srv.turnaroundDays} Days
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      label={srv.status}
                      variant={srv.status === 'Active' ? 'green' : 'gray'}
                    />
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => toggleStatus(srv.id, srv.name)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: srv.status === 'Active' ? '1px solid #cbd5e1' : 'none',
                        background: srv.status === 'Active' ? '#ffffff' : '#0f172a',
                        color: srv.status === 'Active' ? '#475569' : '#ffffff',
                      }}
                    >
                      <Power size={13} /> {srv.status === 'Active' ? 'Deactivate' : 'Activate'}
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
