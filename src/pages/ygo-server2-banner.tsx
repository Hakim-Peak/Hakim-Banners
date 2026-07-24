import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ── Floating particles ──
function Particles() {
  const parts = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 700,
    y: Math.random() * 240,
    size: 1.5 + Math.random() * 3,
    dur: 4 + Math.random() * 8,
    delay: Math.random() * 6,
    drift: -20 + Math.random() * 40,
    opacity: 0.15 + Math.random() * 0.4,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {parts.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}px`, top: `${p.y}px`,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: '50%',
          background: `rgba(255,100,130,${p.opacity})`,
          boxShadow: `0 0 ${p.size + 2}px rgba(255,80,120,${p.opacity * 0.5})`,
          animation: `ygos2Float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ── Duel Disk hologram lines ──
function HologramLines() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: '40%', top: `${20 + i * 35}px`,
          width: '250px', height: '1px',
          background: `linear-gradient(90deg, transparent 0%, rgba(255,120,150,${0.08 + i * 0.02}) 30%, rgba(255,180,200,${0.12 + i * 0.015}) 50%, rgba(255,120,150,${0.08 + i * 0.02}) 70%, transparent 100%)`,
          animation: `ygos2Hologram 3s ${i * 0.4}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ── Card glow pulse ──
function CardGlow() {
  return (
    <div className="absolute pointer-events-none" style={{
      right: '100px', top: '30px',
      width: '120px', height: '180px',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, rgba(255,80,120,0.06) 0%, rgba(255,150,180,0.03) 100%)',
      border: '1px solid rgba(255,100,150,0.1)',
      boxShadow: '0 0 30px rgba(255,80,120,0.08)',
      animation: 'ygos2CardGlow 4s ease-in-out infinite',
      zIndex: 3,
    }} />
  );
}

// ── Energy streaks ──
function EnergyStreaks() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, overflow: 'hidden' }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: '60px', top: `${50 + i * 50}px`,
          width: '300px', height: '2px',
          background: `linear-gradient(90deg, transparent 0%, rgba(255,80,130,${0.1 + i * 0.03}) 20%, rgba(255,150,180,${0.2 + i * 0.02}) 50%, rgba(255,80,130,${0.1 + i * 0.03}) 80%, transparent 100%)`,
          animation: `ygos2Streak 6s ${i * 1.2}s ease-in-out infinite`,
          transformOrigin: 'left center',
        }} />
      ))}
    </div>
  );
}

// ── Floating cards (YGO themed) ──
function FloatingCards() {
  const cards = useMemo(() => [
    { x: 380, y: 20, rot: -8, delay: 0, scale: 0.7 },
    { x: 440, y: 60, rot: 5, delay: 1.5, scale: 0.65 },
    { x: 410, y: 120, rot: -3, delay: 0.8, scale: 0.6 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${c.x}px`, top: `${c.y}px`,
          width: '60px', height: '90px',
          borderRadius: '5px',
          background: 'linear-gradient(135deg, rgba(255,80,120,0.12) 0%, rgba(200,50,80,0.08) 100%)',
          border: '1px solid rgba(255,120,160,0.2)',
          transform: `rotate(${c.rot}deg) scale(${c.scale})`,
          animation: `ygos2CardFloat 5s ${c.delay}s ease-in-out infinite alternate`,
          boxShadow: '0 4px 15px rgba(255,80,120,0.1)',
        }}>
          <div style={{
            position: 'absolute', top: '8px', left: '8px', right: '8px',
            height: '30px', borderRadius: '3px',
            background: 'rgba(255,100,150,0.08)',
            border: '0.5px solid rgba(255,120,160,0.12)',
          }} />
          <div style={{
            position: 'absolute', bottom: '15px', left: '10px', right: '10px',
            height: '2px', borderRadius: '1px',
            background: 'rgba(255,120,160,0.15)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px', width: '40px',
            height: '2px', borderRadius: '1px',
            background: 'rgba(255,120,160,0.1)',
          }} />
        </div>
      ))}
    </div>
  );
}

// ── Star/Level indicators ──
function LevelStars() {
  return (
    <motion.div className="absolute flex items-center gap-1" style={{
      left: '32px', top: '28px',
      zIndex: 11,
    }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {[0,1,2,3,4].map(i => (
        <motion.svg
          key={i}
          width="12" height="12" viewBox="0 0 24 24"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
        >
          <polygon
            points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"
            fill="#AE91AF"
            stroke="#C4A8C5"
            strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 0 3px rgba(174,145,175,0.6))' }}
          />
        </motion.svg>
      ))}
    </motion.div>
  );
}

// ── LP Counter Roll ──
function LPCounter() {
  const [lp, setLp] = useState(8000);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    const cycle = () => {
      if (!active) return;
      const target = 1000 + Math.floor(Math.random() * 7000);
      const step = lp > target ? -200 : 200;
      let current = lp;
      const tick = () => {
        if (!active) return;
        current += step;
        if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
          current = target;
          setLp(current);
          timer.current = setTimeout(() => cycle(), 3000 + Math.random() * 4000);
          return;
        }
        setLp(current);
        timer.current = setTimeout(tick, 40);
      };
      tick();
    };
    timer.current = setTimeout(() => cycle(), 2000);
    return () => { active = false; if (timer.current) clearTimeout(timer.current); };
  }, []);

  const display = String(lp).padStart(4, '0');

  return (
    <motion.div className="absolute" style={{
      right: '15px', bottom: '18px',
      zIndex: 10,
    }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '9px', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: '#8A708B',
        marginBottom: '2px',
      }}>LP</div>
      <div style={{
        fontFamily: "'Space Grotesk', monospace",
        fontSize: '18px', fontWeight: 700,
        letterSpacing: '0.05em',
        color: '#C4A8C5',
        textShadow: '0 0 10px rgba(174,145,175,0.4)',
      }}>
        {display}
      </div>
    </motion.div>
  );
}

// ── Card Fan Spread ──
function CardFan() {
  const [spread, setSpread] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    const cycle = () => {
      if (!active) return;
      timer.current = setTimeout(() => {
        if (!active) return;
        setSpread(true);
        setTimeout(() => { if (active) setSpread(false); }, 2500);
        cycle();
      }, 5000 + Math.random() * 4000);
    };
    cycle();
    return () => { active = false; if (timer.current) clearTimeout(timer.current); };
  }, []);

  const cards = [
    { rot: -25, x: -35, y: 10 },
    { rot: -12, x: -15, y: 5 },
    { rot: 0, x: 5, y: 0 },
    { rot: 12, x: 25, y: 5 },
    { rot: 25, x: 45, y: 10 },
  ];

  return (
    <div className="absolute pointer-events-none" style={{
      left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 5,
    }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '40px', height: '60px',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, hsla(345,50%,20%,0.7) 0%, hsla(340,40%,15%,0.6) 100%)',
          border: '1px solid hsla(345,60%,45%,0.3)',
          boxShadow: '0 2px 10px rgba(255,80,120,0.15)',
          transform: spread
            ? `translateX(${c.x}px) translateY(${c.y}px) rotate(${c.rot}deg) scale(1)`
            : 'translateX(0) translateY(0) rotate(0deg) scale(0.3)',
          opacity: spread ? 0.9 : 0,
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s`,
        }}>
          <div style={{
            position: 'absolute', top: '6px', left: '6px', right: '6px',
            height: '18px', borderRadius: '2px',
            background: 'rgba(255,100,140,0.15)',
          }} />
          <div style={{
            position: 'absolute', bottom: '8px', left: '8px', right: '8px',
            height: '2px', borderRadius: '1px',
            background: 'rgba(255,120,160,0.2)',
          }} />
        </div>
      ))}
    </div>
  );
}

// ── MAIN BANNER ──
function YGOServer2Inner() {
  return (
    <div className="w-full flex items-center justify-center" style={{ background: 'transparent' }}>
      <div
        data-testid="ygo-server2-banner"
        className="relative overflow-hidden"
        style={{
          width: '680px', height: '240px',
          background: 'linear-gradient(135deg, hsl(345,60%,10%) 0%, hsl(340,50%,14%) 30%, hsl(335,45%,12%) 60%, hsl(350,55%,11%) 100%)',
          borderRadius: '10px',
          boxShadow: [
            '0 0 0 1px hsl(345,40%,20%)',
            '0 0 40px 6px rgba(255,80,120,0.1)',
            '0 32px 80px -8px rgba(0,0,0,0.9)',
          ].join(','),
        }}
      >
        {/* Deep radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 50% 70% at 30% 50%, hsla(345,50%,20%,0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 60% at 75% 55%, hsla(340,45%,18%,0.2) 0%, transparent 50%)',
          ].join(','),
        }} />

        {/* Effects */}
        <Particles />
        <HologramLines />
        <CardGlow />
        <EnergyStreaks />
        <FloatingCards />
        <CardFan />

        {/* Top border — pink/red */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(345,60%,40%) 20%, hsl(340,70%,55%) 50%, hsl(345,60%,40%) 80%, transparent 100%)',
          opacity: 0.6,
          zIndex: 20,
        }} />

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(345,50%,35%) 30%, hsl(340,60%,48%) 50%, hsl(345,50%,35%) 70%, transparent 100%)',
          opacity: 0.5,
          zIndex: 20,
        }} />

        {/* ── CHARACTER — right side ── */}
        <motion.div className="absolute pointer-events-none" style={{
          right: '-5px', bottom: '-80px',
          height: '300px', width: 'auto',
          zIndex: 6,
          filter: 'brightness(0.9) contrast(1.05) drop-shadow(0 0 15px hsla(345,60%,50%,0.3)) drop-shadow(0 0 30px hsla(340,50%,45%,0.15))',
        }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <img src="/ygo-server2-char.png" alt="" style={{ height: '100%', width: 'auto', display: 'block' }} />
        </motion.div>

        {/* Red tint overlay on character area */}
        <div className="absolute pointer-events-none" style={{
          right: '0px', top: '0px',
          width: '280px', height: '240px',
          background: [
            'linear-gradient(135deg, hsla(345,40%,12%,0.3) 0%, hsla(340,35%,15%,0.15) 50%, transparent 100%)',
            'linear-gradient(180deg, transparent 0%, hsla(345,40%,10%,0.12) 100%)',
          ].join(','),
          mixBlendMode: 'color',
          zIndex: 7,
        }} />

        {/* Mist over character bottom */}
        <div className="absolute pointer-events-none" style={{
          right: '0px', bottom: '0px',
          width: '280px', height: '100px',
          background: 'linear-gradient(0deg, hsla(345,40%,10%,0.4) 0%, transparent 100%)',
          zIndex: 7,
        }} />

        {/* ── TEXT — left side (mauve #AE91AF) ── */}
        <div className="absolute flex flex-col justify-center" style={{
          left: '32px', top: '0px', height: '100%',
          zIndex: 10,
        }}>
          {/* Level Stars */}
          <LevelStars />
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#AE91AF',
              marginBottom: '4px',
            }}>
            It's Time to Duel
          </motion.p>

          {/* Name — mauve gradient */}
          <motion.h1
            data-testid="text-name"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ygos2-gradient-flow"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '52px', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(90deg, #C4A8C5 0%, #AE91AF 25%, #8A708B 50%, #C4A8C5 75%, #B8A0B9 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 18px hsla(299,16%,55%,0.25))',
            }}>
            Duelist Legacy
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px', fontWeight: 400,
              letterSpacing: '0.06em',
              color: '#6B5A6C',
              marginTop: '2px',
            }}>
            Duel. Dominate. Descend.
          </motion.p>

          {/* Badges */}
          <motion.div
            className="flex gap-2 mt-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {['Duel', 'Compete', 'Ascend'].map(b => (
              <span key={b} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(174,145,175,0.25)',
                color: '#AE91AF',
                background: 'rgba(80,50,80,0.4)',
              }}>
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Online status */}
        <motion.div className="absolute flex items-center gap-2" style={{
          left: '32px', bottom: '18px',
          zIndex: 10,
        }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#AE91AF',
            boxShadow: '0 0 8px rgba(174,145,175,0.6)',
            animation: 'simoOnlinePulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#8A708B',
          }}>
            DUEL NOW
          </span>
        </motion.div>

        {/* Server badge — top right */}
        <motion.div className="absolute flex items-center gap-1.5" style={{
          right: '14px', top: '12px',
          zIndex: 10,
          padding: '4px 10px',
          borderRadius: '5px',
          background: 'rgba(60,40,60,0.5)',
          border: '1px solid rgba(174,145,175,0.2)',
          backdropFilter: 'blur(4px)',
        }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#AE91AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '8px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#AE91AF',
          }}>
            DUELIST
          </span>
        </motion.div>

        {/* LP Counter */}
        <LPCounter />
      </div>
    </div>
  );
}

export default function YGOServer2Banner() {
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [typed, setTyped] = useState('');
  const replay = useCallback(() => { setAnimKey(k => k + 1); setLoaded(false); setProgress(0); setTyped(''); }, []);

  const text = 'اخبار و بطولات يوغي';

  const loaderDots = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 680,
    y: Math.random() * 240,
    size: 1.5 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.25,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 4,
  })), []);

  const cardFragments = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 40 + Math.random() * 600,
    y: 20 + Math.random() * 200,
    w: 12 + Math.random() * 18,
    h: 18 + Math.random() * 26,
    rot: Math.random() * 360,
    drift: -8 - Math.random() * 20,
    dur: 5 + Math.random() * 6,
    delay: Math.random() * 5,
    opacity: 0.25 + Math.random() * 0.3,
  })), []);

  useEffect(() => {
    if (loaded) return;
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 0.5 + Math.random() * 0.1;
        if (next >= 100) { clearInterval(interval); setTimeout(() => setLoaded(true), 400); return 100; }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [loaded, animKey]);

  useEffect(() => {
    if (loaded) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [loaded, animKey]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      {!loaded ? (
        <div className="w-full flex items-center justify-center">
          <div style={{
            width: '680px', height: '240px', borderRadius: '10px', position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            animation: 'loaderBorderPulse 3s ease-in-out infinite',
            boxShadow: '0 0 0 1px hsl(345,40%,20%), 0 0 40px 6px rgba(255,80,120,0.1), 0 32px 80px -8px rgba(0,0,0,0.9)',
          }}>
            {/* Animated gradient bg */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, hsl(345,35%,8%), hsl(330,30%,6%), hsl(350,25%,5%), hsl(340,35%,7%), hsl(345,35%,8%))',
              backgroundSize: '400% 400%',
              animation: 'loaderBgShift 8s ease-in-out infinite',
            }} />

            {/* Rotating card silhouette — center */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: '60px', height: '90px',
              border: '2px solid rgba(255,100,130,0.4)',
              borderRadius: '4px',
              transform: 'translate(-50%,-50%)',
              animation: 'loaderCardSpin 12s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Floating card fragments */}
            {cardFragments.map(c => (
              <div key={c.id} style={{
                position: 'absolute',
                left: `${c.x}px`, top: `${c.y}px`,
                width: `${c.w}px`, height: `${c.h}px`,
                border: '1.5px solid rgba(255,120,150,0.35)',
                borderRadius: '2px',
                '--rot': `${c.rot}deg`,
                '--drift': `${c.drift}px`,
                '--op': c.opacity,
                animation: `loaderCardFloat ${c.dur}s ease-in-out ${c.delay}s infinite`,
              } as any} />
            ))}

            {/* Floating dots */}
            {loaderDots.map(p => (
              <div key={p.id} style={{
                position: 'absolute',
                left: `${p.x}px`, top: `${p.y}px`,
                width: `${p.size}px`, height: `${p.size}px`,
                borderRadius: '50%',
                background: `rgba(255,100,130,${p.opacity + 0.25})`,
                boxShadow: `0 0 ${p.size + 4}px rgba(255,80,120,${(p.opacity + 0.25) * 0.6})`,
                animation: `ygos2Float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              }} />
            ))}

            {/* Shimmer sweep */}
            <div style={{
              position: 'absolute', inset: 0,
              width: '100px',
              background: 'linear-gradient(90deg, transparent, rgba(255,120,150,0.25), transparent)',
              animation: 'loaderShimmer 3s ease-in-out infinite',
              pointerEvents: 'none', zIndex: 5,
            }} />

            {/* Scanline */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
              pointerEvents: 'none', zIndex: 3,
            }} />

            {/* Arabic typed text — mauve */}
            <div style={{
              fontFamily: "'Space Grotesk', 'Noto Sans Arabic', sans-serif",
              direction: 'rtl',
              fontSize: '26px', fontWeight: 700,
              letterSpacing: '0.02em',
              backgroundImage: 'linear-gradient(90deg, #C4A8C5, #AE91AF, #C4A8C5)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '24px', zIndex: 6,
              minHeight: '36px',
            }}>
              {typed}<span style={{
                WebkitTextFillColor: '#AE91AF',
                animation: 'blink 0.8s steps(1) infinite',
              }}>|</span>
            </div>

            {/* Progress bar */}
            <div style={{
              width: '260px', height: '3px', borderRadius: '2px',
              background: 'hsla(345,25%,18%,0.6)', overflow: 'hidden', position: 'relative', zIndex: 6,
            }}>
              <div style={{
                width: `${Math.min(progress, 100)}%`, height: '100%', borderRadius: '2px',
                background: 'linear-gradient(90deg, hsl(345,65%,45%), hsl(340,75%,55%), hsl(345,65%,45%))',
                boxShadow: '0 0 10px hsla(345,70%,55%,0.4)',
                transition: 'width 0.05s linear',
              }} />
            </div>

            {/* Percentage */}
            <div style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em',
              color: 'hsl(345,40%,40%)', marginTop: '10px', zIndex: 6,
            }}>
              {Math.floor(Math.min(progress, 100))}%
            </div>
          </div>
        </div>
      ) : (
        <YGOServer2Inner key={animKey} />
      )}
      <button
        onClick={replay}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8A708B',
          background: 'rgba(40,25,40,0.6)',
          border: '1px solid rgba(174,145,175,0.3)',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '5px',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(174,145,175,0.5)';
          e.currentTarget.style.color = '#C4A8C5';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(174,145,175,0.3)';
          e.currentTarget.style.color = '#8A708B';
        }}
      >REPLAY</button>
    </div>
  );
}
