'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, Clock, Plus } from 'lucide-react'

type Event = {
  id: number
  title: string
  date: string
  time: string
}

const mockEvents: Event[] = [
  { id: 1, title: 'Morning Run', date: '2023-06-01', time: '06:00 AM' },
  { id: 2, title: 'Yoga Class', date: '2023-06-02', time: '07:30 AM' },
  { id: 3, title: 'Weightlifting Session', date: '2023-06-03', time: '05:00 PM' },
]

export default function CalendarIntegration() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [showForm, setShowForm] = useState(false)
  const [newEvent, setNewEvent] = useState<Event>({
    id: 0,
    title: '',
    date: '',
    time: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEvents([...events, { ...newEvent, id: Date.now() }])
    setShowForm(false)
    setNewEvent({ id: 0, title: '', date: '', time: '' })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Calendar Integration
      </h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-700 rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-500 rounded-full p-2 mr-4">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-400">
                {event.date} at {event.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Event
        </button>
      )}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-4 bg-gray-700 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full bg-gray-600 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full bg-gray-600 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full bg-gray-600 rounded-lg p-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mr-2 px-4 py-2 bg-gray-600 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg text-sm">
              Add Event
            </button>
          </div>
        </motion.form>
      )}
    </div>
  )
}

