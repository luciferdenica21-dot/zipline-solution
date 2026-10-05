import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const { t } = useTranslation()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center overflow-hidden"
    >
      {/* Background video (all screens), slightly darkened */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.8 }}
        >
          <source src="/intro_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80"></div>
        <div
          className="absolute inset-0 section-grid-bg mask-fade-v opacity-50"
          style={{ transform: `translateY(${offset * 0.06}px)` }}
        ></div>
        <div
          className="absolute -left-24 top-24 w-[520px] h-[520px] rounded-full opacity-[0.14] blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 40%, #FF7A1A 0%, transparent 65%)',
            transform: `translate(${offset * 0.05}px, ${-offset * 0.03}px)`,
          }}
        ></div>
        <div
          className="absolute right-[-10%] bottom-[-18%] w-[480px] h-[480px] rounded-full opacity-[0.1] blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 60% 60%, #2EE572 0%, transparent 70%)',
            transform: `translate(${-offset * 0.04}px, ${offset * 0.04}px)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full">
          <div className="content-indent max-w-4xl">
            <h1 className="animate-fade-up font-display uppercase tracking-[-0.02em] leading-[1.15] text-[8.4vw] sm:text-[7.15vw] md:text-[4.15vw] lg:text-[49px] xl:text-[57px] mb-8 sm:mb-10">
              <span className="block text-white">{t('hero.line1')}</span>
              <span className="block text-white">{t('hero.line2')}</span>
              <span className="block text-white">
                {t('hero.line3')}
              </span>
              <span className="font-outline block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                {t('hero.line4')}
              </span>
            </h1>

            <p className="animate-fade-up text-[20px] sm:text-[22px] md:text-[23.5px] leading-[1.75] text-white/70 max-w-2xl">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
