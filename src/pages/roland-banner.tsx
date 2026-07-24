import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

// ── Blade slash marks (left side only, away from character) ──
const SLASHES = [
  { d: 'M120 0 L40 240', delay: 0, dur: 5 },
  { d: 'M160 10 L20 240', delay: 0.3, dur: 5.5 },
  { d: 'M100 0 L60 200', delay: 0.6, dur: 4.8 },
  { d: 'M180 0 L100 240', delay: 1.0, dur: 6 },
];

function BladeSlashes() {
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', zIndex: 8 }}
      viewBox="0 0 680 240" preserveAspectRatio="none">
      <defs>
        <filter id="slashGlow-r">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {SLASHES.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke="hsl(0,0%,55%)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          filter="url(#slashGlow-r)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
            times: [0, 0.15, 0.65, 1],
          }}
        />
      ))}
    </svg>
  );
}

// ── Text Split Effect — fancy slash-split with energy, particles, chromatic edge ──
function TextSplitEffect({ text }: { text: string }) {
  const [phase, setPhase] = useState<'idle' | 'slicing' | 'apart' | 'pulling'>('idle');

  useEffect(() => {
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    const cycle = () => {
      t = setTimeout(() => {
        if (cancelled) return;
        setPhase('slicing');
        t = setTimeout(() => {
          if (cancelled) return;
          setPhase('apart');
          t = setTimeout(() => {
            if (cancelled) return;
            setPhase('pulling');
            t = setTimeout(() => {
              if (cancelled) return;
              setPhase('idle');
              cycle();
            }, 800);
          }, 1000);
        }, 250);
      }, 5000);
    };
    cycle();
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  const splitDist = 10;
  const textH = 56;

  const textBase: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '52px',
    fontWeight: 800,
    lineHeight: 0.9,
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, hsl(0,0%,95%) 0%, hsl(0,0%,70%) 30%, hsl(0,0%,50%) 60%, hsl(0,0%,85%) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 18px hsla(0,0%,30%,0.4))',
    whiteSpace: 'nowrap' as const,
    margin: 0,
    padding: 0,
  };

  const topY = phase === 'apart' || phase === 'pulling' ? -splitDist : 0;
  const botY = phase === 'apart' || phase === 'pulling' ? splitDist : 0;
  const topSkew = phase === 'apart' ? -2 : 0;
  const botSkew = phase === 'apart' ? 2 : 0;

  const snapEase = [0.17, 0.84, 0.44, 1] as const;
  const pullEase = [0.22, 1, 0.36, 1] as const;

  // Energy particles at the cut line
  const cutParticles = Array.from({ length: 8 }, (_, i) => ({
    x: -40 + (i / 7) * 140,
    delay: i * 0.04,
  }));

  return (
    <div style={{ position: 'relative', height: `${textH}px` }}>
      {/* Top half — chromatic aberration edge */}
      <motion.div
        animate={{ y: topY, skewX: topSkew }}
        transition={phase === 'pulling'
          ? { duration: 0.8, ease: pullEase }
          : { duration: 0.4, ease: snapEase }}
        style={{ position: 'absolute', top: 0, left: 0, clipPath: 'inset(0 0 50% 0)', zIndex: 5 }}
      >
        <h1 style={textBase}>{text}</h1>
      </motion.div>

      {/* Top half — red chromatic offset (visible during split) */}
      {phase !== 'idle' && (
        <motion.div
          animate={{ y: topY, opacity: phase === 'pulling' ? 0 : 1 }}
          transition={phase === 'pulling'
            ? { duration: 0.8, ease: pullEase }
            : { duration: 0.4, ease: snapEase }}
          style={{
            position: 'absolute', top: 0, left: 0,
            clipPath: 'inset(0 0 50% 0)', zIndex: 4,
          }}
        >
          <h1 style={{
            ...textBase,
            background: 'linear-gradient(135deg, hsl(0,70%,50%) 0%, hsl(0,60%,35%) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'translateX(2px)',
            filter: 'drop-shadow(0 0 10px hsla(0,70%,50%,0.5))',
            opacity: 0.3,
          }}>{text}</h1>
        </motion.div>
      )}

      {/* Bottom half */}
      <motion.div
        animate={{ y: botY, skewX: botSkew }}
        transition={phase === 'pulling'
          ? { duration: 0.8, ease: pullEase }
          : { duration: 0.4, ease: snapEase }}
        style={{ position: 'absolute', top: 0, left: 0, clipPath: 'inset(50% 0 0 0)', zIndex: 5 }}
      >
        <h1 style={textBase}>{text}</h1>
      </motion.div>

      {/* Bottom half — cyan chromatic offset */}
      {phase !== 'idle' && (
        <motion.div
          animate={{ y: botY, opacity: phase === 'pulling' ? 0 : 1 }}
          transition={phase === 'pulling'
            ? { duration: 0.8, ease: pullEase }
            : { duration: 0.4, ease: snapEase }}
          style={{
            position: 'absolute', top: 0, left: 0,
            clipPath: 'inset(50% 0 0 0)', zIndex: 4,
          }}
        >
          <h1 style={{
            ...textBase,
            background: 'linear-gradient(135deg, hsl(180,70%,50%) 0%, hsl(180,60%,35%) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'translateX(-2px)',
            filter: 'drop-shadow(0 0 10px hsla(180,70%,50%,0.5))',
            opacity: 0.3,
          }}>{text}</h1>
        </motion.div>
      )}

      {/* Slash cut line — thin bright blade sweep */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '-10%', right: '-10%',
          height: '1px', transform: 'translateY(-50%) rotate(-1deg)',
          background: 'linear-gradient(90deg, transparent 5%, hsl(0,0%,100%) 30%, hsl(0,0%,100%) 70%, transparent 95%)',
          boxShadow: '0 0 20px 4px hsla(0,0%,100%,0.7), 0 0 40px 8px hsla(0,0%,90%,0.3)',
          zIndex: 7,
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: phase === 'slicing' ? [0, 1, 1, 0] : phase === 'apart' ? [0.4, 0] : 0,
          scaleX: phase === 'slicing' ? [0, 0.3, 1.6, 0] : 0,
        }}
        transition={phase === 'slicing'
          ? { duration: 0.25, ease: 'easeOut' }
          : { duration: 0.4 }}
      />

      {/* Inner glow burst at the cut point */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '30%',
          width: '40%', height: '20px',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse at center, hsla(0,0%,100%,0.25) 0%, transparent 70%)',
          zIndex: 6,
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: phase === 'slicing' ? [0, 0.8, 0] : phase === 'apart' ? 0.15 : 0,
          scaleX: phase === 'slicing' ? [0, 1.5, 0] : 1,
        }}
        transition={{ duration: phase === 'slicing' ? 0.3 : 0.6 }}
      />

      {/* Cut-line particles — sparks flying outward from the slice */}
      {(phase === 'slicing' || phase === 'apart') && cutParticles.map((p, i) => (
        <motion.div
          key={`spark-${i}`}
          style={{
            position: 'absolute',
            left: `${50 + p.x * 0.5}%`,
            top: '50%',
            width: '2px', height: '2px',
            borderRadius: '50%',
            background: 'hsl(0,0%,95%)',
            boxShadow: '0 0 4px 1px hsla(0,0%,90%,0.8)',
            zIndex: 8,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 5)],
            y: [0, (i % 3 === 0 ? -1 : 1) * (8 + i * 3)],
            opacity: [0, 0.9, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 0.5,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Persistent glow along the split edge while apart */}
      <motion.div
        style={{
          position: 'absolute', top: 'calc(50% - 1px)', left: '10%', right: '10%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, hsla(0,0%,90%,0.4), transparent)',
          zIndex: 6,
        }}
        animate={{
          opacity: phase === 'apart' ? [0.3, 0.6, 0.3] : 0,
          scaleX: phase === 'apart' ? 1 : 0,
        }}
        transition={phase === 'apart'
          ? { opacity: { duration: 0.8, repeat: Infinity }, scaleX: { duration: 0.3 } }
          : { duration: 0.3 }}
      />
    </div>
  );
}

// ── Falling ash fragments ──
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  startX: Math.random() * 680,
  size: 6 + Math.random() * 8,
  speed: 5 + Math.random() * 4,
  delay: Math.random() * 5,
  opacity: 0.2 + Math.random() * 0.25,
  sway: 20 + Math.random() * 30,
  luminance: 35 + Math.random() * 20,
}));

function AshFragment({ startX, size, speed, delay, opacity, sway, luminance }: (typeof PETALS)[0]) {
  return (
    <div
      className="ash-fall absolute pointer-events-none"
      style={{
        left: `${startX}px`,
        width: `${size}px`,
        height: `${size * 0.4}px`,
        borderRadius: '50% 0 50% 0',
        background: `hsl(0, 0%, ${luminance}%)`,
        zIndex: 3,
        '--ash-start': `-${size * 2}px`,
        '--sway-a': `${sway}px`,
        '--sway-b': `${-sway * 0.5}px`,
        '--sway-c': `${sway * 0.3}px`,
        '--ash-opacity': opacity,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      } as React.CSSProperties}
    />
  );
}

// ── Rain particles ──
const RAIN = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  length: 10 + Math.random() * 20,
  speed: 1.2 + Math.random() * 1.5,
  delay: Math.random() * 3,
  opacity: 0.06 + Math.random() * 0.12,
}));

function RainDrop({ x, length, speed, delay, opacity }: (typeof RAIN)[0]) {
  return (
    <div
      className="rain-fall absolute pointer-events-none"
      style={{
        left: `${x}px`,
        width: '1px',
        height: `${length}px`,
        background: `linear-gradient(180deg, transparent, hsla(0,0%,55%,${opacity}))`,
        zIndex: 2,
        '--rain-start': `-${length}px`,
        '--rain-opacity': opacity,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      } as React.CSSProperties}
    />
  );
}

// ── City skyline silhouette ──
function CitySkyline() {
  return (
    <svg className="absolute bottom-0 left-0 pointer-events-none" style={{ width: '100%', height: '140px', zIndex: 1, opacity: 0.10 }}
      viewBox="0 0 680 140" preserveAspectRatio="none">
      <path
        d="M0 140 L0 100 L20 100 L20 80 L30 80 L30 60 L40 60 L40 80 L55 80 L55 50 L65 50 L65 40 L75 40 L75 50 L85 50 L85 70 L100 70 L100 45 L110 45 L110 30 L115 25 L120 30 L120 45 L135 45 L135 55 L145 55 L145 35 L155 35 L155 55 L165 55 L165 75 L180 75 L180 50 L195 50 L195 38 L200 35 L205 38 L205 50 L220 50 L220 65 L235 65 L235 40 L240 35 L245 30 L250 35 L250 65 L260 65 L260 80 L275 80 L275 55 L285 55 L285 42 L295 42 L295 55 L310 55 L310 70 L325 70 L325 48 L335 48 L335 35 L340 30 L345 35 L345 48 L360 48 L360 60 L375 60 L375 50 L385 50 L385 38 L390 32 L395 38 L395 50 L410 50 L410 65 L425 65 L425 55 L435 55 L435 40 L445 40 L445 55 L460 55 L460 70 L475 70 L475 52 L485 52 L485 35 L490 28 L495 35 L495 52 L510 52 L510 68 L525 68 L525 60 L535 60 L535 45 L545 45 L545 60 L560 60 L560 75 L575 75 L575 55 L585 55 L585 42 L595 42 L595 55 L610 55 L610 70 L625 70 L625 58 L640 58 L640 50 L650 50 L650 65 L665 65 L665 80 L680 80 L680 140 Z"
        fill="hsl(0, 0%, 6%)"
      />
    </svg>
  );
}

// ── Ash drips from top ──
function AshDrips() {
  const drips = [
    { x: 80, maxH: 30, delay: 0 },
    { x: 170, maxH: 45, delay: 0.8 },
    { x: 290, maxH: 25, delay: 1.5 },
    { x: 410, maxH: 55, delay: 0.3 },
    { x: 530, maxH: 35, delay: 2.0 },
    { x: 620, maxH: 20, delay: 1.2 },
  ];
  return (
    <>
      {drips.map((d, i) => (
        <div
          key={i}
          className="ash-drip absolute pointer-events-none"
          style={{
            left: `${d.x}px`, top: '0px',
            width: '1.5px', height: `${d.maxH}px`,
            borderRadius: '0 0 3px 3px',
            background: 'linear-gradient(180deg, hsl(0,0%,30%), hsl(0,0%,18%), transparent)',
            zIndex: 9,
            animationDuration: '4s',
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// ── Floating dust particles ──
const DUST = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  y: Math.random() * 240,
  size: 1 + Math.random() * 2,
  dur: 6 + Math.random() * 6,
  delay: Math.random() * 4,
}));

function DustParticle({ x, y, size, dur, delay }: (typeof DUST)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`, top: `${y}px`,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: 'hsla(0,0%,55%,0.25)',
        zIndex: 2,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.35, 0], y: [0, -20, -40] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Emotion Level gauge (Library of Ruina mechanic) ──
// In the game, emotion levels 1-5 unlock stronger abilities during battle
function EmotionLevel() {
  const [level, setLevel] = useState(0);
  const maxLevel = 5;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current <= maxLevel) {
        setLevel(current);
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-3">
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px', color: 'hsl(0,0%,35%)',
      }}>LV</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLevel }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: i < level ? 1 : 0.2,
              scale: 1,
              ...(i < level ? { boxShadow: '0 0 8px hsla(0,0%,70%,0.6), 0 0 16px hsla(0,0%,60%,0.3)' } : {}),
            }}
            transition={{ delay: 0.8 + i * 0.4, duration: 0.3, type: 'spring', bounce: 0.4 }}
            style={{
              width: '14px', height: '6px',
              borderRadius: '1px',
              background: i < level
                ? 'linear-gradient(90deg, hsl(0,0%,55%), hsl(0,0%,80%), hsl(0,0%,55%))'
                : 'hsl(0,0%,12%)',
              border: `1px solid ${i < level ? 'hsl(0,0%,40%)' : 'hsl(0,0%,15%)'}`,
            }}
          />
        ))}
      </div>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: level >= maxLevel ? 'hsl(0,0%,65%)' : 'hsl(0,0%,30%)',
        transition: 'color 0.3s',
      }}>{level}/{maxLevel}</span>
    </div>
  );
}

// ── Page counter (pages are currency in Library of Ruina) ──
function PageCounter() {
  const [count, setCount] = useState(0);
  const target = 42;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current <= target) {
        setCount(current);
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-2">
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px', color: 'hsl(0,0%,35%)',
      }}>PGS</span>
      <div style={{
        width: '90px', height: '4px',
        background: 'hsl(0,0%,8%)',
        border: '1px solid hsl(0,0%,15%)',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, hsl(0,0%,30%), hsl(0,0%,55%), hsl(0,0%,30%))',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${(count / target) * 100}%` }}
          transition={{ duration: 0 }}
        />
      </div>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px', color: 'hsl(0,0%,40%)',
      }}>{count}</span>
    </div>
  );
}

// ── Inner banner ──
function RolandBannerInner() {
  const [charReady, setCharReady] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'HAKIM';

  useEffect(() => {
    const img = new Image();
    img.onload = () => setCharReady(true);
    img.src = '/roland-char.png';
  }, []);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }, 600);
    return () => { clearTimeout(timeout); if (interval!) clearInterval(interval); };
  }, []);

  return (
    <div
      data-testid="roland-banner"
      className="relative overflow-hidden"
      style={{
        width: '680px',
        height: '240px',
        background: 'linear-gradient(160deg, #080808 0%, #0e0e0e 35%, #0a0a0a 65%, #080808 100%)',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsl(0,0%,12%)',
          '0 0 40px 4px hsla(0,0%,6%,0.15)',
          '0 0 80px 8px hsla(0,0%,4%,0.08)',
          '0 32px 80px -8px rgba(0,0,0,0.98)',
        ].join(','),
      }}
    >
      {/* ── Background — dark grey radials ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 65% 80% at 70% 45%, hsla(0,0%,8%,0.5) 0%, transparent 60%)',
          'radial-gradient(ellipse 50% 60% at 20% 60%, hsla(0,0%,6%,0.4) 0%, transparent 55%)',
          'radial-gradient(ellipse 80% 40% at 50% 100%, hsla(0,0%,5%,0.3) 0%, transparent 60%)',
        ].join(','),
        zIndex: 0,
      }} />

      {/* ── Subtle grid ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.03, zIndex: 1 }}>
        <defs>
          <pattern id="rolandGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="hsl(0,0%,40%)" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rolandGrid)" />
      </svg>

      {/* ── City skyline ── */}
      <CitySkyline />

      {/* ── Rain ── */}
      {RAIN.map(r => <RainDrop key={r.id} {...r} />)}

      {/* ── Dust particles ── */}
      {DUST.map(d => <DustParticle key={d.id} {...d} />)}

      {/* ── Falling ash ── */}
      {PETALS.map(p => <AshFragment key={p.id} {...p} />)}

      {/* ── Ash drips ── */}
      <AshDrips />

      {/* ── Blade slashes ── */}
      <BladeSlashes />

      {/* ── CHARACTER — right side (shifted left) ── */}
      {charReady && (
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          style={{
            position: 'absolute',
            bottom: '-20px', right: '55px',
            height: '270px',
            zIndex: 6,
          }}
        >
          <img
            src="/roland-char.png" alt="Roland"
            style={{
              height: '100%', width: 'auto',
              objectFit: 'contain',
              filter: [
                'drop-shadow(0 0 25px hsla(0,0%,15%,0.4))',
                'drop-shadow(0 0 50px hsla(0,0%,8%,0.2))',
              ].join(' '),
              WebkitMaskImage: 'linear-gradient(to left, black 0%, black 60%, transparent 90%), linear-gradient(to top, transparent 0%, black 10%)',
              maskImage: 'linear-gradient(to left, black 0%, black 60%, transparent 90%), linear-gradient(to top, transparent 0%, black 10%)',
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect',
            }}
          />
        </motion.div>
      )}

      {/* ── Character ambient glow ── */}
      <div className="absolute pointer-events-none" style={{
        right: '45px', bottom: '-10px',
        width: '350px', height: '280px',
        background: 'radial-gradient(ellipse 70% 80% at 60% 55%, hsla(0,0%,10%,0.3) 0%, transparent 65%)',
        zIndex: 2,
      }} />

      {/* ── Blade edge shimmer (pulses across banner) ── */}
      <motion.div className="absolute pointer-events-none" style={{
        left: '0', right: '0', top: '50%',
        height: '1px', zIndex: 7,
        background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,30%) 30%, hsl(0,0%,60%) 50%, hsl(0,0%,30%) 70%, transparent 100%)',
        boxShadow: '0 0 8px 1px hsla(0,0%,40%,0.2)',
      }}
        animate={{
          opacity: [0, 0, 0.6, 0],
          scaleX: [0.2, 0.5, 1, 1.2],
        }}
        transition={{
          duration: 3,
          delay: 8,
          repeat: Infinity,
          repeatDelay: 8,
          ease: 'easeOut',
          times: [0, 0.1, 0.4, 1],
        }}
      />

      {/* ── Top border — silver ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,15%) 15%, hsl(0,0%,40%) 40%, hsl(0,0%,55%) 50%, hsl(0,0%,40%) 60%, hsl(0,0%,15%) 85%, transparent 100%)',
        boxShadow: '0 0 12px 2px hsla(0,0%,30%,0.3)',
        zIndex: 20,
      }} />

      {/* ── Bottom border ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,10%) 20%, hsl(0,0%,20%) 50%, hsl(0,0%,10%) 80%, transparent 100%)',
        opacity: 0.6,
        zIndex: 20,
      }} />

      {/* ── Side accent lines ── */}
      <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: '2px', height: '35%', zIndex: 20,
        background: 'linear-gradient(180deg, transparent, hsl(0,0%,25%), transparent)',
      }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* ── Border frame ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: '1.5px solid hsla(0,0%,10%,0.6)', borderRadius: '10px', zIndex: 20,
      }} />

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
              color: 'hsl(0,0%,55%)',
              border: '1px solid hsl(0,0%,25%)',
              padding: '3px 10px',
              background: 'hsla(0,0%,100%,0.04)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 0 8px hsla(0,0%,50%,0.3)',
            }}>
              FIXER
            </span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 600,
              color: 'hsl(0,0%,30%)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              OFFICE No.1
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
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'inline-block', width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'hsl(0,0%,55%)',
                boxShadow: '0 0 8px hsl(0,0%,40%), 0 0 16px hsla(0,0%,30%,0.3)',
              }}
            />
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px', color: 'hsl(0,0%,35%)',
              letterSpacing: '0.08em',
            }}>ACTIVE</span>
          </motion.div>
        </div>

        {/* Left side — name and info */}
        <div className="flex flex-col" style={{ zIndex: 16, maxWidth: '350px' }}>

          {/* Name — splits into halves */}
          {typedText.length >= fullText.length ? (
            <TextSplitEffect text={fullText} />
          ) : (
            <div className="flex items-center" style={{ gap: '10px' }}>
              <motion.h1
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '52px', fontWeight: 800,
                  lineHeight: 0.9, letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, hsl(0,0%,95%) 0%, hsl(0,0%,70%) 30%, hsl(0,0%,50%) 60%, hsl(0,0%,85%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 18px hsla(0,0%,30%,0.4))',
                }}>
                {typedText}
              </motion.h1>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                style={{
                  display: 'inline-block', width: '2px', height: '45px',
                  background: 'hsl(0,0%,50%)',
                  boxShadow: '0 0 8px hsla(0,0%,40%,0.4)',
                  verticalAlign: 'middle',
                }}
              />
            </div>
          )}

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              width: '200px', height: '1px', marginTop: '6px',
              background: 'linear-gradient(90deg, hsl(0,0%,35%), hsl(0,0%,20%), transparent)',
              transformOrigin: 'left',
            }}
          />

          {/* Trait */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '7px', color: 'hsl(0,0%,28%)',
              letterSpacing: '0.1em',
              marginTop: '6px',
            }}>
            {'Where Da Ladies at :/'}
          </motion.p>

          {/* Emotion Level + Page Counter */}
          <EmotionLevel />
          <PageCounter />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between" style={{ zIndex: 16 }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '6px', color: 'hsl(0,0%,18%)',
          }}>LVL 99</span>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '6px', color: 'hsl(0,0%,18%)',
          }}>{'/// HAKIM ///'}</span>
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px', color: 'hsl(0,0%,30%)',
            }}>
            ONLINE
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ── Exported wrapper with replay ──
export default function RolandBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <RolandBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(0,0%,45%)',
          background: 'hsl(0,0%,6%)',
          border: '1px solid hsl(0,0%,16%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,30%)';
          e.currentTarget.style.color = 'hsl(0,0%,70%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,16%)';
          e.currentTarget.style.color = 'hsl(0,0%,45%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
