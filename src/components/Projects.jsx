import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Video, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Smart Car Parking System',
      description: 'An intelligent IoT-based parking management system that optimizes space utilization and provides real-time parking availability.',
      image: '/images/smart-parking.jpg',
      tags: ['IoT', 'Arduino', 'Ultrasonic Sensor'],
    },
    {
      title: 'Terra View – Agriculture App',
      description: 'A comprehensive mobile application for farmers to monitor crops, weather conditions, and manage agricultural resources efficiently.',
      images: ['/images/terra view1.jpeg', '/images/terra view2.jpeg'],
      tags: ['Mobile App', 'Agriculture', 'React Native'],
    },
    {
      title: 'dineXpress',
      description: 'A canteen management app with IoT integration for seamless payment processing and food ordering.',
      images: ['/images/dinexpress.jpeg', '/images/dinexpress2.jpeg', '/images/dinexpress3.jpeg', '/images/dinexpress4.jpeg', '/images/dinexpress5.jpeg'],
      tags: ['IoT', 'Payment Integration', 'Canteen Management'],
    },
    {
      title: 'Cyber Security – Live Face Detection',
      description: 'A secure authentication system using real-time face detection technology for enhanced mobile security.',
      image: '/images/live-face.jpeg',
      tags: ['Face Detection', 'Security', 'AI'],
    },
    {
      title: 'Data Analyst B2B Solution for Company Problems',
      description: 'A data analytics platform designed to solve complex business problems through advanced data processing and visualization.',
      image: '/images/b2b.jpeg',
      tags: ['Data Analytics', 'B2B', 'Business Solutions'],
    },
    {
      title: 'E3 – Environmental Education with Enhancement (Learning Platform)',
      description: 'An innovative educational platform focused on environmental awareness and sustainability through interactive learning modules.',
      image: '/images/e3.png',
      tags: ['React', 'Firebase', 'Education'],
    },
    {
      title: 'Voice – Voice Assistant',
      description: 'A local voice assistant project providing speech recognition and voice-driven commands.',
      link: '/Voice/voice.html',
      image: '/images/image.png',
      tags: ['Web Speech API', 'Accessibility'],
      animated: true,
    },
    {
      title: 'Typo Tac Words (Typing Game)',
      description: 'An engaging typing game application that helps users improve their typing speed and accuracy through interactive challenges.',
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

  const [openProject, setOpenProject] = useState(null)
  const [imageIndices, setImageIndices] = useState({})

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
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold mb-12 gradient-text text-center"
        >
          Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => {
            const currentImageIndex = imageIndices[project.title] || 0
            const displayImage = project.images ? project.images[currentImageIndex] : project.image
            
            return (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-neon-blue/40 transition-all duration-300 group shadow-lg hover:shadow-neon-blue/20"
            >
              {project.images ? (
                <div className="relative h-48 bg-black/5 flex items-center justify-center overflow-hidden group/gallery">
                  <img 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title}`}
                    className="w-full h-full object-contain transition-all duration-300"
                    loading="lazy" 
                    decoding="async" 
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage(project.title, project.images.length)
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/70 z-10 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage(project.title, project.images.length)
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/70 z-10 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentImageIndex ? 'bg-neon-blue w-4' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="project-overlay absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">{project.title}</span>
                    <div className="flex gap-2">
                      {(project.tags || []).map((t) => (
                        <span key={t} className="tag-pill text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : project.image ? (
                project.animated ? (
                  <div className="relative h-48 bg-black/5 flex items-center justify-center overflow-hidden">
                    <img src={project.image} alt={project.title} className="assistant-float" loading="lazy" decoding="async" />
                    <div className="project-overlay absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold">{project.title}</span>
                      <div className="flex gap-2">
                        {(project.tags || []).map((t) => (
                          <span key={t} className="tag-pill text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 bg-black/5 flex items-center justify-center overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                    <div className="project-overlay absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold">{project.title}</span>
                      <div className="flex gap-2">
                        {(project.tags || []).map((t) => (
                          <span key={t} className="tag-pill text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <>
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center overflow-hidden">
                    <ImageIcon className="text-gray-500" size={48} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Video Placeholder */}
                  <div className="relative h-32 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center">
                    <Video className="text-gray-500" size={40} />
                  </div>
                </>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                {project.link ? (
                  <button
                    onClick={() => setOpenProject({ src: project.link, title: project.title })}
                    className="w-full inline-flex py-2 px-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold text-sm text-white items-center justify-center gap-2 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-blue/40"
                    aria-haspopup="dialog"
                    aria-controls="project-modal"
                  >
                    <ExternalLink size={16} />
                    Open Project
                  </button>
                ) : null}
              </div>
            </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Project modal */}
      {openProject && (
        <div
          id="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={openProject.title}
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpenProject(null) }}
        >
          <div className="modal-content w-full max-w-4xl h-[80vh] bg-black rounded-lg overflow-hidden shadow-xl relative">
            <button
              onClick={() => setOpenProject(null)}
              className="modal-close absolute top-3 right-3 z-60 p-2 rounded-md bg-black/60 text-white hover:bg-black/80 focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-blue/40"
              aria-label="Close project"
            >
              <X size={18} />
            </button>
            <iframe
              title={openProject.title}
              src={openProject.src}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects

