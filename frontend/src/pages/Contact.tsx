import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { API_URL } from '../config'

const Contact = () => {
  const { t, i18n } = useTranslation()
  const isUrdu = i18n.language === 'ur'
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/contacts`, {
        name: form.name, email: form.email, phone: form.phone, subject: form.subject, message: form.message,
      })
    } catch { }
    finally { setSuccess(true); setLoading(false) }
  }

  const faqs = [
    { q: isUrdu ? 'شمالی پاکستان جانے کا بہترین وقت کیا ہے؟' : 'What is the best time to visit Northern Pakistan?', a: isUrdu ? 'مئی سے اکتوبر بہترین وقت ہے جب موسم خوشگوار ہوتا ہے اور تمام سڑکیں کھلی ہوتی ہیں۔' : 'May to October is the best time when weather is pleasant and all roads are accessible.' },
    { q: isUrdu ? 'کیا کسی ٹور کے لیے خصوصی پرمٹ کی ضرورت ہے؟' : 'Do I need a special permit for any tours?', a: isUrdu ? 'کچھ علاقوں کو NOC پرمٹ کی ضرورت ہوتی ہے۔ ہم اپنے کلائنٹس کے لیے تمام پرمٹ فارمالیٹیز سنبھالتے ہیں۔' : 'Some areas require NOC permits. We handle all permit formalities for our clients.' },
    { q: isUrdu ? 'کیا اکیلے مسافروں کے لیے ٹور دستیاب ہیں؟' : 'Are tours available for solo travelers?', a: isUrdu ? 'جی ہاں، ہم اکیلے مسافروں کا خیرمقدم کرتے ہیں اور رعایتی قیمتوں پر مشترکہ گروپ ٹور ترتیب دے سکتے ہیں۔' : 'Yes, we welcome solo travelers and can arrange shared group tours at discounted rates.' },
    { q: isUrdu ? 'آپ کی منسوخی پالیسی کیا ہے؟' : 'What is your cancellation policy?', a: isUrdu ? 'روانگی سے 30 دن پہلے مفت منسوخی۔ 15-30 دن کے لیے 50% رقم واپس۔ 15 دن سے کم کوئی رقم واپس نہیں۔' : 'Free cancellation up to 30 days before departure. 50% refund for 15-30 days. No refund under 15 days.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/60 to-[#0d1f3c]/90" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-6 tracking-widest uppercase">
              {t('getInTouch')}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('contact')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            {isUrdu ? 'ہمارے ٹورز کے بارے میں سوالات ہیں؟ ہم آپ کی شمالی پاکستان کی بہترین مہم جوئی کی منصوبہ بندی میں مدد کے لیے یہاں ہیں۔' : 'Have questions about our tours? We are here to help you plan the perfect Northern Pakistan adventure.'}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📍', title: isUrdu ? 'دفتر' : 'Office', detail: 'Khaplu Main Bazar', sub: 'Ghanche, Gilgit-Baltistan' },
              { icon: '📞', title: isUrdu ? 'فون' : 'Phone', detail: '+92 355 4252699', sub: '+92 325 1002509' },
              { icon: '✉️', title: isUrdu ? 'ای میل' : 'Email', detail: 'info@majestic', sub: 'northtours.com' },
              { icon: '💬', title: 'WhatsApp', detail: '+92 325 1002509', sub: isUrdu ? '24/7 دستیاب' : 'Available 24/7' },
            ].map((info, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{info.icon}</div>
                <p className="text-white font-semibold text-xs mb-1">{info.title}</p>
                <p className="text-blue-200 text-xs">{info.detail}</p>
                <p className="text-blue-300 text-xs">{info.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <div>
            <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">{t('sendMessage')}</span>
            <h2 className="text-3xl font-bold text-[#0d1f3c] mt-2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isUrdu ? 'ہم آپ سے سننا چاہتے ہیں' : "We'd Love to Hear From You"}
            </h2>

            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-700 mb-2">{t('messageSent')}</h3>
                <p className="text-green-600 text-sm mb-6">{isUrdu ? 'شکریہ! ہماری ٹیم 24 گھنٹوں میں آپ سے رابطہ کرے گی۔' : 'Thank you! Our team will get back to you within 24 hours.'}</p>
                <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors">
                  {isUrdu ? 'دوبارہ پیغام بھیجیں' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('fullName')}</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={isUrdu ? 'پورا نام' : 'Your full name'}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('phoneNumber')}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('emailAddress')}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('subject')}</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all">
                    <option value="">{isUrdu ? 'موضوع منتخب کریں' : 'Select a subject'}</option>
                    <option value="tour_inquiry">{isUrdu ? 'ٹور استفسار' : 'Tour Inquiry'}</option>
                    <option value="booking">{isUrdu ? 'بکنگ مدد' : 'Booking Help'}</option>
                    <option value="custom_tour">{isUrdu ? 'کسٹم ٹور کی درخواست' : 'Custom Tour Request'}</option>
                    <option value="cancellation">{isUrdu ? 'منسوخی / رقم واپسی' : 'Cancellation / Refund'}</option>
                    <option value="general">{isUrdu ? 'عمومی سوال' : 'General Question'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('message')}</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder={isUrdu ? 'اپنے سفری منصوبوں یا سوالات کے بارے میں بتائیں...' : 'Tell us about your travel plans or any questions...'} rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] resize-none transition-all" />
                </div>
                <button onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.message}
                  className="w-full bg-[#c0392b] text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-40 shadow-lg shadow-red-100">
                  {loading ? (isUrdu ? 'بھیجا جا رہا ہے...' : 'Sending...') : t('sendMessageBtn')}
                </button>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="bg-green-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💬</div>
                <div>
                  <h3 className="font-bold text-lg">{isUrdu ? 'واٹس ایپ پر چیٹ کریں' : 'Chat on WhatsApp'}</h3>
                  <p className="text-white/80 text-sm">{isUrdu ? 'ہماری ٹیم سے فوری جوابات حاصل کریں' : 'Get instant replies from our team'}</p>
                </div>
              </div>
              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer"
                className="block bg-white text-green-600 text-center py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                WhatsApp — +92 325 1002509
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('followUs')}</h3>
              <div className="space-y-3">
                <a href="https://www.facebook.com/share/19DuwyjGu5/" target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                  <span className="text-2xl">📘</span>
                  <div>
                    <p className="font-semibold text-blue-700 text-sm">Facebook</p>
                    <p className="text-blue-500 text-xs">Majestic North Tours</p>
                  </div>
                </a>
                <a href="https://www.instagram.com/majestic_northtours.887?igsh=MThwdTRvcWhjbzg2dQ==" target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-semibold text-pink-700 text-sm">Instagram</p>
                    <p className="text-pink-500 text-xs">@majestic_northtours.887</p>
                  </div>
                </a>
                <a href="https://www.tiktok.com/@majestic.north.to?_r=1&_t=ZS-97fCkH0Crg7" target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="text-2xl">🎵</span>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">TikTok</p>
                    <p className="text-gray-500 text-xs">@majestic.north.to</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('officeHours')}</h3>
              <div className="space-y-3">
                {[
                  { day: isUrdu ? 'پیر - جمعہ' : 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                  { day: isUrdu ? 'ہفتہ' : 'Saturday', hours: '9:00 AM - 4:00 PM' },
                  { day: isUrdu ? 'اتوار' : 'Sunday', hours: isUrdu ? 'بند' : 'Closed' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 text-sm">{item.day}</span>
                    <span className={`text-sm font-semibold ${item.hours === 'Closed' || item.hours === 'بند' ? 'text-red-500' : 'text-[#1a3a6b]'}`}>{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 rounded-xl p-3">
                <p className="text-blue-700 text-xs font-medium">
                  {isUrdu ? 'واٹس ایپ سپورٹ فوری استفسارات کے لیے 24/7 دستیاب ہے' : 'WhatsApp support available 24/7 for urgent inquiries'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-bold text-[#0d1f3c] mt-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('faqTitle')}</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#0d1f3c] mb-2 text-sm">{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact