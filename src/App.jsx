import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Home, User, Cpu, Code, Briefcase, Mail } from 'lucide-react'
import Hero from './components/Hero'
import SocialLinks from './components/SocialLinks'
import About from './components/About'
import Skills from './components/Skills'
import CodingProfiles from './components/CodingProfiles'
import Tools from './components/Tools'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
      
      const sections = ['home', 'about', 'skills', 'coding-profiles', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navDockItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Cpu, label: 'Skills' },
    { id: 'coding-profiles', icon: Code, label: 'Coding' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark-bg text-white selection:bg-brand-yellow selection:text-black">
      {/* Dynamic Golden Ambient Light Background */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 184, 0, 0.18), transparent 70%)`
        }}
      />
      
      {/* Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 18}s`,
              animationDuration: `${14 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Side Navigation Dock (Desktop) */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-3 rounded-full glass border border-amber-500/20 shadow-amber-glow">
        {navDockItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/40 scale-110' 
                  : 'hover:bg-white/10 text-gray-300 hover:text-brand-yellow'
              }`}
              aria-label={item.label}
            >
              <Icon size={20} />
              {/* Tooltip Label */}
              <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 text-brand-yellow text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-amber-500/30">
                {item.label}
              </span>
            </button>
          )
        })}
      </aside>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SocialLinks />
        <About />
        <Skills />
        <CodingProfiles />
        <Tools />
        <Projects />
        <Contact />
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      {isScrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3.5 bg-gradient-to-r from-brand-yellow to-brand-amber text-black rounded-full shadow-amber-glow hover:scale-110 transition-all z-40 cursor-pointer font-bold"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={22} strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  )
}

export default App
