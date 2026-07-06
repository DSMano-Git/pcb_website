import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MessageCircle, Mail, ArrowRight, ChevronUp, Check } from 'lucide-react';

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
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
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
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10,
      transition: 'background-color 0.4s ease, border-color 0.4s ease'
    }}>
      <style>{`
        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 6rem 2.5rem 3rem;
          position: relative;
          z-index: 2;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .footer-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 320px;
          margin: 0;
        }
        .footer-col-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .footer-link {
          color: var(--text-secondary);
          font-size: 0.95rem;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          width: fit-content;
          font-weight: 500;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1.5px;
          bottom: -2px;
          left: 0;
          background-color: var(--accent);
          transition: width 0.3s ease;
        }
        .footer-link:hover {
          color: var(--text-primary);
        }
        .footer-link:hover::after {
          width: 100%;
        }
        .social-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .social-btn:hover {
          color: var(--bg-primary);
          background: var(--accent);
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px var(--accent-glow);
        }
        .newsletter-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
        }
        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          width: 100%;
          position: relative;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .newsletter-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .newsletter-btn {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--accent);
          color: var(--bg-primary);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 12px var(--accent-glow);
        }
        .newsletter-btn:hover {
          background: var(--accent-light);
          transform: scale(1.03);
        }
        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent);
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: statusPulse 2s infinite;
        }
        .back-to-top-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .back-to-top-btn:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px var(--accent-glow);
        }
        @keyframes statusPulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-bottom: 3.5rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .newsletter-form {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Premium subtle grid pattern */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)', 
        backgroundSize: '40px 40px', 
        zIndex: 0, 
        pointerEvents: 'none', 
        opacity: 0.6 
      }} />

      {/* Soft top glow matching custom accent */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '70%', 
        height: '140px', 
        background: 'radial-gradient(ellipse at top, var(--accent-glow) 0%, transparent 70%)', 
        pointerEvents: 'none',
        opacity: 0.7
      }} />

      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', width: 'fit-content' }}>
              <motion.div 
                whileHover={{ rotate: 90 }} 
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, var(--accent) 0%, #047857 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 0 20px var(--accent-glow)' 
                }}
              >
                <Cpu color="var(--bg-primary)" size={22} />
              </motion.div>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                BoltzPCB
              </span>
            </Link>
            <p className="footer-desc">
              Next-generation interactive design platform for professional hardware engineering and electronics visualization.
            </p>
            <div className="social-row">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Discord">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/features" className="footer-link">Features</Link>
              </li>
              <li>
                <Link to="/hub" className="footer-link">Open Circuit Hub</Link>
              </li>
            </ul>
          </div>


          {/* Column 4: Newsletter */}
          <div className="footer-col">
            <h3 className="footer-col-title">Stay Connected</h3>
            <p className="newsletter-desc">
              Subscribe to get the latest updates on releases and feature rollouts.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={20} />
              </button>
            </form>
            <AnimatePresence>
              {subscribed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="newsletter-success"
                >
                  <Check size={16} /> Subscribed successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom footer bar */}
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, fontWeight: 500, letterSpacing: '0.02em' }}>
            &copy; {new Date().getFullYear()} BoltzPCB. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <motion.button 
              onClick={scrollToTop} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="back-to-top-btn" 
              aria-label="Back to top"
            >
              <ChevronUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
