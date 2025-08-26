'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { 
  Sparkles, 
  User, 
  Mail, 
  Settings,
  Shield,
  CreditCard,
  Bell,
  LogOut,
  Camera,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Crown,
  Zap,
  Star,
  Diamond
} from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(true)
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: session?.user?.email || 'john.doe@example.com',
    bio: 'AI enthusiast and developer passionate about the future of technology.',
    avatar: session?.user?.image || '/api/placeholder/150/150'
  })

  const [newProfileData, setNewProfileData] = useState(profileData)

  // Fetch subscription data
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.email) {
        setSubscriptionLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/subscription?userId=${session.user.email}`)
        if (response.ok) {
          const data = await response.json()
          const activeSubscription = data.subscriptions?.find((sub: any) => sub.status === 'active')
          setSubscription(activeSubscription)
        }
      } catch (error) {
        console.error('Failed to fetch subscription:', error)
      } finally {
        setSubscriptionLoading(false)
      }
    }

    fetchSubscription()
  }, [session?.user?.email])

  // Fetch favorites data
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user?.email) {
        setFavoritesLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/favorites?userId=${session.user.email}`)
        if (response.ok) {
          const data = await response.json()
          setFavorites(data.favorites || [])
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error)
      } finally {
        setFavoritesLoading(false)
      }
    }

    fetchFavorites()
  }, [session?.user?.email])

  // Get subscription badge info
  const getSubscriptionBadge = () => {
    if (!subscription) return null

    const badges = {
      'pro': {
        icon: Zap,
        color: 'from-blue-400 to-purple-400',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-400/50',
        label: 'Pro'
      },
      'premium': {
        icon: Crown,
        color: 'from-silver-300 to-silver-100',
        bgColor: 'bg-gradient-to-br from-silver-400/30 to-silver-600/20',
        borderColor: 'border-silver-300/60',
        label: 'Premium'
      },
      'enterprise': {
        icon: Diamond,
        color: 'from-purple-400 to-pink-400',
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-400/50',
        label: 'Enterprise'
      }
    }

    return badges[subscription.planId as keyof typeof badges] || null
  }

  const subscriptionBadge = getSubscriptionBadge()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProfileData({
      ...newProfileData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setProfileData(newProfileData)
      setIsEditing(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleCancelEdit = () => {
    setNewProfileData(profileData)
    setIsEditing(false)
  }

  // Game information mapping
  const getGameInfo = (gameKey: string) => {
    const gameMap: { [key: string]: any } = {
      tictactoe: { name: 'Tic‑Tac‑Toe', emoji: '❌⭕', desc: 'Play vs computer', difficulty: 'Easy', rating: 4.5 },
      number: { name: 'Number Guess', emoji: '🎲', desc: 'Guess 1-100', difficulty: 'Easy', rating: 4.2 },
      memory: { name: 'Memory', emoji: '🧠', desc: 'Match pairs', difficulty: 'Medium', rating: 4.3 },
      rps: { name: 'Rock Paper Scissors', emoji: '✊✋✌️', desc: 'Best of luck', difficulty: 'Easy', rating: 4.0 },
      snake: { name: 'Snake', emoji: '🐍', desc: 'Classic arcade', difficulty: 'Medium', rating: 4.7 },
      tetris: { name: 'Tetris', emoji: '🧩', desc: 'Block puzzle', difficulty: 'Hard', rating: 4.8 },
      pong: { name: 'Pong', emoji: '🏓', desc: 'Classic tennis', difficulty: 'Medium', rating: 4.6 },
      breakout: { name: 'Breakout', emoji: '🧱', desc: 'Break the blocks', difficulty: 'Medium', rating: 4.4 },
      flappy: { name: 'Flappy Bird', emoji: '🐦', desc: 'Navigate obstacles', difficulty: 'Hard', rating: 4.3 },
      '2048': { name: '2048', emoji: '🔢', desc: 'Merge numbers', difficulty: 'Medium', rating: 4.5 },
      sudoku: { name: 'Sudoku', emoji: '📊', desc: 'Logic puzzle', difficulty: 'Hard', rating: 4.7 },
      chess: { name: 'Chess', emoji: '♟️', desc: 'Strategic battle', difficulty: 'Hard', rating: 4.9 },
      checkers: { name: 'Checkers', emoji: '🔴⚫', desc: 'Classic board game', difficulty: 'Medium', rating: 4.1 },
      hangman: { name: 'Hangman', emoji: '🪢', desc: 'Guess the word', difficulty: 'Easy', rating: 4.0 },
      wordle: { name: 'Wordle', emoji: '📝', desc: 'Word guessing', difficulty: 'Medium', rating: 4.6 },
      pacman: { name: 'Pac-Man', emoji: '👻', desc: 'Eat dots, avoid ghosts', difficulty: 'Medium', rating: 4.8 },
      asteroids: { name: 'Asteroids', emoji: '☄️', desc: 'Space shooter', difficulty: 'Hard', rating: 4.4 },
      spaceinvaders: { name: 'Space Invaders', emoji: '👾', desc: 'Defend Earth', difficulty: 'Medium', rating: 4.5 },
      bomberman: { name: 'Bomberman', emoji: '💣', desc: 'Strategic bombing', difficulty: 'Medium', rating: 4.2 },
      minesweeper: { name: 'Minesweeper', emoji: '💥', desc: 'Find the mines', difficulty: 'Medium', rating: 4.3 },
      connect4: { name: 'Connect 4', emoji: '🔵🔴', desc: 'Connect the dots', difficulty: 'Medium', rating: 4.4 },
      solitaire: { name: 'Solitaire', emoji: '🃏', desc: 'Card puzzle', difficulty: 'Easy', rating: 4.1 },
      mahjong: { name: 'Mahjong', emoji: '🀄', desc: 'Tile matching', difficulty: 'Hard', rating: 4.6 },
      crossword: { name: 'Crossword', emoji: '📋', desc: 'Word puzzle', difficulty: 'Medium', rating: 4.2 },
      mathquiz: { name: 'Math Quiz', emoji: '🧮', desc: 'Test your skills', difficulty: 'Easy', rating: 4.0 },
      typing: { name: 'Speed Typing', emoji: '⌨️', desc: 'Type fast', difficulty: 'Medium', rating: 4.3 },
      colorblast: { name: 'Color Blast', emoji: '🎨', desc: 'Match colors', difficulty: 'Easy', rating: 4.1 },
      jigsaw: { name: 'Jigsaw Puzzle', emoji: '🧩', desc: 'Piece together', difficulty: 'Medium', rating: 4.4 },
      simon: { name: 'Simon Says', emoji: '🎵', desc: 'Memory sequence', difficulty: 'Medium', rating: 4.2 },
      whackamole: { name: 'Whack-a-Mole', emoji: '🔨', desc: 'Quick reflexes', difficulty: 'Easy', rating: 4.0 },
      pinball: { name: 'Pinball', emoji: '🎰', desc: 'Bounce the ball', difficulty: 'Medium', rating: 4.3 },
      racing: { name: 'Racing', emoji: '🏎️', desc: 'Speed challenge', difficulty: 'Medium', rating: 4.5 },
      platformer: { name: 'Platformer', emoji: '🏃', desc: 'Jump and run', difficulty: 'Hard', rating: 4.4 },
      shooter: { name: 'Space Shooter', emoji: '🎯', desc: 'Target practice', difficulty: 'Medium', rating: 4.2 }
    }
    return gameMap[gameKey] || { name: 'Unknown Game', emoji: '🎮', desc: 'Game', difficulty: 'Medium', rating: 4.0 }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Hard': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const removeFromFavorites = async (gameKey: string) => {
    if (!session?.user?.email) return

    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.email,
          gameKey
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setFavorites(data.favorites)
      }
    } catch (error) {
      console.error('Failed to remove from favorites:', error)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-20"></div>
      <div className="fixed inset-0 bg-noise"></div>
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(10)].map((_, i) => (
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
                Back to Chat
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Account <span className="gradient-text-neon">Settings</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Manage your profile, security settings, and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="card p-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <motion.button
                          key={tab.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/30 text-cyan-400'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </motion.button>
                      )
                    })}
                  </nav>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                        {!isEditing ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Profile</span>
                          </motion.button>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleCancelEdit}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-all duration-300"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleSaveProfile}
                              disabled={isLoading}
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 disabled:opacity-50"
                            >
                              {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Save className="w-4 h-4" />
                              )}
                              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                            </motion.button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Avatar Section */}
                        <div className="text-center">
                          <div className="relative inline-block">
                            <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                              {session?.user?.image ? (
                                <img 
                                  src={session.user.image} 
                                  alt={session.user.name || 'User'} 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-16 h-16 text-white" />
                              )}
                              
                              {/* Subscription Badge */}
                              {subscriptionBadge && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                  className={`absolute -top-2 -right-2 w-12 h-12 rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border-2 flex items-center justify-center shadow-lg backdrop-blur-sm`}
                                >
                                  <subscriptionBadge.icon className={`w-6 h-6 bg-gradient-to-r ${subscriptionBadge.color} bg-clip-text text-transparent`} />
                                </motion.div>
                              )}
                              
                              {/* Subscription Loading Indicator */}
                              {subscriptionLoading && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gray-800/80 border-2 border-gray-600 flex items-center justify-center"
                                >
                                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                                </motion.div>
                              )}
                            </div>
                            
                            {isEditing && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute bottom-2 right-2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border-2 border-cyan-400 hover:bg-gray-700 transition-all duration-300"
                              >
                                <Camera className="w-5 h-5 text-white" />
                              </motion.button>
                            )}
                          </div>
                          
                          {/* Subscription Status */}
                          <div className="mt-4">
                            {subscriptionBadge ? (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border`}
                              >
                                <subscriptionBadge.icon className={`w-4 h-4 bg-gradient-to-r ${subscriptionBadge.color} bg-clip-text text-transparent`} />
                                <span className="text-sm font-medium text-white">{subscriptionBadge.label} Member</span>
                              </motion.div>
                            ) : !subscriptionLoading && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700"
                              >
                                <Star className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-400">Free Plan</span>
                              </motion.div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-400 mt-2">Profile picture</p>
                        </div>

                        {/* Profile Form */}
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                First Name
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={isEditing ? newProfileData.firstName : profileData.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={isEditing ? newProfileData.lastName : profileData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={isEditing ? newProfileData.email : profileData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Bio
                            </label>
                            <textarea
                              name="bio"
                              value={isEditing ? newProfileData.bio : profileData.bio}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              rows={4}
                              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50 resize-none"
                              placeholder="Tell us about yourself..."
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'favorites' && (
                    <motion.div
                      key="favorites"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">Favorite Games</h2>
                        <div className="flex items-center space-x-2">
                          <Star className="w-6 h-6 text-yellow-400" />
                          <span className="text-gray-400">{favorites.length} games</span>
                        </div>
                      </div>

                      {favoritesLoading ? (
                        <div className="text-center py-12">
                          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-400">Loading your favorites...</p>
                        </div>
                      ) : favorites.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-yellow-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">No Favorite Games Yet</h3>
                          <p className="text-gray-400 mb-6">Start playing games and add them to your favorites to see them here!</p>
                          <Link href="/chat">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                            >
                              Go to Games
                            </motion.button>
                          </Link>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {favorites.map((gameKey) => {
                            const gameInfo = getGameInfo(gameKey)
                            return (
                              <motion.div
                                key={gameKey}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 group"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="text-3xl">{gameInfo.emoji}</div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeFromFavorites(gameKey)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                                    title="Remove from favorites"
                                  >
                                    <X className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                  {gameInfo.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">{gameInfo.desc}</p>
                                <div className="flex items-center justify-between">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(gameInfo.difficulty)} bg-gray-700/50`}>
                                    {gameInfo.difficulty}
                                  </span>
                                  <span className="text-yellow-400 text-xs">⭐ {gameInfo.rating}</span>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8"
                    >
                      <h2 className="text-2xl font-bold text-white mb-8">Security Settings</h2>
                      <div className="space-y-6">
                        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">Two-Factor Authentication</h3>
                              <p className="text-gray-400">Add an extra layer of security to your account</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                            >
                              Enable 2FA
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">Change Password</h3>
                              <p className="text-gray-400">Update your password regularly for better security</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                            >
                              Change Password
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">Active Sessions</h3>
                              <p className="text-gray-400">Manage your active login sessions</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                            >
                              View Sessions
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'billing' && (
                    <motion.div
                      key="billing"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8"
                    >
                      <h2 className="text-2xl font-bold text-white mb-8">Billing & Subscription</h2>
                      
                      {subscriptionLoading ? (
                        <div className="text-center py-12">
                          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-400">Loading subscription information...</p>
                        </div>
                      ) : subscription ? (
                        <div className="space-y-6">
                          {/* Current Subscription */}
                          <div className="p-6 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-xl border border-cyan-400/20">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                {subscriptionBadge && (
                                  <div className={`w-12 h-12 rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border-2 flex items-center justify-center`}>
                                    <subscriptionBadge.icon className={`w-6 h-6 bg-gradient-to-r ${subscriptionBadge.color} bg-clip-text text-transparent`} />
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-xl font-bold text-white">{subscription.planName} Plan</h3>
                                  <p className="text-gray-400">Active Subscription</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-white">
                                  ${(subscription.amount / 100).toFixed(2)}
                                </div>
                                <div className="text-gray-400 text-sm">per month</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Status:</span>
                                <span className="ml-2 text-green-400 font-medium">Active</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Next billing:</span>
                                <span className="ml-2 text-white">
                                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Started:</span>
                                <span className="ml-2 text-white">
                                  {new Date(subscription.currentPeriodStart).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-4">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                            >
                              Manage Subscription
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 py-3 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-all duration-300"
                            >
                              View Invoices
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 py-3 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-all duration-300"
                            >
                              Cancel Subscription
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">Free Plan</h3>
                          <p className="text-gray-400 mb-6">You're currently on the free plan. Upgrade to unlock premium features.</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                          >
                            <Link href="/#pricing">View Plans</Link>
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'notifications' && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8"
                    >
                      <h2 className="text-2xl font-bold text-white mb-8">Notification Preferences</h2>
                      <div className="text-center py-12">
                        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Notifications Coming Soon</h3>
                        <p className="text-gray-400">Customize your notification preferences here.</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8"
                    >
                      <h2 className="text-2xl font-bold text-white mb-8">General Settings</h2>
                      <div className="text-center py-12">
                        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Settings Coming Soon</h3>
                        <p className="text-gray-400">Additional settings and preferences will be available here.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
