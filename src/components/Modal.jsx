import { useEffect } from 'react'

export default function Modal({ product, onClose }) {
  useEffect(() => {
    if (!product) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  if (!product) return null

  const { title, hero, sections, cta } = product

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border border-mandarin-500/20 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-2xl shadow-mandarin-500/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-mandarin-500/20 border border-white/10 hover:border-mandarin-500/40 text-white/70 hover:text-mandarin-400 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative shrink-0 h-44 sm:h-64 overflow-hidden">
          <img
            src={hero.img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10"></div>
          <div className="absolute inset-0 flex items-end p-5 sm:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mandarin-500/15 border border-mandarin-500/30 mb-3 sm:mb-4">
                <span className="text-mandarin-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                  {hero.tag}
                </span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {title}
              </h2>
              {hero.subtitle && (
                <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-white/80 max-w-2xl leading-relaxed">
                  {hero.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-8 space-y-6 sm:space-y-8">
          {sections.map((sec, i) => (
            <section key={i}>
              <div className="flex items-center gap-3 mb-4">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-ziplineGreen-500/15 border border-ziplineGreen-500/30 text-ziplineGreen-400 font-black text-sm flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                  {sec.title}
                </h3>
              </div>
              {sec.image && (
                <div className="mb-4 rounded-2xl overflow-hidden border border-white/10">
                  <img src={sec.image} alt={sec.title} className="w-full h-44 sm:h-64 object-cover" />
                </div>
              )}
              {sec.type === 'list' ? (
                <ul className="space-y-3">
                  {sec.items.map((it, j) => (
                    <li
                      key={j}
                      className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition"
                    >
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-mandarin-500"></span>
                      <div className="flex-1 text-sm sm:text-base text-white/85 leading-relaxed">
                        {it.label && (
                          <span className="font-bold text-white mr-1">{it.label}:</span>
                        )}
                        {it.value}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : sec.type === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {sec.items.map((it, j) => (
                    <div
                      key={j}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-ziplineGreen-500/30 transition-all"
                    >
                      <div className="text-xs uppercase tracking-wider text-white/50 mb-2">{it.label}</div>
                      <div className="text-lg sm:text-xl font-black text-mandarin-400 break-words">
                        {it.value}
                      </div>
                      {it.sub && <div className="text-xs text-white/50 mt-1">{it.sub}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-sm sm:text-base text-white/85 leading-relaxed whitespace-pre-line">
                  {sec.text}
                </div>
              )}
            </section>
          ))}

          <div className="mt-8 sm:mt-10 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-mandarin-500 via-mandarin-600 to-ziplineGreen-600 text-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-black text-lg sm:text-2xl mb-1">{cta.title}</div>
              <div className="text-sm sm:text-base font-semibold opacity-90">{cta.sub}</div>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                onClose()
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-black text-white font-bold text-base shadow-xl hover:bg-black/80 transition-all hover:scale-[1.02]"
            >
              {cta.btn}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
