import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Logo from '../assets/logobrand.svg'

const navItems = [
  { id: 'products', labelKey: 'header.products' },
  { id: 'contacts', labelKey: 'header.contacts' },
  { id: 'about', labelKey: 'header.about' },
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(id)
  }

  const isEn = i18n.language === 'en'
  const navLinkCls = `group relative text-[12px] font-medium ${isEn ? 'nav-link-normal' : 'tracking-[0.12em]'} text-white/70 hover:text-white transition-colors`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-3 sm:py-4">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, 'hero')}
            className="shrink-0 flex items-center"
            aria-label="Zipline Solution"
          >
            <img
              src={Logo}
              alt="Zipline Solution"
              className="h-10 sm:h-12 md:h-14 w-auto"
              style={{
                filter: 'brightness(0) saturate(100%) invert(91%) sepia(61%) saturate(500%) hue-rotate(0deg) brightness(105%)',
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={navLinkCls}
              >
                {t(item.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => scrollTo('contacts')}
              className={`${isEn ? 'btn-glass-orange-normal' : 'btn-glass-orange'} rounded-lg !px-3 !py-1.5 !text-[11px] !border-safety-500/55 !text-safety-400 !bg-safety-500/10`}
            >
              {t('header.contactMe')}
            </button>
            <button
              onClick={() => i18n.changeLanguage(isEn ? 'ru' : 'en')}
              className={`text-[12px] font-medium ${isEn ? 'nav-link-normal' : 'tracking-[0.12em]'} text-white/70 hover:text-white transition-colors ml-4`}
            >
              {isEn ? 'RU' : 'EN'}
            </button>
          </nav>

          {/* Mobile: language switch + green phone (outside the burger) + burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => i18n.changeLanguage(isEn ? 'ru' : 'en')}
              aria-label={isEn ? 'Switch to Russian' : 'Switch to English'}
              className="h-10 min-w-[44px] px-2.5 rounded-full border border-white/25 text-white/85 text-[11px] font-semibold tracking-[0.08em] hover:border-white/50 hover:text-white transition-colors"
            >
              {isEn ? 'RU' : 'EN'}
            </button>
            <button
              onClick={() => scrollTo('contacts')}
              aria-label={t('header.contactMe')}
              className="w-10 h-10 rounded-full bg-safety-500/15 border border-safety-500/50 text-safety-400 flex items-center justify-center hover:bg-safety-500/30 transition-colors"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className={`flex flex-col justify-center items-center w-10 h-10 ${open ? 'burger-open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label={t('header.menu')}
              aria-expanded={open}
            >
              <span className="burger-line w-5 h-px bg-white mb-1.5"></span>
              <span className="burger-line w-5 h-px bg-white mb-1.5"></span>
              <span className="burger-line w-5 h-px bg-white"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        } bg-black/95 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`px-4 py-3 text-[13px] ${isEn ? 'nav-link-normal' : 'tracking-[0.12em]'} font-medium text-white/80 hover:text-white transition-colors border-b border-white/[0.06]`}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        .burger-line { transition: all 0.3s ease; }
        .burger-open .burger-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .burger-open .burger-line:nth-child(2) { opacity: 0; }
        .burger-open .burger-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
      `}</style>
    </header>
  )
}
