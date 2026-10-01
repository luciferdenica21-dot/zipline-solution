import { useTranslation } from 'react-i18next'

const renderTitle = (title, language) => {
  return <span className={language === 'en' ? '' : 'font-display'}>{title}</span>
}

export default function About() {
  const { t, i18n } = useTranslation()

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
    <section id="about" className="relative w-full bg-ink-900 overflow-hidden">

      {/* ========== DESKTOP: split screen with 45° line ========== */}
      <div className="hidden lg:flex flex-col h-screen relative">
        {/* Base background */}
        <div aria-hidden className="absolute inset-0 section-grid-bg opacity-30"></div>
        {/* Right gradient panel with a true 45° slanted left edge */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(calc(50% - 50vh) 0, 100% 0, 100% 100%, calc(50% + 50vh) 100%)',
            background: 'linear-gradient(115deg, #0c0c0c 0%, #131110 42%, #1b150b 100%)',
          }}
        ></div>
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"></div>

        {/* Top area: photo left / text right */}
        <div className="relative flex-1 min-h-0">
          <img
            src="/about2.jpg"
            alt="Василь Барановский"
            className="absolute left-[4%] xl:left-[6%] top-1/2 -translate-y-1/2 h-[54vh] max-h-[580px] w-[24vw] xl:w-[22vw] object-cover rounded-2xl border border-white/15 shadow-2xl"
          />

          <div className="absolute right-[4%] xl:right-[6%] top-1/2 -translate-y-1/2 w-[42%] xl:w-[44%]">
            <span className="inline-block h-px w-10 bg-orange-500 mb-3"></span>
            <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-orange-400 mb-2">
              {t('about.name')}
            </p>
            <h2
              className={`${i18n.language === 'en' ? 'heading-normal' : 'font-display tracking-[-0.01em]'} leading-[1.15] text-white mb-3 text-[clamp(18px,2.5vh,27px)]`}
            >
              {renderTitle(t('about.title'), i18n.language)}
            </h2>
            <p className="text-[clamp(9.5px,1.3vh,11.5px)] leading-[1.6] text-orange-400 mb-4">
              {t('about.subtitle')}
            </p>
            <p className="text-[clamp(11px,1.5vh,13px)] leading-[1.7] text-white/65 max-w-xl">
              {t('about.bio')}
            </p>
          </div>
        </div>

        {/* Bottom: four open cards in a horizontal row */}
        <div className="relative h-[36vh] min-h-[230px] px-6 xl:px-10 pb-6 flex">
          <div className="grid grid-cols-4 gap-3 xl:gap-4 w-full h-full py-4">
            {specs.map((s, i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-3.5 xl:p-4"
              >
                <span className="text-[clamp(7.5px,1vh,9px)] font-mono tracking-[0.12em] uppercase text-orange-400/85 mb-1.5">
                  {s.fact}
                </span>
                <h3
                  className={`${i18n.language === 'en' ? 'heading-normal' : 'font-display tracking-[-0.005em]'} leading-[1.25] text-white mb-2 text-[clamp(10.5px,1.45vh,13px)]`}
                >
                  {renderTitle(s.title, i18n.language)}
                </h3>
                <p className="text-[clamp(9px,1.25vh,10.5px)] leading-[1.55] text-white/60">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== MOBILE: stacked adaptation ========== */}
      <div className="lg:hidden relative min-h-screen flex flex-col pt-24 pb-10">
        <div aria-hidden className="absolute inset-0 section-grid-bg opacity-30"></div>
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[46vh]"
          style={{ background: 'linear-gradient(160deg, #0c0c0c 0%, #14110d 55%, #1b150b 100%)' }}
        ></div>

        <div className="relative px-4 sm:px-6">
          <img
            src="/about2.jpg"
            alt="Василь Барановский"
            className="w-full h-[38vh] object-cover rounded-2xl border border-white/15 shadow-2xl"
          />

          <div className="mt-6">
            <span className="inline-block h-px w-10 bg-orange-500 mb-3"></span>
            <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-orange-400 mb-2">
              {t('about.name')}
            </p>
            <h2
              className={`${i18n.language === 'en' ? 'heading-normal' : 'font-display tracking-[-0.01em]'} leading-[1.2] text-[20px] sm:text-[24px] text-white mb-2`}
            >
              {renderTitle(t('about.title'), i18n.language)}
            </h2>
            <p className="text-[11px] leading-[1.6] text-orange-400 mb-3">
              {t('about.subtitle')}
            </p>
            <p className="text-[13px] leading-[1.7] text-white/65">
              {t('about.bio')}
            </p>
          </div>

          {/* Four open cards */}
          <div className="mt-7 flex flex-col gap-3">
            {specs.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4"
              >
                <span className="text-[8.5px] font-mono tracking-[0.12em] uppercase text-orange-400/85 mb-1.5 block">
                  {s.fact}
                </span>
                <h3
                  className={`${i18n.language === 'en' ? 'heading-normal' : 'font-display tracking-[-0.005em]'} leading-[1.3] text-white text-[14px] mb-1.5`}
                >
                  {renderTitle(s.title, i18n.language)}
                </h3>
                <p className="text-[12px] leading-[1.6] text-white/60">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
