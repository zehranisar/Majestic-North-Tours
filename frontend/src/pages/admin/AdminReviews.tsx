import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../config'
import AdminLayout from '../../components/AdminLayout'

const AdminReviews = () => {
  const adminKey = localStorage.getItem('admin_key') || ''
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  return (
    <AdminLayout>
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
    </AdminLayout>
  )
}

export default AdminReviews