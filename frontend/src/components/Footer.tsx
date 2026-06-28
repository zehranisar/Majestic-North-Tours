import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

const Footer = () => {
  return (
    <footer className="bg-[#0d1f3c] text-white">

      {/* Main Footer */}
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
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {['Facebook', 'Instagram', 'WhatsApp', 'YouTube'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors text-xs">
                  {s[0]}
                </a>
              ))}
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
                'Hunza Valley Tour',
                'Skardu Adventure',
                'Fairy Meadows Trek',
                'Deosai Plains',
                'Naltar Valley',
                'Attabad Lake',
              ].map((tour) => (
                <li key={tour}>
                  <Link to="/tours" className="text-white/60 text-sm hover:text-white hover:pl-1 transition-all duration-200">
                    → {tour}
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
                <span className="text-white/60 text-sm">Skardu, Gilgit-Baltistan, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c0392b]">📞</span>
                <span className="text-white/60 text-sm">+92 300 1234567</span>
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

            {/* Book Now CTA */}
            <Link
              to="/tours"
              className="inline-block mt-6 bg-[#c0392b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Book a Tour
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © 2026 Majestic North Tours. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer