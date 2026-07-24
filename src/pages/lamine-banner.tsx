import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

// ── Speed lines — dynamic horizontal streaks ──
const SPEED_LINES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  y: 10 + Math.random() * 220,
  width: 80 + Math.random() * 200,
  height: 1 + Math.random() * 2,
  speed: 0.8 + Math.random() * 1.5,
  delay: Math.random() * 3,
  opacity: 0.05 + Math.random() * 0.15,
  isRed: i < 10,
}));

function SpeedLine({ y, width, height, speed, delay, opacity, isRed }: (typeof SPEED_LINES)[0]) {
  return (
    <div
      className="speed-line absolute pointer-events-none"
      style={{
        top: `${y}px`,
        height: `${height}px`,
        width: `${width}px`,
        background: isRed
          ? 'linear-gradient(90deg, transparent, hsla(0,85%,45%,1), hsla(0,85%,55%,0.6), transparent)'
          : 'linear-gradient(90deg, transparent, hsla(45,95%,55%,1), hsla(45,95%,60%,0.6), transparent)',
        zIndex: 2,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
        '--speed-line-opacity': opacity,
      } as React.CSSProperties}
    />
  );
}

// ── Diagonal streak lines — angular energy ──
const STREAKS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x1: -50 + Math.random() * 300,
  angle: -15 + Math.random() * 10,
  width: 100 + Math.random() * 150,
  delay: Math.random() * 4,
  dur: 2 + Math.random() * 2,
  isRed: i % 2 === 0,
}));

function DiagonalStreak({ x1, angle, width, delay, dur, isRed }: (typeof STREAKS)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x1}px`,
        top: '0',
        width: `${width}px`,
        height: '1px',
        background: isRed
          ? 'linear-gradient(90deg, transparent, hsla(0,85%,50%,0.4), transparent)'
          : 'linear-gradient(90deg, transparent, hsla(45,95%,55%,0.4), transparent)',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'left center',
        zIndex: 1,
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scaleX: [0, 1.5, 2],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: 'easeOut',
      }}
    />
  );
}

// ── Glowing orbs — Spain red and gold energy balls ──
const ORBS = [
  { x: '15%', y: '30%', size: 120, color: '0,80%,42%', delay: 0 },
  { x: '70%', y: '60%', size: 100, color: '45,95%,50%', delay: 1.5 },
  { x: '45%', y: '15%', size: 80, color: '0,75%,50%', delay: 0.8 },
  { x: '85%', y: '40%', size: 90, color: '45,85%,55%', delay: 2.2 },
];

function EnergyOrb({ x, y, size, color, delay }: (typeof ORBS)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x, top: y,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle, hsla(${color},0.15) 0%, transparent 70%)`,
        zIndex: 1,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ── Floating particles — small bright dots ──
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  y: Math.random() * 240,
  size: 1 + Math.random() * 2.5,
  dur: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  isRed: Math.random() > 0.45,
}));

function FloatingParticle({ x, y, size, dur, delay, isRed }: (typeof PARTICLES)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`, top: `${y}px`,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: isRed ? 'hsl(0,85%,55%)' : 'hsl(45,95%,55%)',
        zIndex: 3,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [0, -15, -30],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ── Pulse ring — expanding rings from character position ──
// ── Score ticker — scrolling match highlights ──
function ScoreTicker() {
  const matches = [
    'ESP 3-1 BRA • LAMINE 23\'',
    'ESP 2-0 ARG • LAMINE 67\'',
    'ESP 4-2 FRA • LAMINE 11\' 45\'',
    'ESP 1-0 GER • LAMINE 88\'',
    'ESP 5-0 MEX • LAMINE 5\' 34\' 72\'',
  ];
  const text = matches.join('     ★     ');

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        bottom: '0', left: '0', right: '0',
        height: '18px',
        background: 'linear-gradient(90deg, hsla(0,60%,8%,0.9) 0%, hsla(0,60%,8%,0.95) 10%, hsla(0,60%,8%,0.95) 90%, hsla(0,60%,8%,0.9) 100%)',
        borderTop: '1px solid hsla(0,60%,30%,0.3)',
        overflow: 'hidden',
        zIndex: 21,
      }}
    >
      <motion.div
        style={{
          whiteSpace: 'nowrap',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '8px',
          fontWeight: 600,
          color: 'hsl(45,80%,55%)',
          letterSpacing: '0.08em',
          lineHeight: '18px',
          textShadow: '0 0 6px hsla(45,80%,50%,0.3)',
        }}
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {text}
      </motion.div>
      {/* Edge fade masks */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(90deg, hsl(0,60%,8%) 0%, transparent 8%, transparent 92%, hsl(0,60%,8%) 100%)',
        zIndex: 1,
      }} />
    </div>
  );
}

// ── Goal ball effect — soccer ball flies to random center spots, net flash, GOAL text ──
function GoalEffect() {
  const [phase, setPhase] = useState<'idle' | 'flying' | 'goal'>('idle');
  const [target, setTarget] = useState({ x: 280, y: 90 });

  useEffect(() => {
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    const cycle = () => {
      const newX = 290 + Math.random() * 160;
      const newY = 80 + Math.random() * 60;
      setTarget({ x: newX, y: newY });
      t = setTimeout(() => {
        if (cancelled) return;
        setPhase('flying');
        t = setTimeout(() => {
          if (cancelled) return;
          setPhase('goal');
          t = setTimeout(() => {
            if (cancelled) return;
            setPhase('idle');
            cycle();
          }, 1000);
        }, 700);
      }, 2300);
    };
    cycle();
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* ── Soccer ball ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '14px', height: '14px',
          zIndex: 11,
        }}
        initial={{ x: -20, y: -80, opacity: 0, rotate: 0 }}
        animate={
          phase === 'flying'
            ? {
                x: [-20, target.x],
                y: [-80, -target.y],
                opacity: [0, 1, 1],
                rotate: [0, 720],
              }
            : phase === 'goal'
            ? {
                x: target.x, y: -target.y,
                opacity: [1, 0],
                rotate: 720,
                scale: [1, 0.5],
              }
            : { x: -20, y: -80, opacity: 0, rotate: 0 }
        }
        transition={
          phase === 'flying'
            ? { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
            : phase === 'goal'
            ? { duration: 0.3 }
            : { duration: 0.1 }
        }
      >
        {/* Ball SVG */}
        <svg viewBox="0 0 20 20" width="14" height="14">
          <circle cx="10" cy="10" r="9" fill="white" stroke="hsl(0,0%,20%)" strokeWidth="0.8" />
          <polygon points="10,3 13,6 12,10 8,10 7,6" fill="hsl(0,0%,20%)" />
          <polygon points="15,8 17,12 14,14 12,11 14,7" fill="hsl(0,0%,20%)" />
          <polygon points="5,8 3,12 6,14 8,11 6,7" fill="hsl(0,0%,20%)" />
          <polygon points="8,14 10,17 12,14 10,12" fill="hsl(0,0%,20%)" />
        </svg>
        {/* Ball trail — multiple fading ghost copies */}
        {phase === 'flying' && (
          <>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={`trail-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%', left: `${-i * 14}px`,
                  width: `${14 - i}px`, height: `${14 - i}px`,
                  borderRadius: '50%',
                  border: `1px solid hsla(${45 + i * 10},90%,60%,${0.4 - i * 0.05})`,
                  boxShadow: `0 0 ${6 - i}px hsla(${45 + i * 10},80%,55%,${0.3 - i * 0.04})`,
                  transform: 'translateY(-50%)',
                  opacity: 0.5 - i * 0.07,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* ── Goal effects at target position ── */}
      {phase === 'goal' && (
        <>
          <motion.div
            style={{
              position: 'absolute',
              left: `${target.x - 60}px`, bottom: `${target.y - 40}px`,
              width: '120px', height: '140px',
              background: 'radial-gradient(ellipse at center, hsla(45,95%,65%,0.5) 0%, hsla(0,80%,55%,0.3) 30%, transparent 70%)',
              zIndex: 11,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.3, 1.5, 2] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {/* Net ripple lines */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={`net-${i}`}
              style={{
                position: 'absolute',
                left: `${target.x - 50}px`, bottom: `${target.y + i * 15}px`,
                width: '100px', height: '1px',
                background: 'linear-gradient(90deg, transparent, hsla(45,95%,70%,0.5), transparent)',
                zIndex: 11,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.5, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
            />
          ))}
          {/* GOAL! text flash */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${target.x - 35}px`, bottom: `${target.y + 40}px`,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '22px', fontWeight: 900,
              letterSpacing: '0.15em',
              color: 'hsl(45,95%,60%)',
              textShadow: '0 0 20px hsla(45,90%,50%,0.8), 0 0 40px hsla(0,80%,50%,0.4)',
              zIndex: 12,
            }}
            initial={{ opacity: 0, scale: 2, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [2, 1, 1, 0.8], y: [10, 0, 0, -5] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            GOAL!
          </motion.div>
          {/* Spark particles from impact */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <motion.div
                key={`spark-${i}`}
                style={{
                  position: 'absolute',
                  left: `${target.x}px`, bottom: `${target.y}px`,
                  width: '3px', height: '3px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'hsl(45,95%,60%)' : 'hsl(0,80%,55%)',
                  boxShadow: `0 0 4px ${i % 2 === 0 ? 'hsla(45,90%,55%,0.8)' : 'hsla(0,80%,50%,0.8)'}`,
                  zIndex: 12,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * 40,
                  y: Math.sin(angle) * 35,
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

// ── Electric arc effect on text ──
function ElectricText({ children }: { children: React.ReactNode }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loop = () => {
      const wait = setTimeout(() => {
        if (cancelled) return;
        setFlash(true);
        setTimeout(() => {
          if (cancelled) return;
          setFlash(false);
          loop();
        }, 120);
      }, 1200 + Math.random() * 1800);
      return wait;
    };
    const t = loop();
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        style={{
          position: 'absolute',
          top: '-10px', left: '-10px',
          width: 'calc(100% + 20px)', height: 'calc(100% + 20px)',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 1,
        }}
        viewBox="0 0 350 70"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="elecGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="g1" />
            <feGaussianBlur stdDeviation="0.8" result="g2" />
            <feMerge>
              <feMergeNode in="g1" />
              <feMergeNode in="g2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Arc 1 */}
        <motion.path
          d="M 20,35 L 60,20 L 95,38 L 130,15 L 160,35 L 195,18 L 230,40 L 265,22 L 300,35 L 330,25"
          fill="none"
          stroke="hsl(45,95%,65%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#elecGlow)"
          animate={
            flash
              ? { opacity: [0, 0.9, 0.3, 0.8, 0], pathLength: [0, 1] }
              : { opacity: 0 }
          }
          transition={{ duration: 0.12, ease: 'easeOut' }}
        />
        {/* Arc 2 */}
        <motion.path
          d="M 10,45 L 50,55 L 85,30 L 120,50 L 155,28 L 190,48 L 225,25 L 260,45 L 295,30 L 340,40"
          fill="none"
          stroke="hsl(0,80%,60%)"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#elecGlow)"
          animate={
            flash
              ? { opacity: [0, 0.7, 0.2, 0.6, 0], pathLength: [0, 1] }
              : { opacity: 0 }
          }
          transition={{ duration: 0.12, delay: 0.02, ease: 'easeOut' }}
        />
        {/* Sparks */}
        {flash && [50, 130, 210, 290].map((cx, i) => (
          <motion.circle
            key={`espark-${i}`}
            cx={cx}
            cy={20 + (i % 2) * 30}
            r="2"
            fill={i % 2 === 0 ? 'hsl(45,95%,70%)' : 'hsl(0,85%,65%)'}
            filter="url(#elecGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 0.1, delay: i * 0.015 }}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Wind streaks effect ──
const WIND_STREAKS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  y: 10 + Math.random() * 220,
  width: 100 + Math.random() * 250,
  height: 1 + Math.random() * 1.5,
  speed: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 4,
  opacity: 0.12 + Math.random() * 0.15,
}));

const WIND_DUST = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),
  top: 15 + Math.random() * 210,
  yMid: -8 + Math.random() * 16,
  yEnd: -4 + Math.random() * 8,
  duration: 3 + Math.random() * 2,
}));

function WindEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, overflow: 'hidden' }}>
      {WIND_STREAKS.map(s => (
        <div
          key={`wind-${s.id}`}
          className="wind-streak absolute"
          style={{
            top: `${s.y}px`,
            height: `${s.height}px`,
            background: `linear-gradient(90deg, transparent 0%, hsla(0,0%,100%,${s.opacity}) 30%, hsla(0,0%,100%,${s.opacity * 1.5}) 50%, hsla(0,0%,100%,${s.opacity}) 70%, transparent 100%)`,
            borderRadius: '1px',
            animationDuration: `${s.speed}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {/* Floating dust particles blown by wind */}
      {WIND_DUST.map((d, i) => (
        <div
          key={`dust-${d.id}`}
          className="wind-dust absolute"
          style={{
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: '50%',
            background: d.id % 3 === 0 ? 'hsla(45,70%,65%,0.25)' : d.id % 3 === 1 ? 'hsla(0,60%,55%,0.2)' : 'hsla(0,0%,100%,0.15)',
            top: `${d.top}px`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${i * 0.6}s`,
            '--dust-y-mid': `${d.yMid}px`,
            '--dust-y-end': `${d.yEnd}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── Number badge — jersey #19 ──
function JerseyNumber() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, duration: 0.6, type: 'spring', bounce: 0.4 }}
      style={{
        position: 'absolute',
        top: '15px', right: '20px',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '72px', fontWeight: 900,
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '2px hsla(45,95%,50%,0.2)',
        zIndex: 2,
        userSelect: 'none',
      }}
    >
      19
    </motion.div>
  );
}

// ── Inner banner ──
function LamineBannerInner() {
  const [charReady, setCharReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setCharReady(true);
    img.src = '/lamine-char.png';
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '680px',
        height: '240px',
        background: 'linear-gradient(135deg, #1a0505 0%, #200808 30%, #1c0a02 65%, #150505 100%)',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsla(0,60%,30%,0.3)',
          '0 0 40px 4px hsla(0,60%,20%,0.15)',
          '0 0 80px 8px hsla(45,80%,20%,0.08)',
          '0 32px 80px -8px rgba(0,0,0,0.98)',
        ].join(','),
      }}
    >
      {/* ── Background gradient radials ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 50% 70% at 75% 50%, hsla(0,80%,30%,0.2) 0%, transparent 60%)',
          'radial-gradient(ellipse 40% 60% at 25% 55%, hsla(45,80%,25%,0.12) 0%, transparent 55%)',
          'radial-gradient(ellipse 80% 30% at 50% 100%, hsla(0,60%,20%,0.2) 0%, transparent 60%)',
        ].join(','),
        zIndex: 0,
      }} />

      {/* ── Subtle diagonal lines ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, zIndex: 1 }}>
        <defs>
          <pattern id="fieldLines-l" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">
            <path d="M 0 20 L 40 20" fill="none" stroke="hsl(0,60%,50%)" strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fieldLines-l)" />
      </svg>

      {/* ── Energy orbs ── */}
      {ORBS.map((o, i) => <EnergyOrb key={i} {...o} />)}

      {/* ── Speed lines ── */}
      {SPEED_LINES.map(l => <SpeedLine key={l.id} {...l} />)}

      {/* ── Diagonal streaks ── */}
      {STREAKS.map(s => <DiagonalStreak key={s.id} {...s} />)}

      {/* ── Floating particles ── */}
      {PARTICLES.map(p => <FloatingParticle key={p.id} {...p} />)}

      {/* ── Wind streaks ── */}
      <WindEffect />

      {/* ── Goal ball effect ── */}
      <GoalEffect />

      {/* ── Jersey number ghost ── */}
      <JerseyNumber />

      {/* ── CHARACTER — right side (GIF) ── */}
      {charReady && (
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          style={{
            position: 'absolute',
            bottom: '-10px', right: '-5px',
            height: '260px',
            zIndex: 6,
          }}
        >
          <img
            src="/lamine-char.png" alt="Lamine Yamal"
            style={{
              height: '100%', width: 'auto',
              objectFit: 'contain',
              filter: [
                'drop-shadow(0 0 20px hsla(0,80%,40%,0.4))',
                'drop-shadow(0 0 40px hsla(45,80%,30%,0.2))',
              ].join(' '),
              WebkitMaskImage: 'linear-gradient(to left, black 0%, black 55%, transparent 85%), linear-gradient(to top, transparent 0%, black 8%)',
              maskImage: 'linear-gradient(to left, black 0%, black 55%, transparent 85%), linear-gradient(to top, transparent 0%, black 8%)',
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect',
            }}
          />
        </motion.div>
      )}

      {/* ── Character ambient glow ── */}
      <div className="absolute pointer-events-none" style={{
        right: '20px', bottom: '0',
        width: '300px', height: '240px',
        background: 'radial-gradient(ellipse 60% 80% at 60% 55%, hsla(0,70%,30%,0.2) 0%, transparent 60%)',
        zIndex: 2,
      }} />

      {/* ── Top border — Spain red/gold gradient ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, hsl(0,80%,45%) 25%, hsl(0,85%,50%) 40%, hsl(45,95%,50%) 60%, hsl(45,90%,45%) 75%, transparent 100%)',
        boxShadow: '0 0 12px 2px hsla(0,70%,40%,0.3)',
        zIndex: 20,
      }} />

      {/* ── Bottom border ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, hsla(0,60%,30%,0.4) 30%, hsla(45,60%,30%,0.3) 70%, transparent 100%)',
        opacity: 0.6,
        zIndex: 20,
      }} />

      {/* ── Border frame ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: '1px solid hsla(0,40%,20%,0.4)', borderRadius: '10px', zIndex: 20,
      }} />

      {/* ── Score ticker ── */}
      <ScoreTicker />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 flex flex-col justify-between px-7 py-5" style={{ zIndex: 15 }}>

        {/* Top row — badge + status */}
        <div className="flex items-center justify-between" style={{ zIndex: 16 }}>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 700,
              color: 'hsl(0,85%,60%)',
              border: '1px solid hsl(0,60%,35%)',
              padding: '3px 10px',
              background: 'hsla(0,80%,40%,0.08)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 0 8px hsla(0,70%,50%,0.3)',
            }}>
              ESPANA
            </span>
            {/* Spain flag */}
            <svg width="24" height="16" viewBox="0 0 24 16" style={{ opacity: 0.8, borderRadius: '2px', border: '0.5px solid hsla(0,0%,40%,0.3)' }}>
              <rect y="0" width="24" height="4" fill="#c60b1e" />
              <rect y="4" width="24" height="8" fill="#ffc400" />
              <rect y="12" width="24" height="4" fill="#c60b1e" />
            </svg>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 600,
              color: 'hsl(45,80%,55%)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              CAMPEONES
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                display: 'inline-block', width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'hsl(45,95%,55%)',
                boxShadow: '0 0 8px hsl(45,90%,50%), 0 0 16px hsla(45,80%,40%,0.3)',
              }}
            />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 700,
              color: 'hsl(45,90%,55%)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>ACTIVE</span>
          </motion.div>
        </div>

        {/* Left side — name and info */}
        <div className="flex flex-col" style={{ zIndex: 16, maxWidth: '350px' }}>

          {/* Name — with electric arcs */}
          <ElectricText>
            <motion.h1
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '44px', fontWeight: 800,
                lineHeight: 0.9, letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, hsl(0,85%,60%) 0%, hsl(45,95%,60%) 50%, hsl(0,80%,55%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px hsla(0,70%,45%,0.3))',
                margin: 0, padding: 0,
              }}>
              HAKIM
            </motion.h1>
          </ElectricText>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              width: '200px', height: '1px', marginTop: '6px',
              background: 'linear-gradient(90deg, hsl(0,80%,50%), hsl(45,90%,50%), transparent)',
              transformOrigin: 'left',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px', fontWeight: 600,
              color: 'hsl(45,80%,50%)',
              letterSpacing: '0.15em',
              marginTop: '6px',
              textTransform: 'uppercase',
            }}>
            Where Da Ladies at :/
          </motion.p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-3">
            <StatBlock label="AGE" value="19" delay={1.4} />
            <StatBlock label="POS" value="RW" delay={1.6} />
            <StatBlock label="NAT" value="ESP" delay={1.8} />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 }}
              className="flex items-center gap-1"
            >
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '7px', fontWeight: 700,
                color: 'hsl(45,95%,55%)',
                letterSpacing: '0.1em',
                padding: '2px 6px',
                border: '1px solid hsla(45,80%,45%,0.3)',
                background: 'hsla(45,80%,35%,0.1)',
              }}>19</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between" style={{ zIndex: 16 }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '7px', fontWeight: 600,
            color: 'hsl(0,40%,30%)',
            letterSpacing: '0.1em',
          }}>WC 2026 CHAMPIONS</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '7px', fontWeight: 600,
            color: 'hsl(0,40%,30%)',
            letterSpacing: '0.1em',
          }}>GOLDEN BOY</span>
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '7px', fontWeight: 700,
              color: 'hsl(45,90%,55%)',
              letterSpacing: '0.1em',
            }}>
            ★ WONDERKID
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ── Stat block ──
function StatBlock({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '6px', fontWeight: 600,
        color: 'hsl(0,50%,40%)',
        letterSpacing: '0.12em',
      }}>{label}</span>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '11px', fontWeight: 800,
        color: 'hsl(0,80%,55%)',
        letterSpacing: '0.05em',
      }}>{value}</span>
    </motion.div>
  );
}

// ── Exported wrapper with replay ──
export default function LamineBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <LamineBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '9px', fontWeight: 600,
          color: 'hsl(0,70%,55%)',
          background: 'hsl(0,20%,8%)',
          border: '1px solid hsl(0,30%,18%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,60%,40%)';
          e.currentTarget.style.color = 'hsl(0,85%,70%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,30%,18%)';
          e.currentTarget.style.color = 'hsl(0,70%,55%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
