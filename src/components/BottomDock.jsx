import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sun, Moon, Home, Grid, Box } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const BottomDock = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features', icon: Grid },
    { name: 'Hub', path: '/hub', icon: Box },
  ];

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 0.75rem',
        borderRadius: '24px',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '20px 0 40px rgba(0,0,0,0.1), inset -1px 0 0 rgba(255,255,255,0.05)'
      }}
    >
      {/* Brand Icon */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', borderRadius: '50%', background: 'var(--nav-pill-bg)', color: 'var(--accent)', textDecoration: 'none' }}>
        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
          <Cpu size={24} />
        </motion.div>
      </Link>
      
      <div style={{ height: '1px', width: '30px', background: 'var(--border-color)', margin: '0.5rem 0' }} />

      {/* Navigation Icons */}
      {navLinks.map((link, i) => {
        const isActive = location.pathname === link.path;
        const Icon = link.icon;
        
        return (
          <Link 
            key={i}
            to={link.path}
            onMouseEnter={() => setHoveredLink(i)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              zIndex: 2,
            }}
          >
            {/* Hover Background */}
            {hoveredLink === i && (
              <motion.div
                layoutId="dock-hover"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--border-color)',
                  borderRadius: '50%',
                  zIndex: -1
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            
            {/* Active Indicator Dot */}
            {isActive && (
              <motion.div
                layoutId="dock-active"
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--text-primary)',
                }}
              />
            )}
            
            <Icon size={20} />

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredLink === i && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -5, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    left: '60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'var(--bg-secondary)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    border: '1px solid var(--border-color)',
                    boxShadow: '4px 0 12px rgba(0,0,0,0.1)',
                    pointerEvents: 'none'
                  }}
                >
                  {link.name}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        );
      })}

      <div style={{ height: '1px', width: '30px', background: 'var(--border-color)', margin: '0.5rem 0' }} />

      {/* Theme Toggle */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
        }}
      >
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
              <Moon size={20} />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
              <Sun size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default BottomDock;
