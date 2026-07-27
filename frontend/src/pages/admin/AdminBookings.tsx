import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import logo from '../../assets/logo.jpeg'

const AdminBookings = () => {
  const navigate = useNavigate()
  const adminKey = localStorage.getItem('admin_key') || ''
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!adminKey) { navigate('/admin'); return }
    fetchBookings()
  }, [])

  const fetchBookings = () => {
    setLoading(true)
    axios.get(`${API_URL}/api/admin/bookings`, {
      headers: { 'x-admin-key': adminKey }
    })
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }

  const updateStatus = async (id: number, status: string) => {
    await axios.put(`${API_URL}/api/admin/bookings/${id}/status`,
      { status },
      { headers: { 'x-admin-key': adminKey } }
    )
    fetchBookings()
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const statusColor = (s: string) => {
    if (s === 'confirmed') return 'bg-green-100 text-green-700'
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700'
    if (s === 'cancelled') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
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

      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Playfair Display, serif' }}>Bookings</h1>
            <p className="text-gray-500 text-sm mt-1">{bookings.length} total bookings</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter === f ? 'bg-[#0d1f3c] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl animate-bounce mb-4">📋</div>
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking: any) => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-bold text-[#0d1f3c]">{booking.customer_name}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {booking.booking_ref && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{booking.booking_ref}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Email</p>
                        <p className="font-medium text-gray-700">{booking.customer_email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Phone</p>
                        <p className="font-medium text-gray-700">{booking.customer_phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Travel Date</p>
                        <p className="font-medium text-gray-700">{booking.travel_date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">People</p>
                        <p className="font-medium text-gray-700">{booking.num_people}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Payment</p>
                        <p className="font-medium text-gray-700 capitalize">{booking.payment_method}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Total Amount</p>
                        <p className="font-bold text-[#c0392b]">PKR {booking.total_price?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Deposit (30%)</p>
                        <p className="font-bold text-green-600">PKR {Math.round(booking.total_price * 0.3)?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Booked On</p>
                        <p className="font-medium text-gray-700">{new Date(booking.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {booking.special_requests && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs text-blue-600 font-semibold mb-1">Special Requests:</p>
                        <p className="text-sm text-blue-800">{booking.special_requests}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <button onClick={() => updateStatus(booking.id, 'confirmed')}
                      disabled={booking.status === 'confirmed'}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors disabled:opacity-40">
                      ✓ Confirm
                    </button>
                    <button onClick={() => updateStatus(booking.id, 'cancelled')}
                      disabled={booking.status === 'cancelled'}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold hover:bg-red-600 transition-colors disabled:opacity-40">
                      ✗ Cancel
                    </button>
                    <a href={`https://wa.me/${booking.customer_phone?.replace(/[^0-9]/g, '')}`}
                      target="_blank" rel="noreferrer"
                      className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors text-center">
                      WhatsApp
                    </a>
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

export default AdminBookings