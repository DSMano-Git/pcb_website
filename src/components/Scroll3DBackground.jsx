import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const ScrollReactiveParticles = ({ color = "var(--accent)" }) => {
  const pointsRef = useRef();
  const { scrollYProgress } = useScroll();
  
  // Track scroll value internally in the useFrame loop
  const scrollRef = useRef(0);
  
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      scrollRef.current = latest;
    });
  }, [scrollYProgress]);

  // Create points on a torus knot
  const particleCount = 15000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const p = 3;
    const q = 4;
    const radius = 6;
    const tube = 2.5;

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const r = radius + tube * Math.cos(q * u);
      const x = r * Math.cos(p * u);
      const y = r * Math.sin(p * u);
      const z = tube * Math.sin(q * u);

      const scatter = 2.0;
      pos[i * 3] = x + (Math.random() - 0.5) * scatter;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * scatter;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * scatter;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Base rotation
      pointsRef.current.rotation.x += delta * 0.05;
      pointsRef.current.rotation.y += delta * 0.08;
      
      // Reactive rotation based on scroll (fly-through effect)
      // As you scroll down (scrollRef goes 0 -> 1), we move the camera/particles
      const scrollVal = scrollRef.current;
      
      // Target rotation based on scroll
      const targetRotationZ = scrollVal * Math.PI * 2;
      pointsRef.current.rotation.z += (targetRotationZ - pointsRef.current.rotation.z) * 0.05;
      
      // Target scale (zoom in as you scroll)
      const targetScale = 1 + (scrollVal * 1.5);
      pointsRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      
      // Target position
      pointsRef.current.position.y = scrollVal * -5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color === "var(--accent)" ? "#10B981" : color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Scroll3DBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={['#050505', 10, 30]} />
        <ambientLight intensity={0.5} />
        <ScrollReactiveParticles color="#10b981" />
      </Canvas>
      
      {/* Cinematic Vignette/Gradient Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 100%)',
        opacity: 0.8,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default Scroll3DBackground;
