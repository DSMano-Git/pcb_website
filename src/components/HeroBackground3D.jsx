import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// A dynamic particle starfield background that slowly rotates
const ParticleSphere = (props) => {
  const ref = useRef();
  
  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const points = new Float32Array(5000 * 3);
    random.inSphere(points, { radius: 1.5 });
    return points;
  }, []);

  useFrame((state, delta) => {
    // Slow, majestic rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#a1a1aa"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const HeroBackground3D = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSphere />
      </Canvas>
      {/* Overlay gradient so text remains readable */}
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
};

export default HeroBackground3D;
