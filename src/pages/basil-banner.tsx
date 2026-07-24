import { motion } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';

// ── Falling petals ──
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  size: 6 + Math.random() * 10,
  speed: 5 + Math.random() * 5,
  delay: Math.random() * 6,
  opacity: 0.25 + Math.random() * 0.4,
  sway: 30 + Math.random() * 40,
  hue: 90 + Math.random() * 50,
}));

function Petal({ x, size, speed, delay, opacity, sway, hue }: (typeof PETALS)[0]) {
  return (
    <div
      className="absolute pointer-events-none petal-fall"
      style={{
        left: `${x}px`,
        width: `${size}px`,
        height: `${size * 0.5}px`,
        borderRadius: '50% 0 50% 0',
        background: `hsla(${hue},50%,65%,0.6)`,
        border: `0.5px solid hsla(${hue},40%,55%,0.3)`,
        zIndex: 3,
        '--duration': `${speed}s`,
        '--delay': `${delay}s`,
        '--sway': `${sway}px`,
        '--opacity': opacity,
        '--start-y': `-${size * 2}px`,
      } as React.CSSProperties}
    />
  );
}

// ── Floating leaf particles ──
const LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  y: 20 + Math.random() * 200,
  size: 3 + Math.random() * 4,
  dur: 6 + Math.random() * 4,
  delay: Math.random() * 5,
  drift: -15 + Math.random() * 30,
}));

function LeafParticle({ x, y, size, dur, delay, drift }: (typeof LEAVES)[0]) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`, top: `${y}px`,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50% 0 50% 0',
        background: `hsla(${100 + Math.random() * 30},40%,50%,0.3)`,
        zIndex: 2,
      }}
    >
      <motion.div
        style={{
          width: '100%', height: '100%',
          borderRadius: 'inherit',
          background: 'inherit',
        }}
        animate={{
          y: [0, -20 - Math.random() * 15, 0],
          x: [0, drift, 0],
          opacity: [0, 0.5, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: dur,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// ── Vine tendrils (SVG) ──
function VineTendrils() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, opacity: 0.12 }}>
      {/* Left vine */}
      <motion.path
        d="M0,240 Q30,200 20,150 Q10,100 30,60 Q50,20 40,0"
        fill="none" stroke="hsl(130,50%,40%)" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,200 Q40,170 35,130 Q30,90 50,50"
        fill="none" stroke="hsl(140,45%,35%)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.8, ease: 'easeInOut' }}
      />
      {/* Small leaves on vine */}
      {[120, 160, 200].map((cy, i) => (
        <motion.ellipse
          key={i} cx={25 + i * 3} cy={cy} rx="4" ry="6"
          fill="hsl(120,50%,35%)" opacity="0.3"
          transform={`rotate(${-20 + i * 15}, ${25 + i * 3}, ${cy})`}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.3, duration: 0.5 }}
        />
      ))}
      {/* Right vine */}
      <motion.path
        d="M680,0 Q650,40 660,90 Q670,140 650,190 Q630,230 640,240"
        fill="none" stroke="hsl(130,50%,40%)" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.7, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// ── Flower ring effect ──
function FlowerRing() {
  const petalCount = 12;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        right: '100px', top: '50%',
        transform: 'translateY(-50%)',
        width: '200px', height: '200px',
        zIndex: 3, opacity: 0.08,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 200 200" width="200" height="200">
        {Array.from({ length: petalCount }, (_, i) => {
          const angle = (i * 360 / petalCount) * Math.PI / 180;
          const cx = 100 + Math.cos(angle) * 70;
          const cy = 100 + Math.sin(angle) * 70;
          return (
            <ellipse key={i} cx={cx} cy={cy} rx="18" ry="10"
              fill="hsl(120,60%,50%)"
              transform={`rotate(${i * 30}, ${cx}, ${cy})`}
            />
          );
        })}
        <circle cx="100" cy="100" r="20" fill="hsl(45,80%,65%)" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

// ── Glow orb (ambient) ──
function GlowOrbs() {
  return (
    <>
      {[
        { x: '15%', y: '30%', size: 120, color: '120,50%,50%', delay: 0 },
        { x: '75%', y: '60%', size: 90, color: '100,45%,45%', delay: 1.5 },
        { x: '50%', y: '80%', size: 150, color: '130,40%,40%', delay: 3 },
      ].map((o, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: o.x, top: o.y,
            width: `${o.size}px`, height: `${o.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, hsla(${o.color},0.08) 0%, transparent 70%)`,
            zIndex: 1,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 5 + i,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

// ── Sunlight shafts — golden-green god rays through canopy ──
// ── Rain on Glass — realistic droplets ──
function RainOnGlass() {
  const sitting = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: 3 + Math.random() * 94,
    y: 3 + Math.random() * 65,
    w: 4 + Math.random() * 7,
    h: 5 + Math.random() * 9,
    opacity: 0.3 + Math.random() * 0.35,
    delay: Math.random() * 2,
  }));

  const sliding = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    startY: -8 - Math.random() * 15,
    w: 5 + Math.random() * 7,
    h: 7 + Math.random() * 10,
    speed: 4 + Math.random() * 5,
    delay: 0.5 + Math.random() * 4,
    trailLen: 40 + Math.random() * 50,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15, overflow: 'hidden' }}>
      {/* Sitting droplets */}
      {sitting.map(d => (
        <div
          key={`sit-${d.id}`}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.w}px`,
            height: `${d.h}px`,
            borderRadius: '45% 45% 50% 50%',
            background: `radial-gradient(ellipse 60% 50% at 40% 35%, 
              hsla(0,0%,100%,${d.opacity * 0.9}) 0%, 
              hsla(0,0%,100%,${d.opacity * 0.3}) 15%, 
              hsla(130,20%,70%,${d.opacity * 0.12}) 40%, 
              hsla(0,0%,50%,${d.opacity * 0.08}) 70%, 
              transparent 100%)`,
            boxShadow: `
              inset 0 -2px 3px hsla(0,0%,0%,0.12),
              inset 0 1px 1px hsla(0,0%,100%,${d.opacity * 0.5}),
              0 2px 4px hsla(0,0%,0%,0.2),
              0 0 1px hsla(0,0%,0%,0.15)`,
            border: `0.5px solid hsla(0,0%,100%,${d.opacity * 0.2})`,
          }}
        />
      ))}

      {/* Sliding droplets */}
      {sliding.map(d => (
        <motion.div
          key={`slide-${d.id}`}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.startY}%`,
          }}
          animate={{
            top: [`${d.startY}%`, `${88 + Math.random() * 10}%`],
          }}
          transition={{
            duration: d.speed,
            delay: d.delay,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatDelay: 1.5 + Math.random() * 3,
          }}
        >
          {/* Droplet head */}
          <div style={{
            width: `${d.w}px`,
            height: `${d.h}px`,
            borderRadius: '45% 45% 50% 50%',
            background: `radial-gradient(ellipse 55% 45% at 40% 30%, 
              hsla(0,0%,100%,${d.opacity}) 0%, 
              hsla(0,0%,100%,${d.opacity * 0.25}) 18%, 
              hsla(130,20%,70%,${d.opacity * 0.1}) 45%, 
              hsla(0,0%,50%,${d.opacity * 0.08}) 75%, 
              transparent 100%)`,
            boxShadow: `
              inset 0 -2px 3px hsla(0,0%,0%,0.15),
              inset 0 1px 1px hsla(0,0%,100%,${d.opacity * 0.6}),
              0 2px 5px hsla(0,0%,0%,0.25),
              0 0 1px hsla(0,0%,0%,0.2)`,
            border: `0.5px solid hsla(0,0%,100%,${d.opacity * 0.25})`,
          }} />
          {/* Trail */}
          <div style={{
            position: 'absolute',
            left: `${d.w * 0.3}px`,
            top: `${d.h - 1}px`,
            width: `${d.w * 0.25}px`,
            height: `${d.trailLen}px`,
            background: `linear-gradient(180deg, 
              hsla(0,0%,100%,${d.opacity * 0.2}) 0%, 
              hsla(0,0%,80%,${d.opacity * 0.08}) 60%, 
              transparent 100%)`,
            borderRadius: '0 0 3px 3px',
          }} />
        </motion.div>
      ))}
    </div>
  );
}

function SunlightShafts() {
  const shafts = [
    { left: '10%', width: 60, angle: -22, opacity: 0.10, dur: 12, delay: 0 },
    { left: '28%', width: 90, angle: -18, opacity: 0.14, dur: 15, delay: 0.3 },
    { left: '50%', width: 45, angle: -25, opacity: 0.09, dur: 10, delay: 0.6 },
    { left: '65%', width: 75, angle: -20, opacity: 0.12, dur: 14, delay: 0.2 },
    { left: '82%', width: 55, angle: -16, opacity: 0.11, dur: 11, delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, overflow: 'hidden' }}>
      {shafts.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: s.left,
            top: '-40%',
            width: `${s.width}px`,
            height: '200%',
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsla(80,60%,65%,${s.opacity}) 20%, 
              hsla(100,50%,55%,${s.opacity * 1.4}) 40%, 
              hsla(80,60%,60%,${s.opacity * 0.8}) 60%, 
              hsla(120,40%,50%,${s.opacity * 0.3}) 80%, 
              transparent 100%)`,
            transform: `rotate(${s.angle}deg)`,
            filter: 'blur(5px)',
          }}
          animate={{
            opacity: [0.1, 1, 0.6, 1, 0.1],
            x: [-30, 20, -10, 15, -30],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Dust motes in the light — tiny bright dots that drift within the shafts */}
      {Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 1.5 + Math.random() * 2,
        dur: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      })).map(m => (
        <motion.div
          key={`mote-${m.id}`}
          style={{
            position: 'absolute',
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            borderRadius: '50%',
            background: 'hsla(80,70%,75%,0.9)',
            boxShadow: `0 0 ${m.size * 3}px hsla(80,60%,65%,0.6)`,
          }}
          animate={{
            y: [0, -15 - Math.random() * 10, 5, -10, 0],
            x: [0, 8 - Math.random() * 16, 4, -6, 0],
            opacity: [0, 1, 0.5, 0.9, 0],
            scale: [0.5, 1, 0.7, 1, 0.5],
          }}
          transition={{
            duration: m.dur,
            delay: m.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Camera Flash overlay ──
function CameraFlash({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      {/* Screen-wide white flash */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, hsla(0,0%,100%,0.85) 0%, hsla(120,20%,90%,0.5) 35%, transparent 70%)',
        animation: 'cameraFlash 0.6s ease-out forwards',
        zIndex: 30,
      }} />
      {/* Lens flare burst from camera center */}
      <div className="absolute pointer-events-none" style={{
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsla(0,0%,100%,0.6) 0%, hsla(130,30%,80%,0.3) 25%, transparent 55%)',
        animation: 'lensFlare 0.7s ease-out forwards',
        zIndex: 31,
      }} />
      {/* Cross flare lines */}
      <div className="absolute pointer-events-none" style={{
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px', height: '2px',
        background: 'linear-gradient(90deg, transparent 15%, hsla(0,0%,100%,0.4) 45%, hsla(0,0%,100%,0.7) 50%, hsla(0,0%,100%,0.4) 55%, transparent 85%)',
        animation: 'crossFlareH 0.5s ease-out forwards',
        zIndex: 31,
      }} />
      <div className="absolute pointer-events-none" style={{
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '2px', height: '300px',
        background: 'linear-gradient(180deg, transparent 15%, hsla(0,0%,100%,0.35) 45%, hsla(0,0%,100%,0.6) 50%, hsla(0,0%,100%,0.35) 55%, transparent 85%)',
        animation: 'crossFlareV 0.5s ease-out forwards',
        zIndex: 31,
      }} />
      {/* Small bright ring */}
      <div className="absolute pointer-events-none" style={{
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60px', height: '60px',
        borderRadius: '50%',
        border: '2px solid hsla(0,0%,100%,0.5)',
        animation: 'ringExpand 0.5s ease-out forwards',
        zIndex: 31,
      }} />
    </>
  );
}

function Butterfly() {
  return (
    <div className="absolute pointer-events-none" style={{ zIndex: 15 }}>
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="butterfly-float">
        {/* Left wing */}
        <ellipse cx="8" cy="7" rx="6" ry="5.5"
          fill="hsla(140,50%,65%,0.7)" stroke="hsla(130,40%,50%,0.5)" strokeWidth="0.4"
          className="wing-flap-left" style={{ transformOrigin: '12px 9px' }} />
        <ellipse cx="7" cy="11" rx="4.5" ry="4"
          fill="hsla(120,50%,60%,0.6)" stroke="hsla(110,40%,45%,0.4)" strokeWidth="0.3"
          className="wing-flap-left" style={{ transformOrigin: '12px 9px' }} />
        {/* Right wing */}
        <ellipse cx="16" cy="7" rx="6" ry="5.5"
          fill="hsla(140,50%,65%,0.7)" stroke="hsla(130,40%,50%,0.5)" strokeWidth="0.4"
          className="wing-flap-right" style={{ transformOrigin: '12px 9px' }} />
        <ellipse cx="17" cy="11" rx="4.5" ry="4"
          fill="hsla(120,50%,60%,0.6)" stroke="hsla(110,40%,45%,0.4)" strokeWidth="0.3"
          className="wing-flap-right" style={{ transformOrigin: '12px 9px' }} />
        {/* Wing patterns */}
        <circle cx="8" cy="6.5" r="2" fill="hsla(0,0%,100%,0.15)" />
        <circle cx="16" cy="6.5" r="2" fill="hsla(0,0%,100%,0.15)" />
        <circle cx="7" cy="11" r="1.2" fill="hsla(0,0%,100%,0.1)" />
        <circle cx="17" cy="11" r="1.2" fill="hsla(0,0%,100%,0.1)" />
        {/* Body */}
        <ellipse cx="12" cy="9" rx="1" ry="4" fill="hsla(130,30%,30%,0.8)" />
        {/* Antennae */}
        <path d="M11.5 5 Q10 2 9 1" stroke="hsla(130,30%,35%,0.6)" strokeWidth="0.4" fill="none" />
        <path d="M12.5 5 Q14 2 15 1" stroke="hsla(130,30%,35%,0.6)" strokeWidth="0.4" fill="none" />
        <circle cx="9" cy="1" r="0.6" fill="hsla(130,40%,50%,0.6)" />
        <circle cx="15" cy="1" r="0.6" fill="hsla(130,40%,50%,0.6)" />
      </svg>
      {/* Trail sparkles */}
      <div className="butterfly-trail" />
    </div>
  );
}

function BasilBannerInner() {
  const [flash, setFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      flashTimer.current = setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 700);
        schedule();
      }, 4000 + Math.random() * 1500);
    };
    schedule();
    return () => { if (flashTimer.current) clearTimeout(flashTimer.current); };
  }, []);

  return (
    <div className="w-full flex items-center justify-center"
      style={{ background: 'transparent' }}>

      {/* Discord Banner 680×240 */}
      <div
        data-testid="basil-banner"
        className="relative overflow-hidden"
        style={{
          width: '680px', height: '240px',
          background: 'hsl(140,25%,5%)',
          borderRadius: '10px',
          boxShadow: [
            '0 0 0 1px hsl(130,30%,15%)',
            '0 0 60px 8px hsla(130,60%,35%,0.15)',
            '0 0 120px 16px hsla(140,40%,25%,0.08)',
            '0 32px 80px -8px rgba(0,0,0,0.95)',
          ].join(','),
        }}
      >

        {/* ── Background — deep green radials ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 70% 90% at 20% 50%, hsla(130,35%,10%,0.8) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 65% at 80% 55%, hsla(140,30%,8%,0.6) 0%, transparent 55%)',
            'radial-gradient(ellipse 40% 50% at 50% 100%, hsla(120,25%,7%,0.5) 0%, transparent 60%)',
          ].join(','),
        }} />

        {/* Green sheen — top */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% -20%, hsla(130,60%,55%,0.06) 0%, transparent 70%)',
        }} />

        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.03 }}>
          <defs>
            <pattern id="basilGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="hsl(130,50%,50%)" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#basilGrid)" />
        </svg>

        {/* Vine tendrils */}
        <VineTendrils />

        {/* ── Sunlight shafts — god rays through canopy ── */}
        <SunlightShafts />

        {/* ── Rain on Glass ── */}
        <RainOnGlass />

        {/* Glow orbs */}
        <GlowOrbs />

        {/* Flower ring */}
        <FlowerRing />

        {/* ── Falling petals ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 5 }}>
          {PETALS.map(p => <Petal key={p.id} {...p} />)}
        </svg>

        {/* ── Floating leaves ── */}
        {LEAVES.map(l => <LeafParticle key={l.id} {...l} />)}

        {/* ── Butterfly ── */}
        <Butterfly />

        {/* ── Camera frame — dead center (Basil's photographer trait) ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%', top: '50%',
            marginLeft: '-70px',             marginTop: '-58px',
            width: '140px', height: '110px',
            zIndex: 32,
          }}
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
          <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
            {/* Camera body */}
            <rect x="15" y="25" width="110" height="70" rx="8"
              stroke="hsla(130,40%,40%,0.25)" strokeWidth="1.2" fill="none" />
            {/* Viewfinder bump */}
            <rect x="50" y="15" width="30" height="14" rx="3"
              stroke="hsla(130,35%,35%,0.2)" strokeWidth="1" fill="none" />
            {/* Lens outer ring */}
            <circle cx="70" cy="60" r="24"
              stroke="hsla(130,45%,45%,0.3)" strokeWidth="1.5" fill="none" />
            {/* Lens inner ring */}
            <circle cx="70" cy="60" r="16"
              stroke="hsla(120,40%,40%,0.25)" strokeWidth="1" fill="none" />
            {/* Lens center dot */}
            <circle cx="70" cy="60" r="4"
              fill="hsla(130,50%,50%,0.15)" />
            {/* Lens reflection */}
            <circle cx="64" cy="54" r="2"
              fill="hsla(0,0%,100%,0.12)" />
            {/* Flash */}
            <rect x="100" y="30" width="10" height="6" rx="1"
              stroke="hsla(130,35%,35%,0.18)" strokeWidth="0.8" fill="none" />
            {/* Shutter button */}
            <circle cx="90" cy="20" r="4"
              stroke="hsla(130,40%,40%,0.22)" strokeWidth="1" fill="none" />
            {/* Strap loops */}
            <circle cx="12" cy="45" r="3"
              stroke="hsla(130,35%,35%,0.15)" strokeWidth="0.8" fill="none" />
            <circle cx="128" cy="45" r="3"
              stroke="hsla(130,35%,35%,0.15)" strokeWidth="0.8" fill="none" />
          </svg>
          {/* Subtle glow behind camera */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px', height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsla(130,40%,40%,0.08) 0%, transparent 70%)',
            zIndex: -1,
          }} />
          </motion.div>
        </div>

        {/* ── Camera flash effect ── */}
        <CameraFlash active={flash} />

        {/* ── BASIL CHARACTER — right side ── */}
        <div className="absolute pointer-events-none" style={{
          right: '-10px', top: '-20px',
          width: '420px', height: '300px',
          background: 'radial-gradient(ellipse 70% 85% at 55% 50%, hsla(130,45%,22%,0.4) 0%, transparent 60%)',
          zIndex: 2,
        }} />

        <motion.img
          src="/basil.png"
          alt="Basil"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            right: '-8px', bottom: '-12px',
            height: '260px', width: 'auto',
            zIndex: 6,
            mixBlendMode: 'screen',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
            maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
            filter: 'drop-shadow(0 0 20px hsla(130,65%,50%,0.5)) drop-shadow(0 0 45px hsla(120,45%,40%,0.3)) drop-shadow(0 0 80px hsla(140,40%,35%,0.15))',
            pointerEvents: 'none',
          }}
        />

        {/* Green tint overlay on character */}
        <div className="absolute pointer-events-none" style={{
          right: '-8px', bottom: '-12px',
          width: '300px', height: '260px',
          background: 'linear-gradient(135deg, rgba(60,140,70,0.25), rgba(40,100,50,0.2), rgba(20,60,30,0.1))',
          mixBlendMode: 'color',
          zIndex: 7,
          WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
          maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
        }} />

        {/* ── Top border — green gradient ── */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(130,45%,30%) 15%, hsl(130,70%,50%) 40%, hsl(120,80%,65%) 50%, hsl(130,70%,50%) 60%, hsl(130,45%,30%) 85%, transparent 100%)',
          opacity: 0.85,
          boxShadow: '0 0 14px 2px hsla(130,60%,45%,0.4)',
          zIndex: 25,
        }} />

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(130,35%,20%) 20%, hsl(130,50%,35%) 50%, hsl(130,35%,20%) 80%, transparent 100%)',
          opacity: 0.5,
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
              { label: 'Gardener', color: 'hsl(130,60%,65%)', border: 'hsl(130,40%,30%)', bg: 'hsla(130,50%,45%,0.12)' },
              { label: 'Flower Child', color: 'hsl(100,50%,60%)', border: 'hsl(110,35%,28%)', bg: 'hsla(100,40%,40%,0.10)' },
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

          {/* Stats */}
          <motion.div className="flex items-center gap-3 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
            {[
              { label: 'Love', value: '100%', color: 'hsl(340,70%,65%)', icon: '♥' },
              { label: 'Friendship', value: '100%', color: 'hsl(130,60%,60%)', icon: '✦' },
              { label: 'UWU', value: 'MAX', color: 'hsl(280,55%,65%)', icon: '✿' },
            ].map(s => (
              <span key={s.label} style={{
                color: s.color,
                textShadow: `0 0 8px ${s.color}`,
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <span style={{ fontSize: '8px' }}>{s.icon}</span>
                {s.label} {s.value}
              </span>
            ))}
          </motion.div>

          {/* Name — animated gradient flow */}
          <div style={{ marginBottom: '4px' }}>
            <motion.h1
              data-testid="text-name"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="basil-gradient-flow"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '68px', fontWeight: 700,
                lineHeight: 0.88, letterSpacing: '-0.03em',
                backgroundImage: 'linear-gradient(90deg, hsl(140,100%,90%) 0%, hsl(130,70%,60%) 15%, hsl(120,60%,45%) 30%, hsl(90,55%,55%) 45%, hsl(130,70%,60%) 55%, hsl(160,65%,50%) 65%, hsl(140,100%,90%) 80%, hsl(120,60%,45%) 90%, hsl(140,100%,90%) 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px hsla(130,60%,50%,0.35))',
              }}>
              Basil
            </motion.h1>
          </div>

          {/* Online status — green pulse */}
          <motion.div className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <span
              style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%',
                background: 'hsl(130,100%,55%)',
                boxShadow: '0 0 8px hsla(130,100%,50%,0.5)',
                animation: 'onlinePulse 2.2s ease-in-out infinite',
              }} />
            <span data-testid="text-status" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 400,
              color: 'hsl(130,25%,38%)', letterSpacing: '0.05em',
            }}>Online</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function BasilBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <BasilBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(130,50%,45%)',
          background: 'hsl(130,20%,6%)',
          border: '1px solid hsl(130,20%,16%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(130,60%,40%)';
          e.currentTarget.style.color = 'hsl(130,70%,70%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(130,20%,16%)';
          e.currentTarget.style.color = 'hsl(130,50%,45%)';
        }}
      >REPLAY</button>
    </div>
  );
}
