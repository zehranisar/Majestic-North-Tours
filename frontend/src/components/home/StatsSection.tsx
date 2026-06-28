const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Happy Travelers', icon: '😊' },
    { number: '50+', label: 'Tour Packages', icon: '🏔️' },
    { number: '10+', label: 'Years Experience', icon: '⭐' },
    { number: '15+', label: 'Destinations', icon: '📍' },
  ]

  return (
    <section className="bg-[#0a1628] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-blue-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection