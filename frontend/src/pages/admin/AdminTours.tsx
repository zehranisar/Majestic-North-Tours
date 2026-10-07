import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../config'
import AdminLayout from '../../components/AdminLayout'

const AdminTours = () => {
  const adminKey = localStorage.getItem('admin_key') || ''
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editTour, setEditTour] = useState<any>(null)
  const [form, setForm] = useState({
    name: '', description: '', price: '', duration_days: '',
    region: '', difficulty: 'Easy', max_people: '', image_url: '',
    is_featured: false, is_active: true
  })

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = () => {
    setLoading(true)
    axios.get(`${API_URL}/api/tours`)
      .then(res => setTours(res.data))
      .catch(() => setTours([]))
      .finally(() => setLoading(false))
  }

  const handleSubmit = async () => {
    const data = {
      ...form,
      price: Number(form.price),
      duration_days: Number(form.duration_days),
      max_people: Number(form.max_people),
    }
    if (editTour) {
      await axios.put(`${API_URL}/api/admin/tours/${editTour.id}`, data, { headers: { 'x-admin-key': adminKey } })
    } else {
      await axios.post(`${API_URL}/api/admin/tours`, data, { headers: { 'x-admin-key': adminKey } })
    }
    setShowForm(false)
    setEditTour(null)
    setForm({ name: '', description: '', price: '', duration_days: '', region: '', difficulty: 'Easy', max_people: '', image_url: '', is_featured: false, is_active: true })
    fetchTours()
  }

  const handleEdit = (tour: any) => {
    setEditTour(tour)
    setForm({
      name: tour.name, description: tour.description, price: tour.price,
      duration_days: tour.duration_days, region: tour.region, difficulty: tour.difficulty,
      max_people: tour.max_people, image_url: tour.image_url || '',
      is_featured: tour.is_featured, is_active: tour.is_active
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return
    await axios.delete(`${API_URL}/api/admin/tours/${id}`, { headers: { 'x-admin-key': adminKey } })
    fetchTours()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Playfair Display, serif' }}>Tours</h1>
          <p className="text-gray-500 text-sm mt-1">{tours.length} total tours</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditTour(null) }}
          className="bg-[#c0392b] text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors text-sm">
          + Add New Tour
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-[#0d1f3c] mb-4">{editTour ? 'Edit Tour' : 'Add New Tour'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tour Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Tour name" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Region</label>
              <input value={form.region} onChange={e => setForm({...form, region: e.target.value})}
                placeholder="Region" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Price (per person)</label>
              <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                placeholder="Price" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Duration (days)</label>
              <input type="number" value={form.duration_days} onChange={e => setForm({...form, duration_days: e.target.value})}
                placeholder="Days" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Max People</label>
              <input type="number" value={form.max_people} onChange={e => setForm({...form, max_people: e.target.value})}
                placeholder="Max people" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Hard</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
              <input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})}
                placeholder="Image URL" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                placeholder="Tour description" rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b] resize-none" />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} />
                Featured Tour
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} />
                Active
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit}
              className="bg-[#0d1f3c] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1a3a6b] transition-colors text-sm">
              {editTour ? 'Update Tour' : 'Add Tour'}
            </button>
            <button onClick={() => { setShowForm(false); setEditTour(null) }}
              className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
          <div className="text-5xl animate-bounce mb-4">🏔️</div>
          <p className="text-gray-500">Loading tours...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour: any) => (
            <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-36 overflow-hidden relative">
                <img src={tour.image_url} alt={tour.name} className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {tour.is_featured && (
                  <span className="absolute top-2 left-2 bg-[#c0392b] text-white text-xs px-2 py-0.5 rounded-full">Featured</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0d1f3c] text-sm mb-1">{tour.name}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{tour.region} • {tour.duration_days} Days</span>
                  <span className="font-bold text-[#c0392b]">PKR {tour.price?.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(tour)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tour.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminTours