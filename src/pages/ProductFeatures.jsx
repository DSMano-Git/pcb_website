import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Global3DBackground from '../components/Global3DBackground';
import { ScrollReveal, TextReveal } from '../components/UI';
import { 
  Zap, Cpu, ShieldCheck, Activity, PenTool, Layout, Rocket, Search, 
  Lightbulb, GitMerge, Star, CheckCircle, ArrowRight
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   ULTRA-OPTIMIZED X-RAY REVEAL (0 React Re-renders on move)
   ══════════════════════════════════════════════════════════ */
const PowerXRayReveal = ({ src, xraySrc, height, className = "" }) => {
  const maskRef = useRef(null);

  const onMove = (e) => {
    if (!maskRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    // Direct DOM manipulation - bypasses React completely for 60fps performance
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
      className={`pcb-reveal ${className}`}
      style={{ 
        position: 'relative', width: '100%', overflow: 'hidden', cursor: 'crosshair', 
        borderRadius: '24px', background: '#111', ...(height ? { height } : {}) 
      }} 
      onMouseMove={onMove} 
      onMouseEnter={onEnter} 
      onMouseLeave={onLeave}
    >
      <img src={src} alt="PCB board" style={{ width: '100%', display: 'block', userSelect: 'none', ...(height ? { height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 } : {}) }} />
      
      <div 
        ref={maskRef}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          clipPath: 'circle(0% at 50% 50%)',
          WebkitClipPath: 'circle(0% at 50% 50%)',
          pointerEvents: 'none', zIndex: 2,
          // Removed mixBlendMode and heavy filters for maximum render performance
        }}
      >
        <img src={xraySrc} alt="PCB X-Ray" style={{ width: '100%', display: 'block', userSelect: 'none', opacity: 0.95, ...(height ? { height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 } : {}) }} />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   STABLE TABBED CONTENT
   ══════════════════════════════════════════════════════════ */
const StableTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px' }}>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === idx ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '1.05rem',
              fontWeight: activeTab === idx ? '700' : '500',
              cursor: 'pointer',
              padding: '0.5rem 0',
              position: 'relative',
              transition: 'color 0.2s'
            }}
          >
            {tab.title}
            {activeTab === idx && (
              <motion.div
                layoutId="active-tab-indicator"
                style={{ position: 'absolute', bottom: '-0.5rem', left: 0, right: 0, height: '2px', background: 'var(--accent)', borderRadius: '2px' }}
              />
            )}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }} // faster transition
            style={{ position: 'absolute', inset: 0, color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};


/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
const ProductFeatures = () => {
  
  useEffect(() => {
    const style = document.createElement('style');
    // Minimal, performant CSS
    style.textContent = `
      .hover-glow-card { transition: transform 0.2s ease, background-color 0.2s ease; will-change: transform; }
      .hover-glow-card:hover { transform: translateY(-4px); background-color: rgba(255,255,255,0.04); }
      .journey-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, transparent, var(--accent), transparent); opacity: 0.3; transform: translateX(-50%); }
      .journey-step { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; position: relative; width: 100%; }
      .journey-step:nth-child(even) { flex-direction: row-reverse; }
      .journey-content { width: 45%; }
      .journey-icon { width: 48px; height: 48px; border-radius: 50%; background: var(--bg-primary); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; position: absolute; left: 50%; transform: translateX(-50%); z-index: 10; color: var(--accent); }
      @media (max-width: 768px) {
        .journey-line { left: 24px; }
        .journey-step { flex-direction: column !important; align-items: flex-start; }
        .journey-content { width: 100%; padding-left: 60px; }
        .journey-icon { left: 24px; transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      
      {/* ═══════════════════════════════════════════
          HERO SECTION (Removed scroll transforms for performance)
          ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <Global3DBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, var(--bg-primary) 100%)', zIndex: 1, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <ScrollReveal>
            <div className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', borderRadius: '999px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem', letterSpacing: '0.15em', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <Zap size={14} style={{ color: 'var(--accent)' }} /> 
              <span>AI-Powered PCB Design System</span>
            </div>
          </ScrollReveal>

          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 auto 2rem', maxWidth: '1000px' }}>
            <TextReveal>Master the complete</TextReveal><br />
            <TextReveal delay={0.1}><span className="text-gradient">PCB design process.</span></TextReveal>
          </h1>
          
          <ScrollReveal delay={0.2}>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6, fontWeight: 400 }}>
              From architecture planning and physics-aware placement to DFM checks and Gerber generation — intelligent, iterative, and optimized for first-time-right success.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
              {["Full complete schematic capture", "Physics-aware component placement", "Pre & post-layout simulations", "Automated DFM & DRC validation"].map((highlight, idx) => (
                <div key={idx} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '999px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent)' }} /> {highlight}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTRO SECTION
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
                From Spark of Idea to <span className="text-gradient">Smart PCB</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Imagine turning your raw idea into a professional, high-quality PCB in record time without the usual headaches.
              </p>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Our AI PCB Design system is your intelligent partner. It takes your initial concept and smoothly guides you all the way to a ready-to-build board. Whether you’re a maker, engineer, or company innovator, this AI combines senior expert knowledge with creative intelligence.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={24} fill="currentColor" />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Why Our AI PCB Agent Stands Out</h3>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    "Smart & Creative Thinking at every step",
                    "Turns complex design rules into simple, guided actions",
                    "Catches problems early so you avoid expensive mistakes",
                    "From wild idea to polished final layout — fully automated support",
                    "Fun, fast, and built for real-world success"
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <CheckCircle size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE CREATIVE JOURNEY
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem' }}>
              The Creative Journey: <br /><span className="text-gradient">Your Idea to Final PCB</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              Our AI doesn’t just follow steps — it brings your vision to life with intelligence and precision.
            </p>
          </ScrollReveal>

          <div style={{ position: 'relative', padding: '2rem 0' }}>
            <div className="journey-line"></div>
            {[
              { title: "Idea Ignition", desc: "You share your concept. The AI helps shape it into a clear plan: power, signals, size, and mechanical needs — like turning a rough sketch into a solid blueprint.", icon: <Lightbulb size={20} /> },
              { title: "Component Discovery", desc: "The AI smartly picks the best parts for your needs (performance, cost, availability) and automatically builds the digital library symbols, footprints, and 3D models.", icon: <Search size={20} /> },
              { title: "Circuit Magic", desc: "Draw your schematic with helpful AI suggestions. Run quick checks and simulations to make sure your circuit really works — before moving forward.", icon: <PenTool size={20} /> },
              { title: "Board Foundation", desc: "Define the perfect board shape and size. The AI sets up smart layers and rules so everything fits beautifully and performs well.", icon: <Layout size={20} /> },
              { title: "Intelligent Placement", desc: "Watch the AI place components like a master puzzle solver — optimizing for heat, signal flow, physical fit, and easy manufacturing.", icon: <Cpu size={20} /> },
              { title: "Elegant Routing", desc: "The AI connects everything with clean, efficient traces. It handles critical paths first and continuously checks rules, creating beautiful and reliable connections.", icon: <GitMerge size={20} /> },
              { title: "Deep Validation", desc: "Run powerful simulations that test real-world performance. The AI analyzes results and creatively suggests improvements — making your design stronger.", icon: <Activity size={20} /> },
              { title: "Manufacturing Mastery", desc: "Full checks for easy production, assembly, and testing. The AI ensures high success rate when your board goes to the factory.", icon: <ShieldCheck size={20} /> },
              { title: "Final Touch – Ready to Build", desc: "Generate all professional files: Gerbers, drill files, parts list, placement data, and drawings. The AI double-checks everything and prepares a perfect package for manufacturing.", icon: <Rocket size={20} /> }
            ].map((step, idx) => (
              <div className="journey-step" key={idx}>
                <div className="journey-icon">{step.icon}</div>
                <div className="journey-content">
                  <ScrollReveal y={20}>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '24px' }}>
                      <div className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>STEP {String(idx + 1).padStart(2, '0')}</div>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{step.title}</h4>
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOOL DEEP DIVE: PLACEMENT
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            
            <div>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.1em' }}>FEATURE DEEP DIVE</div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                AI Component <span className="text-gradient">Placement Tool</span>
              </h2>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Highlights</h4>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {["Physics & thermal-optimized", "Signal integrity focused", "Real-time DRC checks", "3D preview & easy tuning"].map((hl, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent)' }} /> {hl}
                    </li>
                  ))}
                </ul>
              </div>

              <StableTabs tabs={[
                { title: "Overview", content: "Imagine you have a bag full of electronic parts and a blank PCB board. Your goal is to place every part in the perfect spot so the board works well and is easy to manufacture. Our AI turns this tricky step into a smooth process — helping you create clean layouts quickly and confidently." },
                { title: "How it Works", content: <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}><li><strong>Upload board outline:</strong> The tool quickly understands your circuit and requirements.</li><li><strong>Automatic arrangement:</strong> The AI uses physics-based logic considering heat, signals, physical fit, and rules to provide a strong first placement in seconds.</li><li><strong>Application optimization:</strong> It optimizes for high-speed, RF, low power, reliability, or compact size based on your needs.</li><li><strong>Review & Finalize:</strong> View in 3D, see highlighted issues, and make manual changes with full confidence.</li></ol> },
                { title: "Benefits", content: <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}><li>Save hours of manual placement work</li><li>Achieve expert-level results even as a beginner</li><li>Create cleaner designs with better performance</li><li>Reduce errors and design revisions</li><li>Make layout process much easier and faster</li></ul> }
              ]} />
            </div>

            <ScrollReveal delay={0.1}>
              <PowerXRayReveal src="/boltzpcb_apex.png" xraySrc="/boltzpcb_apex_xray.png" height="500px" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOOL DEEP DIVE: SI SIMULATOR
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            
            <ScrollReveal delay={0.1}>
              <PowerXRayReveal src="/pcb-hero-ultra-boltz.png" xraySrc="/pcb-hero-ultra-boltz-xray.png" height="500px" />
            </ScrollReveal>

            <div>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.1em' }}>FEATURE DEEP DIVE</div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                AI Smart <span className="text-gradient">SI Simulator</span>
              </h2>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Highlights</h4>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {["GPU accelerated speed", "AI parameter suggestions", "Intelligent recommendations", "Clear results & easy fixes"].map((hl, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent)' }} /> {hl}
                    </li>
                  ))}
                </ul>
              </div>

              <StableTabs tabs={[
                { title: "Overview", content: "Signal Integrity (SI) problems can ruin even the best designs. Slow simulations slowing you down? Our GPU-powered AI SI Simulator runs signal integrity analysis at lightning speed, delivering practical solutions and AI-guided suggestions." },
                { title: "How it Works", content: <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}><li><strong>Upload design:</strong> Automatically detects critical signals that need analysis.</li><li><strong>GPU power:</strong> Simulations that took hours finish in minutes. Run pre and post-layout SI smoothly.</li><li><strong>AI recommendations:</strong> Get best parameters (rise time, termination, crosstalk). It tells you exactly what to simulate.</li><li><strong>Clear Reports:</strong> Eye diagrams, waveform analysis, and practical solutions for highlighted problems.</li></ol> },
                { title: "Benefits", content: <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}><li>Run simulations much faster than traditional tools</li><li>Make better decisions with AI guidance</li><li>Catch signal problems early and fix them easily</li><li>Save time and reduce design respins</li><li>Suitable for both beginners and experienced engineers</li></ul> }
              ]} />
              
              <div style={{ marginTop: '1rem' }}>
                <Link to="#" style={{ color: 'var(--bg-primary)', background: 'var(--accent)', fontWeight: '700', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '999px', transition: 'all 0.2s' }}>
                  Speed Up Your SI Analysis <ArrowRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOOL DEEP DIVE: THERMAL
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            
            <div>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.1em' }}>FEATURE DEEP DIVE</div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Smart <span className="text-gradient">Thermal Simulator</span>
              </h2>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Highlights</h4>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {["Super-fast GPU sims", "Smart parameter suggestions", "Detailed hotspot detection", "Practical cooling tips"].map((hl, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent)' }} /> {hl}
                    </li>
                  ))}
                </ul>
              </div>

              <StableTabs tabs={[
                { title: "Overview", content: "Heat can cause serious problems in PCBs — from component failure to poor performance. Our GPU-powered AI Thermal Simulator makes thermal analysis fast, accurate, and easy, providing detailed thermal maps and practical cooling recommendations." },
                { title: "How it Works", content: <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}><li><strong>Upload design:</strong> Automatically detects hot components and critical thermal areas.</li><li><strong>10x-50x Faster:</strong> GPU acceleration lets you test more scenarios quickly.</li><li><strong>Smart parameters:</strong> Recommends which areas need analysis, best conditions to simulate, and cooling strategies.</li><li><strong>Visual Results:</strong> Easy-to-understand thermal maps. Get suggestions like adding thermal vias or changing placement.</li></ol> },
                { title: "Benefits", content: <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}><li>Run thermal analysis much faster than traditional methods</li><li>Catch heat-related problems early and fix them easily</li><li>Improve board reliability and product lifespan</li><li>Test multiple cooling scenarios quickly</li><li>Make confident thermal decisions even on complex designs</li></ul> }
              ]} />
              
              <div style={{ marginTop: '1rem' }}>
                <Link to="#" style={{ color: 'var(--bg-primary)', background: 'var(--accent)', fontWeight: '700', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '999px', transition: 'all 0.2s' }}>
                  Master Your Board’s Heat <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <ScrollReveal delay={0.1}>
              <PowerXRayReveal src="/thermal.png" xraySrc="/thermal_xray.png" height="500px" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SUPERPOWERS & USERS LOVE IT
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
            
            <ScrollReveal>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Superpowers of Our System</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  "Automatic smart reviews after every big step",
                  "Creative optimization suggestions to make your design even better",
                  "Handles simple projects to advanced high-speed, power, or RF boards",
                  "Smooth team collaboration and version history",
                  "Easy connection with popular design tools"
                ].map((p, i) => (
                  <div key={i} className="hover-glow-card" style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Activity size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Why Users Love It</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  "Cut design time by 40-60% — launch products faster",
                  "Dramatically fewer errors and costly reworks",
                  "Expert-level results without years of experience",
                  "From your first spark of idea to factory-ready layout",
                  "Makes PCB design exciting and achievable for everyone"
                ].map((p, i) => (
                  <div key={i} className="hover-glow-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Star size={24} style={{ color: '#ffb800', flexShrink: 0 }} />
                    <span style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CALL TO ACTION
          ═══════════════════════════════════════════ */}
      <section style={{ padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vw', background: 'radial-gradient(circle, var(--accent) 0%, transparent 40%)', opacity: 0.15, filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, marginBottom: '2rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              Ready to bring your idea to <br/>
              <span className="text-gradient">life with AI?</span>
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="#" style={{ color: 'var(--bg-primary)', background: 'var(--text-primary)', fontWeight: '700', fontSize: '1.1rem', padding: '1rem 3rem', borderRadius: '999px', transition: 'all 0.2s', textDecoration: 'none' }}>
                Start Creating Now
              </Link>
              <Link to="#" className="hover-glow-card" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', fontWeight: '700', fontSize: '1.1rem', padding: '1rem 3rem', borderRadius: '999px', transition: 'all 0.2s', textDecoration: 'none' }}>
                Share Your Idea
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default ProductFeatures;
