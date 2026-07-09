import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroBackground3D from '../components/HeroBackground3D';

import { ScrollReveal, TextReveal, AnimatedSvgIcon, ICONS } from '../components/UI';

/* ══════════════════════════════════════════════════════════
   CLIP-PATH X-RAY REVEAL — DOM-based (zero React re-renders on move)
   ══════════════════════════════════════════════════════════ */
const PowerXRayReveal = ({ src, xraySrc, height, overlay }) => {
  const maskRef = useRef(null);

  const onMove = (e) => {
    if (!maskRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    // Direct DOM manipulation — bypasses React completely for 60fps
    maskRef.current.style.transition = 'none';
    maskRef.current.style.clipPath = `circle(35% at ${x}% ${y}%)`;
    maskRef.current.style.webkitClipPath = `circle(35% at ${x}% ${y}%)`;
  };

  const onEnter = () => {
    if (!maskRef.current) return;
    maskRef.current.style.transition = 'clip-path 0.2s ease-out, -webkit-clip-path 0.2s ease-out';
  };

  const onLeave = () => {
    if (!maskRef.current) return;
    maskRef.current.style.transition = 'clip-path 0.4s ease-in-out, -webkit-clip-path 0.4s ease-in-out';
    maskRef.current.style.clipPath = `circle(0% at 50% 50%)`;
    maskRef.current.style.webkitClipPath = `circle(0% at 50% 50%)`;
  };

  return (
    <div 
      className="pcb-reveal"
      style={{ position: 'relative', width: '100%', overflow: 'hidden', cursor: 'crosshair', borderRadius: '24px', ...(height ? { height } : {}) }} 
      onMouseMove={onMove} 
      onMouseEnter={onEnter} 
      onMouseLeave={onLeave}
    >
      <img src={src} alt="PCB board" style={{ width: '100%', display: 'block', userSelect: 'none', ...(height ? { height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 } : {}) }} />
      {overlay && overlay}

      <div
        ref={maskRef}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          clipPath: 'circle(0% at 50% 50%)',
          WebkitClipPath: 'circle(0% at 50% 50%)',
          pointerEvents: 'none', zIndex: 2,
        }}
      >
        <img src={xraySrc} alt="PCB X-Ray" style={{ width: '100%', display: 'block', userSelect: 'none', filter: 'brightness(1.0) contrast(1.1)', opacity: 0.85, mixBlendMode: 'screen', ...(height ? { height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 } : {}) }} />
      </div>
    </div>
  );
};


const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ═══════════════════════════════════════════
          HERO WITH 3D BACKGROUND
          ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: '6rem', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <HeroBackground3D />
        
        <motion.div className="container" style={{ position: 'relative', zIndex: 10, y: heroY, opacity: heroOpacity }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              </motion.div>

              <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', marginBottom: '1.5rem', lineHeight: 1.05, textShadow: '0 0 40px var(--accent-glow)', textAlign: 'left' }}>
                <TextReveal>Design hardware,</TextReveal><br />
                <TextReveal delay={0.15}>powered by <span className="text-gradient-intense">AI</span></TextReveal>
              </h1>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '600px', textAlign: 'left' }}>
                From specs to fabrication in hours. Simulation, thermal validation, and DRC — fully automated and highly intuitive.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
              </motion.div>
            </div>

            {/* Right Image */}
            <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center', width: '100%' }}>
               <ScrollReveal delay={0.2} y={50}>
                  <motion.div 
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ 
                      width: 'min(90vw, 550px)',
                      aspectRatio: '1 / 1', 
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(128, 128, 128, 0.15)',
                      boxShadow: '0 16px 48px -12px rgba(0,0,0,0.1)',
                      background: 'var(--bg-primary)',
                      margin: '0 auto'
                    }}
                  >
                    <PowerXRayReveal 
                      src="/boltzpcb_realistic_hero.png" 
                      xraySrc="/boltzpcb_realistic_xray.png" 
                      height="100%" 
                      overlay={null}
                    />
                  </motion.div>
               </ScrollReveal>
            </div>
            
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          TAGLINE
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <ScrollReveal>
            <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '500', color: 'var(--text-primary)', textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
              We handle the complete PCB journey — from architecture planning to verified manufacturing — <span className="text-gradient-intense">so you can ship hardware, fast.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CAPABILITIES
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'transparent', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="mono" style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '999px', background: 'var(--nav-pill-bg)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Capabilities</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}><TextReveal>Everything you need to ship hardware.</TextReveal></h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: ICONS.layers, title: 'Schematic Capture', desc: 'AI-guided design with real-time validation and infinite canvas.' },
              { icon: ICONS.cpu, title: 'Smart Placement', desc: 'Thermal, signal, and mechanical optimization calculated in ms.' },
              { icon: ICONS.zap, title: 'GPU Simulators', desc: 'Lightning-fast SI and thermal analysis powered by custom shaders.' },
              { icon: ICONS.check, title: 'DFM & DRC', desc: 'Manufacturing-ready validation built directly into the core loop.' },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.1} style={{ height: '100%' }}>
                <div className="feature-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <AnimatedSvgIcon d={c.icon} delay={i * 0.2} />
                  </div>
                  <h4 style={{ marginBottom: '0.75rem', fontSize: '1.15rem' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES / WORKFLOW
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', position: 'relative' }}>
        <div className="bg-bubble bubble-blue" style={{ width: '800px', height: '800px', top: '10%', right: '-20%', opacity: 0.7 }} />
        <div className="bg-bubble bubble-purple" style={{ width: '700px', height: '700px', bottom: '10%', left: '-15%', opacity: 0.7 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal>
              <span className="mono" style={{ display: 'block', marginBottom: '0.5rem' }}>01 — Design</span>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>AI-Powered PCB Design System</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                From architecture planning and physics-aware placement to DFM checks and Gerber generation — intelligent, iterative, and optimized for first-time-right success.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {['Full schematic capture with AI guidance', 'Component auto-selection & library generation', 'From idea to factory-ready in hours'].map((t, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <AnimatedSvgIcon d={ICONS.chevron} size={14} floatRange={0} delay={0.3} /> {t}
                  </li>
                ))}
              </ul>
              {/* <Link to="/features" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>Explore the System <AnimatedSvgIcon d={ICONS.chevron} size={14} floatRange={0} /></Link> */}
            </ScrollReveal>
            <ScrollReveal delay={0.2} y={50}>
              <PowerXRayReveal src="/pcb-hero-ultra-boltz.png" xraySrc="/pcb-hero-ultra-boltz-xray.png" height="420px" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02 — PLACEMENT
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'transparent', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal delay={0.2} y={50}>
              <PowerXRayReveal src="/boltzpcb_apex.png" xraySrc="/boltzpcb_apex_xray.png" height="420px" />
            </ScrollReveal>
            <ScrollReveal>
              <span className="mono" style={{ display: 'block', marginBottom: '0.5rem' }}>02 — Placement</span>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Physics-Aware Component Placement</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Our AI places every component intelligently — considering thermal flow, signal integrity, mechanical fit, and manufacturing rules.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {['Thermal-optimized positioning', 'Signal integrity focused layout', 'Real-time DRC & 3D preview'].map((t, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <AnimatedSvgIcon d={ICONS.chevron} size={14} floatRange={0} delay={0.3} /> {t}
                  </li>
                ))}
              </ul>
              {/* <Link to="/features" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>See Placement in Action <AnimatedSvgIcon d={ICONS.chevron} size={14} floatRange={0} /></Link> */}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          03 — SIMULATORS
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="mono" style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '999px', background: 'var(--nav-pill-bg)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>03 — Simulate</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}><TextReveal>Lightning-fast GPU Simulators</TextReveal></h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
            <ScrollReveal>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <PowerXRayReveal src="/pcb-hero-ultra-boltz.png" xraySrc="/pcb-hero-ultra-boltz-xray.png" height="320px" />
                <div style={{ padding: '2rem 1.5rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <AnimatedSvgIcon d={ICONS.zap} size={24} floatRange={0} delay={0.2} />
                    <h3 style={{ fontSize: '1.35rem', margin: 0 }}>AI Smart SI Simulator</h3>
                  </div>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>GPU-accelerated signal integrity with AI-powered parameter suggestions and live eye diagrams.</p>
                  {/* <Link to="/features" style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '999px', transition: 'all 0.2s' }} className="hover-glow">
                    Speed Up Analysis <AnimatedSvgIcon d={ICONS.chevron} size={14} floatRange={0} />
                  </Link> */}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <PowerXRayReveal src="/thermal.png" xraySrc="/thermal_xray.png" height="320px" />
                <div style={{ padding: '2rem 1.5rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <AnimatedSvgIcon d={ICONS.hexagon} size={24} floatRange={0} delay={0.4} />
                    <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Smart Thermal Simulator</h3>
                  </div>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Real-time thermal maps, automatic hotspot detection, and AI-driven heatsink recommendations.</p>
                  {/* <Link to="/features" style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '999px', transition: 'all 0.2s' }} className="hover-glow">
                    Master Board Heat <AnimatedSvgIcon d={ICONS.chevron} size={14} floatRange={0} />
                  </Link> */}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          04 — MANUFACTURING
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'transparent', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal>
              <span className="mono" style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '999px', background: 'var(--nav-pill-bg)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>04 — Manufacture</span>
              <h2 style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', lineHeight: 1.2 }}>Compare. Choose. Manufacture.</h2>
              <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                Your design is simulated, validated, and DRC-clean. Get instant AI cost estimation, connect with verified vendors, and export Gerbers with a single click.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                {['AI cost estimation', 'Verified manufacturers', 'Quality & lead time', 'One-click export'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <AnimatedSvgIcon d={ICONS.check} size={18} floatRange={0} delay={0.1 * i} /> {t}
                  </div>
                ))}
              </div>
              {/* <Link to="/features" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>Start Manufacturing <AnimatedSvgIcon d={ICONS.chevron} size={18} floatRange={0} /></Link> */}
            </ScrollReveal>
            <ScrollReveal delay={0.2} y={50}>
              <div className="feature-card" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <AnimatedSvgIcon d={ICONS.package} size={80} delay={0.3} />
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Pick a Vendor. Place the Order.</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>BoltzPCB exports industry-standard Gerber files directly to the manufacturer's pipeline instantly.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '1.75rem' }}>Ready to bring your idea to life?</h2>
            <p style={{ maxWidth: '450px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>Cut design time by 40–60%. Expert-level results without years of experience.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <a href="mailto:contact@boltzpcb.com" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>Contact Us</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
