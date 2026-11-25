import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { LenisProvider } from '../motion';
export function PublicLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView?.();
    } else {
      document.documentElement.scrollTop = 0;
    }
  }, [pathname, hash]);

  return (
    <LenisProvider>
      <div className="public-site">
        <Navbar />
        <main id="public-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
export default PublicLayout;
