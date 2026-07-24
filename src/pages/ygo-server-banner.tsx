import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useMemo } from 'react';

// ── All channels exactly as provided ──
const ALL_CHANNELS = [
  { prefix: '#', icon: '📈', name: '• Levels', desc: 'استعراض رتبتك ومستوى تفاعلك ونشاطك بالدردشة', important: true },
  { prefix: '#', icon: '📒', name: '• تصاميم•سيرفر•', desc: 'مشاركة إبداعات وتصاميم الأعضاء الخاصة بالسيرفر' },
  { prefix: '#', icon: '💡', name: '• Suggestion', desc: 'مساحة مخصصة لمشاركتنا اقتراحاتكم لتطوير السيرفر' },
  { prefix: '#', icon: '🤲', name: '• Doua', desc: 'روم مخصص لنشر وقراءة الأدعية الدينية المستجابة' },
  { prefix: '#', icon: '📿', name: '• Azkar', desc: 'روم مخصص لقراءة الأذكار اليومية حصن المسلم' },
  { prefix: '#', icon: '⚙️', name: '• Voice · Settin...', desc: 'إعدادات وضبط جودة وسرعة الرومات الصوتية بالسيرفر' },
  { prefix: '🔊', icon: '➕', name: '• Creat · Voice', desc: 'اضغط هنا لإنشاء روم صوتي خاص بك تلقائياً' },
  { prefix: '🔊', icon: '😴', name: '• AFK', desc: 'روم مخصص للتواجد عند الابتعاد عن الجهاز مؤقتاً' },
  { prefix: '🔊', icon: '👑', name: 'VIP', desc: 'روم صوتي خاص مخصص للأعضاء المميزين والداعمين', important: true },
  { prefix: '📢', icon: '🕌', name: '• نكسب · أجر •', desc: 'روم مخصص للذكر والأدعية والأذكار اليومية' },
  { prefix: '#', icon: '💬', name: '• General · Chat', desc: 'المقر العام للدردشة والسوالف والتفاعل اليومي', important: true },
  { prefix: '#', icon: '📒', name: '• Tournam · Chat', desc: 'شات مخصص لنقاشات وتكتيكات بطولات السيرفر' },
  { prefix: '#', icon: '🎮', name: '• Games · Bot', desc: 'روم الألعاب الترفيهية وتجربة البوتات المسلية' },
  { prefix: '#', icon: '🤖', name: '• AI · Bot', desc: 'روم مخصص للذكاء الاصطناعي والاستخدامات الذكية' },
  { prefix: '#', icon: '💻', name: '• Commands', desc: 'كتابة أوامر البوتات وتفعيل الميزات المختلفة' },
  { prefix: '#', icon: '🎭', name: '• Memes', desc: 'مشاركة الصور المضحكة والميمز الخاصة باللعبة' },
  { prefix: '#', icon: '🦁', name: '• Master · Proof', desc: 'شاركنا إثبات وصولك لرتبة الماستر في اللعبة' },
  { prefix: '#', icon: '🤝', name: '• Compaign · code', desc: 'تبادل الأكواد والروابط الخاصة بحملات اللعبة' },
  { prefix: '💬', icon: '💭', name: '• Posts', desc: 'نشر ومشاركة المنشورات الهامة والتفاعل معها' },
  { prefix: '#', icon: '🎥', name: '• New · Video', desc: 'أحدث الفيديوهات والمقاطع الحماسية المضافة بقناتنا' },
  { prefix: '#', icon: '⚖️', name: '• Rules', desc: 'قوانين السيرفر الأساسية لتجنب المشاكل' },
  { prefix: '#', icon: '📰', name: '• News', desc: 'أحدث الأخبار والتحديثات الرسمية أول بأول', important: true },
  { prefix: '#', icon: '🏆', name: '• Tournaments', desc: 'التسجيل في أقوى البطولات والفعاليات الحماسية', important: true },
  { prefix: '#', icon: '💬', name: '• General · Chat', desc: 'المقر العام للدردشة والسوالف والتفاعل اليومي' },
  { prefix: '#', icon: '🦁', name: '• Master · Proof', desc: 'شاركنا إثبات وصولك لرتبة الماستر في اللعبة' },
  { prefix: '#', icon: '👋', name: '• Welcome', desc: 'هنا نرحب بالأعضاء الجدد المنضمين لعالمنا' },
  { prefix: '#', icon: '🎉', name: '• Tournam · Upda...', desc: 'متابعة وتحديثات نتائج مواجهات وجولات البطولات' },
  { prefix: '#', icon: '📝', name: '• Regist', desc: 'التسجيل الرسمي في فعاليات وبطولات السيرفر القادمة' },
  { prefix: '#', icon: '🎟️', name: '• Ticket', desc: 'فتح تذكرة للتواصل مع الإدارة وحل المشاكل' },
  { prefix: '#', icon: '🔮', name: '• Boost', desc: 'مساحة شكر خاصة لأساطير الدعم ومطوري السيرفر' },
];

// ── Floating particles ──
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 1024,
  y: Math.random() * 450,
  size: 1 + Math.random() * 1.5,
  dur: 5 + Math.random() * 5,
  delay: Math.random() * 6,
}));

function Particle({ x, y, size, dur, delay }: (typeof PARTICLES)[0]) {
  return (
    <div
      className="server-particle"
      style={{
        position: 'absolute', left: `${x}px`, top: `${y}px`,
        width: `${size}px`, height: `${size}px`,
        background: 'hsl(183,85%,55%)',
        borderRadius: '50%', zIndex: 2,
        '--delay': `${delay}s`,
        '--dur': `${dur}s`,
        '--particle-opacity': '0.5',
        '--particle-size': '-30px',
      } as React.CSSProperties}
    />
  );
}

// ── Glass channel card ──
function ChannelCard({ ch, delay }: { ch: (typeof ALL_CHANNELS)[0]; delay: number }) {
  const accentColor = ch.important ? 'hsl(183,70%,55%)' :
    ch.prefix === '🔊' ? 'hsl(183,80%,50%)' :
    ch.prefix === '📢' ? 'hsl(260,60%,65%)' :
    ch.prefix === '💬' ? 'hsl(210,60%,60%)' :
    'hsl(183,40%,45%)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '7px 14px',
        borderRadius: '6px',
        background: ch.important
          ? 'linear-gradient(135deg, hsla(183,50%,30%,0.08) 0%, hsla(183,40%,20%,0.04) 100%)'
          : 'hsla(0,0%,100%,0.02)',
        border: `1px solid ${ch.important ? 'hsla(183,50%,40%,0.12)' : 'hsla(0,0%,100%,0.03)'}`,
        overflow: 'hidden',
        transition: 'background 0.2s, border-color 0.2s',
      }}
      whileHover={{
        backgroundColor: 'hsla(183,50%,30%,0.12)',
        borderColor: 'hsla(183,50%,40%,0.25)',
      }}
    >
      <span style={{
        width: '4px', height: '4px', borderRadius: '50%',
        background: accentColor,
        boxShadow: `0 0 6px ${accentColor}`,
        flexShrink: 0,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span style={{ fontSize: '13px', lineHeight: 1 }}>{ch.icon}</span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px', fontWeight: 700,
          color: ch.important ? 'hsl(183,60%,75%)' : 'hsl(0,0%,75%)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}>{ch.name}</span>
      </div>
      <span style={{
        fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif",
        fontSize: '13px', fontWeight: 600, lineHeight: 1.4,
        color: 'hsl(0,0%,82%)',
        direction: 'rtl', textAlign: 'right',
        wordBreak: 'break-word',
        flex: 1, minWidth: 0,
      }}>{ch.desc}</span>
    </motion.div>
  );
}

// ── Inner banner ──
function YGOServerBannerInner() {
  const [charReady, setCharReady] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setCharReady(true);
    img.src = '/ygo-server-char.png';
  }, []);

  const pageSize = 8;
  const pages = useMemo(() => {
    const result: (typeof ALL_CHANNELS)[] = [];
    for (let i = 0; i < ALL_CHANNELS.length; i += pageSize) {
      result.push(ALL_CHANNELS.slice(i, i + pageSize));
    }
    return result;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(p => (p + 1) % pages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [pages.length]);

  const currentPage = pages[page];

  return (
    <div
      data-testid="ygo-server-banner"
      className="relative overflow-hidden"
      style={{
        width: '1024px',
        height: '450px',
        background: 'linear-gradient(160deg, #07050d 0%, #0b0816 35%, #090610 65%, #07050d 100%)',
        borderRadius: '12px',
        boxShadow: [
          '0 0 0 1px hsl(183,40%,10%)',
          '0 0 50px 6px hsla(183,50%,15%,0.06)',
          '0 30px 80px -10px rgba(0,0,0,0.95)',
        ].join(','),
      }}
    >
      {/* ── Subtle rotating circles ── */}
      <div className="ring-spin absolute pointer-events-none" style={{
        left: '180px', top: '50%',
        width: '500px', height: '500px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '1px solid hsla(183,50%,40%,0.04)',
        zIndex: 1,
        animationDuration: '80s',
      }} />

      {/* ── Ambient glow — left ── */}
      <div className="absolute pointer-events-none" style={{
        left: '5%', top: '-10%',
        width: '280px', height: '200px',
        background: 'radial-gradient(ellipse at 50% 50%, hsla(183,50%,25%,0.07) 0%, transparent 70%)',
        zIndex: 1,
      }} />
      {/* ── Ambient glow — right panel ── */}
      <div className="absolute pointer-events-none" style={{
        right: '5%', top: '10%',
        width: '500px', height: '300px',
        background: 'radial-gradient(ellipse at 50% 50%, hsla(183,40%,20%,0.05) 0%, transparent 70%)',
        zIndex: 1,
      }} />

      {PARTICLES.map(p => <Particle key={p.id} {...p} />)}

      {/* ── Border ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: '1px solid hsl(183,25%,10%)', borderRadius: '12px', zIndex: 20,
      }} />
      <div className="border-glow-pulse absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        height: '1px', width: '35%', zIndex: 25,
        background: 'linear-gradient(90deg, transparent, hsl(183,70%,45%), transparent)',
        animationDuration: '4s',
      }} />

      {/* ══════ CONTENT ══════ */}
      <div className="absolute inset-0 flex" style={{ zIndex: 10 }}>

        {/* ── LEFT PANEL — Hero Section ── */}
        <div style={{
          width: '320px', flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* Character — dominates the entire panel */}
          {charReady && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                position: 'absolute',
                top: '-50px', left: '-50px',
                width: 'calc(100% + 100px)', height: 'calc(100% + 120px)',
                zIndex: 1,
              }}
            >
              <img
                src="/ygo-server-char.png" alt=""
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                }}
              />
              {/* Cyan glow overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 30%, hsla(185,70%,45%,0.12) 0%, transparent 60%)',
                mixBlendMode: 'screen',
              }} />
            </motion.div>
          )}

          {/* Bottom gradient — fades character into text area */}
          <div className="absolute pointer-events-none" style={{
            inset: 0, zIndex: 2,
            background: 'linear-gradient(to top, #07050d 0%, #07050d 30%, hsla(7,5,8,0.7) 50%, transparent 70%)',
          }} />

          {/* Top edge fade — blends into banner edge */}
          <div className="absolute pointer-events-none" style={{
            top: 0, left: 0, right: 0, height: '60px', zIndex: 3,
            background: 'linear-gradient(to bottom, #07050d 0%, transparent 100%)',
          }} />

          {/* Text overlay — sits at bottom, in front of everything */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 5, textAlign: 'center',
            padding: '0 20px 28px 20px',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px', fontWeight: 600,
                color: 'hsl(183,55%,42%)',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px hsla(183,60%,40%,0.5)',
                marginBottom: '4px',
              }}
            >
              SERVER CHANNELS
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', bounce: 0.15 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '38px', fontWeight: 800,
                color: 'hsl(183,80%,72%)',
                textShadow: '0 0 25px hsla(183,60%,40%,0.5), 0 0 50px hsla(185,50%,30%,0.2), 0 2px 8px rgba(0,0,0,0.9)',
                letterSpacing: '5px', lineHeight: 1.05,
              }}
            >
              DUELIST<br />LEGACY
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '5px', marginTop: '8px', transformOrigin: 'center',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, hsl(183,55%,35%))' }} />
              <div style={{ width: '4px', height: '4px', background: 'hsl(183,65%,50%)', transform: 'rotate(45deg)', boxShadow: '0 0 6px hsl(183,50%,40%)' }} />
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(270deg, transparent, hsl(183,55%,35%))' }} />
            </motion.div>

            {/* Channel count + stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '8px' }}
            >
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '7px', color: 'hsl(183,38%,30%)',
                letterSpacing: '0.1em',
              }}>
                {ALL_CHANNELS.length} CHANNELS
              </span>
              <span style={{ width: '1px', height: '10px', background: 'hsl(183,30%,20%)' }} />
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { label: 'TEXT', val: '24' },
                  { label: 'VOICE', val: '6' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '12px', fontWeight: 700,
                      color: 'hsl(183,65%,55%)',
                      textShadow: '0 0 6px hsla(183,50%,40%,0.3)',
                    }}>{s.val}</span>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '6px', fontWeight: 500,
                      color: 'hsl(183,28%,28%)',
                      letterSpacing: '0.1em',
                    }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── VERTICAL DIVIDER ── */}
        <div style={{
          width: '1px', flexShrink: 0,
          background: 'linear-gradient(180deg, transparent 5%, hsl(183,30%,15%) 30%, hsl(183,30%,15%) 70%, transparent 95%)',
          alignSelf: 'stretch',
          marginTop: '30px', marginBottom: '30px',
        }} />

        {/* ── RIGHT PANEL — Dashboard ── */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px 28px 16px 24px',
          position: 'relative',
        }}>

          {/* Panel header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'hsl(183,70%,50%)',
              boxShadow: '0 0 8px hsl(183,60%,40%)',
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px', fontWeight: 600,
              color: 'hsl(183,40%,35%)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              CHANNEL OVERVIEW
            </span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, hsla(183,30%,20%,0.3), transparent)' }} />
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '7px', color: 'hsl(183,30%,25%)',
            }}>
              PAGE {page + 1}/{pages.length}
            </span>
          </div>

          {/* Channel grid */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  alignItems: 'start',
                  gap: '4px 16px',
                }}
              >
                {currentPage.map((ch, i) => (
                  <ChannelCard key={`${page}-${i}`} ch={ch} delay={i * 0.04} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom pagination — inline with content */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '5px', marginTop: '10px',
          }}>
            {pages.map((_, i) => (
              <motion.div
                key={i}
                style={{
                  width: i === page ? '20px' : '5px',
                  height: '3px',
                  borderRadius: '2px',
                  background: i === page ? 'hsl(183,65%,50%)' : 'hsl(0,0%,20%)',
                  boxShadow: i === page ? '0 0 8px hsla(183,60%,40%,0.5)' : 'none',
                }}
                animate={{
                  width: i === page ? 20 : 5,
                  opacity: i === page ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Exported wrapper with replay ──
export default function YGOServerBanner() {
  const [animKey, setAnimKey] = useState(0);
  const replay = useCallback(() => setAnimKey(k => k + 1), []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5"
      style={{ background: 'transparent' }}>
      <YGOServerBannerInner key={animKey} />
      <button
        onClick={replay}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'hsl(183,60%,50%)',
          background: 'hsl(0,0%,8%)',
          border: '1px solid hsl(183,30%,18%)',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'hsl(183,50%,35%)';
          e.currentTarget.style.color = 'hsl(183,80%,75%)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'hsl(183,30%,18%)';
          e.currentTarget.style.color = 'hsl(183,60%,50%)';
        }}
      >
        {'> REPLAY'}
      </button>
    </div>
  );
}
