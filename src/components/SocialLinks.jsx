import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram } from 'lucide-react'

const SocialLinks = () => {
  const socials = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Hamsha7',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/hamsha-n-93a2972a5',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/hamsha_26/',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 12,
      },
    },
  }

  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex justify-center items-center gap-6"
        >
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.15, 
                  y: -6,
                }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-gray-300 hover:text-brand-yellow transition-all duration-300 border border-white/10 hover:border-brand-yellow/50 shadow-lg hover:shadow-amber-glow"
                aria-label={social.name}
              >
                <Icon size={24} />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default SocialLinks
