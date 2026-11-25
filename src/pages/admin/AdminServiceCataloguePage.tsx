import { Notice, Panel, Field } from '../../components/ui';
import { Surface } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "85rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: "1rem" }}>
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
            <FolderKanban size={16} /> Platform Product Management
          </Surface>
          <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
            Service Catalogue & Pricing Management
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
            Manage offered financial compliance packages, statutory government fees, and partner commissions.
          </p>
        </Surface>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.5rem",
            padding: "0.625rem 1.125rem",
            borderRadius: "0.5rem",
            background: "#dc2626",
            color: "var(--white)",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> {isAdding ? 'Close Editor' : 'Create New Service'}
        </button>
      </Surface>

      {bannerMessage && (
        <Notice
          status="success"
          title="Catalogue Updated"
          description={bannerMessage}
        />
      )}

      {/* Creation Modal / Inline Form */}
      {isAdding && (
        <Panel elevation="med" padding={5}>
          <form onSubmit={handleCreateService} style={{ display: 'flex', flexDirection: 'column', gap: "1.25rem" }}>
            <Surface>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                Configure New Platform Service
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
                Define commercial pricing, statutory costs, and partner payouts.
              </p>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem" }}>
              <Field
                label="Service Title"
                placeholder="e.g. LLP Registration & Agreement Filing"
                value={newServiceName}
                onChange={(val) => setNewServiceName(val)}
              />

              <Surface>
                <label style={{ display: 'block', fontSize: "0.8125rem", fontWeight: 600, color: "#334155", marginBottom: "0.375rem" }}>
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    height: "2.625rem",
                    padding: "0 0.75rem",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid #cbd5e1",
                    fontSize: "0.875rem",
                    background: "var(--white)",
                    color: "var(--navy)",
                  }}
                >
                  <option value="Company Registration">Company Registration</option>
                  <option value="Taxation">Taxation</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Licensing">Licensing</option>
                </select>
              </Surface>

              <Field
                label="Commercial Price (₹)"
                placeholder="8999"
                value={newPrice}
                onChange={(val) => setNewPrice(val)}
              />

              <Field
                label="Government / Statutory Fee (₹)"
                placeholder="2000"
                value={newGovtFee}
                onChange={(val) => setNewGovtFee(val)}
              />

              <Field
                label="CA Commission Allocation (₹)"
                placeholder="2500"
                value={newCACommission}
                onChange={(val) => setNewCACommission(val)}
              />

              <Field
                label="Agent Commission Allocation (₹)"
                placeholder="1800"
                value={newAgentCommission}
                onChange={(val) => setNewAgentCommission(val)}
              />

              <Field
                label="SLA Target Turnaround (Days)"
                placeholder="7"
                value={newSLA}
                onChange={(val) => setNewSLA(val)}
              />
            </Surface>

            <Surface style={{ display: 'flex', gap: "0.75rem", justifyContent: 'flex-end', marginTop: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{
                  padding: "0.625rem 1.125rem",
                  borderRadius: "0.5rem",
                  border: "0.0625rem solid #cbd5e1",
                  background: "var(--white)",
                  color: "var(--muted)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "0.625rem 1.125rem",
                  borderRadius: "0.5rem",
                  border: 'none',
                  background: "#dc2626",
                  color: "var(--white)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: 'pointer',
                }}
              >
                Publish Service to Platform
              </button>
            </Surface>
          </form>
        </Panel>
      )}

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4}>
        <Surface style={{ display: 'flex', gap: "1rem", alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Surface style={{ display: 'flex', gap: "0.5rem", flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "62.4375rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? "0.0625rem solid #dc2626" : "0.0625rem solid #e2e8f0",
                  background: selectedCategory === cat ? "#fee2e2" : "var(--white)",
                  color: selectedCategory === cat ? "#991b1b" : "var(--muted)",
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </Surface>

          <Surface style={{ width: "17.5rem" }}>
            <Field
              label="Search Catalogue"
              placeholder="Filter by title or code..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </Surface>
        </Surface>
      </Panel>

      {/* Services Table */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600 }}>
                <th style={{ padding: "0.75rem 1rem" }}>Service Code</th>
                <th style={{ padding: "0.75rem 1rem" }}>Package Title</th>
                <th style={{ padding: "0.75rem 1rem" }}>Category</th>
                <th style={{ padding: "0.75rem 1rem" }}>Consumer Fee</th>
                <th style={{ padding: "0.75rem 1rem" }}>Govt Fee</th>
                <th style={{ padding: "0.75rem 1rem" }}>CA Payout</th>
                <th style={{ padding: "0.75rem 1rem" }}>Agent Payout</th>
                <th style={{ padding: "0.75rem 1rem" }}>Target SLA</th>
                <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((srv) => (
                <tr key={srv.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    {srv.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {srv.name}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Badge label={srv.category} variant="blue" />
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    ₹{srv.price.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    ₹{srv.govtFee.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#7c3aed", fontWeight: 600 }}>
                    ₹{srv.caCommission.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#d97706", fontWeight: 600 }}>
                    ₹{srv.agentCommission.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--navy)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                      <Clock size={13} color="var(--muted)" /> {srv.turnaroundDays} Days
                    </Surface>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Badge
                      label={srv.status}
                      variant={srv.status === 'Active' ? 'green' : 'gray'}
                    />
                  </td>
                  <td style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => toggleStatus(srv.id, srv.name)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "0.375rem",
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: srv.status === 'Active' ? "0.0625rem solid #cbd5e1" : 'none',
                        background: srv.status === 'Active' ? "var(--white)" : "var(--navy)",
                        color: srv.status === 'Active' ? "var(--muted)" : "var(--white)",
                      }}
                    >
                      <Power size={13} /> {srv.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Panel>
    </Surface>
  );
};
