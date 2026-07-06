import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

const Footer = () => {
  return (
    <footer className="bg-[#0d1f3c] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Majestic North Tours" className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
              <div>
                <p className="font-bold text-base leading-none">Majestic North</p>
                <p className="text-red-400 text-xs tracking-widest uppercase mt-0.5">Tours & Travel</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Pakistan's premier tourism company specializing in Northern Pakistan tours since 2014.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/share/19DuwyjGu5/" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors text-xs">F</a>
              <a href="https://www.instagram.com/majestic_northtours.887?igsh=MThwdTRvcWhjbzg2dQ==" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors text-xs">I</a>
              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors text-xs">W</a>
              <a href="https://www.tiktok.com/@majestic.north.to?_r=1&_t=ZS-97fCkH0Crg7" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors text-xs">T</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/90">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Tours', path: '/tours' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' },
                { name: 'Terms & Conditions', path: '/terms' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/60 text-sm hover:text-white hover:pl-1 transition-all duration-200">
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/90">Popular Tours</h3>
            <ul className="space-y-3">
              {[
                { name: 'Hunza Valley Tour', id: 1 },
                { name: 'Skardu Adventure', id: 2 },
                { name: 'Fairy Meadows Trek', id: 3 },
                { name: 'Deosai Plains', id: 4 },
                { name: 'Naltar Valley', id: 5 },
                { name: 'Attabad Lake', id: 6 },
              ].map((tour) => (
                <li key={tour.id}>
                  <Link to={`/tours/${tour.id}`} className="text-white/60 text-sm hover:text-white hover:pl-1 transition-all duration-200">
                    → {tour.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/90">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#c0392b] mt-0.5">📍</span>
                <span className="text-white/60 text-sm">Khaplu Main Bazar, Ghanche, Gilgit-Baltistan</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c0392b]">📞</span>
                <span className="text-white/60 text-sm">+92 355 4252699</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c0392b]">📞</span>
                <span className="text-white/60 text-sm">+92 325 1002509</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c0392b]">✉️</span>
                <span className="text-white/60 text-sm">info@majesticnorthtours.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c0392b]">🕐</span>
                <span className="text-white/60 text-sm">Mon - Sat: 9AM - 6PM</span>
              </li>
            </ul>
            <Link to="/tours" className="inline-block mt-6 bg-[#c0392b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">
              Book a Tour
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">© 2026 Majestic North Tours. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-white/40 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/40 text-sm hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/terms" className="text-white/40 text-sm hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer