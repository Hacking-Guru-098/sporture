'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

const videos = [
  { id: 1, title: 'Proper Squat Form', duration: '5:30', src: '/videos/squat-form.mp4' },
  { id: 2, title: 'HIIT Workout for Beginners', duration: '15:45', src: '/videos/hiit-workout.mp4' },
  { id: 3, title: 'Yoga for Flexibility', duration: '20:00', src: '/videos/yoga-flexibility.mp4' },
  { id: 4, title: 'Core Strengthening Routine', duration: '10:15', src: '/videos/core-strengthening.mp4' },
]

export default function VideoContent() {
  const [currentVideo, setCurrentVideo] = useState(videos[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, currentVideo])

  const handleVideoChange = (direction: 'next' | 'prev') => {
    const currentIndex = videos.findIndex(v => v.id === currentVideo.id)
    if (direction === 'next') {
      setCurrentVideo(videos[(currentIndex + 1) % videos.length])
    } else {
      setCurrentVideo(videos[(currentIndex - 1 + videos.length) % videos.length])
    }
    setIsPlaying(false)
    setProgress(0)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = (seekTime / 100) * videoRef.current.duration
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Video Content
      </h2>
      <div className="aspect-w-16 aspect-h-9 mb-4 relative">
        <video
          ref={videoRef}
          src={currentVideo.src}
          className="w-full h-full object-cover rounded-lg"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          muted={isMuted}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="bg-blue-500 text-white rounded-full p-4 hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{currentVideo.title}</h3>
        <button onClick={toggleMute} className="text-white">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      <p className="text-gray-400 mb-4">Duration: {currentVideo.duration}</p>
      <div className="flex justify-between">
        <button
          onClick={() => handleVideoChange('prev')}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 flex items-center hover:bg-gray-600 transition-colors"
        >
          <SkipBack size={20} className="mr-2" />
          Previous
        </button>
        <button
          onClick={() => handleVideoChange('next')}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 flex items-center hover:bg-gray-600 transition-colors"
        >
          Next
          <SkipForward size={20} className="ml-2" />
        </button>
      </div>
    </div>
  )
}

