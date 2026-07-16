import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-8 gradient-text text-center"
          >
            About Me
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass rounded-2xl p-8 lg:p-16 border border-white/10 hover:border-neon-blue/30 transition-all"
          >
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 font-light">
              I am a passionate Computer Science Engineering student specializing in Internet of Things (IoT), 
              driven by an insatiable curiosity for technology and innovation. My journey in tech has been 
              marked by a relentless pursuit of solving complex problems and creating impactful solutions.
            </p>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 font-light">
              With expertise spanning <span className="text-neon-blue font-semibold">web development</span>, 
              <span className="text-neon-purple font-semibold"> mobile app development</span>, 
              <span className="text-neon-pink font-semibold"> IoT engineering</span>, 
              <span className="text-neon-blue font-semibold"> data analytics</span>, and 
              <span className="text-neon-purple font-semibold"> cybersecurity</span>, I bring a holistic 
              approach to technology. My experience includes developing smart city solutions, building 
              B2B data analytics platforms, and creating secure mobile applications.
            </p>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
              I thrive in collaborative environments where I can leverage my problem-solving mindset to 
              transform ideas into reality. Whether it's crafting elegant user interfaces, designing 
              scalable backend systems, or implementing cutting-edge IoT solutions, I'm always eager 
              to push the boundaries of what's possible.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

