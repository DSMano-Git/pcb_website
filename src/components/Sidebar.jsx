import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHomeIcon from './icons/AnimatedHomeIcon';
import AnimatedLayersIcon from './icons/AnimatedLayersIcon';
import AnimatedBoxIcon from './icons/AnimatedBoxIcon';

const Sidebar = () => {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/', icon: AnimatedHomeIcon },
    { name: 'Features', path: '/features', icon: AnimatedLayersIcon },
    { name: 'Hub', path: '/hub', icon: AnimatedBoxIcon },
  ];

  return (
    <nav style={{
      position: 'fixed',
      left: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      {/* Floating Icons Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.path && link.path !== '#';
          return (
            <Link 
              key={i} 
              to={link.path} 
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.3s ease',
                color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--text-primary)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', zIndex: 2 }}>
                <link.icon size={20} isActive={isActive} />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
