import { useEffect, useState } from 'react'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HeroAbout() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-end overflow-hidden pt-32 pb-16 sm:pb-24"
    >
      {/* Parallax background layers */}
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translateY(${offset * 0.15}px) scale(1.08)` }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-45"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/30 to-ink-950"></div>
        <div
          className="absolute inset-0 section-grid-bg mask-fade-v opacity-60"
          style={{ transform: `translateY(${offset * 0.05}px)` }}
        ></div>
        {/* Accent diagonal light */}
        <div
          className="absolute -left-32 top-20 w-[680px] h-[680px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, #FF7A1A 0%, transparent 65%)',
            transform: `translate(${offset * 0.04}px, ${-offset * 0.02}px)`,
          }}
        ></div>
        <div
          className="absolute right-[-12%] bottom-[-18%] w-[620px] h-[620px] rounded-full opacity-[0.1] blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 60% 60%, #2EE572 0%, transparent 70%)',
            transform: `translate(${-offset * 0.03}px, ${offset * 0.03}px)`,
          }}
        ></div>
      </div>

      {/* Meta strip (top) */}
      <div className="hidden md:block absolute top-[96px] left-0 right-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="eyebrow text-white/50">
              Инжиниринг · Проектирование · R&amp;D · Гарантия
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-safety-500 animate-pulse"></span>
                <span className="eyebrow !text-white/55">Принимаю проекты Q4</span>
              </div>
              <span className="hidden xl:block eyebrow text-white/30">ENG · REF 01/26</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-7 sm:mb-10 animate-fade-in">
          <span className="chip !border-orange-500/30 !text-orange-400 !bg-orange-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            Principal engineer
          </span>
          <span className="chip">10+ лет на объектах</span>
          <span className="chip !border-safety-500/30 !text-safety-400 !bg-safety-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-safety-500"></span>
            EN 15567 / ГОСТ
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-up font-display tracking-[-0.02em] leading-[0.88] text-[15.5vw] sm:text-[13.5vw] md:text-[10.5vw] lg:text-[9.2vw] xl:text-[130px] mb-8 sm:mb-10">
          <span className="block text-white">Инженерия</span>
          <span className="block text-white">Экстремальных</span>
          <span className="block text-white">Парков:</span>
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 bg-clip-text text-transparent">
            От концепта до
          </span>
          <span className="block bg-gradient-to-r from-orange-500 to-safety-400 bg-clip-text text-transparent">
            собственного снаряжения
          </span>
        </h1>

        {/* About copy + CTAs */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="col-span-12 lg:col-span-7 animate-fade-up">
            <div className="glass rounded-2xl p-5 sm:p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                  <span className="font-display text-orange-400 text-[14px] leading-none">VB</span>
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-white">
                    Василий Барановский
                  </div>
                  <div className="eyebrow !text-[10px] !tracking-[0.18em] text-white/50">
                    Инженер высотных аттракционов · конструктор
                  </div>
                </div>
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[1.75] text-white/78">
                <strong className="text-white font-semibold">Василий Барановский</strong> — Инженер высотных аттракционов и конструктор оборудования. 10+ лет проектирую, строю и оптимизирую объекты, где ошибка недопустима. Разрабатываю кастомные узлы и каретки, которые увеличивают пропускную способность зиплайнов и снижают операционные расходы.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 animate-fade-up">
            <button
              onClick={() => scrollTo('contacts')}
              className="btn-primary rounded-2xl flex-1 sm:flex-none lg:flex-1 shadow-orange-glow"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 8h12M10 4l4 4-4 4" strokeLinecap="square" />
              </svg>
              Обсудить проект
            </button>
            <button
              onClick={() => scrollTo('products')}
              className="btn-glass rounded-2xl flex-1 sm:flex-none lg:flex-1 shadow-green-glow"
            >
              <svg className="w-4 h-4 text-safety-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 3h12v10H2z" strokeLinecap="square" />
                <path d="M6 5l5 3-5 3V5z" fill="currentColor" stroke="none" />
              </svg>
              Смотреть портфолио
            </button>
          </div>
        </div>

        {/* Bottom quick stats strip (glass) */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { k: 'Пропускная', v: '+4×', s: 'за счет кресельной системы', color: 'orange' },
            { k: 'Износ', v: '−60%', s: 'с узлами собственной разработки', color: 'green' },
            { k: 'Безопасность', v: '0', s: 'инцидентов за 10 лет', color: 'green' },
            { k: 'Срок службы', v: '20+', s: 'лет при регламентом ТО', color: 'orange' },
          ].map((s) => (
            <div key={s.k} className="glass rounded-xl p-4 sm:p-5 md:p-6 group transition-transform hover:-translate-y-1 duration-300">
              <div className="eyebrow !text-[10px] mb-2">{s.k}</div>
              <div
                className={`font-display tracking-tight leading-none text-[40px] sm:text-[48px] mb-2 ${
                  s.color === 'orange' ? 'text-orange-400' : 'text-safety-400'
                }`}
              >
                {s.v}
              </div>
              <div className="text-[12px] text-white/55 leading-relaxed">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
