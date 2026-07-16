import { motion } from 'framer-motion'
import { Code, Smartphone, Database, Shield, BarChart3, Zap } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Web Development',
      icon: Code,
      skills: ['HTML', 'CSS', 'JavaScript', 'React (MERN)'],
      color: 'from-neon-blue to-cyan-500',
    },
    {
      title: 'App Development',
      icon: Smartphone,
      skills: ['HTML', 'CSS', 'JavaScript', 'React (MERN)'],
      color: 'from-neon-purple to-pink-500',
    },
    {
      title: 'Programming Languages',
      icon: Database,
      skills: ['Java', 'Python', 'Strong experience in HTML, CSS, JavaScript, React (MERN)'],
      color: 'from-neon-pink to-purple-500',
    },
    {
      title: 'UI/UX & Design',
      icon: Zap,
      skills: ['Figma', 'Canva', 'Photoshop'],
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Data Analyst',
      icon: BarChart3,
      skills: ['B2B company-based problem solving'],
      color: 'from-green-400 to-teal-500',
    },
    {
      title: 'IoT Engineer',
      icon: Zap,
      skills: ['Smart City solutions'],
      color: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Cyber Security',
      icon: Shield,
      skills: ['Mobile phone unlocking system'],
      color: 'from-red-400 to-pink-500',
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
    hidden: { opacity: 0, y: 50 },
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
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold mb-12 gradient-text text-center"
        >
          Technical Skills
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -12 }}
                className="glass rounded-2xl p-8 border border-white/10 hover:border-neon-blue/40 transition-all duration-300 group shadow-lg hover:shadow-neon-blue/20"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-neon-blue transition-colors">{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="text-gray-300 flex items-center gap-3 text-base"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex-shrink-0"></span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

