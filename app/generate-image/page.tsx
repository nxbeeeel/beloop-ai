'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Image as ImageIcon,
  Download,
  RefreshCw,
  Palette,
  Camera,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const imageStyles = [
  { id: 'realistic', name: 'Realistic', description: 'Photorealistic images' },
  { id: 'artistic', name: 'Artistic', description: 'Creative and artistic style' },
  { id: 'cartoon', name: 'Cartoon', description: 'Animated and cartoon style' },
  { id: 'abstract', name: 'Abstract', description: 'Abstract and modern art' },
  { id: 'vintage', name: 'Vintage', description: 'Retro and vintage aesthetic' },
  { id: 'fantasy', name: 'Fantasy', description: 'Magical and fantasy elements' }
]

export default function GenerateImagePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [imageDescription, setImageDescription] = useState('')
  const [error, setError] = useState('')

  // Redirect if not authenticated
  if (status === 'loading') {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
    </div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedImage(null)
    setImageDescription('')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      setGeneratedImage(data.imageUrl)
      setImageDescription(data.description)
    } catch (error) {
      console.error('Image generation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate image')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `generated-image-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

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
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:animate-glow transition-all duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text-neon">Beloop AI</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-4 py-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chat
              </motion.button>
            </Link>
          </div>
        </div>
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
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <ImageIcon className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                AI Image <span className="gradient-text-neon">Generator</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Transform your ideas into stunning visuals with our AI-powered image generator
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Generate Your Image</h2>
                
                {/* Prompt Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe your image
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A majestic dragon flying over a medieval castle at sunset..."
                    className="w-full p-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                    rows={4}
                  />
                </div>

                {/* Style Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Choose Style
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {imageStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3 rounded-xl border transition-all duration-300 text-left ${
                          selectedStyle === style.id
                            ? 'bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border-cyan-400/50 text-cyan-400'
                            : 'bg-gray-900/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{style.name}</div>
                        <div className="text-xs opacity-75">{style.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      <span>Generate Image</span>
                    </>
                  )}
                </motion.button>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </motion.div>

              {/* Generated Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Generated Image</h2>
                
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20"
                    >
                      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-400">Creating your masterpiece...</p>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-4"
                    >
                      <div className="relative group">
                        <img
                          src={generatedImage}
                          alt="Generated image"
                          className="w-full h-80 object-cover rounded-xl border border-gray-700/50"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleDownload}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                          >
                            <Download className="w-6 h-6" />
                          </motion.button>
                        </div>
                      </div>
                      
                      {imageDescription && (
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                          <h3 className="text-sm font-medium text-gray-300 mb-2">AI Description</h3>
                          <p className="text-sm text-gray-400">{imageDescription}</p>
                        </div>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateImage}
                        className="w-full btn-secondary flex items-center justify-center space-x-2 py-3"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Generate Another</span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 text-gray-400"
                    >
                      <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-center">
                        Enter a prompt and choose a style to generate your first AI image
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Tips for Better Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-2">Be Specific</h3>
                    <p className="text-gray-400 text-sm">
                      Include details about colors, lighting, composition, and mood for better results.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-2">Choose Style Wisely</h3>
                    <p className="text-gray-400 text-sm">
                      Different styles work better for different types of images. Experiment to find what works best.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-2">Iterate</h3>
                    <p className="text-gray-400 text-sm">
                      Don't be afraid to generate multiple versions and refine your prompt based on results.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
