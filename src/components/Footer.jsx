import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: '4rem 2rem 8rem', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
        
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '0.75rem' }}>
            <Cpu color="var(--accent)" size={22} />
            <span className="text-gradient">BoltzPCB</span>
          </Link>
          <p style={{ fontSize: '0.85rem' }}>
            Design, verify, and manufacture — without ever leaving Boltzpcb.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>GitHub</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Twitter</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>LinkedIn</a>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: '600' }}>Product</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/features" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>AI Design System</Link></li>
            <li><Link to="/features" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>SI & Thermal Simulators</Link></li>
            <li><Link to="/features" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manufacturing</Link></li>
            <li><Link to="/hub" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Open Circuit Hub</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: '600' }}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Documentation</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Tutorials</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Blog</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>FAQ</a></li>
          </ul>
        </div>

        <div>
          {/* <h4 style={{ marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: '600' }}>Get Started</h4>
          <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Join engineers building smarter PCBs.</p>
          <Link to="/features" className="btn btn-primary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem 1rem' }}>Start Creating Now</Link> */}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <p>&copy; {new Date().getFullYear()} BoltzPCB. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
