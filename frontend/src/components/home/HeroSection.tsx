import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a3a6b] to-[#0a1628]" />
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-white/90 text-sm font-medium">Pakistan's #1 Northern Tours Company</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Discover the
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Majestic North
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience the breathtaking beauty of Gilgit-Baltistan, Hunza, Skardu and beyond. 
          Premium tours crafted for unforgettable memories.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/tours"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            Explore Tours 🏔️
          </Link>
          <Link
            to="/contact"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Contact Us ✉️
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection