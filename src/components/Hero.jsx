import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Terminal, Code, Cpu, Palette } from 'lucide-react'
import profilePhoto from '../assets/hamsha-photo.jpeg'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  const roles = [
    { title: 'CSE (IoT)', icon: Cpu },
    { title: 'Frontend Designer', icon: Palette },
    { title: 'Web Developer', icon: Code },
    { title: 'App Developer', icon: Terminal },
    { title: 'Data Analyst', icon: Sparkles },
    { title: 'IoT Engineer', icon: Cpu },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-28 pb-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text Content Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 text-center lg:text-left z-10"
          >
            {/* Top Greeting Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="editorial-badge">
                <Sparkles size={14} className="text-brand-yellow" />
                Welcome to my portfolio
              </span>
            </motion.div>
            
            {/* Headline Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 tracking-tight leading-tight"
            >
              HI THERE! <br />
              <span className="gold-gradient-text">I'M HAMSHA N</span>
            </motion.h1>
            
            {/* Degree / Degree Specialization */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-200"
            >
              B.E Computer Science Engineering (IoT)
            </motion.h2>
            
            {/* Role Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-8"
            >
              {roles.map((role, idx) => {
                const IconComponent = role.icon
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:border-brand-yellow/50 hover:text-brand-yellow transition-all"
                  >
                    <IconComponent size={14} className="text-brand-yellow" />
                    {role.title}
                  </span>
                )
              })}
            </motion.div>

            {/* Subtext description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Passionate engineer building intelligent IoT systems, modern web and mobile applications, data analytics solutions, and secure digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start flex-wrap"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-amber text-black font-extrabold rounded-2xl shadow-amber-glow hover:shadow-amber-lg transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2"
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 glass rounded-2xl font-bold border border-amber-500/30 text-white hover:border-brand-yellow hover:bg-brand-yellow/10 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Photo Editorial Frame Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center z-10"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.4 }}
              className="relative group"
            >
              {/* Decorative Accent Glow Backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-yellow/30 to-brand-amber/20 rounded-3xl blur-2xl group-hover:opacity-100 transition-opacity opacity-75" />
              
              {/* Photo Frame Container */}
              <div className="w-72 h-96 sm:w-80 sm:h-[420px] rounded-2xl overflow-hidden glass border-2 border-brand-yellow/40 shadow-2xl relative bg-dark-card">
                <img 
                  src={profilePhoto} 
                  alt="Hamsha N - Computer Science Engineering Student"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    const fallback = e.target.parentElement.querySelector('.fallback-placeholder')
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                
                {/* Fallback image container */}
                <div className="w-full h-full bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center fallback-placeholder absolute inset-0 hidden">
                  <div className="text-center p-6">
                    <span className="text-brand-yellow font-bold text-base block mb-2">Hamsha N</span>
                    <span className="text-gray-400 text-xs block">CSE (IoT) Engineer</span>
                  </div>
                </div>

                {/* Bottom Frame Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-center">
                  <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest block">
                    Hamsha N
                  </span>
                  <span className="text-[11px] text-gray-300 font-medium block">
                    Frontend Designer & IoT Engineer
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bouncing Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <a href="#about" aria-label="Scroll down to About section">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="p-2.5 rounded-full glass border border-amber-500/30 text-brand-yellow hover:scale-110 transition-transform"
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
