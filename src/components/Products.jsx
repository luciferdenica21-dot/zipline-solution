import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

/* Characteristics carousel — one spec per slide, like the spec carousel in the about section */
function SpecsCarousel({ specs, isEn }) {
  const count = specs.length
  const [pos, setPos] = useState(0)
  const touchX = useRef(null)

  const go = (d) => setPos((p) => (p + d + count) % count)
  const item = specs[pos]

  const arrowBase = 'absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-white/85 hover:bg-white/[0.16] hover:border-white/50 backdrop-blur-sm transition-all w-9 h-9 sm:w-10 sm:h-10'

  return (
    <div
      className="relative w-full select-none"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (dx < -45) go(1)
        else if (dx > 45) go(-1)
      }}
    >
      <button onClick={() => go(-1)} aria-label={isEn ? 'Previous spec' : 'Предыдущая характеристика'} className={`${arrowBase} left-0`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={() => go(1)} aria-label={isEn ? 'Next spec' : 'Следующая характеристика'} className={`${arrowBase} right-0`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div key={pos} className="spec-fade px-10 sm:px-12 lg:px-14 text-center">
        <span className={`prod-spec-key block font-display text-[14px] sm:text-[15.5px] tracking-[0.16em] text-white ${isEn ? '' : 'tracking-[0.14em]'}`}>
          {(item.key || '').replace(/\s*:\s*$/, '')}
        </span>
        <p className="prod-spec-value mt-2 text-[13.5px] sm:text-[15.5px] leading-[1.6] text-white/65">
          {item.value}
        </p>
      </div>

      <style>{`
        @keyframes specFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spec-fade { animation: specFade 0.4s cubic-bezier(0.33,1,0.68,1); }
      `}</style>
    </div>
  )
}

/* Infinite carousel: seamless translate3d loop, arrows, drag/swipe */
function PhotoCarousel({ images, alt, isEn, imgTransform, dark }) {
  const count = images.length
  // Track = [cloneLast, ...images, cloneFirst] → seamless wrap on indices 1..count
  const [pos, setPos] = useState(1) // real index, 1-based into extended track
  const [animate, setAnimate] = useState(true)
  const [zoom, setZoom] = useState(false)
  const [zoomIdx, setZoomIdx] = useState(0)
  // Natural aspect ratio per photo — on mobile the carousel takes the shape of the current photo
  const [ratios, setRatios] = useState({})
  const currentIdx = ((pos - 1) % count + count) % count
  const currentRatio = ratios[images[currentIdx]] || 4 / 3
  const movedRef = useRef(false)
  const drag = useRefState()

  const openZoom = (realIdx) => {
    setZoomIdx(realIdx)
    setZoom(true)
  }

  const goTo = (i) => {
    setAnimate(true)
    setPos(i)
  }

  const next = () => goTo((pos % count) + 1)
  const prev = () => goTo(((pos - 2 + count) % count) + 1)

  // Keyboard + body scroll lock while zoomed
  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(false)
      else if (e.key === 'ArrowRight') setZoomIdx((z) => (z + 1) % count)
      else if (e.key === 'ArrowLeft') setZoomIdx((z) => (z - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom, count])

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

  const dragging = drag.isDragging
  const dragPx = drag.dx

  return (
    <div
      className="group/car car-shape relative flex w-full select-none flex-col lg:absolute lg:inset-0"
      style={{ '--car-ratio': currentRatio, touchAction: 'pan-y' }}
      onMouseLeave={() => drag.end()}
      onPointerDown={(e) => drag.start(e.clientX)}
      onPointerMove={(e) => drag.move(e.clientX)}
      onPointerUp={() => {
        const shift = drag.dx
        movedRef.current = Math.abs(shift) > 8
        drag.drop()
        if (shift < -50) next()
        else if (shift > 50) prev()
      }}
      onPointerLeave={() => drag.end()}
    >
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div
          className="flex h-full"
          style={{
            transform: `translate3d(calc(${-pos * 100}% + ${dragPx}px), 0, 0)`,
            transition: animate && !dragging ? 'transform 0.5s cubic-bezier(0.33,1,0.68,1)' : 'none',
          }}
        >
          {[images[count - 1], ...images, images[0]].map((src, i) => (
            <div
              key={i}
              className="w-full shrink-0 h-full flex items-center justify-center overflow-hidden cursor-zoom-in p-2 sm:p-3"
              onClick={() => {
                if (movedRef.current) return
                openZoom(((i - 1) % count + count) % count)
              }}
            >
              <img
                src={src}
                alt={i === pos ? alt : ''}
                draggable="false"
                loading={i === 1 ? 'eager' : 'lazy'}
                className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none"
                style={{ borderRadius: '10%', ...(imgTransform ? { transform: imgTransform } : {}) }}
                onLoad={(e) => {
                  const el = e.target
                  const key = el.getAttribute('src')
                  if (!el.naturalWidth || !el.naturalHeight) return
                  const ratio = el.naturalWidth / el.naturalHeight
                  setRatios((r) => (r[key] ? r : { ...r, [key]: ratio }))
                }}
                onError={(e) => {
                  e.target.style.visibility = 'hidden'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows (only when there is more than one photo) */}
      {count > 1 && (
        <>
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
        </>
      )}

      {/* Zoomed lightbox: photo at full size, arrows, close, keyboard nav */}
      {zoom &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setZoom(false)}
          >
            <img
              src={images[zoomIdx]}
              alt={`${alt} ${zoomIdx + 1}`}
              draggable="false"
              className="max-w-[94vw] max-h-[88vh] object-contain select-none shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setZoom(false)
              }}
              aria-label={isEn ? 'Close' : 'Закрыть'}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full border border-white/25 bg-black/60 text-white/85 hover:bg-black/90 hover:border-white/50 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {count > 1 && (
              <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setZoomIdx((z) => (z - 1 + count) % count)
              }}
              aria-label={isEn ? 'Previous photo' : 'Предыдущее фото'}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/25 bg-black/60 text-white/85 hover:bg-black/90 hover:border-white/50 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setZoomIdx((z) => (z + 1) % count)
              }}
              aria-label={isEn ? 'Next photo' : 'Следующее фото'}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/25 bg-black/60 text-white/85 hover:bg-black/90 hover:border-white/50 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
              </>
            )}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-white/75 text-sm tracking-wide backdrop-blur-sm">
              {zoomIdx + 1} / {count}
            </div>
          </div>,
          document.body
        )}

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
      .prod-grid { display: grid; gap: 1.25rem; grid-template-areas: "head" "car" "specs"; }
      /* Mobile: the photo block takes the shape of the current photo (no empty bands above/below) */
      @media (max-width: 1023px) { .car-shape { aspect-ratio: var(--car-ratio, 4 / 3); } }
      .prod-head { grid-area: head; }
      .prod-car { grid-area: car; }
      .prod-specs { grid-area: specs; }
      @media (min-width: 1024px) {
        .prod-grid { gap: clamp(8px, 1.2vh, 22px); grid-template-columns: 1fr 1fr; min-height: min(66vh, 600px); }
        .prod-grid.dir-normal { grid-template-areas: "head car" "specs car"; }
        .prod-grid.dir-reverse { grid-template-columns: 1fr 1fr; grid-template-areas: "car head" "car specs"; }
        .prod-head { padding-left: clamp(8px, 1.1vw, 18px); padding-right: clamp(8px, 1.1vw, 18px); }
        .prod-specs { padding-left: clamp(8px, 1.1vw, 18px); padding-right: clamp(8px, 1.1vw, 18px); }
        .prod-head .prod-title { font-size: clamp(20px, 2.6vh + 0.4vw, 33px); margin-bottom: clamp(6px, 1vh, 12px); }
        .prod-head .prod-desc { font-size: clamp(15px, 1.8vh + 0.15vw, 17.5px); line-height: 1.7; margin-bottom: clamp(8px, 1.2vh, 18px); }
        .prod-specs .prod-spec-key { font-size: clamp(12.5px, 1.7vh, 15px); }
        .prod-specs .prod-spec-value { font-size: clamp(12.5px, 1.55vh, 14px); line-height: 1.55; }
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
      images: ['/kreslofive.jpg'],
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
      images: ['/magnet2.jpg'],
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
      images: ['/shmell3.jpg'],
      imgTransform: 'scale(1.2)',
      dark: true,
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
      className="relative w-full overflow-hidden py-12 lg:pt-14 lg:pb-24"
    >
      {/* Background photo (replace /products.jpg to change it) with a dark scrim for readability */}
      <div aria-hidden className="absolute inset-0">
        <img src="/products.jpg" alt="" className="w-full h-full object-cover object-center" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-black/70"></div>
      {/* Soft blurred seam after the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-black via-black/55 to-transparent"
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
        }}
      ></div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — centered, sized to leave room for a full card on screen */}
        <div className="max-w-4xl mx-auto mb-8 px-5 sm:px-7 lg:px-0 text-center lg:mb-16">
          <h2 className={`${titleCls} leading-[1.15] text-[27px] sm:text-[clamp(26px,3.1vh+0.62vw,46px)] text-white`}>
            {t('products.title')}
          </h2>
          <p className="text-[14px] sm:text-[clamp(14.5px,1.7vh,17px)] leading-[1.6] text-white/55 mt-2 sm:mt-3">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products: text on one side, framed carousel on the other; sides alternate */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-16">
          <div aria-hidden className="h-px w-full bg-orange-500 lg:hidden" />
          {products.map((product, idx) => {
            const carousel = (
              <div className="prod-car relative">
                <PhotoCarousel images={product.images} alt={product.title} isEn={isEn} imgTransform={product.imgTransform} dark={product.dark} />
              </div>
            )

            const contentHead = (
              <div className="prod-head relative flex flex-col justify-center">
                <h3 className={`prod-title px-10 sm:px-12 lg:px-14 mb-2 sm:mb-3 ${isEn ? 'heading-normal text-[21px] sm:text-[28.5px]' : 'font-display text-[23px] sm:text-[34px]'} leading-[1.25] text-center text-white lg:text-left`}>
                  {product.title}
                </h3>

                <p className='prod-desc px-10 sm:px-12 lg:px-14 text-[15.5px] sm:text-[19px] leading-[1.8] text-center text-white/75 lg:text-left'>
                  {product.description}
                </p>
              </div>
            )

            const contentSpecs = (
              <div className="prod-specs px-5 sm:px-7">
                <SpecsCarousel specs={product.characteristics} isEn={isEn} />
              </div>
            )

            return (
              <article
                key={product.id}
                id={`product-${product.id}`}
                className="group relative scroll-mt-24 rounded-3xl overflow-hidden"
                style={highlighted === product.id ? { animation: 'productFlash 2.2s ease-out' } : undefined}
              >
                <div className={`prod-grid ${idx % 2 === 1 ? 'dir-reverse' : 'dir-normal'} relative p-5 sm:p-7 lg:p-[clamp(14px,1.8vh,30px)]`}>
                  {contentHead}
                  {carousel}
                  {contentSpecs}
                </div>
              </article>
            )
          })}
          <div aria-hidden className="h-px w-full bg-orange-500 lg:hidden" />
        </div>
      </div>
    </section>
  )
}
