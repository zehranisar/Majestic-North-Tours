const Testimonials = () => {
  const testimonials = [
    { name: 'Ahmed Khan', country: '🇵🇰 Pakistan', rating: 5, tour: 'Hunza Valley Tour', comment: 'Absolutely breathtaking experience! The team was professional and the views were incredible. Highly recommended!' },
    { name: 'Sarah Johnson', country: '🇬🇧 UK', rating: 5, tour: 'Skardu Adventure', comment: 'Best trip of my life! The guides were knowledgeable and the accommodation was great. Will definitely come back!' },
    { name: 'Marco Rossi', country: '🇮🇹 Italy', rating: 5, tour: 'Fairy Meadows Trek', comment: 'Magical place! Majestic North made everything so easy and comfortable. The service was top notch!' },
  ]

  return (
    <section className="py-20 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-4">What Our Travelers Say</h2>
          <p className="text-white/60 max-w-xl mx-auto">Real experiences from our happy travelers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">"{t.comment}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.country}</p>
                </div>
                <span className="text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">{t.tour}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials