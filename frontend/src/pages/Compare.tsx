import { useState } from 'react'
import { Link } from 'react-router-dom'

const allTours = [
  { id: 1, name: 'Hunza Valley Tour', duration_days: 7, price: 75000, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: true, description: 'Experience the breathtaking beauty of Hunza Valley.', inclusions: ['Transport', 'Hotel 6 nights', 'Daily breakfast', 'Expert guide', 'All sightseeing'], image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop' },
  { id: 2, name: 'Skardu Adventure', duration_days: 5, price: 47500, region: 'Skardu', difficulty: 'Moderate', max_people: 4, is_featured: true, description: 'Explore the majestic Skardu region gateway to K2.', inclusions: ['Transport', 'Hotel 4 nights', 'Daily breakfast', 'Expert guide', 'All sightseeing'], image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop' },
  { id: 3, name: 'Fairy Meadows Trek', duration_days: 3, price: 47500, region: 'Diamer', difficulty: 'Hard', max_people: 4, is_featured: true, description: 'Trek to magical Fairy Meadows near Nanga Parbat.', inclusions: ['Transport', 'Camping equipment', 'Daily breakfast', 'Trek guide', 'Porter'], image: 'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=400&q=80&fit=crop' },
  { id: 4, name: 'Deosai Plains Tour', duration_days: 3, price: 35000, region: 'Skardu', difficulty: 'Easy', max_people: 5, is_featured: false, description: 'Visit worlds second highest plateau at 4114m.', inclusions: ['Transport', 'Hotel', 'Daily breakfast', 'Guide', 'Park entry'], image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&q=80&fit=crop' },
  { id: 5, name: 'Naltar Valley Tour', duration_days: 3, price: 37500, region: 'Gilgit', difficulty: 'Easy', max_people: 5, is_featured: false, description: 'Discover stunning Naltar Valley colorful lakes.', inclusions: ['Transport', 'Hotel', 'Daily breakfast', 'Guide', 'Jeep safari'], image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop' },
  { id: 6, name: 'Attabad Lake Tour', duration_days: 1, price: 17500, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: false, description: 'Visit stunning turquoise Attabad Lake.', inclusions: ['Transport', 'Boat ride', 'Guide', 'Breakfast'], image: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400&q=80&fit=crop' },
  { id: 7, name: 'Shigar Valley Tour', duration_days: 4, price: 32500, region: 'Skardu', difficulty: 'Easy', max_people: 4, is_featured: false, description: 'Explore ancient Shigar Valley with magnificent fort.', inclusions: ['Transport', 'Hotel', 'Daily breakfast', 'Guide', 'Fort entry'], image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=400&q=80&fit=crop' },
  { id: 8, name: 'Rama Meadows Tour', duration_days: 2, price: 30000, region: 'Astore', difficulty: 'Moderate', max_people: 4, is_featured: false, description: 'Trek to Rama Meadows with views of Nanga Parbat.', inclusions: ['Transport', 'Camping', 'Daily breakfast', 'Guide', 'Porter'], image: 'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=400&q=80&fit=crop' },
  { id: 9, name: 'Passu Cones and Glacier', duration_days: 4, price: 42500, region: 'Hunza', difficulty: 'Moderate', max_people: 4, is_featured: false, description: 'Experience iconic Passu Cones and Batura Glacier.', inclusions: ['Transport', 'Hotel', 'Daily breakfast', 'Guide', 'Glacier equipment'], image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80&fit=crop' },
  { id: 10, name: 'Khaplu Highlights', duration_days: 4, price: 42500, region: 'Ghanche', difficulty: 'Easy', max_people: 5, is_featured: false, description: 'Explore beautiful Khaplu Valley and Palace.', inclusions: ['Transport', 'Hotel', 'Daily breakfast', 'Guide', 'Palace entry'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop' },
  { id: 11, name: 'Thagas Valley Tour', duration_days: 5, price: 50000, region: 'Ghanche', difficulty: 'Moderate', max_people: 4, is_featured: false, description: 'Discover pristine Thagas Valley untouched nature.', inclusions: ['Transport', 'Camping', 'Daily breakfast', 'Guide', 'Porter'], image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=80&fit=crop' },
  { id: 12, name: 'Chitral and Kalash', duration_days: 5, price: 60000, region: 'Chitral', difficulty: 'Easy', max_people: 5, is_featured: false, description: 'Visit unique Kalash people and colorful culture.', inclusions: ['Transport', 'Hotel', 'Daily breakfast', 'Guide', 'Cultural tour'], image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop' },
]

const difficultyColor = (d: string) => {
  if (d === 'Easy') return 'text-green-600 bg-green-100'
  if (d === 'Moderate') return 'text-yellow-600 bg-yellow-100'
  return 'text-red-600 bg-red-100'
}

const Compare = () => {
  const [selected, setSelected] = useState<number[]>([])
  const [showCompare, setShowCompare] = useState(false)

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id))
    } else if (selected.length < 3) {
      setSelected([...selected, id])
    }
  }

  const selectedTours = allTours.filter(t => selected.includes(t.id))

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-4 tracking-widest uppercase">Compare</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Compare Tour Packages
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Select up to 3 tours to compare side by side and find the perfect package for you.
          </p>
          {selected.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-white/80 text-sm">{selected.length}/3 tours selected</span>
              {selected.length >= 2 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="bg-[#c0392b] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-colors text-sm"
                >
                  Compare Now →
                </button>
              )}
              <button
                onClick={() => setSelected([])}
                className="bg-white/10 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white/20 transition-colors text-sm"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {showCompare && selectedTours.length >= 2 && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-[#0d1f3c] text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>Comparison Results</h2>
              <button onClick={() => setShowCompare(false)} className="text-gray-400 hover:text-gray-600 text-sm">Close ✕</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold text-gray-500 text-sm w-36">Feature</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                          <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <p className="font-bold text-[#0d1f3c] text-sm">{t.name}</p>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Price/Person</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <span className="text-lg font-bold text-[#c0392b]">PKR {t.price.toLocaleString()}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Duration</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <span className="font-semibold text-[#0d1f3c]">{t.duration_days} Days</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Region</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{t.region}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Difficulty</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor(t.difficulty)}`}>{t.difficulty}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Max People</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <span className="font-semibold text-[#0d1f3c]">{t.max_people} Persons</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Featured</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        {t.is_featured ? <span className="text-green-500 font-bold">✓ Yes</span> : <span className="text-gray-400">— No</span>}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Inclusions</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <ul className="text-xs text-gray-600 space-y-1">
                          {t.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-center justify-center gap-1">
                              <span className="text-green-500">✓</span> {inc}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-4 text-sm text-gray-500 font-semibold">Action</td>
                    {selectedTours.map(t => (
                      <td key={t.id} className="p-4 text-center">
                        <Link to={`/tours/${t.id}`}
                          className="inline-block bg-[#c0392b] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-red-700 transition-colors">
                          Book Now
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tour Selection Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-gray-500 text-sm mb-6 font-medium">
          {selected.length === 0 ? 'Select tours to compare' : `${selected.length}/3 selected — ${selected.length >= 2 ? 'ready to compare!' : 'select at least 2'}`}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTours.map(tour => {
            const isSelected = selected.includes(tour.id)
            const isDisabled = !isSelected && selected.length >= 3
            return (
              <div
                key={tour.id}
                onClick={() => !isDisabled && toggleSelect(tour.id)}
                className={`bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-200 cursor-pointer ${
                  isSelected ? 'ring-2 ring-[#c0392b] shadow-xl scale-105' : isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-[#c0392b] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                  {tour.is_featured && (
                    <span className="absolute top-3 left-3 bg-[#c0392b] text-white text-xs px-2 py-0.5 rounded-full font-medium">Featured</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{tour.region}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-[#0d1f3c] text-sm mb-2">{tour.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-[#c0392b]">PKR {tour.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">{tour.duration_days} Days • per person</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#c0392b] border-[#c0392b]' : 'border-gray-300'}`}>
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0d1f3c] border-t border-white/10 py-4 px-6 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-sm">{selected.length} tour{selected.length > 1 ? 's' : ''} selected:</span>
              {selectedTours.map(t => (
                <span key={t.id} className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">{t.name}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelected([])} className="text-white/60 text-sm hover:text-white transition-colors">Clear</button>
              {selected.length >= 2 && (
                <button
                  onClick={() => { setShowCompare(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="bg-[#c0392b] text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors text-sm"
                >
                  Compare {selected.length} Tours →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Compare