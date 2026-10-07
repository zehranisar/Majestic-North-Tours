import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const Home = () => {
  const { t } = useTranslation()

  const stats = [
    { number: '500+', label: t('happyTravelers') },
    { number: '12+', label: t('tourPackages') },
    { number: '10+', label: t('yearsExperience') },
    { number: '15+', label: t('destinations') },
  ]

  const featuredTours = [
    { id: 1, name: 'Hunza Valley Tour', duration: 7, price: 75000, region: 'Hunza', difficulty: 'Easy', image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/hunza1.webp' },
    { id: 2, name: 'Skardu Adventure', duration: 5, price: 47500, region: 'Skardu', difficulty: 'Moderate', image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/skardu1.jpg' },
    { id: 3, name: 'Fairy Meadows Trek', duration: 3, price: 47500, region: 'Diamer', difficulty: 'Hard', image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/fm1.jpg' },
  ]

  const whyUs = [
    { icon: '🛡️', title: 'Safe & Secure', desc: 'All tours are fully insured with experienced guides for your safety.' },
    { icon: '💰', title: 'Best Price', desc: 'Competitive pricing with no hidden charges. Value for money guaranteed.' },
    { icon: '🌟', title: 'Expert Guides', desc: 'Local expert guides with 10+ years of experience in northern Pakistan.' },
    { icon: '📱', title: '24/7 Support', desc: 'Round the clock customer support throughout your journey.' },
    { icon: '🚌', title: 'Comfortable Travel', desc: 'Premium vehicles and comfortable accommodations at every stop.' },
    { icon: '📸', title: 'Memorable Experience', desc: 'Carefully crafted itineraries for the most memorable experiences.' },
  ]

  const testimonials = [
    { name: 'Ahmed Khan', country: '🇵🇰 Pakistan', rating: 5, tour: 'Hunza Valley Tour', comment: 'Absolutely breathtaking experience! The team was professional and the views were incredible. Highly recommended!' },
    { name: 'Sarah Johnson', country: '🇬🇧 United Kingdom', rating: 5, tour: 'Skardu Adventure', comment: 'Best trip of my life! The guides were knowledgeable and the accommodation was great. Will definitely come back!' },
    { name: 'Marco Rossi', country: '🇮🇹 Italy', rating: 5, tour: 'Fairy Meadows Trek', comment: 'Magical place! Majestic North made everything so easy and comfortable. The service was top notch!' },
  ]

  return (
    <div className="w-full overflow-hidden">

      {/* HERO */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/55 to-[#0d1f3c]/90" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full" style={{ paddingTop: '120px', paddingBottom: '60px' }}>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white/90 text-sm font-medium">Pakistan's #1 Northern Tours Company</span>
            </span>
          </motion.div>

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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t('heroDesc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/tours" className="bg-gradient-to-r from-[#c0392b] to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-1 transition-all duration-300">
              {t('exploreTours')} 🏔️
            </Link>
            <Link to="/contact" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300">
              {t('contactUs')} ✉️
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{s.number}</p>
                <p className="text-blue-300 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FEATURED TOURS */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">{t('tours')}</span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t('featuredPackages')}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">Handpicked tours for the most memorable experience in Northern Pakistan</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map((tour, i) => (
              <FadeIn key={tour.id} delay={i * 0.15}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#c0392b] text-white text-xs px-3 py-1 rounded-full font-medium">Featured</span>
                    <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {tour.difficulty}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{tour.region}</span>
                      <span className="text-xs text-gray-400">{tour.duration} {t('days')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0d1f3c] mb-4">{tour.name}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400">{t('startingFrom')}</span>
                        <p className="text-xl font-bold text-[#c0392b]">PKR {tour.price.toLocaleString()}</p>
                        <span className="text-xs text-gray-400">{t('perPerson')}</span>
                      </div>
                      <Link to={`/tours/${tour.id}`} className="bg-[#1a3a6b] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c0392b] transition-colors duration-200">
                        {t('viewDetails')}
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <Link to="/tours" className="inline-flex items-center gap-2 border-2 border-[#1a3a6b] text-[#1a3a6b] px-10 py-3.5 rounded-full font-bold hover:bg-[#1a3a6b] hover:text-white transition-all duration-300">
                {t('viewAllTours')} →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">Why Us</span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Why Choose Majestic North?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">We provide the best travel experience in Northern Pakistan</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex gap-4 p-6 rounded-2xl hover:bg-blue-50 transition-colors duration-300 group h-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0d1f3c] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div
        className="relative py-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0d1f3c]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                What Our Travelers Say
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">Real experiences from our happy travelers</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">⭐</span>)}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">"{t.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-white/50 text-xs">{t.country}</p>
                    </div>
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">{t.tour}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <FadeIn>
        <div className="py-20 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready for Your Next Adventure?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Book your dream tour to Northern Pakistan today and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tours" className="bg-[#c0392b] text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                Browse All Tours
              </Link>
              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer" className="bg-green-500 text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </FadeIn>

    </div>
  )
}

export default Home