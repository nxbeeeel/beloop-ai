'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Zap, 
  Code, 
  Brain, 
  ArrowRight,
  CheckCircle,
  Terminal,
  Cpu,
  Rocket,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'
import InteractiveElements from './components/InteractiveElements'
import LazyLoad, { LazyTestimonials, LazyPricing, LazyFooter } from './components/LazyLoad'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-20"></div>
      <div className="fixed inset-0 bg-noise"></div>
      
      {/* Interactive Elements (Client-only) */}
      <InteractiveElements />

      <Header />
      
      {/* Hero Section - Ultra Modern */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full glass-strong border border-cyan-400/20">
                <Sparkles className="w-5 h-5 text-cyan-400 mr-2 animate-pulse-neon" />
                <span className="text-cyan-400 font-medium text-sm">Powered by Advanced AI</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
                <span className="gradient-text-neon">THE</span>
                <br />
                <span className="gradient-text">FUTURE</span>
                <br />
                <span className="text-white">OF AI</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Experience the next evolution of AI assistance that understands your needs, 
              predicts your goals, and accelerates your productivity to <span className="gradient-text-neon">lightning speed</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link href="/chat">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xl px-10 py-5 flex items-center gap-3 group"
                >
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Launch Beloop AI
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href="/chat">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-xl px-10 py-5 flex items-center gap-3 group"
                >
                  <Terminal className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Try AI Assistant
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text-neon mb-2">10x</div>
                <div className="text-gray-400 text-sm">Faster Productivity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text-neon mb-2">99%</div>
                <div className="text-gray-400 text-sm">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text-neon mb-2">∞</div>
                <div className="text-gray-400 text-sm">Possibilities</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
      </section>

      {/* Trusted By Section - Enhanced */}
      <section className="py-24 sm:py-32 border-t border-gray-800/50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16 sm:mb-20"
          >
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/30 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <span className="text-cyan-400 font-semibold text-sm tracking-wider uppercase">Global Trust</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Trusted by the World's
                <br />
                <span className="gradient-text-neon">Most Innovative Teams</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Join thousands of leading companies and developers who trust Beloop AI to power their next breakthrough
              </p>
            </motion.div>

            {/* Enhanced Company Grid with Real Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-12 items-center">
              {[
                { 
                  name: 'Tesla', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                    </svg>
                  ), 
                  color: 'from-red-500 to-red-600',
                  brandColor: 'text-red-500'
                },
                { 
                  name: 'SpaceX', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M12 6l-6 3v6l6 3 6-3V9l-6-3z"/>
                    </svg>
                  ), 
                  color: 'from-gray-700 to-gray-800',
                  brandColor: 'text-gray-300'
                },
                { 
                  name: 'OpenAI', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  ), 
                  color: 'from-green-500 to-green-600',
                  brandColor: 'text-green-400'
                },
                { 
                  name: 'Anthropic', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  ), 
                  color: 'from-purple-500 to-purple-600',
                  brandColor: 'text-purple-400'
                },
                { 
                  name: 'Meta', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                    </svg>
                  ), 
                  color: 'from-blue-500 to-blue-600',
                  brandColor: 'text-blue-400'
                },
                { 
                  name: 'Google', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  ), 
                  color: 'from-red-500 to-yellow-500',
                  brandColor: 'text-yellow-400'
                },
                { 
                  name: 'Microsoft', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.5 2.75l-8.5 4.5v9.5c0 .83.67 1.5 1.5 1.5h7v-15.5l-8.5-4.5z"/>
                      <path d="M12.5 2.75l8.5 4.5v9.5c0 .83-.67 1.5-1.5 1.5h-7v-15.5l8.5-4.5z"/>
                    </svg>
                  ), 
                  color: 'from-blue-600 to-blue-700',
                  brandColor: 'text-blue-400'
                }
              ].map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative"
                >
                  {/* Company Card */}
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-400/20">
                    {/* Company Logo */}
                    <div className={`mb-4 group-hover:scale-110 transition-transform duration-500 ${company.brandColor}`}>
                      {company.logo}
                    </div>
                    
                    {/* Company Name */}
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {company.name}
                    </h3>
                    
                    {/* Status Badge */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">Active Partner</span>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text-neon mb-2">500+</div>
                <div className="text-gray-400 text-sm sm:text-base">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text-neon mb-2">50K+</div>
                <div className="text-gray-400 text-sm sm:text-base">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text-neon mb-2">99.9%</div>
                <div className="text-gray-400 text-sm sm:text-base">Uptime SLA</div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Enterprise Ready</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* AI Intelligence Section */}
      <section className="py-32 border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="card p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        AI Assistant
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Real-time intelligent suggestions
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-cyan-400/20">
                      <p className="text-gray-300 text-sm">
                        "I can see you're building a React component. Would you like me to add TypeScript types and error handling?"
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Response time</span>
                      <span className="text-cyan-400 font-mono">&lt;50ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-400/20 to-purple-400/20 border border-pink-400/30 mb-6">
                  <Cpu className="w-4 h-4 text-pink-400 mr-2" />
                  <span className="text-pink-400 font-medium text-sm">Advanced AI</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Your <span className="gradient-text-neon">AI Pair Programmer</span>
                </h2>
              </div>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Beloop AI doesn't just complete code—it understands your entire codebase, 
                learns your patterns, and becomes an extension of your development team.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">Full codebase understanding</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">Natural language commands</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">One-click code insertion</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      
        <LazyLoad>
          <LazyPricing />
        </LazyLoad>
        <LazyLoad>
          <LazyTestimonials />
        </LazyLoad>
        <LazyLoad>
          <LazyFooter />
        </LazyLoad>
    </main>
  )
}
