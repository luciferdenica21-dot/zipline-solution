const BgContact =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80'

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-overlay relative py-20 sm:py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${BgContact})` }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ziplineGreen-500/15 border border-ziplineGreen-500/30 mb-5">
            <span className="text-ziplineGreen-400 font-bold text-xs tracking-wider uppercase">
              Заявка на полёт
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white mb-5">
            Связаться <span className="text-mandarin-500">со мной</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Заполни форму — отвечу в течение часа и подберём лучшую трассу
            под твой уровень и компанию.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-5">
            {[
              { ic: '📞', t: 'Телефон', v: '+7 (900) 123-45-67', s: 'Ежедневно 08:00–22:00' },
              { ic: '✉️', t: 'Email', v: 'hello@ziplinesolution.ru', s: 'Отвечаем на письма за 1 час' },
              { ic: '📍', t: 'Локация', v: 'Краснодарский край, Сочи', s: 'Ул. Горная, 15, офис 301' },
              { ic: '💬', t: 'Мессенджеры', v: 'WhatsApp / Telegram', s: 'По тому же номеру телефона' },
            ].map((c, i) => (
              <div
                key={i}
                className="group p-5 sm:p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-ziplineGreen-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-mandarin-500/15 border border-mandarin-500/30 text-2xl">
                    {c.ic}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{c.t}</div>
                    <div className="text-lg sm:text-xl font-bold text-white mb-1 break-all">{c.v}</div>
                    <div className="text-sm text-white/60">{c.s}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('Спасибо! Заявка отправлена — я свяжусь с вами в ближайшее время.')
            }}
            className="lg:col-span-3 p-6 sm:p-8 lg:p-10 rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Ваше имя *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-mandarin-500 focus:bg-white/10 text-white placeholder-white/40 outline-none transition text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Телефон *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-mandarin-500 focus:bg-white/10 text-white placeholder-white/40 outline-none transition text-base"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.ru"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-mandarin-500 focus:bg-white/10 text-white placeholder-white/40 outline-none transition text-base"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                Какая трасса интересует?
              </label>
              <select className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-mandarin-500 focus:bg-white/10 text-white outline-none transition text-base appearance-none">
                <option className="bg-black">Не решил — нужна консультация</option>
                <option className="bg-black">Начинающий (до 150 м)</option>
                <option className="bg-black">Средний (150–400 м)</option>
                <option className="bg-black">Экстрим (от 400 м)</option>
                <option className="bg-black">Семейный / детский</option>
                <option className="bg-black">Корпоративный заказ</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                Комментарий
              </label>
              <textarea
                rows={4}
                placeholder="Дата, количество человек, особые пожелания..."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-mandarin-500 focus:bg-white/10 text-white placeholder-white/40 outline-none transition text-base resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-mandarin-500 hover:bg-mandarin-600 text-white font-bold text-base shadow-2xl shadow-mandarin-500/40 hover:shadow-mandarin-500/60 transition-all hover:scale-[1.02]"
              >
                Отправить заявку
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
                и даёте согласие на обработку персональных данных.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
