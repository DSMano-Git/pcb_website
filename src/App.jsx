import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BottomDock from './components/BottomDock';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductFeatures from './pages/ProductFeatures';
import OpenCircuitHub from './pages/OpenCircuitHub';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App" style={{ position: 'relative' }}>
        {/* Wrap content to ensure proper z-indexing */}
        <div style={{ position: 'relative', zIndex: 1, paddingLeft: '90px' }}>
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<ProductFeatures />} />
              <Route path="/hub" element={<OpenCircuitHub />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <BottomDock />
      </div>
    </Router>
  );
}

export default App;
