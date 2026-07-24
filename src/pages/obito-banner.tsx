import { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Fade, Slide } from 'react-awesome-reveal';
import gsap from 'gsap';

// ── Large Rinnegan Eye ──
function RinneganEye() {
  const rings = 6;
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
        style={{ width: '200px', height: '200px' }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200"
          style={{ filter: 'blur(0.3px)', animation: 'obitoRinneganSpin 40s linear infinite' }}>
        <defs>
          <radialGradient id="rinnegan-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsla(270,60%,65%,0.25)" />
            <stop offset="40%" stopColor="hsla(270,50%,55%,0.12)" />
            <stop offset="70%" stopColor="hsla(270,40%,45%,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx={cx} cy={cy} r={cx * 0.95} fill="url(#rinnegan-glow)" />

        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={cx * 0.88} fill="none"
          stroke="hsla(270,45%,60%,0.3)" strokeWidth="1.5" />

        {/* Concentric rings */}
        {Array.from({ length: rings }, (_, i) => {
          const r = cx * (0.22 + i * 0.11);
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={`hsla(270,50%,65%,${0.3 - i * 0.03})`}
              strokeWidth={i === 0 ? '1.2' : '0.8'} />
          );
        })}

        {/* Pupil */}
        <circle cx={cx} cy={cy} r={cx * 0.12} fill="hsla(270,55%,50%,0.4)" />
        <circle cx={cx} cy={cy} r={cx * 0.06} fill="hsla(270,60%,60%,0.5)" />
      </svg>
      </motion.div>
    </div>
  );
}

// ── Floating Kanji ──
function FloatingKanji() {
  const chars = useMemo(() => [
    { char: '幻', x: 60, y: 30, size: 28, dur: 12, delay: 0, opacity: 0.1 },
    { char: '影', x: 560, y: 170, size: 22, dur: 15, delay: 2, opacity: 0.08 },
    { char: '闇', x: 500, y: 30, size: 32, dur: 10, delay: 1, opacity: 0.09 },
    { char: '虚', x: 120, y: 160, size: 18, dur: 18, delay: 3, opacity: 0.07 },
    { char: '輪', x: 590, y: 100, size: 20, dur: 14, delay: 4, opacity: 0.08 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, overflow: 'hidden' }}>
      {chars.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${c.x}px`, top: `${c.y}px`,
          fontFamily: "'Noto Sans JP', serif",
          fontSize: `${c.size}px`,
          fontWeight: 700,
          color: `hsla(270,30%,70%,${c.opacity})`,
          animation: `obitoKanjiFloat ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
        }}>
          {c.char}
        </div>
      ))}
    </div>
  );
}

// ── Glitch Distortion Bar ──
function GlitchBar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      const next = 4000 + Math.random() * 6000;
      timeout = setTimeout(() => {
        setActive(true);
        setTimeout(() => setActive(false), 100 + Math.random() * 150);
        trigger();
      }, next);
    };
    trigger();
    return () => clearTimeout(timeout);
  }, []);

  if (!active) return null;

  const y = Math.random() * 200;
  const h = 2 + Math.random() * 6;

  return (
    <div className="absolute pointer-events-none" style={{
      left: 0, right: 0,
      top: `${y}px`, height: `${h}px`,
      background: 'hsla(270,40%,70%,0.06)',
      transform: `translateX(${(Math.random() - 0.5) * 10}px)`,
      zIndex: 20,
    }} />
  );
}

// ── Reality Crack Lines ──
function RealityCracks() {
  const cracks = useMemo(() => [
    'M120,0 L125,35 L118,60 L128,95 L115,130 L125,165 L118,200 L130,240',
    'M400,0 L395,30 L405,55 L392,80 L400,120 L390,160 L398,200 L385,240',
    'M550,0 L545,25 L555,50 L540,85 L550,115 L538,155 L548,195 L535,240',
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, overflow: 'hidden' }}>
      <svg width="680" height="240" viewBox="0 0 680 240" style={{ opacity: 0.18 }}>
        <defs>
          <filter id="crack-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>
        {cracks.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="hsla(270,30%,80%,0.7)" strokeWidth="0.5"
              strokeDasharray="3 6" style={{
                animation: `obitoCrackPulse ${3 + i * 0.7}s ease-in-out ${i * 0.8}s infinite alternate`,
              }} />
            <path d={d} fill="none" stroke="hsla(270,30%,70%,0.25)" strokeWidth="2"
              filter="url(#crack-glow)" strokeDasharray="3 6" style={{
                animation: `obitoCrackPulse ${3 + i * 0.7}s ease-in-out ${i * 0.8}s infinite alternate`,
              }} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Spatial Tear ──
function SpatialTear() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.to(ref.current, {
      scaleY: [0.8, 1.1, 0.9, 1],
      opacity: [0.06, 0.12, 0.08, 0.1],
      duration: 6,
      repeat: -1,
      ease: 'sine.inOut',
    });
    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="absolute pointer-events-none" style={{
      right: '310px', top: '0',
      width: '3px', height: '100%',
      background: 'linear-gradient(180deg, transparent 0%, hsla(270,40%,80%,0.3) 30%, hsla(280,50%,75%,0.4) 50%, hsla(270,40%,80%,0.3) 70%, transparent 100%)',
      filter: 'blur(2px)',
      zIndex: 3,
    }} />
  );
}

// ── Floating Void Orbs ──
function VoidOrbs() {
  const orbs = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 620,
    y: 20 + Math.random() * 200,
    size: 2 + Math.random() * 6,
    dur: 5 + Math.random() * 8,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, overflow: 'hidden' }}>
      {orbs.map(o => (
        <div key={o.id} style={{
          position: 'absolute',
          left: `${o.x}px`, top: `${o.y}px`,
          width: `${o.size}px`, height: `${o.size}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(270,40%,80%,0.3) 0%, transparent 70%)',
          boxShadow: `0 0 ${o.size * 3}px hsla(270,30%,60%,0.15)`,
          animation: `obitoOrbFloat ${o.dur}s ease-in-out ${o.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ── Scan Line ──
function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, hsla(270,30%,80%,0.15) 30%, hsla(270,30%,80%,0.25) 50%, hsla(270,30%,80%,0.15) 70%, transparent 100%)',
        animation: 'obitoScanMove 8s linear infinite',
      }} />
    </div>
  );
}

// ── Japanese Quote ──
function Quote() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute pointer-events-none" style={{
      left: '36px', top: '22px',
      zIndex: 10,
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(-4px)',
      transition: 'all 0.8s ease',
    }}>
      <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: '9px', fontWeight: 400,
        color: 'hsla(270,30%,70%,0.3)',
        letterSpacing: '0.15em',
      }}>
        「お前の涙はもういらない」
      </div>
    </div>
  );
}

// ── Vertical Label ──
function VerticalLabel() {
  return (
    <div className="absolute pointer-events-none" style={{
      left: '8px', top: '50%',
      transform: 'translateY(-50%) rotate(-90deg)',
      transformOrigin: 'center center',
      zIndex: 10,
    }}>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '7px', fontWeight: 300,
        letterSpacing: '0.45em',
        textTransform: 'uppercase',
        color: 'hsla(270,20%,70%,0.16)',
        whiteSpace: 'nowrap',
      }}>
        Mangekyo Sharingan
      </span>
    </div>
  );
}

// ── MAIN BANNER ──
function ObitoInner() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    imgAnimRef.current = gsap.fromTo(imgRef.current,
      { y: 4 },
      { y: -4, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' }
    );
    return () => { imgAnimRef.current?.kill(); };
  }, []);

  return (
    <div
      data-testid="obito-banner"
      className="relative overflow-hidden"
      style={{
        width: '680px', height: '240px',
        borderRadius: '10px',
        background: 'linear-gradient(160deg, #111118 0%, #0e0e14 30%, #13121a 60%, #0c0c12 100%)',
        boxShadow: [
          '0 0 0 1px hsla(270,20%,18%,0.6)',
          '0 0 60px 2px hsla(270,30%,25%,0.12)',
          '0 40px 100px -12px rgba(0,0,0,0.95)',
        ].join(','),
      }}
    >
      {/* Purple atmosphere glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 50% 60% at 65% 50%, hsla(270,35%,55%,0.12) 0%, transparent 60%)',
          'radial-gradient(ellipse 40% 40% at 25% 50%, hsla(280,25%,50%,0.08) 0%, transparent 50%)',
        ].join(','),
        zIndex: 0,
      }} />

      <RinneganEye />
      <FloatingKanji />
      <RealityCracks />
      <SpatialTear />
      <VoidOrbs />
      <ScanLine />
      <GlitchBar />
      <VerticalLabel />
      <Quote />

      {/* ── Character image — RIGHT side ── */}
      <motion.div
        ref={imgRef}
        className="absolute pointer-events-none"
        style={{
          right: '-10px', bottom: '-35px',
          height: '280px',
          zIndex: 4,
          filter: 'brightness(0.7) contrast(1.1) saturate(0.4)',
          maskImage: 'linear-gradient(to left, black 0%, black 45%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)',
          WebkitMaskImage: 'linear-gradient(to left, black 0%, black 45%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <img src="/obito.png" alt="" style={{ height: '100%', width: 'auto', display: 'block' }} />
      </motion.div>

      {/* ── Text — LEFT side ── */}
      <div className="absolute" style={{
        left: '36px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 10,
      }}>
        <Fade fraction={0.5} triggerOnce>
          <Slide direction="up" fraction={0.4} triggerOnce>
            <h1 data-testid="text-name" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '52px', fontWeight: 700,
              lineHeight: 1.0, letterSpacing: '-0.02em',
              color: 'hsla(0,0%,100%,0.88)',
              textShadow: '0 0 40px hsla(270,35%,60%,0.12)',
            }}>
              OBITO
            </h1>
          </Slide>
        </Fade>

        <Fade fraction={0.5} triggerOnce delay={200}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '9px', fontWeight: 300,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'hsla(270,20%,80%,0.22)',
            marginTop: '10px',
          }}>
            <span className="obito-strike-thin">The Ghost of the Uchiha</span>
          </p>
        </Fade>

        <Fade fraction={0.5} triggerOnce delay={400}>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: '12px', fontWeight: 400,
            letterSpacing: '0.2em',
            color: 'hsla(270,30%,70%,0.28)',
            marginTop: '14px',
          }}>
            幻影
          </p>
        </Fade>
      </div>

      {/* Thin top border glow */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, hsla(270,30%,70%,0.15) 20%, hsla(270,40%,80%,0.25) 50%, hsla(270,30%,70%,0.15) 80%, transparent 100%)',
        zIndex: 20,
      }} />
    </div>
  );
}

// ── Export with replay ──
export default function ObitoBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = () => setAnimKey(k => k + 1);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <ObitoInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '9px',
          color: 'hsla(270,30%,70%,0.4)',
          background: 'hsla(270,20%,8%,0.8)',
          border: '1px solid hsla(270,20%,30%,0.15)',
          padding: '8px 18px',
          cursor: 'pointer',
          letterSpacing: '0.15em',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsla(270,40%,60%,0.3)';
          e.currentTarget.style.color = 'hsla(270,40%,80%,0.7)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsla(270,20%,30%,0.15)';
          e.currentTarget.style.color = 'hsla(270,30%,70%,0.4)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
