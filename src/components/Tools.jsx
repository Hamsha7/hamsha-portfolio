import { motion } from 'framer-motion'
import { 
  Code2, 
  Database, 
  Github, 
  Smartphone, 
  Palette, 
  Image as ImageIcon, 
  Film, 
  FileSpreadsheet,
  PenTool
} from 'lucide-react'

const Tools = () => {
  const tools = [
    { name: 'VS Code', icon: Code2, color: 'from-blue-500 to-blue-600' },
    { name: 'Supabase', icon: Database, color: 'from-green-500 to-green-600' },
    { name: 'MongoDB', icon: Database, color: 'from-emerald-500 to-emerald-600' },
    { name: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-800' },
    { name: 'Android Studio', icon: Smartphone, color: 'from-green-400 to-green-500' },
    { name: 'Figma', icon: PenTool, color: 'from-purple-500 to-purple-600' },
    { name: 'Photoshop', icon: ImageIcon, color: 'from-blue-400 to-blue-500' },
    { name: 'After Effects', icon: Film, color: 'from-purple-400 to-purple-500' },
    { name: 'Canva', icon: Palette, color: 'from-pink-500 to-pink-600' },
    { name: 'Microsoft Excel', icon: FileSpreadsheet, color: 'from-green-600 to-green-700' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        damping: 15,
      },
    },
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold mb-12 gradient-text text-center"
        >
          Tools Used
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  y: -10,
                }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-neon-blue/50 transition-all cursor-pointer group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="text-white" size={32} />
                </div>
                <p className="text-center text-sm font-semibold text-gray-300 group-hover:text-neon-blue transition-colors">
                  {tool.name}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Tools

