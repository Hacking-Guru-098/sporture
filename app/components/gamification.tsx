'use client'

import { motion } from 'framer-motion'
import { Award, TrendingUp, Zap } from 'lucide-react'

const achievements = [
  { id: 1, name: 'Early Bird', description: 'Complete 5 workouts before 8 AM', icon: Zap, progress: 3, total: 5 },
  { id: 2, name: 'Consistency King', description: 'Work out for 30 consecutive days', icon: TrendingUp, progress: 22, total: 30 },
  { id: 3, name: 'Strength Master', description: 'Lift 10,000 lbs in a single workout', icon: Award, progress: 7500, total: 10000 },
]

export default function Gamification() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Achievements
      </h2>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-700 rounded-lg p-4 flex items-center"
          >
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <achievement.icon size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold mb-1">{achievement.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-gray-400">
                {achievement.progress} / {achievement.total}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

