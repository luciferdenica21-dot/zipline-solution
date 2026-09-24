import { useState } from 'react'

const specs = [
  {
    title: 'МАКСИМИЗАЦИЯ ТРАФИКА',
    fact: 'Сокращение интервала отправки',
    desc: 'Оптимизация геометрии стартовых платформ и применение кастомных кареток. Рост пропускной способности без снижения безопасности.',
  },
  {
    title: ['СНИЖЕНИЕ ', 'OPEX'],
    fact: 'Минимизация затрат на ТО',
    desc: 'Точный расчет провиса и трения троса в сочетании с износостойкими узлами. Предотвращение простоев и износа снаряжения.',
  },
  {
    title: ['БЕЗОПАСНОСТЬ ', '&', ' ZIPSTOP'],
    fact: 'Исключение человеческого фактора',
    desc: 'Расчет динамических и пиковых нагрузок. Прямая интеграция магнитных тормозных систем. Снижение юридических и эксплуатационных рисков.',
  },
  {
    title: ['КАСТОМНЫЙ ', 'R&D'],
    fact: 'Проектирование с нуля',
    desc: 'Разработка нестандартных узлов и механизмов, когда серийное оборудование не обеспечивает нужный ресурс или скорость работы.',
  },
]

const renderTitle = (title) => {
  if (!Array.isArray(title)) return title
  return title.map((part, i) =>
    i % 2 === 0
      ? <span key={i} className="font-display">{part}</span>
      : <span key={i} className="font-sans">{part}</span>
  )
}

export default function About() {
  const [active, setActive] = useState(null)

  const open = (i) => setActive(i)
  const close = () => setActive(null)

  const activeSpec = active !== null ? specs[active] : null

  return (
    <section
      id="about"
      className="relative w-full min-h-screen lg:h-screen lg:flex lg:items-center pt-24 pb-10 sm:pt-28 sm:pb-14 lg:py-0 bg-ink-900 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"></div>
      <div className="absolute inset-0 -z-10 section-grid-bg opacity-30"></div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

          {/* Левая колонка */}
          <div className="lg:w-[35%] flex flex-col items-center text-center lg:items-start lg:text-left mb-10 lg:mb-0 lg:pt-16">
            <img
              src="/aboutme.jpg"
              alt="Василь Барановский"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-orange-500/50 mb-4"
            />
            <span className="inline-block h-px w-10 bg-orange-500 mb-3"></span>
            <h2 className="font-display tracking-[-0.01em] leading-[0.95] text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[50px] text-white mb-4">
              Василь Барановский
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-white/70 lg:mt-4">
              Инженер высотных аттракционов и конструктор оборудования. 10+ лет
              проектирую, строю и оптимизирую объекты, где ошибка недопустима.
              Разрабатываю кастомные узлы и каретки, которые увеличивают
              пропускную способность и снижают износ оборудования.
            </p>
          </div>

          {/* Правая колонка */}
          <div className="lg:w-[65%] flex flex-col">
            {/* Заголовок — десктоп */}
            <div className="mb-6 hidden lg:block pt-40">
              <h3 className="font-display tracking-[-0.01em] leading-[1.2] text-[20px] xl:text-[24px] text-white mb-2">
                ИНЖЕНЕРНЫЕ РЕШЕНИЯ ДЛЯ ОПТИМИЗАЦИИ <span className="font-sans text-green-400">TCO</span> И ПРОПУСКНОЙ СПОСОБНОСТИ
              </h3>
              <p className="text-[11px] sm:text-[12px] leading-[1.7] text-orange-400">
                Проектирование с учетом полного жизненного цикла аттракциона: от оптимизации стартового цикла до снижения износа компонентов.
              </p>
            </div>
            {/* Заголовок — мобильный */}
            <div className="mb-6 lg:hidden flex flex-col items-center text-center">
              <span className="inline-block h-px w-10 bg-orange-500 mb-3"></span>
              <h3 className="font-display tracking-[-0.01em] leading-[1.2] text-[18px] sm:text-[20px] text-white mb-2">
                ИНЖЕНЕРНЫЕ РЕШЕНИЯ ДЛЯ ОПТИМИЗАЦИИ <span className="font-sans text-green-400">TCO</span> И ПРОПУСКНОЙ СПОСОБНОСТИ
              </h3>
              <p className="text-[11px] sm:text-[12px] leading-[1.7] text-orange-400">
                Проектирование с учетом полного жизненного цикла аттракциона: от оптимизации стартового цикла до снижения износа компонентов.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {specs.map((s, i) => (
                <button
                  key={i}
                  onClick={() => open(i)}
                  className="group text-left px-5 py-4 flex items-center transition-all duration-200 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 focus:outline-none"
                >
                  <span className="text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.2] tracking-wide text-white/80 group-hover:text-orange-400 transition-colors">
                    {renderTitle(s.title)}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {activeSpec && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={close}>
            <div
              className="relative w-full max-w-lg glass-strong rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="sticky top-0 float-right text-white/40 hover:text-white transition-colors text-[11px] font-mono tracking-widest mb-4 z-10"
              >
                ✕
              </button>
              <h3 className="text-[22px] sm:text-[26px] leading-[1.15] text-white mb-3 pr-8">
                {renderTitle(activeSpec.title)}
              </h3>
              <p className="text-[11px] font-mono tracking-[0.1em] text-orange-400/80 uppercase mb-6">
                {activeSpec.fact}
              </p>
              <div className="h-px bg-white/10 mb-5"></div>
              <p className="text-[13px] leading-[1.75] text-white/65">
                {activeSpec.desc}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
