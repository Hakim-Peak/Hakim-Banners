import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { slim as tsParticlesSlim } from '@tsparticles/slim';
import { Fade, Slide } from 'react-awesome-reveal';
import gsap from 'gsap';
import CountUp from 'react-countup';

// ── Night Sky Stars ──
function Stars() {
  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 680,
    y: Math.random() * 180,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.5,
    dur: 2 + Math.random() * 4,
    delay: Math.random() * 3,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}px`, top: `${s.y}px`,
          width: `${s.size}px`, height: `${s.size}px`,
          borderRadius: '50%',
          background: `rgba(200,200,220,${s.opacity})`,
          animation: `itachiStarTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ── Moon (detailed with craters) ──
function Moon() {
  return (
    <motion.div className="absolute pointer-events-none" style={{
      right: '160px', top: '15px',
      width: '70px', height: '70px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 40% 38%, hsla(0,0%,90%,0.35) 0%, hsla(0,0%,78%,0.25) 35%, hsla(0,0%,60%,0.12) 65%, transparent 100%)',
      boxShadow: '0 0 30px 10px hsla(0,0%,80%,0.08), 0 0 60px 20px hsla(0,0%,70%,0.04)',
      zIndex: 1,
    }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15 }}>
        <circle cx="28" cy="25" r="5" fill="hsl(0,0%,55%)" />
        <circle cx="42" cy="35" r="3.5" fill="hsl(0,0%,50%)" />
        <circle cx="22" cy="40" r="2.5" fill="hsl(0,0%,52%)" />
        <circle cx="38" cy="20" r="2" fill="hsl(0,0%,48%)" />
        <circle cx="50" cy="24" r="1.8" fill="hsl(0,0%,50%)" />
        <circle cx="30" cy="50" r="3" fill="hsl(0,0%,52%)" />
        <circle cx="45" cy="48" r="1.5" fill="hsl(0,0%,48%)" />
        <circle cx="18" cy="28" r="1.2" fill="hsl(0,0%,50%)" />
      </svg>
    </motion.div>
  );
}

// ── Tree Silhouettes ──
function Trees() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2 }}>
      <svg width="680" height="80" viewBox="0 0 680 80" style={{ opacity: 0.12 }}>
        <path d="M0,80 L0,40 Q10,20 15,35 L18,25 Q22,10 26,30 L30,20 Q34,5 38,28 L40,35 Q42,25 45,40 L48,80Z" fill="#0a0a0a" />
        <path d="M45,80 L48,45 Q55,30 58,42 L60,32 Q64,18 68,38 L70,42 Q72,35 75,48 L78,80Z" fill="#080808" />
        <path d="M600,80 L602,50 Q608,30 612,45 L614,35 Q618,15 622,38 L625,40 Q628,30 632,48 L635,80Z" fill="#080808" />
        <path d="M630,80 L633,42 Q640,25 644,38 L646,28 Q650,12 654,35 L656,40 Q660,28 664,45 L668,80Z" fill="#0a0a0a" />
        <path d="M660,80 L662,50 Q668,35 670,48 L672,40 Q676,25 680,45 L680,80Z" fill="#080808" />
        <rect x="0" y="75" width="680" height="5" fill="#060606" />
      </svg>
    </div>
  );
}

// ── Blood Drips ──
function BloodDrips() {
  const drips = useMemo(() => [
    { x: 52,  h: 40, w: 2.5, dur: 4.2, delay: 0 },
    { x: 175, h: 55, w: 2,   dur: 5.5, delay: 1.3 },
    { x: 310, h: 30, w: 2.8, dur: 4.8, delay: 0.6 },
    { x: 440, h: 48, w: 2,   dur: 5.0, delay: 1.8 },
    { x: 560, h: 35, w: 2.5, dur: 4.5, delay: 0.2 },
    { x: 645, h: 25, w: 2,   dur: 5.8, delay: 2.1 },
  ], []);

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 9, overflow: 'hidden' }}>
      <svg width="680" height="60" viewBox="0 0 680 60" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blood-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsla(0,0%,100%,0)" />
            <stop offset="45%" stopColor="hsla(0,60%,60%,0.18)" />
            <stop offset="55%" stopColor="hsla(0,60%,60%,0.18)" />
            <stop offset="100%" stopColor="hsla(0,0%,100%,0)" />
          </linearGradient>
          <filter id="blood-soft">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
          </filter>
        </defs>
        {drips.map((d, i) => {
          const midX = d.x + d.w / 2;
          const tipY = d.h;
          return (
            <g key={i} style={{ animation: `itachiDripPulse ${d.dur}s ease-in-out ${d.delay}s infinite` }}>
              <path
                d={`M${d.x},0 L${d.x},${tipY - 3} 
                    C${d.x},${tipY} ${midX - 0.5},${tipY + 2} ${midX},${tipY + 2.5} 
                    C${midX + 0.5},${tipY + 2} ${d.x + d.w},${tipY} ${d.x + d.w},${tipY - 3} 
                    L${d.x + d.w},0Z`}
                fill="#5A0A0A"
                opacity="0.5"
                filter="url(#blood-soft)"
              />
              <line
                x1={midX}
                y1={4}
                x2={midX}
                y2={tipY - 2}
                stroke="url(#blood-sheen)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Drifting Fog Clouds ──
function FogClouds() {
  const clouds = useMemo(() => [
    { x: -200, y: 80, w: 300, h: 40, opacity: 0.06, speed: 25, delay: 0 },
    { x: -300, y: 120, w: 350, h: 50, opacity: 0.04, speed: 35, delay: 5 },
    { x: -250, y: 60, w: 280, h: 35, opacity: 0.05, speed: 30, delay: 10 },
    { x: -350, y: 150, w: 400, h: 45, opacity: 0.03, speed: 40, delay: 2 },
  ], []);

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];
    clouds.forEach(c => {
      const el = document.getElementById(`fog-${c.speed}`);
      if (el) {
        const anim = gsap.fromTo(el,
          { x: c.x },
          { x: 700, duration: c.speed, delay: c.delay, repeat: -1, ease: 'none' }
        );
        animations.push(anim);
      }
    });
    return () => animations.forEach(a => a.kill());
  }, [clouds]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 7 }}>
      {clouds.map((c, i) => (
        <div
          key={i}
          id={`fog-${c.speed}`}
          style={{
            position: 'absolute',
            top: `${c.y}px`,
            width: `${c.w}px`,
            height: `${c.h}px`,
            background: `radial-gradient(ellipse at center, hsla(0,0%,80%,${c.opacity}) 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
        />
      ))}
    </div>
  );
}

// ── Ground Mist ──
function GroundMist() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 8 }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-50px',
        right: '-50px',
        height: '60px',
        background: 'linear-gradient(to top, hsla(0,0%,80%,0.08) 0%, transparent 100%)',
        filter: 'blur(8px)',
        animation: 'itachiMistPulse 4s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-100px',
        right: '-100px',
        height: '40px',
        background: 'linear-gradient(to top, hsla(0,0%,90%,0.05) 0%, transparent 100%)',
        filter: 'blur(12px)',
        animation: 'itachiMistPulse 5s ease-in-out 1s infinite alternate',
      }} />
    </div>
  );
}

// ── Lightning Flashes ──
function LightningFlashes() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      const next = 6000 + Math.random() * 6000;
      timeout = setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 150);
        trigger();
      }, next);
    };
    trigger();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 15,
        background: 'white',
        opacity: flash ? 0.12 : 0,
        transition: flash ? 'opacity 50ms' : 'opacity 200ms',
      }}
    />
  );
}

// ── Stats / Mission Count ──
function Stats() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { label: 'RANK', value: 'ANBU CAPTAIN' },
    { label: 'S-RANK', end: 53 },
    { label: 'ELIMINATIONS', end: 1 },
    { label: 'YEARS ACTIVE', end: 7 },
  ];

  return (
    <div className="absolute pointer-events-none" style={{
      left: '36px', bottom: '16px',
      zIndex: 10,
      display: 'flex', gap: '20px',
      alignItems: 'flex-end',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: `all 0.5s ease ${i * 0.12}s`,
          borderLeft: i > 0 ? '1px solid hsla(0,0%,100%,0.06)' : 'none',
          paddingLeft: i > 0 ? '18px' : '0',
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '7px', fontWeight: 400,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'hsl(0,0%,22%)',
            marginBottom: '3px',
          }}>
            {s.label}
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px', fontWeight: 700,
            color: 'hsl(0,55%,40%)',
            lineHeight: 1,
          }}>
            {s.end !== undefined ? (
              visible ? <CountUp end={s.end} duration={2} separator="," /> : '0'
            ) : (
              s.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Rising Embers ──
function RisingEmbers() {
  const embers = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 680,
    size: 1 + Math.random() * 2,
    dur: 4 + Math.random() * 4,
    delay: Math.random() * 6,
    drift: -15 + Math.random() * 30,
    color: ['hsla(0,80%,40%,0.7)', 'hsla(0,60%,30%,0.5)', 'hsla(15,90%,35%,0.6)'][Math.floor(Math.random() * 3)],
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5, overflow: 'hidden' }}>
      {embers.map(e => (
        <div
          key={e.id}
          style={{
            position: 'absolute',
            left: `${e.x}px`,
            bottom: '-5px',
            width: `${e.size}px`,
            height: `${e.size}px`,
            borderRadius: '50%',
            background: e.color,
            boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
            animation: `itachiEmberRise ${e.dur}s ease-out ${e.delay}s infinite`,
            '--ember-drift': `${e.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── Sharingan Eye (GSAP animated) ──
function SharinganEye() {
  const eyeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!eyeRef.current) return;
    const tl = gsap.to(eyeRef.current, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 3 }}>
      <motion.div style={{ width: '240px', height: '240px' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
      >
        <svg ref={eyeRef} width="240" height="240" viewBox="0 0 240 240">
          {/* Outer ring */}
          <circle cx="120" cy="120" r="110" fill="none" stroke="hsla(0,70%,30%,0.25)" strokeWidth="2.5" />
          <circle cx="120" cy="120" r="105" fill="none" stroke="hsla(0,65%,25%,0.12)" strokeWidth="1" />

          {/* Inner ring */}
          <circle cx="120" cy="120" r="65" fill="none" stroke="hsla(0,70%,30%,0.2)" strokeWidth="2" />

          {/* Pupil */}
          <circle cx="120" cy="120" r="22" fill="hsla(0,70%,20%,0.3)" />
          <circle cx="120" cy="120" r="12" fill="hsla(0,75%,25%,0.35)" />
          <circle cx="120" cy="120" r="5" fill="hsla(0,80%,30%,0.4)" />

          {/* Tomoe 1 */}
          <g>
            <circle cx="120" cy="58" r="10" fill="hsla(0,70%,25%,0.2)" />
            <path d="M120,68 Q140,90 120,120" stroke="hsla(0,70%,30%,0.18)" strokeWidth="4" fill="none" />
          </g>
          {/* Tomoe 2 */}
          <g transform="rotate(120, 120, 120)">
            <circle cx="120" cy="58" r="10" fill="hsla(0,70%,25%,0.2)" />
            <path d="M120,68 Q140,90 120,120" stroke="hsla(0,70%,30%,0.18)" strokeWidth="4" fill="none" />
          </g>
          {/* Tomoe 3 */}
          <g transform="rotate(240, 120, 120)">
            <circle cx="120" cy="58" r="10" fill="hsla(0,70%,25%,0.2)" />
            <path d="M120,68 Q140,90 120,120" stroke="hsla(0,70%,30%,0.18)" strokeWidth="4" fill="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

// ── Red Particle System ──
function RedParticles() {
  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 40,
    particles: {
      number: { value: 40, density: { enable: true, width: 680, height: 240 } },
      color: { value: ['hsla(0,80%,45%,0.8)', 'hsla(0,60%,30%,0.6)', 'hsla(0,40%,20%,0.5)'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: { enable: true, speed: 0.4, minimumValue: 0.1, sync: false },
      },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: { min: 0.3, max: 0.8 },
        direction: 'none' as const,
        outModes: { default: 'out' as const },
        drift: { min: -0.1, max: 0.1 },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
        resize: { enable: false },
      },
    },
    detectRetina: false,
  }), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
      <Particles id="itachi-particles" options={options} />
    </div>
  );
}

// ── MAIN BANNER ──
function ItachiInner() {
  return (
    <div
      data-testid="itachi-banner"
      className="relative overflow-hidden"
      style={{
        width: '680px', height: '240px',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsl(0,0%,12%)',
          '0 0 40px 4px hsla(0,0%,6%,0.15)',
          '0 0 80px 8px hsla(0,0%,4%,0.08)',
          '0 40px 100px -12px rgba(0,0,0,0.98)',
        ].join(','),
        background: 'linear-gradient(180deg, hsl(220,15%,6%) 0%, hsl(220,12%,4%) 60%, hsl(0,0%,2%) 100%)',
      }}
    >
        {/* Sky atmosphere */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 50% 40% at 75% 25%, hsla(220,10%,30%,0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 50% at 50% 100%, hsla(0,0%,3%,0.3) 0%, transparent 50%)',
          ].join(','),
          zIndex: 0,
        }} />

              <Stars />
              <Moon />
              <Trees />
              <BloodDrips />
              <FogClouds />
        <GroundMist />
        <RisingEmbers />
        <SharinganEye />
        <RedParticles />
        <LightningFlashes />

        {/* ── CHARACTER — right, blends into darkness ── */}
        <motion.div className="absolute pointer-events-none" style={{
          right: '-5px', bottom: '-30px',
          height: '270px', width: 'auto',
          zIndex: 4,
          filter: 'brightness(0.6) contrast(1.2)',
          maskImage: 'linear-gradient(to left, black 0%, black 60%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)',
          WebkitMaskImage: 'linear-gradient(to left, black 0%, black 60%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
          animation: 'itachiBreathe 4s ease-in-out infinite',
        }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <img src="/itachi.png" alt="" style={{ height: '100%', width: 'auto', display: 'block' }} />
        </motion.div>

        <Stats />

        {/* ── TEXT — left side, with react-awesome-reveal ── */}
        <div className="absolute" style={{
          left: '36px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10,
        }}>
          <Fade fraction={0.5} triggerOnce>
            <Slide direction="left" fraction={0.5} triggerOnce>
              <h1 data-testid="text-name" className="itachi-glitch" style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '58px', fontWeight: 700,
                lineHeight: 1.0, letterSpacing: '-0.03em',
                color: 'hsl(0,0%,82%)',
                position: 'relative',
              }}>
                ITACHI
              </h1>
            </Slide>
          </Fade>
          <Fade fraction={0.5} triggerOnce delay={200}>
            <p data-testid="text-sub" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '10px', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'hsl(0,0%,28%)',
              marginTop: '8px',
            }}>
              <span className="itachi-strike">Uchiha Clan</span>
            </p>
          </Fade>
          <Fade fraction={0.5} triggerOnce delay={400}>
            <p data-testid="text-jp" style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: '13px', fontWeight: 400,
              letterSpacing: '0.15em',
              color: 'hsla(0,60%,40%,0.5)',
              marginTop: '12px',
            }}>
              真の伝説
            </p>
          </Fade>
        </div>

        {/* ── Vertical Mangekyo text — left edge ── */}
        <Fade fraction={0.5} triggerOnce delay={600}>
          <div className="absolute pointer-events-none" style={{
            left: '8px', top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
            zIndex: 10,
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 300,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'hsla(0,0%,25%,0.4)',
              whiteSpace: 'nowrap',
            }}>
              Mangekyo Sharingan
            </span>
          </div>
        </Fade>

        {/* Red accent line — bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(0,50%,20%) 30%, hsl(0,60%,25%) 50%, hsl(0,50%,20%) 70%, transparent 100%)',
          opacity: 0.4,
          zIndex: 20,
        }} />
      </div>
  );
}

export default function ItachiBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <ItachiInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(0,60%,45%)',
          background: 'hsl(0,0%,6%)',
          border: '1px solid hsl(0,0%,16%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,60%,45%)';
          e.currentTarget.style.color = 'hsl(0,70%,60%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,16%)';
          e.currentTarget.style.color = 'hsl(0,60%,45%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
