import React, { useState } from 'react'
import Header from './header'
import Footer from './footer'
import { ThemeProvider } from 'next-themes'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en')

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Header language={language} setLanguage={setLanguage} />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

