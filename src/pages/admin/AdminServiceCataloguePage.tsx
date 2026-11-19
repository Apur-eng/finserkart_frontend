import { Surface } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-33)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
            <FolderKanban size={16} /> Platform Product Management
          </Surface>
          <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            Service Catalogue & Pricing Management
          </h1>
          <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            Manage offered financial compliance packages, statutory government fees, and partner commissions.
          </p>
        </Surface>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-12)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
            borderRadius: "var(--radius-fsk-37)",
            background: "var(--color-fsk-34)",
            color: "var(--color-fsk-38)",
            fontWeight: 600,
            fontSize: "var(--font-fsk-24)",
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> {isAdding ? 'Close Editor' : 'Create New Service'}
        </button>
      </Surface>

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
          <form onSubmit={handleCreateService} style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-2)" }}>
            <Surface>
              <h2 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                Configure New Platform Service
              </h2>
              <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
                Define commercial pricing, statutory costs, and partner payouts.
              </p>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <TextInput
                label="Service Title"
                placeholder="e.g. LLP Registration & Agreement Filing"
                value={newServiceName}
                onChange={(val) => setNewServiceName(val)}
              />

              <Surface>
                <label style={{ display: 'block', fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-25)", marginBottom: "var(--spacing-fsk-17)" }}>
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    height: "var(--spacing-fsk-76)",
                    padding: "0 var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                    fontSize: "var(--font-fsk-24)",
                    background: "var(--color-fsk-38)",
                    color: "var(--color-fsk-7)",
                  }}
                >
                  <option value="Company Registration">Company Registration</option>
                  <option value="Taxation">Taxation</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Licensing">Licensing</option>
                </select>
              </Surface>

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
            </Surface>

            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", justifyContent: 'flex-end', marginTop: "var(--spacing-fsk-8)" }}>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{
                  padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
                  borderRadius: "var(--radius-fsk-37)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: "var(--color-fsk-38)",
                  color: "var(--color-fsk-18)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-24)",
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
                  borderRadius: "var(--radius-fsk-37)",
                  border: 'none',
                  background: "var(--color-fsk-34)",
                  color: "var(--color-fsk-38)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-24)",
                  cursor: 'pointer',
                }}
              >
                Publish Service to Platform
              </button>
            </Surface>
          </form>
        </Card>
      )}

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4}>
        <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-5)", alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-77)",
                  fontSize: "var(--font-fsk-14)",
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === cat ? "var(--spacing-fsk-22) solid var(--color-fsk-34)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                  background: selectedCategory === cat ? "var(--color-fsk-43)" : "var(--color-fsk-38)",
                  color: selectedCategory === cat ? "var(--color-fsk-44)" : "var(--color-fsk-9)",
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </Surface>

          <Surface style={{ width: "var(--spacing-fsk-45)" }}>
            <TextInput
              label="Search Catalogue"
              placeholder="Filter by title or code..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </Surface>
        </Surface>
      </Card>

      {/* Services Table */}
      <Card elevation="low" padding={5}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Service Code</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Package Title</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Category</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Consumer Fee</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Govt Fee</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>CA Payout</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Agent Payout</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Target SLA</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)", textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((srv) => (
                <tr key={srv.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {srv.id}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {srv.name}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
                    <Badge label={srv.category} variant="blue" />
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    ₹{srv.price.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    ₹{srv.govtFee.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-41)", fontWeight: 600 }}>
                    ₹{srv.caCommission.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-54)", fontWeight: 600 }}>
                    ₹{srv.agentCommission.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-7)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                      <Clock size={13} color="var(--color-fsk-9)" /> {srv.turnaroundDays} Days
                    </Surface>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
                    <Badge
                      label={srv.status}
                      variant={srv.status === 'Active' ? 'green' : 'gray'}
                    />
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => toggleStatus(srv.id, srv.name)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "var(--spacing-fsk-17)",
                        padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                        borderRadius: "var(--radius-fsk-42)",
                        fontSize: "var(--font-fsk-14)",
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: srv.status === 'Active' ? "var(--spacing-fsk-22) solid var(--color-fsk-59)" : 'none',
                        background: srv.status === 'Active' ? "var(--color-fsk-38)" : "var(--color-fsk-7)",
                        color: srv.status === 'Active' ? "var(--color-fsk-18)" : "var(--color-fsk-38)",
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
      </Card>
    </Surface>
  );
};
