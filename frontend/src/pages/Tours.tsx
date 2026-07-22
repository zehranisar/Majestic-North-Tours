import { API_URL } from '../config'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import axios from 'axios'

interface Tour {
  id: number
  name: string
  duration_days: number
  price: number
  region: string
  difficulty: string
  max_people: number
  is_featured: boolean
  image_url: string
  description: string
}

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const demoTours: Tour[] = [
  { id: 1, name: 'Hunza Valley Tour', duration_days: 7, price: 75000, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: true, image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop', description: 'Experience the breathtaking beauty of Hunza Valley with stunning landscapes and rich culture.' },
  { id: 2, name: 'Skardu Adventure', duration_days: 5, price: 47500, region: 'Skardu', difficulty: 'Moderate', max_people: 4, is_featured: true, image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fit=crop', description: 'Explore the majestic Skardu region, gateway to K2 and crystal clear lakes.' },
  { id: 3, name: 'Fairy Meadows Trek', duration_days: 3, price: 47500, region: 'Diamer', difficulty: 'Hard', max_people: 4, is_featured: true, image_url: 'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=600&q=80&fit=crop', description: 'Trek to the magical Fairy Meadows near Nanga Parbat - the Killer Mountain.' },
  { id: 4, name: 'Deosai Plains Tour', duration_days: 3, price: 35000, region: 'Skardu', difficulty: 'Easy', max_people: 5, is_featured: false, image_url: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80&fit=crop', description: 'Visit the worlds second highest plateau famous for Himalayan brown bears.' },
  { id: 5, name: 'Naltar Valley Tour', duration_days: 3, price: 37500, region: 'Gilgit', difficulty: 'Easy', max_people: 5, is_featured: false, image_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&fit=crop', description: 'Discover the stunning Naltar Valley famous for its colorful lakes and pine forests.' },
  { id: 6, name: 'Attabad Lake Tour', duration_days: 1, price: 17500, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: false, image_url: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=600&q=80&fit=crop', description: 'Visit the stunning turquoise Attabad Lake formed after a massive landslide in 2010.' },
  { id: 7, name: 'Shigar Valley Tour', duration_days: 4, price: 32500, region: 'Skardu', difficulty: 'Easy', max_people: 4, is_featured: false, image_url: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600&q=80&fit=crop', description: 'Explore the ancient Shigar Valley with its magnificent fort and traditional Balti culture.' },
  { id: 8, name: 'Rama Meadows Tour', duration_days: 2, price: 30000, region: 'Astore', difficulty: 'Moderate', max_people: 4, is_featured: false, image_url: 'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=600&q=80&fit=crop', description: 'Trek to Rama Meadows with breathtaking views of Nanga Parbat.' },
  { id: 9, name: 'Passu Cones and Glacier', duration_days: 4, price: 42500, region: 'Hunza', difficulty: 'Moderate', max_people: 4, is_featured: false, image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&fit=crop', description: 'Experience the iconic Passu Cathedral Cones and Batura Glacier.' },
  { id: 10, name: 'Khaplu Highlights', duration_days: 4, price: 42500, region: 'Ghanche', difficulty: 'Easy', max_people: 5, is_featured: false, image_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80&fit=crop', description: 'Explore the beautiful Khaplu Valley and magnificent Khaplu Palace.' },
  { id: 11, name: 'Thagas Valley Tour', duration_days: 5, price: 50000, region: 'Ghanche', difficulty: 'Moderate', max_people: 4, is_featured: false, image_url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80&fit=crop', description: 'Discover the hidden Thagas Valley, one of the least explored valleys in GB.' },
  { id: 12, name: 'Chitral and Kalash', duration_days: 5, price: 60000, region: 'Chitral', difficulty: 'Easy', max_people: 5, is_featured: false, image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80&fit=crop', description: 'Visit the unique Kalash people and experience their colorful culture and traditions.' },
]

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([])
  const [filtered, setFiltered] = useState<Tour[]>([])
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState('default')

  const regions = ['All', 'Hunza', 'Skardu', 'Gilgit', 'Diamer', 'Ghanche', 'Astore', 'Chitral']

  useEffect(() => {
    axios.get(`${API_URL}/api/tours`)
      .then(res => {
        const data = res.data.length > 0 ? res.data : demoTours
        setTours(data)
        setFiltered(data)
      })
      .catch(() => {
        setTours(demoTours)
        setFiltered(demoTours)
      })
  }, [])

  useEffect(() => {
    let result: Tour[] = [...tours]
    if (region !== 'All') result = result.filter(t => t.region === region)
    if (search) result = result.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'price_low') result.sort((a, b) => a.price - b.price)
    if (sort === 'price_high') result.sort((a, b) => b.price - a.price)
    if (sort === 'duration') result.sort((a, b) => a.duration_days - b.duration_days)
    setFiltered(result)
  }, [search, region, sort, tours])

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-100 text-green-700'
    if (d === 'Moderate') return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Full Page Hero */}
      <div
        className="relative min-h-screen flex flex-col justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/75 via-[#0d1f3c]/60 to-[#0d1f3c]/92" />

        <div className="relative z-10 text-center px-6 pt-32 pb-20 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-5 tracking-widest uppercase">
              Explore Pakistan
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Tour Packages
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/78 text-xl max-w-2xl mx-auto mb-10"
          >
            Discover the breathtaking beauty of Northern Pakistan with our carefully crafted tour packages
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-8 mb-12"
          >
            {[{ n: '12+', l: 'Tour Packages' }, { n: '500+', l: 'Happy Travelers' }, { n: '10+', l: 'Years Experience' }].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-bold text-2xl">{s.n}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
          >
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Search tours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white transition-all"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="default" className="text-gray-800">Sort By</option>
                <option value="price_low" className="text-gray-800">Price: Low to High</option>
                <option value="price_high" className="text-gray-800">Price: High to Low</option>
                <option value="duration" className="text-gray-800">Duration</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${region === r ? 'bg-[#c0392b] text-white shadow-md' : 'bg-white/15 text-white hover:bg-white/25'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-sm mb-8 font-medium">{filtered.length} tours found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour, i) => (
            <FadeIn key={tour.id} delay={(i % 3) * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <img
                    src={tour.image_url}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {tour.is_featured && (
                    <span className="absolute top-3 left-3 bg-[#c0392b] text-white text-xs px-3 py-1 rounded-full font-medium">Featured</span>
                  )}
                  <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${difficultyColor(tour.difficulty)}`}>
                    {tour.difficulty}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{tour.region}</span>
                    <span className="text-xs text-gray-400">{tour.duration_days} Days</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1f3c] mb-2">{tour.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{tour.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span>👥 Max {tour.max_people} people</span>
                    <span>📅 {tour.duration_days} days</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400">Starting from</span>
                      <p className="text-xl font-bold text-[#c0392b]">PKR {tour.price?.toLocaleString()}</p>
                      <span className="text-xs text-gray-400">per person</span>
                    </div>
                    <Link
                      to={`/tours/${tour.id}`}
                      className="bg-[#1a3a6b] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c0392b] transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl">🔍</span>
            <p className="text-gray-500 mt-4 font-medium">No tours found. Try different filters.</p>
          </div>
        )}

        {/* Custom Tour CTA */}
        <FadeIn>
          <div className="mt-20 relative rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f3c]/95 to-[#1a3a6b]/80" />
            <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="inline-block bg-[#c0392b] text-white text-xs px-3 py-1 rounded-full font-medium mb-4">Custom Tour</span>
                <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Can't Find Your Perfect Tour?
                </h2>
                <p className="text-white/70 max-w-xl leading-relaxed">
                  We create fully customized tours tailored to your preferences, budget, and schedule. Tell us your dream trip and we will make it happen!
                </p>
                <div className="flex flex-wrap gap-4 mt-5">
                  {['Choose Your Destinations', 'Pick Your Dates', 'Set Your Budget', 'We Handle Everything'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="text-green-400 font-bold">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
  
  <a href="https://wa.me/923251002509?text=Hi! I would like to create a custom tour package." target="_blank"rel="noreferrer"className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all hover:-translate-y-0.5 shadow-lg text-center whitespace-nowrap" >
  
  WhatsApp for Custom Tour
  </a>
  <Link
    to="/contact"
    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-center whitespace-nowrap"
  >
    Send Inquiry
  </Link>
            </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default Tours