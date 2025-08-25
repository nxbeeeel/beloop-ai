'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Brain, 
  Code, 
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Frontier Intelligence',
    description: 'Powered by a mix of purpose-built and frontier models, Beloop AI is smart and fast.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Code,
    title: 'Feels Familiar',
    description: 'Import all your extensions, themes, and keybindings in one click.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Privacy Options',
    description: 'If you enable Privacy Mode, your code is never stored remotely without your consent. Beloop AI is SOC 2 certified.',
    color: 'from-green-500 to-emerald-500'
  }
]

const benefits = [
  'Intelligent code completion with context awareness',
  'Multi-line predictions that understand your intent',
  'Natural language code generation and editing',
  'Full codebase understanding and documentation',
  'Privacy-first approach with local processing options',
  'Seamless integration with existing workflows'
]

export default function Features() {
  return (
    <section id="features" className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for developers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to code faster and smarter, with AI that understands your workflow.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Code at the speed of thought
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Beloop AI understands your codebase, your patterns, and your intent. 
              It's like having a brilliant pair programmer who never gets tired.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 btn-primary text-lg px-6 py-3 flex items-center gap-2"
            >
              Try Beloop AI Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="card p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      AI-Powered Development
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Real-time assistance and suggestions
                    </p>
                  </div>
                </div>
                
                <div className="code-block">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-white text-sm">
                      Intelligent Suggestions
                    </h5>
                    <div className="text-xs text-green-400 font-medium">AI</div>
                  </div>
                  <pre className="text-xs">
{`// Beloop AI suggests the next line
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}`}
                  </pre>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Completion accuracy</span>
                  <span className="text-green-400 font-medium">94%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Response time</span>
                  <span className="text-blue-400 font-medium">&lt;100ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
