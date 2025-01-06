'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, User, Send } from 'lucide-react'

type Message = {
  sender: 'user' | 'coach'
  content: string
}

export default function VirtualCoach() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'coach', content: 'Hello! I\'m your virtual fitness coach. How can I assist you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() === '') return

    setMessages(prev => [...prev, { sender: 'user', content: input }])
    setInput('')

    // Simulate coach response (in a real app, this would call an AI service)
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'coach', content: 'Thank you for your message. I\'m here to help you achieve your fitness goals. Could you please provide more details about your current fitness routine and goals?' }])
    }, 1000)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-[400px] flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Virtual Coach
      </h2>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'coach' && (
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <MessageSquare size={20} />
              </div>
            )}
            <div className={`rounded-lg p-3 max-w-[70%] ${
              message.sender === 'user' ? 'bg-green-500' : 'bg-gray-700'
            }`}>
              {message.content}
            </div>
            {message.sender === 'user' && (
              <div className="bg-green-500 rounded-full p-2 ml-3">
                <User size={20} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your virtual coach..."
          className="flex-grow bg-gray-700 rounded-l-lg p-3 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white rounded-r-lg p-3 hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

