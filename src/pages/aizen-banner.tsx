import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

// ── Rising soul-particle configs (purple reiatsu) ──
const SOUL_PARTICLES = [
  { id: 0,  x: 60,  drift: 10,  dur: 7.5, delay: 0.0,  size: 3.5, peakOp: 0.85 },
  { id: 1,  x: 130, drift: -8,  dur: 9.2, delay: 1.4,  size: 2.0, peakOp: 0.55 },
  { id: 2,  x: 210, drift: 14,  dur: 6.2, delay: 0.6,  size: 4.5, peakOp: 0.90 },
  { id: 3,  x: 290, drift: -12, dur: 8.8, delay: 2.2,  size: 2.5, peakOp: 0.65 },
  { id: 4,  x: 370, drift: 8,   dur: 7.0, delay: 0.3,  size: 3.0, peakOp: 0.75 },
  { id: 5,  x: 440, drift: -16, dur: 8.0, delay: 3.1,  size: 5.0, peakOp: 0.80 },
  { id: 6,  x: 500, drift: 6,   dur: 5.8, delay: 1.0,  size: 2.0, peakOp: 0.50 },
  { id: 7,  x: 560, drift: -10, dur: 9.5, delay: 2.7,  size: 3.5, peakOp: 0.70 },
  { id: 8,  x: 620, drift: 12,  dur: 6.5, delay: 0.5,  size: 2.5, peakOp: 0.60 },
  { id: 9,  x: 660, drift: -6,  dur: 7.8, delay: 1.8,  size: 4.0, peakOp: 0.85 },
  { id: 10, x: 100, drift: 10,  dur: 8.5, delay: 3.5,  size: 2.0, peakOp: 0.55 },
  { id: 11, x: 330, drift: -14, dur: 6.0, delay: 0.8,  size: 3.0, peakOp: 0.75 },
  { id: 12, x: 180, drift: -10, dur: 8.2, delay: 4.0,  size: 4.0, peakOp: 0.65 },
  { id: 13, x: 470, drift: 16,  dur: 7.2, delay: 2.5,  size: 2.5, peakOp: 0.80 },
  { id: 14, x: 580, drift: -8,  dur: 9.0, delay: 1.2,  size: 3.5, peakOp: 0.70 },
  { id: 15, x: 250, drift: 6,   dur: 6.8, delay: 3.8,  size: 2.0, peakOp: 0.50 },
  { id: 16, x: 410, drift: -12, dur: 7.5, delay: 0.9,  size: 3.0, peakOp: 0.60 },
  { id: 17, x: 150, drift: 14,  dur: 8.8, delay: 4.5,  size: 4.5, peakOp: 0.75 },
  { id: 18, x: 530, drift: -10, dur: 6.3, delay: 1.6,  size: 2.5, peakOp: 0.85 },
  { id: 19, x: 640, drift: 8,   dur: 7.0, delay: 2.0,  size: 3.0, peakOp: 0.70 },
];

function SoulParticle({ x, drift, dur, delay, size, peakOp }: (typeof SOUL_PARTICLES)[0]) {
  return (
    <circle
      className="soul-particle"
      cx={x}
      r={size / 2}
      fill="hsl(270,80%,70%)"
      style={{
        '--y-start': '260px',
        '--y-end': '-20px',
        '--delay': `${delay}s`,
        '--dur': `${dur}s`,
        '--particle-opacity': String(peakOp),
        '--particle-r': String(size / 2),
        '--drift': String(drift),
      } as React.CSSProperties}
    />
  );
}

// ── Hogyoku energy ring (SVG, rotates) ──
function HogyokuRing() {
  return (
    <div className="absolute pointer-events-none" style={{
      left: '180px', top: '50%', transform: 'translateY(-50%)',
      width: '260px', height: '260px', zIndex: 4,
    }}>
      <svg viewBox="0 0 260 260" className="w-full h-full">
        <defs>
          <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="hogyokuGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(270,100%,65%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(260,80%,40%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(250,60%,20%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Core glow */}
        <circle cx="130" cy="130" r="60" fill="url(#hogyokuGrad)" />

        {/* Outer ring — slow clockwise */}
        <g className="ring-spin" style={{ transformOrigin: '130px 130px', animationDuration: '50s' }}>
          <circle cx="130" cy="130" r="120" fill="none" stroke="hsl(270,60%,35%)" strokeWidth="0.8" strokeOpacity="0.4" />
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i * 15) * Math.PI / 180;
            const len = i % 3 === 0 ? 8 : 4;
            return (
              <line key={i}
                x1={130 + Math.cos(a) * 120} y1={130 + Math.sin(a) * 120}
                x2={130 + Math.cos(a) * (120 - len)} y2={130 + Math.sin(a) * (120 - len)}
                stroke="hsl(270,80%,55%)"
                strokeWidth={i % 3 === 0 ? '1.2' : '0.5'}
                strokeOpacity="0.5"
              />
            );
          })}
        </g>

        {/* Inner ring — counter-clockwise */}
        <g className="ring-spin-ccw" style={{ transformOrigin: '130px 130px', animationDuration: '30s' }}>
          <circle cx="130" cy="130" r="85" fill="none" stroke="hsl(270,80%,50%)" strokeWidth="1.2" strokeOpacity="0.55" />
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i * 60) * Math.PI / 180;
            const cx = 130 + Math.cos(a) * 85;
            const cy = 130 + Math.sin(a) * 85;
            return (
              <polygon key={i}
                points={`${cx},${cy - 4} ${cx + 3.5},${cy} ${cx},${cy + 4} ${cx - 3.5},${cy}`}
                fill="hsl(270,100%,75%)" opacity="0.7"
                transform={`rotate(${i * 60} ${cx} ${cy})`}
              />
            );
          })}
        </g>

        {/* Core dot */}
        <circle cx="130" cy="130" r="4"
          fill="hsl(270,100%,80%)"
          filter="url(#ringGlow)" />
      </svg>
    </div>
  );
}

// ── Hogyoku light beam ──
function HogyokuBeam() {
  return (
    <div className="absolute pointer-events-none hogyoku-beam"
      style={{
        left: '220px', top: '0', bottom: '0', width: '1px', zIndex: 3,
        background: 'linear-gradient(180deg, transparent 10%, hsl(270,100%,60%) 50%, transparent 90%)',
        animationDuration: '5s',
      }}
    />
  );
}

function AizenBannerInner() {
  return (
    <div className="w-full flex items-center justify-center"
      style={{ background: 'transparent' }}>

      {/* Discord Banner 680×240 */}
      <div
        data-testid="aizen-banner"
        className="relative overflow-hidden"
        style={{
          width: '680px',
          height: '240px',
          background: 'hsl(270,30%,5%)',
          borderRadius: '10px',
          boxShadow: [
            '0 0 0 1px hsl(270,40%,18%)',
            '0 0 60px 8px hsla(270,80%,40%,0.18)',
            '0 0 120px 16px hsla(260,60%,25%,0.10)',
            '0 32px 80px -8px rgba(0,0,0,0.95)',
          ].join(','),
        }}
      >

        {/* ── Background — deep purple radials ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 70% 90% at 20% 50%, hsla(270,40%,12%,0.8) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 65% at 80% 55%, hsla(260,35%,10%,0.6) 0%, transparent 55%)',
            'radial-gradient(ellipse 40% 50% at 50% 100%, hsla(250,30%,8%,0.5) 0%, transparent 60%)',
          ].join(','),
        }} />

        {/* Purple sheen highlight — top */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% -20%, hsla(270,60%,60%,0.08) 0%, transparent 70%)',
        }} />

        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="aizenGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="hsl(270,50%,60%)" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aizenGrid)" />
        </svg>

        {/* ── RISING SOUL PARTICLES ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 20 }}>
          {SOUL_PARTICLES.map(s => <SoulParticle key={s.id} {...s} />)}
        </svg>

        {/* ── AIZEN CHARACTER — right side, blended ── */}
        {/* Character ambient glow */}
        <div className="absolute pointer-events-none" style={{
          right: '-10px', top: '-20px',
          width: '400px', height: '280px',
          background: 'radial-gradient(ellipse 70% 85% at 55% 50%, hsla(270,50%,25%,0.3) 0%, transparent 65%)',
          zIndex: 2,
        }} />

        <motion.img
          src="/aizen.png"
          alt="Aizen"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="aizen-char-glow"
          style={{
            position: 'absolute',
            right: '-8px',
            bottom: '-12px',
            height: '260px',
            width: 'auto',
            zIndex: 6,
            mixBlendMode: 'screen',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 55%, transparent 85%)',
            maskImage: 'linear-gradient(to left, black 0%, black 55%, transparent 85%)',
            pointerEvents: 'none',
          }}
        />

        {/* Second layer — purple tint overlay on character */}
        <div className="absolute pointer-events-none" style={{
          right: '-8px', bottom: '-12px',
          width: '280px', height: '260px',
          background: 'linear-gradient(135deg, rgba(80,30,140,0.25), rgba(50,20,100,0.15))',
          mixBlendMode: 'color',
          zIndex: 7,
          WebkitMaskImage: 'linear-gradient(to left, black 0%, black 55%, transparent 85%)',
          maskImage: 'linear-gradient(to left, black 0%, black 55%, transparent 85%)',
        }} />

        {/* ── HOGYOKU EFFECTS ── */}
        <HogyokuRing />
        <HogyokuBeam />

        {/* ── Top border — purple gradient ── */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(270,50%,35%) 15%, hsl(270,80%,55%) 40%, hsl(265,100%,72%) 50%, hsl(270,80%,55%) 60%, hsl(270,50%,35%) 85%, transparent 100%)',
          opacity: 0.9,
          boxShadow: '0 0 14px 2px hsla(270,80%,55%,0.45)',
          zIndex: 25,
        }} />

        {/* ── Bottom border — subtle ── */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(270,40%,25%) 20%, hsl(270,60%,40%) 50%, hsl(270,40%,25%) 80%, transparent 100%)',
          opacity: 0.6,
          zIndex: 25,
        }} />

        {/* ── CONTENT ── */}
        <div className="relative flex flex-col justify-center h-full px-9 py-6" style={{ zIndex: 10 }}>

          {/* Badges */}
          <motion.div className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}>
            {[
              { label: 'Transcendent', color: 'hsl(270,70%,75%)', border: 'hsl(270,50%,35%)', bg: 'hsla(270,60%,50%,0.12)' },
              { label: 'Solo King',     color: 'hsl(265,65%,68%)', border: 'hsl(260,45%,32%)', bg: 'hsla(265,55%,45%,0.10)' },
            ].map(b => (
              <span key={b.label} style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: b.color,
                border: `1px solid ${b.border}`,
                background: b.bg, padding: '3px 10px', borderRadius: '3px',
                boxShadow: `0 0 7px ${b.border}`,
              }}>{b.label}</span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            data-testid="text-arc"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'hsl(270,40%,50%)', marginBottom: '3px',
              textShadow: '0 0 12px hsl(270,50%,50%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            Where Da Ladies at :/
          </motion.p>

          {/* Name — purple chrome shimmer */}
          <motion.h1
            data-testid="text-name"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="aizen-title-glow"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '68px', fontWeight: 700,
              lineHeight: 0.88, letterSpacing: '-0.03em',
              background: 'linear-gradient(120deg, hsl(280,100%,95%) 0%, hsl(270,80%,75%) 25%, hsl(265,70%,58%) 55%, hsl(270,80%,75%) 80%, hsl(280,100%,95%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            Hakim
          </motion.h1>

          {/* Traits */}
          <motion.div className="flex items-center mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            {['Where Da Ladies at :/'].map((t, i) => (
              <span key={i} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px', color: 'hsl(270,30%,45%)',
                letterSpacing: '0.04em',
              }}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* Online status — purple pulse */}
          <motion.div className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <span
              className="online-pulse"
              style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%',
                background: 'hsl(270,100%,65%)',
                animationDuration: '2.2s',
              }} />
            <span data-testid="text-status" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 400,
              color: 'hsl(270,30%,40%)', letterSpacing: '0.05em',
            }}>Online</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AizenBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <AizenBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(270,50%,45%)',
          background: 'hsl(270,20%,6%)',
          border: '1px solid hsl(270,20%,16%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(270,60%,40%)';
          e.currentTarget.style.color = 'hsl(270,70%,70%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(270,20%,16%)';
          e.currentTarget.style.color = 'hsl(270,50%,45%)';
        }}
      >REPLAY</button>
    </div>
  );
}
