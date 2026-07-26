import { motion } from 'framer-motion'
import { Code, Cpu, BarChart3, Shield, Award, Sparkles, FolderGit2 } from 'lucide-react'

const About = () => {
  const stats = [
    { value: '304+', label: 'Problems Solved', icon: Award, sub: 'LeetCode & Competitive' },
    { value: '8+', label: 'Projects Built', icon: FolderGit2, sub: 'IoT, Mobile & Web' },
    { value: '7+', label: 'Core Domains', icon: Cpu, sub: 'IoT, Web, Analytics, Security' },
    { value: '100%', label: 'Commitment', icon: Sparkles, sub: 'Innovation & Growth' },
  ]

  const services = [
    {
      title: 'Web & Mobile App Development',
      icon: Code,
      description: 'Building modern, responsive web applications and high-performance cross-platform mobile apps.',
    },
    {
      title: 'IoT & Smart Hardware Engineering',
      icon: Cpu,
      description: 'Designing intelligent IoT solutions, smart city systems, sensor integration, and hardware automation.',
    },
    {
      title: 'Data Analytics & B2B Solutions',
      icon: BarChart3,
      description: 'Transforming complex business datasets into actionable insights and data-driven problem solving.',
    },
    {
      title: 'Cybersecurity & Authentication',
      icon: Shield,
      description: 'Developing secure phone security models, real-time face detection, and identity verification.',
    },
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="editorial-badge mb-3">
            <Sparkles size={14} className="text-brand-yellow" />
            Background & Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            ABOUT <span className="gold-gradient-text">ME</span>
          </h2>
        </motion.div>

        {/* Top Split: Bio Story & Key Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          {/* Bio Text Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
              Passionate Computer Science Engineering Student specializing in <span className="text-brand-yellow">IoT</span>.
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              My journey in tech is driven by an insatiable curiosity to solve complex real-world problems. With expertise spanning <strong className="text-brand-yellow font-semibold">web development</strong>, <strong className="text-brand-yellow font-semibold">mobile apps</strong>, <strong className="text-brand-yellow font-semibold">IoT engineering</strong>, <strong className="text-brand-yellow font-semibold">data analytics</strong>, and <strong className="text-brand-yellow font-semibold">cybersecurity</strong>, I bring a holistic engineering perspective to software and hardware solutions.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
              My hands-on experience includes engineering smart city IoT systems, crafting B2B data platforms, building environmental education applications, and implementing real-time facial recognition security modules.
            </p>
          </motion.div>

          {/* Stats Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              const IconComp = stat.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-brand-yellow/50 flex flex-col justify-between transition-all bg-dark-surface shadow-dark-card group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow mb-4 group-hover:scale-110 transition-transform">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 gold-gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-gray-200 mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      {stat.sub}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Section: What I Do! Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center">
            WHAT <span className="gold-gradient-text">I DO!</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv, idx) => {
              const Icon = srv.icon
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="glass rounded-2xl p-8 border border-white/10 hover:border-brand-yellow/50 transition-all group bg-dark-card flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-amber text-black flex items-center justify-center mb-6 shadow-lg shadow-brand-yellow/20 group-hover:scale-110 transition-transform font-bold">
                      <Icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
