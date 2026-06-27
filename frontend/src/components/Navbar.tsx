import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg' : 'bg-[#0a1628]'}`}>

      <div className="bg-[#1a3a6b] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-blue-200 text-xs">📞 +92 300 1234567</span>
            <span className="text-blue-200 text-xs">✉️ info@majesticnorthtours.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-200 text-xs">🌐 EN</span>
            <span className="text-blue-200 text-xs">اردو</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">

          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-[#1a3a6b] rounded-lg flex items-center justify-center">
              <span className="text-xl">🏔️</span>
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none tracking-wide">Majestic North</p>
              <p className="text-blue-300 text-xs leading-none tracking-widest uppercase mt-0.5">Tours & Travel</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative group ${location.pathname === link.path ? 'text-blue-400' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-200 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              to="/tours"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Book Now ✈️
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-xl">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

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
            <Link to="/tours" className="block mt-3 mx-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center">
              Book Now ✈️
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar