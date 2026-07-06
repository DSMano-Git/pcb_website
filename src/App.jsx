import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

// Lazy-load pages — each page + its 3D background only loads when navigated to
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProductFeatures = lazy(() => import('./pages/ProductFeatures'));
const OpenCircuitHub = lazy(() => import('./pages/OpenCircuitHub'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Minimal loading fallback
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
    <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="main-content-wrapper" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100%' }}>
          <main style={{ width: '100%', position: 'relative', flex: 1 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/features" element={<ProductFeatures />} />
                <Route path="/hub" element={<OpenCircuitHub />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
