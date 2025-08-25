'use client'

import { useState, useEffect } from 'react'
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
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
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

      {/* Mouse Trail Effect */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(1px)',
          opacity: 0.6
        }}
      />

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

      {/* Trusted By Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-gray-400 text-sm font-medium mb-12 tracking-wider uppercase">Trusted by the world's most innovative teams</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-12 items-center opacity-60">
              {['Tesla', 'SpaceX', 'OpenAI', 'Anthropic', 'Meta', 'Google', 'Microsoft'].map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-gray-400 font-bold text-lg hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Ultra Modern */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/30 mb-6">
                  <Zap className="w-4 h-4 text-cyan-400 mr-2" />
                  <span className="text-cyan-400 font-medium text-sm">Lightning Fast</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Code at the <span className="gradient-text-neon">Speed of Thought</span>
                </h2>
              </div>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Beloop AI understands your coding patterns, predicts your next move, and generates 
                entire functions with just a few keystrokes. It's like having a genius programmer 
                sitting right next to you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">Real-time code completion</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">Context-aware suggestions</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">Multi-line predictions</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card group"
            >
              <div className="code-block">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="ml-4 text-cyan-400 text-sm font-mono">beloop-ai.ts</div>
                </div>
                <pre className="text-sm">
{`// AI predicts your next function
function createUser(name: string, email: string) {
  const user = {
    id: generateId(),
    name,
    email,
    createdAt: new Date(),
    status: 'active'
  };
  
  return user;
}

// AI suggests the next line
const user = createUser('John', 'john@example.com');
console.log('User created:', user.id);`}
                </pre>
              </div>
            </motion.div>
          </div>
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



      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  )
}
