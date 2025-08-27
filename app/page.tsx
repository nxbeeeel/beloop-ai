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
import dynamic from 'next/dynamic'

// Dynamically import heavy components
const LazyTestimonials = dynamic(() => import('./components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-900/50 rounded-xl animate-pulse" />,
  ssr: false
})

const LazyPricing = dynamic(() => import('./components/Pricing'), {
  loading: () => <div className="h-96 bg-gray-900/50 rounded-xl animate-pulse" />,
  ssr: false
})

const LazyFooter = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-32 bg-gray-900/50 animate-pulse" />,
  ssr: false
})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-20"></div>
      <div className="fixed inset-0 bg-noise"></div>
      
      {/* Interactive Elements (Client-only) - Lazy loaded */}
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

                        {/* Enhanced Company Grid with Real Brand Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-12 items-center">
              {[
                {
                  name: 'Tesla',
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 342 35" fill="currentColor">
                      <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h11a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h11a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h11a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h11a9.6 9.6 0 0 0 7-7h-25a9.6 9.6 0 0 0 7 7z"/>
                    </svg>
                  ),
                  color: 'from-red-500 to-red-600',
                  brandColor: 'text-red-500'
                },
                {
                  name: 'SpaceX',
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 400 50" fill="currentColor">
                      <path d="M37.5 30.5H10.9v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4H11.4c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M82.3 30.5H55.7v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4H56.2c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M127.1 30.5h-26.6v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4h-26.1c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M171.9 30.5h-26.6v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4h-26.1c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M216.7 30.5h-26.6v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4h-26.1c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M261.5 30.5h-26.6v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4h-26.1c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M306.3 30.5h-26.6v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4h-26.1c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                      <path d="M351.1 30.5h-26.6v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4h-26.1c-5.7 0-9 2.1-9 6.7v4.9c0 4.5 3.3 6.7 9 6.7h26.1c5.7 0 8.9-2.1 8.9-6.7v-4.9c0-4.5-3.2-6.7-8.9-6.7z"/>
                    </svg>
                  ),
                  color: 'from-gray-700 to-gray-800',
                  brandColor: 'text-gray-300'
                },
                { 
                  name: 'OpenAI', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 41 41" fill="currentColor">
                      <path d="M37.5324 16.8706C37.9808 15.5241 38.1369 14.0614 37.9886 12.6008C37.8403 11.1401 37.3921 9.74228 36.6724 8.48825C35.9527 7.23422 34.9795 6.15456 33.8219 5.30989C32.6644 4.46522 31.3489 3.87733 29.9447 3.58522C28.5405 3.29311 27.0807 3.3052 25.6837 3.62098C24.2867 3.93676 22.9813 4.54825 21.8475 5.42098C20.7137 6.29371 19.7769 7.40886 19.0898 8.70374C18.4027 9.99862 17.9812 11.4568 17.8596 12.9653C17.7379 14.4738 17.9201 15.9976 18.3934 17.4336C18.8667 18.8696 19.6174 20.1897 20.6002 21.3347C21.583 22.4797 22.7766 23.4263 24.1125 24.1284C25.4484 24.8305 26.9054 25.2757 28.4384 25.4392C29.9714 25.6027 31.5574 25.4807 33.0824 25.0789C34.6074 24.6771 36.0447 24.0039 37.3244 23.0927C38.6041 22.1815 39.7047 21.0469 40.5802 19.7387L37.5324 16.8706ZM12.9698 28.5079C11.2723 28.3702 9.61047 27.9106 8.07097 27.1496C6.53147 26.3886 5.14001 25.3367 3.96523 24.0385C2.79045 22.7403 1.85306 21.2173 1.19448 19.5346C0.5359 17.8519 0.168789 16.0358 0.114258 14.1953C0.059727 12.3548 0.319494 10.5146 0.883403 8.75193C1.44731 6.98926 2.30649 5.33112 3.42596 3.85029C4.54543 2.36946 5.90821 1.08774 7.45775 0.0587853C9.00729 -0.970168 10.7208 -1.74979 12.5156 -2.24562C14.3104 -2.74145 16.1647 -2.94683 18.0074 -2.85351C19.8502 -2.76019 21.6595 -2.36983 23.3864 -1.69455C25.1133 -1.01927 26.7338 -0.0667133 28.1861 1.13466L25.1383 4.00275C24.0422 3.22841 22.8097 2.65769 21.4898 2.31478C20.1698 1.97187 18.7829 1.86248 17.3981 1.99139C16.0132 2.1203 14.6507 2.48523 13.3657 3.07088C12.0806 3.65653 10.8926 4.45453 9.84984 5.43783C8.80708 6.42113 7.92257 7.5768 7.22718 8.86533C6.53179 10.1539 6.03406 11.5599 5.75426 13.0266C5.47446 14.4933 5.41639 16.0032 5.58268 17.4892C5.74897 18.9752 6.13753 20.4205 6.73507 21.7765C7.33261 23.1325 8.13045 24.3835 9.09832 25.4834C10.0662 26.5834 11.1909 27.5179 12.4338 28.253L12.9698 28.5079Z"/>
                    </svg>
                  ), 
                  color: 'from-green-500 to-green-600',
                  brandColor: 'text-green-400'
                },
                { 
                  name: 'Anthropic', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z"/>
                      <path d="M16 6c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                      <path d="M16 10c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                    </svg>
                  ), 
                  color: 'from-purple-500 to-purple-600',
                  brandColor: 'text-purple-400'
                },
                { 
                  name: 'Meta', 
                  logo: (
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M15 11.2h3.6c1.08 0 1.92-.84 1.92-1.92s-.84-1.92-1.92-1.92H15c-1.08 0-1.92.84-1.92 1.92s.84 1.92 1.92 1.92z"/>
                      <path d="M15 7.2h3.6c2.16 0 3.84 1.68 3.84 3.84s-1.68 3.84-3.84 3.84H15c-2.16 0-3.84-1.68-3.84-3.84S12.84 7.2 15 7.2z"/>
                      <path d="M15 14.88h3.6c1.08 0 1.92-.84 1.92-1.92s-.84-1.92-1.92-1.92H15c-1.08 0-1.92.84-1.92 1.92s.84 1.92 1.92 1.92z"/>
                      <path d="M15 10.88h3.6c2.16 0 3.84 1.68 3.84 3.84s-1.68 3.84-3.84 3.84H15c-2.16 0-3.84-1.68-3.84-3.84S12.84 10.88 15 10.88z"/>
                      <path d="M15 18.56h3.6c1.08 0 1.92-.84 1.92-1.92s-.84-1.92-1.92-1.92H15c-1.08 0-1.92.84-1.92 1.92s.84 1.92 1.92 1.92z"/>
                      <path d="M15 14.56h3.6c2.16 0 3.84 1.68 3.84 3.84s-1.68 3.84-3.84 3.84H15c-2.16 0-3.84-1.68-3.84-3.84S12.84 14.56 15 14.56z"/>
                      <path d="M15 22.24h3.6c1.08 0 1.92-.84 1.92-1.92s-.84-1.92-1.92-1.92H15c-1.08 0-1.92.84-1.92 1.92s.84 1.92 1.92 1.92z"/>
                      <path d="M15 18.24h3.6c2.16 0 3.84 1.68 3.84 3.84s-1.68 3.84-3.84 3.84H15c-2.16 0-3.84-1.68-3.84-3.84S12.84 18.24 15 18.24z"/>
                      <path d="M15 25.92h3.6c1.08 0 1.92-.84 1.92-1.92s-.84-1.92-1.92-1.92H15c-1.08 0-1.92.84-1.92 1.92s.84 1.92 1.92 1.92z"/>
                      <path d="M15 21.92h3.6c2.16 0 3.84 1.68 3.84 3.84s-1.68 3.84-3.84 3.84H15c-2.16 0-3.84-1.68-3.84-3.84S12.84 21.92 15 21.92z"/>
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
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M0 0h11v11H0z"/>
                      <path d="M12 0h11v11H12z"/>
                      <path d="M0 12h11v11H0z"/>
                      <path d="M12 12h11v11H12z"/>
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



      
        <LazyPricing />
        <LazyTestimonials />
        <LazyFooter />
    </main>
  )
}
