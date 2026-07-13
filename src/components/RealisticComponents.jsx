import React from 'react';

// A photorealistic CSS rendering of a BGA CPU chip
export const CpuChip = ({ style }) => (
  <div style={{
    width: '180px',
    height: '180px',
    background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
    borderRadius: '4px',
    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'monospace',
    fontSize: '10px',
    textAlign: 'center',
    lineHeight: '1.4',
    position: 'absolute',
    border: '1px solid #111',
    transformStyle: 'preserve-3d',
    ...style
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>BoltzPCB</div>
    <div>BGA-9904X</div>
    <div>AI-PROC 3.2GHz</div>
    <div style={{ marginTop: '10px', width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.05))' }} />
  </div>
);

// A photorealistic CSS rendering of a white JST edge connector
export const JstConnector = ({ style, pins = 4 }) => (
  <div style={{
    width: `${pins * 20 + 10}px`,
    height: '35px',
    background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
    borderRadius: '2px',
    boxShadow: 'inset 0 2px 3px #fff, inset 0 -2px 4px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    border: '1px solid #ccc',
    borderBottom: '2px solid #bbb',
    transformStyle: 'preserve-3d',
    ...style
  }}>
    {Array.from({ length: pins }).map((_, i) => (
      <div key={i} style={{
        width: '4px',
        height: '18px',
        background: 'linear-gradient(to bottom, #d4af37, #aa8c2c)',
        borderRadius: '1px',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5), 0 2px 2px rgba(0,0,0,0.5)'
      }} />
    ))}
    <div style={{
      position: 'absolute',
      top: '4px',
      left: '4px',
      right: '4px',
      height: '8px',
      background: 'rgba(0,0,0,0.1)',
      borderRadius: '1px',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
    }} />
  </div>
);
