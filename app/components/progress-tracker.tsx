'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Plus, Ruler } from 'lucide-react'

type Measurement = {
  date: string
  weight: number
  bodyFat: number
  muscleMass: number
}

const mockMeasurements: Measurement[] = [
  { date: '2023-05-01', weight: 180, bodyFat: 20, muscleMass: 140 },
  { date: '2023-05-15', weight: 178, bodyFat: 19, muscleMass: 141 },
  { date: '2023-05-29', weight: 176, bodyFat: 18, muscleMass: 142 },
]

export default function ProgressTracker() {
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements)
  const [showForm, setShowForm] = useState(false)
  const [newMeasurement, setNewMeasurement] = useState<Measurement>({
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    bodyFat: 0,
    muscleMass: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMeasurements([...measurements, newMeasurement])
    setShowForm(false)
    setNewMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: 0,
      bodyFat: 0,
      muscleMass: 0,
    })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Progress Tracker
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Progress Photos</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((photo) => (
              <div key={photo} className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
                <Camera size={24} className="text-gray-400" />
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Plus size={20} className="mr-2" />
            Add New Photo
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Body Measurements</h3>
          {measurements.map((measurement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-3 mb-2"
            >
              <p className="text-sm text-gray-400 mb-1">{measurement.date}</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-400">Weight</p>
                  <p className="font-semibold">{measurement.weight} lbs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Body Fat</p>
                  <p className="font-semibold">{measurement.bodyFat}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Muscle Mass</p>
                  <p className="font-semibold">{measurement.muscleMass} lbs</p>
                </div>
              </div>
            </motion.div>
          ))}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Ruler size={20} className="mr-2" />
              Add New Measurement
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-400 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={newMeasurement.weight}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, weight: parseFloat(e.target.value) })}
                    className="w-full bg-gray-600 rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-400 mb-1">
                    Body Fat %
                  </label>
                  <input
                    type="number"
                    id="bodyFat"
                    value={newMeasurement.bodyFat}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, bodyFat: parseFloat(e.target.value) })}
                    className="w-full bg-gray-600 rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="muscleMass" className="block text-sm font-medium text-gray-400 mb-1">
                    Muscle Mass (lbs)
                  </label>
                  <input
                    type="number"
                    id="muscleMass"
                    value={newMeasurement.muscleMass}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, muscleMass: parseFloat(e.target.value) })}
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
                  Add Measurement
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  )
}

