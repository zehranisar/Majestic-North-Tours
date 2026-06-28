const WhyChooseUs = () => {
  const reasons = [
    { icon: '🛡️', title: 'Safe & Secure', desc: 'All tours are fully insured with experienced guides for your safety.' },
    { icon: '💰', title: 'Best Price', desc: 'Competitive pricing with no hidden charges. Value for money guaranteed.' },
    { icon: '🌟', title: 'Expert Guides', desc: 'Local expert guides with 10+ years of experience in northern Pakistan.' },
    { icon: '📱', title: '24/7 Support', desc: 'Round the clock customer support throughout your journey.' },
    { icon: '🚌', title: 'Comfortable Travel', desc: 'Premium vehicles and comfortable accommodations at every stop.' },
    { icon: '📸', title: 'Memorable Experience', desc: 'Carefully crafted itineraries for the most memorable experiences.' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Why Us</span>
          <h2 className="text-4xl font-bold text-[#0a1628] mt-2 mb-4">Why Choose Majestic North?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We provide the best travel experience in Northern Pakistan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-2xl hover:bg-blue-50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">{reason.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-[#0a1628] mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs