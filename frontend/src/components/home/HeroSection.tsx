import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1920&q=90&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/55 to-[#0d1f3c]/90" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
        style={{ paddingTop: '120px', paddingBottom: '60px' }}
      >

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white/90 text-sm font-medium">Pakistan's #1 Northern Tours Company</span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {t('heroTitle')}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {t('heroSubtitle')}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('heroDesc')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            to="/tours"
            className="bg-gradient-to-r from-[#c0392b] to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            {t('exploreTours')} 🏔️
          </Link>
          <Link
            to="/contact"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
          >
            {t('contactUs')} ✉️
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { number: '500+', label: t('happyTravelers') },
            { number: '12+', label: t('tourPackages') },
            { number: '10+', label: t('yearsExperience') },
            { number: '15+', label: t('destinations') },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{s.number}</p>
              <p className="text-blue-300 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection