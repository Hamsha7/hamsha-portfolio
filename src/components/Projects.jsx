import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Video, Image as ImageIcon, X, ChevronLeft, ChevronRight, Sparkles, Filter } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Smart Car Parking System',
      description: 'An intelligent IoT-based parking management system that optimizes space utilization and provides real-time parking availability.',
      image: `${import.meta.env.BASE_URL}images/smart-parking.jpg`,
      tags: ['IoT', 'Arduino', 'Ultrasonic Sensor'],
      category: 'IoT & Mobile',
    },
    {
      title: 'Terra View – Agriculture App',
      description: 'A comprehensive mobile application for farmers to monitor crops, weather conditions, and manage agricultural resources efficiently.',
      images: [`${import.meta.env.BASE_URL}images/terra view1.jpeg`, `${import.meta.env.BASE_URL}images/terra view2.jpeg`],
      tags: ['Mobile App', 'Agriculture', 'React Native'],
      category: 'IoT & Mobile',
    },
    {
      title: 'dineXpress',
      description: 'A canteen management app with IoT integration for seamless payment processing and food ordering.',
      images: [
        `${import.meta.env.BASE_URL}images/dinexpress.jpeg`, 
        `${import.meta.env.BASE_URL}images/dinexpress2.jpeg`, 
        `${import.meta.env.BASE_URL}images/dinexpress3.jpeg`, 
        `${import.meta.env.BASE_URL}images/dinexpress4.jpeg`, 
        `${import.meta.env.BASE_URL}images/dinexpress5.jpeg`
      ],
      tags: ['IoT', 'Payment Integration', 'Canteen Management'],
      category: 'IoT & Mobile',
    },
    {
      title: 'Cyber Security – Live Face Detection',
      description: 'A secure authentication system using real-time face detection technology for enhanced mobile security.',
      image: `${import.meta.env.BASE_URL}images/live-face.jpeg`,
      tags: ['Face Detection', 'Security', 'AI'],
      category: 'Data & Security',
    },
    {
      title: 'Data Analyst B2B Solution for Company Problems',
      description: 'A data analytics platform designed to solve complex business problems through advanced data processing and visualization.',
      image: `${import.meta.env.BASE_URL}images/b2b.jpeg`,
      tags: ['Data Analytics', 'B2B', 'Business Solutions'],
      category: 'Data & Security',
    },
    {
      title: 'E3 – Environmental Education with Enhancement (Learning Platform)',
      description: 'An innovative educational platform focused on environmental awareness and sustainability through interactive learning modules.',
      image: `${import.meta.env.BASE_URL}images/e3.png`,
      tags: ['React', 'Firebase', 'Education'],
      category: 'Web & AI',
    },
    {
      title: 'Voice – Voice Assistant',
      description: 'A local voice assistant project providing speech recognition and voice-driven commands.',
      link: `${import.meta.env.BASE_URL}Voice/voice.html`,
      image: `${import.meta.env.BASE_URL}images/image.png`,
      tags: ['Web Speech API', 'Accessibility'],
      animated: true,
      category: 'Web & AI',
    },
    {
      title: 'Typo Tac Words (Typing Game)',
      description: 'An engaging typing game application that helps users improve their typing speed and accuracy through interactive challenges.',
      tags: ['JavaScript', 'Gamification', 'Web'],
      category: 'Web & AI',
    },
  ]

  const categories = ['All', 'IoT & Mobile', 'Web & AI', 'Data & Security']
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openProject, setOpenProject] = useState(null)
  const [imageIndices, setImageIndices] = useState({})

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  const nextImage = (projectTitle, totalImages) => {
    setImageIndices((prev) => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) + 1) % totalImages,
    }))
  }

  const prevImage = (projectTitle, totalImages) => {
    setImageIndices((prev) => ({
      ...prev,
      [projectTitle]: (prev[projectTitle] || 0) === 0 ? totalImages - 1 : (prev[projectTitle] || 0) - 1,
    }))
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpenProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="editorial-badge mb-3">
            <Sparkles size={14} className="text-brand-yellow" />
            Selected Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            FEATURED <span className="gold-gradient-text">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-brand-yellow to-brand-amber text-black shadow-amber-glow scale-105'
                  : 'glass text-gray-300 hover:text-brand-yellow border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const currentImageIndex = imageIndices[project.title] || 0
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.title}
                  whileHover={{ y: -8 }}
                  className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group shadow-xl bg-dark-card flex flex-col justify-between"
                >
                  <div>
                    {/* Media Header */}
                    {project.images ? (
                      <div className="relative h-56 bg-black/40 flex items-center justify-center overflow-hidden group/gallery border-b border-white/10">
                        <img 
                          src={project.images[currentImageIndex]} 
                          alt={project.title}
                          className="w-full h-full object-contain p-2 transition-all duration-300"
                          loading="lazy" 
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            prevImage(project.title, project.images.length)
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 text-brand-yellow rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:scale-110 z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            nextImage(project.title, project.images.length)
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 text-brand-yellow rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:scale-110 z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {project.images.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 rounded-full transition-all ${
                                i === currentImageIndex ? 'bg-brand-yellow w-5' : 'bg-white/40 w-1.5'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : project.image ? (
                      <div className="relative h-56 bg-black/40 flex items-center justify-center overflow-hidden border-b border-white/10">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className={`w-full h-full object-contain p-2 ${project.animated ? 'assistant-float' : ''}`}
                          loading="lazy" 
                        />
                      </div>
                    ) : (
                      <div className="relative h-56 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 flex items-center justify-center border-b border-white/10">
                        <ImageIcon className="text-brand-yellow/40" size={48} />
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-6 sm:p-8">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-yellow transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(project.tags || []).map((tag) => (
                          <span key={tag} className="tag-pill text-[11px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  {project.link && (
                    <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
                      <button
                        onClick={() => setOpenProject({ src: project.link, title: project.title })}
                        className="w-full py-3 px-4 bg-gradient-to-r from-brand-yellow to-brand-amber text-black rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-amber-glow transition-all"
                      >
                        <ExternalLink size={16} />
                        Launch Project
                      </button>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Preview Iframe Modal */}
      {openProject && (
        <div
          id="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={openProject.title}
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpenProject(null) }}
        >
          <div className="modal-content w-full max-w-5xl h-[85vh] bg-dark-bg border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
            {/* Modal Top Bar */}
            <div className="px-6 py-4 bg-dark-surface border-b border-white/10 flex justify-between items-center">
              <span className="text-sm font-bold text-brand-yellow">{openProject.title}</span>
              <button
                onClick={() => setOpenProject(null)}
                className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-brand-yellow hover:bg-white/10 transition-all"
                aria-label="Close project modal"
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              title={openProject.title}
              src={openProject.src}
              className="w-full flex-grow border-0"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
