import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'

const AdminLogin = () => {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      if (key === 'majestic-admin-2026') {
        localStorage.setItem('admin_key', key)
        navigate('/admin/dashboard')
      } else {
        setError('Invalid admin key!')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#0d1f3c] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-[#1a3a6b]" />
          <h1 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin Panel
          </h1>
          <p className="text-gray-500 text-sm mt-1">Majestic North Tours</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin key"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !key}
            className="w-full bg-[#0d1f3c] text-white py-3.5 rounded-xl font-bold hover:bg-[#1a3a6b] transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Login to Admin Panel'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Majestic North Tours © 2026
        </p>
      </div>
    </div>
  )
}

export default AdminLogin