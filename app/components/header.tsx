import { useState } from 'react'
import { Moon, Sun, Globe, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Header({ language, setLanguage }: { language: string; setLanguage: (lang: string) => void }) {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Workout Planner', href: '/workout-planner' },
    { name: 'Nutrition Tracker', href: '/nutrition-tracker' },
    { name: 'Community', href: '/community' },
  ]

  return (
    <header className="fixed w-full z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          FutureFit
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-blue-400 transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Globe size={20} />
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

