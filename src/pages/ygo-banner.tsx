import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

// Rising blue energy particles
const PARTICLES = [
  { id: 0,  x: 80,  drift: 14,  dur: 7.0, delay: 0.0,  size: 3.0 },
  { id: 1,  x: 175, drift: -10, dur: 9.2, delay: 1.2,  size: 2.0 },
  { id: 2,  x: 265, drift: 18,  dur: 6.5, delay: 0.5,  size: 4.0 },
  { id: 3,  x: 350, drift: -16, dur: 8.8, delay: 2.3,  size: 2.5 },
  { id: 4,  x: 450, drift: 10,  dur: 7.4, delay: 3.0,  size: 3.5 },
  { id: 5,  x: 540, drift: -18, dur: 6.9, delay: 0.8,  size: 2.0 },
  { id: 6,  x: 630, drift: 12,  dur: 9.6, delay: 1.8,  size: 4.5 },
  { id: 7,  x: 720, drift: -8,  dur: 7.1, delay: 3.5,  size: 3.0 },
  { id: 8,  x: 820, drift: 16,  dur: 8.3, delay: 0.3,  size: 2.5 },
  { id: 9,  x: 900, drift: -14, dur: 6.7, delay: 2.7,  size: 3.5 },
  { id: 10, x: 130, drift: -12, dur: 9.0, delay: 4.2,  size: 2.0 },
  { id: 11, x: 680, drift: 8,   dur: 7.8, delay: 1.5,  size: 4.0 },
  { id: 12, x: 400, drift: -20, dur: 6.3, delay: 3.8,  size: 2.5 },
  { id: 13, x: 770, drift: 14,  dur: 8.5, delay: 0.6,  size: 3.0 },
  { id: 14, x: 220, drift: 10,  dur: 7.6, delay: 2.0,  size: 2.0 },
];

function Particle({ x, drift, dur, delay, size }: (typeof PARTICLES)[0]) {
  return (
    <circle
      cx={x}
      cy={560}
      r={size / 2}
      fill="hsl(210,100%,75%)"
      className="ygo-particle"
      style={{
        '--y-start': '0px',
        '--y-end': '-580px',
        '--delay': `${delay}s`,
        '--dur': `${dur}s`,
        '--particle-opacity': '0.85',
      } as React.CSSProperties}
    />
  );
}

function YGOBannerInner() {
  return (
    <div className="w-full flex items-center justify-center"
      style={{ background: 'transparent' }}>

      {/* Server banner 960×540 */}
      <div
        data-testid="ygo-banner"
        className="relative overflow-hidden"
        style={{
          width: '960px', height: '540px',
          background: 'hsl(220,30%,4%)',
          borderRadius: '12px',
          boxShadow: [
            '0 0 0 1px hsl(210,80%,22%)',
            '0 0 80px 12px hsla(210,100%,45%,0.22)',
            '0 0 160px 24px hsla(220,80%,30%,0.15)',
            '0 40px 100px -12px rgba(0,0,0,0.98)',
          ].join(','),
        }}
      >
        {/* ── Background dark-blue radials ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 65% 75% at 50% 50%, hsl(220,40%,8%) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 50% at 50% 100%, hsl(215,45%,10%) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 45% at 5%  50%, hsl(210,60%,10%) 0%, transparent 55%)',
            'radial-gradient(ellipse 40% 45% at 95% 50%, hsl(210,60%,10%) 0%, transparent 55%)',
          ].join(','),
        }} />

        {/* Top sheen */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% -20%, hsla(210,100%,70%,0.08) 0%, transparent 70%)',
        }} />

        {/* ── YUGI — left side ── */}
        <motion.img
          src="/yugi.png"
          alt="Yugi"
          className="ygo-char-glow"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-10px',
            height: '88%',
            width: 'auto',
            zIndex: 6,
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 8%)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 8%)',
            WebkitMaskComposite: 'destination-in',
            pointerEvents: 'none',
          }}
        />

        {/* ── KAIBA — right side ── */}
        <motion.img
          src="/kaiba.png"
          alt="Kaiba"
          className="ygo-char-glow"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: 0,
            right: '-10px',
            height: '92%',
            width: 'auto',
            zIndex: 6,
            maskImage: 'linear-gradient(to left, transparent 0%, black 12%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 8%)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 12%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 8%)',
            WebkitMaskComposite: 'destination-in',
            pointerEvents: 'none',
          }}
        />

        {/* ── PARTICLES ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 5 }}>
          <defs>
            <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="hsl(210,100%,70%)" stopOpacity="0.85" />
              <stop offset="55%"  stopColor="hsl(220,90%,45%)"  stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(220,80%,30%)"  stopOpacity="0" />
            </radialGradient>
          </defs>
          {PARTICLES.map(p => <Particle key={p.id} {...p} />)}
        </svg>

        {/* ── CENTRAL MAGIC CIRCLE ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 8 }}>
          <svg viewBox="0 0 400 400" style={{ width: '500px', height: '500px' }}>

            {/* Energy rays */}
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5) * Math.PI / 180;
              const x1 = 200 + Math.cos(angle) * 110;
              const y1 = 200 + Math.sin(angle) * 110;
              const x2 = 200 + Math.cos(angle) * 196;
              const y2 = 200 + Math.sin(angle) * 196;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(210,100%,65%)"
                  strokeWidth={i % 2 === 0 ? '1.4' : '0.5'}
                  strokeOpacity={i % 2 === 0 ? '0.45' : '0.2'}
                  className="ray-pulse"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              );
            })}

            {/* Outermost ring — slow clockwise */}
            <g className="ring-spin" style={{ animationDuration: '70s', transformOrigin: '200px 200px' }}>
              <circle cx="200" cy="200" r="190" fill="none" stroke="hsl(210,70%,30%)" strokeWidth="1" strokeOpacity="0.4" />
              {Array.from({ length: 36 }, (_, i) => {
                const a = (i * 10) * Math.PI / 180;
                const len = i % 3 === 0 ? 10 : 5;
                return (
                  <line key={i}
                    x1={200 + Math.cos(a) * 190} y1={200 + Math.sin(a) * 190}
                    x2={200 + Math.cos(a) * (190 - len)} y2={200 + Math.sin(a) * (190 - len)}
                    stroke="hsl(210,100%,60%)"
                    strokeWidth={i % 3 === 0 ? '1.5' : '0.7'}
                    strokeOpacity="0.55"
                  />
                );
              })}
            </g>

            {/* Second ring + diamond marks — counter-clockwise */}
            <g className="ring-spin-ccw" style={{ animationDuration: '45s', transformOrigin: '200px 200px' }}>
              <circle cx="200" cy="200" r="163" fill="none" stroke="hsl(210,100%,55%)" strokeWidth="1.5" strokeOpacity="0.5" />
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i * 45) * Math.PI / 180;
                const cx = 200 + Math.cos(a) * 163;
                const cy = 200 + Math.sin(a) * 163;
                return (
                  <polygon key={i}
                    points={`${cx},${cy - 6} ${cx + 5},${cy} ${cx},${cy + 6} ${cx - 5},${cy}`}
                    fill="hsl(200,100%,70%)" opacity="0.75"
                    transform={`rotate(${i * 45} ${cx} ${cy})`}
                  />
                );
              })}
            </g>

            {/* Arc-rune ring — clockwise */}
            <g className="ring-spin" style={{ animationDuration: '28s', transformOrigin: '200px 200px' }}>
              <circle cx="200" cy="200" r="133" fill="none" stroke="hsl(220,80%,55%)" strokeWidth="2" strokeOpacity="0.65" />
              {Array.from({ length: 8 }, (_, i) => {
                const startA = (i * 45 + 5) * Math.PI / 180;
                const endA   = (i * 45 + 36) * Math.PI / 180;
                const x1 = 200 + Math.cos(startA) * 133;
                const y1 = 200 + Math.sin(startA) * 133;
                const x2 = 200 + Math.cos(endA)   * 133;
                const y2 = 200 + Math.sin(endA)   * 133;
                return (
                  <path key={i} d={`M ${x1} ${y1} A 133 133 0 0 1 ${x2} ${y2}`}
                    fill="none" stroke="hsl(195,100%,65%)" strokeWidth="3.5" strokeOpacity="0.60" />
                );
              })}
            </g>

            {/* Star of Solomon — slow counter */}
            <g className="ring-spin-ccw" style={{ animationDuration: '40s', transformOrigin: '200px 200px' }}>
              <polygon points="200,100 278,242 122,242"
                fill="none" stroke="hsl(210,100%,60%)" strokeWidth="1.5" strokeOpacity="0.50" />
              <polygon points="200,300 122,158 278,158"
                fill="none" stroke="hsl(210,100%,60%)" strokeWidth="1.5" strokeOpacity="0.50" />
            </g>

            {/* Inner glowing ring */}
            <g className="ring-spin" style={{ animationDuration: '20s', transformOrigin: '200px 200px' }}>
              <circle cx="200" cy="200" r="82" fill="none"
                stroke="hsl(210,100%,68%)" strokeWidth="2.5" strokeOpacity="0.80" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30) * Math.PI / 180;
                return (
                  <circle key={i}
                    cx={200 + Math.cos(a) * 82} cy={200 + Math.sin(a) * 82}
                    r="3" fill="hsl(200,100%,75%)" opacity="0.85" />
                );
              })}
            </g>

            {/* Inner circle fill */}
            <circle cx="200" cy="200" r="55"
              fill="hsla(220,40%,6%,0.92)"
              stroke="hsl(210,100%,60%)" strokeWidth="2" strokeOpacity="0.9" />

            {/* ── MILLENNIUM EYE ── */}
            <g className="millennium-eye-pulse" style={{ animationDuration: '3.2s' }}>
              <polygon points="200,163 232,218 168,218"
                fill="none" stroke="hsl(200,100%,75%)" strokeWidth="2" />
              <line x1="200" y1="163" x2="200" y2="218" stroke="hsl(200,100%,75%)" strokeWidth="1" strokeOpacity="0.45" />
              <line x1="184" y1="190" x2="216" y2="190" stroke="hsl(200,100%,75%)" strokeWidth="1" strokeOpacity="0.45" />
              <path d="M 168 200 Q 200 172 232 200 Q 200 228 168 200 Z"
                fill="hsla(220,50%,10%,0.95)"
                stroke="hsl(200,100%,75%)" strokeWidth="1.8" />
              <ellipse cx="200" cy="200" rx="16" ry="14"
                fill="hsl(220,80%,22%)"
                stroke="hsl(210,100%,65%)" strokeWidth="1.2" />
              <ellipse cx="200" cy="200" rx="6" ry="12"
                fill="hsl(210,100%,65%)" />
              <ellipse cx="203" cy="196" rx="2" ry="3" fill="white" opacity="0.75" />
              <line x1="192" y1="218" x2="188" y2="228" stroke="hsl(200,100%,72%)" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="200" y1="220" x2="200" y2="232" stroke="hsl(200,100%,72%)" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="208" y1="218" x2="212" y2="228" stroke="hsl(200,100%,72%)" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="188" y1="225" x2="200" y2="228" stroke="hsl(200,100%,72%)" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="212" y1="225" x2="200" y2="228" stroke="hsl(200,100%,72%)" strokeWidth="1" strokeOpacity="0.5" />
            </g>

            {/* Core radial glow */}
            <circle cx="200" cy="200" r="55" fill="url(#circleGrad)" opacity="0.20" />
          </svg>
        </div>

        {/* ── CORNER CARD-FRAME BRACKETS ── */}
        {[
          { pos: { top: 0,    left: 0    }, rot: 0   },
          { pos: { top: 0,    right: 0   }, rot: 90  },
          { pos: { bottom: 0, right: 0   }, rot: 180 },
          { pos: { bottom: 0, left: 0    }, rot: 270 },
        ].map((c, i) => (
          <svg key={i} className="absolute pointer-events-none"
            viewBox="0 0 80 80"
            style={{ ...c.pos, width: '100px', height: '100px', opacity: 0.5 }}>
            <g transform={`rotate(${c.rot} 40 40)`}>
              <line x1="8" y1="8" x2="8" y2="40"  stroke="hsl(210,100%,60%)" strokeWidth="2.5" />
              <line x1="8" y1="8" x2="40" y2="8"  stroke="hsl(210,100%,60%)" strokeWidth="2.5" />
              <line x1="8" y1="8" x2="18" y2="18" stroke="hsl(210,100%,60%)" strokeWidth="1.5" strokeOpacity="0.45" />
              <rect x="10" y="10" width="8" height="8"
                fill="none" stroke="hsl(195,100%,65%)" strokeWidth="1.5" />
            </g>
          </svg>
        ))}

        {/* ── TOP & BOTTOM border glow ── */}
        {['top-0', 'bottom-0'].map(pos => (
          <div key={pos} className={`absolute ${pos} left-0 right-0 pointer-events-none`} style={{
            height: '2.5px',
            background: 'linear-gradient(90deg, transparent 0%, hsl(220,70%,45%) 15%, hsl(210,100%,65%) 40%, hsl(195,100%,75%) 50%, hsl(210,100%,65%) 60%, hsl(220,70%,45%) 85%, transparent 100%)',
            boxShadow: '0 0 18px 4px hsla(210,100%,55%,0.55)',
          }} />
        ))}

        {/* ── TEXT ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12"
          style={{ zIndex: 15 }}>

          <motion.h1
            data-testid="ygo-title"
            className="ygo-title-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '62px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: 'linear-gradient(120deg, hsl(200,100%,96%) 0%, hsl(210,100%,72%) 30%, hsl(220,90%,58%) 60%, hsl(210,100%,74%) 85%, hsl(200,100%,96%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center', lineHeight: 1,
            }}>
            Duelist Legacy
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              width: '340px', height: '1px', margin: '10px 0',
              background: 'linear-gradient(90deg, transparent, hsl(210,100%,60%), hsl(195,100%,70%), hsl(210,100%,60%), transparent)',
              opacity: 0.7,
            }} />

          <motion.p
            data-testid="ygo-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontFamily: "'Noto Sans Arabic', 'Space Grotesk', sans-serif",
              fontSize: '32px', fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'hsl(210,60%,55%)',
              textShadow: '0 0 14px hsl(210,100%,45%)',
              direction: 'rtl',
            }}>
            أفضل سيرفر يوغي للعرب
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function YGOBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <YGOBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(210,50%,45%)',
          background: 'hsl(210,20%,6%)',
          border: '1px solid hsl(210,20%,16%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(210,60%,40%)';
          e.currentTarget.style.color = 'hsl(210,70%,70%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(210,20%,16%)';
          e.currentTarget.style.color = 'hsl(210,50%,45%)';
        }}
      >REPLAY</button>
    </div>
  );
}
