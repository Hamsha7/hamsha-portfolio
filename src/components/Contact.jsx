import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, User, MessageSquare, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://formspree.io/f/mkododry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 6000)
      } else {
        throw new Error('Form submission fallback')
      }
    } catch (error) {
      console.warn('Formspree fallback to mailto:', error)
      const mailtoLink = `mailto:hamsha266@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      window.location.href = mailtoLink
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const contactInfo = [
    {
      title: 'Email Address',
      value: 'hamsha266@gmail.com',
      icon: Mail,
      link: 'mailto:hamsha266@gmail.com',
    },
    {
      title: 'Location',
      value: 'Tamil Nadu, India',
      icon: MapPin,
      link: null,
    },
  ]

  return (
    <section id="contact" className="py-24 relative">
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
            Let's Collaborate
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            GET IN <span className="gold-gradient-text">TOUCH</span>
          </h2>
        </motion.div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Direct Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass rounded-3xl p-8 border border-white/10 bg-dark-card">
              <h3 className="text-2xl font-bold text-white mb-4">
                Have a project or opportunity?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                Whether you're looking to build an IoT system, a web/mobile app, analyze B2B data, or discuss competitive programming, feel free to drop a message!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-4 hover:border-brand-yellow/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow flex items-center justify-center font-bold flex-shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
                          {info.title}
                        </span>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="text-base font-bold text-white hover:text-brand-yellow transition-colors block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-base font-bold text-white block">
                            {info.value}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 sm:p-10 border border-white/10 bg-dark-card shadow-xl"
            >
              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 text-gray-300">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 bg-black/40 border rounded-2xl focus:outline-none transition-all text-sm ${
                      errors.name
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                        : 'border-white/10 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30'
                    } text-white placeholder:text-gray-600`}
                    placeholder="Hamsha N"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 font-semibold">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 bg-black/40 border rounded-2xl focus:outline-none transition-all text-sm ${
                      errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                        : 'border-white/10 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30'
                    } text-white placeholder:text-gray-600`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 font-semibold">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 text-gray-300">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-500" size={18} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full pl-12 pr-4 py-3.5 bg-black/40 border rounded-2xl focus:outline-none transition-all resize-none text-sm ${
                      errors.message
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                        : 'border-white/10 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30'
                    } text-white placeholder:text-gray-600`}
                    placeholder="How can I help you?"
                  />
                </div>
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1.5 font-semibold">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-brand-yellow to-brand-amber text-black rounded-2xl font-extrabold text-xs uppercase tracking-wider shadow-amber-glow hover:shadow-amber-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Sending Message...</>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Notification */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-brand-yellow/10 border border-brand-yellow/40 rounded-2xl text-brand-yellow text-sm font-semibold flex items-center gap-3"
                >
                  <CheckCircle2 size={20} className="flex-shrink-0" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
