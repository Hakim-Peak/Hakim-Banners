import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef, type CSSProperties } from 'react';

// ── Diagonal stripe background ──
function DiagonalStripes() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      zIndex: 1,
      background: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, hsla(0,0%,60%,0.03) 18px, hsla(0,0%,60%,0.03) 19px)',
    }} />
  );
}

// ── Scanlines ──
function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      zIndex: 30,
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
    }} />
  );
}

// ── Code trail columns ──
const CODE_CHARS = '01アイウエオカキクケコ{}[]<>=/\\|#@$%^&*~';
const TRAIL_COLS = [
  { x: 35,  speed: 4.0, chars: 6, delay: 0 },
  { x: 95,  speed: 5.5, chars: 5, delay: 0.8 },
  { x: 155, speed: 3.5, chars: 7, delay: 0.3 },
  { x: 215, speed: 6.0, chars: 4, delay: 1.5 },
  { x: 285, speed: 4.5, chars: 6, delay: 0.5 },
  { x: 355, speed: 5.0, chars: 5, delay: 1.0 },
  { x: 425, speed: 3.8, chars: 7, delay: 0.2 },
  { x: 495, speed: 5.2, chars: 5, delay: 1.8 },
  { x: 565, speed: 4.2, chars: 6, delay: 0.6 },
  { x: 635, speed: 5.8, chars: 4, delay: 1.2 },
];

function CodeTrail({ x, speed, chars: charCount, delay }: (typeof TRAIL_COLS)[0]) {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChars(prev => {
        const next = [...prev];
        if (next.length < charCount) {
          next.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
        }
        if (next.length > charCount) next.pop();
        for (let i = 0; i < next.length; i++) {
          if (Math.random() > 0.7) {
            next[i] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          }
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [charCount]);

  return (
    <div
      className="absolute pointer-events-none code-trail"
      style={{
        left: `${x}px`, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6px',
        lineHeight: '10px',
        imageRendering: 'pixelated',
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {chars.map((c, i) => (
        <span key={i} style={{
          color: i === 0 ? 'hsl(0,0%,95%)' : `hsl(0,0%,${60 - i * 6}%)`,
          textShadow: i === 0 ? '0 0 6px hsl(0,0%,80%)' : 'none',
          opacity: 1 - i * 0.12,
        }}>{c}</span>
      ))}
    </div>
  );
}

// ── Glitch text effect ──
function GlitchText({ text, style }: { text: string; style: CSSProperties }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let innerTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setGlitch(true);
      innerTimeout = setTimeout(() => setGlitch(false), 80);
    }, 3500 + Math.random() * 2000);
    return () => { clearInterval(interval); clearTimeout(innerTimeout); };
  }, []);

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', ...style }}>
      {text}
      {glitch && (
        <>
          <span style={{
            ...style, position: 'absolute', top: 0, left: '2px',
            color: 'hsl(0,0%,70%)', opacity: 0.5,
            clipPath: 'inset(20% 0 40% 0)',
          }}>{text}</span>
          <span style={{
            ...style, position: 'absolute', top: 0, left: '-2px',
            color: 'hsl(0,0%,50%)', opacity: 0.5,
            clipPath: 'inset(60% 0 10% 0)',
          }}>{text}</span>
        </>
      )}
    </span>
  );
}

// ── Animated XP bar ──
function XPBar() {
  const [xp, setXp] = useState(0);
  const targetXp = 84;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setXp(current);
      if (current >= targetXp) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2" style={{ zIndex: 15 }}>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6px', color: 'hsl(0,0%,55%)',
      }}>EXP</span>
      <div style={{
        width: '100px', height: '5px',
        background: 'hsl(0,0%,10%)',
        border: '1px solid hsl(0,0%,20%)',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, hsl(0,0%,45%), hsl(0,0%,70%))',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: xp / targetXp }}
          transition={{ duration: 0 }}
        />
      </div>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6px', color: 'hsl(0,0%,45%)',
      }}>{xp}%</span>
    </div>
  );
}

// ── Inner banner ──
function RobloxBannerInner() {
  const [typedText, setTypedText] = useState('');
  const [glitch, setGlitch] = useState(false);
  const fullText = 'HAKIM';
  const glitchRef = useRef({ translateX: 3, skewX: 0.5, slice1Top: 15, slice2Top: 30 });

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

  // Random full-banner glitch every 3-6 seconds
  useEffect(() => {
    let outerTimeout: ReturnType<typeof setTimeout>;
    let innerTimeout: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const loop = () => {
      if (cancelled) return;
      const next = 1500 + Math.random() * 2000;
      outerTimeout = setTimeout(() => {
        if (cancelled) return;
        glitchRef.current = {
          translateX: Math.random() > 0.5 ? 3 : -3,
          skewX: Math.random() > 0.5 ? 0.5 : -0.5,
          slice1Top: 15 + Math.random() * 70,
          slice2Top: 30 + Math.random() * 50,
        };
        setGlitch(true);
        innerTimeout = setTimeout(() => { if (!cancelled) setGlitch(false); }, 60 + Math.random() * 80);
        loop();
      }, next);
    };
    loop();
    return () => { cancelled = true; clearTimeout(outerTimeout); clearTimeout(innerTimeout); };
  }, []);

  const g = glitchRef.current;

  return (
    <div
      data-testid="roblox-banner"
      className="relative overflow-hidden"
      style={{
        width: '680px',
        height: '240px',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0a0a0a 100%)',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsl(0,0%,15%)',
          '0 0 40px 4px hsla(0,0%,10%,0.1)',
          '0 32px 80px -8px rgba(0,0,0,0.98)',
          glitch ? '4px 0 0 hsla(0,0%,100%,0.15), -4px 0 0 hsla(0,0%,60%,0.1)' : '',
        ].filter(Boolean).join(','),
        transform: glitch ? `translateX(${g.translateX}px) skewX(${g.skewX}deg)` : 'none',
        transition: glitch ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      <DiagonalStripes />
      <Scanlines />

      {/* ── Glitch slice overlay ── */}
      {glitch && (
        <>
          <div className="absolute pointer-events-none" style={{
            left: 0, right: 0,
            top: `${g.slice1Top}%`,
            height: '2px',
            background: 'hsla(0,0%,100%,0.6)',
            zIndex: 50,
            mixBlendMode: 'difference',
          }} />
          <div className="absolute pointer-events-none" style={{
            left: 0, right: 0,
            top: `${g.slice2Top}%`,
            height: '1px',
            background: 'hsla(0,0%,60%,0.4)',
            zIndex: 50,
          }} />
        </>
      )}

      {/* ── Angular accent shape ── */}
      <div className="absolute pointer-events-none" style={{
        top: 0, right: 0,
        width: '280px', height: '240px',
        background: 'linear-gradient(135deg, transparent 40%, hsla(0,0%,30%,0.06) 100%)',
        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
        zIndex: 2,
      }} />

      {/* ── White accent bar left ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: 0, top: '30%', height: '40%',
          width: '3px', zIndex: 25,
          background: 'linear-gradient(180deg, transparent, hsl(0,0%,65%), transparent)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* ── Ambient glow ── */}
      <div className="absolute pointer-events-none" style={{
        left: '50%', top: '0%',
        width: '400px', height: '240px',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse 60% 100% at 50% 50%, hsla(0,0%,20%,0.08) 0%, transparent 70%)',
        zIndex: 2,
      }} />

      {TRAIL_COLS.map((t, i) => <CodeTrail key={i} {...t} />)}

      {/* ── Border ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: '1.5px solid hsl(0,0%,15%)',
        borderRadius: '10px',
        zIndex: 20,
      }} />

      {/* ── Top white accent line ── */}
      <motion.div className="absolute top-0 left-0 pointer-events-none" style={{
        height: '2px', zIndex: 25, width: '55%',
        background: 'linear-gradient(90deg, hsl(0,0%,65%), transparent)',
      }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 flex flex-col justify-between px-6 py-4" style={{ zIndex: 10 }}>

        {/* Top row — badge + stats */}
        <div className="flex items-center justify-between" style={{ zIndex: 15 }}>
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '8px', fontWeight: 700,
                color: 'hsl(0,0%,65%)',
                border: '1px solid hsl(0,0%,25%)',
                padding: '3px 10px',
                background: 'hsla(0,0%,100%,0.05)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px hsl(0,0%,50%)',
              }}>
              ROBLOX
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            {/* Robux counter */}
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px', color: 'hsl(0,0%,55%)',
              display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <span style={{ color: 'hsl(0,0%,70%)', fontWeight: 700 }}>R$</span> 99,999
            </span>
            {/* Ping */}
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px', color: 'hsl(0,0%,38%)',
            }}>PING: 12ms</span>
          </motion.div>
        </div>

        {/* Left side — name + info */}
        <div className="flex flex-col" style={{ zIndex: 15, maxWidth: '380px' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '10px', fontWeight: 600,
              color: 'hsl(0,0%,45%)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
            Where Da Ladies at :/
          </motion.p>

          {/* Name + verified badge inline */}
          <div className="flex items-center" style={{ gap: '8px' }}>
            <GlitchText
              text={typedText}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '44px', fontWeight: 800,
                color: 'hsl(0,0%,80%)',
                textShadow: '0 0 12px hsl(0,0%,55%), 0 0 30px hsla(0,0%,40%,0.3)',
                letterSpacing: '3px',
              }}
            />
            {typedText.length >= fullText.length && (
              <motion.img
                src="/roblox-char.png"
                alt="Verified"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.5 }}
                style={{
                  height: '32px', width: '32px',
                  filter: 'drop-shadow(0 0 6px hsla(0,0%,50%,0.4))',
                  flexShrink: 0,
                }}
              />
            )}
            {typedText.length < fullText.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  display: 'inline-block', width: '3px', height: '40px',
                  background: 'hsl(0,0%,65%)',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 8px hsl(0,0%,50%)',
                }}
              />
            )}
          </div>

          {/* Pixel divider */}
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 18 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.5, 0.3], scale: 1 }}
                transition={{ delay: 1.0 + i * 0.025, duration: 0.25 }}
                style={{
                  width: '3px', height: '3px',
                  background: i % 4 === 0 ? 'hsl(0,0%,55%)' : 'hsl(0,0%,20%)',
                  boxShadow: i % 4 === 0 ? '0 0 4px hsl(0,0%,40%)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Trait */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px', fontWeight: 600,
              color: 'hsl(0,0%,45%)',
              letterSpacing: '0.15em',
              marginTop: '6px',
              textTransform: 'uppercase',
            }}>
            {'Where Da Ladies at :/'}
          </motion.p>

          <div className="mt-3">
            <XPBar />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between" style={{ zIndex: 15 }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '6px', color: 'hsl(0,0%,18%)',
          }}>LVL 99</span>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '6px', color: 'hsl(0,0%,18%)',
          }}>{'/// HAKIM ///'}</span>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '6px', color: 'hsl(0,0%,25%)',
          }}>
            <motion.span
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ONLINE
            </motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Exported wrapper with replay ──
export default function RobloxBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <RobloxBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(0,0%,55%)',
          background: 'hsl(0,0%,8%)',
          border: '1px solid hsl(0,0%,18%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,35%)';
          e.currentTarget.style.color = 'hsl(0,0%,85%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,18%)';
          e.currentTarget.style.color = 'hsl(0,0%,55%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
