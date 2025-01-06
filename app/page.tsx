import Link from 'next/link'
import Layout from './components/layout'
import Hero from './components/hero'
import About from './components/about'
import Features from './components/features'
import Community from './components/community'
import Analytics from './components/analytics'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Features />
      <Community />
      <Analytics />
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Link href="/dashboard" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">Dashboard</h3>
              <p className="text-gray-400">View your personalized fitness dashboard</p>
            </Link>
            <Link href="/workout-planner" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">Workout Planner</h3>
              <p className="text-gray-400">Plan and track your workouts</p>
            </Link>
            <Link href="/nutrition-tracker" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">Nutrition Tracker</h3>
              <p className="text-gray-400">Monitor your daily nutrition intake</p>
            </Link>
            <Link href="/community" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">Community</h3>
              <p className="text-gray-400">Connect with other users, share achievements, and get help</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

