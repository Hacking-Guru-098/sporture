'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Clock, Zap } from 'lucide-react'

type Workout = {
  name: string
  duration: number
  intensity: 'Low' | 'Medium' | 'High'
  exercises: string[]
}

const mockAIRecommendation = (): Workout => {
  const workouts: Workout[] = [
    {
      name: 'HIIT Cardio Blast',
      duration: 30,
      intensity: 'High',
      exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees']
    },
    {
      name: 'Strength Training Focus',
      duration: 45,
      intensity: 'Medium',
      exercises: ['Squats', 'Deadlifts', 'Bench Press', 'Rows']
    },
    {
      name: 'Yoga Flow',
      duration: 60,
      intensity: 'Low',
      exercises: ['Sun Salutations', 'Warrior Poses', 'Balance Poses', 'Cool Down']
    }
  ]
  return workouts[Math.floor(Math.random() * workouts.length)]
}

export default function AIWorkoutRecommendation() {
  const [workout, setWorkout] = useState<Workout | null>(null)

  const getRecommendation = () => {
    // In a real app, this would make an API call to an AI service
    setWorkout(mockAIRecommendation())
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        AI Workout Recommendation
      </h2>
      <p className="text-gray-400 mb-6">Get personalized workout recommendations based on your goals and progress.</p>
      {workout ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-700 rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
          <div className="flex items-center text-gray-400 mb-2">
            <Clock size={18} className="mr-2" />
            <span>{workout.duration} minutes</span>
            <Zap size={18} className="ml-4 mr-2" />
            <span>{workout.intensity} Intensity</span>
          </div>
          <h4 className="font-semibold mb-2">Exercises:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {workout.exercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </motion.div>
      ) : (
        <button
          onClick={getRecommendation}
          className="bg-blue-500 text-white rounded-lg px-6 py-3 flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          <Dumbbell size={20} className="mr-2" />
          Get Workout Recommendation
        </button>
      )}
    </div>
  )
}

