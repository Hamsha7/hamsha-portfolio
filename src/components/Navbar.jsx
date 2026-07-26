import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLightTheme, setIsLightTheme] = useState(() => document.documentElement.classList.contains('light'))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.toggle('light')
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
    setIsLightTheme(isLight)
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Coding', href: '#coding-profiles' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass py-3.5 shadow-2xl border-b border-amber-500/20' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand Badge Logo */}
        <button 
          onClick={() => scrollToSection('#home')} 
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-yellow to-brand-amber flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-brand-yellow/30 group-hover:scale-105 transition-transform">
            H
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-yellow transition-colors block leading-none">
              HAMSHA N
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-yellow/80 font-medium">
              Frontend Designer & Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 bg-black/30 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-semibold text-gray-300 hover:text-brand-yellow transition-colors relative py-1 focus:outline-none"
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Right Action Switchers */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow/50 hover:bg-brand-yellow/10 transition-all text-brand-yellow focus:outline-none"
          >
            {isLightTheme ? (
              <Sun size={18} className="text-amber-500 animate-spin-slow" />
            ) : (
              <Moon size={18} className="text-brand-yellow" />
            )}
          </button>

          {/* Quick CTA button for desktop */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-amber text-black font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-glow hover:scale-105 transition-all"
          >
            <Sparkles size={14} />
            Hire Me
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} className="text-brand-yellow" /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-b border-amber-500/20 mt-3"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-base font-semibold text-gray-200 hover:text-brand-yellow transition-colors py-2 border-b border-white/5"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-amber text-black font-bold text-sm text-center shadow-lg"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
