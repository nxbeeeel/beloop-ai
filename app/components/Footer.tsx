'use client'

import { motion } from 'framer-motion'
import { Code, Mail, Twitter, Linkedin, Github } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Home', href: '#' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Features', href: '#features' },
    { name: 'Enterprise', href: '#enterprise' },
    { name: 'AI Chat', href: '/chat' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Students', href: '#students' }
  ],
  resources: [
    { name: 'Docs', href: '#docs' },
    { name: 'Blog', href: '#blog' },
    { name: 'Forum', href: '#forum' },
    { name: 'Changelog', href: '#changelog' }
  ],
  company: [
    { name: 'About Founder', href: '#founder' },
    { name: 'Careers', href: '#careers' },
    { name: 'Community', href: '#community' },
    { name: 'Customers', href: '#customers' }
  ],
  legal: [
    { name: 'Terms', href: '#terms' },
    { name: 'Security', href: '#security' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'SOC 2 Certified', href: '#soc2' }
  ]
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/beloopai' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/beloopai' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/beloopai' }
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Beloop AI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Built to make you extraordinarily productive, Beloop AI is the best way to code with AI.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
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
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-gray-300">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* About Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 pt-8 border-t border-gray-800"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-4">About Founder</h3>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                                 <div className="flex items-center justify-center mb-4">
                   <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                     MN
                   </div>
                 </div>
                <h4 className="text-lg font-semibold text-white mb-2">Mohammed Nabeel</h4>
                <p className="text-gray-300 mb-3">Visionary Entrepreneur & AI Innovator</p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  A passionate visionary entrepreneur with developing skills in technology and AI innovation. 
                  Dedicated to creating cutting-edge solutions that bridge the gap between imagination and reality.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <motion.a
                    href="https://www.linkedin.com/in/mohammed-nabeel-ca-007a8122b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm font-medium">Connect on LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center mb-12 pt-8 border-t border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href="mailto:hi@beloopai.com" className="text-gray-400 hover:text-white transition-colors text-sm">
              hi@beloopai.com
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
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Made by MOHAMMED NABEEL
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
