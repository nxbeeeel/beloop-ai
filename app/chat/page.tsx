'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Send, Loader2, Bot, User, Clock, Copy, Check, Plus, Gamepad2, X, Sparkles, Code, Brain, Zap, MessageSquare, Settings, Trash2, Download, Upload, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

// Game Components (imported from chat page)
const NumberGuessGame = () => {
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1)

  const handleGuess = () => {
    const numGuess = parseInt(guess)
    setAttempts(prev => prev + 1)
    
    if (numGuess === targetNumber) {
      setMessage(`🎉 Correct! You got it in ${attempts + 1} attempts!`)
    } else if (numGuess < targetNumber) {
      setMessage('📈 Too low! Try a higher number.')
    } else {
      setMessage('📉 Too high! Try a lower number.')
    }
    setGuess('')
  }

  const resetGame = () => {
    setGuess('')
    setMessage('')
    setAttempts(0)
  }

  return (
    <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">🎯 Number Guessing Game</h3>
        <button
          onClick={resetGame}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
        >
          Reset
        </button>
      </div>
      <p className="text-gray-400 mb-4">Guess the number between 1 and 100!</p>
      <div className="space-y-4">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
          placeholder="Enter your guess"
        />
        <button
          onClick={handleGuess}
          disabled={!guess}
          className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Guess
        </button>
        {message && <p className="text-center text-cyan-400">{message}</p>}
        <p className="text-sm text-gray-500">Attempts: {attempts}</p>
      </div>
    </div>
  )
}

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return
    
    const newBoard = board.slice()
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  const winner = calculateWinner(board)
  const status = winner ? `Winner: ${winner}` : board.every(square => square) ? 'Draw!' : `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">⭕ Tic Tac Toe</h3>
        <button
          onClick={resetGame}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
        >
          Reset
        </button>
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2 mb-4 max-w-48 mx-auto">
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="w-16 h-16 bg-gray-700 border border-gray-600 rounded-lg text-2xl font-bold text-white hover:bg-gray-600"
            >
              {square}
            </button>
          ))}
        </div>
        <p className="text-center text-cyan-400 mb-4">{status}</p>
      </div>
    </div>
  )
}

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState('')
  const [computerChoice, setComputerChoice] = useState('')
  const [result, setResult] = useState('')
  const [score, setScore] = useState({ player: 0, computer: 0 })

  const choices = ['rock', 'paper', 'scissors']
  const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' }

  const playGame = (choice: string) => {
    const computer = choices[Math.floor(Math.random() * 3)]
    setPlayerChoice(choice)
    setComputerChoice(computer)
    
    if (choice === computer) {
      setResult('Tie!')
    } else if (
      (choice === 'rock' && computer === 'scissors') ||
      (choice === 'paper' && computer === 'rock') ||
      (choice === 'scissors' && computer === 'paper')
    ) {
      setResult('You win!')
      setScore(prev => ({ ...prev, player: prev.player + 1 }))
    } else {
      setResult('Computer wins!')
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }))
    }
  }

  const resetGame = () => {
    setScore({ player: 0, computer: 0 })
    setPlayerChoice('')
    setComputerChoice('')
    setResult('')
  }

  return (
    <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">✂️ Rock Paper Scissors</h3>
        <button
          onClick={resetGame}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
        >
          Reset Score
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center space-x-4">
          {choices.map(choice => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 capitalize flex items-center gap-2"
            >
              <span>{emojis[choice as keyof typeof emojis]}</span>
              {choice}
            </button>
          ))}
        </div>
        {playerChoice && (
          <div className="text-center space-y-2">
            <p className="text-gray-400">
              You chose: <span className="text-white capitalize">{emojis[playerChoice as keyof typeof emojis]} {playerChoice}</span>
            </p>
            <p className="text-gray-400">
              Computer chose: <span className="text-white capitalize">{emojis[computerChoice as keyof typeof emojis]} {computerChoice}</span>
            </p>
            <p className="text-xl font-bold text-cyan-400">{result}</p>
          </div>
        )}
        <div className="text-center">
          <p className="text-sm text-gray-400">Score: You {score.player} - {score.computer} Computer</p>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const { data: session, status } = useSession()
  
  // Debug session info
  useEffect(() => {
    if (session) {
      console.log('Session data:', session)
    }
  }, [session])
  
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [showGameLauncher, setShowGameLauncher] = useState(false)
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      window.location.href = '/login'
    }
  }, [session, status])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      console.log('Sending chat request:', {
        message: inputValue,
        userId: session?.user?.email || session?.user?.id || 'anonymous'
      })
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          userId: session?.user?.email || session?.user?.id || 'anonymous'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Chat API Response:', data) // Debug log
        
        // Check if we have a valid response
        const responseText = data.response || data.message || 'Sorry, I couldn\'t process your request.'
        console.log('Response text:', responseText)
        
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseText,
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
      setIsTyping(false)
    }
  }, [inputValue, isLoading, session?.user?.id])

  const handleCopy = useCallback((text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }, [])

  const startNewChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date()
      }
    ])
  }, [])

  const games = useMemo(() => [
    { key: 'number', name: 'Number Guessing', component: NumberGuessGame, emoji: '🎯' },
    { key: 'tictactoe', name: 'Tic Tac Toe', component: TicTacToe, emoji: '⭕' },
    { key: 'rps', name: 'Rock Paper Scissors', component: RockPaperScissors, emoji: '✂️' }
  ], [])

  const GameModal = () => {
    if (!showGameLauncher) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
                Game Library
              </h2>
              <button
                onClick={() => setShowGameLauncher(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeGame ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {games.find(g => g.key === activeGame)?.emoji} {games.find(g => g.key === activeGame)?.name}
                  </h3>
                  <button
                    onClick={() => setActiveGame(null)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back to Games
                  </button>
                </div>
                <div className="max-w-md mx-auto">
                  {games.find(g => g.key === activeGame)?.component()}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {games.map((game) => (
                  <motion.div
                    key={game.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame(game.key)}
                    className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 cursor-pointer transition-all duration-300 hover:border-cyan-500/50"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{game.emoji}</div>
                      <h3 className="text-lg font-bold text-white mb-2">{game.name}</h3>
                      <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 inline-block text-sm">
                        Click to Play
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please log in to access chat</h1>
          <Link
            href="/login"
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                Beloop AI
              </Link>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Chat Assistant</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <Link
                href="/game"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Gamepad2 className="w-4 h-4" />
                Games
              </Link>
              
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Home
              </Link>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{session.user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 bg-gray-900/50 border-r border-gray-700/50 p-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Chat History</h3>
                  <button
                    onClick={startNewChat}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MessageSquare className="w-4 h-4" />
                      Current Chat
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {messages.length} messages
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700/50">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowGameLauncher(true)}
                      className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      Play Games
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Welcome to Beloop AI Chat</h2>
                  <p className="text-gray-400 mb-6">
                    I'm your AI assistant. Ask me anything about coding, technology, or general questions!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setInputValue("Can you help me with React development?")}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors text-left"
                    >
                      <Code className="w-5 h-5 text-cyan-400 mb-2" />
                      <h3 className="font-semibold text-white mb-1">React Help</h3>
                      <p className="text-sm text-gray-400">Get help with React development</p>
                    </button>
                    <button
                      onClick={() => setInputValue("What's the latest in AI technology?")}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors text-left"
                    >
                      <Brain className="w-5 h-5 text-pink-400 mb-2" />
                      <h3 className="font-semibold text-white mb-1">AI Technology</h3>
                      <p className="text-sm text-gray-400">Learn about latest AI trends</p>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-4 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-cyan-400 to-pink-400' 
                        : 'bg-gradient-to-r from-purple-400 to-blue-400'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-4 rounded-2xl max-w-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                          : 'bg-gray-800/50 border border-gray-700/50 text-gray-100'
                      }`}>
                        <div className="prose prose-invert max-w-none">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                      
                      {/* Message Actions */}
                      <div className={`flex items-center gap-2 mt-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => handleCopy(message.content, message.id)}
                            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                          >
                            {copiedMessageId === message.id ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start"
              >
                <div className="flex gap-4 max-w-4xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-gray-400 text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm p-4">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex items-end gap-4">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-4 pr-12 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    rows={1}
                    style={{ minHeight: '60px', maxHeight: '200px' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  
                  {/* Input Actions */}
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-2 rounded-lg transition-colors ${
                        isRecording 
                          ? 'bg-red-500 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg hover:from-cyan-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGameLauncher(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    Games
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      <GameModal />
    </div>
  )
}
