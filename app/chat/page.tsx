'use client'e

import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Bot, User, Clock, Copy, Check, Plus, Gamepad2, X, Star } from 'lucide-react'
import Link from 'next/link'

// Game Components
const NumberGuessGame = () => {
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [targetNumber] = useState(50) // Fixed for hydration

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

  return (
    <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-4">🎯 Number Guessing Game</h3>
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
          className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
        >
          Submit Guess
        </button>
        {message && <p className="text-center text-cyan-400">{message}</p>}
        <p className="text-sm text-gray-500">Attempts: {attempts}</p>
      </div>
    </div>
  )
}

const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Create pairs of numbers for memory game
    const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
    if (typeof window !== 'undefined') {
      // Shuffle only on client
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
      }
    }
    setCards(numbers)
  }, [])

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return
    
    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        setMatched(prev => [...prev, first, second])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  if (!isClient) return <div className="p-6 bg-gray-900/50 rounded-xl">Loading...</div>

  return (
    <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-4">🧠 Memory Game</h3>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-12 h-12 rounded-lg border-2 transition-all ${
              flipped.includes(index) || matched.includes(index)
                ? 'bg-cyan-500 border-cyan-400 text-white'
                : 'bg-gray-700 border-gray-600 text-transparent'
            }`}
          >
            {flipped.includes(index) || matched.includes(index) ? card : '?'}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-400">Matched: {matched.length / 2}/6</p>
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
      <h3 className="text-xl font-bold text-white mb-4">⭕ Tic Tac Toe</h3>
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
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
        <button
          onClick={resetGame}
          className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
        >
          Reset Game
        </button>
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

  return (
    <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-4">✂️ Rock Paper Scissors</h3>
      <div className="space-y-4">
        <div className="flex justify-center space-x-4">
          {choices.map(choice => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 capitalize"
            >
              {choice}
            </button>
          ))}
        </div>
        {playerChoice && (
          <div className="text-center space-y-2">
            <p className="text-gray-400">You chose: <span className="text-white capitalize">{playerChoice}</span></p>
            <p className="text-gray-400">Computer chose: <span className="text-white capitalize">{computerChoice}</span></p>
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
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [showGameLauncher, setShowGameLauncher] = useState(false)
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Simple authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setIsAuthenticated(true)
            // Set initial message
            setMessages([
              {
                id: '1',
                role: 'assistant',
                content: `Hello ${data.user.name || 'there'}! I'm your AI assistant. How can I help you today?`,
                timestamp: new Date()
              }
            ])
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue
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

  const handleCopy = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const startNewChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date()
      }
    ])
  }

  const games = [
    { key: 'number', name: 'Number Guessing', component: NumberGuessGame, emoji: '🎯' },
    { key: 'memory', name: 'Memory Game', component: MemoryGame, emoji: '🧠' },
    { key: 'tictactoe', name: 'Tic Tac Toe', component: TicTacToe, emoji: '⭕' },
    { key: 'rps', name: 'Rock Paper Scissors', component: RockPaperScissors, emoji: '✂️' }
  ]

  const GameModal = () => {
    if (!showGameLauncher) return null

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => (
                  <div
                    key={game.key}
                    className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => setActiveGame(game.key)}
                  >
                    <div className="text-4xl mb-4">{game.emoji}</div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Click to play!</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show loading while checking authentication
  if (isCheckingAuth) {
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
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-4">Please sign in to access the chat.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-700/50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-cyan-400">
              Beloop AI
            </Link>
            <button
              onClick={startNewChat}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowGameLauncher(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
            >
              <Gamepad2 className="w-4 h-4" />
              Games
            </button>
            <Link
              href="/account"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Account
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Messages */}
        <div className="space-y-6 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <button
                    onClick={() => handleCopy(message.content, message.id)}
                    className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span className="text-gray-400">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="sticky bottom-4">
          <div className="flex gap-4 p-4 bg-gray-900/50 rounded-2xl border border-gray-700/50">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Game Modal */}
      <GameModal />
    </div>
  )
}
