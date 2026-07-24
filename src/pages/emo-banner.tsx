import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

// ── Pixel grid data (generated once at module level) ──
function generatePixelGrid() {
  const dots: { x: number; y: number; opacity: number; delay: number }[] = [];
  for (let x = 0; x < 680; x += 16) {
    for (let y = 0; y < 240; y += 16) {
      dots.push({
        x: x + 7,
        y: y + 7,
        opacity: 0.2 + Math.random() * 0.3,
        delay: Math.random() * 5,
      });
    }
  }
  return dots;
}
const PIXEL_GRID_DOTS = generatePixelGrid();

// ── Pixel grid dots ──
function PixelGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {PIXEL_GRID_DOTS.map((d, i) => (
        <rect
          key={i}
          className="pixel-grid-dot"
          x={d.x}
          y={d.y}
          width={2}
          height={2}
          fill="hsl(0,0%,25%)"
          style={{
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}

// ── Pixel particles rising ──
const PIXEL_PARTICLES = [
  { id: 0,  x: 40,  dur: 5.0, delay: 0.0, size: 3 },
  { id: 1,  x: 110, dur: 6.5, delay: 1.0, size: 2 },
  { id: 2,  x: 180, dur: 4.8, delay: 0.5, size: 4 },
  { id: 3,  x: 260, dur: 7.2, delay: 2.0, size: 2 },
  { id: 4,  x: 340, dur: 5.5, delay: 0.3, size: 3 },
  { id: 5,  x: 420, dur: 6.8, delay: 1.5, size: 2 },
  { id: 6,  x: 500, dur: 4.5, delay: 0.8, size: 3 },
  { id: 7,  x: 570, dur: 7.0, delay: 2.5, size: 4 },
  { id: 8,  x: 630, dur: 5.2, delay: 0.2, size: 2 },
  { id: 9,  x: 80,  dur: 6.0, delay: 3.0, size: 3 },
  { id: 10, x: 300, dur: 4.2, delay: 1.8, size: 2 },
  { id: 11, x: 460, dur: 7.5, delay: 0.6, size: 3 },
  { id: 12, x: 200, dur: 5.8, delay: 2.2, size: 2 },
  { id: 13, x: 550, dur: 6.3, delay: 1.2, size: 4 },
];

function PixelParticle({ x, dur, delay, size }: (typeof PIXEL_PARTICLES)[0]) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}px`,
        bottom: '0px',
        width: `${size}px`,
        height: `${size}px`,
        background: 'hsl(0,0%,60%)',
        zIndex: 12,
        imageRendering: 'pixelated',
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -80, -160, -240],
        opacity: [0, 0.7, 0.4, 0],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ── Blinking cursor ──
function BlinkCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{
        display: 'inline-block',
        width: '8px', height: '14px',
        background: 'hsl(0,0%,60%)',
        marginLeft: '4px',
        verticalAlign: 'middle',
      }}
    />
  );
}

// ── Inner banner (all animations live here — remounted via key) ──
function EmoBannerInner() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Hakim';

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
      }, 120);
    }, 800);
    return () => { clearTimeout(timeout); if (interval!) clearInterval(interval); };
  }, []);

  return (
    <div
      data-testid="emo-banner"
      className="relative overflow-hidden"
      style={{
        width: '680px',
        height: '240px',
        background: '#080808',
        borderRadius: '10px',
        boxShadow: [
          '0 0 0 1px hsl(0,0%,15%)',
          '0 0 30px 4px hsla(0,0%,10%,0.15)',
          '0 32px 80px -8px rgba(0,0,0,0.98)',
        ].join(','),
      }}
    >
      <PixelGrid />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 30% 50%, transparent 20%, hsla(0,0%,4%,0.8) 100%)',
        zIndex: 2,
      }} />

      {PIXEL_PARTICLES.map(p => <PixelParticle key={p.id} {...p} />)}

      {/* ── CHARACTER — center-right, blended toward name ── */}
      <div className="absolute pointer-events-none" style={{
        right: '80px', top: '0px',
        width: '320px', height: '250px',
        background: 'radial-gradient(ellipse 70% 85% at 55% 50%, hsla(0,0%,12%,0.25) 0%, transparent 65%)',
        zIndex: 2,
      }} />

      <motion.img
        src="/emo-char.png"
        alt=""
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'absolute',
          right: '80px',
          bottom: '5px',
          height: '265px',
          width: 'auto',
          zIndex: 6,
          filter: [
            'saturate(0)',
            'brightness(0.85)',
            'contrast(1.15)',
            'drop-shadow(0 0 15px hsla(0,0%,30%,0.4))',
            'drop-shadow(0 0 30px hsla(0,0%,20%,0.2))',
          ].join(' '),
          mixBlendMode: 'screen',
          WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 75%)',
          maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Retro border ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: '2px solid hsl(0,0%,18%)',
        borderRadius: '10px',
        zIndex: 20,
      }} />

      {/* ── Top border — silver pixel dashed ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '2px',
        background: 'repeating-linear-gradient(90deg, hsl(0,0%,40%) 0px, hsl(0,0%,40%) 4px, transparent 4px, transparent 8px)',
        boxShadow: '0 0 8px hsla(0,0%,35%,0.3)',
        zIndex: 25,
      }} />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 flex flex-col justify-between px-6 py-4" style={{ zIndex: 10 }}>

        {/* Top row — badges on left */}
        <div className="flex items-center gap-3" style={{ zIndex: 15 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex items-center gap-3">
            {[
              { label: 'PIXEL', color: 'hsl(0,0%,55%)' },
              { label: 'EMO', color: 'hsl(0,0%,40%)' },
            ].map(b => (
              <span key={b.label} style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px', color: b.color,
                border: `1px solid ${b.color}44`,
                padding: '3px 8px',
                background: `${b.color}0a`,
              }}>{b.label}</span>
            ))}
          </motion.div>
        </div>

        {/* Left side — name and text */}
        <div className="flex flex-col" style={{ zIndex: 15, maxWidth: '340px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px', color: 'hsl(0,0%,40%)',
              letterSpacing: '0.15em', marginBottom: '6px',
              textShadow: '0 0 6px hsl(0,0%,30%)',
            }}>
            {'> Player Select'}
          </motion.p>

          <div>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '42px', color: 'hsl(0,0%,65%)',
              textShadow: '0 0 10px hsl(0,0%,50%), 0 0 20px hsl(0,0%,35%), 2px 2px 0 hsl(0,0%,10%)',
              letterSpacing: '4px',
            }}>
              {typedText}
            </span>
            {typedText.length < fullText.length && <BlinkCursor />}
          </div>

          <div className="flex items-center gap-1 mt-3">
            {Array.from({ length: 14 }, (_, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.4, 0.25], scale: 1 }}
                transition={{ delay: 1.2 + i * 0.03, duration: 0.3 }}
                style={{
                  width: '4px', height: '4px',
                  background: i % 3 === 0 ? 'hsl(0,0%,45%)' : 'hsl(0,0%,30%)',
                }}
              />
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px', color: 'hsl(0,0%,35%)',
              letterSpacing: '0.1em', marginTop: '8px',
            }}>
            {'Where Da Ladies at :/'}
          </motion.p>

          {/* HP bar */}
          <div className="flex items-center gap-2 mt-3" style={{ zIndex: 15 }}>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px', color: 'hsl(0,0%,50%)',
            }}>HP</span>
            <div style={{
              width: '100px', height: '8px',
              background: 'hsl(0,0%,8%)',
              border: '1px solid hsl(0,0%,20%)',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{ height: '100%', background: 'hsl(0,0%,55%)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px', color: 'hsl(0,0%,40%)',
            }}>MAX</span>
          </div>
        </div>

        {/* Bottom row — retro footer */}
        <div className="flex items-center justify-between" style={{ zIndex: 15 }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '7px', color: 'hsl(0,0%,20%)',
          }}>LVL 99</span>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '7px', color: 'hsl(0,0%,20%)',
          }}>{'/// HAKIM ///'}</span>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '7px', color: 'hsl(0,0%,28%)',
          }}>
            <motion.span animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}>
              ONLINE
            </motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Exported wrapper with replay button ──
export default function EmoBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>

      <EmoBannerInner key={animKey} />

      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(0,0%,50%)',
          background: 'hsl(0,0%,8%)',
          border: '1px solid hsl(0,0%,20%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,40%)';
          e.currentTarget.style.color = 'hsl(0,0%,75%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(0,0%,20%)';
          e.currentTarget.style.color = 'hsl(0,0%,50%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
