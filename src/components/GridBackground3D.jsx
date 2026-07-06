import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleCloud = (props) => {
  const ref = useRef();
  
  const particles = useMemo(() => {
    const points = new Float32Array(4000 * 3); // Reduced from 8000
    random.inBox(points, { sides: [3, 3, 3] });
    return points;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#b026ff"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
};

const GridBackground3D = memo(() => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 1.5] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ParticleCloud />
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
});

export default GridBackground3D;
