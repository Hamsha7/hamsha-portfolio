import { motion } from 'framer-motion'
import { Code, Smartphone, Terminal, Palette, BarChart3, Cpu, Shield, Sparkles } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Web Development',
      icon: Code,
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js (MERN Stack)'],
      color: 'from-amber-400 to-yellow-500',
    },
    {
      title: 'App Development',
      icon: Smartphone,
      skills: ['React Native', 'HTML & CSS', 'JavaScript', 'Cross-Platform Mobile Apps'],
      color: 'from-yellow-500 to-amber-600',
    },
    {
      title: 'Programming Languages',
      icon: Terminal,
      skills: ['Java', 'Python', 'C++', 'JavaScript / ES6+'],
      color: 'from-brand-yellow to-brand-amber',
    },
    {
      title: 'UI/UX & Design',
      icon: Palette,
      skills: ['Figma', 'Canva', 'Photoshop', 'Interface Prototyping'],
      color: 'from-amber-500 to-yellow-400',
    },
    {
      title: 'Data Analyst',
      icon: BarChart3,
      skills: ['B2B Business Solutions', 'Data Analytics Platforms', 'Data Visualization'],
      color: 'from-yellow-400 to-amber-500',
    },
    {
      title: 'IoT Engineer',
      icon: Cpu,
      skills: ['Smart City Solutions', 'Sensor Integration', 'Hardware Automation'],
      color: 'from-brand-amber to-brand-yellow',
    },
    {
      title: 'Cyber Security',
      icon: Shield,
      skills: ['Mobile Unlocking Architecture', 'Real-Time Face Detection', 'Authentication'],
      color: 'from-amber-600 to-yellow-500',
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="skills" className="py-24 relative">
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
            Capabilities & Stack
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            TECHNICAL <span className="gold-gradient-text">SKILLS</span>
          </h2>
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className="glass rounded-3xl p-8 border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group shadow-lg bg-dark-card flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} text-black flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform font-bold`}>
                      <Icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="text-gray-300 flex items-center gap-3 text-sm font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-brand-yellow shadow-amber-glow flex-shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
