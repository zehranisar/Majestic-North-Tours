import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const blogs = [
  {
    id: 1,
    title: 'Ultimate Guide to Hunza Valley',
    excerpt: 'Discover the hidden gems of Hunza Valley, from ancient forts to breathtaking viewpoints. Our comprehensive guide covers everything you need to know before your visit to this magical valley.',
    date: 'June 15, 2024',
    category: 'Travel Guide',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&fit=crop',
    content: `Hunza Valley, nestled in the Karakoram mountain range in northern Pakistan, is one of the most breathtaking destinations in the world. Known for its stunning scenery, ancient history, and warm hospitality, Hunza is a must-visit for any traveler.

The valley is home to the iconic Baltit Fort, which dates back over 700 years and offers panoramic views of the surrounding peaks. The Altit Fort, one of the oldest structures in the region, is another historical gem worth exploring.

One of the highlights of Hunza is the spectacular Eagles Nest viewpoint, where you can see the confluence of three great mountain ranges — the Karakoram, Hindu Kush, and Himalaya — along with some of the worlds highest peaks including Rakaposhi, Ladyfinger Peak, and Ultar Sar.

The best time to visit Hunza is from April to October. April brings the stunning cherry and apricot blossoms, while autumn turns the valley golden with colorful foliage. The famous Attabad Lake, formed after a 2010 landslide, is a stunning turquoise jewel along the Karakoram Highway.

Local food in Hunza is simple but delicious — try the traditional chapshuro flatbread, dried apricots, and walnut cakes that the valley is famous for. The people of Hunza are known for their longevity and healthy lifestyle, attributed to their diet and mountain environment.`,
  },
  {
    id: 2,
    title: 'Wildlife of Deosai National Park',
    excerpt: 'Explore the unique flora and fauna of Deosai Plains, home to the endangered Himalayan brown bear and stunning alpine flowers that bloom every summer.',
    date: 'May 28, 2024',
    category: 'Wildlife',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=85&fit=crop',
    content: `Deosai National Park, often called the Land of Giants, is one of the highest plateaus in the world at an average elevation of 4,114 meters above sea level. Located in Gilgit-Baltistan, this vast alpine plateau spans over 3,000 square kilometers and is a UNESCO nominated site.

The park is most famous for being one of the last remaining habitats of the Himalayan brown bear (Ursus arctos isabellinus). Once critically endangered, conservation efforts have helped increase their population significantly. Spotting a brown bear in the wild at Deosai is an unforgettable experience.

Beyond the bears, Deosai is home to an incredible array of wildlife including the Himalayan ibex, golden marmot, Marco Polo sheep, snow leopard, and over 100 species of migratory birds. The Sheosar Lake within the park is a stunning high-altitude lake surrounded by rolling meadows.

From June to September, Deosai transforms into a carpet of wildflowers — blue forget-me-nots, yellow buttercups, pink primulas, and purple irises create a breathtaking natural canvas. This short summer season is the best time to visit before the harsh winter closes the plateau.

Getting to Deosai requires a 4x4 vehicle from Skardu. The journey itself is an adventure, crossing high mountain passes with stunning views. Our expert guides know the best spots for wildlife viewing and photography.`,
  },
  {
    id: 3,
    title: 'Cultural Heritage of Baltistan',
    excerpt: 'Dive into the rich cultural heritage of Baltistan, from its ancient Buddhist roots to the magnificent Khaplu Palace and traditional music that echoes through the valleys.',
    date: 'April 10, 2024',
    category: 'Culture',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=85&fit=crop',
    content: `Baltistan, the Land of Apricots, is a region of extraordinary cultural richness in Gilgit-Baltistan, Pakistan. With a history spanning thousands of years, this remote mountain kingdom has preserved traditions and heritage that have largely disappeared elsewhere in South Asia.

The region was once a major center of Tibetan Buddhism, and ancient rock carvings, petroglyphs, and carved Buddha figures can still be found throughout the landscape. The Manthal Buddha Rock near Skardu is one of the finest examples, featuring a carved seated Buddha dating back over 1,000 years.

The magnificent Khaplu Palace, built in the 19th century by the Raja of Khaplu, is a masterpiece of Balti-Tibetan architecture. Meticulously restored by the Aga Khan Trust for Culture, it now operates as a heritage hotel. The palace features intricate wooden carvings, traditional painted rooms, and stunning views of the Shyok River valley.

Traditional Balti music and dance are an important part of the culture. The Skardu Festival held each year brings together performers from across the region for music, polo, and traditional competitions. The Polo ground in Skardu is one of the highest altitude polo grounds in the world.

The cuisine of Baltistan reflects the regions high-altitude environment. Tsampa roasted barley flour, butter tea, and dried apricots are staples that have sustained the local population for centuries. Buckwheat crepes called Bokuno and Balti soup Skyu are unique dishes worth trying.`,
  },
  {
    id: 4,
    title: 'Best Time to Visit Northern Pakistan',
    excerpt: 'Planning your trip to Northern Pakistan? This seasonal guide covers the best months to visit each region, from spring blossoms to autumn colors.',
    date: 'March 5, 2024',
    category: 'Travel Tips',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&fit=crop',
    content: `Northern Pakistan is a year-round destination but each season offers a completely different experience. Understanding when to visit can make the difference between a good trip and an extraordinary one.

Spring (April to May) is perhaps the most magical time to visit Hunza Valley when thousands of cherry and apricot trees burst into bloom. The valley transforms into a sea of white and pink blossoms against the backdrop of snow-capped peaks. This is also when most roads reopen after winter.

Summer (June to August) is the peak tourist season when all destinations are accessible. The weather is pleasant in the valleys though it can get hot in lower areas. Deosai Plains are at their most colorful with wildflowers, and this is the best time for high-altitude trekking to places like Fairy Meadows and Concordia.

Autumn (September to October) brings golden colors to the valleys as the apricot and poplar trees turn yellow and orange. The weather remains pleasant, crowds thin out, and the mountain views are exceptionally clear. This is an excellent time for photography.

Winter (November to March) sees most high-altitude areas close due to snow. However, Gilgit city and lower valleys remain accessible. The snowcapped landscapes are stunning and you can experience the local culture without tourist crowds. Khaplu in winter is particularly magical.`,
  },
  {
    id: 5,
    title: 'Trekking in Gilgit-Baltistan: A Complete Guide',
    excerpt: 'From easy day hikes to challenging multi-week expeditions, Gilgit-Baltistan offers some of the worlds finest trekking. Here is everything you need to know.',
    date: 'February 20, 2024',
    category: 'Adventure',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85&fit=crop',
    content: `Gilgit-Baltistan is home to some of the greatest trekking routes in the world. With five of the worlds 14 eight-thousanders and hundreds of glaciers, the region offers trekking experiences ranging from easy valley walks to serious mountaineering expeditions.

The Concordia Trek is arguably the most spectacular trek in the world, leading to the confluence of the Baltoro and Godwin-Austen glaciers with views of K2, Broad Peak, and the Gasherbrums. This 12-14 day trek is challenging but rewards trekkers with unparalleled mountain scenery.

The Snow Lake Trek takes you to one of the largest glacial basins outside the polar regions. This remote 18-day journey through the Karakoram requires permits and an experienced guide but offers complete wilderness solitude.

For less experienced trekkers, the Fairy Meadows Trek near Nanga Parbat is perfect. The 3-4 hour walk from Tato Village rewards with close views of Nanga Parbat at 8,126m and beautiful flower-filled meadows. The Naltar Valley trek is another accessible option with stunning colored lakes.

Essential gear includes good quality hiking boots, layered clothing for temperature changes, rain gear, sun protection, and a good sleeping bag. Always trek with a reputable guide who knows the terrain and weather patterns. Permits are required for some trekking zones.`,
  },
  {
    id: 6,
    title: 'Food Guide: What to Eat in Gilgit-Baltistan',
    excerpt: 'From hearty Balti soups to fresh mountain honey, the cuisine of northern Pakistan is as diverse as its landscapes. Explore the must-try foods of the region.',
    date: 'January 15, 2024',
    category: 'Food & Culture',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=800&q=85&fit=crop',
    content: `The cuisine of Gilgit-Baltistan reflects the regions high-altitude environment, agricultural traditions, and cultural influences from Central Asia, Tibet, and the Indian subcontinent. Eating local food is one of the best ways to connect with the culture of the north.

Chapshuro is perhaps the most iconic Balti dish — a flatbread filled with spiced minced meat and vegetables, cooked on a griddle. Similar to a stuffed paratha, it makes for a perfect trekking food and is sold at roadside stalls throughout the region.

Skyu is a traditional Balti stew made with hand-rolled pasta, vegetables, and sometimes meat. Hearty and warming, it is the perfect meal after a day of trekking in the mountains. Every household has its own recipe passed down through generations.

Apricots are central to the food culture of Hunza and Baltistan. Eaten fresh in summer, dried for winter, or pressed into apricot oil, they appear in sweet and savory dishes alike. The local apricot jam and dried apricots make excellent souvenirs.

Butter tea called Chai may initially surprise visitors with its salty, buttery taste — quite unlike the sweet tea most are accustomed to. Made with tea leaves, yak butter, and salt, it is the traditional drink of the high mountains and an acquired taste worth experiencing.

Mountain honey from Gilgit-Baltistan is among the finest in Pakistan, produced by bees foraging on wild mountain flowers. Look for local honey at markets in Gilgit, Skardu, and Hunza.`,
  },
]

const categories = ['All', 'Travel Guide', 'Wildlife', 'Culture', 'Travel Tips', 'Adventure', 'Food & Culture']

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null)

  const filtered = selectedCategory === 'All' ? blogs : blogs.filter(b => b.category === selectedCategory)

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="relative h-[450px] overflow-hidden">
          <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/70 via-transparent to-[#0d1f3c]/85" />
          <div className="absolute inset-0 flex items-end justify-center pb-12 px-6">
            <div className="text-center max-w-4xl">
              <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1 rounded-full font-medium mb-4">{selectedBlog.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{selectedBlog.title}</h1>
              <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
                <span>📅 {selectedBlog.date}</span>
                <span>•</span>
                <span>⏱️ {selectedBlog.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <button onClick={() => setSelectedBlog(null)} className="flex items-center gap-2 text-[#1a3a6b] font-semibold mb-8 hover:text-[#c0392b] transition-colors">
            ← Back to Blog
          </button>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {selectedBlog.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-5 text-sm">{para}</p>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] rounded-2xl p-6 text-center">
            <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Experience It Yourself?</h3>
            <p className="text-white/70 text-sm mb-4">Book a tour and create your own unforgettable memories in Northern Pakistan.</p>
            <Link to="/tours" className="inline-block bg-[#c0392b] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Hero */}
      <div
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/60 to-[#0d1f3c]/85" />
        <div className="relative z-10 text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-5 tracking-widest uppercase">
            Travel Blog
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Travel Guides & Stories
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-lg max-w-2xl mx-auto">
            Expert tips, destination guides, and travel stories from the heart of Northern Pakistan
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Category Filter */}
        <FadeIn>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === cat ? 'bg-[#1a3a6b] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured Blog */}
        <FadeIn>
          <div
            className="relative rounded-3xl overflow-hidden mb-12 cursor-pointer group"
            onClick={() => setSelectedBlog(filtered[0])}
          >
            <div className="relative h-[400px]">
              <img src={filtered[0]?.image} alt={filtered[0]?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f3c]/90 via-[#0d1f3c]/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center px-10">
              <div className="max-w-lg">
                <span className="inline-block bg-[#c0392b] text-white text-xs px-3 py-1 rounded-full font-medium mb-3">Featured</span>
                <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{filtered[0]?.title}</h2>
                <p className="text-white/75 text-sm leading-relaxed mb-4">{filtered[0]?.excerpt}</p>
                <div className="flex items-center gap-4 text-white/60 text-xs mb-4">
                  <span>📅 {filtered[0]?.date}</span>
                  <span>⏱️ {filtered[0]?.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 bg-white text-[#1a3a6b] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
                  Read Article →
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(1).map((blog, i) => (
            <FadeIn key={blog.id} delay={i * 0.1}>
              <div
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#1a3a6b] text-white text-xs px-3 py-1 rounded-full font-medium">{blog.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span>📅 {blog.date}</span>
                    <span>•</span>
                    <span>⏱️ {blog.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1f3c] mb-2 group-hover:text-[#c0392b] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
                  <span className="text-[#c0392b] font-semibold text-sm hover:underline">Read More →</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl">📝</span>
            <p className="text-gray-500 mt-4">No posts in this category yet.</p>
          </div>
        )}

        {/* CTA */}
        <FadeIn>
          <div className="mt-16 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to Explore Northern Pakistan?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Stop reading and start exploring! Book your dream tour today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tours" className="bg-[#c0392b] text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5 shadow-lg">
                Browse Tour Packages
              </Link>
              <a href="https://wa.me/923251002509" target="_blank" rel="noreferrer"
                className="bg-green-500 text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-all hover:-translate-y-0.5">
                WhatsApp Us
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default Blog