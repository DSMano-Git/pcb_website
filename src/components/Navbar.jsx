import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import AnimatedHomeIcon from './icons/AnimatedHomeIcon';
import AnimatedLayersIcon from './icons/AnimatedLayersIcon';
import AnimatedBoxIcon from './icons/AnimatedBoxIcon';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: AnimatedHomeIcon },
    { name: 'Features', path: '/features', icon: AnimatedLayersIcon },
    { name: 'Hub', path: '/hub', icon: AnimatedBoxIcon },
  ];

  const NavItem = ({ link, isActive }) => {
    const iconRef = React.useRef(null);
    return (
      <Link 
        to={link.path}
        style={{
          textDecoration: 'none',
          color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
          fontWeight: '600',
          fontSize: '0.95rem',
          position: 'relative',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 1,
          transition: 'color 0.3s'
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = isActive ? 'var(--bg-primary)' : 'var(--text-secondary)';
        }}
        onClick={() => {
          if (iconRef.current?.startAnimation) {
            iconRef.current.startAnimation();
            setTimeout(() => {
              if (iconRef.current?.stopAnimation) iconRef.current.stopAnimation();
            }, 600); // Stop after the animation completes
          }
        }}
      >
        {isActive && (
          <motion.div
            layoutId="navbar-pill"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--text-primary)',
              borderRadius: '999px',
              zIndex: -1
            }}
          />
        )}
        <link.icon ref={iconRef} size={16} isActive={isActive} />
        <span>{link.name}</span>
      </Link>
    );
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ 
      position: 'sticky', 
      top: scrolled ? '0' : '1.5rem', 
      zIndex: 1000, 
      display: 'flex', 
      justifyContent: 'center',
      width: '100%',
      pointerEvents: 'none', // Allows clicking through the empty space of the container
      transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.5rem 0.5rem 0.5rem 1.25rem',
          borderRadius: scrolled ? '0 0 24px 24px' : '999px',
          backgroundColor: scrolled ? 'var(--navbar-bg-scrolled)' : 'var(--card-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--border-color)',
          borderTop: scrolled ? 'none' : '1px solid var(--border-color)',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.1)' : '0 20px 40px rgba(0,0,0,0.05), 0 0 0 1px var(--glass-border) inset',
          width: 'auto',
          maxWidth: '95vw',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* LEFT: Logo */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px var(--accent-glow)' }}>
                <Cpu color="#000" size={16} />
              </div>
            </motion.div>
            <span style={{ fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.02em', fontSize: '1.1rem', textTransform: 'uppercase' }}>Boltz</span>
          </Link>
        </div>
        
        {/* CENTER: Navigation Links */}
        <div className="d-none d-md-flex" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          borderLeft: '1px solid var(--border-color)',
          borderRight: '1px solid var(--border-color)',
          padding: '0 1rem',
        }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return <NavItem key={link.name} link={link} isActive={isActive} />;
          })}
        </div>
        
        {/* RIGHT: Action Button & Theme */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            style={{
              background: 'var(--nav-pill-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ position: 'relative', width: '18px', height: '18px' }}>
              <AnimatePresence initial={false}>
                {theme === 'light' ? (
                  <motion.div key="moon" style={{ position: 'absolute', inset: 0 }} initial={{ opacity: 0, rotate: -90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.3 }}>
                    <Moon size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="sun" style={{ position: 'absolute', inset: 0 }} initial={{ opacity: 0, rotate: -90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.3 }}>
                    <Sun size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          <Link to="/features" style={{ textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                padding: '0.55rem 1.1rem',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                transition: 'all 0.3s',
              }}
            >
              Get Started
            </motion.div>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
