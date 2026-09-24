import { useState } from 'react'

export default function Contacts() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contacts" className="w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/contact.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-[32px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.1] tracking-tight text-white mb-3">
                Свяжитесь<br />со мной
              </h2>
              <p className="text-[14px] text-white/60 leading-[1.7]">
                Готов обсудить ваш проект. Напишите или позвоните.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <a href="https://t.me/zipline_solution" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] text-white/40 mb-0.5">Telegram</div>
                  <div className="text-[15px] font-medium text-white group-hover:text-white/60 transition-colors">@zipline_solution</div>
                </div>
              </a>

              <a href="https://wa.me/995557704193" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] text-white/40 mb-0.5">WhatsApp</div>
                  <div className="text-[15px] font-medium text-white group-hover:text-white/60 transition-colors">+995 557 704 193</div>
                </div>
              </a>

              <a href="tel:+995557704193" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] text-white/40 mb-0.5">Телефон</div>
                  <div className="text-[15px] font-medium text-white group-hover:text-white/60 transition-colors">+995 557 704 193</div>
                </div>
              </a>

              <a href="mailto:vasyl@zipline-solution.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] text-white/40 mb-0.5">Email</div>
                  <div className="text-[15px] font-medium text-white group-hover:text-white/60 transition-colors">vasyl@zipline-solution.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] text-white/40 mb-0.5">Локация</div>
                  <div className="text-[15px] font-medium text-white">Тбилиси, 0144, Грузия</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white mb-2">ЗАЯВКА</h3>
            <p className="text-[14px] text-white/60 leading-[1.7] mb-8">
              Оставьте ваши данные. Мы с вами свяжемся.
            </p>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] text-white/50 mb-1.5">Эл. почта *</label>
                <div className="flex gap-2">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 border border-white/30 rounded-md px-3 py-2 text-[14px] text-white placeholder-white/30 outline-none focus:border-white transition-colors bg-white/10"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black text-[13px] font-medium rounded-md px-4 py-2 hover:bg-white/80 transition-colors whitespace-nowrap"
                  >
                    {sent ? 'Отправлено ✓' : 'Отправить'}
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-4 text-[11px] text-white/30 leading-relaxed">
              Отправляя форму, вы соглашаетесь на обработку данных.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
