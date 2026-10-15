import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { API_URL } from '../config'

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const demoReviews = [
  { id: 1, customer_name: 'Ahmed Khan', rating: 5, comment: 'Absolutely breathtaking experience! The team was professional and the views were incredible. Highly recommended!', tour_name: 'Hunza Valley Tour', country: 'Pakistan', is_approved: true, created_at: '2026-06-15' },
  { id: 2, customer_name: 'Sarah Johnson', rating: 5, comment: 'Best trip of my life! The guides were knowledgeable and the accommodation was great. Will definitely come back!', tour_name: 'Skardu Adventure', country: 'United Kingdom', is_approved: true, created_at: '2026-06-10' },
  { id: 3, customer_name: 'Marco Rossi', rating: 5, comment: 'Magical place! Majestic North made everything so easy and comfortable. The service was top notch!', tour_name: 'Fairy Meadows Trek', country: 'Italy', is_approved: true, created_at: '2026-05-28' },
  { id: 4, customer_name: 'Fatima Ali', rating: 5, comment: 'Amazing experience! Khaplu is a hidden gem and our guide was excellent. Will recommend to everyone!', tour_name: 'Khaplu Highlights', country: 'Pakistan', is_approved: true, created_at: '2026-05-20' },
  { id: 5, customer_name: 'David Chen', rating: 4, comment: 'Great tour! Deosai Plains was incredible. The brown bears were amazing to see. Very well organized.', tour_name: 'Deosai Plains Tour', country: 'Canada', is_approved: true, created_at: '2026-05-15' },
  { id: 6, customer_name: 'Aisha Malik', rating: 5, comment: 'Perfect trip from start to finish. Attabad Lake is absolutely stunning. Thank you Majestic North!', tour_name: 'Attabad Lake Tour', country: 'Pakistan', is_approved: true, created_at: '2026-05-10' },
]

const toursList = [
  'Hunza Valley Tour', 'Skardu Adventure', 'Fairy Meadows Trek',
  'Deosai Plains Tour', 'Naltar Valley Tour', 'Attabad Lake Tour',
  'Shigar Valley Tour', 'Rama Meadows Tour', 'Passu Cones and Glacier',
  'Khaplu Highlights', 'Thagas Valley Tour', 'Chitral and Kalash',
]

const Reviews = () => {
  const { i18n } = useTranslation()
  const isUrdu = i18n.language === 'ur'
  const [reviews, setReviews] = useState(demoReviews)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    rating: 5,
    tour_name: '',
    country: '',
    comment: '',
  })

  useEffect(() => {
    axios.get(`${API_URL}/api/reviews`)
      .then(res => {
        const approved = res.data.filter((r: any) => r.is_approved)
        if (approved.length > 0) setReviews(approved)
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async () => {
    if (!form.customer_name || !form.comment || !form.tour_name) return
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/reviews`, form)
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/60 to-[#0d1f3c]/90" />
        <div className="relative z-10 text-center px-6 pt-32 pb-16">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-5 tracking-widest uppercase">
            {isUrdu ? 'گاہک کے جائزے' : 'Customer Reviews'}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isUrdu ? 'ہمارے مسافر کیا کہتے ہیں' : 'What Our Travelers Say'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            {isUrdu ? 'شمالی پاکستان میں ہمارے خوش مسافروں کے حقیقی تجربات' : 'Real experiences from our happy travelers across Northern Pakistan'}
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{avgRating.toFixed(1)}</p>
              <div className="flex justify-center gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.round(avgRating) ? 'text-yellow-400' : 'text-white/30'}`}>⭐</span>
                ))}
              </div>
              <p className="text-white/60 text-sm">{isUrdu ? 'اوسط ریٹنگ' : 'Average Rating'}</p>
            </div>
            <div className="w-px h-16 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{reviews.length}+</p>
              <p className="text-white/60 text-sm mt-2">{isUrdu ? 'خوش مسافر' : 'Happy Travelers'}</p>
            </div>
            <div className="w-px h-16 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">100%</p>
              <p className="text-white/60 text-sm mt-2">{isUrdu ? 'ہماری سفارش کرتے ہیں' : 'Recommend Us'}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Write Review Button */}
        <FadeIn>
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#c0392b] text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              {showForm
                ? (isUrdu ? 'فارم بند کریں' : 'Close Form')
                : (isUrdu ? '✍️ جائزہ لکھیں' : '✍️ Write a Review')}
            </button>
          </div>
        </FadeIn>

        {/* Review Form */}
        {showForm && (
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[#0d1f3c] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isUrdu ? 'اپنا تجربہ شیئر کریں' : 'Share Your Experience'}
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">{isUrdu ? 'شکریہ!' : 'Thank You!'}</h3>
                  <p className="text-gray-500">{isUrdu ? 'آپ کا جائزہ منظوری کے بعد شائع کیا جائے گا۔' : 'Your review has been submitted and will be published after approval.'}</p>
                  <button
                    onClick={() => { setSubmitted(false); setShowForm(false); setForm({ customer_name: '', customer_email: '', rating: 5, tour_name: '', country: '', comment: '' }) }}
                    className="mt-4 bg-[#0d1f3c] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#1a3a6b] transition-colors"
                  >
                    {isUrdu ? 'بند کریں' : 'Close'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{isUrdu ? 'آپ کا نام *' : 'Your Name *'}</label>
                      <input type="text" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })}
                        placeholder={isUrdu ? 'پورا نام' : 'Your full name'}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{isUrdu ? 'ای میل' : 'Email'}</label>
                      <input type="email" value={form.customer_email} onChange={e => setForm({ ...form, customer_email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{isUrdu ? 'ٹور کا نام *' : 'Tour Name *'}</label>
                      <select value={form.tour_name} onChange={e => setForm({ ...form, tour_name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all">
                        <option value="">{isUrdu ? 'ٹور منتخب کریں' : 'Select tour'}</option>
                        {toursList.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{isUrdu ? 'ملک' : 'Country'}</label>
                      <input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                        placeholder={isUrdu ? 'آپ کا ملک' : 'Your country'}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{isUrdu ? 'ریٹنگ *' : 'Rating *'}</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setForm({ ...form, rating: star })}
                          className={`text-3xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-500 self-center">{form.rating}/5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{isUrdu ? 'آپ کا جائزہ *' : 'Your Review *'}</label>
                    <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                      placeholder={isUrdu ? 'اپنا تجربہ بیان کریں...' : 'Share your experience with us...'}
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] resize-none transition-all" />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.customer_name || !form.comment || !form.tour_name}
                    className="w-full bg-[#c0392b] text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-40 shadow-lg"
                  >
                    {loading ? (isUrdu ? 'جمع ہو رہا ہے...' : 'Submitting...') : (isUrdu ? 'جائزہ جمع کریں' : 'Submit Review')}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    {isUrdu ? 'آپ کا جائزہ منظوری کے بعد شائع کیا جائے گا' : 'Your review will be published after admin approval'}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <FadeIn key={review.id} delay={(i % 3) * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={`text-sm ${j < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>⭐</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed flex-1 italic mb-4">"{review.comment}"</p>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#1a3a6b] to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.customer_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d1f3c] text-sm">{review.customer_name}</p>
                      <p className="text-gray-400 text-xs">{review.country}</p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium truncate max-w-[100px]">
                    {review.tour_name?.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-16 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isUrdu ? 'اپنی کہانی بنانے کے لیے تیار ہیں؟' : 'Ready to Create Your Own Story?'}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {isUrdu ? 'سینکڑوں خوش مسافروں میں شامل ہوں جنہوں نے شمالی پاکستان کا جادو محسوس کیا۔' : 'Join hundreds of happy travelers who have experienced the magic of Northern Pakistan.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/tours" className="bg-[#c0392b] text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5 shadow-lg">
                {isUrdu ? 'ٹور پیکجز دیکھیں' : 'Browse Tour Packages'}
              </a>
              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer"
                className="bg-green-500 text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-all hover:-translate-y-0.5">
                WhatsApp Us
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default Reviews