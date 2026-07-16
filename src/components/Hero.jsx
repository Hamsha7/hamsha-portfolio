import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-12"
        >
            {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative"
            >
              <div className="w-64 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden glass border-2 border-neon-blue/30 shadow-2xl relative">
                <img 
                  src="/images/hamsha-photo.jpeg" 
                  alt="Hamsha N - Computer Science Engineering Student"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = 'none'
                    const fallback = e.target.parentElement.querySelector('.fallback-placeholder')
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center fallback-placeholder absolute inset-0" style={{display: 'none'}}>
                  <div className="text-center">
                    <span className="text-gray-400 text-sm block mb-2">Your Photo Here</span>
                    <span className="text-gray-500 text-xs block">Place image at: /public/images/hamsha-photo.jpeg</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Hamsha N</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-200"
            >
              B.E Computer Science Engineering (IoT)
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-400 mb-10 max-w-md"
            >
              CSE (IoT) | Web Developer | App Developer | Data Analyst | IoT Engineer
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 justify-center lg:justify-start flex-wrap"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-semibold hover:shadow-2xl hover:shadow-neon-blue/50 transition-all duration-300 text-base"
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 glass rounded-xl font-semibold border border-neon-blue/40 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300 text-base"
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="text-neon-blue" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

