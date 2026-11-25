import { Row } from '../../components/ui';
import React from 'react';
import { LogOut, RefreshCw, Sparkles } from 'lucide-react';
import { useDemo } from './useDemo';
import { DemoRoleSwitcherModal } from './DemoRoleSwitcherModal';

export const DemoBanner: React.FC = () => {
  const { isDemoActive, currentRoleConfig, openSwitcher, exitDemo } = useDemo();

  if (!isDemoActive) return null;

  return (
    <>
      <div
        role="region"
        aria-label="Demo mode control bar"
        style={{
          background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
          color: '#f8fafc',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.5rem 1rem',
          position: 'relative',
          zIndex: 50,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          {/* Left indicator */}
          <Row gap={2} vAlign="center" wrap="wrap">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '9999px',
                padding: '2px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={12} aria-hidden="true" />
              Demo Mode — Sample Data
            </span>

            {currentRoleConfig && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#cbd5e1',
                  fontSize: '0.8125rem',
                }}
              >
                <span>Viewing as:</span>
                <strong style={{ color: '#ffffff' }}>{currentRoleConfig.name}</strong>
              </span>
            )}
          </Row>

          {/* Right actions */}
          <Row gap={2} vAlign="center">
            <button
              type="button"
              onClick={openSwitcher}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-small)',
                padding: '4px 12px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <RefreshCw size={14} aria-hidden="true" />
              Switch Demo Role
            </button>

            <button
              type="button"
              onClick={() => exitDemo('/explore-demo')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-small)',
                padding: '4px 12px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
            >
              <LogOut size={14} aria-hidden="true" />
              Exit Demo
            </button>
          </Row>
        </div>
      </div>
      <DemoRoleSwitcherModal />
    </>
  );
};

export default DemoBanner;
