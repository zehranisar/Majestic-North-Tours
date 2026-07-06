import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

interface ItineraryItem {
  day: number
  title: string
  desc: string
}

interface Tour {
  id: number
  name: string
  duration_days: number
  price: number
  region: string
  difficulty: string
  max_people: number
  is_featured: boolean
  description: string
  inclusions: string[]
  exclusions: string[]
  itinerary: ItineraryItem[]
  images: string[]
}

const demoTours: Record<string, Tour> = {
  '1': {
    id: 1, name: 'Hunza Valley Tour', duration_days: 7, price: 150000, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: true,
    description: 'Experience the breathtaking beauty of Hunza Valley, one of the most spectacular regions in the world. Surrounded by some of the highest peaks on earth, Hunza offers stunning landscapes, rich culture, and warm hospitality.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport Islamabad to Hunza return', 'Hotel accommodation 6 nights', 'Daily breakfast', 'Expert local guide', 'All sightseeing and entry fees', 'Jeep safari where required'],
    exclusions: ['Airfare', 'Personal expenses', 'Travel insurance', 'Tips for guides'],
    itinerary: [
      { day: 1, title: 'Islamabad to Besham', desc: 'Depart from Islamabad early morning via Karakoram Highway. Overnight stay in Besham.' },
      { day: 2, title: 'Besham to Gilgit', desc: 'Continue journey northward through Kohistan. Cross Raikot Bridge with views of Nanga Parbat.' },
      { day: 3, title: 'Gilgit to Hunza', desc: 'Arrive in Karimabad. Check in and explore Baltit Fort and Altit Fort.' },
      { day: 4, title: 'Hunza Sightseeing', desc: 'Visit Attabad Lake, Passu Cones, Hussaini Suspension Bridge and Eagles Nest viewpoint.' },
      { day: 5, title: 'Khunjerab Pass', desc: 'Full day trip to Khunjerab Pass at 4693m - the highest paved international border.' },
      { day: 6, title: 'Free Day in Hunza', desc: 'Explore cherry orchards, Ganish village and local markets.' },
      { day: 7, title: 'Return to Islamabad', desc: 'Depart from Hunza. Drive back to Islamabad. Tour ends.' },
    ],
  },
  '2': {
    id: 2, name: 'Skardu Adventure', duration_days: 5, price: 95000, region: 'Skardu', difficulty: 'Moderate', max_people: 4, is_featured: true,
    description: 'Explore the majestic Skardu region, gateway to K2. Experience crystal clear lakes, ancient forts and breathtaking mountain scenery.',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport Islamabad to Skardu return', 'Hotel accommodation 4 nights', 'Daily breakfast', 'Expert guide', 'All sightseeing'],
    exclusions: ['Airfare', 'Personal expenses', 'Travel insurance', 'Tips for guides'],
    itinerary: [
      { day: 1, title: 'Islamabad to Skardu', desc: 'Flight or road journey to Skardu. Check in to hotel.' },
      { day: 2, title: 'Skardu City Tour', desc: 'Visit Kharpocho Fort, Skardu bazaar and local attractions.' },
      { day: 3, title: 'Shangrila Resort', desc: 'Visit Shangrila Resort and Manthokha Waterfall.' },
      { day: 4, title: 'Deosai Plains', desc: 'Full day trip to Deosai National Park.' },
      { day: 5, title: 'Return Journey', desc: 'Depart from Skardu. Tour ends.' },
    ],
  },
  '3': {
    id: 3, name: 'Fairy Meadows Trek', duration_days: 3, price: 95000, region: 'Diamer', difficulty: 'Hard', max_people: 4, is_featured: true,
    description: 'Trek to the magical Fairy Meadows with stunning view of Nanga Parbat - the Killer Mountain. A paradise for trekking enthusiasts.',
    images: [
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport to Raikot Bridge', 'Jeep from Raikot to Tato Village', 'Camping equipment', 'Daily breakfast', 'Expert treck guide', 'Porter services'],
    exclusions: ['Personal trekking gear', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Islamabad to Fairy Meadows', desc: 'Drive to Raikot Bridge. Jeep to Tato Village. Trek to Fairy Meadows. Camp overnight.' },
      { day: 2, title: 'Fairy Meadows Exploration', desc: 'Full day at Fairy Meadows. Optional trek to Nanga Parbat Base Camp.' },
      { day: 3, title: 'Return Journey', desc: 'Sunrise view of Nanga Parbat. Trek back and return to Islamabad.' },
    ],
  },
  '4': {
    id: 4, name: 'Deosai Plains Tour', duration_days: 3, price: 70000, region: 'Skardu', difficulty: 'Easy', max_people: 5, is_featured: false,
    description: 'Visit the worlds second highest plateau, Deosai National Park. Famous for Himalayan brown bears and breathtaking landscapes at 4114m altitude.',
    images: [
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Park entry fee'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Islamabad to Skardu', desc: 'Depart from Islamabad. Arrive Skardu. Check in to hotel.' },
      { day: 2, title: 'Deosai National Park', desc: 'Full day at Deosai Plains. Spot Himalayan brown bears and wildflowers.' },
      { day: 3, title: 'Return Journey', desc: 'Return to Islamabad. Tour ends.' },
    ],
  },
  '5': {
    id: 5, name: 'Naltar Valley Tour', duration_days: 3, price: 75000, region: 'Gilgit', difficulty: 'Easy', max_people: 5, is_featured: false,
    description: 'Discover the stunning Naltar Valley famous for its colorful lakes, pine forests and skiing resort. One of the most beautiful valleys in Gilgit-Baltistan.',
    images: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', ' expert Guide', 'Jeep safari'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Skiing charges'],
    itinerary: [
      { day: 1, title: 'Gilgit to Naltar', desc: 'Depart from Gilgit. Jeep ride to Naltar Valley. Check in to guesthouse.' },
      { day: 2, title: 'Naltar Lakes', desc: 'Visit the famous colorful Naltar Lakes. Photography and nature walk.' },
      { day: 3, title: 'Return to Gilgit', desc: 'Morning at leisure. Return to Gilgit. Tour ends.' },
    ],
  },
  '6': {
    id: 6, name: 'Attabad Lake Tour', duration_days: 1, price: 35000, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: false,
    description: 'Visit the stunning turquoise Attabad Lake formed after a massive landslide in 2010. One of the most photographed lakes in Pakistan.',
    images: [
      'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport from Gilgit', 'Boat ride', 'Guide', 'Breakfast, lunch and dinner'],
    exclusions: ['Personal expenses', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Gilgit to Attabad Lake and Return', desc: 'Depart from Gilgit. Drive to Attabad Lake. Boat ride. Photography. Return to Gilgit.' },
    ],
  },
  '7': {
    id: 7, name: 'Shigar Valley Tour', duration_days: 4, price: 65000, region: 'Skardu', difficulty: 'Easy', max_people: 4, is_featured: false,
    description: 'Explore the ancient Shigar Valley with its magnificent fort, apricot orchards and traditional Balti culture. A hidden gem of Gilgit-Baltistan.',
    images: [
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Fort entry fee'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Skardu to Shigar', desc: 'Depart from Skardu. Arrive Shigar. Check in to Shigar Fort Residence.' },
      { day: 2, title: 'Shigar Fort and Village', desc: 'Visit the historic Shigar Fort. Explore traditional Balti village.' },
      { day: 3, title: 'Apricot Orchards', desc: 'Walk through apricot orchards. Visit local craftsmen.' },
      { day: 4, title: 'Return to Skardu', desc: 'Morning at leisure. Return to Skardu. Tour ends.' },
    ],
  },
  '8': {
    id: 8, name: 'Rama Meadows Tour', duration_days: 2, price: 60000, region: 'Astore', difficulty: 'Moderate', max_people: 4, is_featured: false,
    description: 'Trek to Rama Meadows near Astore Valley with breathtaking views of Nanga Parbat. A paradise for nature lovers and trekkers.',
    images: [
      'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Camping equipment', 'Daily breakfast', 'expert guide', 'Porter'],
    exclusions: ['Personal trekking gear', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Gilgit to Rama Lake', desc: 'Depart from Gilgit. Drive to Astore. Trek to Rama Meadows. Camp overnight.' },
      { day: 2, title: 'Return Journey', desc: 'Morning views of Nanga Parbat. Trek back. Return to Gilgit.' },
    ],
  },
  '9': {
    id: 9, name: 'Passu Cones and Glacier', duration_days: 4, price: 85000, region: 'Hunza', difficulty: 'Moderate', max_people: 4, is_featured: false,
    description: 'Experience the iconic Passu Cathedral Cones and Batura Glacier - one of the longest glaciers outside polar regions.',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Glacier walk equipment'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Gilgit to Passu', desc: 'Depart from Gilgit. Arrive Passu. Evening walk to viewpoint.' },
      { day: 2, title: 'Passu Cones', desc: 'Full day photography and hiking around Passu Cathedral Cones.' },
      { day: 3, title: 'Batura Glacier', desc: 'Trek to Batura Glacier - one of the longest glaciers in the world.' },
      { day: 4, title: 'Return to Gilgit', desc: 'Morning at leisure. Return to Gilgit. Tour ends.' },
    ],
  },
  '10': {
    id: 10, name: 'Khaplu Highlights', duration_days: 4, price: 85000, region: 'Ghanche', difficulty: 'Easy', max_people: 5, is_featured: false,
    description: 'Explore the beautiful Khaplu Valley, home to the magnificent Khaplu Palace and stunning Shyok River views.',
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Palace entry'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Skardu to Khaplu', desc: 'Depart from Skardu. Scenic drive to Khaplu. Check in to hotel.' },
      { day: 2, title: 'Khaplu Palace', desc: 'Visit the historic Khaplu Palace. Explore local bazaar and culture.' },
      { day: 3, title: 'Shyok River', desc: 'Drive along Shyok River. Visit nearby villages and viewpoints.' },
      { day: 4, title: 'Return to Skardu', desc: 'Morning at leisure. Return to Skardu. Tour ends.' },
    ],
  },
  '11': {
    id: 11, name: 'Thagas Valley Tour', duration_days: 5, price: 99999, region: 'Ghanche', difficulty: 'Moderate', max_people: 4, is_featured: false,
    description: 'Discover the hidden Thagas Valley, one of the least explored valleys in Gilgit-Baltistan. Untouched nature and traditional mountain life.',
    images: [
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Camping equipment', 'Daily breakfast', 'Expert guide', 'Porter services'],
    exclusions: ['Personal trekking gear', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Skardu to Khaplu', desc: 'Depart from Skardu. Drive to Khaplu. Overnight stay.' },
      { day: 2, title: 'Khaplu to Thagas', desc: 'Drive and trek into Thagas Valley. Set up camp.' },
      { day: 3, title: 'Thagas Exploration', desc: 'Full day exploring Thagas Valley. Visit local villages.' },
      { day: 4, title: 'Upper Thagas', desc: 'Trek to upper valley. Stunning mountain views.' },
      { day: 5, title: 'Return Journey', desc: 'Trek back and return to Skardu. Tour ends.' },
    ],
  },
  '12': {
    id: 12, name: 'Chitral and Kalash', duration_days: 5, price: 120000, region: 'Chitral', difficulty: 'Easy', max_people: 5, is_featured: false,
    description: 'Visit the unique Kalash people, one of the last pagan tribes of Pakistan. Experience their colorful festivals, traditions and beautiful Chitral Valley.',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Cultural tour'],
    exclusions: ['Airfare', 'Personal expenses', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chitral', desc: 'Flight or road journey to Chitral. Check in to hotel.' },
      { day: 2, title: 'Chitral City Tour', desc: 'Visit Chitral Fort, Shahi Mosque and local bazaar.' },
      { day: 3, title: 'Kalash Valleys', desc: 'Visit Bumburet Valley. Meet Kalash people. Experience unique culture.' },
      { day: 4, title: 'Rambur Valley', desc: 'Visit Rambur Kalash Valley. Photography and cultural immersion.' },
      { day: 5, title: 'Return Journey', desc: 'Depart from Chitral. Return to Islamabad. Tour ends.' },
    ],
  },
}

const TourDetail = () => {
  const { id } = useParams()
  const [tour, setTour] = useState<Tour | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`http://127.0.0.1:8000/api/tours/${id}`)
      .then(res => {
        if (res.data && res.data.id) setTour(res.data)
        else setTour(demoTours[id as string] || demoTours['1'])
      })
      .catch(() => setTour(demoTours[id as string] || demoTours['1']))
      .finally(() => setLoading(false))
  }, [id])

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-100 text-green-700'
    if (d === 'Moderate') return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🏔️</div>
        <p className="text-gray-500">Loading tour details...</p>
      </div>
    </div>
  )

  if (!tour) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-gray-500">Tour not found</p>
        <Link to="/tours" className="mt-4 inline-block text-blue-600 hover:underline">Back to Tours</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Hero Image */}
      <div className="relative h-[550px] overflow-hidden">
        <motion.img
          key={activeImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={tour.images[activeImg]}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/60 via-transparent to-[#0d1f3c]/80" />
        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <div className="text-center text-white px-6">
            {tour.is_featured && (
              <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1 rounded-full font-medium mb-4">Featured Tour</span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{tour.name}</h1>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm">📍 {tour.region}</span>
              <span className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm">📅 {tour.duration_days} Days</span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${difficultyColor(tour.difficulty)}`}>⚡ {tour.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Image Thumbnails */}
      <div className="bg-[#0d1f3c] py-3">
        <div className="max-w-4xl mx-auto px-6 flex gap-2 justify-center">
          {tour.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`relative overflow-hidden rounded-xl transition-all duration-200 flex-shrink-0 ${activeImg === i ? 'ring-2 ring-[#c0392b] scale-105' : 'opacity-60 hover:opacity-90'}`}
              style={{ width: '80px', height: '56px' }}
            >
              <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#1a3a6b]">Home</Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-[#1a3a6b]">Tours</Link>
          <span>/</span>
          <span className="text-[#1a3a6b] font-medium">{tour.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl mb-2">📅</p>
                  <p className="text-xs text-gray-400 mb-1">Duration</p>
                  <p className="font-bold text-[#0d1f3c]">{tour.duration_days} Days</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-3xl mb-2">📍</p>
                  <p className="text-xs text-gray-400 mb-1">Region</p>
                  <p className="font-bold text-[#0d1f3c]">{tour.region}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl mb-2">👥</p>
                  <p className="text-xs text-gray-400 mb-1">Max People</p>
                  <p className="font-bold text-[#0d1f3c]">{tour.max_people} Persons</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <p className="text-3xl mb-2">⚡</p>
                  <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['overview', 'itinerary', 'inclusions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'text-[#c0392b] border-b-2 border-[#c0392b] bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>About This Tour</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{tour.description}</p>
                  </div>
                )}
                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#0d1f3c] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Day by Day Itinerary</h3>
                    <div className="space-y-5">
                      {tour.itinerary.map((item) => (
                        <div key={item.day} className="flex gap-4">
                          <div className="w-10 h-10 bg-[#1a3a6b] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{item.day}</div>
                          <div className="pb-4">
                            <p className="font-bold text-[#0d1f3c] mb-1">{item.title}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-green-700 mb-4">What is Included</h3>
                      <ul className="space-y-3">
                        {tour.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-700 mb-4">Not Included</h3>
                      <ul className="space-y-3">
                        {tour.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Cancellation Policy</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-green-800">Free cancellation up to <strong>30 days before</strong> departure</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                  <span className="text-yellow-600 font-bold flex-shrink-0">!</span>
                  <p className="text-sm text-yellow-800">Cancellations within <strong>15-30 days</strong>: 50% refund (excluding deposit)</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                  <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-red-800">Cancellations within <strong>15 days</strong>: No refund</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500 font-bold flex-shrink-0">•</span>
                  <p className="text-sm text-gray-600">30% deposit is non-refundable in all cases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center pb-6 border-b border-gray-100 mb-6">
                <p className="text-gray-400 text-sm mb-1">Starting from</p>
                <p className="text-4xl font-bold text-[#c0392b]">PKR {tour.price?.toLocaleString()}</p>
                <p className="text-gray-400 text-xs mt-1">per person</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-[#0d1f3c]">{tour.duration_days} Days</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Region</span>
                  <span className="font-semibold text-[#0d1f3c]">{tour.region}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Max People</span>
                  <span className="font-semibold text-[#0d1f3c]">{tour.max_people} Persons</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2">
                  <span className="text-gray-500">Difficulty</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
                </div>
              </div>
              <Link to={`/booking/${tour.id}`} className="block w-full bg-[#c0392b] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors mb-3 shadow-lg shadow-red-100">
                Book Now
              </Link>
              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer" className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors mb-4">
                WhatsApp Inquiry
              </a>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>Free cancellation up to 30 days before
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>Best price guaranteed
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>24/7 customer support
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>only breakfast included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourDetail