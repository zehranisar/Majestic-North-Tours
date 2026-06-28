import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const FeaturedTours = () => {
  const [tours, setTours] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tours/featured')
      .then(res => setTours(res.data))
      .catch(() => setTours([]))
  }, [])

  const demoTours = [
    { id: 1, name: 'Hunza Valley Tour', duration_days: 7, price: 150000, region: 'Hunza', image_url: '🏔️' },
    { id: 2, name: 'Skardu Adventure', duration_days: 5, price: 95000, region: 'Skardu', image_url: '⛰️' },
    { id: 3, name: 'Fairy Meadows Trek', duration_days: 3, price: 95000, region: 'Diamer', image_url: '🌄' },
  ]

  const displayTours = tours.length > 0 ? tours : demoTours

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Tours</span>
          <h2 className="text-4xl font-bold text-[#0a1628] mt-2 mb-4">Featured Packages</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Handpicked tours for the most memorable experience in Northern Pakistan</p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTours.map((tour: any) => (
            <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              
              {/* Image */}
              <div className="h-52 bg-gradient-to-br from-[#1a3a6b] to-blue-500 flex items-center justify-center">
                <span className="text-7xl">{tour.image_url}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{tour.region}</span>
                  <span className="text-xs text-gray-400">{tour.duration_days} Days</span>
                </div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-3">{tour.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Starting from</span>
                    <p className="text-xl font-bold text-blue-600">PKR {tour.price?.toLocaleString()}</p>
                  </div>
                  <Link
                    to={`/tours/${tour.id}`}
                    className="bg-[#0a1628] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 border-2 border-[#0a1628] text-[#0a1628] px-8 py-3 rounded-full font-semibold hover:bg-[#0a1628] hover:text-white transition-all duration-300"
          >
            View All Tours →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedTours