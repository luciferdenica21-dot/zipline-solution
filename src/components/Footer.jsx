import Logo from '../assets/logobrand1.png'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-black border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="mb-5">
              <img
                src={Logo}
                alt="Логотип"
                className="h-12 sm:h-16 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-white/60 max-w-md leading-relaxed mb-5">
              Аттракционы нового поколения. Проектируем, строим и обслуживаем
              канатные дороги и зиплайны по всей России. 10+ лет, 20+ объектов,
              20 000+ счастливых клиентов.
            </p>
            <div className="flex gap-3">
              {['📷', '📘', '💬', '▶️'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-mandarin-500 border border-white/10 hover:border-mandarin-500 transition-all text-lg"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Разделы</h4>
            <ul className="space-y-2">
              {[
                { l: 'Концепция', id: 'concept' },
                { l: 'Продукты', id: 'products' },
                { l: 'Обо мне', id: 'about' },
                { l: 'Связаться', id: 'contact' },
              ].map((m) => (
                <li key={m.id}>
                  <a
                    href={`#${m.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(m.id).scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-white/60 hover:text-mandarin-400 transition-colors text-sm"
                  >
                    {m.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <div className="text-white/50 text-xs">Телефон</div>
                <a href="tel:+79001234567" className="text-white hover:text-mandarin-400 font-semibold">
                  +7 (900) 123-45-67
                </a>
              </li>
              <li>
                <div className="text-white/50 text-xs">Email</div>
                <a href="mailto:hello@ziplinesolution.ru" className="text-white hover:text-mandarin-400 font-semibold break-all">
                  hello@ziplinesolution.ru
                </a>
              </li>
              <li>
                <div className="text-white/50 text-xs">Адрес</div>
                <div className="text-white/80">Краснодарский край, Сочи</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/50">
            © {year} Zipline Solution. Все права защищены.
          </div>
          <div className="flex gap-5 text-xs">
            <a href="#" className="text-white/50 hover:text-mandarin-400 transition">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/50 hover:text-mandarin-400 transition">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
