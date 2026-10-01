import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/* Infinite carousel: seamless translate3d loop, autoplay, arrows, dots, drag/swipe */
function PhotoCarousel({ images, alt, isEn, imgTransform, dark }) {
  const count = images.length
  // Track = [cloneLast, ...images, cloneFirst] → seamless wrap on indices 1..count
  const [pos, setPos] = useState(1) // real index, 1-based into extended track
  const [animate, setAnimate] = useState(true)
  const [hovered, setHovered] = useState(false)
  const drag = useRefState()

  const goTo = (i) => {
    setAnimate(true)
    setPos(i)
  }

  const next = () => goTo((pos % count) + 1)
  const prev = () => goTo(((pos - 2 + count) % count) + 1)

  // Autoplay
  useEffect(() => {
    if (hovered) return
    const t = setInterval(() => {
      setAnimate(true)
      setPos((p) => (p % count) + 1)
    }, 3500)
    return () => clearInterval(t)
  }, [hovered, count])

  // Seamless snap back after showing the cloned edge slide
  useEffect(() => {
    if (pos === count + 1) {
      const t = setTimeout(() => {
        setAnimate(false)
        setPos(1)
      }, 520)
      return () => clearTimeout(t)
    }
    if (pos === 0) {
      const t = setTimeout(() => {
        setAnimate(false)
        setPos(count)
      }, 520)
      return () => clearTimeout(t)
    }
  }, [pos, count])

  const idx = ((pos - 1) % count + count) % count
  const dragging = drag.isDragging
  const dragPx = drag.dx

  return (
    <div
      className="group/car relative flex w-full select-none flex-col h-[44vh] min-h-[260px] lg:h-auto lg:absolute lg:inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        drag.end()
      }}
      onPointerDown={(e) => drag.start(e.clientX)}
      onPointerMove={(e) => drag.move(e.clientX)}
      onPointerUp={() => {
        const shift = drag.dx
        drag.drop()
        if (shift < -50) next()
        else if (shift > 50) prev()
      }}
      onPointerLeave={() => drag.end()}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Frame: thin double border in the reference style */}
      <div className="absolute -inset-[10px] sm:-inset-3 lg:-inset-4 border border-white/25 pointer-events-none"></div>
      <div className="absolute -inset-[3px] sm:-inset-1.5 border border-white/10 pointer-events-none"></div>

      <div
        className="relative flex-1 min-h-0 overflow-hidden"
        style={{
          background: dark ? '#0a0a0a' : 'linear-gradient(170deg, #ffffff 0%, #f3f9f4 55%, #e2f1e7 100%)',
          borderRadius: '0 clamp(20px, 2.6vw, 34px) 0 clamp(20px, 2.6vw, 34px)',
        }}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translate3d(calc(${-pos * 100}% + ${dragPx}px), 0, 0)`,
            transition: animate && !dragging ? 'transform 0.5s cubic-bezier(0.33,1,0.68,1)' : 'none',
          }}
        >
          {[images[count - 1], ...images, images[0]].map((src, i) => (
            <div key={i} className="w-full shrink-0 h-full flex items-center justify-center">
              <img
                src={src}
                alt={i === pos ? alt : ''}
                draggable="false"
                loading={i === 1 ? 'eager' : 'lazy'}
                className="max-h-full max-w-full w-auto object-contain pointer-events-none"
                style={imgTransform ? { transform: imgTransform } : undefined}
                onError={(e) => {
                  e.target.style.visibility = 'hidden'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label={isEn ? 'Previous photo' : 'Предыдущее фото'}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border transition-all backdrop-blur-sm ${dark ? 'bg-black/55 border-white/20 text-white/85 hover:bg-black/80 hover:border-white/45' : 'bg-white/70 border-black/10 text-neutral-800 shadow-sm hover:bg-white hover:border-black/25'} ${dragging ? 'opacity-100' : 'opacity-0 group-hover/car:opacity-100'}`}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label={isEn ? 'Next photo' : 'Следующее фото'}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border transition-all backdrop-blur-sm ${dark ? 'bg-black/55 border-white/20 text-white/85 hover:bg-black/80 hover:border-white/45' : 'bg-white/70 border-black/10 text-neutral-800 shadow-sm hover:bg-white hover:border-black/25'} ${dragging ? 'opacity-100' : 'opacity-0 group-hover/car:opacity-100'}`}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              goTo(i + 1)
            }}
            aria-label={`${isEn ? 'Photo' : 'Фото'} ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-orange-500' : dark ? 'w-1.5 bg-white/35 hover:bg-white/60' : 'w-1.5 bg-black/25 hover:bg-black/45'}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

/* Small hook: pointer-drag state for the carousel */
function useRefState() {
  const [state, setState] = useState({ isDragging: false, startX: 0, dx: 0 })
  return {
    get isDragging() {
      return state.isDragging
    },
    get dx() {
      return state.dx
    },
    start: (x) => setState({ isDragging: true, startX: x, dx: 0 }),
    move: (x) =>
      setState((s) => (s.isDragging ? { ...s, dx: x - s.startX } : s)),
    drop: () => setState((s) => ({ ...s, isDragging: false, dx: 0 })),
    end: () => setState((s) => (s.isDragging || s.dx ? { ...s, isDragging: false, dx: 0 } : s)),
  }
}

export default function Products() {
  const { t, i18n } = useTranslation()
  const [highlighted, setHighlighted] = useState(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes productFlash {
        0% { box-shadow: 0 0 0 0 rgba(255,122,26,0); }
        25% { box-shadow: 0 0 0 2px rgba(255,122,26,0.55); }
        100% { box-shadow: 0 0 0 0 rgba(255,122,26,0); }
      }
      /* Product card layout: mobile = head / carousel / specs; desktop = text column + carousel column.
         Sizes scale with viewport height so a card + section header always fit one screen on desktop. */
      .prod-grid { display: grid; gap: 2.5rem; grid-template-areas: "head" "car" "specs"; }
      .prod-head { grid-area: head; }
      .prod-car { grid-area: car; }
      .prod-specs { grid-area: specs; }
      @media (min-width: 1024px) {
        .prod-grid { gap: clamp(16px, 2.4vh, 44px); grid-template-columns: 1fr 1fr; }
        .prod-grid.dir-normal { grid-template-areas: "head car" "specs car"; }
        .prod-grid.dir-reverse { grid-template-areas: "car head" "car specs"; }
        .prod-head > div { border-left-width: 1px; padding-left: clamp(18px, 2.6vh, 28px); }
        .prod-head .prod-tag { margin-bottom: clamp(10px, 1.6vh, 20px); }
        .prod-head .prod-title { font-size: clamp(17px, 2.2vh + 0.35vw, 28px); margin-bottom: clamp(12px, 1.8vh, 20px); }
        .prod-head .prod-desc { font-size: clamp(12.5px, 1.5vh + 0.1vw, 14.5px); line-height: 1.7; margin-bottom: clamp(14px, 2.2vh, 32px); }
        .prod-specs .prod-divider { margin-bottom: clamp(14px, 2vh, 24px); }
        .prod-specs .prod-specs-grid { gap: clamp(10px, 1.5vh, 16px) clamp(20px, 2.4vw, 32px); }
        .prod-specs .prod-spec-key { font-size: clamp(8px, 1.05vh, 10px); }
        .prod-specs .prod-spec-value { font-size: clamp(10.5px, 1.3vh, 12px); line-height: 1.55; }
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  useEffect(() => {
    if (!highlighted) return
    const timer = setTimeout(() => setHighlighted(null), 2200)
    return () => clearTimeout(timer)
  }, [highlighted])

  // Expose for header navigation
  useEffect(() => {
    window.__scrollToProduct = (id) => {
      const el = document.getElementById(`product-${id}`)
      if (!el) return false
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
      setHighlighted(id)
      return true
    }
    return () => {
      delete window.__scrollToProduct
    }
  }, [])

  const isEn = i18n.language === 'en'
  const titleCls = isEn ? 'heading-normal' : 'font-display tracking-[-0.01em]'

  const products = [
    {
      id: 'chair',
      images: ['/kreslo.png', '/kreslo2.png', '/kreslo3.png'],
      imgTransform: 'scale(1.25) translateY(-5%)',
      glow: 'radial-gradient(ellipse at 80% 12%, rgba(255,122,26,0.11), transparent 55%), radial-gradient(ellipse at 8% 92%, rgba(255,122,26,0.05), transparent 50%)',
      title: t('products.chair.title'),
      tag: t('products.chair.tag'),
      description: t('products.chair.description'),
      characteristics: [
        { key: t('products.chair.details.purpose_label'), value: t('products.chair.details.purpose') },
        { key: t('products.chair.details.seat_label'), value: t('products.chair.details.seat') },
        { key: t('products.chair.details.suspension_label'), value: t('products.chair.details.suspension') },
        { key: t('products.chair.details.loads_label'), value: t('products.chair.details.loads') },
        { key: t('products.chair.details.safety_label'), value: t('products.chair.details.safety') },
        { key: t('products.chair.details.efficiency_label'), value: t('products.chair.details.efficiency') },
      ],
    },
    {
      id: 'magnet',
      images: ['/magnit.png', '/magnit2.png', '/magnit3.png'],
      glow: 'radial-gradient(ellipse at 15% 12%, rgba(46,229,114,0.10), transparent 55%), radial-gradient(ellipse at 92% 92%, rgba(46,229,114,0.05), transparent 50%)',
      title: t('products.magnet.title'),
      tag: t('products.magnet.tag'),
      description: t('products.magnet.description'),
      characteristics: [
        { key: t('products.magnet.details.speed_label'), value: t('products.magnet.details.speed') },
        { key: t('products.magnet.details.magnetic_label'), value: t('products.magnet.details.magnetic') },
        { key: t('products.magnet.details.materials_label'), value: t('products.magnet.details.materials') },
        { key: t('products.magnet.details.durability_label'), value: t('products.magnet.details.durability') },
        { key: t('products.magnet.details.usage_label'), value: t('products.magnet.details.usage') },
      ],
    },
    {
      id: 'shmel',
      images: ['/shmel.png', '/shmel2.png'],
      dark: true,
      glow: 'radial-gradient(ellipse at 80% 12%, rgba(96,165,250,0.11), transparent 55%), radial-gradient(ellipse at 8% 92%, rgba(96,165,250,0.05), transparent 50%)',
      title: t('products.shmel.title'),
      tag: t('products.shmel.tag'),
      description: t('products.shmel.description'),
      characteristics: [
        { key: t('products.shmel.details.mechanics_label'), value: t('products.shmel.details.mechanics') },
        { key: t('products.shmel.details.control_label'), value: t('products.shmel.details.control') },
        { key: t('products.shmel.details.autonomy_label'), value: t('products.shmel.details.autonomy') },
        { key: t('products.shmel.details.safety_label'), value: t('products.shmel.details.safety') },
        { key: t('products.shmel.details.applications_label'), value: t('products.shmel.details.applications') },
      ],
    },
  ]

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden py-12 lg:py-14"
    >
      {/* Background: solid black across the whole section */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 section-grid-bg mask-fade-v opacity-40"></div>
      <div
        className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF7A1A 0%, transparent 65%)' }}
      ></div>
      <div
        className="absolute -left-40 bottom-0 w-[520px] h-[520px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2EE572 0%, transparent 70%)' }}
      ></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — centered, sized to leave room for a full card on screen */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className={`${titleCls} leading-[1.15] text-[clamp(22px,3vh+0.6vw,40px)] text-white`}>
            {t('products.title')}
          </h2>
          <p className="text-[clamp(12px,1.5vh,15px)] leading-[1.65] text-white/55 mt-2 sm:mt-3">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products: text on one side, framed carousel on the other; sides alternate */}
        <div className="flex flex-col gap-14 sm:gap-16 lg:gap-16">
          {products.map((product, idx) => {
            const carousel = (
              <div className="prod-car relative">
                <PhotoCarousel images={product.images} alt={product.title} isEn={isEn} imgTransform={product.imgTransform} dark={product.dark} />
              </div>
            )

            const contentHead = (
              <div className="prod-head relative flex flex-col justify-center lg:pl-10">
                {/* Reference-style text block: thin vertical line + eyebrow */}
                <div className="border-l border-white/25 pl-5 sm:pl-7">
                  <div className="flex items-center gap-3 prod-tag mb-4">
                    <span className={`text-[10px] font-mono tracking-[0.24em] uppercase text-white/45 ${isEn ? '' : 'font-display tracking-[0.2em]'}`}>
                      {product.tag}
                    </span>
                  </div>

                  <h3 className={`prod-title ${isEn ? 'heading-normal text-[18px] sm:text-[22px]' : 'font-display text-[20px] sm:text-[26px]'} leading-[1.25] text-white mb-4`}>
                    {product.title}
                  </h3>

                  <p className={`prod-desc text-[13.5px] sm:text-[14.5px] leading-[1.8] text-white/65 mb-6 max-w-xl`}>
                    {product.description}
                  </p>
                </div>
              </div>
            )

            const contentSpecs = (
              <div className="prod-specs lg:pl-10">
                <div className="lg:pl-7">
                  <div className="prod-divider h-px w-full bg-gradient-to-r from-white/[0.14] to-transparent mb-5"></div>
                  <div className="prod-specs-grid grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {product.characteristics.map((char, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className={`prod-spec-key text-[9px] font-mono tracking-[0.16em] uppercase text-orange-400/80 ${isEn ? '' : 'font-display tracking-[0.14em]'}`}>
                          {char.key}
                        </span>
                        <span className="prod-spec-value text-[11.5px] sm:text-[12px] leading-[1.6] text-white/65">
                          {char.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )

            return (
              <article
                key={product.id}
                id={`product-${product.id}`}
                className="group relative scroll-mt-24 rounded-3xl border border-white/[0.07] bg-white/[0.015] overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0) 55%), ${product.glow}`,
                  ...(highlighted === product.id ? { animation: 'productFlash 2.2s ease-out' } : {}),
                }}
              >
                <div className={`prod-grid ${idx % 2 === 1 ? 'dir-reverse' : 'dir-normal'} relative p-5 sm:p-7 lg:p-[clamp(18px,2.6vh,44px)]`}>
                  {contentHead}
                  {carousel}
                  {contentSpecs}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
