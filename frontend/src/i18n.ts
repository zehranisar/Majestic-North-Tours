import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navbar
      home: 'Home',
      tours: 'Tours',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      terms: 'Terms',
      reviews: 'Reviews',
      bookNow: 'Book Now',

      // Home
      heroTitle: 'Discover the',
      heroSubtitle: 'Majestic North',
      heroDesc: 'Experience the breathtaking beauty of Gilgit-Baltistan, Hunza, Skardu and beyond.',
      exploreTours: 'Explore Tours',
      contactUs: 'Contact Us',
      happyTravelers: 'Happy Travelers',
      tourPackages: 'Tour Packages',
      yearsExperience: 'Years Experience',
      destinations: 'Destinations',
      featuredPackages: 'Featured Packages',
      viewAllTours: 'View All Tours',
      viewDetails: 'View Details',
      startingFrom: 'Starting from',
      perPerson: 'per person',
      days: 'Days',

      // Tours
      ourTourPackages: 'Our Tour Packages',
      toursFound: 'tours found',
      searchTours: 'Search tours...',
      sortBy: 'Sort By',
      priceLowHigh: 'Price: Low to High',
      priceHighLow: 'Price: High to Low',
      duration: 'Duration',
      difficulty: 'Difficulty',
      maxPeople: 'Max People',
      persons: 'Persons',

      // Tour Detail
      aboutThisTour: 'About This Tour',
      itinerary: 'Itinerary',
      inclusions: 'Inclusions',
      overview: 'Overview',
      included: 'What is Included',
      notIncluded: 'Not Included',
      cancellationPolicy: 'Cancellation Policy',
      tourLocation: 'Tour Location',
      tourAvailability: 'Tour Availability',
      bookNowBtn: 'Book Now',
      bookNowPrice: 'Book Now',
      whatsappInquiry: 'WhatsApp Inquiry',
      freeCancellation: 'Free cancellation up to 30 days before',
      bestPrice: 'Best price guaranteed',
      support247: '24/7 customer support',
      breakfastIncluded: 'Breakfast included',
      dayByDay: 'Day by Day Itinerary',

      // About
      ourStory: 'Our Story',
      ourValues: 'Our Core Values',
      meetTeam: 'Meet Our Team',
      whyChooseUs: 'Why Choose Majestic North?',
      exploreOurTours: 'Explore Our Tours',

      // Contact
      getInTouch: 'Get In Touch',
      sendMessage: 'Send Message',
      sendMessageBtn: 'Send Message',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      messageSent: 'Message Sent!',
      followUs: 'Follow Us',
      officeHours: 'Office Hours',
      faqTitle: 'Frequently Asked Questions',

      // Blog
      browseTourPackages: 'Browse Tour Packages',

      // Footer
      quickLinks: 'Quick Links',
      popularTours: 'Popular Tours',
      allRightsReserved: 'All rights reserved',
    }
  },
  ur: {
    translation: {
      // Navbar
      home: 'ہوم',
      tours: 'ٹورز',
      about: 'ہمارے بارے میں',
      blog: 'بلاگ',
      contact: 'رابطہ',
      terms: 'شرائط',
      reviews: 'جائزے',
      bookNow: 'ابھی بک کریں',

      // Home
      heroTitle: 'دریافت کریں',
      heroSubtitle: 'شاندار شمال',
      heroDesc: 'گلگت بلتستان، ہنزہ، سکردو اور اس سے آگے کی دلکش خوبصورتی کا تجربہ کریں۔',
      exploreTours: 'ٹورز دیکھیں',
      contactUs: 'رابطہ کریں',
      happyTravelers: 'خوش مسافر',
      tourPackages: 'ٹور پیکجز',
      yearsExperience: 'سال کا تجربہ',
      destinations: 'منزلیں',
      featuredPackages: 'نمایاں پیکجز',
      viewAllTours: 'تمام ٹورز دیکھیں',
      viewDetails: 'تفصیلات دیکھیں',
      startingFrom: 'شروعات سے',
      perPerson: 'فی شخص',
      days: 'دن',

      // Tours
      ourTourPackages: 'ہمارے ٹور پیکجز',
      toursFound: 'ٹورز ملے',
      searchTours: 'ٹورز تلاش کریں...',
      sortBy: 'ترتیب دیں',
      priceLowHigh: 'قیمت: کم سے زیادہ',
      priceHighLow: 'قیمت: زیادہ سے کم',
      duration: 'مدت',
      difficulty: 'مشکل',
      maxPeople: 'زیادہ سے زیادہ لوگ',
      persons: 'افراد',

      // Tour Detail
      aboutThisTour: 'اس ٹور کے بارے میں',
      itinerary: 'سفر نامہ',
      inclusions: 'شامل',
      overview: 'جائزہ',
      included: 'کیا شامل ہے',
      notIncluded: 'شامل نہیں',
      cancellationPolicy: 'منسوخی پالیسی',
      tourLocation: 'ٹور مقام',
      tourAvailability: 'ٹور دستیابی',
      bookNowBtn: 'ابھی بک کریں',
      bookNowPrice: 'ابھی بک کریں',
      whatsappInquiry: 'واٹس ایپ پر پوچھیں',
      freeCancellation: 'روانگی سے 30 دن پہلے مفت منسوخی',
      bestPrice: 'بہترین قیمت کی گارنٹی',
      support247: '24/7 کسٹمر سپورٹ',
      breakfastIncluded: 'ناشتہ شامل ہے',
      dayByDay: 'روزانہ کا سفر نامہ',

      // About
      ourStory: 'ہماری کہانی',
      ourValues: 'ہماری بنیادی اقدار',
      meetTeam: 'ہماری ٹیم سے ملیں',
      whyChooseUs: 'میجسٹک نارتھ کیوں منتخب کریں؟',
      exploreOurTours: 'ہمارے ٹورز دیکھیں',

      // Contact
      getInTouch: 'رابطہ کریں',
      sendMessage: 'پیغام بھیجیں',
      sendMessageBtn: 'پیغام بھیجیں',
      fullName: 'پورا نام',
      phoneNumber: 'فون نمبر',
      emailAddress: 'ای میل',
      subject: 'موضوع',
      message: 'پیغام',
      send: 'پیغام بھیجیں',
      messageSent: 'پیغام بھیج دیا گیا!',
      followUs: 'ہمیں فالو کریں',
      officeHours: 'دفتری اوقات',
      faqTitle: 'اکثر پوچھے گئے سوالات',

      // Blog
      browseTourPackages: 'ٹور پیکجز دیکھیں',

      // Footer
      quickLinks: 'فوری لنکس',
      popularTours: 'مقبول ٹورز',
      allRightsReserved: 'تمام حقوق محفوظ ہیں',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n