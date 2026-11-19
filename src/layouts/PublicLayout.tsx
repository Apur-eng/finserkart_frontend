import { Surface } from '../components/Surface';
import { AppShell } from '@astryxdesign/core/AppShell';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const PublicLayout: React.FC = () => {
  return (
    <AppShell
      height="auto"
      variant="surface"
      topNav={<Navbar />}
      contentPadding={0}
    >
      <Surface style={{ minHeight: "calc(100vh - var(--spacing-fsk-144))", display: 'flex', flexDirection: 'column' }}>
        <main id="public-content" tabIndex={-1} style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
        <Footer />
      </Surface>
    </AppShell>
  );
};

export default PublicLayout;
