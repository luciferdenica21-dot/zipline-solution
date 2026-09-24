const blocks = [
  {
    tag: 'Проектирование',
    tagColor: 'orange',
    title: 'Проектирование',
    text: 'Каретки, зажимы, страховочные узлы с расчетом запаса прочности.',
    bullets: ['Расчеты FEM', 'CAD / 3D-модели', 'Прототипы'],
  },
  {
    tag: 'Производство',
    tagColor: 'green',
    title: 'Контрактное производство',
    text: 'Размещение заказов на зарубежных заводах, контроль сплавов и тесты.',
    bullets: ['Контроль сплавов', 'Сертификация', 'NDT / испытания'],
  },
  {
    tag: 'Интеграция',
    tagColor: 'orange',
    title: 'Интеграция',
    text: 'Прямая работа с мировыми производителями компонентов.',
    bullets: ['Zipstop / Petzl', 'Кастомные спеки', 'Лучшие цены'],
  },
]

export default function RDManufacturing() {
  return (
    <section
      id="rd"
      className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden bg-ink-850"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent"
      ></div>
      <div className="absolute inset-0 -z-10 section-grid-bg opacity-25"></div>
      <div
        className="absolute -left-24 bottom-0 w-[420px] h-[420px] rounded-full opacity-[0.13] blur-3xl -z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF7A1A 0%, transparent 65%)' }}
      ></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-10 sm:mb-14 md:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <span className="inline-block h-px w-10 bg-orange-500 mb-4"></span>
            <h2 className="font-display tracking-[-0.015em] leading-[0.92] text-[11vw] sm:text-[7.5vw] md:text-[6vw] lg:text-[72px] xl:text-[84px]">
              Разработка и <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-orange-400 to-safety-400 bg-clip-text text-transparent">
                контрактное производство
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="glass rounded-xl p-4 sm:p-5 md:p-6">
              <div className="eyebrow !text-safety-400 !text-[10px] mb-2">Цикл</div>
              <div className="font-display text-[30px] sm:text-[34px] tracking-tight leading-none text-white mb-2">
                Чертеж <span className="text-orange-400">→</span> образец
              </div>
              <p className="text-[12.5px] sm:text-[13px] leading-[1.65] text-white/60">
                Расчеты → CAD → прототип → испытания → серийная поставка.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {blocks.map((b, i) => {
            const tCls =
              b.tagColor === 'orange'
                ? '!border-orange-500/25 !text-orange-400 !bg-orange-500/10'
                : '!border-safety-500/25 !text-safety-400 !bg-safety-500/10'
            const accent = b.tagColor === 'orange' ? 'text-orange-400' : 'text-safety-400'
            const line = b.tagColor === 'orange' ? 'bg-orange-500' : 'bg-safety-500'
            return (
              <article
                key={i}
                className="relative glass rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute -top-px left-6 right-6 h-px ${line} opacity-60`}
                ></div>
                <div className="flex items-center justify-between mb-4 md:mb-5">
                  <span className={`chip !py-1 rounded-md !text-[9.5px] ${tCls}`}>{b.tag}</span>
                </div>
                <h3 className="font-display text-[24px] sm:text-[26px] md:text-[28px] leading-[1] tracking-[-0.005em] text-white mb-3">
                  {b.title}
                </h3>
                <div className={`w-9 h-px ${line} mb-4`}></div>
                <p className="text-[13.5px] sm:text-[14px] leading-[1.7] text-white/70 mb-5">
                  {b.text}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {b.bullets.map((x) => (
                    <span
                      key={x}
                      className="px-2.5 py-1.5 text-[11px] tracking-[0.06em] uppercase text-white/55 rounded-lg bg-white/[0.03] border border-white/[0.07]"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
