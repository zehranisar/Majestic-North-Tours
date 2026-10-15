import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Tours from './pages/Tours'
import TourDetail from './pages/TourDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Booking from './pages/Booking'
import Terms from './pages/Terms'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminTours from './pages/admin/AdminTours'
import AdminContacts from './pages/admin/AdminContacts'
import AdminReviews from './pages/admin/AdminReviews'
import Compare from './pages/Compare'
import ZukoChatbot from './components/ZukoChatbot'
import Reviews from './pages/Reviews'


const Layout = () => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/tours" element={<AdminTours />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <ZukoChatbot />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App