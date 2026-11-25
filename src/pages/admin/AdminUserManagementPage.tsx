import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Mail,
  Phone
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import type { AdminUserItem } from '../../features/admin/adminData';
import { INITIAL_ADMIN_USERS } from '../../features/admin/adminData';

export const AdminUserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Customer' | 'Agent' | 'CA' | 'Franchise' | 'Coordinator'>('All');

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'All' ? true : u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u
      )
    );
  };

  const getRoleBadgeVariant = (role: AdminUserItem['role']) => {
    switch (role) {
      case 'Customer':
        return 'blue';
      case 'Agent':
        return 'green';
      case 'CA':
        return 'purple';
      case 'Franchise':
        return 'orange';
      case 'Coordinator':
        return 'red';
      default:
        return 'neutral';
    }
  };

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Platform User Management
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Central identity registry across all platform roles. Supervise account authorizations, role access, and status locks.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search User Registry"
              placeholder="Search by name, email, ID, or location..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem", flexWrap: 'wrap' }}>
            {(['All', 'Customer', 'Agent', 'CA', 'Franchise', 'Coordinator'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: roleFilter === role ? "0.0625rem solid #dc2626" : "0.0625rem solid #cbd5e1",
                  background: roleFilter === role ? "#fef2f2" : "var(--white)",
                  color: roleFilter === role ? "#dc2626" : "var(--muted)",
                  fontSize: "0.8125rem",
                  fontWeight: roleFilter === role ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {role}
              </button>
            ))}
          </Surface>
        </Surface>
      </Panel>

      {/* Users Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>User Identity &amp; ID</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Role</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Contact Details</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Location</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Member Since</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Status</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Governance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{u.name}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontFamily: 'monospace' }}>{u.id}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge label={u.role} variant={getRoleBadgeVariant(u.role)} />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.125rem", fontSize: "0.8125rem" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                        <Mail size={12} color="var(--muted)" /> {u.email}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem", color: "var(--muted)" }}>
                        <Phone size={12} color="var(--muted)" /> {u.phone}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {u.location}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {u.joinedDate}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge label={u.status} variant={u.status === 'Active' ? 'green' : 'red'} />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u.id)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.375rem",
                        border: u.status === 'Active' ? "0.0625rem solid #fecaca" : "0.0625rem solid #a7f3d0",
                        background: u.status === 'Active' ? "#fff1f2" : "#ecfdf5",
                        color: u.status === 'Active' ? "#dc2626" : "var(--teal)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
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

export default AdminUserManagementPage;
