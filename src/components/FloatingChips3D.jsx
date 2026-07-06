import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleTorus = ({ color = "#38ef7d" }) => {
  const pointsRef = useRef();
  const particleCount = 5000; // Reduced from 12000
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const p = 3;
    const q = 4;
    const radius = 3;
    const tube = 1.2;

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const r = radius + tube * Math.cos(q * u);
      const x = r * Math.cos(p * u);
      const y = r * Math.sin(p * u);
      const z = tube * Math.sin(q * u);

      const scatter = 1.5;
      pos[i * 3] = x + (Math.random() - 0.5) * scatter;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * scatter;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * scatter;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.05;
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.z += delta * 0.05;
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
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FloatingChips3D = memo(({ color }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ParticleTorus color={color} />
      </Canvas>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 100%)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 20%, transparent 80%, var(--bg-primary) 100%)',
        zIndex: 1
      }} />
    </div>
  );
});

export default FloatingChips3D;
