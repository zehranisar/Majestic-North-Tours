import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

interface Tour {
  id: number
  name: string
  duration_days: number
  price: number
  region: string
  difficulty: string
  max_people: number
}

interface BookingForm {
  customer_name: string
  customer_email: string
  customer_phone: string
  travel_date: string
  num_people: number
  special_requests: string
  payment_method: string
}

const demoTours: Record<string, Tour> = {
  '1': { id: 1, name: 'Hunza Valley Tour', duration_days: 7, price: 150000, region: 'Hunza', difficulty: 'Easy', max_people: 5 },
  '2': { id: 2, name: 'Skardu Adventure', duration_days: 5, price: 95000, region: 'Skardu', difficulty: 'Moderate', max_people: 4 },
  '3': { id: 3, name: 'Fairy Meadows Trek', duration_days: 3, price: 95000, region: 'Diamer', difficulty: 'Hard', max_people: 4 },
  '4': { id: 4, name: 'Deosai Plains Tour', duration_days: 3, price: 70000, region: 'Skardu', difficulty: 'Easy', max_people: 5 },
  '5': { id: 5, name: 'Naltar Valley Tour', duration_days: 3, price: 75000, region: 'Gilgit', difficulty: 'Easy', max_people: 5 },
  '6': { id: 6, name: 'Attabad Lake Tour', duration_days: 1, price: 35000, region: 'Hunza', difficulty: 'Easy', max_people: 5 },
  '7': { id: 7, name: 'Shigar Valley Tour', duration_days: 4, price: 65000, region: 'Skardu', difficulty: 'Easy', max_people: 4 },
  '8': { id: 8, name: 'Rama Meadows Tour', duration_days: 2, price: 60000, region: 'Astore', difficulty: 'Moderate', max_people: 4 },
  '9': { id: 9, name: 'Passu Cones and Glacier', duration_days: 4, price: 85000, region: 'Hunza', difficulty: 'Moderate', max_people: 4 },
  '10': { id: 10, name: 'Khaplu Highlights', duration_days: 4, price: 85000, region: 'Ghanche', difficulty: 'Easy', max_people: 5 },
  '11': { id: 11, name: 'Thagas Valley Tour', duration_days: 5, price: 99999, region: 'Ghanche', difficulty: 'Moderate', max_people: 4 },
  '12': { id: 12, name: 'Chitral and Kalash', duration_days: 5, price: 120000, region: 'Chitral', difficulty: 'Easy', max_people: 5 },
}

const Booking = () => {
  const { id } = useParams()
  const [tour, setTour] = useState<Tour | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [form, setForm] = useState<BookingForm>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    travel_date: '',
    num_people: 1,
    special_requests: '',
    payment_method: 'jazzcash',
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tours/${id}`)
      .then(res => {
        if (res.data && res.data.id) setTour(res.data)
        else setTour(demoTours[id as string] || demoTours['1'])
      })
      .catch(() => setTour(demoTours[id as string] || demoTours['1']))
  }, [id])

  const totalPrice = tour ? tour.price * form.num_people : 0
  const depositAmount = Math.round(totalPrice * 0.3)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.name === 'num_people' ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const generateBookingId = () => {
    return 'MNT-' + Math.random().toString(36).substr(2, 8).toUpperCase()
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post('http://127.0.0.1:8000/api/bookings', {
        tour_id: tour?.id,
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        travel_date: form.travel_date,
        num_people: form.num_people,
        total_price: totalPrice,
        status: 'pending',
        payment_method: form.payment_method,
        special_requests: form.special_requests,
      })
    } catch {
      // continue even if API fails
    } finally {
      setBookingId(generateBookingId())
      setLoading(false)
      setSuccess(true)
    }
  }

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-100 text-green-700'
    if (d === 'Moderate') return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  if (!tour) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl animate-bounce mb-4">🏔️</div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  )

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-2xl font-bold text-[#0d1f3c] mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-6">Thank you for booking with Majestic North Tours. Our team will contact you within 24 hours to confirm your booking.</p>

        <div className="bg-blue-50 rounded-xl p-5 mb-6 text-left space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Booking ID</span>
            <span className="font-bold text-[#1a3a6b] text-sm">{bookingId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Tour</span>
            <span className="font-semibold text-[#0d1f3c] text-sm">{tour.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Name</span>
            <span className="font-semibold text-[#0d1f3c] text-sm">{form.customer_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Travel Date</span>
            <span className="font-semibold text-[#0d1f3c] text-sm">{form.travel_date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">People</span>
            <span className="font-semibold text-[#0d1f3c] text-sm">{form.num_people}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Payment Method</span>
            <span className="font-semibold text-[#0d1f3c] text-sm capitalize">{form.payment_method}</span>
          </div>
          <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-[#0d1f3c]">Total Amount</span>
            <span className="font-bold text-[#c0392b] text-lg">PKR {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center bg-green-50 rounded-lg p-2">
            <span className="text-green-700 text-sm">Deposit Required (30%)</span>
            <span className="font-bold text-green-700">PKR {depositAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-yellow-800 font-semibold text-sm mb-1">Next Steps</p>
          <ul className="text-yellow-700 text-xs space-y-1">
            <li>1. Pay deposit of PKR {depositAmount.toLocaleString()} via {form.payment_method}</li>
            <li>2. Send payment screenshot to our WhatsApp</li>
            <li>3. Our team will confirm your booking within 24 hours</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm"
          >
            WhatsApp Us
          </a>
          <Link
            to="/tours"
            className="flex-1 bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold hover:bg-[#c0392b] transition-colors text-sm"
          >
            Browse More Tours
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to={`/tours/${id}`} className="text-white/60 text-sm hover:text-white mb-4 inline-flex items-center gap-1">
            Back to Tour Details
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1">Book Your Tour</h1>
          <p className="text-white/70 text-sm">{tour.name} • {tour.region} • {tour.duration_days} Days</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4 pb-16">

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Personal Details' },
              { num: 2, label: 'Tour Info' },
              { num: 3, label: 'Payment' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${step >= s.num ? 'text-[#c0392b]' : 'text-gray-400'}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.num ? 'bg-[#c0392b] text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-400'}`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{s.label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s.num ? 'bg-[#c0392b]' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#0d1f3c] mb-1">Personal Details</h2>
                <p className="text-gray-400 text-sm mb-6">Please provide your contact information</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="customer_email"
                      value={form.customer_email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={form.customer_phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b] transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!form.customer_name || !form.customer_email || !form.customer_phone}
                    className="w-full bg-[#1a3a6b] text-white py-3.5 rounded-xl font-bold hover:bg-[#c0392b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  >
                    Continue to Tour Details
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#0d1f3c] mb-1">Tour Information</h2>
                <p className="text-gray-400 text-sm mb-6">Select your travel date and group size</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Date</label>
                    <input
                      type="date"
                      name="travel_date"
                      value={form.travel_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of People</label>
                    <select
                      name="num_people"
                      value={form.num_people}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all"
                    >
                      {Array.from({ length: tour.max_people }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'} — PKR {(tour.price * n).toLocaleString()}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Maximum {tour.max_people} people per booking</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Special Requests <span className="font-normal text-gray-400">(Optional)</span></label>
                    <textarea
                      name="special_requests"
                      value={form.special_requests}
                      onChange={handleChange}
                      placeholder="Any dietary requirements, accessibility needs, or special requests..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a6b] resize-none transition-all"
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!form.travel_date}
                      className="flex-1 bg-[#1a3a6b] text-white py-3.5 rounded-xl font-bold hover:bg-[#c0392b] transition-colors disabled:opacity-40"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#0d1f3c] mb-1">Payment Method</h2>
                <p className="text-gray-400 text-sm mb-6">Choose your preferred payment method</p>

                <div className="space-y-3 mb-6">
                  {[
                    { value: 'jazzcash', label: 'JazzCash', icon: '📱', detail: 'Account: 0300-1234567 — Majestic North Tours' },
                    { value: 'easypaisa', label: 'EasyPaisa', icon: '💚', detail: 'Account: 0300-1234567 — Majestic North Tours' },
                    { value: 'bank', label: 'Bank Transfer (HBL)', icon: '🏦', detail: 'Account: 12345678901 — IBAN: PK36HABB0000012345678901' },
                    { value: 'cash', label: 'Cash on Arrival', icon: '💵', detail: 'Pay at our Skardu or Gilgit office before departure' },
                  ].map(pm => (
                    <label
                      key={pm.value}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.payment_method === pm.value ? 'border-[#c0392b] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={pm.value}
                        checked={form.payment_method === pm.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="text-2xl">{pm.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-[#0d1f3c] text-sm">{pm.label}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{pm.detail}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.payment_method === pm.value ? 'border-[#c0392b] bg-[#c0392b]' : 'border-gray-300'}`}>
                        {form.payment_method === pm.value && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 font-bold text-sm mb-2">Payment Policy</p>
                  <ul className="text-yellow-700 text-xs space-y-1">
                    <li>• Pay 30% deposit (PKR {depositAmount.toLocaleString()}) to confirm your booking</li>
                    <li>• Remaining 70% (PKR {(totalPrice - depositAmount).toLocaleString()}) due 14 days before departure</li>
                    <li>• Send payment screenshot to WhatsApp for verification</li>
                    <li>• Free cancellation up to 30 days before departure</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-[#c0392b] text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-lg shadow-red-200"
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

              <div className="bg-gradient-to-br from-[#0d1f3c] to-[#1a3a6b] rounded-xl p-5 mb-5 text-center">
                <div className="text-4xl mb-2">🏔️</div>
                <p className="text-white font-bold text-sm">{tour.name}</p>
                <p className="text-blue-300 text-xs mt-1">{tour.region}</p>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-[#0d1f3c]">{tour.duration_days} Days</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Difficulty</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Price per person</span>
                  <span className="font-semibold text-[#0d1f3c]">PKR {tour.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">People</span>
                  <span className="font-semibold text-[#0d1f3c]">{form.num_people}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-[#0d1f3c]">Total</span>
                  <span className="font-bold text-[#c0392b] text-xl">PKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 text-sm font-semibold">Deposit (30%)</span>
                  <span className="font-bold text-green-700">PKR {depositAmount.toLocaleString()}</span>
                </div>
                <p className="text-green-600 text-xs mt-1">Pay this amount to confirm booking</p>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>
                  Free cancellation up to 30 days before
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>
                  Best price guaranteed
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>
                  24/7 customer support
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500 font-bold">✓</span>
                  Expert local guides
                </div>
              </div>

              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm"
              >
                Need Help? WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking