import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const adminKey = localStorage.getItem('admin_key') || ''

  useEffect(() => {
    if (!adminKey) {
      navigate('/admin')
    }
  }, [adminKey])

  const logout = () => {
    localStorage.removeItem('admin_key')
    navigate('/admin')
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
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-[#c0392b] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm"
          >
            <span>🚪</span> Logout
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm mt-1"
          >
            <span>🌐</span> View Website
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout