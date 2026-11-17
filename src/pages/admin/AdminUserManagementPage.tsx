import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Platform User Management
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Central identity registry across all platform roles. Supervise account authorizations, role access, and status locks.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search User Registry"
              placeholder="Search by name, email, ID, or location..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['All', 'Customer', 'Agent', 'CA', 'Franchise', 'Coordinator'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: roleFilter === role ? '1px solid #dc2626' : '1px solid #cbd5e1',
                  background: roleFilter === role ? '#fef2f2' : '#ffffff',
                  color: roleFilter === role ? '#dc2626' : '#475569',
                  fontSize: '13px',
                  fontWeight: roleFilter === role ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>User Identity &amp; ID</th>
                <th style={{ padding: '14px 18px' }}>Role</th>
                <th style={{ padding: '14px 18px' }}>Contact Details</th>
                <th style={{ padding: '14px 18px' }}>Location</th>
                <th style={{ padding: '14px 18px' }}>Member Since</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Governance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>{u.id}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge label={u.role} variant={getRoleBadgeVariant(u.role)} />
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12.5px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} color="#64748b" /> {u.email}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        <Phone size={12} color="#64748b" /> {u.phone}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {u.location}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12px' }}>
                    {u.joinedDate}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge label={u.status} variant={u.status === 'Active' ? 'green' : 'red'} />
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: u.status === 'Active' ? '1px solid #fecaca' : '1px solid #a7f3d0',
                        background: u.status === 'Active' ? '#fff1f2' : '#ecfdf5',
                        color: u.status === 'Active' ? '#dc2626' : '#059669',
                        fontSize: '12px',
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
        </div>
      </Card>
    </div>
  );
};

export default AdminUserManagementPage;
