import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

function HexGrid() {
  const hexes = Array.from({ length: 16 }, (_, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = col * 70 + (row % 2 ? 35 : 0);
    const y = row * 55;
    const dur = 4 + (i % 5) * 0.7;
    const delay = (i % 7) * 0.6;
    return { id: i, x, y, dur, delay, size: 30 + (i % 3) * 6 };
  });

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {hexes.map(h => (
        <div
          key={h.id}
          className="hex-pulse"
          style={{
            position: 'absolute',
            left: `${h.x}px`, top: `${h.y}px`,
            width: `${h.size}px`, height: `${h.size}px`,
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            border: 'none',
            background: 'transparent',
            boxShadow: 'none',
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <svg viewBox="0 0 50 50" width="100%" height="100%" style={{ opacity: 0.5 }}>
            <polygon
              points="25,2 46,14 46,36 25,48 4,36 4,14"
              fill="none"
              stroke="hsl(230,60%,50%)"
              strokeWidth="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function InfinityWisps() {
  const wisps = Array.from({ length: 6 }, (_, i) => {
    const startX = 80 + ((i * 67) % 250);
    const startY = 40 + ((i * 43) % 160);
    const dx = -80 + ((i * 31) % 160);
    const dy = -60 + ((i * 23) % 120);
    const dur = 7 + (i % 3) * 2;
    const delay = i * 0.8;
    const color = i % 3 === 0 ? 'hsl(270,70%,65%)' : i % 3 === 1 ? 'hsl(220,80%,60%)' : 'hsl(200,75%,55%)';
    const size = 3 + (i % 3) * 1.5;
    return { id: i, startX, startY, dx, dy, dur, delay, color, size };
  });

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {wisps.map(w => (
        <div
          key={w.id}
          className="wisp-float"
          style={{
            position: 'absolute',
            left: `${w.startX}px`, top: `${w.startY}px`,
            width: `${w.size}px`, height: `${w.size}px`,
            borderRadius: '50%',
            background: w.color,
            boxShadow: `0 0 10px 3px ${w.color}44`,
            '--dx': `${w.dx}px`,
            '--dy': `${w.dy}px`,
            animationDuration: `${w.dur}s`,
            animationDelay: `${w.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function DomainRing({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="domain-ring"
      style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: '700px', height: '260px',
        marginLeft: '-350px', marginTop: '-130px',
        borderRadius: '50%',
        border: '1px solid hsl(230,60%,50%)',
        boxShadow: '0 0 20px 4px hsla(230,70%,45%,0.15), inset 0 0 20px 4px hsla(230,70%,45%,0.1)',
        zIndex: 1,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function DomainText() {
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
        }, 900);
      }, 4000 + Math.random() * 3000);
      return wait;
    };
    const t = loop();
    return () => { cancelled = true; clearTimeout(t!); };
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 14 }}>
      {flash && (
        <span style={{
          position: 'absolute', left: '-2px', top: '1px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '8px', fontWeight: 700,
          color: 'hsla(0,80%,60%,0.6)',
          letterSpacing: '0.25em', textTransform: 'uppercase' as const,
        }}>DOMAIN EXPANSION</span>
      )}
      {flash && (
        <span style={{
          position: 'absolute', left: '2px', top: '-1px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '8px', fontWeight: 700,
          color: 'hsla(190,80%,60%,0.6)',
          letterSpacing: '0.25em', textTransform: 'uppercase' as const,
        }}>DOMAIN EXPANSION</span>
      )}
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '8px', fontWeight: 700,
        color: flash ? 'hsl(230,80%,80%)' : 'hsl(230,60%,55%)',
        letterSpacing: '0.25em', textTransform: 'uppercase' as const,
        textShadow: flash
          ? '0 0 14px hsla(230,80%,60%,0.7)'
          : '0 0 6px hsla(230,70%,40%,0.3)',
        transition: 'color 0.08s, text-shadow 0.08s',
      }}>DOMAIN EXPANSION</span>
    </div>
  );
}

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 40 + ((i * 97) % 600),
  y: 20 + ((i * 53) % 200),
  size: 1.5 + (i % 3),
  dur: 4 + (i % 4) * 1.2,
  delay: (i % 5) * 0.8,
  isBlue: i % 3 !== 0,
}));

function CursedParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="particle-drift"
          style={{
            position: 'absolute',
            left: `${p.x}px`, top: `${p.y}px`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%',
            background: p.isBlue ? 'hsl(220,80%,65%)' : 'hsl(270,70%,65%)',
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function SpecialGrade() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      style={{
        position: 'absolute',
        top: '12px', right: '18px',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '64px', fontWeight: 900,
        lineHeight: 1,
        color: 'hsla(230,60%,40%,0.06)',
        letterSpacing: '-0.02em',
        zIndex: 4,
        userSelect: 'none',
      }}
    >6</motion.div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '6px', fontWeight: 600,
        color: 'hsl(230,40%,45%)',
        letterSpacing: '0.15em', textTransform: 'uppercase' as const,
      }}>{label}</span>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '11px', fontWeight: 800,
        color: 'hsl(230,60%,65%)',
        letterSpacing: '0.05em',
      }}>{value}</span>
    </div>
  );
}

function HollowPurple() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ inset: 0, zIndex: 25 }}
    >
      <div
        className="hp-orb hp-orb-blue"
        style={{
          position: 'absolute',
          left: '8%', top: '50%',
          width: '18px', height: '18px',
          marginTop: '-9px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(210,100%,82%) 0%, hsl(220,100%,62%) 40%, hsla(220,100%,50%,0.3) 70%, transparent 100%)',
          boxShadow: '0 0 18px 6px hsla(210,100%,65%,0.65), 0 0 35px 12px hsla(220,100%,50%,0.35)',
        }}
      />

      <div
        className="hp-orb hp-orb-red"
        style={{
          position: 'absolute',
          left: '92%', top: '50%',
          width: '18px', height: '18px',
          marginTop: '-9px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(0,100%,78%) 0%, hsl(350,100%,58%) 40%, hsla(0,100%,50%,0.3) 70%, transparent 100%)',
          boxShadow: '0 0 18px 6px hsla(0,100%,62%,0.65), 0 0 35px 12px hsla(350,100%,50%,0.35)',
        }}
      />

      <div
        className="hp-flash"
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: '8px', height: '8px',
          marginLeft: '-4px', marginTop: '-4px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(0,0%,100%,1) 0%, hsla(270,100%,85%,0.9) 40%, transparent 70%)',
          boxShadow: '0 0 30px 15px hsla(270,100%,80%,0.8), 0 0 60px 30px hsla(280,90%,60%,0.4)',
        }}
      />

      <div
        className="hp-sphere"
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: '30px', height: '30px',
          marginLeft: '-15px', marginTop: '-15px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(270,100%,85%,1) 0%, hsla(280,100%,65%,0.85) 25%, hsla(270,100%,50%,0.45) 50%, transparent 70%)',
          boxShadow: '0 0 25px 12px hsla(270,100%,70%,0.75), 0 0 50px 25px hsla(280,90%,55%,0.45)',
        }}
      />

      <div
        className="hp-screen-flash"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, hsla(270,90%,40%,0.5) 0%, transparent 55%)',
        }}
      />

      <div
        className="hp-trail"
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: '480px', height: '8px',
          marginLeft: '-240px', marginTop: '-4px',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, transparent 0%, hsla(270,100%,72%,0.85) 15%, hsla(280,100%,62%,1) 50%, hsla(270,100%,72%,0.85) 85%, transparent 100%)',
          boxShadow: '0 0 25px 10px hsla(270,100%,65%,0.55), 0 0 50px 20px hsla(280,80%,50%,0.35)',
        }}
      />

      <div
        className="hp-burst hp-burst-red"
        style={{
          position: 'absolute',
          left: 'calc(50% - 5px)', top: 'calc(50% + 4px)',
          width: '24px', height: '24px',
          marginLeft: '-12px', marginTop: '-12px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(0,100%,60%,0.55) 0%, transparent 60%)',
        }}
      />
      <div
        className="hp-burst hp-burst-blue"
        style={{
          position: 'absolute',
          left: 'calc(50% + 5px)', top: 'calc(50% - 4px)',
          width: '24px', height: '24px',
          marginLeft: '-12px', marginTop: '-12px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(210,100%,60%,0.55) 0%, transparent 60%)',
        }}
      />

      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}>
        <div
          className="hp-text"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px', fontWeight: 900,
            letterSpacing: '0.3em',
            color: 'hsl(275,100%,88%)',
            textShadow: '0 0 18px hsla(270,100%,72%,0.8)',
            whiteSpace: 'nowrap' as const,
          }}
        >HOLLOW PURPLE</div>
      </div>
    </div>
  );
}

function GojoBannerInner() {
  const [charReady, setCharReady] = useState(false);
  const [hollowKey, setHollowKey] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setCharReady(true);
    img.src = '/gojo-char.png';
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHollowKey(k => k + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '680px',
        height: '240px',
        background: 'linear-gradient(135deg, #050812 0%, #0a0f24 30%, #0d1230 55%, #060a1a 100%)',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsla(230,50%,25%,0.4)',
          '0 0 40px 4px hsla(230,60%,20%,0.2)',
          '0 0 80px 8px hsla(270,50%,15%,0.1)',
          '0 32px 80px -8px rgba(0,0,0,0.98)',
        ].join(','),
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 50% 70% at 70% 40%, hsla(230,70%,30%,0.22) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 50% at 20% 60%, hsla(270,60%,25%,0.14) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 40% at 50% 90%, hsla(230,50%,20%,0.18) 0%, transparent 55%)',
          ].join(','),
          zIndex: 0,
        }} />

        <HexGrid />

        <DomainRing delay={0} />
        <DomainRing delay={2.75} />

        <InfinityWisps />

        <CursedParticles />

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
              src="/gojo-char.png" alt="Gojo Satoru"
              style={{
                height: '100%', width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 22px hsla(230,70%,45%,0.45)) drop-shadow(0 0 45px hsla(270,60%,40%,0.22))',
              }}
            />
          </motion.div>
        )}

        <HollowPurple key={hollowKey} />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.035, zIndex: 1 }}>
          <defs>
            <pattern id="voidLines-g" width="35" height="35" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
              <path d="M 0 17.5 L 35 17.5" fill="none" stroke="hsl(230,60%,60%)" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#voidLines-g)" />
        </svg>

        <SpecialGrade />

        <div className="absolute pointer-events-none" style={{
          right: '20px', bottom: '0',
          width: '300px', height: '240px',
          background: 'radial-gradient(ellipse 60% 80% at 60% 55%, hsla(230,60%,25%,0.22) 0%, transparent 60%)',
          zIndex: 2,
        }} />

        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, hsl(230,70%,50%) 30%, hsl(260,65%,55%) 55%, hsl(230,80%,60%) 75%, transparent 100%)',
          boxShadow: '0 0 14px 3px hsla(230,70%,45%,0.35)',
          zIndex: 20,
        }} />

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, hsla(230,50%,30%,0.45) 30%, hsla(270,50%,30%,0.35) 70%, transparent 100%)',
          opacity: 0.6,
          zIndex: 20,
        }} />

        <div className="absolute inset-0 pointer-events-none" style={{
          border: '1px solid hsla(230,40%,20%,0.35)', borderRadius: '10px', zIndex: 20,
        }} />

        <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: '16px 20px', zIndex: 14 }}>
          <div className="flex items-center justify-between" style={{ zIndex: 16 }}>
            <div className="flex items-center gap-2">
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '8px', fontWeight: 600,
                color: 'hsl(230,60%,60%)',
                letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                textShadow: '0 0 6px hsla(230,70%,40%,0.3)',
              }}>JUJUTSU HIGH</span>
              <svg width="14" height="10" viewBox="0 0 14 10" style={{ opacity: 0.7 }}>
                <ellipse cx="7" cy="5" rx="6" ry="4" fill="none" stroke="hsl(220,90%,65%)" strokeWidth="0.8" />
                <circle cx="7" cy="5" r="2" fill="hsl(210,100%,75%)" />
                <circle cx="7" cy="5" r="0.8" fill="hsl(230,80%,40%)" />
              </svg>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '8px', fontWeight: 600,
                color: 'hsl(270,50%,55%)',
                letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              }}>SPECIAL GRADE</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="active-pulse"
                style={{
                  display: 'inline-block', width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: 'hsl(230,80%,60%)',
                  boxShadow: '0 0 8px hsl(230,80%,55%)',
                }}
              />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '8px', fontWeight: 700,
                color: 'hsl(230,70%,65%)',
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
              }}>ACTIVE</span>
            </div>
          </div>

          <div className="flex flex-col" style={{ zIndex: 16, maxWidth: '350px' }}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '44px', fontWeight: 800,
              lineHeight: 0.9, letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, hsl(220,80%,70%) 0%, hsl(240,70%,80%) 40%, hsl(270,60%,75%) 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 22px hsla(230,70%,50%,0.35))',
              margin: 0, padding: 0,
            }}>HAKIM</h1>

            <div style={{
              width: '180px', height: '1px', marginTop: '6px',
              background: 'linear-gradient(90deg, hsl(230,70%,50%), hsl(270,60%,55%), transparent)',
            }} />

            <div style={{ marginTop: '6px' }}>
              <DomainText />
            </div>

            <div className="flex items-center gap-4 mt-3">
              <StatBlock label="AGE" value="28" />
              <StatBlock label="GRADE" value="SPECIAL" />
              <StatBlock label="TECHNIQUE" value="LIMITLESS" />
            </div>
          </div>

          <div className="flex items-center justify-between" style={{ zIndex: 16 }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '7px', fontWeight: 600,
              color: 'hsl(230,30%,35%)',
              letterSpacing: '0.1em',
            }}>INFINITE VOID</span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '7px', fontWeight: 600,
              color: 'hsl(230,30%,35%)',
              letterSpacing: '0.1em',
            }}>SIX EYES</span>
            <div
              className="star-pulse"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '7px', fontWeight: 700,
                color: 'hsl(230,50%,45%)',
                letterSpacing: '0.08em',
              }}
            >&#x2605;</div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '7px', fontWeight: 600,
              color: 'hsl(230,30%,35%)',
              letterSpacing: '0.1em',
            }}>LIMITLESS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GojoBanner() {
  const [replayKey, setReplayKey] = useState(0);
  const replay = useCallback(() => setReplayKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <GojoBannerInner key={replayKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(230,50%,45%)',
          background: 'hsl(230,20%,6%)',
          border: '1px solid hsl(230,20%,16%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(230,60%,40%)';
          e.currentTarget.style.color = 'hsl(230,70%,70%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(230,20%,16%)';
          e.currentTarget.style.color = 'hsl(230,50%,45%)';
        }}
      >REPLAY</button>
    </div>
  );
}
