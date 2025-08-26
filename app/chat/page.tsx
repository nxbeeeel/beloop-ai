'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Loader2,
  Bot,
  User,
  Clock,
  Copy,
  Check,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Simple client-side session check
function useClientSession() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const data = await response.json()
          setSession(data)
        }
      } catch (error) {
        console.error('Session check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  return { session, loading }
}

function ChatPageContent() {
  const router = useRouter()
  const { session, loading } = useClientSession()
  
  // All state declarations at the top
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !session) {
      router.push('/login')
    }
  }, [session, loading, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Please sign in to continue...</p>
        </div>
      </div>
    )
  }

  // Set initial message when session is available
  useEffect(() => {
    if (session?.user?.name && messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello ${session.user.name}! I'm your AI assistant. How can I help you today?`,
          timestamp: new Date()
        }
      ])
    }
  }, [session?.user?.name, messages.length])

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading || !session?.user?.id) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          userId: session.user.id
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setMessages([])
  }

  const copyMessage = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId)
    if (message) {
      try {
        await navigator.clipboard.writeText(message.content)
        setCopiedMessageId(messageId)
        setTimeout(() => setCopiedMessageId(null), 2000)
      } catch (error) {
        console.error('Failed to copy message:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-cyan-400">
              Beloop AI
            </Link>
            {subscription && (
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-400/50 bg-cyan-500/20">
                <span className="text-xs font-medium text-gray-200">Premium</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/account" className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300">
              <User className="w-4 h-4" />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && <Bot className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center space-x-2 mt-2 text-xs opacity-70">
                        <Clock className="w-3 h-3" />
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => copyMessage(message.id)}
                            className="hover:text-cyan-400 transition-colors"
                          >
                            {copiedMessageId === message.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-gray-800">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <button
                type="button"
                onClick={startNewChat}
                className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 resize-none"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-cyan-500 rounded-lg hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return <ChatPageContent />
}
