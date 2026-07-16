import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Hamsha7' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/hamsha-n-93a2972a5' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/hamsha_26/' },
  ]

  return (
    <footer className="py-16 border-t border-white/10 relative bg-gradient-to-t from-neon-blue/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center md:text-left"
          >
            <p className="text-lg font-semibold gradient-text mb-2">Hamsha N</p>
            <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.25, 
                    rotate: [0, -10, 10, 0],
                    y: -8,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-neon-blue transition-all duration-300 border border-white/10 hover:border-neon-blue/50 hover:shadow-lg hover:shadow-neon-blue/30"
                >
                  <Icon size={20} />
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

