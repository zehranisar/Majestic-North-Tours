import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import AdminLayout from '../../components/AdminLayout'

const AdminDashboard = () => {
  const adminKey = localStorage.getItem('admin_key') || ''
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/api/admin/stats`, {
      headers: { 'x-admin-key': adminKey }
    })
      .then(res => setStats(res.data))
      .catch(() => setStats({
        total_bookings: 0, pending_bookings: 0, total_revenue: 0,
        total_contacts: 0, unread_contacts: 0, total_reviews: 0,
        pending_reviews: 0, total_tours: 12
      }))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here is what is happening today.</p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-5xl animate-bounce mb-4">🏔️</div>
          <p className="text-gray-500">Loading stats...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Bookings', value: stats?.total_bookings || 0, icon: '📋', color: 'bg-blue-50 text-blue-600', sub: `${stats?.pending_bookings || 0} pending` },
              { label: 'Total Revenue', value: `PKR ${(stats?.total_revenue || 0).toLocaleString()}`, icon: '💰', color: 'bg-green-50 text-green-600', sub: 'All time' },
              { label: 'Contacts', value: stats?.total_contacts || 0, icon: '✉️', color: 'bg-yellow-50 text-yellow-600', sub: `${stats?.unread_contacts || 0} unread` },
              { label: 'Total Tours', value: stats?.total_tours || 0, icon: '🏔️', color: 'bg-red-50 text-red-600', sub: 'Active packages' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#0d1f3c]">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-[#0d1f3c] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { label: 'Manage Bookings', path: '/admin/bookings', icon: '📋', color: 'bg-blue-50 text-blue-600' },
                  { label: 'Manage Tours', path: '/admin/tours', icon: '🏔️', color: 'bg-green-50 text-green-600' },
                  { label: 'View Contacts', path: '/admin/contacts', icon: '✉️', color: 'bg-yellow-50 text-yellow-600' },
                  { label: 'Approve Reviews', path: '/admin/reviews', icon: '⭐', color: 'bg-purple-50 text-purple-600' },
                ].map((action, i) => (
                  <Link key={i} to={action.path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${action.color}`}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    <span className="ml-auto text-gray-400">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-[#0d1f3c] mb-4">Pending Actions</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <span className="text-sm text-yellow-800">Pending Bookings</span>
                  <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">{stats?.pending_bookings || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="text-sm text-blue-800">Unread Contacts</span>
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{stats?.unread_contacts || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-purple-800">Pending Reviews</span>
                  <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">{stats?.pending_reviews || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default AdminDashboard