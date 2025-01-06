'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Watch, Smartphone, Activity } from 'lucide-react'

const devices = [
  { name: 'Fitbit', icon: Watch },
  { name: 'Apple Watch', icon: Watch },
  { name: 'Garmin', icon: Watch },
  { name: 'Google Fit', icon: Smartphone },
  { name: 'MyFitnessPal', icon: Smartphone },
]

export default function DeviceIntegration() {
  const [connectedDevices, setConnectedDevices] = useState<string[]>([])

  const toggleDevice = (deviceName: string) => {
    setConnectedDevices(prev =>
      prev.includes(deviceName)
        ? prev.filter(d => d !== deviceName)
        : [...prev, deviceName]
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Device Integration
      </h2>
      <p className="text-gray-400 mb-6">Connect your fitness devices and apps for comprehensive tracking.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {devices.map((device, index) => (
          <motion.button
            key={device.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => toggleDevice(device.name)}
            className={`flex items-center p-4 rounded-lg transition-colors ${
              connectedDevices.includes(device.name)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <device.icon size={24} className="mr-3" />
            <span>{device.name}</span>
            {connectedDevices.includes(device.name) && (
              <Activity size={18} className="ml-auto text-green-300" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

