import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Terms = () => {
  const { i18n } = useTranslation()
  const isUrdu = i18n.language === 'ur'

  const sections = [
    {
      title: isUrdu ? '1. بکنگ اور ادائیگی' : '1. Booking and Payment',
      content: isUrdu ? [
        'تمام بکنگ کے لیے آپ کی ریزرویشن کو محفوظ کرنے کے لیے 30% غیر قابل واپسی ڈپازٹ درکار ہے۔',
        'باقی رقم ٹور کی روانگی کی تاریخ سے کم از کم 14 دن پہلے ادا کی جانی چاہیے۔',
        'ادائیگی جاز کیش، ایزی پیسہ، بینک ٹرانسفر یا دفتر میں نقد کے ذریعے کی جا سکتی ہے۔',
        'بکنگ صرف ڈپازٹ کی وصولی اور میجسٹک نارتھ ٹورز کی تحریری تصدیق کے بعد مستحکم ہوتی ہے۔',
      ] : [
        'All bookings require a 30% non-refundable deposit to secure your reservation.',
        'The remaining balance must be paid at least 14 days before the tour departure date.',
        'Payments can be made via JazzCash, EasyPaisa, bank transfer, or cash at our office.',
        'Bookings are confirmed only after receipt of the deposit and written confirmation from Majestic North Tours.',
      ]
    },
    {
      title: isUrdu ? '2. منسوخی پالیسی' : '2. Cancellation Policy',
      content: isUrdu ? [
        'روانگی سے 30 دن سے زیادہ پہلے منسوخی: 70% رقم واپس (ڈپازٹ کے علاوہ)۔',
        'روانگی سے 15-30 دن پہلے منسوخی: 50% رقم واپس (ڈپازٹ کے علاوہ)۔',
        'روانگی سے 15 دن سے کم پہلے منسوخی: کوئی رقم واپس نہیں۔',
        'غیر حاضری یا قبل از وقت روانگی کے لیے کوئی رقم واپس نہیں دی جائے گی۔',
        '30% ڈپازٹ تمام حالات میں غیر قابل واپسی ہے۔',
      ] : [
        'Cancellations made more than 30 days before departure: 70% refund (excluding deposit).',
        'Cancellations made 15-30 days before departure: 50% refund (excluding deposit).',
        'Cancellations made less than 15 days before departure: No refund.',
        'No refunds will be given for no-shows or early departures.',
        'The 30% deposit is non-refundable under all circumstances.',
      ]
    },
    {
      title: isUrdu ? '3. ٹور میں تبدیلیاں' : '3. Tour Changes',
      content: isUrdu ? [
        'میجسٹک نارتھ ٹورز موسم، سڑک کی صورتحال یا حفاظتی خدشات کی وجہ سے سفری پروگرام میں تبدیلی کا حق محفوظ رکھتا ہے۔',
        'اہم تبدیلیوں کی صورت میں، صارفین کو جتنی جلدی ممکن ہو آگاہ کیا جائے گا۔',
        'ہم قدرتی آفات، سیاسی بدامنی یا دیگر ناگہانی واقعات کی وجہ سے تاخیر یا منسوخی کے ذمہ دار نہیں ہیں۔',
      ] : [
        'Majestic North Tours reserves the right to modify itineraries due to weather, road conditions, or safety concerns.',
        'In case of significant changes, customers will be notified as soon as possible.',
        'We are not responsible for delays or cancellations caused by natural disasters, political unrest, or other force majeure events.',
      ]
    },
    {
      title: isUrdu ? '4. ذمہ داریاں' : '4. Responsibilities',
      content: isUrdu ? [
        'مسافر درست سفری دستاویزات بشمول ویزا اور پرمٹ حاصل کرنے کے ذمہ دار ہیں۔',
        'میجسٹک نارتھ ٹورز ذاتی سامان کے نقصان، خرابی یا چوری کا ذمہ دار نہیں ہے۔',
        'مسافروں کو روانگی سے پہلے جامع سفری انشورنس لینے کی سفارش کی جاتی ہے۔',
        'تمام مسافروں کو ٹور سرگرمیوں میں شرکت کو متاثر کرنے والی کوئی بھی طبی حالت ظاہر کرنی چاہیے۔',
      ] : [
        'Travelers are responsible for obtaining valid travel documents including visas and permits.',
        'Majestic North Tours is not liable for loss, damage, or theft of personal belongings.',
        'Travelers are advised to obtain comprehensive travel insurance before departure.',
        'All travelers must disclose any medical conditions that may affect participation in tour activities.',
      ]
    },
    {
      title: isUrdu ? '5. ضابطہ اخلاق' : '5. Code of Conduct',
      content: isUrdu ? [
        'مسافروں کو مقامی رسوم، روایات اور مذہبی طریقوں کا احترام کرنا چاہیے۔',
        'کوئی بھی ایسا رویہ جو دوسرے مسافروں یا مقامی کمیونٹی کو خطرے میں ڈالے، بغیر رقم واپسی کے فوری اخراج کا باعث بنے گا۔',
        'ماحولیاتی ذمہ داری کی توقع ہے — قدرتی مقامات پر کوئی کوڑا نہیں ڈالنا۔',
      ] : [
        'Travelers must respect local customs, traditions, and religious practices.',
        'Any behavior that endangers other travelers or local communities will result in immediate removal from the tour without refund.',
        'Environmental responsibility is expected — no littering or damage to natural sites.',
      ]
    },
    {
      title: isUrdu ? '6. رازداری کی پالیسی' : '6. Privacy Policy',
      content: isUrdu ? [
        'ہم ذاتی معلومات صرف بکنگ اور مواصلات کے مقاصد کے لیے جمع کرتے ہیں۔',
        'آپ کی معلومات آپ کی رضامندی کے بغیر کبھی تیسرے فریق کو فروخت یا شیئر نہیں کی جائے گی۔',
        'ہم آپ کی ای میل کو ٹور اپڈیٹس، پروموشنز اور نیوزلیٹر بھیجنے کے لیے استعمال کر سکتے ہیں۔',
        'تمام ادائیگی کی معلومات محفوظ طریقے سے ہینڈل کی جاتی ہے۔',
      ] : [
        'We collect personal information solely for booking and communication purposes.',
        'Your information will never be sold or shared with third parties without your consent.',
        'We may use your email to send tour updates, promotions, and newsletters. You may opt out at any time.',
        'All payment information is handled securely and is not stored on our servers.',
      ]
    },
    {
      title: isUrdu ? '7. ذمہ داری' : '7. Liability',
      content: isUrdu ? [
        'میجسٹک نارتھ ٹورز نقل و حمل، رہائش اور سرگرمی فراہم کنندگان کے لیے ایجنٹ کے طور پر کام کرتا ہے۔',
        'ہم کسی بھی ٹور میں شرکت سے پیدا ہونے والی چوٹ، موت، جائیداد کے نقصان کے ذمہ دار نہیں ہیں۔',
        'زیادہ سے زیادہ ذمہ داری مسافر کی ادا کردہ کل ٹور قیمت تک محدود ہے۔',
      ] : [
        'Majestic North Tours acts as an agent for transportation, accommodation, and activity providers.',
        'We are not liable for any injury, death, property damage, or loss arising from participation in any tour.',
        'Maximum liability is limited to the total tour price paid by the traveler.',
      ]
    },
    {
      title: isUrdu ? '8. تنازعات کے لیے رابطہ' : '8. Contact for Disputes',
      content: isUrdu ? [
        'کوئی بھی تنازعہ ٹور کی تکمیل کے 30 دن کے اندر تحریری طور پر رپورٹ کیا جانا چاہیے۔',
        'ہم سے رابطہ کریں: info@majesticnorthtours.com یا +92 355 4252699۔',
        'ہم تمام تنازعات کو منصفانہ اور فوری طور پر حل کرنے کے لیے پرعزم ہیں۔',
      ] : [
        'Any disputes should be reported in writing within 30 days of the tour completion.',
        'Contact us at: info@majesticnorthtours.com or call +92 355 4252699.',
        'We are committed to resolving all disputes fairly and promptly.',
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <div
        className="relative h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0d1f3c]/80" />
        <div className="relative z-10 text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-4 tracking-widest uppercase">
            {isUrdu ? 'قانونی' : 'Legal'}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/60 mt-3 text-sm">
            {isUrdu ? 'آخری تازہ کاری: جولائی 2026' : 'Last updated: July 2026'}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <p className="text-blue-800 text-sm leading-relaxed">
            {isUrdu
              ? 'براہ کرم میجسٹک نارتھ ٹورز کے ساتھ کوئی بھی ٹور بک کرنے سے پہلے ان شرائط و ضوابط کو غور سے پڑھیں۔ بکنگ کر کے، آپ ان شرائط سے متفق ہوتے ہیں۔ سوالات کے لیے ہم سے رابطہ کریں: +92 355 4252699'
              : 'Please read these Terms and Conditions carefully before booking any tour with Majestic North Tours. By making a booking, you agree to be bound by these terms. If you have any questions, contact us at +92 355 4252699 or info@majesticnorthtours.com.'}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.content.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-[#c0392b] font-bold mt-0.5 flex-shrink-0">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-[#0d1f3c] rounded-2xl p-6 text-center">
          <p className="text-white font-semibold mb-2">
            {isUrdu ? 'ہماری شرائط کے بارے میں سوالات ہیں؟' : 'Have Questions About Our Terms?'}
          </p>
          <p className="text-white/60 text-sm mb-4">
            {isUrdu ? 'ہماری ٹیم بکنگ سے پہلے کچھ بھی واضح کرنے کے لیے خوش ہے۔' : 'Our team is happy to clarify anything before you book.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="bg-[#c0392b] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors text-sm">
              {isUrdu ? 'رابطہ کریں' : 'Contact Us'}
            </Link>
            <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors text-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms