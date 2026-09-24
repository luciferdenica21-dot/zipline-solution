import { useState, useEffect } from 'react'
import Logo from '../assets/logobrand.svg'

const navItems = [
  { id: 'about', label: 'ОБО МНЕ' },
  { id: 'products', label: 'СНАРЯЖЕНИЯ' },
  { id: 'contacts', label: 'КОНТАКТЫ' },
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Header() {
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
                className="group relative text-[12px] font-medium tracking-[0.12em] text-white/70 hover:text-white transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => scrollTo('contacts')}
              className="btn-glass-orange rounded-lg !px-3 !py-1.5 !text-[11px] !border-green-500/55 !text-green-400 !bg-green-500/10"
            >
              Связаться со мной
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 ${open ? 'burger-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Меню"
            aria-expanded={open}
          >
            <span className="burger-line w-5 h-px bg-white mb-1.5"></span>
            <span className="burger-line w-5 h-px bg-white mb-1.5"></span>
            <span className="burger-line w-5 h-px bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        } bg-black/95 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="px-4 py-3 text-[13px] tracking-[0.12em] font-medium text-white/80 hover:text-white transition-colors border-b border-white/[0.06]"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => scrollTo('contacts')}
            className="btn-glass-orange mt-3 rounded-lg w-full justify-center !py-3 !border-green-500/55 !text-green-400 !bg-green-500/10"
          >
            Связаться со мной
          </button>
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
