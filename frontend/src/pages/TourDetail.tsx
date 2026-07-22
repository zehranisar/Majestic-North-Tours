import { API_URL } from '../config'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

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
  coordinates: [number, number]
  availability: boolean[]
}

const demoTours: Record<string, Tour> = {
  '1': {
    id: 1, name: 'Hunza Valley Tour', duration_days: 7, price: 75000, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: true,
    coordinates: [36.3167, 74.6500],
    availability: [false, false, false, true, true, true, true, true, true, true, false, false],
    description: 'Experience the breathtaking beauty of Hunza Valley, one of the most spectacular regions in the world. Surrounded by some of the highest peaks on earth, Hunza offers stunning landscapes, rich culture, and warm hospitality.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1598893669783-dda7c1fd69c7?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport Islamabad to Hunza return', 'Hotel accommodation 6 nights', 'Daily breakfast', 'Expert local guide', 'All sightseeing and entry fees', 'Jeep safari where required'],
    exclusions: ['Airfare', 'Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Tips for guides'],
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
    id: 2, name: 'Skardu Adventure', duration_days: 5, price: 47500, region: 'Skardu', difficulty: 'Moderate', max_people: 4, is_featured: true,
    coordinates: [35.2971, 75.6333],
    availability: [false, false, false, true, true, true, true, true, true, true, false, false],
    description: 'Explore the majestic Skardu region, gateway to K2. Experience crystal clear lakes, ancient forts and breathtaking mountain scenery of Baltistan.',
    images: [
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport Islamabad to Skardu return', 'Hotel accommodation 4 nights', 'Daily breakfast', 'Expert guide', 'All sightseeing'],
    exclusions: ['Airfare', 'Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Tips for guides'],
    itinerary: [
      { day: 1, title: 'Islamabad to Skardu', desc: 'Flight or road journey to Skardu. Check in to hotel.' },
      { day: 2, title: 'Skardu City Tour', desc: 'Visit Kharpocho Fort, Skardu bazaar and local attractions.' },
      { day: 3, title: 'Shangrila Resort', desc: 'Visit Shangrila Resort (Heaven on Earth) and Manthokha Waterfall.' },
      { day: 4, title: 'Deosai Plains', desc: 'Full day trip to Deosai National Park.' },
      { day: 5, title: 'Return Journey', desc: 'Depart from Skardu. Tour ends.' },
    ],
  },
  '3': {
    id: 3, name: 'Fairy Meadows Trek', duration_days: 3, price: 47500, region: 'Diamer', difficulty: 'Hard', max_people: 4, is_featured: true,
    coordinates: [35.3731, 74.5897],
    availability: [false, false, false, false, true, true, true, true, true, false, false, false],
    description: 'Trek to the magical Fairy Meadows with the stunning view of Nanga Parbat - the Killer Mountain at 8126m.',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1527515637462-cff94edd8b08?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport to Raikot Bridge', 'Jeep from Raikot to Tato Village', 'Camping equipment', 'Daily breakfast', 'Expert trek guide', 'Porter services'],
    exclusions: ['Personal trekking gear', 'Lunch and dinner', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Islamabad to Fairy Meadows', desc: 'Drive to Raikot Bridge. Jeep to Tato Village. Trek to Fairy Meadows. Camp overnight.' },
      { day: 2, title: 'Fairy Meadows Exploration', desc: 'Full day at Fairy Meadows. Optional trek to Nanga Parbat Base Camp.' },
      { day: 3, title: 'Return Journey', desc: 'Sunrise view of Nanga Parbat. Trek back and return to Islamabad.' },
    ],
  },
  '4': {
    id: 4, name: 'Deosai Plains Tour', duration_days: 3, price: 35000, region: 'Skardu', difficulty: 'Easy', max_people: 5, is_featured: false,
    coordinates: [34.9833, 75.5500],
    availability: [false, false, false, false, false, true, true, true, true, false, false, false],
    description: 'Visit Deosai National Park - the worlds second highest plateau at 4114m. Famous for Himalayan brown bears and stunning landscapes.',
    images: [
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Park entry fee'],
    exclusions: ['Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Islamabad to Skardu', desc: 'Depart from Islamabad. Arrive Skardu. Check in to hotel.' },
      { day: 2, title: 'Deosai National Park', desc: 'Full day at Deosai Plains. Spot Himalayan brown bears and wildflowers.' },
      { day: 3, title: 'Return Journey', desc: 'Return to Islamabad. Tour ends.' },
    ],
  },
  '5': {
    id: 5, name: 'Naltar Valley Tour', duration_days: 3, price: 37500, region: 'Gilgit', difficulty: 'Easy', max_people: 5, is_featured: false,
    coordinates: [36.1667, 74.2500],
    availability: [false, false, false, true, true, true, true, true, true, true, false, false],
    description: 'Discover Naltar Valley famous for its three stunning colorful lakes, dense pine forests and skiing resort.',
    images: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Guide', 'Jeep safari'],
    exclusions: ['Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Skiing charges'],
    itinerary: [
      { day: 1, title: 'Gilgit to Naltar', desc: 'Depart from Gilgit. Jeep ride to Naltar Valley. Check in to guesthouse.' },
      { day: 2, title: 'Naltar Lakes', desc: 'Visit the three famous colorful Naltar Lakes. Photography and nature walk.' },
      { day: 3, title: 'Return to Gilgit', desc: 'Morning at leisure. Return to Gilgit. Tour ends.' },
    ],
  },
  '6': {
    id: 6, name: 'Attabad Lake Tour', duration_days: 1, price: 17500, region: 'Hunza', difficulty: 'Easy', max_people: 5, is_featured: false,
    coordinates: [36.3333, 74.8667],
    availability: [false, false, false, true, true, true, true, true, true, true, true, false],
    description: 'Visit the stunning turquoise Attabad Lake formed after a massive landslide in 2010.',
    images: [
      'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport from Gilgit', 'Boat ride on Attabad Lake', 'Guide', 'Breakfast'],
    exclusions: ['Lunch and dinner', 'Personal expenses', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Gilgit to Attabad Lake and Return', desc: 'Depart from Gilgit. Drive to Attabad Lake. Boat ride. Photography. Return to Gilgit.' },
    ],
  },
  '7': {
    id: 7, name: 'Shigar Valley Tour', duration_days: 4, price: 32500, region: 'Skardu', difficulty: 'Easy', max_people: 4, is_featured: false,
    coordinates: [35.5167, 75.7667],
    availability: [false, false, false, true, true, true, true, true, true, true, false, false],
    description: 'Explore ancient Shigar Valley with its magnificent 17th century Shigar Fort and apricot orchards.',
    images: [
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Fort entry fee'],
    exclusions: ['Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Skardu to Shigar', desc: 'Depart from Skardu. Arrive Shigar. Check in to Shigar Fort Residence.' },
      { day: 2, title: 'Shigar Fort and Village', desc: 'Visit the historic Shigar Fort. Explore traditional Balti village.' },
      { day: 3, title: 'Apricot Orchards', desc: 'Walk through famous apricot orchards. Visit local craftsmen.' },
      { day: 4, title: 'Return to Skardu', desc: 'Morning at leisure. Return to Skardu. Tour ends.' },
    ],
  },
  '8': {
    id: 8, name: 'Rama Meadows Tour', duration_days: 2, price: 30000, region: 'Astore', difficulty: 'Moderate', max_people: 4, is_featured: false,
    coordinates: [35.1667, 74.7500],
    availability: [false, false, false, false, true, true, true, true, true, false, false, false],
    description: 'Trek to Rama Meadows at 3300m in Astore Valley with spectacular views of Nanga Parbat.',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94edd8b08?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Camping equipment', 'Daily breakfast', 'Trek guide', 'Porter'],
    exclusions: ['Personal trekking gear', 'Lunch and dinner', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Gilgit to Rama Meadows', desc: 'Depart from Gilgit. Drive to Astore. Trek to Rama Meadows. Camp overnight.' },
      { day: 2, title: 'Return Journey', desc: 'Morning sunrise views of Nanga Parbat. Trek back. Return to Gilgit.' },
    ],
  },
  '9': {
    id: 9, name: 'Passu Cones and Glacier', duration_days: 4, price: 42500, region: 'Hunza', difficulty: 'Moderate', max_people: 4, is_featured: false,
    coordinates: [36.4667, 74.8667],
    availability: [false, false, false, false, true, true, true, true, true, false, false, false],
    description: 'Experience the iconic Passu Cathedral Cones and walk on Batura Glacier.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1527515637462-cff94edd8b08?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Glacier walk equipment'],
    exclusions: ['Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Gilgit to Passu', desc: 'Depart from Gilgit. Arrive Passu. Evening walk to viewpoint.' },
      { day: 2, title: 'Passu Cones Photography', desc: 'Full day hiking around iconic Passu Cathedral Cones.' },
      { day: 3, title: 'Batura Glacier Walk', desc: 'Trek to Batura Glacier - one of the longest glaciers in the world.' },
      { day: 4, title: 'Return to Gilgit', desc: 'Morning at leisure. Drive back to Gilgit. Tour ends.' },
    ],
  },
  '10': {
    id: 10, name: 'Khaplu Highlights', duration_days: 4, price: 42500, region: 'Ghanche', difficulty: 'Easy', max_people: 5, is_featured: false,
    coordinates: [35.1667, 76.3333],
    availability: [false, false, false, true, true, true, true, true, true, true, false, false],
    description: 'Explore beautiful Khaplu Valley - home to the magnificent Khaplu Palace and stunning Shyok River views.',
    images: [
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Khaplu Palace entry'],
    exclusions: ['Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Airfare'],
    itinerary: [
      { day: 1, title: 'Skardu to Khaplu', desc: 'Depart from Skardu. Scenic drive along Shyok River to Khaplu. Check in.' },
      { day: 2, title: 'Khaplu Palace', desc: 'Visit the magnificently restored Khaplu Palace. Explore local bazaar.' },
      { day: 3, title: 'Shyok River Valley', desc: 'Drive along stunning Shyok River. Visit Mashabrum viewpoint.' },
      { day: 4, title: 'Return to Skardu', desc: 'Morning at leisure. Return to Skardu. Tour ends.' },
    ],
  },
  '11': {
    id: 11, name: 'Thagas Valley Tour', duration_days: 5, price: 50000, region: 'Ghanche', difficulty: 'Moderate', max_people: 4, is_featured: false,
    coordinates: [35.2000, 76.4000],
    availability: [false, false, false, false, true, true, true, true, false, false, false, false],
    description: 'Discover the pristine Thagas Valley - one of the least explored valleys in Gilgit-Baltistan.',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94edd8b08?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Camping equipment', 'Daily breakfast', 'Expert guide', 'Porter services'],
    exclusions: ['Personal trekking gear', 'Lunch and dinner', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Skardu to Khaplu', desc: 'Depart from Skardu. Drive to Khaplu. Overnight stay.' },
      { day: 2, title: 'Khaplu to Thagas', desc: 'Drive and trek into Thagas Valley. Set up base camp.' },
      { day: 3, title: 'Thagas Valley Exploration', desc: 'Full day exploring pristine Thagas Valley.' },
      { day: 4, title: 'Upper Thagas Trek', desc: 'Trek to upper valley for panoramic mountain views.' },
      { day: 5, title: 'Return Journey', desc: 'Trek back. Return to Skardu. Tour ends.' },
    ],
  },
  '12': {
    id: 12, name: 'Chitral and Kalash', duration_days: 5, price: 60000, region: 'Chitral', difficulty: 'Easy', max_people: 5, is_featured: false,
    coordinates: [35.8500, 71.7833],
    availability: [false, false, false, true, true, true, true, true, true, true, false, false],
    description: 'Visit the unique Kalash people - one of the last pagan tribes of Pakistan with ancient heritage.',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&fit=crop',
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=1200&q=85&fit=crop',
    ],
    inclusions: ['Transport', 'Hotel accommodation', 'Daily breakfast', 'Expert guide', 'Cultural tour of Kalash valleys'],
    exclusions: ['Airfare', 'Lunch and dinner', 'Personal expenses', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chitral', desc: 'Flight or road journey to Chitral. Check in to hotel.' },
      { day: 2, title: 'Chitral City Tour', desc: 'Visit Chitral Fort, Shahi Mosque and local bazaar.' },
      { day: 3, title: 'Bumburet Kalash Valley', desc: 'Visit Bumburet Valley. Meet Kalash people and experience their culture.' },
      { day: 4, title: 'Rumbur Valley', desc: 'Visit Rumbur Kalash Valley. Photography and cultural immersion.' },
      { day: 5, title: 'Return Journey', desc: 'Depart from Chitral. Return to Islamabad. Tour ends.' },
    ],
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TourDetail = () => {
  const { id } = useParams()
  const [tour, setTour] = useState<Tour | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [persons, setPersons] = useState(2)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/api/tours/${id}`)
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

  const totalPrice = tour.price * persons

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Hero */}
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

      {/* Thumbnails */}
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

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[#0d1f3c] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Tour Availability</h3>
              <p className="text-gray-400 text-sm mb-5">Available months for this tour</p>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {months.map((month, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl p-3 text-center transition-all ${
                      tour.availability[i]
                        ? 'bg-gradient-to-b from-green-400 to-green-600 text-white shadow-md shadow-green-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider">{month}</p>
                    <p className="text-lg mt-1">{tour.availability[i] ? '✓' : '–'}</p>
                    {tour.availability[i] && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-green-400 to-green-600 shadow-sm" />
                  <span className="text-xs text-gray-500 font-medium">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-200" />
                  <span className="text-xs text-gray-500 font-medium">Not Available</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Tour Location</h3>
              <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: '320px' }}>
                <MapContainer
                  center={tour.coordinates}
                  zoom={10}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={tour.coordinates}>
                    <Popup>
                      <div className="text-center p-1">
                        <p className="font-bold text-sm text-[#0d1f3c]">{tour.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{tour.region}, Pakistan</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Cancellation */}
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

              {/* Price per person */}
              <div className="text-center pb-5 border-b border-gray-100 mb-5">
                <p className="text-gray-400 text-xs mb-1">Price per person</p>
                <p className="text-4xl font-bold text-[#c0392b]">PKR {tour.price?.toLocaleString()}</p>
              </div>

              {/* Person Selector */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Number of Persons</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPersons(p => Math.max(1, p - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1a3a6b] hover:text-white font-bold text-lg transition-all"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold text-[#0d1f3c]">{persons}</span>
                    <p className="text-xs text-gray-400">{persons === 1 ? 'Person' : 'Persons'}</p>
                  </div>
                  <button
                    onClick={() => setPersons(p => Math.min(tour.max_people, p + 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1a3a6b] hover:text-white font-bold text-lg transition-all"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-1">Max {tour.max_people} persons</p>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] rounded-xl p-4 mb-5 text-center">
                <p className="text-white/70 text-xs mb-1">Total Price ({persons} {persons === 1 ? 'person' : 'persons'})</p>
                <p className="text-3xl font-bold text-white">PKR {totalPrice.toLocaleString()}</p>
                <p className="text-blue-300 text-xs mt-1">PKR {tour.price.toLocaleString()} × {persons}</p>
              </div>

              <div className="space-y-2 mb-5 text-sm">
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-[#0d1f3c]">{tour.duration_days} Days</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Region</span>
                  <span className="font-semibold text-[#0d1f3c]">{tour.region}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Difficulty</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
                </div>
              </div>

              <Link
                to={`/booking/${tour.id}?persons=${persons}`}
                className="block w-full bg-[#c0392b] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors mb-3 shadow-lg shadow-red-100"
              >
                Book Now — PKR {totalPrice.toLocaleString()}
              </Link>

              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer"
                className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors mb-4">
                WhatsApp Inquiry
              </a>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>Free cancellation up to 30 days
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>Best price guaranteed
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>24/7 customer support
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>Breakfast included
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