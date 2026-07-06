import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileCode2, Repeat2, Unlock, Users, MessageSquare, Zap, Search, Download, PenTool, Share2, ArrowRight, Code } from 'lucide-react';
import FloatingChips3D from '../components/FloatingChips3D';
import { ScrollReveal, TextReveal } from '../components/UI';

const OpenCircuitHub = () => {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      
      {/* Hero Section */}
      <section style={{ paddingTop: '220px', paddingBottom: '8rem', textAlign: 'center', position: 'relative', zIndex: 10, minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* React Three Fiber Background Animation */}
        <FloatingChips3D color="var(--accent)" />
        
        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'var(--accent-glow)', border: '1px solid var(--accent-glow)', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
              <Zap size={14} style={{ color: 'var(--accent)' }} />
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                Community Library
              </span>
            </div>
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.03em', textShadow: 'var(--hero-shadow)' }}>
            <TextReveal>Open Circuit Hub</TextReveal>
          </h1>
          
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '2.5rem' }}>
            Where <span className="text-gradient">PCB designers</span> build in public.
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            Every board you'll ever need to design has probably been designed before, by someone who hit the same walls you're about to hit. Open Circuit Hub is where those designs live. Share your schematics and layouts, use someone else's as your starting point, redesign what's already there, and ship something better.
          </motion.p>
          
          <ScrollReveal delay={0.4}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="#" className="btn-glow" style={{ padding: '1.1rem 2.5rem', fontSize: '1.15rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '999px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Search size={20} /> Browse Projects
              </Link>
              <Link to="#" className="hover-glow-card" style={{ padding: '1.1rem 2.5rem', fontSize: '1.15rem', background: 'var(--nav-pill-bg)', border: '1px solid var(--border-color)', borderRadius: '999px', color: 'var(--text-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)', backdropFilter: 'blur(10px)' }}>
                <Share2 size={20} /> Share Your PCB
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview Line Banner */}
      <section style={{ padding: '5rem 0', position: 'relative', zIndex: 10, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--accent-glow) 50%, rgba(0,0,0,0) 100%)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <ScrollReveal>
            <div className="hover-glow-card" style={{ padding: '4rem', textAlign: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'absolute', top: '-50%', left: '20%', width: '60%', height: '200%', background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 60%)', transform: 'rotate(-45deg)', pointerEvents: 'none' }} />
              
              <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem', fontWeight: 800, lineHeight: 1.1, position: 'relative', zIndex: 1 }}>
                Real boards. Real files. <br/><span className="text-gradient">Zero paywalls.</span>
              </h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                Good PCB references are scattered everywhere—half-documented GitHub repos, forum threads, someone's laptop. Open Circuit Hub is one dedicated place for it: a library of real, working PCB designs, shared by the people who actually built them, for anyone who wants to learn from them, reuse them, or take them somewhere new.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Why the Hub exists</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Card 1 */}
            <ScrollReveal delay={0.1}>
              <div className="hover-glow-card" style={{ padding: '2rem', height: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <FileCode2 size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Real design files, not photos</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Every project comes with the actual schematic and layout files (KiCad, Altium, Eagle). Not a render, not a finished-product photo. Files you can open, inspect, and actually build from.</p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2}>
              <div className="hover-glow-card" style={{ padding: '2rem', height: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Repeat2 size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Built to be redesigned</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Find a project that's close to what you need, adapt it for your own build, and post your version back. The platform improves one redesign at a time.</p>
              </div>
            </ScrollReveal>

             {/* Card 3 */}
             <ScrollReveal delay={0.3}>
              <div className="hover-glow-card" style={{ padding: '2rem', height: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Unlock size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Fully open</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>No paywall, no sign-up wall just to browse. Anyone can look through the library and download what they need. Create an account only to post.</p>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.4}>
               <div className="hover-glow-card" style={{ padding: '2rem', height: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Users size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Every skill level welcome</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>A first breakout board and a six-layer mixed-signal design are equally welcome. Everyone started somewhere.</p>
              </div>
            </ScrollReveal>

             {/* Card 5 */}
             <ScrollReveal delay={0.5}>
               <div className="hover-glow-card" style={{ padding: '2rem', height: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <MessageSquare size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Context, not just files</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Every project includes notes from the designer—what worked, what didn't, and what to watch out for before you build it yourself.</p>
              </div>
            </ScrollReveal>

            {/* Card 6 */}
             <ScrollReveal delay={0.6}>
               <div className="hover-glow-card" style={{ padding: '2rem', height: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>No approval queue</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Post your project and it goes live immediately. The community handles quality through feedback, not a gatekeeper.</p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* How it Works Section (Refined Horizontal) */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10, borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="mono" style={{ color: 'var(--accent)', letterSpacing: '0.1em', fontSize: '0.9rem', fontWeight: 600 }}>WORKFLOW</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginTop: '1rem', letterSpacing: '-0.02em' }}>How it works</h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', position: 'relative' }}>
            
            {/* Desktop Connecting Line */}
            <div style={{ position: 'absolute', top: '50px', left: '12%', right: '12%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.3, zIndex: 0 }} className="d-none d-lg-block" />

            {[
              { icon: Search, title: 'Browse', desc: 'Look through projects by category, complexity, or component. Every listing shows you exactly what\'s included before you download anything.' },
              { icon: Download, title: 'Download', desc: 'Grab the schematic, layout, and BOM for any project—free, no account required. Use it as-is or as a reference point for your own design.' },
              { icon: PenTool, title: 'Build or redesign', desc: 'Build the board exactly as shared, or take it as a starting point and modify it for your own use case: different sensor, different MCU, different form factor.' },
              { icon: Share2, title: 'Share it back', desc: 'Post your version, credit the original designer, and it\'s live for the next person who runs into the same problem you just solved.' }
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="hover-glow-card" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', background: 'var(--card-bg)', padding: '3rem 2rem', borderRadius: '32px', border: '1px solid var(--border-color)', height: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 10px 25px var(--accent-glow)' }}>
                    <step.icon size={28} style={{ color: '#fff' }} />
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--card-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', border: '2px solid var(--border-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                      {i + 1}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 800 }}>{step.title}</h4>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '8rem 0 6rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Glow behind CTA */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50vw', height: '50vw', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)', opacity: 1, filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div className="hover-glow-card" style={{ maxWidth: '850px', margin: '0 auto', background: 'var(--card-bg)', padding: '6rem 3rem', borderRadius: '48px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Got a board nobody's seen yet?</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                Someone out there needs exactly what you built. It doesn't have to be perfect or production-ready—a prototype, a work-in-progress, or a design you're still debugging is just as welcome as a finished one. Post it, and let the community help you take it further.
              </p>
              <Link to="#" className="btn-glow hover-glow-card" style={{ padding: '1.35rem 4rem', fontSize: '1.25rem', background: 'var(--accent)', color: '#fff', borderRadius: '999px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)', boxShadow: '0 10px 40px var(--accent-glow)' }}>
                Post Your First Project <ArrowRight size={24} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default OpenCircuitHub;
