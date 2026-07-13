import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, ChevronUp, Check, Cpu, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Github = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = memo(() => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      window.location.href = `mailto:contact@boltzpcb.com?subject=Newsletter Subscription&body=Please add ${email} to the mailing list.`;
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      position: 'relative', 
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      borderTop: '1px solid var(--border-color)',
      boxShadow: 'inset 0 1px 0 var(--border-highlight)',
      overflow: 'hidden',
      zIndex: 10,
    }}>
      <style>{`
        .footer-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 6rem 2rem 2rem;
          position: relative;
          z-index: 2;
        }
        .footer-top-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 4rem;
          margin-bottom: 6rem;
        }
        .footer-brand-section {
          flex: 1;
          min-width: 300px;
          max-width: 450px;
        }
        .footer-brand-name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .footer-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .footer-socials {
          display: flex;
          gap: 1rem;
        }
        .social-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(128, 128, 128, 0.05);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          cursor: pointer;
        }
        .social-circle:hover {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent-light);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 10px 30px var(--accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        .footer-links-container {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }
        .footer-link-group {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          min-width: 150px;
        }
        .footer-link-title {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .footer-link {
          color: var(--text-secondary);
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          font-weight: 500;
        }
        .footer-link:hover {
          color: var(--accent-light);
          transform: translateX(4px);
          text-shadow: 0 0 20px var(--accent-glow);
        }
        .footer-newsletter {
          background: rgba(128, 128, 128, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 2.5rem;
          flex: 1;
          min-width: 300px;
          max-width: 450px;
          position: relative;
          overflow: hidden;
        }
        .footer-newsletter::before {
          content: '';
          position: absolute;
          top: 0; right: 0; width: 150px; height: 150px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          transform: translate(30%, -30%);
          pointer-events: none;
        }
        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .newsletter-input {
          flex: 1;
          padding: 1rem 1.25rem;
          border-radius: 16px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .newsletter-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }
        .newsletter-btn {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: var(--accent);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          flex-shrink: 0;
        }
        .newsletter-btn:hover {
          background: var(--accent-light);
          transform: scale(1.05);
          box-shadow: 0 10px 20px var(--accent-glow);
        }
        .footer-bottom-bar {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
        }
        .back-to-top:hover {
          color: var(--accent);
        }
        .back-to-top-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .footer-top-content { flex-direction: column; gap: 3rem; }
          .footer-brand-section, .footer-newsletter { max-width: 100%; }
        }
        @media (max-width: 768px) {
          .footer-wrapper { padding: 4rem 1.5rem 2rem; }
          .footer-links-container { flex-direction: column; gap: 2.5rem; }
          .footer-bottom-bar { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .footer-brand-name { font-size: 2.2rem; }
        }
      `}</style>

      {/* Background Decor */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '500px', background: 'radial-gradient(circle at bottom center, var(--accent-glow) 0%, transparent 70%)', pointerEvents: 'none', opacity: 0.5 }} />

      <div className="footer-wrapper">
        <div className="footer-top-content">
          
          <div className="footer-brand-section">
            <div className="footer-brand-name">
              <img src={theme === 'light' ? '/lightmodelogo.png' : '/darkmodelogo.png'} alt="BoltzPCB" style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="footer-desc">
              Next-generation interactive design platform for professional hardware engineering and electronics visualization. Elevating PCB layout to an art form.
            </p>
          </div>

          <div className="footer-links-container">
            <div className="footer-link-group">
              <span className="footer-link-title">Platform</span>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/features" className="footer-link">Features</Link>
              <Link to="/hub" className="footer-link">Open Circuit Hub</Link>
            </div>
            {/* <div className="footer-link-group">
              <span className="footer-link-title">Legal</span>
              <Link to="#" className="footer-link">Privacy Policy</Link>
              <Link to="#" className="footer-link">Terms of Service</Link>
              <Link to="#" className="footer-link">Cookie Policy</Link>
            </div> */}
            <div className="footer-link-group">
              <span className="footer-link-title">Connect</span>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ gap: '0.5rem' }}>
                <Twitter size={16} /> Twitter
              </a> */}
              <a href="https://app.boltzpcb.com/auth" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ gap: '0.5rem' }}>
                Platform
              </a>
            </div>
          </div>

          <div className="footer-contact-block" style={{ flex: 1, minWidth: '300px', maxWidth: '350px' }}>
            <span className="footer-link-title" style={{ display: 'block', marginBottom: '1.5rem' }}>Contact</span>
            
            <a href="mailto:contact@boltzpcb.com" style={{ display: 'block', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              contact@boltzpcb.com
            </a>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              B Block, Asian Sun City, 309,<br />
              Forest Dept Colony, Kondapur,<br />
              Hyderabad, Telangana 500084
            </p>

            <a href="tel:+919498866488" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '1.1rem', textDecoration: 'none' }}>
              +91 9498866488
            </a>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} BoltzPCB Platform. All rights reserved.
          </p>
          <button onClick={scrollToTop} className="back-to-top">
            BACK TO TOP
            <div className="back-to-top-icon">
              <ChevronUp size={18} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
