import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import logo from '../../assets/logo.jpeg'

const AdminReviews = () => {
  const navigate = useNavigate()
  const adminKey = localStorage.getItem('admin_key') || ''
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!adminKey) { navigate('/admin'); return }
    axios.get(`${API_URL}/api/admin/reviews/pending`, {
      headers: { 'x-admin-key': adminKey }
    })
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [])

  const approveReview = async (id: number) => {
    await axios.put(`${API_URL}/api/admin/reviews/${id}/approve`, {}, {
      headers: { 'x-admin-key': adminKey }
    })
    setReviews(reviews.filter(r => r.id !== id))
  }

  const deleteReview = async (id: number) => {
    await axios.delete(`${API_URL}/api/admin/reviews/${id}`, {
      headers: { 'x-admin-key': adminKey }
    })
    setReviews(reviews.filter(r => r.id !== id))
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Bookings', path: '/admin/bookings', icon: '📋' },
    { name: 'Tours', path: '/admin/tours', icon: '🏔️' },
    { name: 'Contacts', path: '/admin/contacts', icon: '✉️' },
    { name: 'Reviews', path: '/admin/reviews', icon: '⭐' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-[#0d1f3c] min-h-screen flex flex-col fixed left-0 top-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
            <div>
              <p className="text-white font-bold text-sm">Majestic North</p>
              <p className="text-blue-300 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${window.location.pathname === item.path ? 'bg-[#c0392b] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <span>{item.icon}</span>{item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => { localStorage.removeItem('admin_key'); navigate('/admin') }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm">
            <span>🚪</span> Logout
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm mt-1">
            <span>🌐</span> View Website
          </Link>
        </div>
      </div>

      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Playfair Display, serif' }}>Pending Reviews</h1>
          <p className="text-gray-500 text-sm mt-1">{reviews.length} reviews waiting for approval</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl animate-bounce mb-4">⭐</div>
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-gray-500 font-medium">All caught up! No pending reviews.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-[#0d1f3c]">{review.customer_name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">⭐</span>)}
                      </div>
                      <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-xl">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">Email: {review.customer_email}</p>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <button onClick={() => approveReview(review.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors">
                      ✓ Approve
                    </button>
                    <button onClick={() => deleteReview(review.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold hover:bg-red-600 transition-colors">
                      ✗ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminReviews