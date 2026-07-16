import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram } from 'lucide-react'

const SocialLinks = () => {
  const socials = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Hamsha7',
      color: 'hover:text-gray-300',
      glowColor: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/hamsha-n-93a2972a5',
      color: 'hover:text-blue-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/hamsha_26/',
      color: 'hover:text-pink-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]',
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
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex justify-center gap-8"
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
                  scale: 1.2, 
                  rotate: [0, -10, 10, -10, 0],
                  y: -10,
                }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 glass rounded-full flex items-center justify-center ${social.color} transition-all duration-300 ${social.glowColor} border border-white/10 hover:border-white/30`}
              >
                <Icon size={28} />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default SocialLinks

