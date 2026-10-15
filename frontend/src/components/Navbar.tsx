import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.jpeg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const isUrdu = i18n.language === 'ur'

  const toggleLanguage = () => {
    i18n.changeLanguage(isUrdu ? 'en' : 'ur')
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('tours'), path: '/tours' },
    { name: t('about'), path: '/about' },
    { name: t('blog'), path: '/blog' },
    { name: t('contact'), path: '/contact' },
    { name: t('terms'), path: '/terms' },
    { name: 'Reviews', path: '/reviews' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a3a6b]/98 backdrop-blur-md shadow-lg' : 'bg-[#1a3a6b]'}`}
      dir={isUrdu ? 'rtl' : 'ltr'}
    >

      {/* Top Bar */}
      <div className="bg-[#c0392b] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-white text-xs">📞 +92 355 4252699</span>
            <span className="text-white text-xs">✉️ info@majesticnorthtours.com</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white text-xs hover:text-white/80 transition-colors"
            >
              <span className={!isUrdu ? 'font-bold' : 'text-white/60'}>EN</span>
              <span className="text-white/40">|</span>
              <span className={isUrdu ? 'font-bold' : 'text-white/60'}>اردو</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Majestic North Tours"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
            />
            <div>
              <p className="text-white font-bold text-base leading-none tracking-wide">Majestic North</p>
              <p className="text-red-300 text-xs leading-none tracking-widest uppercase mt-0.5">Tours & Travel</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative group ${location.pathname === link.path ? 'text-red-400' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-400 transition-all duration-200 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Book Now + Language Toggle */}
          <div className="hidden md:flex items-center gap-3">
            
            <Link
              to="/tours"
              className="bg-[#c0392b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              {t('bookNow')} ✈️
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-xl">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-sm text-white/80 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 mx-4 mt-3">
              <button
                onClick={toggleLanguage}
                className="text-white/70 text-xs border border-white/20 px-3 py-2 rounded-full"
              >
                {isUrdu ? 'English' : 'اردو'}
              </button>
              <Link to="/tours" className="flex-1 bg-[#c0392b] text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center">
                {t('bookNow')} ✈️
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar