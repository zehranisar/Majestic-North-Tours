import { useState, useRef, useEffect } from 'react'
import zukoImg from '../assets/zuko.png'



interface Message {
  role: 'user' | 'assistant'
  content: string
}

const ZukoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am Zuko, your personal tour guide for Majestic North Tours. I can help you with information about our tours, pricing, booking and travel tips for Northern Pakistan. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

          const sendMessage = async () => {
  if (!input.trim() || loading) return

  const userMessage = input.trim()
  setInput('')
  setMessages(prev => [...prev, { role: 'user', content: userMessage }])
  setLoading(true)

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: messages.map(m => ({ role: m.role, content: m.content }))
      })
    })

    const data = await response.json()
    setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
  } catch (error) {
    console.error('Chatbot error:', error)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Sorry, there was a technical issue. Please contact us on WhatsApp: +92 325 1002509'
    }])
  } finally {
    setLoading(false)
  }
}

  const quickQuestions = [
    'How much is Hunza tour?',
    'Best time to visit?',
    'How to book a tour?',
    'Cancellation policy?',
  ]

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        style={{ background: 'linear-gradient(135deg, #0d1f3c, #1a3a6b)' }}
      >
        <img src={zukoImg} alt="Zuko" className="w-12 h-12 rounded-full object-cover" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '520px' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a6b] p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <img src={zukoImg} alt="Zuko" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Zuko</p>
                <p className="text-blue-300 text-xs">Majestic North Tours Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-xs">Online</span>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white ml-2 text-lg leading-none">X</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <img src={zukoImg} alt="Zuko" className="w-7 h-7 rounded-full object-cover mr-2 flex-shrink-0 mt-1" />
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0d1f3c] text-white rounded-tr-sm'
                      : 'bg-white text-gray-700 shadow-sm rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <img src={zukoImg} alt="Zuko" className="w-7 h-7 rounded-full object-cover mr-2 flex-shrink-0" />
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex-shrink-0">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your question here..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a3a6b] transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-10 h-10 bg-[#0d1f3c] text-white rounded-xl flex items-center justify-center hover:bg-[#1a3a6b] transition-colors disabled:opacity-40 flex-shrink-0"
              >
                &gt;
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Powered by Majestic North Tours</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ZukoChatbot