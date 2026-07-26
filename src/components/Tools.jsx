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
  PenTool,
  Sparkles
} from 'lucide-react'

const Tools = () => {
  const tools = [
    { name: 'VS Code', icon: Code2, category: 'IDE' },
    { name: 'MongoDB', icon: Database, category: 'Database' },
    { name: 'Supabase', icon: Database, category: 'Database' },
    { name: 'GitHub', icon: Github, category: 'Version Control' },
    { name: 'Android Studio', icon: Smartphone, category: 'Mobile IDE' },
    { name: 'Figma', icon: PenTool, category: 'UI/UX Design' },
    { name: 'Photoshop', icon: ImageIcon, category: 'Design' },
    { name: 'After Effects', icon: Film, category: 'Motion' },
    { name: 'Canva', icon: Palette, category: 'Design' },
    { name: 'Microsoft Excel', icon: FileSpreadsheet, category: 'Data Analysis' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 16,
      },
    },
  }

  return (
    <section className="py-20 relative">
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
            Software & Environments
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            TOOLS <span className="gold-gradient-text">USED</span>
          </h2>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
        >
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.06, 
                  y: -6,
                }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-brand-yellow/50 transition-all cursor-pointer group bg-dark-card text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-brand-yellow flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-black transition-all shadow-md">
                  <Icon size={28} />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-brand-yellow transition-colors mb-1">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  {tool.category}
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
