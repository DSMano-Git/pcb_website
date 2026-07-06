import React, { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Scroll Reveal (Intersection Observer) ── */
export const ScrollReveal = memo(({ children, delay = 0, y = 30, className = '', style = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div 
      ref={ref} 
      className={className}
      style={style}
      initial={{ opacity: 0, y: y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: y }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  );
});

/* ── Text Reveal ── */
export const TextReveal = memo(({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} style={{ overflow: 'hidden', display: 'inline-block' }}>
      <motion.div initial={{ y: "100%" }} animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
});

/* ── Animated SVG Icon ── */
export const AnimatedSvgIcon = memo(({ d, size = 32, color = "var(--accent)", delay = 0, floatRange = 5 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ width: size, height: size, display: 'inline-flex' }}>
      <motion.svg 
        viewBox="0 0 24 24" 
        width="100%" height="100%" 
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        /* Float animation disabled — was causing continuous framer-motion recalculation 
           across dozens of icons simultaneously. Use CSS animation if float effect is needed. */
      >
        <motion.path
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
        />
      </motion.svg>
    </div>
  );
});

export const ICONS = {
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu: "M4 4h16v16H4zm0 4h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16M9 9h6v6H9z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  check: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3",
  chevron: "M9 18l6-6-6-6",
  hexagon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  package: "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01"
};
