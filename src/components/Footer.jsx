import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Sparkles } from 'lucide-react'

const Footer = () => {
  const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Hamsha7' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/hamsha-n-93a2972a5' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/hamsha_26/' },
  ]

  return (
    <footer className="py-14 border-t border-white/10 relative bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xl font-bold text-white tracking-tight">HAMSHA N</span>
              <Sparkles size={16} className="text-brand-yellow" />
            </div>
            <p className="text-xs text-gray-400 font-medium">
              B.E Computer Science Engineering (IoT) • Frontend Designer & IoT Engineer
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © {new Date().getFullYear()} Hamsha N. All rights reserved.
            </p>
          </motion.div>

          {/* Quick Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 glass rounded-xl flex items-center justify-center text-gray-300 hover:text-brand-yellow transition-all duration-300 border border-white/10 hover:border-brand-yellow/50 hover:shadow-amber-glow"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
