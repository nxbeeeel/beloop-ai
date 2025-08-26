'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Mail, 
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'beloopstore@gmail.com',
      link: 'mailto:beloopstore@gmail.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our office location',
      value: 'San Francisco, CA',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'When we\'re available',
      value: 'Mon-Fri: 9AM-6PM PST',
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-20"></div>
      <div className="fixed inset-0 bg-noise"></div>
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:animate-glow transition-all duration-300">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text-neon">Beloop AI</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Page Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <MessageSquare className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get in <span className="gradient-text-neon">Touch</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Have questions about Beloop AI? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Message sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      return (
                        <motion.div
                          key={info.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                            <Icon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">{info.description}</p>
                            <Link 
                              href={info.link}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                              {info.value}
                            </Link>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">How does Beloop AI work?</h3>
                      <p className="text-gray-400 text-sm">
                        Beloop AI uses advanced machine learning to understand your coding patterns and provide intelligent suggestions in real-time.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">Is my code secure?</h3>
                      <p className="text-gray-400 text-sm">
                        Yes, we take security seriously. All code is encrypted and we never store sensitive information.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">What programming languages do you support?</h3>
                      <p className="text-gray-400 text-sm">
                        We support all major programming languages including JavaScript, Python, TypeScript, Java, C++, and many more.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Join thousands of developers who are already using Beloop AI to write better code faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/chat">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary px-8 py-3 text-lg font-semibold"
                    >
                      Try Beloop AI Now
                    </motion.button>
                  </Link>
                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary px-8 py-3 text-lg font-semibold"
                    >
                      Create Account
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
