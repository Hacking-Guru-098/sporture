import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', Performance: 4000, Recovery: 2400 },
  { name: 'Feb', Performance: 3000, Recovery: 1398 },
  { name: 'Mar', Performance: 2000, Recovery: 9800 },
  { name: 'Apr', Performance: 2780, Recovery: 3908 },
  { name: 'May', Performance: 1890, Recovery: 4800 },
  { name: 'Jun', Performance: 2390, Recovery: 3800 },
  { name: 'Jul', Performance: 3490, Recovery: 4300 },
]

export default function Analytics() {
  return (
    <section id="analytics" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Analytics and AI Integration
        </h2>
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="Performance" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Recovery" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">AI-Powered Insights</h3>
            <p className="text-gray-400">
              Our advanced AI algorithms analyze your performance data to provide personalized insights and recommendations, helping you optimize your training and recovery strategies.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold mb-4 text-green-400">Wearable Integration</h3>
            <p className="text-gray-400">
              Seamlessly connect your favorite wearable devices to track your progress in real-time. Our platform integrates with a wide range of fitness trackers and smartwatches for comprehensive data analysis.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

