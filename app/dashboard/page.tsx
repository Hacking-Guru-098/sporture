'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DeviceIntegration from '../components/device-integration'
import AIWorkoutRecommendation from '../components/ai-workout-recommendation'
import VirtualCoach from '../components/virtual-coach'
import VideoContent from '../components/video-content'
import Gamification from '../components/gamification'
import MealPlanner from '../components/meal-planner'
import ProgressTracker from '../components/progress-tracker'
import CalendarIntegration from '../components/calendar-integration'
import CustomizableDashboard from '../components/customizable-dashboard'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Your Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <CustomizableDashboard />
        <DeviceIntegration />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <AIWorkoutRecommendation />
        <VirtualCoach />
      </div>

      <div className="mb-8">
        <VideoContent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Gamification />
        <MealPlanner />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ProgressTracker />
        <CalendarIntegration />
      </div>
    </div>
  )
}

