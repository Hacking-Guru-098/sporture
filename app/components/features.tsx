import { motion } from 'framer-motion'
import { Utensils, Activity, TrendingUp, Battery } from 'lucide-react'

const features = [
  { icon: Utensils, title: 'Customized Diet Plans', description: 'Tailored nutrition to fuel your performance' },
  { icon: Activity, title: 'Workout Plans', description: 'Personalized training programs for your goals' },
  { icon: TrendingUp, title: 'Performance Analytics', description: 'Track and analyze your progress in real-time' },
  { icon: Battery, title: 'Recovery Tools', description: 'Optimize your rest and recuperation' },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-3 rounded-full bg-blue-500 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                <feature.icon size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

