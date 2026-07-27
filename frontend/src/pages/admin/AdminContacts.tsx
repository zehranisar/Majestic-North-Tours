import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import logo from '../../assets/logo.jpeg'

const AdminContacts = () => {
  const navigate = useNavigate()
  const adminKey = localStorage.getItem('admin_key') || ''
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!adminKey) { navigate('/admin'); return }
    axios.get(`${API_URL}/api/admin/contacts`, {
      headers: { 'x-admin-key': adminKey }
    })
      .then(res => setContacts(res.data))
      .catch(() => setContacts([]))
      .finally(() => setLoading(false))
  }, [])

  const markRead = async (id: number) => {
    await axios.put(`${API_URL}/api/contacts/${id}/read`, {}, {
      headers: { 'x-admin-key': adminKey }
    })
    setContacts(contacts.map(c => c.id === id ? { ...c, is_read: true } : c))
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
          <h1 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Playfair Display, serif' }}>Contacts</h1>
          <p className="text-gray-500 text-sm mt-1">{contacts.filter(c => !c.is_read).length} unread messages</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl animate-bounce mb-4">✉️</div>
            <p className="text-gray-500">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">No contacts yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact: any) => (
              <div key={contact.id} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${!contact.is_read ? 'border-[#c0392b]' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-[#0d1f3c]">{contact.name}</span>
                      {!contact.is_read && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">New</span>
                      )}
                      <span className="text-xs text-gray-400">{new Date(contact.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Email</p>
                        <p className="font-medium text-gray-700">{contact.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Phone</p>
                        <p className="font-medium text-gray-700">{contact.phone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-gray-400 text-xs mb-1">Subject</p>
                      <p className="font-semibold text-gray-700 capitalize">{contact.subject || 'General'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-gray-400 text-xs mb-1">Message</p>
                      <p className="text-sm text-gray-700">{contact.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    {!contact.is_read && (
                      <button onClick={() => markRead(contact.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors">
                        Mark Read
                      </button>
                    )}
                    <a href={`mailto:${contact.email}`}
                      className="px-4 py-2 bg-[#0d1f3c] text-white rounded-xl text-xs font-semibold hover:bg-[#1a3a6b] transition-colors text-center">
                      Reply Email
                    </a>
                    {contact.phone && (
                      <a href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '')}`}
                        target="_blank" rel="noreferrer"
                        className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors text-center">
                        WhatsApp
                      </a>
                    )}
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

export default AdminContacts