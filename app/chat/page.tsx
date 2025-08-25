'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Loader2,
  Sparkles,
  History,
  Trash2,
  Plus,
  MessageSquare,
  Bot,
  User,
  Clock,
  Search,
  Copy,
  Check,
  Crown,
  Zap,
  Star,
  Diamond,
  Eye,
  Code,
  Monitor,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ErrorBoundary from '../components/ErrorBoundary'

// Gemini-style Code Editor Component
const CodeEditor = ({ html = '', css = '', js = '', title = 'Code Editor', onClose }: {
  html: string
  css: string
  js: string
  title: string
  onClose: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current && activeTab === 'preview') {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      
      if (doc) {
        doc.open()
        doc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            <style>
              ${css}
              body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (error) {
                console.error('Preview error:', error);
              }
            </script>
          </body>
          </html>
        `)
        doc.close()
      }
    }
  }, [html, css, js, title, activeTab])

  const getFullCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed inset-4 z-50 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <Code className="w-5 h-5 text-cyan-400" />
          <span className="text-lg font-semibold text-white">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            title="Save"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            title="Undo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            title="Redo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigator.clipboard.writeText(getFullCode())}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            title="Copy Code"
          >
            <Copy className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200"
            title="Close"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between p-4 bg-gray-800/30 border-b border-gray-700/50">
        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'code'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Code</span>
              {activeTab === 'code' && <Check className="w-4 h-4" />}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>Preview</span>
            </div>
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-200"
        >
          Share
        </motion.button>
      </div>

      {/* Content Area */}
      <div className="flex-1 h-full">
        {activeTab === 'code' ? (
          <div className="h-full bg-gray-900 p-4">
            <pre className="h-full overflow-auto text-sm text-gray-300 font-mono leading-relaxed">
              <code>{getFullCode()}</code>
            </pre>
          </div>
        ) : (
          <div className="h-full bg-white">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Live Preview"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  fallback?: boolean
  codePreview?: {
    html?: string
    css?: string
    js?: string
    title?: string
  }
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  lastMessage: string
  timestamp: Date
}

function ChatPageContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  // Show loading while checking authentication
  if (status === 'loading') {
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
    return null
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${session.user?.name || 'there'}! I'm your AI assistant. How can I help you today?`,
      timestamp: new Date()
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [conversations, setConversations] = useState<any[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [codeEditorData, setCodeEditorData] = useState<{
    html: string
    css: string
    js: string
    title: string
  } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }



  const loadMessages = async (conversationId: string) => {
    if (!session?.user?.email) return

    try {
      const response = await fetch(`/api/chat-history?userId=${session.user.email}&conversationId=${conversationId}`)
      if (response.ok) {
        const data = await response.json()
        const loadedMessages = data.messages || []
        
        // Convert to Message format
        const formattedMessages: Message[] = loadedMessages.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }))
        
        setMessages(formattedMessages)
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const startNewChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: `Hello ${session?.user?.name || 'there'}! I'm your AI assistant. How can I help you today?`,
      timestamp: new Date()
    }])
    setCurrentConversationId(null)
    setShowHistory(false)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      loadConversations()
    }
  }, [session])

  // Load messages for current conversation
  useEffect(() => {
    if (currentConversationId && session?.user?.email) {
      loadMessages(currentConversationId)
    }
  }, [currentConversationId, session?.user?.email])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !session?.user?.id) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
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
          message: userMessage.content,
          conversationId: currentConversationId,
          userId: session.user.id
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        fallback: data.fallback || false
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Update conversation ID if this is a new conversation
      if (data.conversationId && !currentConversationId) {
        setCurrentConversationId(data.conversationId)
      }
      
      // Reload conversations to show the new one
      await loadConversations()
    } catch (error) {
      const errorMessage: Message = {
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

  const loadConversations = async () => {
    if (!session?.user?.id) return
    
    try {
      const response = await fetch(`/api/chat-history?userId=${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations || [])
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
    }
  }

  const loadConversation = async (conversationId: string) => {
    if (!session?.user?.id) return
    
    try {
      const response = await fetch(`/api/chat-history?userId=${session.user.id}&conversationId=${conversationId}`)
      if (response.ok) {
        const data = await response.json()
        const historyMessages = data.messages || []
        
        // Convert to Message format
        const convertedMessages = historyMessages.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }))
        
        setMessages(convertedMessages)
        setCurrentConversationId(conversationId)
        setShowHistory(false)
      }
    } catch (error) {
      console.error('Failed to load conversation:', error)
    }
  }

  const deleteConversation = async (conversationId: string) => {
    if (!session?.user?.id) return
    
    try {
      const response = await fetch(`/api/chat-history?userId=${session.user.id}&conversationId=${conversationId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setConversations(prev => prev.filter(conv => conv.id !== conversationId))
        if (currentConversationId === conversationId) {
          startNewChat()
        }
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error)
    }
  }

  // Function to detect and extract code from AI responses
  const detectCodeInMessage = (content: string) => {
    // More comprehensive code block detection
    const htmlMatch = content.match(/```html\s*([\s\S]*?)\s*```/i)
    const cssMatch = content.match(/```css\s*([\s\S]*?)\s*```/i)
    const jsMatch = content.match(/```javascript\s*([\s\S]*?)\s*```/i) || content.match(/```js\s*([\s\S]*?)\s*```/i)
    
    // Also detect code blocks without language specification
    const genericCodeMatch = content.match(/```\s*([\s\S]*?)\s*```/i)
    
    // Check if there's any HTML-like content in the message
    const hasHtmlContent = content.includes('<html') || content.includes('<!DOCTYPE') || content.includes('<body') || content.includes('<div')
    
    if (htmlMatch || cssMatch || jsMatch || (genericCodeMatch && hasHtmlContent)) {
      let html = htmlMatch ? htmlMatch[1].trim() : ''
      let css = cssMatch ? cssMatch[1].trim() : ''
      let js = jsMatch ? jsMatch[1].trim() : ''
      
      // If we have a generic code block with HTML content, try to extract HTML
      if (genericCodeMatch && !html && hasHtmlContent) {
        const codeContent = genericCodeMatch[1].trim()
        // Try to extract HTML from the generic code block
        if (codeContent.includes('<html') || codeContent.includes('<!DOCTYPE') || codeContent.includes('<body')) {
          html = codeContent
        }
      }
      
      // If we have HTML but no CSS/JS, try to extract them from the HTML
      if (html && !css && !js) {
        const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
        const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
        
        if (styleMatch) {
          css = styleMatch[1].trim()
          html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        }
        
        if (scriptMatch) {
          js = scriptMatch[1].trim()
          html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        }
      }
      
      return {
        html: html,
        css: css,
        js: js,
        title: 'Live Preview'
      }
    }
    return null
  }

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-20"></div>
      <div className="fixed inset-0 bg-noise"></div>
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
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
      <div className="flex-shrink-0 px-8 py-6 border-b border-gray-800/50 glass-strong">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-neon">Beloop AI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
              title="Chat History"
            >
              <History className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewChat}
              className="p-2 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
              title="New Chat"
            >
              <Plus className="w-5 h-5" />
            </motion.button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-700/50">
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
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{session.user?.name}</p>
                <p className="text-xs text-gray-400">{session.user?.email}</p>
              </div>
              <Link 
                href="/api/auth/signout"
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                title="Sign Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Chat History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-gray-800/50 glass-strong overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Chat History</h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <motion.div
                        key={conversation.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => loadConversation(conversation.id)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                          currentConversationId === conversation.id
                            ? 'bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/30'
                            : 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">
                              {conversation.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {conversation.messageCount} messages
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(conversation.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteConversation(conversation.id)
                            }}
                            className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 ml-2"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-pink-400 to-purple-400' 
                          : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>

                                              {/* Message Content */}
                        <div className={`p-6 rounded-2xl relative group ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30'
                            : message.fallback
                            ? 'bg-orange-900/20 border border-orange-400/30'
                            : 'bg-gray-900/50 border border-gray-700/50'
                        }`}>
                                                  <div className="flex items-start justify-between">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap flex-1">{message.content}</p>
                            {message.fallback && (
                              <div className="ml-3 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-400/30">
                                Fallback
                              </div>
                            )}
                          </div>
                        
                        {/* Code Editor Button for AI messages with code */}
                        {message.role === 'assistant' && detectCodeInMessage(message.content) && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const codeData = detectCodeInMessage(message.content)
                              if (codeData) {
                                setCodeEditorData(codeData)
                                setShowCodeEditor(true)
                              }
                            }}
                            className="mt-3 flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-200"
                          >
                            <Code className="w-4 h-4" />
                            <span className="text-sm font-medium">Open Code Editor</span>
                          </motion.button>
                        )}
                        
                        <div className={`text-xs text-gray-500 mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        
                        {/* Copy Button */}
                        <button
                          onClick={() => copyMessage(message.content, message.id)}
                          className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                            copiedMessageId === message.id
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white'
                          }`}
                          title="Copy message"
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[90%] sm:max-w-[80%]">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                        <span className="text-sm text-gray-300">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Code Editor Overlay */}
          <AnimatePresence>
            {showCodeEditor && codeEditorData && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCodeEditor(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
                              <CodeEditor
                html={codeEditorData.html}
                css={codeEditorData.css}
                js={codeEditorData.js}
                title={codeEditorData.title}
                onClose={() => setShowCodeEditor(false)}
              />
              </>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="flex-shrink-0 px-8 py-6 border-t border-gray-800/50 glass-strong">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-5 pr-16 bg-gray-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm"
                  rows={1}
                  style={{ minHeight: '50px', maxHeight: '120px' }}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <ErrorBoundary>
      <ChatPageContent />
    </ErrorBoundary>
  )
}
