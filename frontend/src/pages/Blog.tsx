import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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
    titleUr: 'ہنزہ وادی کی مکمل گائیڈ',
    excerpt: 'Discover the hidden gems of Hunza Valley, from ancient forts to breathtaking viewpoints.',
    excerptUr: 'ہنزہ وادی کے پوشیدہ خزانے دریافت کریں، قدیم قلعوں سے لے کر دلکش نقطہ نظر تک۔',
    date: 'June 15, 2024',
    category: 'Travel Guide',
    categoryUr: 'سفری گائیڈ',
    readTime: '8 min read',
    readTimeUr: '8 منٹ پڑھیں',
    image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/hunza1.webp',
    content: `Hunza Valley, nestled in the Karakoram mountain range in northern Pakistan, is one of the most breathtaking destinations in the world. Known for its stunning scenery, ancient history, and warm hospitality, Hunza is a must-visit for any traveler.

The valley is home to the iconic Baltit Fort, which dates back over 700 years and offers panoramic views of the surrounding peaks. The Altit Fort, one of the oldest structures in the region, is another historical gem worth exploring.

One of the highlights of Hunza is the spectacular Eagles Nest viewpoint, where you can see the confluence of three great mountain ranges. The famous Attabad Lake, formed after a 2010 landslide, is a stunning turquoise jewel along the Karakoram Highway.

The best time to visit Hunza is from April to October. April brings the stunning cherry and apricot blossoms, while autumn turns the valley golden with colorful foliage.`,
    contentUr: `ہنزہ وادی، پاکستان کے شمال میں قراقرم پہاڑی سلسلے میں واقع، دنیا کی سب سے دلکش منزلوں میں سے ایک ہے۔ اپنے شاندار مناظر، قدیم تاریخ اور گرم مہمان نوازی کے لیے مشہور، ہنزہ ہر مسافر کے لیے لازمی سیاحت ہے۔

وادی میں مشہور بالتت قلعہ ہے جو 700 سال سے زیادہ پرانا ہے اور ارد گرد کی چوٹیوں کا پینورامک نظارہ پیش کرتا ہے۔ الٹت قلعہ، خطے کی قدیم ترین عمارتوں میں سے ایک، ایک اور تاریخی خزانہ ہے۔

ہنزہ کے نقطہ نظر میں سے ایک ایگلز نیسٹ ہے، جہاں آپ تین عظیم پہاڑی سلسلوں کا سنگم دیکھ سکتے ہیں۔ اٹابادلیک، 2010 کے لینڈ سلائیڈ کے بعد بنی، کاراکورم ہائی وے کے ساتھ ایک شاندار فیروزی جواہر ہے۔

ہنزہ جانے کا بہترین وقت اپریل سے اکتوبر ہے۔ اپریل میں چیری اور خوبانی کے پھول کھلتے ہیں، جبکہ خزاں میں وادی رنگین پتوں سے سنہری ہو جاتی ہے۔`,
  },
  {
    id: 2,
    title: 'Wildlife of Deosai National Park',
    titleUr: 'دیوسائی نیشنل پارک کی وحشی حیات',
    excerpt: 'Explore the unique flora and fauna of Deosai Plains, home to the endangered Himalayan brown bear.',
    excerptUr: 'دیوسائی میدانوں کی منفرد نباتات اور حیوانات دریافت کریں، ہمالیائی بھورے ریچھ کا گھر۔',
    date: 'May 28, 2024',
    category: 'Wildlife',
    categoryUr: 'وحشی حیات',
    readTime: '6 min read',
    readTimeUr: '6 منٹ پڑھیں',
    image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/deo1.jpg',
    content: `Deosai National Park, often called the Land of Giants, is one of the highest plateaus in the world at an average elevation of 4,114 meters above sea level. Located in Gilgit-Baltistan, this vast alpine plateau spans over 3,000 square kilometers.

The park is most famous for being one of the last remaining habitats of the Himalayan brown bear. Once critically endangered, conservation efforts have helped increase their population significantly.

Beyond the bears, Deosai is home to an incredible array of wildlife including the Himalayan ibex, golden marmot, Marco Polo sheep, snow leopard, and over 100 species of migratory birds.

From June to September, Deosai transforms into a carpet of wildflowers creating a breathtaking natural canvas. This short summer season is the best time to visit.`,
    contentUr: `دیوسائی نیشنل پارک، جسے اکثر دیوہیکل لوگوں کی سرزمین کہا جاتا ہے، دنیا کے بلند ترین پہاڑی علاقوں میں سے ایک ہے جو سطح سمندر سے 4,114 میٹر کی اوسط بلندی پر واقع ہے۔

پارک ہمالیائی بھورے ریچھ کے آخری بچے ہوئے مسکنوں میں سے ایک کے طور پر سب سے زیادہ مشہور ہے۔ ایک وقت میں شدید خطرے میں تھا، تحفظ کی کوششوں نے آبادی میں نمایاں اضافہ کیا ہے۔

جون سے ستمبر تک، دیوسائی جنگلی پھولوں کے قالین میں تبدیل ہو جاتا ہے جو ایک شاندار قدرتی منظر بناتا ہے۔ یہ مختصر گرمیوں کا موسم دیکھنے کا بہترین وقت ہے۔`,
  },
  {
    id: 3,
    title: 'Cultural Heritage of Baltistan',
    titleUr: 'بلتستان کا ثقافتی ورثہ',
    excerpt: 'Dive into the rich cultural heritage of Baltistan, from ancient Buddhist roots to the magnificent Khaplu Palace.',
    excerptUr: 'بلتستان کے امیر ثقافتی ورثے میں غوطہ لگائیں، قدیم بدھ مت جڑوں سے شاندار خپلو محل تک۔',
    date: 'April 10, 2024',
    category: 'Culture',
    categoryUr: 'ثقافت',
    readTime: '7 min read',
    readTimeUr: '7 منٹ پڑھیں',
    image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/khaplu1.jpg',
    content: `Baltistan, the Land of Apricots, is a region of extraordinary cultural richness in Gilgit-Baltistan, Pakistan. With a history spanning thousands of years, this remote mountain kingdom has preserved traditions and heritage.

The region was once a major center of Tibetan Buddhism, and ancient rock carvings, petroglyphs, and carved Buddha figures can still be found throughout the landscape.

The magnificent Khaplu Palace, built in the 19th century by the Raja of Khaplu, is a masterpiece of Balti-Tibetan architecture. Meticulously restored by the Aga Khan Trust for Culture, it now operates as a heritage hotel.

Traditional Balti music and dance are an important part of the culture. The cuisine of Baltistan reflects the regions high-altitude environment with unique dishes worth trying.`,
    contentUr: `بلتستان، خوبانیوں کی سرزمین، گلگت بلتستان، پاکستان میں غیر معمولی ثقافتی دولت کا خطہ ہے۔ ہزاروں سال کی تاریخ کے ساتھ، اس دور دراز پہاڑی سلطنت نے روایات اور ورثے کو محفوظ رکھا ہے۔

یہ خطہ کبھی تبتی بدھ مت کا ایک بڑا مرکز تھا، اور قدیم پتھر کی کندہ کاری، پیٹروگلیفس اور بدھ کی کندہ تصویریں ابھی بھی پورے منظر نامے میں پائی جا سکتی ہیں۔

شاندار خپلو محل، 19ویں صدی میں راجہ خپلو نے بنوایا، بالتی-تبتی فن تعمیر کا شاہکار ہے۔ آغا خان ٹرسٹ نے اسے ایک ورثہ ہوٹل کے طور پر بحال کیا ہے۔`,
  },
  {
    id: 4,
    title: 'Best Time to Visit Northern Pakistan',
    titleUr: 'شمالی پاکستان جانے کا بہترین وقت',
    excerpt: 'Planning your trip to Northern Pakistan? This seasonal guide covers the best months to visit each region.',
    excerptUr: 'شمالی پاکستان کا سفر منصوبہ بنا رہے ہیں؟ یہ موسمی گائیڈ ہر خطے کے لیے بہترین مہینے بتاتی ہے۔',
    date: 'March 5, 2024',
    category: 'Travel Tips',
    categoryUr: 'سفری تجاویز',
    readTime: '5 min read',
    readTimeUr: '5 منٹ پڑھیں',
    image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/fm1.jpg',
    content: `Northern Pakistan is a year-round destination but each season offers a completely different experience. Understanding when to visit can make the difference between a good trip and an extraordinary one.

Spring (April to May) is perhaps the most magical time to visit Hunza Valley when thousands of cherry and apricot trees burst into bloom.

Summer (June to August) is the peak tourist season when all destinations are accessible. Deosai Plains are at their most colorful with wildflowers.

Autumn (September to October) brings golden colors to the valleys as the apricot and poplar trees turn yellow and orange. The weather remains pleasant and the mountain views are exceptionally clear.

Winter (November to March) sees most high-altitude areas close due to snow. However, Gilgit city and lower valleys remain accessible.`,
    contentUr: `شمالی پاکستان سال بھر کی منزل ہے لیکن ہر موسم بالکل مختلف تجربہ پیش کرتا ہے۔ جانے کا وقت سمجھنا ایک اچھے سفر اور ایک غیر معمولی سفر کے درمیان فرق کر سکتا ہے۔

موسم بہار (اپریل تا مئی) شاید ہنزہ وادی جانے کا سب سے جادوئی وقت ہے جب ہزاروں چیری اور خوبانی کے درخت کھل اٹھتے ہیں۔

گرمی (جون تا اگست) سیاحت کا عروج ہے جب تمام منزلیں قابل رسائی ہوتی ہیں۔ دیوسائی کے میدان جنگلی پھولوں سے سب سے رنگین ہوتے ہیں۔

خزاں (ستمبر تا اکتوبر) وادیوں میں سنہری رنگ لاتی ہے۔ موسم خوشگوار رہتا ہے اور پہاڑی نظارے غیر معمولی طور پر صاف ہوتے ہیں۔`,
  },
  {
    id: 5,
    title: 'Trekking in Gilgit-Baltistan',
    titleUr: 'گلگت بلتستان میں ٹریکنگ',
    excerpt: 'From easy day hikes to challenging multi-week expeditions, Gilgit-Baltistan offers some of the worlds finest trekking.',
    excerptUr: 'آسان ڈے ہائیکس سے لے کر چیلنجنگ کثیر ہفتہ مہمات تک، گلگت بلتستان دنیا کی بہترین ٹریکنگ پیش کرتا ہے۔',
    date: 'February 20, 2024',
    category: 'Adventure',
    categoryUr: 'مہم جوئی',
    readTime: '10 min read',
    readTimeUr: '10 منٹ پڑھیں',
    image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/fm2.jpg',
    content: `Gilgit-Baltistan is home to some of the greatest trekking routes in the world. With five of the worlds 14 eight-thousanders and hundreds of glaciers, the region offers trekking experiences ranging from easy valley walks to serious mountaineering expeditions.

The Concordia Trek is arguably the most spectacular trek in the world, leading to the confluence of the Baltoro and Godwin-Austen glaciers with views of K2, Broad Peak, and the Gasherbrums.

For less experienced trekkers, the Fairy Meadows Trek near Nanga Parbat is perfect. The 3-4 hour walk from Tato Village rewards with close views of Nanga Parbat at 8,126m.

Essential gear includes good quality hiking boots, layered clothing, rain gear, sun protection, and a good sleeping bag.`,
    contentUr: `گلگت بلتستان دنیا کے کچھ عظیم ترین ٹریکنگ راستوں کا گھر ہے۔ دنیا کے 14 آٹھ ہزاری پہاڑوں میں سے پانچ اور سینکڑوں گلیشیئرز کے ساتھ، یہ خطہ آسان وادی کی سیر سے لے کر سنجیدہ پہاڑ کوہ پیمائی تک ٹریکنگ کا تجربہ پیش کرتا ہے۔

کانکورڈیا ٹریک دنیا کا سب سے شاندار ٹریک ہے، جو K2 کے ساتھ بالتورو اور گوڈون-آسٹن گلیشیئرز کے سنگم تک جاتا ہے۔

کم تجربہ کار ٹریکرز کے لیے، نانگا پربت کے قریب فیری میڈوز ٹریک بہترین ہے۔ ٹاٹو گاؤں سے 3-4 گھنٹے کی سیر نانگا پربت کے قریبی نظارے کا انعام دیتی ہے۔`,
  },
  {
    id: 6,
    title: 'Food Guide: What to Eat in Gilgit-Baltistan',
    titleUr: 'کھانے کی گائیڈ: گلگت بلتستان میں کیا کھائیں',
    excerpt: 'From hearty Balti soups to fresh mountain honey, the cuisine of northern Pakistan is as diverse as its landscapes.',
    excerptUr: 'بھرپور بالتی سوپ سے لے کر تازہ پہاڑی شہد تک، شمالی پاکستان کا کھانا اس کے مناظر جتنا متنوع ہے۔',
    date: 'January 15, 2024',
    category: 'Food & Culture',
    categoryUr: 'کھانا اور ثقافت',
    readTime: '5 min read',
    readTimeUr: '5 منٹ پڑھیں',
    image: 'https://nqwjimjqteqdpkkzbyim.supabase.co/storage/v1/object/public/tour-images/skardu1.jpg',
    content: `The cuisine of Gilgit-Baltistan reflects the regions high-altitude environment, agricultural traditions, and cultural influences from Central Asia, Tibet, and the Indian subcontinent.

Chapshuro is perhaps the most iconic Balti dish — a flatbread filled with spiced minced meat and vegetables. Similar to a stuffed paratha, it makes for a perfect trekking food.

Skyu is a traditional Balti stew made with hand-rolled pasta, vegetables, and sometimes meat. Hearty and warming, it is the perfect meal after a day of trekking.

Apricots are central to the food culture of Hunza and Baltistan. Mountain honey from Gilgit-Baltistan is among the finest in Pakistan, produced by bees foraging on wild mountain flowers.`,
    contentUr: `گلگت بلتستان کا کھانا خطے کے بلند و بالا ماحول، زرعی روایات اور وسطی ایشیا، تبت اور برصغیر سے ثقافتی اثرات کی عکاسی کرتا ہے۔

چپشورو شاید سب سے مشہور بالتی ڈش ہے — مسالیدار قیمہ اور سبزیوں سے بھری ہوئی فلیٹ بریڈ۔ سکیو ہاتھ سے بنے ہوئے پاستا، سبزیوں اور کبھی گوشت کے ساتھ ایک روایتی بالتی سٹو ہے۔

خوبانی ہنزہ اور بلتستان کی کھانے کی ثقافت کا مرکز ہے۔ گلگت بلتستان کا پہاڑی شہد پاکستان کے بہترین شہد میں سے ہے۔`,
  },
]

const categories = ['All', 'Travel Guide', 'Wildlife', 'Culture', 'Travel Tips', 'Adventure', 'Food & Culture']
const categoriesUr = ['سب', 'سفری گائیڈ', 'وحشی حیات', 'ثقافت', 'سفری تجاویز', 'مہم جوئی', 'کھانا اور ثقافت']

const Blog = () => {
  const { i18n } = useTranslation()
  const isUrdu = i18n.language === 'ur'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null)

  const filtered = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === selectedCategory)

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="relative h-[450px] overflow-hidden">
          <img src={selectedBlog.image} alt={isUrdu ? selectedBlog.titleUr : selectedBlog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/70 via-transparent to-[#0d1f3c]/85" />
          <div className="absolute inset-0 flex items-end justify-center pb-12 px-6">
            <div className="text-center max-w-4xl">
              <span className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1 rounded-full font-medium mb-4">
                {isUrdu ? selectedBlog.categoryUr : selectedBlog.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isUrdu ? selectedBlog.titleUr : selectedBlog.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
                <span>📅 {selectedBlog.date}</span>
                <span>•</span>
                <span>⏱️ {isUrdu ? selectedBlog.readTimeUr : selectedBlog.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <button onClick={() => setSelectedBlog(null)} className="flex items-center gap-2 text-[#1a3a6b] font-semibold mb-8 hover:text-[#c0392b] transition-colors">
            {isUrdu ? 'بلاگ پر واپس جائیں ←' : '← Back to Blog'}
          </button>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {(isUrdu ? selectedBlog.contentUr : selectedBlog.content).split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-5 text-sm">{para}</p>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] rounded-2xl p-6 text-center">
            <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isUrdu ? 'خود تجربہ کرنے کے لیے تیار ہیں؟' : 'Ready to Experience It Yourself?'}
            </h3>
            <p className="text-white/70 text-sm mb-4">
              {isUrdu ? 'ٹور بک کریں اور شمالی پاکستان میں اپنی ناقابل فراموش یادیں بنائیں۔' : 'Book a tour and create your own unforgettable memories in Northern Pakistan.'}
            </p>
            <a href="/tours" className="inline-block bg-[#c0392b] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
              {isUrdu ? 'ٹورز دیکھیں' : 'Browse Tours'}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/80 via-[#0d1f3c]/60 to-[#0d1f3c]/85" />
        <div className="relative z-10 text-center px-6 pt-32 pb-16">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block bg-[#c0392b] text-white text-xs px-4 py-1.5 rounded-full font-semibold mb-5 tracking-widest uppercase">
            {isUrdu ? 'سفری بلاگ' : 'Travel Blog'}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isUrdu ? 'سفری گائیڈز اور کہانیاں' : 'Travel Guides & Stories'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-lg max-w-2xl mx-auto">
            {isUrdu ? 'شمالی پاکستان کے دل سے ماہرانہ تجاویز، منزل کی گائیڈز اور سفری کہانیاں' : 'Expert tips, destination guides, and travel stories from the heart of Northern Pakistan'}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Category Filter */}
        <FadeIn>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat, i) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === cat ? 'bg-[#1a3a6b] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'}`}>
                {isUrdu ? categoriesUr[i] : cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured Blog */}
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden mb-12 cursor-pointer group" onClick={() => setSelectedBlog(filtered[0])}>
            <div className="relative h-[400px]">
              <img src={filtered[0]?.image} alt={isUrdu ? filtered[0]?.titleUr : filtered[0]?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f3c]/90 via-[#0d1f3c]/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center px-10">
              <div className="max-w-lg">
                <span className="inline-block bg-[#c0392b] text-white text-xs px-3 py-1 rounded-full font-medium mb-3">
                  {isUrdu ? 'نمایاں' : 'Featured'}
                </span>
                <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {isUrdu ? filtered[0]?.titleUr : filtered[0]?.title}
                </h2>
                <p className="text-white/75 text-sm leading-relaxed mb-4">
                  {isUrdu ? filtered[0]?.excerptUr : filtered[0]?.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/60 text-xs mb-4">
                  <span>📅 {filtered[0]?.date}</span>
                  <span>⏱️ {isUrdu ? filtered[0]?.readTimeUr : filtered[0]?.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 bg-white text-[#1a3a6b] px-6 py-2.5 rounded-full font-bold text-sm">
                  {isUrdu ? 'مضمون پڑھیں ←' : 'Read Article →'}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(1).map((blog, i) => (
            <FadeIn key={blog.id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group" onClick={() => setSelectedBlog(blog)}>
                <div className="relative h-52 overflow-hidden">
                  <img src={blog.image} alt={isUrdu ? blog.titleUr : blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#1a3a6b] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {isUrdu ? blog.categoryUr : blog.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span>📅 {blog.date}</span>
                    <span>•</span>
                    <span>⏱️ {isUrdu ? blog.readTimeUr : blog.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1f3c] mb-2 group-hover:text-[#c0392b] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {isUrdu ? blog.titleUr : blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {isUrdu ? blog.excerptUr : blog.excerpt}
                  </p>
                  <span className="text-[#c0392b] font-semibold text-sm">
                    {isUrdu ? 'مزید پڑھیں ←' : 'Read More →'}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-16 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isUrdu ? 'شمالی پاکستان دریافت کرنے کے لیے تیار ہیں؟' : 'Ready to Explore Northern Pakistan?'}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {isUrdu ? 'پڑھنا بند کریں اور دریافت کرنا شروع کریں! آج اپنا خوابوں کا ٹور بک کریں۔' : 'Stop reading and start exploring! Book your dream tour today.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/tours" className="bg-[#c0392b] text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5 shadow-lg">
                {isUrdu ? 'ٹور پیکجز دیکھیں' : 'Browse Tour Packages'}
              </a>
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