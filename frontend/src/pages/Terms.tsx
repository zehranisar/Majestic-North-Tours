import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Terms = () => {
  const sections = [
    {
      title: '1. Booking and Payment',
      content: [
        'All bookings require a 30% non-refundable deposit to secure your reservation.',
        'The remaining balance must be paid at least 14 days before the tour departure date.',
        'Payments can be made via JazzCash, EasyPaisa, bank transfer, or cash at our office.',
        'Bookings are confirmed only after receipt of the deposit and written confirmation from Majestic North Tours.',
      ]
    },
    {
      title: '2. Cancellation Policy',
      content: [
        'Cancellations made more than 30 days before departure: 70% refund (excluding deposit).',
        'Cancellations made 15-30 days before departure: 50% refund (excluding deposit).',
        'Cancellations made less than 15 days before departure: No refund.',
        'No refunds will be given for no-shows or early departures.',
        'The 30% deposit is non-refundable under all circumstances.',
      ]
    },
    {
      title: '3. Tour Changes',
      content: [
        'Majestic North Tours reserves the right to modify itineraries due to weather, road conditions, or safety concerns.',
        'In case of significant changes, customers will be notified as soon as possible.',
        'We are not responsible for delays or cancellations caused by natural disasters, political unrest, or other force majeure events.',
      ]
    },
    {
      title: '4. Responsibilities',
      content: [
        'Travelers are responsible for obtaining valid travel documents including visas and permits.',
        'Majestic North Tours is not liable for loss, damage, or theft of personal belongings.',
        'Travelers are advised to obtain comprehensive travel insurance before departure.',
        'All travelers must disclose any medical conditions that may affect participation in tour activities.',
      ]
    },
    {
      title: '5. Code of Conduct',
      content: [
        'Travelers must respect local customs, traditions, and religious practices.',
        'Any behavior that endangers other travelers or local communities will result in immediate removal from the tour without refund.',
        'Environmental responsibility is expected — no littering or damage to natural sites.',
      ]
    },
    {
      title: '6. Privacy Policy',
      content: [
        'We collect personal information solely for booking and communication purposes.',
        'Your information will never be sold or shared with third parties without your consent.',
        'We may use your email to send tour updates, promotions, and newsletters. You may opt out at any time.',
        'All payment information is handled securely and is not stored on our servers.',
      ]
    },
    {
      title: '7. Liability',
      content: [
        'Majestic North Tours acts as an agent for transportation, accommodation, and activity providers.',
        'We are not liable for any injury, death, property damage, or loss arising from participation in any tour.',
        'Maximum liability is limited to the total tour price paid by the traveler.',
      ]
    },
    {
      title: '8. Contact for Disputes',
      content: [
        'Any disputes should be reported in writing within 30 days of the tour completion.',
        'Contact us at: info@majesticnorthtours.com or call +92 355 4252699.',
        'We are committed to resolving all disputes fairly and promptly.',
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Hero */}
      <div
        className="relative h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-[#0d1f3c]/80" />
        <div className="relative z-10 text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-4 tracking-widest uppercase">
            Legal
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Terms & Conditions
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/60 mt-3 text-sm">Last updated: July 2026</motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <p className="text-blue-800 text-sm leading-relaxed">
            Please read these Terms and Conditions carefully before booking any tour with Majestic North Tours. By making a booking, you agree to be bound by these terms. If you have any questions, contact us at <strong>+92 355 4252699</strong> or <strong>info@majesticnorthtours.com</strong>.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
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
          <p className="text-white font-semibold mb-2">Have Questions About Our Terms?</p>
          <p className="text-white/60 text-sm mb-4">Our team is happy to clarify anything before you book.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="bg-[#c0392b] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors text-sm">
              Contact Us
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