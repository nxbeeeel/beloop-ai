'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogIn, UserPlus, MessageSquare, LogOut, Sparkles, Crown, Zap, Star, Diamond } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

interface AuthSectionProps {
  isMobile?: boolean
  onMenuClose?: () => void
}

export default function AuthSection({ isMobile = false, onMenuClose }: AuthSectionProps) {
  const { data: session, status } = useSession()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)

  // Fetch subscription data
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.email) return

      try {
        const response = await fetch(`/api/subscription?userId=${session.user.email}`)
        if (response.ok) {
          const data = await response.json()
          const activeSubscription = data.subscriptions?.find((sub: any) => sub.status === 'active')
          setSubscription(activeSubscription)
        }
      } catch (error) {
        console.error('Failed to fetch subscription:', error)
      }
    }

    fetchSubscription()
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

  const handleMenuClose = () => {
    setIsUserMenuOpen(false)
    onMenuClose?.()
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
    handleMenuClose()
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 p-2 rounded-xl text-gray-300">
        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  if (session) {
    // Logged in user
    if (isMobile) {
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
            <div className="relative">
              {session.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || 'User'} 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              
              {/* Subscription Badge */}
              {subscriptionBadge && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border flex items-center justify-center shadow-lg backdrop-blur-sm`}
                >
                  <subscriptionBadge.icon className={`w-3 h-3 bg-gradient-to-r ${subscriptionBadge.color} bg-clip-text text-transparent`} />
                </motion.div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{session.user?.name}</p>
              <p className="text-xs text-gray-400">{session.user?.email}</p>
            </div>
          </div>
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
              onClick={handleMenuClose}
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </motion.button>
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full px-6 py-3 text-sm font-semibold"
              onClick={handleMenuClose}
            >
              Go to Chat
            </motion.button>
          </Link>
        </div>
      )
    }

    // Desktop logged in user
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-3 p-2 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
        >
          <div className="relative">
            {session.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || 'User'} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            
            {/* Subscription Badge */}
            {subscriptionBadge && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border flex items-center justify-center shadow-lg backdrop-blur-sm`}
              >
                <subscriptionBadge.icon className={`w-2.5 h-2.5 bg-gradient-to-r ${subscriptionBadge.color} bg-clip-text text-transparent`} />
              </motion.div>
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">{session.user?.name}</p>
            <p className="text-xs text-gray-400">{session.user?.email}</p>
          </div>
        </motion.button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 glass-strong rounded-xl border border-cyan-400/20 shadow-2xl"
            >
              <div className="p-2">
                <Link href="/chat">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">AI Chat</span>
                  </motion.button>
                </Link>
                <Link href="/generate-image">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Generate Images</span>
                  </motion.button>
                </Link>
                <Link href="/account">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Account</span>
                  </motion.button>
                </Link>
                <div className="border-t border-gray-700/50 my-1"></div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Not logged in
  if (isMobile) {
    return (
      <div className="space-y-3">
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
            onClick={handleMenuClose}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </motion.button>
        </Link>
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
            onClick={handleMenuClose}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </motion.button>
        </Link>
        <Link href="/chat">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary w-full px-6 py-3 text-sm font-semibold"
            onClick={handleMenuClose}
          >
            Try AI Assistant
          </motion.button>
        </Link>
      </div>
    )
  }

  // Desktop not logged in
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 p-2 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
      >
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">Account</span>
      </motion.button>

      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 glass-strong rounded-xl border border-cyan-400/20 shadow-2xl"
          >
            <div className="p-2">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">Sign In</span>
                </motion.button>
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm">Sign Up</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
