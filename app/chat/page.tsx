'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  User, 
  Brain,
  Loader2,
  Copy,
  Check,
  Plus,
  Settings,
  Download,
  Share2,
  Code,
  MessageSquare,
  Crown,
  ChevronDown,
  ChevronUp,
  Trash2,
  Star,
  Users,
  BarChart3,
  Search,
  Shield,
  Lock,
  Database,
  Sparkles,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  reactions?: { emoji: string; count: number }[]
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isPinned?: boolean
  tags?: string[]
  participants?: string[]
}

interface Agent {
  id: string
  name: string
  emoji: string
  description: string
  personality: string
  color: string
}

export default function ChatPage() {
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: '1',
    title: 'Personal AI Assistant',
    messages: [{
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your personal AI assistant. I can help you with anything - from writing and research to creative projects, problem-solving, learning new topics, planning, and much more. What would you like to explore today?',
      timestamp: new Date(),
      reactions: [{ emoji: '🤖', count: 3 }]
    }],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPinned: true,
    tags: ['personal', 'assistant', 'ai'],
    participants: ['You', 'AI Assistant']
  })
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedView, setSelectedView] = useState<'chats' | 'agents' | 'analytics'>('chats')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  
  const agents: Agent[] = [
    {
      id: 'writing',
      name: 'Writing Assistant',
      emoji: '✍️',
      description: 'Creative writing, essays, content',
      personality: 'I\'m your creative writing partner. I help with storytelling, content creation, and making your words flow beautifully.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'productivity',
      name: 'Productivity Coach',
      emoji: '🎯',
      description: 'Planning, goals, time management',
      personality: 'I\'m your productivity coach. I help you organize tasks, set goals, and maximize your efficiency.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'learning',
      name: 'Learning Tutor',
      emoji: '🧠',
      description: 'Education, skills, knowledge',
      personality: 'I\'m your learning tutor. I break down complex topics and help you master new skills effectively.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'creative',
      name: 'Creative Partner',
      emoji: '💡',
      description: 'Ideas, brainstorming, innovation',
      personality: 'I\'m your creative partner. I spark ideas, help with brainstorming, and push your creative boundaries.',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'research',
      name: 'Research Assistant',
      emoji: '🔍',
      description: 'Analysis, insights, information',
      personality: 'I\'m your research assistant. I help you find, analyze, and synthesize information effectively.',
      color: 'from-indigo-500 to-purple-600'
    }
  ]
  
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Creative Writing Project',
      messages: [],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 3600000),
      isPinned: true,
      tags: ['writing', 'creative', 'storytelling'],
      participants: ['You', 'AI Assistant']
    },
    {
      id: '2',
      title: 'Travel Planning',
      messages: [],
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 7200000),
      isPinned: false,
      tags: ['travel', 'planning', 'vacation'],
      participants: ['You', 'AI Assistant']
    },
    {
      id: '3',
      title: 'Learning New Skills',
      messages: [],
      createdAt: new Date(Date.now() - 259200000),
      updatedAt: new Date(Date.now() - 10800000),
      isPinned: false,
      tags: ['learning', 'skills', 'education'],
      participants: ['You', 'AI Assistant']
    }
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession.messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      updatedAt: new Date()
    }

    setCurrentSession(updatedSession)
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
          history: currentSession.messages.map(m => ({ role: m.role, content: m.content }))
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
        reactions: [{ emoji: '👍', count: 0 }]
      }

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, assistantMessage],
        updatedAt: new Date()
      }

      setCurrentSession(finalSession)
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure you have set up your Gemini API key in the environment variables.',
        timestamp: new Date()
      }
      
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorMessage],
        updatedAt: new Date()
      }

      setCurrentSession(finalSession)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(messageId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: selectedAgent ? `${selectedAgent.name} Chat` : 'New Conversation',
      messages: [{
        id: '1',
        role: 'assistant',
        content: selectedAgent ? selectedAgent.personality : 'Hello! I\'m your personal AI assistant. I can help you with anything - from writing and research to creative projects, problem-solving, learning new topics, planning, and much more. What would you like to explore today?',
        timestamp: new Date(),
        reactions: [{ emoji: selectedAgent ? selectedAgent.emoji : '🤖', count: 0 }]
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      tags: selectedAgent ? [selectedAgent.id] : ['new'],
      participants: ['You', selectedAgent ? selectedAgent.name : 'AI Assistant']
    }
    setCurrentSession(newSession)
    setChatHistory(prev => [newSession, ...prev])
  }

  const selectAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setSelectedView('chats')
    createNewChat()
  }

  const togglePinChat = (chatId: string) => {
    setChatHistory(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    ))
  }

  const deleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
    if (currentSession.id === chatId) {
      createNewChat()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const filteredChats = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const pinnedChats = filteredChats.filter(chat => chat.isPinned)
  const unpinnedChats = filteredChats.filter(chat => !chat.isPinned)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-mono">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-3"></div>
      <div className="fixed inset-0 bg-noise opacity-2"></div>
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(4)].map((_, i) => (
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

      <div className="flex relative z-10 h-screen">
                         {/* Professional Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 flex flex-col transition-all duration-300 relative z-20`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
                        <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center group-hover:animate-glow transition-all duration-300 border border-gray-600">
                  <Code className="w-5 h-5 text-gray-300" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-bold text-gray-200">Beloop AI</span>
                  </div>
                )}
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all duration-300"
              >
                {sidebarCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </motion.button>
            </div>
            
            {!sidebarCollapsed && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={createNewChat}
                className="w-full py-3 px-4 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg text-gray-200 font-semibold hover:from-gray-600/50 hover:to-gray-700/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">New Chat</span>
              </motion.button>
            )}
          </div>

                               {/* Search */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500/20 transition-all duration-300 text-sm"
                />
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-gray-800">
              <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
                {[
                  { id: 'chats', label: 'Chats', icon: MessageSquare },
                  { id: 'agents', label: 'Agents', icon: Users },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedView(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-300 ${
                      selectedView === tab.id
                        ? 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-gray-200 border border-gray-600'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <tab.icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {selectedView === 'chats' && (
              <div className="p-4 space-y-4">
                {/* Pinned Chats */}
                {pinnedChats.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-3 px-2">Pinned</div>
                    <div className="space-y-2">
                      {pinnedChats.map((chat) => (
                        <ChatItem
                          key={chat.id}
                          chat={chat}
                          isActive={currentSession.id === chat.id}
                          onSelect={() => setCurrentSession(chat)}
                          onPin={() => togglePinChat(chat.id)}
                          onDelete={() => deleteChat(chat.id)}
                          collapsed={sidebarCollapsed}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Chats */}
                {unpinnedChats.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-3 px-2">Recent</div>
                    <div className="space-y-2">
                      {unpinnedChats.map((chat) => (
                        <ChatItem
                          key={chat.id}
                          chat={chat}
                          isActive={currentSession.id === chat.id}
                          onSelect={() => setCurrentSession(chat)}
                          onPin={() => togglePinChat(chat.id)}
                          onDelete={() => deleteChat(chat.id)}
                          collapsed={sidebarCollapsed}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

                        {selectedView === 'agents' && (
              <div className="p-4 space-y-4">
                <div className="text-sm text-gray-400 font-medium mb-3 px-2">Available Assistants</div>
                <div className="space-y-3">
                  {agents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectAgent(agent)}
                      className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${agent.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {agent.emoji}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-white mb-1">{agent.name}</h4>
                          <p className="text-sm text-gray-400">{agent.description}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

                                     {selectedView === 'analytics' && (
              <div className="p-4 space-y-4">
                <div className="text-sm text-gray-400 font-medium mb-3 px-2">Analytics</div>
                <div className="space-y-3">
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Total Conversations</div>
                    <div className="text-3xl font-bold text-gray-200">{chatHistory.length}</div>
                  </div>
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Active Agents</div>
                    <div className="text-3xl font-bold text-gray-200">{agents.length}</div>
                  </div>
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Avg Response Time</div>
                    <div className="text-3xl font-bold text-gray-200">&lt;2s</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Enterprise Plan</span>
              {!sidebarCollapsed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Professional Chat Header */}
          <div className="p-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedAgent ? selectedAgent.color : 'from-gray-600 to-gray-800'} rounded-xl flex items-center justify-center`}>
                    {selectedAgent ? (
                      <span className="text-2xl">{selectedAgent.emoji}</span>
                    ) : (
                      <Brain className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white mb-1">{currentSession.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{currentSession.messages.length} messages</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{currentSession.participants?.length || 2} participants</span>
                      </div>
                      {currentSession.tags && (
                        <div className="flex items-center space-x-2">
                          {currentSession.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-800/50 rounded-full text-xs border border-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all duration-300"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {currentSession.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-6 max-w-5xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Professional Avatar */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800' 
                        : selectedAgent 
                          ? `bg-gradient-to-r ${selectedAgent.color}`
                          : 'bg-gradient-to-r from-gray-600 to-gray-800'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-6 h-6 text-white" />
                      ) : selectedAgent ? (
                        <span className="text-xl">{selectedAgent.emoji}</span>
                      ) : (
                        <Brain className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Professional Message Content */}
                    <div className={`flex-1 max-w-4xl ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`p-6 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gray-800/50 border border-gray-700'
                          : 'bg-gray-800/30 border border-gray-700'
                      }`}>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-white leading-relaxed whitespace-pre-wrap text-base">
                            {message.content}
                          </p>
                        </div>
                      </div>

                      {/* Professional Message Actions */}
                      <div className={`flex items-center space-x-4 mt-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-gray-200 transition-all duration-300 border border-gray-700"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                        
                        {/* Reactions */}
                        {message.reactions && (
                          <div className="flex items-center space-x-1">
                            {message.reactions.map((reaction, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="px-3 py-1 bg-gray-800/50 rounded-full text-xs hover:bg-gray-700/50 transition-all duration-300 border border-gray-700"
                              >
                                {reaction.emoji} {reaction.count}
                              </motion.button>
                            ))}
                          </div>
                        )}
                        
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Professional Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedAgent ? selectedAgent.color : 'from-gray-600 to-gray-800'} rounded-xl flex items-center justify-center`}>
                    {selectedAgent ? (
                      <span className="text-xl">{selectedAgent.emoji}</span>
                    ) : (
                      <Brain className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                      <span className="text-gray-400 text-base">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

                    {/* Professional Input Area */}
          <div className="p-6 border-t border-gray-800 bg-gray-900/95 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                                     <textarea
                     ref={inputRef}
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyPress={handleKeyPress}
                     placeholder={selectedAgent ? `Ask ${selectedAgent.name} anything...` : "Ask me anything - from creative writing to problem-solving, learning, planning, or just having a conversation..."}
                     className="w-full p-4 pr-24 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500/20 transition-all duration-300 text-sm"
                     rows={1}
                     style={{ minHeight: '50px', maxHeight: '150px' }}
                   />
                                     <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                     Enter to send, Shift+Enter for new line
                   </div>
                 </div>
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={handleSendMessage}
                   disabled={!inputValue.trim() || isLoading}
                   className={`p-4 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 ${
                     selectedAgent 
                       ? `bg-gradient-to-r ${selectedAgent.color} hover:shadow-${selectedAgent.color.split('-')[1]}-500/25`
                       : 'bg-gradient-to-r from-gray-600 to-gray-800 hover:shadow-gray-500/25'
                   }`}
                 >
                   <Send className="w-4 h-4" />
                 </motion.button>
              </div>
              
                             {/* Professional Features */}
               <div className="mt-4 flex items-center justify-between">
                 <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Enterprise Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>SOC 2 Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Futuristic Chat Item Component
function ChatItem({ 
  chat, 
  isActive, 
  onSelect, 
  onPin, 
  onDelete, 
  collapsed 
}: { 
  chat: ChatSession
  isActive: boolean
  onSelect: () => void
  onPin: () => void
  onDelete: () => void
  collapsed: boolean
}) {
  const [showActions, setShowActions] = useState(false)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  if (collapsed) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSelect}
        className={`w-8 h-8 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
          isActive
            ? 'bg-gradient-to-r from-gray-600/50 to-gray-700/50 border border-gray-500/30'
            : 'hover:bg-gray-800/50'
        }`}
      >
        <MessageSquare className="w-4 h-4 text-gray-400" />
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-gray-600/50 to-gray-700/50 border border-gray-500/30'
          : 'hover:bg-gray-800/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            {chat.isPinned && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
            <h4 className="text-sm font-medium text-white truncate">{chat.title}</h4>
          </div>
          <p className="text-xs text-slate-400">{formatDate(chat.updatedAt)}</p>
          {chat.tags && (
            <div className="flex items-center space-x-1 mt-1">
              {chat.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 bg-slate-800/50 rounded text-xs text-slate-300 border border-slate-600/50">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-1"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onPin(); }}
                className="p-1 rounded text-slate-400 hover:text-yellow-400 hover:bg-slate-600/50 transition-all duration-300"
              >
                <Star className="w-3 h-3" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-600/50 transition-all duration-300"
              >
                <Trash2 className="w-3 h-3" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
