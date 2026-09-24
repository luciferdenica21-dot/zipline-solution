import { useEffect, useState } from 'react'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const [offset, setOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] md:min-h-screen w-full flex items-center pt-28 pb-20"
    >
      {/* Clip wrapper to prevent video overflow */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center 15%' : 'center center',
            opacity: 0.85,
          }}
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60"></div>
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

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow — cleaned: NO fluff (removed) */}

          {/* H1 — compact scaled */}
          <h1 className="animate-fade-up font-display tracking-[-0.02em] leading-[1.15] text-[7.5vw] sm:text-[5.5vw] md:text-[4.5vw] lg:text-[52px] xl:text-[62px] mb-10 sm:mb-14">
            <span className="block text-white">Инженерия</span>
            <span className="block text-white">Экстремальных Парков:</span>
            <span className="block text-white">
              От концепта до
            </span>
            <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              собственного снаряжения
            </span>
          </h1>

          <p className="animate-fade-up text-[15.5px] sm:text-[17px] md:text-[18px] leading-[1.75] text-white/70 max-w-2xl">
            Проектирование высотных аттракционов, разработка кастомных узлов и
            кареток. Повышение пропускной способности зиплайнов и снижение
            операционных расходов.
          </p>
        </div>
      </div>
    </section>
  )
}
