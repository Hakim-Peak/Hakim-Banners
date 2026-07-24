import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ── Falling snow (deflects near scope) ──
function Snowfall({ scopePos }: { scopePos: { x: number; y: number } | null }) {
  const flakes = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 720,
    size: 1 + Math.random() * 3,
    dur: 4 + Math.random() * 8,
    delay: Math.random() * 8,
    drift: -30 + Math.random() * 60,
    opacity: 0.3 + Math.random() * 0.6,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      {flakes.map(f => {
        const dx = scopePos ? f.x - scopePos.x : 999;
        const dy = scopePos ? 120 - scopePos.y : 999;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const deflect = dist < 80 ? (1 - dist / 80) * 25 : 0;
        const defX = deflect * (dx > 0 ? 1 : -1);

        return (
          <div key={f.id} style={{
            position: 'absolute',
            left: `${f.x}px`, top: '-10px',
            width: `${f.size}px`, height: `${f.size}px`,
            borderRadius: '50%',
            background: `rgba(130,130,130,${f.opacity})`,
            boxShadow: `0 0 ${f.size + 1}px rgba(120,120,120,${f.opacity * 0.4})`,
            animation: `simoSnowfall ${f.dur}s linear ${f.delay}s infinite`,
            // @ts-ignore
            '--drift': `${f.drift + defX}px`,
          }} />
        );
      })}
    </div>
  );
}

// ── Winter fog (rolling banks with drift) ──
function WinterFog() {
  const banks = [
    { h: 60, y: 0, opacity: 0.18, blur: 18, speed: 16, delay: 0, dir: 1 },
    { h: 45, y: 10, opacity: 0.12, blur: 24, speed: 22, delay: 3, dir: -1 },
    { h: 80, y: -5, opacity: 0.22, blur: 14, speed: 12, delay: 1, dir: 1 },
    { h: 35, y: 20, opacity: 0.08, blur: 30, speed: 28, delay: 5, dir: -1 },
    { h: 50, y: 5, opacity: 0.15, blur: 20, speed: 18, delay: 7, dir: 1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, overflow: 'hidden' }}>
      {banks.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: `${b.y}px`,
          left: `${-80 + (b.dir > 0 ? 0 : -40)}px`,
          width: '840px',
          height: `${b.h}px`,
          background: `radial-gradient(ellipse 120% 100% at 50% 100%, hsla(0,0%,70%,${b.opacity}) 0%, hsla(0,0%,80%,${b.opacity * 0.5}) 50%, transparent 100%)`,
          filter: `blur(${b.blur}px)`,
          animation: `simoFogDrift${b.dir > 0 ? 'R' : 'L'} ${b.speed}s ${b.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
      {/* Mid-height fog wisps */}
      <div style={{
        position: 'absolute', top: '60px', left: '-60px',
        width: '800px', height: '40px',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, hsla(0,0%,75%,0.1) 0%, transparent 70%)',
        filter: 'blur(20px)',
        animation: 'simoFogDriftR 20s 2s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', top: '140px', left: '-40px',
        width: '760px', height: '30px',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, hsla(0,0%,78%,0.08) 0%, transparent 70%)',
        filter: 'blur(25px)',
        animation: 'simoFogDriftL 24s 6s ease-in-out infinite alternate',
      }} />
    </div>
  );
}

// ── Frost edges ──
function FrostEdges() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {/* Top frost */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '35px',
        background: 'linear-gradient(180deg, rgba(180,180,180,0.15) 0%, transparent 100%)',
      }} />
      {/* Left frost */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px',
        background: 'linear-gradient(90deg, rgba(180,180,180,0.12) 0%, transparent 100%)',
      }} />
      {/* Bottom frost */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '20px',
        background: 'linear-gradient(0deg, hsla(0,0%,75%,0.25) 0%, transparent 100%)',
      }} />
      {/* Right frost */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px',
        background: 'linear-gradient(270deg, rgba(180,180,180,0.12) 0%, transparent 100%)',
      }} />
      {/* Frost crystal — top left */}
      <svg className="absolute" style={{ top: '5px', left: '8px', opacity: 0.15 }} width="30" height="30" viewBox="0 0 30 30">
        <line x1="15" y1="0" x2="15" y2="30" stroke="rgba(100,100,100,0.5)" strokeWidth="0.5" />
        <line x1="0" y1="15" x2="30" y2="15" stroke="rgba(100,100,100,0.5)" strokeWidth="0.5" />
        <line x1="4" y1="4" x2="26" y2="26" stroke="rgba(100,100,100,0.35)" strokeWidth="0.4" />
        <line x1="26" y1="4" x2="4" y2="26" stroke="rgba(100,100,100,0.35)" strokeWidth="0.4" />
        <line x1="15" y1="5" x2="11" y2="2" stroke="rgba(100,100,100,0.3)" strokeWidth="0.3" />
        <line x1="15" y1="5" x2="19" y2="2" stroke="rgba(100,100,100,0.3)" strokeWidth="0.3" />
        <line x1="15" y1="25" x2="11" y2="28" stroke="rgba(100,100,100,0.3)" strokeWidth="0.3" />
        <line x1="15" y1="25" x2="19" y2="28" stroke="rgba(100,100,100,0.3)" strokeWidth="0.3" />
      </svg>
      {/* Frost crystal — bottom right */}
      <svg className="absolute" style={{ bottom: '8px', right: '12px', opacity: 0.12 }} width="24" height="24" viewBox="0 0 24 24">
        <line x1="12" y1="0" x2="12" y2="24" stroke="rgba(100,100,100,0.5)" strokeWidth="0.5" />
        <line x1="0" y1="12" x2="24" y2="12" stroke="rgba(100,100,100,0.5)" strokeWidth="0.5" />
        <line x1="3" y1="3" x2="21" y2="21" stroke="rgba(100,100,100,0.3)" strokeWidth="0.3" />
        <line x1="21" y1="3" x2="3" y2="21" stroke="rgba(100,100,100,0.3)" strokeWidth="0.3" />
      </svg>
    </div>
  );
}

// ── Sniper scope (appears, locks on, data flickers, fades) ──
function SniperScope({ onPosChange }: { onPosChange: (pos: { x: number; y: number } | null) => void }) {
  const [phase, setPhase] = useState<'off' | 'appear' | 'lock' | 'hold' | 'fade'>('off');
  const [pos, setPos] = useState({ x: 400, y: 120 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    const schedule = () => {
      if (!active) return;
      timerRef.current = setTimeout(() => {
        if (!active) return;
        const newPos = { x: 260 + Math.random() * 140, y: 60 + Math.random() * 120 };
        setPos(newPos);
        onPosChange(newPos);
        setPhase('appear');
        setTimeout(() => { if (active) setPhase('lock'); }, 300);
        setTimeout(() => { if (active) setPhase('hold'); }, 700);
        setTimeout(() => { if (active) { setPhase('fade'); } }, 2000);
        setTimeout(() => { if (active) { setPhase('off'); onPosChange(null); } }, 2600);
        schedule();
      }, 3000 + Math.random() * 2000);
    };
    schedule();
    return () => { active = false; if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  if (phase === 'off') return null;

  const rotation = phase === 'lock' ? -1.5 + Math.random() * 3 : 0;
  const scale = phase === 'appear' ? 0.6 : phase === 'lock' ? 1.05 : phase === 'hold' ? 1 : 1.1;
  const opacity = phase === 'appear' ? 0.7 : phase === 'fade' ? 0 : 1;

  return (
    <div className="absolute pointer-events-none" style={{
      left: `${pos.x}px`, top: `${pos.y}px`,
      width: '120px', height: '120px',
      marginLeft: '-60px', marginTop: '-60px',
      zIndex: 9,
      opacity,
      transition: 'opacity 0.4s ease-out',
    }}>
      <div style={{
        width: '100%', height: '100%',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transition: phase === 'lock' ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
      }}>
        <svg width="120" height="120" viewBox="0 0 160 160" fill="none">
          <circle cx="80" cy="80" r="74" stroke="rgba(180,30,30,0.6)" strokeWidth="2" />
          <circle cx="80" cy="80" r="55" stroke="rgba(180,30,30,0.3)" strokeWidth="1" />
          <circle cx="80" cy="80" r="30" stroke="rgba(180,30,30,0.4)" strokeWidth="0.8" />
          <line x1="80" y1="4" x2="80" y2="60" stroke="rgba(180,30,30,0.7)" strokeWidth="1.5" />
          <line x1="80" y1="100" x2="80" y2="156" stroke="rgba(180,30,30,0.7)" strokeWidth="1.5" />
          <line x1="4" y1="80" x2="60" y2="80" stroke="rgba(180,30,30,0.7)" strokeWidth="1.5" />
          <line x1="100" y1="80" x2="156" y2="80" stroke="rgba(180,30,30,0.7)" strokeWidth="1.5" />
          {[20, 40, 120, 140].map(y => <circle key={`v${y}`} cx="80" cy={y} r="1.5" fill="rgba(180,30,30,0.6)" />)}
          {[20, 40, 120, 140].map(x => <circle key={`h${x}`} cx={x} cy="80" r="1.5" fill="rgba(180,30,30,0.6)" />)}
          <circle cx="80" cy="80" r="2.5" fill={`rgba(180,30,30,${phase === 'lock' ? 0.9 : 0.7})`}>
            {phase === 'lock' && <animate attributeName="r" values="2.5;4;2.5" dur="0.3s" repeatCount="3" />}
          </circle>
          {phase !== 'appear' && (
            <g stroke="rgba(180,30,30,0.7)" strokeWidth="1.5" fill="none">
              <path d="M40 40 L40 50 M40 40 L50 40" />
              <path d="M120 40 L120 50 M120 40 L110 40" />
              <path d="M40 120 L40 110 M40 120 L50 120" />
              <path d="M120 120 L120 110 M120 120 L110 120" />
            </g>
          )}
          <text x="14" y="18" fill="rgba(180,30,30,0.7)" fontSize="7" fontFamily="monospace">
            {phase === 'hold' ? '327m' : phase === 'lock' ? 'RNG...' : ''}
          </text>
          <text x="14" y="150" fill="rgba(180,30,30,0.6)" fontSize="6" fontFamily="monospace">
            {phase === 'hold' ? 'WIND 0.3' : ''}
          </text>
          <text x="110" y="18" fill="rgba(180,30,30,0.6)" fontSize="6" fontFamily="monospace">
            {phase === 'lock' || phase === 'hold' ? '×4' : ''}
          </text>
        </svg>
      </div>
      <div className="absolute inset-0" style={{
        borderRadius: '50%',
        boxShadow: [
          'inset 0 0 30px 15px rgba(255,255,255,0.3)',
          `inset 0 0 60px 30px rgba(255,30,30,${phase === 'lock' ? 0.04 : 0.01})`,
        ].join(','),
      }} />
    </div>
  );
}

// ── Breath/steam puffs ──
function BreathSteam() {
  const puffs = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    delay: i * 2.5,
    x: 120 + Math.random() * 60,
  }));

  return (
    <div className="absolute pointer-events-none" style={{ zIndex: 7 }}>
      {puffs.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}px`, bottom: '95px',
          width: '20px', height: '14px',
          borderRadius: '50%',
          background: 'rgba(200,200,200,0.15)',
          filter: 'blur(4px)',
          animation: `simoBreath 3s ${p.delay}s ease-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ── Bullet tracer ──
// ── Shell casing fall ──
function ShellCasing({ trigger }: { trigger: number }) {
  if (trigger === 0) return null;
  return (
    <>
      {/* Casing */}
      <div key={trigger} className="absolute pointer-events-none" style={{
        left: `${380 + Math.random() * 30}px`, top: '0px',
        zIndex: 14,
        animation: `simoCasingDrop 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
      }}>
        <svg width="10" height="22" viewBox="0 0 10 22" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
          {/* Brass casing body */}
          <rect x="2" y="0" width="6" height="14" rx="1.5" fill="hsl(40,65%,50%)" stroke="hsl(38,50%,35%)" strokeWidth="0.6" />
          {/* Casing neck */}
          <rect x="3" y="0" width="4" height="3" rx="0.8" fill="hsl(40,70%,55%)" />
          {/* Metallic highlight */}
          <rect x="3.5" y="2" width="1.5" height="10" rx="0.5" fill="hsla(40,80%,70%,0.5)" />
          {/* Base/rim */}
          <rect x="1" y="14" width="8" height="4" rx="1" fill="hsl(38,55%,40%)" stroke="hsl(36,45%,30%)" strokeWidth="0.5" />
          {/* Primer dot */}
          <circle cx="5" cy="16" r="1.2" fill="hsl(38,40%,30%)" stroke="hsl(36,35%,25%)" strokeWidth="0.3" />
        </svg>
      </div>
      {/* Metallic glint flash */}
      <div key={`glint-${trigger}`} className="absolute pointer-events-none" style={{
        left: `${380 + Math.random() * 30}px`, top: '5px',
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsla(40,80%,80%,0.8) 0%, transparent 70%)',
        zIndex: 15,
        animation: 'simoCasingGlint 0.6s ease-out forwards',
      }} />
    </>
  );
}

// ── MAIN BANNER ──
function SimoBannerInner() {
  const [scopePos, setScopePos] = useState<{ x: number; y: number } | null>(null);
  const [casingTrigger, setCasingTrigger] = useState(0);

  const handleScopePos = useCallback((pos: { x: number; y: number } | null) => {
    setScopePos(pos);
    if (pos) setCasingTrigger(t => t + 1);
  }, []);

  return (
    <div className="w-full flex items-center justify-center" style={{ background: 'transparent' }}>
      <div
        data-testid="simo-banner"
        className="relative overflow-hidden"
        style={{
          width: '680px', height: '240px',
          background: 'linear-gradient(135deg, hsl(0,0%,88%) 0%, hsl(0,0%,92%) 50%, hsl(0,0%,89%) 100%)',
          borderRadius: '10px',
          boxShadow: [
            '0 0 0 1px hsl(0,0%,80%)',
            '0 0 40px 6px rgba(255,255,255,0.15)',
            '0 32px 80px -8px rgba(0,0,0,0.3)',
          ].join(','),
        }}
      >
        {/* Deep cold radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 50% 70% at 30% 50%, hsla(0,0%,70%,0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 60% at 75% 55%, hsla(0,0%,75%,0.2) 0%, transparent 50%)',
          ].join(','),
        }} />

        {/* Effects */}
        <WinterFog />
        <Snowfall scopePos={scopePos} />
        <FrostEdges />
        <SniperScope onPosChange={handleScopePos} />
        <ShellCasing trigger={casingTrigger} />
        <BreathSteam />

        {/* Top border — icy */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,70%) 20%, hsl(0,0%,85%) 50%, hsl(0,0%,70%) 80%, transparent 100%)',
          opacity: 0.5,
          zIndex: 20,
        }} />

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(0,0%,75%) 30%, hsl(0,0%,85%) 50%, hsl(0,0%,75%) 70%, transparent 100%)',
          opacity: 0.4,
          zIndex: 20,
        }} />

        {/* ── CHARACTER — right side ── */}
        <motion.div className="absolute pointer-events-none" style={{
          right: '-5px', bottom: '-10px',
          height: '250px', width: 'auto',
          zIndex: 6,
          filter: 'brightness(1.1) contrast(0.95) drop-shadow(0 0 15px hsla(0,0%,50%,0.3)) drop-shadow(0 0 30px hsla(0,0%,60%,0.15))',
        }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <img src="/simo.png" alt="" style={{ height: '100%', width: 'auto', display: 'block' }} />
        </motion.div>

        {/* White-tint overlay on character area — matches banner background */}
        <div className="absolute pointer-events-none" style={{
          right: '0px', top: '0px',
          width: '280px', height: '240px',
          background: [
            'linear-gradient(135deg, hsla(0,0%,80%,0.35) 0%, hsla(0,0%,85%,0.2) 50%, transparent 100%)',
            'linear-gradient(180deg, transparent 0%, hsla(0,0%,80%,0.15) 100%)',
          ].join(','),
          mixBlendMode: 'color',
          zIndex: 7,
        }} />

        {/* White mist over character bottom */}
        <div className="absolute pointer-events-none" style={{
          right: '0px', bottom: '0px',
          width: '280px', height: '120px',
          background: 'linear-gradient(0deg, hsla(0,0%,80%,0.5) 0%, transparent 100%)',
          zIndex: 7,
        }} />

        {/* ── TEXT — left side ── */}
        <div className="absolute flex flex-col justify-center" style={{
          left: '32px', top: '0px', height: '100%',
          zIndex: 10,
        }}>
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'hsl(0,0%,35%)',
              marginBottom: '4px',
            }}>
            The White Death
          </motion.p>

          {/* Name — icy gradient */}
          <motion.h1
            data-testid="text-name"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="simo-gradient-flow"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '68px', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.03em',
              backgroundImage: 'linear-gradient(90deg, hsl(0,0%,20%) 0%, hsl(0,0%,35%) 25%, hsl(0,0%,50%) 50%, hsl(0,0%,25%) 75%, hsl(0,0%,40%) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 18px hsla(0,0%,30%,0.2))',
            }}>
            Simo
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
              color: 'hsl(0,0%,40%)',
              marginTop: '2px',
            }}>
            542 confirmed kills
          </motion.p>

          {/* Badges */}
          <motion.div
            className="flex gap-2 mt-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {['Sniper', 'White Death', 'Ragnarok'].map(b => (
              <span key={b} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid hsla(0,0%,40%,0.3)',
                color: 'hsl(0,0%,35%)',
                background: 'hsla(0,0%,90%,0.5)',
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
            background: 'hsl(200,70%,55%)',
            boxShadow: '0 0 8px hsla(200,70%,55%,0.6)',
            animation: 'simoOnlinePulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'hsl(200,40%,50%)',
          }}>
            IN THE FIELD
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function SimoBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <SimoBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'hsl(0,0%,40%)',
          background: 'hsla(0,0%,95%,0.6)',
          border: '1px solid hsla(0,0%,60%,0.3)',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '5px',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsla(0,0%,40%,0.5)';
          e.currentTarget.style.color = 'hsl(0,0%,20%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsla(0,0%,60%,0.3)';
          e.currentTarget.style.color = 'hsl(0,0%,40%)';
        }}
      >REPLAY</button>
    </div>
  );
}
