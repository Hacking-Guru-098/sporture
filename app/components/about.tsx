import { motion } from 'framer-motion'
import { Dumbbell, Heart, Brain, Zap } from 'lucide-react'

const timelineItems = [
  { icon: Heart, title: 'Health Basics', description: 'Build a strong foundation' },
  { icon: Dumbbell, title: 'Strength Training', description: 'Develop power and endurance' },
  { icon: Brain, title: 'Mental Conditioning', description: 'Sharpen your focus' },
  { icon: Zap, title: 'Peak Performance', description: 'Achieve your full potential' },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Our Mission
        </h2>
        <p className="text-xl text-center mb-16 max-w-3xl mx-auto">
          We empower athletes and fitness enthusiasts to reach their full potential through cutting-edge technology, personalized training, and a supportive community.
        </p>
        <div className="flex flex-wrap justify-center">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8"
            >
              <div className="bg-gray-800 rounded-lg p-6 h-full flex flex-col items-center text-center">
                <item.icon size={48} className="mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

