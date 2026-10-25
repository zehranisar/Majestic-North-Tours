import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
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
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const About = () => {
  const { t, i18n } = useTranslation()
  const isUrdu = i18n.language === 'ur'

  const stats = [
    { number: 500, suffix: '+', label: t('happyTravelers'), icon: '😊' },
    { number: 50, suffix: '+', label: t('tourPackages'), icon: '🏔️' },
    { number: 10, suffix: '+', label: t('yearsExperience'), icon: '⭐' },
    { number: 15, suffix: '+', label: t('destinations'), icon: '📍' },
  ]

  const team = [
    { name: 'Muhammad Ali', role: isUrdu ? 'بانی اور سی ای او' : 'Founder & CEO', icon: '👨‍💼', desc: isUrdu ? 'گلگت بلتستان میں پیدا اور پرورش پائے، سیاحت میں 15+ سال کا تجربہ۔' : 'Born and raised in Gilgit-Baltistan with 15+ years of experience in tourism.' },
    { name: 'Sara Khan', role: isUrdu ? 'ٹور مینیجر' : 'Tour Manager', icon: '👩‍💼', desc: isUrdu ? 'بین الاقوامی سیاحوں کے لیے ذاتی سفری پروگرام بنانے میں ماہر۔' : 'Expert in crafting personalized itineraries for international tourists.' },
    { name: 'Ahmed Karim', role: isUrdu ? 'لیڈ گائیڈ' : 'Lead Guide', icon: '🧗', desc: isUrdu ? 'شمالی پاکستان کے گہرے علم کے ساتھ سرٹیفائیڈ ماؤنٹین گائیڈ۔' : 'Certified mountain guide with deep knowledge of northern Pakistan.' },
    { name: 'Fatima Zahra', role: isUrdu ? 'کسٹمر ریلیشنز' : 'Customer Relations', icon: '👩‍💻', desc: isUrdu ? 'ہر مسافر کے لیے بہترین تجربہ یقینی بنانے کے لیے پرعزم۔' : 'Dedicated to ensuring every traveler has a seamless experience.' },
  ]

  const values = [
    { icon: '🛡️', title: isUrdu ? 'حفاظت سب سے پہلے' : 'Safety First', desc: isUrdu ? 'ہر ٹور تجربہ کار گائیڈز کے ساتھ حفاظتی پروٹوکول کے ساتھ منصوبہ بندی کی جاتی ہے۔' : 'Every tour is carefully planned with safety protocols and experienced guides.' },
    { icon: '🌿', title: isUrdu ? 'ماحول دوست' : 'Eco-Friendly', desc: isUrdu ? 'ہم پائیدار سیاحت اور قدرتی ماحول کے تحفظ کے لیے پرعزم ہیں۔' : 'We are committed to sustainable tourism and protecting natural environments.' },
    { icon: '🤝', title: isUrdu ? 'مقامی کمیونٹی' : 'Local Community', desc: isUrdu ? 'ہم مقامی گائیڈز اور خدمات کو ملازمت دے کر مقامی کمیونٹی کی حمایت کرتے ہیں۔' : 'We support local communities by employing local guides and using local services.' },
    { icon: '💯', title: isUrdu ? 'اصلیت' : 'Authenticity', desc: isUrdu ? 'ہم مسافروں کو مقامی ثقافت سے جوڑنے والے حقیقی تجربات فراہم کرتے ہیں۔' : 'We provide genuine experiences that connect travelers with local culture.' },
    { icon: '🌟', title: isUrdu ? 'بہترین معیار' : 'Excellence', desc: isUrdu ? 'ہم اپنی خدمات کے ہر پہلو میں بہترین معیار کے لیے کوشاں ہیں۔' : 'We strive for excellence in every aspect of our service delivery.' },
    { icon: '❤️', title: isUrdu ? 'جذبہ' : 'Passion', desc: isUrdu ? 'شمالی پاکستان سے ہماری محبت ہمیں اس کی خوبصورتی دنیا کے ساتھ بانٹنے پر مجبور کرتی ہے۔' : 'Our love for northern Pakistan drives us to share its beauty with the world.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/55 to-[#0d1f3c]/90" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-6 tracking-widest uppercase">
              {isUrdu ? 'ہمارے بارے میں' : 'About Us'}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isUrdu ? 'پاکستان کی بہترین' : "Pakistan's Premier"}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2">
              {isUrdu ? 'سیاحتی کمپنی' : 'Tourism Company'}
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            {isUrdu ? 'ہم شمالی پاکستان کی دلکش خوبصورتی کو دنیا بھر کے مسافروں تک پہنچانے کے لیے پرجوش ہیں۔' : 'We are passionate about showcasing the breathtaking beauty of Northern Pakistan to travelers from around the world.'}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-blue-300 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">{t('ourStory')}</span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isUrdu ? 'جذبے سے جنم لیا سفر' : 'A Journey Born from Passion'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                {isUrdu ? 'میجسٹک نارتھ ٹورز کی بنیاد 2014 میں گلگت بلتستان کے پرجوش مقامی لوگوں نے رکھی جو اپنے وطن کی خوبصورتی دنیا کے ساتھ بانٹنا چاہتے تھے۔' : 'Majestic North Tours was founded in 2014 by a group of passionate locals from Gilgit-Baltistan who wanted to share the incredible beauty of their homeland with the world.'}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                {isUrdu ? 'گزشتہ دہائی میں ہم نے پاکستان اور دنیا بھر سے ہزاروں مسافروں کے لیے کامیاب ٹور منظم کیے ہیں۔' : 'Over the past decade, we have successfully organized tours for thousands of travelers from Pakistan and around the world.'}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                {isUrdu ? 'ہمارا یقین ہے کہ سفر صرف جگہوں کو دیکھنے سے زیادہ ہے — یہ فطرت، ثقافت اور لوگوں کے ساتھ بامعنی تعلقات بنانے کے بارے میں ہے۔' : 'We believe that travel is more than just visiting places — it is about creating meaningful connections with nature, culture, and people.'}
              </p>
              <Link to="/tours" className="inline-block bg-[#c0392b] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg">
                {t('exploreOurTours')}
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
                    { n: '500+', l: t('happyTravelers') },
                    { n: '10+', l: t('yearsExperience') },
                    { n: '50+', l: t('tourPackages') },
                    { n: '15+', l: t('destinations') },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4">
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

      {/* Values */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">
                {isUrdu ? 'ہم کس کے لیے کھڑے ہیں' : 'What We Stand For'}
              </span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('ourValues')}</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                {isUrdu ? 'وہ اصول جو ہر کام میں ہماری رہنمائی کرتے ہیں' : 'The principles that guide everything we do'}
              </p>
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
              <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">
                {isUrdu ? 'ہمارے لوگ' : 'Our People'}
              </span>
              <h2 className="text-4xl font-bold text-[#0d1f3c] mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('meetTeam')}</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                {isUrdu ? 'پرجوش مقامی لوگ جو آپ کو بہترین تجربہ دینے کے لیے پرعزم ہیں' : 'Passionate locals dedicated to giving you the best experience'}
              </p>
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

      {/* Why Choose Us */}
      <div
        className="relative py-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0d1f3c]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-14">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">
                {isUrdu ? 'ہمیں کیوں' : 'Why Us'}
              </span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t('whyChooseUs')}
              </h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: isUrdu ? 'ایوارڈ یافتہ' : 'Award Winning', desc: isUrdu ? '3 مسلسل سالوں کے لیے گلگت بلتستان کی بہترین سیاحتی کمپنی کے طور پر تسلیم کیا گیا۔' : 'Recognized as the best tourism company in Gilgit-Baltistan for 3 consecutive years.' },
              { icon: '🌍', title: isUrdu ? 'بین الاقوامی معیار' : 'International Standards', desc: isUrdu ? 'ہماری خدمات سرٹیفائیڈ گائیڈز اور آلات کے ساتھ بین الاقوامی سیاحتی معیار پر پوری اترتی ہیں۔' : 'Our services meet international tourism standards with certified guides and equipment.' },
              { icon: '📞', title: isUrdu ? '24/7 سپورٹ' : '24/7 Support', desc: isUrdu ? 'ہماری ٹیم آپ کے ٹور سے پہلے، دوران اور بعد میں مدد کے لیے ہر وقت دستیاب ہے۔' : 'Our team is available round the clock to assist you before, during and after your tour.' },
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
              {isUrdu ? 'شمالی پاکستان دریافت کرنے کے لیے تیار ہیں؟' : 'Ready to Explore Northern Pakistan?'}
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              {isUrdu ? 'ہزاروں خوش مسافروں میں شامل ہوں جنہوں نے شمال کا جادو تجربہ کیا ہے۔' : 'Join thousands of happy travelers who have experienced the magic of the north with us.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tours" className="bg-[#c0392b] text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                {t('browseTourPackages')}
              </Link>
              <Link to="/contact" className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-10 py-4 rounded-full font-bold hover:bg-[#1a3a6b] hover:text-white transition-all duration-300 hover:-translate-y-0.5">
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  )
}

export default About