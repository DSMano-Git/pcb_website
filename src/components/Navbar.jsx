import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import AnimatedHomeIcon from './icons/AnimatedHomeIcon';
import AnimatedLayersIcon from './icons/AnimatedLayersIcon';
import AnimatedBoxIcon from './icons/AnimatedBoxIcon';

const NavItem = ({ link, isActive, isMobile = false, setMobileMenuOpen }) => {
  const iconRef = React.useRef(null);
  return (
    <Link 
      to={link.path}
      style={{
        textDecoration: 'none',
        color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
        fontWeight: '600',
        fontSize: isMobile ? '1.25rem' : '0.95rem',
        position: 'relative',
        padding: isMobile ? '1rem' : '0.5rem 1rem',
        borderRadius: isMobile ? '16px' : '999px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 1,
        transition: 'color 0.3s',
        width: isMobile ? '100%' : 'auto',
        background: (isMobile && isActive) ? 'var(--text-primary)' : 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = isActive ? 'var(--bg-primary)' : 'var(--text-secondary)';
      }}
      onClick={() => {
        if (isMobile) setMobileMenuOpen(false);
        if (iconRef.current?.startAnimation) {
          iconRef.current.startAnimation();
          setTimeout(() => {
            if (iconRef.current?.stopAnimation) iconRef.current.stopAnimation();
          }, 600); // Stop after the animation completes
        }
      }}
    >
      {!isMobile && isActive && (
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
      <link.icon ref={iconRef} size={isMobile ? 24 : 16} isActive={isActive} />
      <span>{link.name}</span>
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: AnimatedHomeIcon },
    { name: 'Features', path: '/features', icon: AnimatedLayersIcon },
    { name: 'Hub', path: '/hub', icon: AnimatedBoxIcon },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        display: 'flex', 
        justifyContent: 'center',
        width: '100%',
        pointerEvents: 'none', // Allows clicking through the empty space of the container
      }}>
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: scrolled ? 0 : 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '0.5rem 0.5rem 0.5rem 1.25rem',
            borderRadius: scrolled ? '0 0 24px 24px' : '999px',
            backgroundColor: scrolled ? 'var(--navbar-bg-scrolled)' : 'var(--card-bg)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid var(--border-color)',
            borderTopColor: scrolled ? 'transparent' : 'var(--border-color)',
            boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 var(--border-highlight)' : '0 20px 40px rgba(0,0,0,0.15), inset 0 1px 0 var(--border-highlight), inset 1px 0 0 rgba(255, 255, 255, 0.05)',
            width: 'auto',
            minWidth: '300px',
            maxWidth: '95vw',
            transition: 'background-color 0.4s ease, box-shadow 0.4s ease, border-radius 0.4s ease, border-top-color 0.4s ease',
          }}
        >
          {/* LEFT: Logo */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img src={theme === 'light' ? '/lightmodelogo.png' : '/darkmodelogo.png'} alt="BoltzPCB" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            </Link>
          </div>
          
          {/* CENTER: Navigation Links (Desktop) */}
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
              return <NavItem key={link.name} link={link} isActive={isActive} setMobileMenuOpen={setMobileMenuOpen} />;
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

            <a href="https://app.boltzpcb.com/auth" target="_blank" rel="noopener noreferrer" className="d-none d-md-flex" style={{ textDecoration: 'none' }}>
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
              Login
              </motion.div>
            </a>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="d-md-none"
              style={{
                background: 'var(--nav-pill-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '1rem',
              right: '1rem',
              background: 'var(--navbar-bg-scrolled)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              zIndex: 999,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return <NavItem key={link.name} link={link} isActive={isActive} isMobile={true} setMobileMenuOpen={setMobileMenuOpen} />;
            })}
            
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '1rem 0' }} />
            
            <a href="https://app.boltzpcb.com/auth" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
              <div 
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  padding: '1rem',
                  borderRadius: '16px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
              Login / Sign Up
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
