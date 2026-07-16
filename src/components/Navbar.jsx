import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Empty Space */}
        <div className="w-12"></div>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, color: '#00f0ff' }}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium text-gray-300 hover:text-neon-blue transition-colors focus:outline-none focus-visible:ring-0"
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle - Right */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const isLight = document.documentElement.classList.toggle('light')
              localStorage.setItem('theme', isLight ? 'light' : 'dark')
            }}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-black/20 hover:bg-black/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-blue/40 transition-all"
          >
            {document.documentElement.classList.contains('light') ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none focus-visible:ring-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass mt-4"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-sm font-medium hover:text-neon-blue transition-colors py-2 focus:outline-none focus-visible:ring-0"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar

