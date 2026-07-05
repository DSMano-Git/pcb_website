import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Open Circuit Hub', path: '/hub' },
  ];

  return (
    <motion.nav 
      initial={{ y: 100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        top: 'auto',
        left: '50%',
        zIndex: 100,
        padding: '0.5rem 0.5rem 0.5rem 1.5rem',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'var(--navbar-bg-scrolled)' : 'var(--navbar-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--navbar-border)',
        boxShadow: scrolled ? 'var(--navbar-shadow-scrolled)' : 'var(--navbar-shadow)',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', textDecoration: 'none' }}>
        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
          <Cpu color="var(--accent)" size={20} />
        </motion.div>
        <span style={{ letterSpacing: '-0.02em' }}>Boltzmann</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', position: 'relative', marginRight: '0.5rem' }}>
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path && link.path !== '#';
            return (
              <Link 
                key={i} 
                to={link.path} 
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.85rem',
                  padding: '0.4rem 0.8rem',
                  textDecoration: 'none',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'color 0.2s'
                }}
              >
                {hoveredLink === i && (
                  <motion.div
                    layoutId="hover-nav-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--nav-pill-bg)',
                      borderRadius: '999px',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            padding: '0.5rem',
            marginRight: '0.75rem',
          }}
        >
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <Moon size={18} />
              </motion.div>
            ) : (
              <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <Sun size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/features" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', boxShadow: 'var(--btn-shadow)' }}>
            Get Started
          </Link>
        </motion.div> */}
      </div>
    </motion.nav>
  );
};

export default Navbar;
