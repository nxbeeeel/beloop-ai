'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ben Bernard',
    role: 'Instacart',
    content: 'Beloop AI is at least a 2x improvement over Copilot. It\'s amazing having an AI pair programmer, and is an incredible accelerator for me and my team.',
    rating: 5
  },
  {
    name: 'Kevin Whinnery',
    role: 'OpenAI',
    content: 'The tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what I want to do. It is enough to make you believe that eventually you\'ll be able to code at the speed of thought.',
    rating: 5
  },
  {
    name: 'Sawyer Hood',
    role: 'Figma',
    content: 'Beloop AI is hands down my biggest workflow improvement in years',
    rating: 5
  },
  {
    name: 'Andrew Milich',
    role: 'Notion',
    content: 'I love writing code and Beloop AI is a necessity. Beloop AI is steps ahead of my brain, proposing multi-line edits so I type \'tab\' more than anything else.',
    rating: 5
  },
  {
    name: 'Morgan McGuire',
    role: 'Weights & Biases',
    content: 'Beloop AI is so good, and literally gets better/more feature-rich every couple of weeks.',
    rating: 5
  },
  {
    name: 'Andrew McCalip',
    role: 'Varda',
    content: 'Beloop AI is awesome! Someone finally put GPT into a code editor in a seamless way. It\'s so elegant and easy. No more copying and pasting. I\'m an hour in and already hooked.',
    rating: 5
  }
]

const stats = [
  { number: '2x', label: 'Faster than Copilot' },
  { number: '94%', label: 'Completion Accuracy' },
  { number: '<100ms', label: 'Response Time' },
  { number: '50K+', label: 'Active Developers' }
]

export default function Testimonials() {
  return (
    <section className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by world-class devs
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Engineers all around the world reach for Beloop AI by choice.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-3xl md:text-4xl font-bold text-blue-400 mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 font-medium text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-6 h-6 text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
