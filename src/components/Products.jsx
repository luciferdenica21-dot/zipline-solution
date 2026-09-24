import { useState, useEffect } from 'react'

const products = [
  {
    id: 'chair',
    title: 'Кресельная система для коммерческого зиплайна',
    details: [
      ['Назначение', 'Увеличение пропускной способности, расширение аудитории (дети, пожилые люди, лица с НОДА).'],
      ['Сиденье', 'Износостойкий композит, кордюра с защитой от UV и осадков, защита от скопления воды.'],
      ['Подвес', 'Жесткое/полужесткое соединение с кареткой для минимизации поперечной раскачки.'],
      ['Нагрузки', 'Рабочая нагрузка до 135 кг, разрывная > 22 кН.'],
      ['Безопасность', '4-точечные ремни с защитой от самостоятельного открытия, дублирующая резервная линия, встроенная амортизация.'],
      ['Эффективность', 'Экономит 60–80% времени на старте, снижает нагрузку на персонал.'],
    ],
  },
  {
    id: 'magnet',
    title: 'Магнитный ролик для скоростного зиплайна (до 80 км/ч)',
    details: [
      ['Адаптация', 'Индивидуальный расчет силы магнитного торможения под геометрию трассы.'],
      ['Совместимость', 'Жесткая сцепка с кресельными подвесками без люфтов.'],
      ['Материалы', 'Авиационный алюминий, закаленная сталь, усиленные закрытые подшипники.'],
      ['Долговечность', 'Бесконтактные магнитные элементы минимизируют износ и обслуживание.'],
    ],
  },
  {
    id: 'shmel',
    title: 'Подвесной автономный транспортный робот «Шмель»',
    details: [
      ['Механика', 'Приводные колеса 140 мм с полиуретановым бандажом, 2 сервомотора 48V по 600W, скорость до 3.5 м/с.'],
      ['Управление', 'Радиосистема «Pitch and Catch» (2 оператора), контроллер DCSC с S-кривыми.'],
      ['Безопасность', 'Механические концевые выключатели, E-STOP система (<0.5с), мониторинг разряда АКБ (<43V).'],
    ],
  },
]

function Modal({ product, onClose }) {
  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div
        className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-end px-6 py-4 bg-[#111]/90 backdrop-blur-sm border-b border-white/10">
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors text-[14px] font-mono"
          >
            ✕
          </button>
        </div>
        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <h3 className="font-display text-[22px] sm:text-[26px] leading-[1.15] text-white mb-6">
            {product.title}
          </h3>
          <div className="divide-y divide-white/[0.07]">
            {product.details.map(([k, v], i) => (
              <div key={i} className="py-3 grid grid-cols-[100px_1fr] gap-4">
                <span className="text-[9px] font-mono tracking-[0.12em] uppercase text-orange-400/70 pt-0.5">{k}</span>
                <span className="text-[12px] leading-[1.7] text-white/70">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [active, setActive] = useState(null)

  return (
    <>
      <section
        id="products"
        className="relative w-full min-h-screen overflow-hidden flex items-start"
      >
        {/* Background video */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
            <source src="/product.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-20 flex items-start">
          <div className="flex flex-col">

            {/* Heading */}
            <div className="mb-12 lg:mb-16">
              <h2 className="font-display tracking-[-0.01em] leading-[1.2] text-[6vw] sm:text-[4vw] lg:text-[42px] xl:text-[48px] text-white">
                ИНЖЕНЕРНЫЕ СИСТЕМЫ И{' '}
                <span className="text-green-400">СПЕЦОБОРУДОВАНИЕ</span>
              </h2>
            </div>

            {/* Stacked cards */}
            <div className="flex flex-col gap-3">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="group text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between transition-all duration-200 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20"
                >
                  <span className="font-display text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.2] tracking-wide text-white/80 font-light group-hover:text-orange-400 transition-colors">
                    {p.title}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Modal product={active} onClose={() => setActive(null)} />
    </>
  )
}
