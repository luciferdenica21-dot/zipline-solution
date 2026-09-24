import { useState } from 'react'

const BgFaq =
  'https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?auto=format&fit=crop&w=2000&q=80'

const faqs = [
  {
    q: 'С какого возраста можно кататься на зиплайне?',
    a: 'Детские трассы доступны с 6 лет в сопровождении родителей и при росте от 120 см. Взрослые маршруты — от 14 лет, вес от 35 до 120 кг. Для подростков 14–18 лет требуется письменное согласие родителей.',
  },
  {
    q: 'Насколько это безопасно?',
    a: 'Безопасность — наш главный приоритет. Используем двойную систему страховки, сертифицированное оборудование (Франция, Австрия), еженедельный контроль тросов и ежемесячный аудит инженером. 10 лет — 0 инцидентов.',
  },
  {
    q: 'Что делать, если я боюсь высоты?',
    a: '90% наших клиентов с высотной боязнью получают незабываемые впечатления! Инструктор всегда рядом, есть демо-спуск с 5 метров и возможность прервать полёт в любой точке. Многие возвращаются повторно.',
  },
  {
    q: 'Какую одежду и обувь выбрать?',
    a: 'Спортивная одежда по погоде, не стесняющая движений. Кроссовки с нескользящей подошвой. Длинные волосы собрать в хвост. Украшения и шарфы лучше снять. При плохой погоде предоставляем дождевики.',
  },
  {
    q: 'Работаете ли вы зимой и в дождь?',
    a: 'Да, трассы работают круглый год при температуре от -15°С до +35°С. При сильном ветре (>12 м/с), грозе и ледяном дожде полёты временно приостанавливаются до улучшения погоды.',
  },
  {
    q: 'Можно ли снимать полёт на камеру?',
    a: 'Конечно! Рекомендуем экшн-камеру с креплением на шлем (предоставляем бесплатно по запросу). Мы также предлагаем услугу профессиональной съёмки от нашего оператора с монтажом ролика.',
  },
  {
    q: 'Как забронировать и можно ли отменить?',
    a: 'Бронирование онлайн или по телефону за 1 день. Предоплата 50%. Отмена бесплатно за 24 часа до начала. Перенос даты — бесплатно в любое время. Для групп от 10 человек — особые условия.',
  },
  {
    q: 'Есть ли скидки для групп и корпоративов?',
    a: 'Да! Группам от 10 человек — скидка 15%, от 20 — 25%. Корпоративным клиентам: отдельные слоты, catering, фото/видео отчёт, сертификаты для сотрудников. Пиши — подберём индивидуальное предложение.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="faq"
      className="bg-overlay relative py-20 sm:py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${BgFaq})` }}
    >
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ziplineGreen-500/15 border border-ziplineGreen-500/30 mb-5">
            <span className="text-ziplineGreen-400 font-bold text-xs tracking-wider uppercase">
              Вопросы и ответы
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white mb-5">
            FAQ
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Всё, что вы хотели знать о полётах, но боялись спросить. Если нет
            ответа — напишите в форме выше, отвечу быстро.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`faq-item overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-mandarin-500/10 border-mandarin-500/40 backdrop-blur-md'
                    : 'bg-black/50 border-white/10 hover:border-white/20 backdrop-blur-sm'
                }`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <button
                  className={`w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 ${
                    isOpen ? 'pb-4' : ''
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-4 flex-1 min-w-0">
                    <span className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${
                      isOpen
                        ? 'bg-mandarin-500 text-black'
                        : 'bg-white/10 text-white/70'
                    }`}>
                      Q
                    </span>
                    <span className={`font-bold text-base sm:text-lg leading-snug ${
                      isOpen ? 'text-mandarin-300' : 'text-white'
                    }`}>
                      {f.q}
                    </span>
                  </span>
                  <span className={`faq-icon shrink-0 w-9 h-9 flex items-center justify-center rounded-full border ${
                    isOpen
                      ? 'bg-mandarin-500 border-mandarin-500 text-black'
                      : 'bg-white/5 border-white/20 text-white/70'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`faq-answer ${isOpen ? 'open' : ''}`}
                >
                  <div className="px-5 sm:px-7 pb-6 sm:pb-7 flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm bg-ziplineGreen-500 text-black">
                      A
                    </span>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed pt-1">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-mandarin-500 to-ziplineGreen-500 text-black text-center">
          <h3 className="text-2xl sm:text-4xl font-black mb-3">Остался вопрос?</h3>
          <p className="text-base sm:text-lg font-medium mb-6 opacity-90 max-w-xl mx-auto">
            Звони или пиши прямо сейчас — отвечу, подскажу, подберу лучшую
            трассу для твоего полёта.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="tel:+79001234567"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-black text-white font-bold hover:bg-black/80 transition-all"
            >
              <span>📞</span>
              +7 (900) 123-45-67
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all"
            >
              Написать в форму
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
