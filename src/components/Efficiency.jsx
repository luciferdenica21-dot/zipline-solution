const cards = [
  {
    tag: 'ПРОПУСКНАЯ СПОСОБНОСТЬ',
    tagColor: 'orange',
    title: 'Максимизация пропускной способности',
    body:
      'Кастомные каретки и оптимизация геометрии старта/финиша сокращают цикл отправки каждого райдера.',
  },
  {
    tag: 'ЭКОНОМИЯ НА ТО',
    tagColor: 'green',
    title: 'Снижение износа и затрат на ТО',
    body:
      'Износостойкие узлы и расчет геометрии снижают трение троса. Меньше простоев — ниже стоимость владения.',
  },
  {
    tag: 'БЕЗОПАСНОСТЬ',
    tagColor: 'green',
    title: 'Бескомпромиссная безопасность',
    body:
      'Проектирование с учетом динамических нагрузок и интеграция Zipstop исключают человеческий фактор.',
  },
  {
    tag: 'R&D / CUSTOM',
    tagColor: 'orange',
    title: 'Кастомное оборудование под задачу',
    body:
      'Проектирование и расчет узлов с нуля под уникальные требования объекта.',
  },
]

export default function Efficiency() {
  return (
    <section
      id="efficiency"
      className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 section-grid-bg opacity-30"></div>
      <div
        className="absolute top-1/3 -left-32 w-[460px] h-[460px] rounded-full opacity-[0.12] blur-3xl -z-10"
        style={{ background: 'radial-gradient(circle, #FF7A1A 0%, transparent 65%)' }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading — NO § tags */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <span className="inline-block h-px w-10 bg-orange-500 mb-4"></span>
          <h2 className="font-display tracking-[-0.015em] leading-[0.92] text-[11vw] sm:text-[7.5vw] md:text-[6vw] lg:text-[72px] xl:text-[84px]">
            Инженерные решения <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              для повышения прибыльности
            </span>
          </h2>
        </div>

        {/* 4 compact glass cards — NO giant KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {cards.map((c, i) => {
            const tCls =
              c.tagColor === 'orange'
                ? '!border-orange-500/25 !text-orange-400 !bg-orange-500/10'
                : '!border-safety-500/25 !text-safety-400 !bg-safety-500/10'
            const dot = c.tagColor === 'orange' ? 'bg-orange-500' : 'bg-safety-500'
            return (
              <article
                key={i}
                className="glass rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4 md:mb-5">
                  <span className={`chip !text-[9.5px] !py-1 rounded-md ${tCls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                    {c.tag}
                  </span>
                </div>

                <h3 className="font-display text-[22px] sm:text-[24px] md:text-[26px] tracking-[-0.005em] leading-[1] text-white mb-3">
                  {c.title}
                </h3>

                <div className="w-8 h-px bg-white/15 mb-4"></div>

                <p className="text-[13.5px] sm:text-[14px] leading-[1.65] text-white/70">
                  {c.body}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
