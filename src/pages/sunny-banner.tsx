import { motion } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';

// ── Static / VHS noise overlay ──
function StaticNoise() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, mixBlendMode: 'overlay', opacity: 0.06 }}>
      <svg width="100%" height="100%">
        <filter id="sunnyNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed={Date.now() % 1000} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sunnyNoise)" />
      </svg>
    </div>
  );
}

// ── VHS scan lines ──
function ScanLines() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
      zIndex: 3, opacity: 0.5,
    }} />
  );
}

// ── Floating shadow particles ──
const SHADOWS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  y: Math.random() * 240,
  size: 2 + Math.random() * 5,
  speed: 8 + Math.random() * 12,
  delay: Math.random() * 6,
  drift: -20 + Math.random() * 40,
}));

function ShadowParticle({ x, y, size, speed, delay, drift }: (typeof SHADOWS)[0]) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`, top: `${y}px`,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        animation: `sunnyShadowFloat ${speed}s ease-in-out ${delay}s infinite`,
        '--shadow-drift': `${drift}px`,
      } as React.CSSProperties}
    />
  );
}

// ── Stairs silhouette ──
function StairsSilhouette() {
  return (
    <svg className="absolute bottom-0 right-0 pointer-events-none" width="120" height="80" viewBox="0 0 120 80" style={{ opacity: 0.08, zIndex: 1 }}>
      <path d="M120 80 L120 60 L100 60 L100 45 L80 45 L80 30 L60 30 L60 15 L40 15 L40 0 L0 0 L0 80 Z"
        fill="white" />
    </svg>
  );
}

// ── Glitch flicker ──
function GlitchFlicker() {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      timer.current = setTimeout(() => {
        setActive(true);
        setTimeout(() => setActive(false), 80 + Math.random() * 120);
        schedule();
      }, 3000 + Math.random() * 4000);
    };
    schedule();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      zIndex: 20,
      background: `linear-gradient(${Math.random() * 360}deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)`,
      transform: `translateX(${(Math.random() - 0.5) * 6}px)`,
    }} />
  );
}

// ── White hand/figure shadow in background ──
function ShadowFigure() {
  return (
    <div className="absolute pointer-events-none" style={{
      right: '40px', bottom: '0px',
      width: '200px', height: '200px',
      zIndex: 1,
    }}>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.04 }}>
        {/* Abstract shadowy figure */}
        <circle cx="100" cy="50" r="25" fill="white" />
        <rect x="80" y="70" width="40" height="70" rx="5" fill="white" />
        <rect x="70" y="80" width="15" height="50" rx="3" fill="white" transform="rotate(-10 70 80)" />
        <rect x="115" y="80" width="15" height="50" rx="3" fill="white" transform="rotate(10 115 80)" />
        <rect x="82" y="135" width="14" height="55" rx="3" fill="white" transform="rotate(-5 82 135)" />
        <rect x="105" y="135" width="14" height="55" rx="3" fill="white" transform="rotate(5 105 135)" />
      </svg>
    </div>
  );
}

// ── Vignette ──
function Vignette() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
      zIndex: 4,
    }} />
  );
}

// ── White horizontal line glitch ──
function HGlitch() {
  const [y, setY] = useState(120);
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      timer.current = setTimeout(() => {
        setY(Math.random() * 240);
        setActive(true);
        setTimeout(() => setActive(false), 60 + Math.random() * 100);
        schedule();
      }, 2000 + Math.random() * 3000);
    };
    schedule();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  if (!active) return null;
  return (
    <div className="absolute left-0 right-0 pointer-events-none" style={{
      top: `${y}px`, height: '1px',
      background: 'rgba(255,255,255,0.15)',
      zIndex: 15,
    }} />
  );
}

// ── Hanging lightbulb ──
function HangingLightbulb() {
  const [flicker, setFlicker] = useState(0.6);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      timer.current = setTimeout(() => {
        setFlicker(0.05 + Math.random() * 0.15);
        setTimeout(() => setFlicker(0.5 + Math.random() * 0.3), 60 + Math.random() * 100);
        setTimeout(() => setFlicker(0.1 + Math.random() * 0.1), 150 + Math.random() * 80);
        setTimeout(() => setFlicker(0.55 + Math.random() * 0.25), 300 + Math.random() * 120);
        schedule();
      }, 4000 + Math.random() * 5000);
    };
    schedule();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  return (
    <div className="absolute pointer-events-none" style={{
      left: '325px', top: '0px', zIndex: 8,
    }}>
      {/* Wire */}
      <div style={{
        position: 'absolute', left: '14px', top: '0px',
        width: '1px', height: '30px',
        background: 'linear-gradient(180deg, hsl(0,0%,20%) 0%, hsl(0,0%,12%) 100%)',
      }} />
      {/* Bulb */}
      <svg width="30" height="40" viewBox="0 0 30 40" style={{ position: 'absolute', top: '28px', left: '0px' }}>
        {/* Bulb glass */}
        <path d="M15 3 Q8 3 6 12 Q4 18 8 24 L22 24 Q26 18 24 12 Q22 3 15 3Z"
          fill={`rgba(255,255,240,${flicker * 0.3})`}
          stroke={`rgba(255,255,255,${flicker * 0.5})`} strokeWidth="0.5" />
        {/* Glow */}
        <circle cx="15" cy="14" r="20"
          fill={`rgba(255,255,230,${flicker * 0.04})`} />
        {/* Filament */}
        <path d="M12 14 Q14 10 15 14 Q16 18 18 14"
          stroke={`rgba(255,255,200,${flicker * 0.8})`} strokeWidth="0.6" fill="none" />
        {/* Base */}
        <rect x="10" y="24" width="10" height="4" rx="1"
          fill="hsl(0,0%,15%)" stroke="hsl(0,0%,22%)" strokeWidth="0.3" />
        <rect x="11" y="28" width="8" height="3" rx="1"
          fill="hsl(0,0%,12%)" stroke="hsl(0,0%,18%)" strokeWidth="0.3" />
        <path d="M12 31 L18 31 L16 36 L14 36 Z"
          fill="hsl(0,0%,10%)" />
      </svg>
      {/* Ambient glow on ceiling */}
      <div style={{
        position: 'absolute', left: '-20px', top: '-5px',
        width: '70px', height: '40px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255,255,230,${flicker * 0.06}) 0%, transparent 70%)`,
      }} />
    </div>
  );
}

// ── Hanging lightbulb ──

// ── Falling black feathers ──
function FallingFeathers() {
  const feathers = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 640,
    delay: Math.random() * 10,
    dur: 7 + Math.random() * 6,
    size: 10 + Math.random() * 14,
    drift: -40 + Math.random() * 80,
    rot: Math.random() * 360,
    opacity: 0.06 + Math.random() * 0.08,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
      {feathers.map(f => (
        <div key={f.id} style={{
          position: 'absolute',
          left: `${f.x}px`, top: '-30px',
          animation: `featherFall ${f.dur}s linear ${f.delay}s infinite`,
          opacity: 0,
        }}>
          <svg width={f.size} height={f.size * 2.2} viewBox="0 0 14 30" fill="none"
            style={{ transform: `rotate(${f.rot}deg)`, opacity: f.opacity }}>
            {/* Quill */}
            <line x1="7" y1="0" x2="7" y2="30"
              stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            {/* Left vane */}
            <path d="M7 4 Q2 8 1 14 Q0 18 2 22 Q4 26 7 28"
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
            {/* Right vane */}
            <path d="M7 4 Q12 8 13 14 Q14 18 12 22 Q10 26 7 28"
              fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── Heartbeat line (normal → slowing → death flatline) ──
function HeartbeatLine() {
  const [phase, setPhase] = useState<'normal' | 'slowing' | 'dying' | 'flatline'>('normal');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      // Normal beating
      setPhase('normal');
      timer.current = setTimeout(() => {
        // Slowing down
        setPhase('slowing');
        timer.current = setTimeout(() => {
          // Last few weak beats
          setPhase('dying');
          timer.current = setTimeout(() => {
            // Flatline
            setPhase('flatline');
            timer.current = setTimeout(cycle, 3000 + Math.random() * 1500);
          }, 1500);
        }, 1500);
      }, 2500 + Math.random() * 1500);
    };
    cycle();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  // Single 82px beat unit, repeated for seamless tiling
  const unit = (ox: number, s: number) => [
    `L${ox} 22`,       // flat start
    `L${ox+8} 22`,
    `L${ox+14} ${22-12*s} L${ox+18} ${22+12*s}`, // small spike
    `L${ox+22} ${22-16*s} L${ox+26} ${22+14*s}`, // big spike
    `L${ox+30} ${22-4*s}`,
    `L${ox+36} 22`,    // back to baseline
    `L${ox+82} 22`,    // flat to next beat
  ].join(' ');

  const buildPath = (s: number) => {
    let d = 'M-10 22';
    for (let i = 0; i < 11; i++) {
      d += ' ' + unit(i * 82, s);
    }
    return d;
  };

  const beatPath = buildPath(1);
  const weakBeatPath = buildPath(0.5);

  const speed = phase === 'normal' ? '2.8s' : '4.5s';
  const currentPath = phase === 'dying' ? weakBeatPath : beatPath;
  const opacity = phase === 'flatline' ? 0.25 : phase === 'dying' ? 0.4 : phase === 'slowing' ? 0.5 : 0.6;

  return (
    <div className="absolute pointer-events-none" style={{
      bottom: '22px', left: '0px', width: '680px', height: '60px',
      zIndex: 6, opacity,
      transition: 'opacity 1.5s ease-in',
    }}>
      <svg width="680" height="60" viewBox="-10 -6 700 60" style={{ overflow: 'hidden' }}>
        {phase !== 'flatline' ? (
          <>
            <path d={currentPath}
              stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: 'blur(3px)', animation: `heartbeatScroll ${speed} linear infinite` }}
            />
            <path d={currentPath}
              stroke={phase === 'dying' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)'} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: `heartbeatScroll ${speed} linear infinite` }}
            />
          </>
        ) : (
          <>
            <line x1="0" y1="22" x2="680" y2="22"
              stroke="rgba(255,255,255,0.04)" strokeWidth="6"
              style={{ filter: 'blur(3px)', animation: 'flatlinePulse 3s ease-in-out infinite' }}
            />
            <line x1="0" y1="22" x2="680" y2="22"
              stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"
              style={{ animation: 'flatlinePulse 3s ease-in-out infinite' }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

// ── Permanent fracture overlay ──
function FractureOverlay() {
  const cracks = [
    // Main diagonal crack
    { d: 'M0 60 L80 70 L140 55 L200 75 L260 62 L320 80 L380 68 L440 78 L500 65 L560 72 L620 60 L680 70', w: 1.2, o: 0.2 },
    // Branch from top-left
    { d: 'M80 70 L95 40 L110 20', w: 0.7, o: 0.15 },
    // Branch mid
    { d: 'M200 75 L215 100 L230 130 L225 160', w: 0.6, o: 0.12 },
    // Branch mid-right
    { d: 'M380 68 L400 45 L410 25', w: 0.5, o: 0.1 },
    // Branch lower
    { d: 'M320 80 L340 110 L350 150 L345 190', w: 0.6, o: 0.11 },
    // Cross crack
    { d: 'M0 150 L60 145 L120 155 L180 140 L240 152 L300 145 L360 158 L420 148 L480 155 L540 142 L600 150 L680 145', w: 0.9, o: 0.14 },
    // Cross branch up
    { d: 'M120 155 L135 130 L145 110', w: 0.4, o: 0.09 },
    // Cross branch down
    { d: 'M420 148 L430 180 L445 210 L440 240', w: 0.5, o: 0.1 },
    // Vertical crack
    { d: 'M400 0 L395 30 L405 60 L398 90 L408 120 L400 150 L410 180 L395 210 L405 240', w: 0.8, o: 0.13 },
    // Small cracks
    { d: 'M550 0 L545 25 L555 50', w: 0.4, o: 0.08 },
    { d: 'M650 100 L640 130 L655 160 L645 200', w: 0.5, o: 0.09 },
    { d: 'M50 200 L80 195 L110 210 L90 240', w: 0.4, o: 0.07 },
    // Hairline micro cracks
    { d: 'M160 55 L170 45', w: 0.3, o: 0.06 },
    { d: 'M260 62 L275 50 L280 35', w: 0.3, o: 0.06 },
    { d: 'M500 65 L510 50', w: 0.3, o: 0.05 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
      <svg width="680" height="240" viewBox="0 0 680 240" fill="none">
        {cracks.map((c, i) => (
          <path key={i} d={c.d}
            stroke={`rgba(255,255,255,${c.o})`} strokeWidth={c.w} fill="none" strokeLinecap="round"
          />
        ))}
        {/* Glow layer on main cracks */}
        <path d={cracks[0].d}
          stroke="rgba(255,255,255,0.04)" strokeWidth="6" fill="none"
          style={{ filter: 'blur(3px)' }}
        />
        <path d={cracks[5].d}
          stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="none"
          style={{ filter: 'blur(3px)' }}
        />
        <path d={cracks[9].d}
          stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="none"
          style={{ filter: 'blur(3px)' }}
        />
      </svg>
    </div>
  );
}

// ── Floating dust particles ──
function FloatingDust() {
  const dust = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 680,
    y: Math.random() * 240,
    size: 1 + Math.random() * 2,
    dur: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    driftX: -20 + Math.random() * 40,
    driftY: -15 + Math.random() * 30,
    opacity: 0.25 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      {dust.map(d => (
        <div key={d.id} style={{
          position: 'absolute',
          left: `${d.x}px`, top: `${d.y}px`,
          width: `${d.size}px`, height: `${d.size}px`,
          borderRadius: '50%',
          background: `rgba(255,255,255,${d.opacity})`,
          boxShadow: `0 0 ${d.size + 2}px rgba(255,255,255,${d.opacity * 0.5})`,
          animation: `dustFloat ${d.dur}s ease-in-out ${d.delay}s infinite alternate`,
          // @ts-ignore
          '--dx': `${d.driftX}px`,
          '--dy': `${d.driftY}px`,
        }} />
      ))}
    </div>
  );
}

// ── MAIN BANNER ──
function SunnyBannerInner() {
  return (
    <div className="w-full flex items-center justify-center" style={{ background: 'transparent' }}>
      <div
        data-testid="sunny-banner"
        className="relative overflow-hidden"
        style={{
          width: '680px', height: '240px',
          background: 'hsl(0,0%,3%)',
          borderRadius: '10px',
          boxShadow: [
            '0 0 0 1px hsl(0,0%,12%)',
            '0 0 40px 6px rgba(0,0,0,0.8)',
            '0 32px 80px -8px rgba(0,0,0,0.95)',
          ].join(','),
        }}
      >
        {/* Deep dark background layers */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 60% 80% at 30% 50%, hsla(0,0%,8%,0.5) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 70% at 75% 55%, hsla(0,0%,6%,0.4) 0%, transparent 55%)',
          ].join(','),
        }} />

        {/* Subtle white glow from center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 30% 40% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }} />

        {/* Effects */}
        <StaticNoise />
        <ScanLines />
        <ShadowFigure />
        <StairsSilhouette />
        <GlitchFlicker />
        <HGlitch />
        <Vignette />
        <FallingFeathers />
        <HeartbeatLine />
        <FractureOverlay />
        <FloatingDust />
        <HangingLightbulb />

        {/* Shadow particles */}
        {SHADOWS.map(s => <ShadowParticle key={s.id} {...s} />)}

        {/* Top border — thin white */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,25%) 20%, hsl(0,0%,40%) 50%, hsl(0,0%,25%) 80%, transparent 100%)',
          opacity: 0.6,
          zIndex: 25,
        }} />

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,15%) 30%, hsl(0,0%,25%) 50%, hsl(0,0%,15%) 70%, transparent 100%)',
          opacity: 0.4,
          zIndex: 25,
        }} />

        {/* ── CHARACTER — right side ── */}

        <motion.img
          src="/sunny.png"
          alt="Sunny"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            right: '-8px', bottom: '-12px',
            height: '260px', width: 'auto',
            zIndex: 6,
            mixBlendMode: 'luminosity',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
            maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
            filter: 'grayscale(1)',
            pointerEvents: 'none',
          }}
        />

        {/* White tint overlay on character */}
        <div className="absolute pointer-events-none" style={{
          right: '-8px', bottom: '-12px',
          width: '300px', height: '260px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(200,200,200,0.06), rgba(0,0,0,0.1))',
          mixBlendMode: 'color',
          zIndex: 7,
          WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
          maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 80%)',
        }} />

        {/* ── CONTENT ── */}
        <div className="relative flex flex-col justify-center h-full px-9 py-6" style={{ zIndex: 10 }}>

          {/* Badges */}
          <motion.div className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}>
            {[
              { label: 'OMORI', color: 'hsl(0,0%,75%)', border: 'hsl(0,0%,25%)', bg: 'hsla(0,0%,100%,0.06)' },
              { label: 'Headspace', color: 'hsl(0,0%,60%)', border: 'hsl(0,0%,20%)', bg: 'hsla(0,0%,100%,0.04)' },
            ].map(b => (
              <span key={b.label} style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: b.color,
                border: `1px solid ${b.border}`,
                background: b.bg, padding: '3px 10px', borderRadius: '3px',
              }}>{b.label}</span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            data-testid="text-arc"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'hsl(0,0%,45%)', marginBottom: '3px',
              textShadow: '0 0 10px hsla(0,0%,100%,0.1)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            I'll see you there...
          </motion.p>

          {/* Name — monochrome gradient */}
          <motion.h1
            data-testid="text-name"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sunny-gradient-flow"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '68px', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.03em',
              backgroundImage: 'linear-gradient(90deg, hsl(0,0%,95%) 0%, hsl(0,0%,60%) 20%, hsl(0,0%,30%) 40%, hsl(0,0%,80%) 55%, hsl(0,0%,50%) 70%, hsl(0,0%,95%) 85%, hsl(0,0%,40%) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 15px hsla(0,0%,100%,0.08))',
            }}>
            Sunny
          </motion.h1>

          {/* Online status */}
          <motion.div className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <span
              style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%',
                background: 'hsl(0,0%,65%)',
                boxShadow: '0 0 8px hsla(0,0%,100%,0.2)',
                animation: 'sunnyPulse 3s ease-in-out infinite',
              }} />
            <span data-testid="text-status" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 400,
              color: 'hsl(0,0%,35%)', letterSpacing: '0.05em',
            }}>Online</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SunnyBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <SunnyBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(0,0%,50%)',
          background: 'hsl(0,0%,5%)',
          border: '1px solid hsl(0,0%,15%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,35%)';
          e.currentTarget.style.color = 'hsl(0,0%,80%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,15%)';
          e.currentTarget.style.color = 'hsl(0,0%,50%)';
        }}
      >REPLAY</button>
    </div>
  );
}
