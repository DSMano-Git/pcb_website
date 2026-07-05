import React from 'react';
import { motion } from 'framer-motion';
import FloatingChips3D from '../components/FloatingChips3D';
import { ScrollReveal, TextReveal, AnimatedSvgIcon, ICONS } from '../components/UI';

const OpenCircuitHub = () => {
  const projects = [
    { title: 'ESP32 Smart Home Node', author: 'Alex Dev', category: 'IoT', downloads: 342, image: '/pcb-hero-boltz.png' },
    { title: '6-Layer Mixed Signal Audio', author: 'Sarah Circuits', category: 'Audio', downloads: 128, image: '/pcb-hero-ultra-boltz.png' },
    { title: 'RP2040 Custom Keyboard', author: 'KeyMech', category: 'Peripherals', downloads: 892, image: '/placement_apex.png' },
    { title: 'Brushless Motor Controller', author: 'Robo Dynamics', category: 'Power', downloads: 415, image: '/pcb-hero-new.png' },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '8rem', textAlign: 'center', position: 'relative', zIndex: 10, minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <FloatingChips3D />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <span className="mono" style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', backdropFilter: 'blur(10px)' }}>Community Library</span>
          <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', marginBottom: '1.5rem', textShadow: 'var(--hero-shadow)', lineHeight: 1.1 }}>
            <TextReveal>Open Circuit Hub</TextReveal>
          </h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ maxWidth: '650px', margin: '0 auto 3rem', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            Where elite PCB designers build in public. Real boards. Real manufacturing files. Zero paywalls.
          </motion.p>
          <ScrollReveal delay={0.2} y={50}>
            {/* <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Share Your PCB</button>
            <button className="btn glass-card" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', border: '1px solid var(--border-color)', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <AnimatedSvgIcon d={ICONS.search} size={18} floatRange={0} /> Browse Projects
            </button> */}
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
             {[
               { icon: ICONS.file, title: 'Real design files', desc: 'Actual schematic and layout files you can open, inspect, and build from.' },
               { icon: ICONS.share, title: 'Built to be redesigned', desc: 'Find a close project, adapt it, and post your version back.' },
               { icon: ICONS.info, title: 'Context, not just files', desc: 'Designer notes on what worked, what didn\'t, and what to watch out for.' }
             ].map((b, i) => (
               <ScrollReveal key={i} delay={i * 0.1}>
                 <div className="feature-card">
                   <div style={{ marginBottom: '1rem' }}>
                     <AnimatedSvgIcon d={b.icon} size={22} delay={i * 0.2} />
                   </div>
                   <h4 style={{ marginBottom: '0.5rem' }}>{b.title}</h4>
                   <p style={{ fontSize: '0.85rem' }}>{b.desc}</p>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '6rem 0 10rem', background: 'transparent', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <ScrollReveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Featured Projects</h2>
            <select style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.75rem 1.5rem', borderRadius: '999px', fontSize: '1rem', backdropFilter: 'blur(10px)', outline: 'none' }}>
              <option style={{ background: 'var(--bg-secondary)' }}>All Categories</option>
              <option style={{ background: 'var(--bg-secondary)' }}>IoT</option>
              <option style={{ background: 'var(--bg-secondary)' }}>Audio</option>
              <option style={{ background: 'var(--bg-secondary)' }}>Power</option>
            </select>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.map((project, i) => (
              <ScrollReveal key={i} delay={(i % 2) * 0.1}>
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}>
                  <div style={{ height: '220px', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'transform 0.5s ease' }} className="project-img" />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
                      {project.category}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.35rem' }}>{project.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>by <span style={{ color: 'var(--text-primary)' }}>{project.author}</span></p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <AnimatedSvgIcon d={ICONS.download} size={16} floatRange={0} /> {project.downloads}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '999px' }}>View Files</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <style>{`
            .glass-card:hover .project-img { transform: scale(1.05); }
          `}</style>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <div className="feature-card" style={{ padding: '3rem 2rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Got a board nobody's seen yet?</h2>
              <p style={{ maxWidth: '500px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
                Post it, and let the community help you take it further.
              </p>
              {/* <button className="btn btn-primary">Post Your First Project</button> */}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default OpenCircuitHub;
