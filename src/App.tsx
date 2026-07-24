import { useState, useEffect, useRef, Component, type ReactNode } from 'react';
import YGOBanner from '@/pages/ygo-banner';
import AizenBanner from '@/pages/aizen-banner';
import EmoBanner from '@/pages/emo-banner';
import RobloxBanner from '@/pages/roblox-banner';
import YGOServerBanner from '@/pages/ygo-server-banner';
import NysetteBanner from '@/pages/nysette-banner';
import RolandBanner from '@/pages/roland-banner';
import LamineBanner from '@/pages/lamine-banner';
import GojoBanner from '@/pages/gojo-banner';
import BasilBanner from '@/pages/basil-banner';
import SunnyBanner from '@/pages/sunny-banner';
import SimoBanner from '@/pages/simo-banner';
import YGOServer2Banner from '@/pages/ygo-server2-banner';
import ItachiBanner from '@/pages/itachi-banner';

type Banner = 'ygo' | 'aizen' | 'emo' | 'roblox' | 'ygo-server' | 'nysette' | 'roland' | 'lamine' | 'gojo' | 'basil' | 'sunny' | 'simo' | 'ygo-server2' | 'itachi';

const TABS: { id: Banner; label: string; color: string }[] = [
  { id: 'ygo',         label: 'YGO',             color: 'hsl(210,100%,70%)' },
  { id: 'aizen',       label: 'Aizen',           color: 'hsl(270,80%,70%)' },
  { id: 'gojo',        label: 'Gojo',            color: 'hsl(230,80%,70%)' },
  { id: 'emo',         label: 'Emo',             color: 'hsl(0,50%,60%)' },
  { id: 'roblox',      label: 'Roblox',          color: 'hsl(130,80%,55%)' },
  { id: 'ygo-server',  label: 'YGO Server',      color: 'hsl(183,85%,50%)' },
  { id: 'nysette',     label: 'Nysette',         color: 'hsl(350,70%,65%)' },
  { id: 'roland',      label: 'Roland',          color: 'hsl(0,0%,65%)' },
  { id: 'lamine',      label: 'Lamine',          color: 'hsl(220,85%,60%)' },
  { id: 'basil',       label: 'Basil',           color: 'hsl(130,70%,55%)' },
  { id: 'sunny',       label: 'Sunny',           color: 'hsl(0,0%,70%)' },
  { id: 'simo',        label: 'Simo',            color: 'hsl(210,50%,65%)' },
  { id: 'ygo-server2', label: 'Duelist Legacy',  color: 'hsl(345,70%,60%)' },
  { id: 'itachi',      label: 'Itachi',          color: 'hsl(0,60%,45%)' },
];

const BANNER_SIZES: Record<Banner, { w: number; h: number }> = {
  'ygo':         { w: 960, h: 540 },
  'aizen':       { w: 680, h: 240 },
  'emo':         { w: 680, h: 240 },
  'roblox':      { w: 680, h: 240 },
  'ygo-server':  { w: 1024, h: 450 },
  'nysette':     { w: 680, h: 240 },
  'roland':      { w: 680, h: 240 },
  'lamine':      { w: 680, h: 240 },
  'gojo':        { w: 680, h: 240 },
  'basil':       { w: 680, h: 240 },
  'sunny':       { w: 680, h: 240 },
  'simo':        { w: 680, h: 240 },
  'ygo-server2': { w: 680, h: 240 },
  'itachi':      { w: 680, h: 240 },
};

function GlitchName() {
  const text = 'HAKIM';
  return (
    <h1
      className="main-page-glitch-text"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(42px, 7vw, 72px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        cursor: 'default',
        position: 'relative',
        color: 'hsl(0,0%,90%)',
      }}
    >
      {text}
    </h1>
  );
}

function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.3 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#1a0000', color: '#ff4444', padding: '20px', borderRadius: '8px', maxWidth: '680px', fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'pre-wrap' }}>
          <strong>Banner crashed:</strong>{'\n'}{this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

const BANNER_MAP: Record<Banner, React.FC> = {
  'ygo': YGOBanner,
  'aizen': AizenBanner,
  'emo': EmoBanner,
  'roblox': RobloxBanner,
  'ygo-server': YGOServerBanner,
  'nysette': NysetteBanner,
  'roland': RolandBanner,
  'lamine': LamineBanner,
  'gojo': GojoBanner,
  'basil': BasilBanner,
  'sunny': SunnyBanner,
  'simo': SimoBanner,
  'ygo-server2': YGOServer2Banner,
  'itachi': ItachiBanner,
};

export default function App() {
  const [active, setActive] = useState<Banner | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!active) return;
    const compute = () => {
      const size = BANNER_SIZES[active];
      const padX = 60;
      const padY = 120;
      const sw = (window.innerWidth - padX) / size.w;
      const sh = (window.innerHeight - padY) / size.h;
      setScale(Math.min(sw, sh, 1));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [active]);

  return (
    <div style={{ minHeight: '100vh', background: '#07080b', position: 'relative' }}>
      {!active && <ParticlesBg />}

      {/* Tab bar — hidden when a banner is active */}
      {!active && (
        <div style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '28px',
          padding: '60px 20px',
          position: 'relative',
          zIndex: 1,
        }}>
          <GlitchName />
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '14px',
            color: 'hsl(220,10%,40%)',
            letterSpacing: '0.05em',
          }}>
            Pick a banner
          </p>
          <a
            href="https://discord.com/users/1498450087481704553"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '8px',
              background: 'hsl(235,86%,65%)',
              color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            <svg width="18" height="14" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60.1 4.9A58.5 58.5 0 0 0 45.4.2a.2.2 0 0 0-.2.1 40.8 40.8 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A26.7 26.7 0 0 0 25.4.3a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.5 4.9a.2.2 0 0 0-.1.1C1.6 18.4-.9 31.6.3 44.6a.2.2 0 0 0 .1.1 58.7 58.7 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4c.4-.3.7-.6 1.1-.9a.2.2 0 0 1 .2 0c11.5 5.3 24 5.3 35.4 0a.2.2 0 0 1 .2 0l1.1.9a.2.2 0 0 1 0 .4c-1.8 1-3.6 1.9-5.6 2.6a.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.7 5.9.2.2 0 0 0 .2.1 58.5 58.5 0 0 0 17.7-9 .2.2 0 0 0 .1-.1c1.5-15.1-2.5-28.2-10.6-39.6a.2.2 0 0 0-.1-.1ZM23.7 36.5c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1-2.8 7.1-6.4 7.1Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1-2.8 7.1-6.4 7.1Z" fill="white"/>
            </svg>
            Contact on Discord
          </a>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '32px',
            alignItems: 'center',
          }}>
            {[
              { value: '14', label: 'Banners' },
              { value: '4', label: 'Themes' },
              { value: '∞', label: 'Ideas' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '24px', fontWeight: 800,
                  color: 'hsl(0,0%,80%)',
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '10px', fontWeight: 500,
                  color: 'hsl(220,10%,30%)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Card grid with glass panel */}
          <div className="main-page-glass" style={{
            padding: '20px',
            borderRadius: '16px',
            background: 'hsla(220,12%,10%,0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid hsla(220,14%,18%,0.5)',
          }}>
            <div className="main-page-grid">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="main-page-card"
                  data-index={i}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'hsl(220,12%,10%)',
                    border: '1px solid hsl(220,14%,16%)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '28px 16px',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 50% 60%, ${t.color}0a 0%, transparent 70%)`,
                    transition: 'background 0.3s',
                  }} />
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: t.color,
                    letterSpacing: '0.04em',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {t.label}
                  </span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'hsl(220,10%,30%)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    View Banner →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen banner */}
      {active && (
        <div style={{
          position: 'fixed', inset: 0,
          zIndex: 100,
          background: '#07080b',
          animation: 'portfolioFadeIn 0.3s ease',
          overflow: 'hidden',
        }}>
          {/* Banner scales to fit viewport */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center center',
          }}>
            <ErrorBoundary key={active}>
              {(() => {
                const BannerComponent = BANNER_MAP[active];
                return <BannerComponent />;
              })()}
            </ErrorBoundary>
          </div>

          {/* Back button */}
          <button
            onClick={() => setActive(null)}
            className="back-btn"
            style={{
              position: 'fixed',
              top: '20px', left: '20px',
              zIndex: 110,
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid hsl(220,14%,22%)',
              background: 'rgba(7,8,11,0.85)',
              backdropFilter: 'blur(8px)',
              color: 'hsl(220,10%,55%)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            ← Back
          </button>

          {/* Banner name */}
          <div style={{
            position: 'fixed',
            bottom: '20px', left: '20px',
            zIndex: 110,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            color: TABS.find(t => t.id === active)?.color || '#fff',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}>
            {TABS.find(t => t.id === active)?.label}
          </div>
        </div>
      )}
    </div>
  );
}
