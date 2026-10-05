import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const renderTitle = (title, language) => {
  return <span className={language === 'en' ? '' : 'font-display'}>{title}</span>
}

/* Carousel of the four spec cards (desktop panel + mobile) */
function SpecCarousel({ specs, isEn, desktop }) {
  const count = specs.length
  const [pos, setPos] = useState(0)
  const [hovered, setHovered] = useState(false)
  const touchX = useRef(null)

  useEffect(() => {
    if (hovered) return
    const t = setInterval(() => setPos((p) => (p + 1) % count), 5000)
    return () => clearInterval(t)
  }, [hovered, count])

  const go = (d) => setPos((p) => (p + d + count) % count)
  const s = specs[pos]

  const arrowBase = `absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border backdrop-blur-sm transition-all ${
    desktop ? 'w-11 h-11' : 'w-9 h-9 sm:w-10 sm:h-10'
  } border-white/25 bg-white/[0.06] text-white/85 hover:bg-white/[0.16] hover:border-white/50`

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
      <button
        onClick={() => go(-1)}
        aria-label={isEn ? 'Previous card' : 'Предыдущая карточка'}
        className={`${arrowBase} left-0`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => go(1)}
        aria-label={isEn ? 'Next card' : 'Следующая карточка'}
        className={`${arrowBase} right-0`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        key={pos}
        className="about-fade px-11 sm:px-14 lg:px-16"
        style={desktop ? undefined : { minHeight: '200px' }}
      >
        <h3
          className={`${isEn ? 'heading-normal' : 'font-display tracking-[-0.01em]'} leading-[1.18] text-white mb-3 text-[24px] sm:text-[clamp(21px,3.3vh,36px)]`}
        >
          {renderTitle(s.title, isEn ? 'en' : 'ru')}
        </h3>
        <p className={`${desktop ? 'text-[clamp(14px,1.9vh,17px)] leading-[1.6]' : 'text-[13.5px] leading-[1.6]'} text-white/65`}>
          {s.desc}
        </p>
      </div>

      <style>{`
        @keyframes aboutFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-fade { animation: aboutFade 0.45s cubic-bezier(0.33,1,0.68,1); }
      `}</style>
    </div>
  )
}

export default function About() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const specs = [
    {
      title: t('about.specs.traffic.title'),
      fact: t('about.specs.traffic.fact'),
      desc: t('about.specs.traffic.desc'),
    },
    {
      title: t('about.specs.opex.title'),
      fact: t('about.specs.opex.fact'),
      desc: t('about.specs.opex.desc'),
    },
    {
      title: t('about.specs.safety.title'),
      fact: t('about.specs.safety.fact'),
      desc: t('about.specs.safety.desc'),
    },
    {
      title: t('about.specs.rnd.title'),
      fact: t('about.specs.rnd.fact'),
      desc: t('about.specs.rnd.desc'),
    },
  ]

  return (
    <section id="about" className="relative w-full bg-black overflow-hidden">
      {/* Background photo (replace /aboutmebg.webp to change it) with a dark scrim for readability */}
      <div aria-hidden className="absolute inset-0">
        <img src="/aboutmebg.webp" alt="" width={1920} height={1200} loading="lazy" className="w-full h-full object-cover object-center" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-black/70"></div>
      {/* Soft blurred seam after the products section */}
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

      {/* ========== DESKTOP: photo+text left, spec carousel right, fits one screen ========== */}
      <div className="hidden lg:flex h-[calc(100vh-80px)] min-h-[620px] relative">
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex">
          {/* Left: photo + heading + description (wider than the carousel) */}
          <div className="w-[60%] flex items-center content-indent py-6">
            <div className="flex items-start gap-6 xl:gap-9 w-full">
              <img
                src="/about2.webp"
                alt="Василь Барановский"
                width={653}
                height={869}
                loading="lazy"
                className="h-[54vh] max-h-[580px] w-[38%] max-w-[340px] shrink-0 object-cover border border-white/15 shadow-2xl"
                style={{ borderRadius: '0 60px 0 60px' }}
              />
              <div className="flex-1 min-w-0">
                <p className="tracking-[0.22em] text-orange-400 mb-3 text-[clamp(17px,2.5vh,24px)]">
                  {t('about.name')}
                </p>
                <h2
                  className={`${isEn ? 'heading-normal' : 'font-display tracking-[-0.01em]'} leading-[1.15] text-white mb-4 text-[clamp(26px,3.6vh,40px)]`}
                >
                  {renderTitle(t('about.title'), i18n.language)}
                </h2>
                <p className="text-[clamp(13.5px,1.9vh,17px)] leading-[1.6] text-white mb-5">
                  {t('about.subtitle')}
                </p>
                <p className="text-[clamp(15.5px,2.2vh,19px)] leading-[1.7] text-white/65">
                  {t('about.bio')}
                </p>
              </div>
            </div>
          </div>

          {/* Right: carousel of the four spec cards */}
          <div className="w-[40%] relative flex items-stretch px-8 xl:px-12 py-8">
            <div className="w-full max-w-[720px] mx-auto">
              <SpecCarousel specs={specs} isEn={isEn} desktop />
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE: stacked, cards as a swipeable carousel ========== */}
      <div className="lg:hidden relative min-h-screen flex flex-col pt-24 pb-10">

        <div className="relative px-[calc(1rem+1.25rem)] sm:px-[calc(1.5rem+1.75rem)]">
          <img
            src="/about2.webp"
            alt="Василь Барановский"
            width={653}
            height={869}
            loading="lazy"
            className="w-full h-[38vh] object-cover border border-white/15 shadow-2xl"
            style={{ borderRadius: '0 60px 0 60px' }}
          />

          <div className="mt-6">
            <p className="tracking-[0.22em] text-orange-400 mb-2 text-[13px]">
              {t('about.name')}
            </p>
            <h2
              className={`${isEn ? 'heading-normal' : 'font-display tracking-[-0.01em]'} leading-[1.2] text-[23px] sm:text-[31px] text-white mb-2`}
            >
              {renderTitle(t('about.title'), i18n.language)}
            </h2>
            <p className="text-[12.5px] leading-[1.6] text-white mb-3">
              {t('about.subtitle')}
            </p>
            <p className="text-[14.5px] leading-[1.7] text-white/65">
              {t('about.bio')}
            </p>
          </div>

          {/* Spec cards carousel */}
          <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-4 py-6">
            <SpecCarousel specs={specs} isEn={isEn} />
          </div>
        </div>
      </div>
    </section>
  )
}
