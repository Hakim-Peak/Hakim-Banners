import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';

// ── Shatter Crack effect ──
function ShatterCracks() {
  const rightCracks = [
    { path: 'M530 120 L560 90 L590 85 L620 60', delay: 2 },
    { path: 'M530 120 L555 145 L595 155 L640 170', delay: 2.4 },
    { path: 'M530 120 L510 85 L485 70 L450 55', delay: 2.8 },
    { path: 'M530 120 L520 160 L505 190 L495 220', delay: 3.1 },
    { path: 'M530 120 L570 115 L610 100 L660 90', delay: 3.4 },
    { path: 'M530 120 L510 130 L470 145 L430 155', delay: 3.6 },
    { path: 'M530 120 L540 90 L555 55 L560 25', delay: 3.9 },
    { path: 'M530 120 L550 155 L580 185 L600 225', delay: 4.1 },
  ];

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', zIndex: 18 }}
      viewBox="0 0 680 240" preserveAspectRatio="none">
      <defs>
        <filter id="crackGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {rightCracks.map((c, i) => (
        <motion.path
          key={`r-${i}`}
          d={c.path}
          stroke="hsl(0,0%,65%)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          filter="url(#crackGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 4,
            delay: c.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
            times: [0, 0.3, 0.7, 1],
          }}
        />
      ))}
      {/* Right impact point */}
      <motion.circle
        cx="530" cy="120" r="4"
        fill="hsl(0,0%,85%)"
        filter="url(#crackGlow)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0, 1.5, 1.5, 0],
        }}
        transition={{
          duration: 4,
          delay: 2,
          repeat: Infinity,
          repeatDelay: 3,
          times: [0, 0.1, 0.7, 1],
        }}
      />
    </svg>
  );
}

// ── Tentacles ──
function Tentacles() {
  const tentacles = [
    { d: 'M520 240 Q510 200 500 180 Q485 155 460 145 Q430 138 410 140', delay: 0 },
    { d: 'M560 240 Q565 210 575 190 Q590 165 610 155 Q635 148 660 152', delay: 0.6 },
    { d: 'M540 240 Q530 215 515 200 Q495 180 470 175 Q445 172 425 178', delay: 1.2 },
    { d: 'M550 240 Q558 220 570 205 Q588 185 615 178 Q640 174 665 180', delay: 1.8 },
  ];

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', zIndex: 4 }}
      viewBox="0 0 680 240" preserveAspectRatio="none">
      <defs>
        <filter id="tentGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {tentacles.map((t, i) => (
        <motion.path
          key={i}
          d={t.d}
          stroke="hsl(0,0%,18%)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          filter="url(#tentGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0.8, 1, 0],
            opacity: [0, 0.7, 0.7, 0.5, 0.7, 0],
          }}
          transition={{
            duration: 6,
            delay: t.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
            times: [0, 0.15, 0.4, 0.6, 0.8, 1],
          }}
        />
      ))}
      {/* Sucker dots along tentacles */}
      {[
        { cx: 490, cy: 170, delay: 2 },
        { cx: 620, cy: 160, delay: 2.6 },
        { cx: 475, cy: 178, delay: 3.2 },
        { cx: 610, cy: 182, delay: 3.8 },
      ].map((dot, i) => (
        <motion.circle
          key={`sucker-${i}`}
          cx={dot.cx} cy={dot.cy} r="2.5"
          fill="hsl(0,0%,12%)"
          stroke="hsl(0,0%,25%)"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 6,
            delay: dot.delay,
            repeat: Infinity,
            repeatDelay: 2,
            times: [0, 0.15, 0.8, 1],
          }}
        />
      ))}
    </svg>
  );
}

// ── Falling petals ──
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  startX: Math.random() * 680,
  size: 8 + Math.random() * 10,
  speed: 5 + Math.random() * 4,
  delay: Math.random() * 6,
  opacity: 0.35 + Math.random() * 0.4,
  sway: 25 + Math.random() * 35,
  bgLightness: 30 + Math.random() * 20,
}));

function Petal({ startX, size, speed, delay, opacity, sway, bgLightness }: (typeof PETALS)[0]) {
  return (
    <div
      className="absolute pointer-events-none petal-fall"
      style={{
        left: `${startX}px`,
        width: `${size}px`,
        height: `${size * 0.55}px`,
        borderRadius: '50% 0 50% 0',
        background: `hsl(0,0%,${bgLightness}%)`,
        border: `0.5px solid hsla(0,0%,50%,0.4)`,
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

// ── Void rain particles ──
const VOID_RAIN = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 680,
  size: 1 + Math.random() * 2,
  speed: 2.5 + Math.random() * 3,
  delay: Math.random() * 4,
  opacity: 0.2 + Math.random() * 0.4,
  splashY: 220 + Math.random() * 15,
}));

function VoidRainDrop({ x, size, speed, delay, opacity, splashY }: (typeof VOID_RAIN)[0]) {
  return (
    <>
      <div
        className="void-rain-fall"
        style={{
          position: 'absolute', left: `${x}px`,
          width: `${size}px`, height: `${size * 2.5}px`,
          background: 'linear-gradient(180deg, hsla(0,0%,35%,0.7), hsla(0,0%,15%,0.2))',
          borderRadius: `${size}px ${size}px ${size * 2}px ${size * 2}px`,
          zIndex: 2,
          '--duration': `${speed}s`,
          '--delay': `${delay}s`,
          '--opacity': opacity,
          '--splash-y': `${splashY}px`,
        } as React.CSSProperties}
      />
      <motion.div
        style={{
          position: 'absolute', left: `${x - 3}px`,
          top: `${splashY}px`,
          width: '6px', height: '2px',
          borderRadius: '50%',
          background: 'hsla(0,0%,25%,0.4)',
          zIndex: 2,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.5, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 0.4, delay: delay + speed - 0.1, repeat: Infinity, repeatDelay: speed }}
      />
    </>
  );
}

// ── Void streak ──
function VoidStreak({
  x1, y1, x2, y2, delay, dur,
}: { x1: number; y1: number; x2: number; y2: number; delay: number; dur: number }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="url(#voidGrad)"
      strokeWidth="1"
      strokeLinecap="round"
      filter="url(#voidGlow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 0.8, 1], opacity: [0, 0.4, 0.2, 0.35] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Kakugan Eye — true black version ──
function KakuganEye() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 0, 0.75, 0.75, 0], scale: [0.8, 1, 1, 1, 0.9] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.1, 0.2, 0.8, 1] }}
      style={{
        position: 'absolute',
        top: '-70px', left: '50%',
        transform: 'translateX(-50%)',
        width: '80px', height: '80px',
        zIndex: 0,
      }}
    >
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(0,0%,22%) 25%, hsl(0,0%,10%) 50%, transparent 70%)',
        boxShadow: '0 0 30px hsla(0,0%,12%,0.4), 0 0 60px hsla(0,0%,8%,0.2)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35px', height: '35px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(0,0%,60%) 40%, hsl(0,0%,30%) 100%)',
        boxShadow: '0 0 18px hsla(0,0%,60%,0.5)',
      }} />
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '12px', height: '12px',
          borderRadius: '50%',
          background: '#000',
        }}
        animate={{
          x: [0, 5, -4, 6, -5, 3, -6, 4, -2, 5, 0],
          y: [0, -4, 3, -5, 4, -3, 5, -2, 4, -1, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <div key={deg} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '35px', height: '1px',
          background: 'linear-gradient(90deg, hsla(0,0%,18%,0.4), transparent)',
          transform: `translate(-50%, -50%) rotate(${deg}deg)`,
          transformOrigin: '0 50%',
        }} />
      ))}
    </motion.div>
  );
}

// ── Name Corruption Effect — text glitches into symbols then snaps back ──
const CORRUPT_CHARS = '干支えと'.split('');

function NameCorruption() {
  const base = 'NYSETTE';
  const [display, setDisplay] = useState(base);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const startGlitchCycle = () => {
      interval = setInterval(() => {
        setIsGlitching(true);
        let step = 0;
        const maxSteps = 8;
        const glitchInterval = setInterval(() => {
          const corrupted = base.split('').map((ch, i) => {
            if (ch === ' ') return ' ';
            const chance = step < maxSteps / 2 ? 0.7 : 0.3 - (step * 0.03);
            return Math.random() < chance
              ? CORRUPT_CHARS[Math.floor(Math.random() * CORRUPT_CHARS.length)]
              : ch;
          }).join('');
          setDisplay(corrupted);
          step++;
          if (step >= maxSteps) {
            clearInterval(glitchInterval);
            setDisplay(base);
            setIsGlitching(false);
          }
        }, 50);
      }, 4000);
    };
    startGlitchCycle();
    return () => { clearInterval(interval); };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '52px', fontWeight: 800,
        color: isGlitching ? 'hsl(0,0%,65%)' : 'hsl(0,0%,90%)',
        letterSpacing: '6px', lineHeight: 1,
        textShadow: isGlitching
          ? '2px 0 hsla(0,0%,50%,0.8), -2px 0 hsla(0,0%,30%,0.6), 0 0 15px hsla(0,0%,40%,0.4)'
          : '0 2px 4px rgba(0,0,0,0.9)',
        transition: 'color 0.05s',
      }}>{display}</span>

      {isGlitching && (
        <>
          <span style={{
            position: 'absolute', inset: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '52px', fontWeight: 800,
            letterSpacing: '6px', lineHeight: 1,
            color: 'hsla(0,0%,40%,0.3)',
            clipPath: 'inset(10% 0 60% 0)',
            transform: 'translateX(3px)',
          }}>{display}</span>
          <span style={{
            position: 'absolute', inset: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '52px', fontWeight: 800,
            letterSpacing: '6px', lineHeight: 1,
            color: 'hsla(0,0%,40%,0.3)',
            clipPath: 'inset(55% 0 15% 0)',
            transform: 'translateX(-3px)',
          }}>{display}</span>
        </>
      )}

      <motion.div
        style={{
          position: 'absolute', inset: '-10px',
          background: 'radial-gradient(ellipse at 50% 50%, hsla(0,0%,10%,0.12) 0%, transparent 70%)',
          zIndex: -1,
        }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ── Inner banner ──
function NysetteBannerInner() {
  const [charReady, setCharReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setCharReady(true);
    img.src = '/nysette-char.png';
  }, []);

  return (
    <div
      data-testid="nysette-banner"
      className="relative overflow-hidden"
      style={{
        width: '680px',
        height: '240px',
        background: '#000000',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsla(0,0%,12%,0.5)',
          '0 0 40px 4px hsla(0,0%,6%,0.1)',
          '0 30px 80px -10px rgba(0,0,0,0.95)',
        ].join(','),
      }}
    >
      {/* ── SVG void streaks ── */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%', zIndex: 3 }}
        viewBox="0 0 680 240"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="voidGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="voidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsla(0,0%,20%,0)" />
            <stop offset="50%" stopColor="hsla(0,0%,55%,0.5)" />
            <stop offset="100%" stopColor="hsla(0,0%,20%,0)" />
          </linearGradient>
        </defs>
        <VoidStreak x1={0} y1={80} x2={180} y2={55} delay={0} dur={4} />
        <VoidStreak x1={680} y1={165} x2={500} y2={185} delay={0.5} dur={4.5} />
        <VoidStreak x1={0} y1={190} x2={130} y2={210} delay={1} dur={3.5} />
        <VoidStreak x1={680} y1={65} x2={530} y2={45} delay={1.5} dur={4} />
      </svg>

      {/* ── Void rain ── */}
      {VOID_RAIN.map(p => <VoidRainDrop key={p.id} {...p} />)}

      {/* ── Falling petals ── */}
      {PETALS.map(p => <Petal key={p.id} {...p} />)}

      {/* ── Drip from top ── */}
      {[80, 200, 350, 500, 620].map((x, i) => (
        <div
          key={`drip-${i}`}
          className="absolute pointer-events-none drip-fall"
          style={{
            left: `${x}px`, top: '0px',
            width: '1.5px', height: `${20 + i * 5}px`,
            borderRadius: '0 0 2px 2px',
            background: 'linear-gradient(180deg, hsla(0,0%,22%,0.5), transparent)',
            zIndex: 2,
            '--duration': `${3 + i * 0.5}s`,
            '--delay': `${i * 0.8}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Border — shining ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: '1.5px solid hsla(0,0%,25%,0.5)', borderRadius: '10px', zIndex: 20,
      }} />
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        height: '2px', width: '55%', zIndex: 25,
        background: 'linear-gradient(90deg, transparent, hsl(0,0%,45%), hsl(0,0%,70%), hsl(0,0%,45%), transparent)',
      }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        height: '1.5px', width: '45%', zIndex: 25,
        background: 'linear-gradient(90deg, transparent, hsl(0,0%,35%), hsl(0,0%,55%), hsl(0,0%,35%), transparent)',
      }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: '2px', height: '40%', zIndex: 25,
        background: 'linear-gradient(180deg, transparent, hsl(0,0%,40%), transparent)',
      }}
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: '2px', height: '40%', zIndex: 25,
        background: 'linear-gradient(180deg, transparent, hsl(0,0%,40%), transparent)',
      }}
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 3.5, delay: 0.5, repeat: Infinity }}
      />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 flex" style={{ zIndex: 10, padding: '20px 30px' }}>

        {/* LEFT — Name + Info */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px', fontWeight: 500,
              color: 'hsl(0,0%,60%)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              textShadow: '0 0 8px hsla(0,0%,50%,0.5)',
              marginBottom: '4px',
            }}
          >
            ONE-EYED OWL
          </motion.div>

          <div style={{ position: 'relative' }}>
            <KakuganEye />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.15 }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <NameCorruption />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              marginTop: '8px', transformOrigin: 'left',
            }}
          >
            <div style={{ width: '50px', height: '1.5px', background: 'linear-gradient(90deg, hsl(0,0%,50%), transparent)' }} />
            <div style={{ width: '5px', height: '5px', background: 'hsl(0,0%,70%)', transform: 'rotate(45deg)', boxShadow: '0 0 10px hsl(0,0%,60%)' }} />
            <div style={{ width: '25px', height: '1px', background: 'linear-gradient(90deg, hsl(0,0%,40%), transparent)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px',
              color: 'hsl(0,0%,40%)',
              letterSpacing: '0.1em',
              marginTop: '8px',
            }}
          >
            Nysette is the best Femboy
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              marginTop: '10px', transformOrigin: 'left',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <div style={{
              width: '120px', height: '3px', borderRadius: '2px',
              background: 'hsl(0,0%,8%)',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%', borderRadius: '2px',
                  background: 'linear-gradient(90deg, hsl(0,0%,35%), hsl(0,0%,65%))',
                  boxShadow: '0 0 10px hsla(0,0%,55%,0.5)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '85%' }}
                transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 600,
              color: 'hsl(0,0%,55%)',
              letterSpacing: '0.05em',
            }}>RC LEVEL</span>
          </motion.div>
        </div>

        {/* RIGHT — Character */}
        <div style={{
          width: '300px', flexShrink: 0,
          position: 'relative',
          marginLeft: '10px',
        }}>
          {charReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 15 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
              style={{
                position: 'absolute',
                bottom: '-15px', right: '-10px',
                height: '260px',
                zIndex: 5,
                filter: 'drop-shadow(0 0 20px hsla(0,0%,6%,0.3)) drop-shadow(0 0 40px hsla(0,0%,3%,0.15))',
              }}
            >
              <img
                src="/nysette-char.png" alt=""
                style={{
                  height: '100%', width: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                  opacity: 0.88,
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Exported wrapper with replay ──
export default function NysetteBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <NysetteBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(0,0%,30%)',
          background: 'hsl(0,0%,6%)',
          border: '1px solid hsl(0,0%,14%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,25%)';
          e.currentTarget.style.color = 'hsl(0,0%,50%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,14%)';
          e.currentTarget.style.color = 'hsl(0,0%,30%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
