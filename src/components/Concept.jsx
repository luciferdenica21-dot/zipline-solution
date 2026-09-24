export default function Concept() {
  const features = [
    {
      icon: '🏔️',
      title: 'Высота',
      desc: 'Маршруты от 50 до 500 метров над землей с захватывающим видом.',
    },
    {
      icon: '⚡',
      title: 'Скорость',
      desc: 'Разгон до 60 км/ч — ощутите настоящий полёт над долиной.',
    },
    {
      icon: '🛡️',
      title: 'Безопасность',
      desc: 'Сертифицированное оборудование и двойная страховка на каждом шаге.',
    },
    {
      icon: '🌿',
      title: 'Природа',
      desc: 'Трассы проложены в заповедных местах с нетронутой флорой.',
    },
  ]

  return (
    <section
      id="concept"
      className="relative min-h-screen flex items-start sm:items-center pt-28 sm:pt-32 md:pt-24 pb-20 overflow-hidden isolate"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=2000&q=80"
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[130%] sm:h-[120%] min-h-full object-cover object-center-top z-0 scale-[1.02]"
        style={{ objectPosition: 'center top' }}
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/80 z-10"></div>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-20">
        <div className="max-w-4xl">
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-3 pl-1">
            <span className="w-10 sm:w-14 h-px bg-mandarin-500"></span>
            <p className="italic font-serif text-lg sm:text-2xl md:text-3xl text-ziplineGreen-300 tracking-wide">
              Vasyl Baranovskiy
            </p>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6 sm:mb-10">
            Инженерия экстремальных парков:
            <span className="block mt-2 text-mandarin-500">
              от концепта до собственного снаряжения
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-3xl">
            Инженер высотных аттракционов и конструктор оборудования. 10+ лет
            проектирую, строю и оптимизирую объекты, где ошибка недопустима.
            Разрабатываю кастомные узлы и каретки, которые увеличивают
            пропускную способность зиплайнов и снижают операционные расходы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center px-7 sm:px-8 py-4 rounded-2xl bg-mandarin-500 hover:bg-mandarin-600 text-white font-bold text-base sm:text-lg shadow-2xl shadow-mandarin-500/40 hover:shadow-mandarin-500/60 transition-all duration-200 group hover:scale-[1.02]"
            >
              Обсудить проект
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 hover:border-ziplineGreen-500/40 text-white font-semibold text-base sm:text-lg transition-all group"
            >
              <svg className="w-5 h-5 text-ziplineGreen-400 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Смотреть портфолио
            </a>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-5 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-mandarin-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl">
          {[
            { n: '15+', l: 'трасс в работе' },
            { n: '20k+', l: 'довольных клиентов' },
            { n: '100%', l: 'безопасности' },
          ].map((s, i) => (
            <div key={i} className="border-l-2 sm:border-l-4 pl-3 sm:pl-5 border-ziplineGreen-500">
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2">
                {s.n}
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
