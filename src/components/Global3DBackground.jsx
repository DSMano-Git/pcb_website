import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

const ParticleSphere = ({ active }) => {
  const ref = useRef();
  const sphere = useMemo(() => {
    const points = new Float32Array(3000 * 3); // Reduced from 5000
    random.inSphere(points, { radius: 1.5 });
    return points;
  }, []);

  useFrame((state, delta) => {
    if (!active) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a1a1aa"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={active ? 0.8 : 0}
        />
      </Points>
    </group>
  );
};

const DataWave = ({ active }) => {
  const pointsRef = useRef();
  const particleCount = 3000; // Reduced from 10000
  const frameCounter = useRef(0);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const y = Math.sin(x) * Math.cos(z) * 0.5;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!active || !pointsRef.current) return;
    
    // Only update positions every 3rd frame — wave is slow enough that it looks fine
    frameCounter.current++;
    if (frameCounter.current % 3 !== 0) {
      pointsRef.current.rotation.y += delta * 0.05;
      return;
    }
    
    const time = state.clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      const x = posArr[i * 3];
      const z = posArr[i * 3 + 2];
      posArr[i * 3 + 1] = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 1.5;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={pointsRef} position={[0, -2, -5]} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#38ef7d"
        transparent
        opacity={active ? 0.6 : 0}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Global3DBackground = memo(() => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 1.5]}  /* Cap pixel ratio — huge perf win on Retina displays */
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ParticleSphere active={isHome} />
        <DataWave active={!isHome} />
      </Canvas>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 100%)',
        zIndex: 1
      }} />
    </div>
  );
});

export default Global3DBackground;
