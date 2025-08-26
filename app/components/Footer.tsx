'use client'

import { motion } from 'framer-motion'
import { Code, Mail, Twitter, Linkedin, Github, User, LogIn, UserPlus, MessageSquare, Star, Award, Zap } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { name: 'Home', href: '/' },
    { name: 'AI Chat', href: '/chat' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Features', href: '#features' },
    { name: 'Enterprise', href: '#enterprise' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Students', href: '#students' }
  ],
  account: [
    { name: 'Sign In', href: '/login', icon: LogIn },
    { name: 'Sign Up', href: '/signup', icon: UserPlus },
    { name: 'My Account', href: '/account', icon: User },
    { name: 'Contact Us', href: '/contact', icon: MessageSquare }
  ],
  resources: [
    { name: 'Documentation', href: '#docs' },
    { name: 'Blog', href: '#blog' },
    { name: 'Forum', href: '#forum' },
    { name: 'Changelog', href: '#changelog' },
    { name: 'API Reference', href: '#api' },
    { name: 'Tutorials', href: '#tutorials' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'About Founder', href: '#founder' },
    { name: 'Careers', href: '#careers' },
    { name: 'Community', href: '#community' },
    { name: 'Customers', href: '#customers' },
    { name: 'Press Kit', href: '#press' }
  ],
  legal: [
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Security', href: '#security' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'GDPR', href: '#gdpr' },
    { name: 'SOC 2 Certified', href: '#soc2' }
  ]
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'GitHub', icon: Github, href: 'https://github.com' }
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Founder Section - Now at the top */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-gray-900/50 to-black border-b border-gray-800/50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/30 mb-6"
            >
              <Award className="w-5 h-5 text-cyan-400 mr-2" />
              <span className="text-cyan-400 font-medium">Meet Our Founder</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Visionary Behind <span className="gradient-text-neon">Beloop AI</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A passionate entrepreneur dedicated to revolutionizing the future of AI-powered development
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-8 md:p-12 border border-gray-700/50 backdrop-blur-sm shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex justify-center lg:justify-start"
                >
                  <div className="relative">
                    <div className="relative">
                      <img 
                        src="/founder-profile.jpg" 
                        alt="Mohammed Nabeel - Founder of Beloop AI"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gradient-to-r from-cyan-400 to-pink-500 shadow-2xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold hidden shadow-2xl">
                        MN
                      </div>
                      {/* Status indicator */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Floating badges */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Star className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Profile Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:col-span-2 text-center lg:text-left"
                >
                  <h3 className="text-3xl font-bold text-white mb-3">Mohammed Nabeel</h3>
                  <p className="text-cyan-400 font-semibold text-lg mb-4">Visionary Entrepreneur & AI Innovator</p>
                  <p className="text-gray-300 text-base mb-6 leading-relaxed">
                    A passionate visionary entrepreneur with developing skills in technology and AI innovation. 
                    Dedicated to creating cutting-edge solutions that bridge the gap between imagination and reality.
                    Leading the future of AI-powered applications and digital experiences.
                  </p>
                  
                  {/* Skills/Tags */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                    <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">AI Innovation</span>
                    <span className="px-4 py-2 bg-pink-500/20 text-pink-400 text-sm rounded-full border border-pink-500/30">Entrepreneurship</span>
                    <span className="px-4 py-2 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30">Technology</span>
                    <span className="px-4 py-2 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">Leadership</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.a
                      href="https://www.linkedin.com/in/mohammed-nabeel-ca-007a8122b"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center space-x-3 bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 text-white px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-400/25 font-medium"
                    >
                      <Linkedin className="w-5 h-5 group-hover:animate-bounce" />
                      <span>Connect on LinkedIn</span>
                      <div className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ↗
                      </div>
                    </motion.a>
                    
                    <motion.a
                      href="mailto:beloopstore@gmail.com"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600 font-medium"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Email</span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text-neon">Beloop AI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Built to make you extraordinarily productive, Beloop AI is the best way to code with AI. 
                Experience the future of development with our advanced AI assistant.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Account Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Account</h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

         {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center mb-12 pt-8 border-t border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href="mailto:hello@beloop.ai" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
              hello@beloop.ai
            </a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Made by <span className="text-cyan-400">MOHAMMED NABEEL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
