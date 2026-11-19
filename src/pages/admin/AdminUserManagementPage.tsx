import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Platform User Management
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Central identity registry across all platform roles. Supervise account authorizations, role access, and status locks.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search User Registry"
              placeholder="Search by name, email, ID, or location..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", flexWrap: 'wrap' }}>
            {(['All', 'Customer', 'Agent', 'CA', 'Franchise', 'Coordinator'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: roleFilter === role ? "var(--spacing-fsk-22) solid var(--color-fsk-34)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: roleFilter === role ? "var(--color-fsk-51)" : "var(--color-fsk-38)",
                  color: roleFilter === role ? "var(--color-fsk-34)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
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
      </Card>

      {/* Users Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>User Identity &amp; ID</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Role</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Contact Details</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Location</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Member Since</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Governance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{u.name}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontFamily: 'monospace' }}>{u.id}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge label={u.role} variant={getRoleBadgeVariant(u.role)} />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-47)", fontSize: "var(--font-fsk-14)" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                        <Mail size={12} color="var(--color-fsk-9)" /> {u.email}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)", color: "var(--color-fsk-9)" }}>
                        <Phone size={12} color="var(--color-fsk-9)" /> {u.phone}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {u.location}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
                    {u.joinedDate}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge label={u.status} variant={u.status === 'Active' ? 'green' : 'red'} />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u.id)}
                      style={{
                        padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                        borderRadius: "var(--radius-fsk-42)",
                        border: u.status === 'Active' ? "var(--spacing-fsk-22) solid var(--color-fsk-58)" : "var(--spacing-fsk-22) solid var(--color-fsk-81)",
                        background: u.status === 'Active' ? "var(--color-fsk-80)" : "var(--color-fsk-64)",
                        color: u.status === 'Active' ? "var(--color-fsk-34)" : "var(--color-fsk-65)",
                        fontSize: "var(--font-fsk-14)",
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
      </Card>
    </Surface>
  );
};

export default AdminUserManagementPage;
