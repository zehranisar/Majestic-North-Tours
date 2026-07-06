import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView} from 'framer-motion'
import logo from '../assets/logo.jpeg'

const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const About = () => {
  const stats = [
    { number: 500, suffix: '+', label: 'Happy Travelers', icon: '😊' },
    { number: 50, suffix: '+', label: 'Tour Packages', icon: '🏔️' },
    { number: 10, suffix: '+', label: 'Years Experience', icon: '⭐' },
    { number: 15, suffix: '+', label: 'Destinations', icon: '📍' },
  ]

  const team = [
    { name: 'Muhammad Ali', role: 'Founder & CEO', icon: '👨‍💼', desc: 'Born and raised in Gilgit-Baltistan with 15+ years of experience in tourism.' },
    { name: 'Sara Khan', role: 'Tour Manager', icon: '👩‍💼', desc: 'Expert in crafting personalized itineraries for international tourists.' },
    { name: 'Ahmed Karim', role: 'Lead Guide', icon: '🧗', desc: 'Certified mountain guide with deep knowledge of northern Pakistan.' },
    { name: 'Fatima Zahra', role: 'Customer Relations', icon: '👩‍💻', desc: 'Dedicated to ensuring every traveler has a seamless experience.' },
  ]

  const values = [
    { icon: '🛡️', title: 'Safety First', desc: 'Every tour is carefully planned with safety protocols and experienced guides.' },
    { icon: '🌿', title: 'Eco-Friendly', desc: 'We are committed to sustainable tourism and protecting natural environments.' },
    { icon: '🤝', title: 'Local Community', desc: 'We support local communities by employing local guides and using local services.' },
    { icon: '💯', title: 'Authenticity', desc: 'We provide genuine experiences that connect travelers with local culture.' },
    { icon: '🌟', title: 'Excellence', desc: 'We strive for excellence in every aspect of our service delivery.' },
    { icon: '❤️', title: 'Passion', desc: 'Our love for northern Pakistan drives us to share its beauty with the world.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Full Page Hero */}
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/55 to-[#0d1f3c]/90" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-6 tracking-widest uppercase">
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Pakistan's Premier
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2">
              Tourism Company
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed mb-14"
          >
            We are passionate about showcasing the breathtaking beauty of Northern Pakistan to travelers from around the world.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-blue-300 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5 mx-auto"
            >
              <div className="w-1.5 h-2.5 bg-white/60 rounded-full" />
            </motion.div>
            <p className="text-white/40 text-xs mt-2">Scroll to explore</p>
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                A Journey Born<br />from Passion
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Majestic North Tours was founded in 2014 by a group of passionate locals from Gilgit-Baltistan who wanted to share the incredible beauty of their homeland with the world. What started as a small operation has grown into Pakistan's most trusted tourism company.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Over the past decade, we have successfully organized tours for thousands of travelers from Pakistan and around the world. Our deep knowledge of the terrain, culture, and people of Northern Pakistan sets us apart.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                We believe that travel is more than just visiting places — it is about creating meaningful connections with nature, culture, and people. Every tour we design reflects this philosophy.
              </p>
              <Link
                to="/tours"
                className="inline-block bg-[#c0392b] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-100 hover:shadow-red-200 hover:-translate-y-0.5"
              >
                Explore Our Tours
              </Link>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#0d1f3c] rounded-3xl p-8 text-center shadow-2xl">
                <img src={logo} alt="Majestic North Tours" className="w-28 h-28 rounded-full object-cover mx-auto mb-5 border-4 border-white/20 shadow-lg" />
                <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Majestic North Tours</h3>
                <p className="text-blue-300 text-sm mb-2">Est. 2014</p>
                <p className="text-blue-400 text-xs mb-6">Khaplu Main Bazar, Ghanche, GB</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: '500+', l: 'Happy Clients' },
                    { n: '10+', l: 'Years Experience' },
                    { n: '50+', l: 'Tour Packages' },
                    { n: '15+', l: 'Destinations' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors">
                      <p className="text-white font-bold text-xl">{item.n}</p>
                      <p className="text-blue-300 text-xs mt-1">{item.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Our Core Values</h2>
              <p className="text-gray-500 max-w-xl mx-auto">The principles that guide everything we do</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">{v.icon}</span>
                  </div>
                  <h3 className="font-bold text-[#0d1f3c] mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">Our People</span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Meet Our Team</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Passionate locals dedicated to giving you the best experience</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1a3a6b] to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{member.icon}</span>
                  </div>
                  <h3 className="font-bold text-[#0d1f3c] mb-1">{member.name}</h3>
                  <p className="text-[#c0392b] text-xs font-semibold mb-3 uppercase tracking-wide">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us - Parallax Background */}
      <div
        className="relative py-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-[#0d1f3c]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-14">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Why Us</span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Why Choose Majestic North?
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'Award Winning', desc: 'Recognized as the best tourism company in Gilgit-Baltistan for 3 consecutive years.' },
              { icon: '🌍', title: 'International Standards', desc: 'Our services meet international tourism standards with certified guides and equipment.' },
              { icon: '📞', title: '24/7 Support', desc: 'Our team is available round the clock to assist you before, during and after your tour.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-5xl mb-5">{item.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <FadeInSection>
        <div className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to Explore Northern Pakistan?
            </h2>
            <p className="text-gray-500 mb-10 text-lg">Join thousands of happy travelers who have experienced the magic of the north with us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tours"
                className="bg-[#c0392b] text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-200 hover:-translate-y-0.5"
              >
                Browse Tour Packages
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-10 py-4 rounded-full font-bold hover:bg-[#1a3a6b] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>

    </div>
  )
}

export default About
