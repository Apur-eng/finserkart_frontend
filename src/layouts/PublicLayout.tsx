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
      <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppShell>
  );
};

export default PublicLayout;
