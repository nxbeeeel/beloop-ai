'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react'
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
  X,
  Play,
  ArrowLeft,
  Trophy
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ErrorBoundary from '../components/ErrorBoundary'

// Performance optimization: Memoized components
const MemoizedMotionButton = memo(({ children, ...props }: any) => (
  <motion.button {...props}>
    {children}
  </motion.button>
))
MemoizedMotionButton.displayName = 'MemoizedMotionButton'

// Performance optimization: Lazy load game components
const lazyLoadGame = (importFunc: () => Promise<any>) => {
  const Component = React.lazy(importFunc)
  return (props: any) => (
    <React.Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    }>
      <Component {...props} />
    </React.Suspense>
  )
}

// Performance optimization: Debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Performance optimization: Virtual scrolling for large lists
const VirtualList = memo(({ items, itemHeight, renderItem }: {
  items: any[]
  itemHeight: number
  renderItem: (item: any, index: number) => React.ReactNode
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleItems = useMemo(() => {
    const containerHeight = containerRef.current?.clientHeight || 400
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight), items.length)
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index
    }))
  }, [items, scrollTop, itemHeight])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="overflow-auto"
      style={{ height: '400px' }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px`, position: 'relative' }}>
        {visibleItems.map(({ item, index }) => (
          <div key={index} style={{ position: 'absolute', top: index * itemHeight, height: itemHeight }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
})
VirtualList.displayName = 'VirtualList'

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

// Number Guessing Game
const NumberGuessGame = ({ onClose }: { onClose: () => void }) => {
  const [target, setTarget] = useState<number>(() => Math.floor(Math.random() * 100) + 1)
  const [attempts, setAttempts] = useState(0)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('Guess a number between 1 and 100')
  const [won, setWon] = useState(false)

  const newGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1)
    setAttempts(0)
    setInput('')
    setMessage('Guess a number between 1 and 100')
    setWon(false)
  }

  const guess = () => {
    if (won) return
    const n = parseInt(input)
    if (isNaN(n) || n < 1 || n > 100) {
      setMessage('Enter a valid number 1-100')
      return
    }
    const a = attempts + 1
    setAttempts(a)
    if (n === target) {
      setMessage(`🎉 Correct! You took ${a} attempts`)
      setWon(true)
    } else if (n < target) setMessage('📈 Too low! Try higher')
    else setMessage('📉 Too high! Try lower')
    setInput('')
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Number Guessing</h2>
      <p className="text-gray-300 mb-4">{message}</p>
      <div className="flex items-center space-x-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-28 text-center" placeholder="1-100" />
        <button onClick={guess} className="px-3 py-2 rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30">Guess</button>
        <button onClick={newGame} className="px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600">New Game</button>
        <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600">Close</button>
      </div>
      <div className="mt-3 text-sm text-gray-400">Attempts: {attempts}</div>
    </div>
  )
}

// Memory Game (4x4)
const MemoryGame = ({ onClose }: { onClose: () => void }) => {
  const base = ['🐶','🐱','🐭','🐰','🦊','🐼','🐻','🐹']
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<boolean[]>(Array(16).fill(false))
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    const arr = [...base, ...base]
    for (let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()* (i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] }
    setCards(arr)
  }, [])

  const reset = () => {
    const arr = [...base, ...base]
    for (let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()* (i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] }
    setCards(arr)
    setFlipped([])
    setMatched(Array(16).fill(false))
    setMoves(0)
  }

  const onFlip = (i: number) => {
    if (matched[i] || flipped.includes(i) || flipped.length === 2) return
    const nf = [...flipped, i]
    setFlipped(nf)
    if (nf.length === 2) {
      setMoves(m => m+1)
      setTimeout(() => {
        const [a,b] = nf
        if (cards[a] === cards[b]) {
          const nm = [...matched]
          nm[a] = nm[b] = true
          setMatched(nm)
        }
        setFlipped([])
      }, 600)
    }
  }

  const won = matched.every(Boolean)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Memory Game</h2>
          <p className="text-gray-400 text-sm">Match all pairs</p>
        </div>
        <div className="space-x-2">
          <span className="text-sm text-gray-300">Moves: {moves}</span>
          <button onClick={reset} className="px-3 py-1.5 text-sm rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30">Restart</button>
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600">Close</button>
        </div>
      </div>
      {won && <div className="mb-3 text-green-400">🎉 You won in {moves} moves!</div>}
      <div className="grid grid-cols-4 gap-3 max-w-[480px] mx-auto">
        {Array.from({length:16}).map((_,i) => {
          const show = flipped.includes(i) || matched[i]
          return (
            <button key={i} onClick={() => onFlip(i)}
              className={`aspect-square rounded-xl border border-gray-700 flex items-center justify-center text-3xl font-bold transition-all ${show ? 'bg-white text-black' : 'bg-gray-800 text-transparent'}`}
            >
              <span>{cards[i]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Rock Paper Scissors
const RockPaperScissorsGame = ({ onClose }: { onClose: () => void }) => {
  const options = [
    { key: 'rock', label: 'Rock ✊' },
    { key: 'paper', label: 'Paper ✋' },
    { key: 'scissors', label: 'Scissors ✌️' }
  ] as const
  type Opt = typeof options[number]['key']
  const [player, setPlayer] = useState<Opt | null>(null)
  const [computer, setComputer] = useState<Opt | null>(null)
  const [result, setResult] = useState('Make your move!')
  const [score, setScore] = useState({ you: 0, ai: 0, draw: 0 })

  const play = (choice: Opt) => {
    const ai = options[Math.floor(Math.random() * options.length)].key
    setPlayer(choice)
    setComputer(ai)
    const outcomes: Record<Opt, Opt> = { rock: 'scissors', paper: 'rock', scissors: 'paper' }
    if (choice === ai) { setResult('Draw!'); setScore(s => ({ ...s, draw: s.draw + 1 })) }
    else if (outcomes[choice] === ai) { setResult('You win! 🎉'); setScore(s => ({ ...s, you: s.you + 1 })) }
    else { setResult('Computer wins! 🤖'); setScore(s => ({ ...s, ai: s.ai + 1 })) }
  }

  const reset = () => { setPlayer(null); setComputer(null); setResult('Make your move!') }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Rock • Paper • Scissors</h2>
      <div className="text-gray-300 mb-4">{result}</div>
      <div className="flex items-center space-x-2 mb-3">
        {options.map(o => (
          <button key={o.key} onClick={() => play(o.key as Opt)}
            className="px-3 py-2 rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30">
            {o.label}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600">Reset</button>
        <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600">Close</button>
      </div>
      <div className="text-sm text-gray-400">You: {score.you} • AI: {score.ai} • Draw: {score.draw}</div>
      <div className="mt-3 text-sm text-gray-400">You chose: {player ?? '-'} • Computer: {computer ?? '-'}</div>
    </div>
  )
}

// Snake Game
const SnakeGame = ({ onClose }: { onClose: () => void }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState('right')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [speed, setSpeed] = useState(150)

  const boardSize = 20
  const cellSize = 15

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize)
    }
  }

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection('right')
    setGameOver(false)
    setScore(0)
    setGameStarted(false)
  }

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case 'up': head.y = (head.y - 1 + boardSize) % boardSize; break
        case 'down': head.y = (head.y + 1) % boardSize; break
        case 'left': head.x = (head.x - 1 + boardSize) % boardSize; break
        case 'right': head.x = (head.x + 1) % boardSize; break
      }

      // Check collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.unshift(head)

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        setFood(generateFood())
        setSpeed(prev => Math.max(50, prev - 2)) // Increase speed
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, gameOver, gameStarted, food])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true)
        return
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'down') setDirection('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'up') setDirection('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'right') setDirection('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'left') setDirection('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameStarted])

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(moveSnake, speed)
      return () => clearInterval(interval)
    }
  }, [moveSnake, gameStarted, gameOver, speed])

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">🐍 Snake Game</h2>
      
      <div className="mb-4">
        <div className="text-lg font-bold text-cyan-400">Score: {score}</div>
        <div className="text-sm text-gray-400">Speed: {Math.round(1000/speed)} FPS</div>
      </div>

      <div className="relative inline-block">
        <div 
          className="border-2 border-gray-600 bg-gray-900"
          style={{ 
            width: boardSize * cellSize, 
            height: boardSize * cellSize 
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? 'bg-green-400' : 'bg-green-600'}`}
              style={{
                width: cellSize - 1,
                height: cellSize - 1,
                left: segment.x * cellSize,
                top: segment.y * cellSize,
                borderRadius: index === 0 ? '4px' : '2px'
              }}
            />
          ))}
          
          {/* Food */}
          <div
            className="absolute bg-red-500 rounded-full"
            style={{
              width: cellSize - 1,
              height: cellSize - 1,
              left: food.x * cellSize,
              top: food.y * cellSize
            }}
          />
        </div>
      </div>

      {!gameStarted && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <div className="text-lg font-semibold text-cyan-400 mb-2">How to Play</div>
          <div className="text-sm text-gray-300 space-y-1">
            <div>• Use Arrow Keys or WASD to move</div>
            <div>• Eat red food to grow and score points</div>
            <div>• Don't hit yourself!</div>
            <div>• Press any key to start</div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
          <div className="text-lg font-semibold text-red-400 mb-2">Game Over!</div>
          <div className="text-sm text-gray-300">Final Score: {score}</div>
        </div>
      )}

      <div className="mt-4 flex justify-center space-x-2">
        <button 
          onClick={resetGame}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          {gameOver ? 'Play Again' : 'Reset'}
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// Tetris Game
const TetrisGame = ({ onClose }: { onClose: () => void }) => {
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState(generatePiece())
  const [position, setPosition] = useState({ x: 3, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [speed, setSpeed] = useState(1000)

  const BOARD_WIDTH = 10
  const BOARD_HEIGHT = 20

  function createEmptyBoard() {
    return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  }

  function generatePiece() {
    const pieces = [
      // I piece
      [[1, 1, 1, 1]],
      // O piece
      [[1, 1], [1, 1]],
      // T piece
      [[0, 1, 0], [1, 1, 1]],
      // S piece
      [[0, 1, 1], [1, 1, 0]],
      // Z piece
      [[1, 1, 0], [0, 1, 1]],
      // J piece
      [[1, 0, 0], [1, 1, 1]],
      // L piece
      [[0, 0, 1], [1, 1, 1]]
    ]
    return pieces[Math.floor(Math.random() * pieces.length)]
  }

  function rotatePiece(piece: number[][]) {
    const rows = piece.length
    const cols = piece[0].length
    const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0))
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotated[j][rows - 1 - i] = piece[i][j]
      }
    }
    return rotated
  }

  function isValidMove(piece: number[][], x: number, y: number, board: number[][]) {
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[0].length; col++) {
        if (piece[row][col]) {
          const newX = x + col
          const newY = y + row
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false
          if (newY >= 0 && board[newY][newX]) return false
        }
      }
    }
    return true
  }

  function placePiece() {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row])
      
      for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[0].length; col++) {
          if (currentPiece[row][col]) {
            const boardY = position.y + row
            const boardX = position.x + col
            if (boardY >= 0) {
              newBoard[boardY][boardX] = 1
            }
          }
        }
      }
      
      return newBoard
    })
    
    setCurrentPiece(generatePiece())
    setPosition({ x: 3, y: 0 })
    setRotation(0)
  }

  function clearLines() {
    setBoard(prevBoard => {
      const newBoard = prevBoard.filter(row => !row.every(cell => cell === 1))
      const linesCleared = BOARD_HEIGHT - newBoard.length
      
      if (linesCleared > 0) {
        setLines(prev => prev + linesCleared)
        setScore(prev => prev + linesCleared * 100 * level)
        
        // Add new empty rows at top
        while (newBoard.length < BOARD_HEIGHT) {
          newBoard.unshift(Array(BOARD_WIDTH).fill(0))
        }
        
        // Level up every 10 lines
        const newLevel = Math.floor((lines + linesCleared) / 10) + 1
        if (newLevel > level) {
          setLevel(newLevel)
          setSpeed(prev => Math.max(100, prev - 50))
        }
      }
      
      return newBoard
    })
  }

  function moveDown() {
    if (gameOver || !gameStarted) return
    
    const newY = position.y + 1
    if (isValidMove(currentPiece, position.x, newY, board)) {
      setPosition(prev => ({ ...prev, y: newY }))
    } else {
      placePiece()
      clearLines()
      
      // Check for game over
      if (!isValidMove(generatePiece(), 3, 0, board)) {
        setGameOver(true)
      }
    }
  }

  function moveLeft() {
    if (gameOver || !gameStarted) return
    const newX = position.x - 1
    if (isValidMove(currentPiece, newX, position.y, board)) {
      setPosition(prev => ({ ...prev, x: newX }))
    }
  }

  function moveRight() {
    if (gameOver || !gameStarted) return
    const newX = position.x + 1
    if (isValidMove(currentPiece, newX, position.y, board)) {
      setPosition(prev => ({ ...prev, x: newX }))
    }
  }

  function rotate() {
    if (gameOver || !gameStarted) return
    const rotatedPiece = rotatePiece(currentPiece)
    if (isValidMove(rotatedPiece, position.x, position.y, board)) {
      setCurrentPiece(rotatedPiece)
      setRotation(prev => (prev + 1) % 4)
    }
  }

  function resetGame() {
    setBoard(createEmptyBoard())
    setCurrentPiece(generatePiece())
    setPosition({ x: 3, y: 0 })
    setRotation(0)
    setScore(0)
    setLevel(1)
    setLines(0)
    setGameOver(false)
    setGameStarted(false)
    setSpeed(1000)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true)
        return
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveLeft()
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveRight()
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          moveDown()
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
          rotate()
          break
        case ' ':
          e.preventDefault()
          while (isValidMove(currentPiece, position.x, position.y + 1, board)) {
            setPosition(prev => ({ ...prev, y: prev.y + 1 }))
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPiece, position, board, gameStarted, gameOver])

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(moveDown, speed)
      return () => clearInterval(interval)
    }
  }, [gameStarted, gameOver, speed])

  const cellSize = 20

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">🧩 Tetris</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-left">
          <div className="text-lg font-bold text-cyan-400">Score: {score}</div>
          <div className="text-sm text-gray-400">Level: {level}</div>
          <div className="text-sm text-gray-400">Lines: {lines}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Speed: {Math.round(1000/speed)} FPS</div>
        </div>
      </div>

      <div className="flex justify-center space-x-6">
        {/* Game Board */}
        <div className="relative">
          <div 
            className="border-2 border-gray-600 bg-gray-900"
            style={{ 
              width: BOARD_WIDTH * cellSize, 
              height: BOARD_HEIGHT * cellSize 
            }}
          >
            {/* Placed pieces */}
            {board.map((row, rowIndex) => 
              row.map((cell, colIndex) => 
                cell ? (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="absolute bg-cyan-500"
                    style={{
                      width: cellSize - 1,
                      height: cellSize - 1,
                      left: colIndex * cellSize,
                      top: rowIndex * cellSize
                    }}
                  />
                ) : null
              )
            )}
            
            {/* Current piece */}
            {currentPiece.map((row, rowIndex) => 
              row.map((cell, colIndex) => 
                cell ? (
                  <div
                    key={`current-${rowIndex}-${colIndex}`}
                    className="absolute bg-pink-500"
                    style={{
                      width: cellSize - 1,
                      height: cellSize - 1,
                      left: (position.x + colIndex) * cellSize,
                      top: (position.y + rowIndex) * cellSize
                    }}
                  />
                ) : null
              )
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="text-left">
          <div className="text-sm font-semibold text-cyan-400 mb-2">Controls</div>
          <div className="text-xs text-gray-300 space-y-1">
            <div>← → Move</div>
            <div>↓ Drop</div>
            <div>↑ Rotate</div>
            <div>Space: Hard Drop</div>
          </div>
        </div>
      </div>

      {!gameStarted && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <div className="text-lg font-semibold text-cyan-400 mb-2">How to Play</div>
          <div className="text-sm text-gray-300 space-y-1">
            <div>• Arrange falling blocks to clear lines</div>
            <div>• Complete lines to score points</div>
            <div>• Game speeds up as you level up</div>
            <div>• Press any key to start</div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
          <div className="text-lg font-semibold text-red-400 mb-2">Game Over!</div>
          <div className="text-sm text-gray-300">Final Score: {score}</div>
        </div>
      )}

      <div className="mt-4 flex justify-center space-x-2">
        <button 
          onClick={resetGame}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          {gameOver ? 'Play Again' : 'Reset'}
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// Pong Game Component
const PongGame = ({ onClose }: { onClose: () => void }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused'>('menu')
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [gameSpeed, setGameSpeed] = useState(5)

  const startGame = () => {
    setGameState('playing')
    setScore({ player: 0, computer: 0 })
  }

  const pauseGame = () => {
    setGameState('paused')
  }

  const resumeGame = () => {
    setGameState('playing')
  }

  const resetGame = () => {
    setGameState('menu')
    setScore({ player: 0, computer: 0 })
  }

  return (
    <GameModal title="🏓 Pong - Classic Tennis" onClose={onClose}>
      <div className="flex flex-col items-center justify-center h-full p-6">
        {gameState === 'menu' && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🏓</div>
            <h2 className="text-3xl font-bold text-white mb-4">Pong</h2>
            <p className="text-gray-300 mb-8">Classic tennis game. Use arrow keys to move your paddle!</p>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Game
              </motion.button>
              <div className="text-sm text-gray-400">
                <p>Player Score: {score.player} | Computer Score: {score.computer}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">🏓</div>
            <div className="text-2xl font-bold text-white mb-4">
              {score.player} - {score.computer}
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-cyan-400">
              <div className="text-white text-lg mb-4">Game in Progress...</div>
              <div className="text-gray-400 text-sm">
                Use ↑↓ keys to move paddle<br />
                First to 11 points wins!
              </div>
            </div>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseGame}
                className="btn-secondary px-6 py-2"
              >
                Pause
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="btn-secondary px-6 py-2"
              >
                Reset
              </motion.button>
            </div>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">⏸️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Paused</h2>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resumeGame}
                className="btn-primary px-6 py-2"
              >
                Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="btn-secondary px-6 py-2"
              >
                Reset
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </GameModal>
  )
}

// Breakout Game Component
const BreakoutGame = ({ onClose }: { onClose: () => void }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused'>('menu')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setLevel(1)
  }

  const pauseGame = () => {
    setGameState('paused')
  }

  const resumeGame = () => {
    setGameState('playing')
  }

  const resetGame = () => {
    setGameState('menu')
    setScore(0)
    setLevel(1)
  }

  return (
    <GameModal title="🧱 Breakout - Break the Blocks" onClose={onClose}>
      <div className="flex flex-col items-center justify-center h-full p-6">
        {gameState === 'menu' && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🧱</div>
            <h2 className="text-3xl font-bold text-white mb-4">Breakout</h2>
            <p className="text-gray-300 mb-8">Break all the blocks with your paddle and ball!</p>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Game
              </motion.button>
              <div className="text-sm text-gray-400">
                <p>High Score: {score}</p>
                <p>Level: {level}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">🧱</div>
            <div className="text-2xl font-bold text-white mb-4">
              Score: {score} | Level: {level}
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-cyan-400">
              <div className="text-white text-lg mb-4">Game in Progress...</div>
              <div className="text-gray-400 text-sm">
                Use ←→ keys to move paddle<br />
                Don't let the ball fall!
              </div>
            </div>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseGame}
                className="btn-secondary px-6 py-2"
              >
                Pause
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="btn-secondary px-6 py-2"
              >
                Reset
              </motion.button>
            </div>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">⏸️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Paused</h2>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resumeGame}
                className="btn-primary px-6 py-2"
              >
                Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="btn-secondary px-6 py-2"
              >
                Reset
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </GameModal>
  )
}

// Flappy Bird Game Component
const FlappyBirdGame = ({ onClose }: { onClose: () => void }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const startGame = () => {
    setGameState('playing')
    setScore(0)
  }

  const gameOver = () => {
    setGameState('gameOver')
    if (score > highScore) {
      setHighScore(score)
    }
  }

  const resetGame = () => {
    setGameState('menu')
    setScore(0)
  }

  return (
    <GameModal title="🐦 Flappy Bird - Navigate Obstacles" onClose={onClose}>
      <div className="flex flex-col items-center justify-center h-full p-6">
        {gameState === 'menu' && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🐦</div>
            <h2 className="text-3xl font-bold text-white mb-4">Flappy Bird</h2>
            <p className="text-gray-300 mb-8">Navigate through pipes by clicking or pressing space!</p>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Game
              </motion.button>
              <div className="text-sm text-gray-400">
                <p>High Score: {highScore}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">🐦</div>
            <div className="text-2xl font-bold text-white mb-4">
              Score: {score}
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-cyan-400">
              <div className="text-white text-lg mb-4">Game in Progress...</div>
              <div className="text-gray-400 text-sm">
                Click or press SPACE to flap<br />
                Avoid the pipes!
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="btn-secondary px-6 py-2"
            >
              Reset
            </motion.button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">💀</div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <div className="text-lg text-gray-300 mb-4">
              <p>Final Score: {score}</p>
              <p>High Score: {highScore}</p>
            </div>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-primary px-6 py-2"
              >
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="btn-secondary px-6 py-2"
              >
                Menu
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </GameModal>
  )
}

// 2048 Game Component
const Game2048 = ({ onClose }: { onClose: () => void }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const startGame = () => {
    setGameState('playing')
    setScore(0)
  }

  const gameOver = () => {
    setGameState('gameOver')
    if (score > highScore) {
      setHighScore(score)
    }
  }

  const resetGame = () => {
    setGameState('menu')
    setScore(0)
  }

  return (
    <GameModal title="🔢 2048 - Merge Numbers" onClose={onClose}>
      <div className="flex flex-col items-center justify-center h-full p-6">
        {gameState === 'menu' && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🔢</div>
            <h2 className="text-3xl font-bold text-white mb-4">2048</h2>
            <p className="text-gray-300 mb-8">Merge tiles to reach 2048! Use arrow keys to move.</p>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Game
              </motion.button>
              <div className="text-sm text-gray-400">
                <p>High Score: {highScore}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">🔢</div>
            <div className="text-2xl font-bold text-white mb-4">
              Score: {score}
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-cyan-400">
              <div className="text-white text-lg mb-4">Game in Progress...</div>
              <div className="text-gray-400 text-sm">
                Use arrow keys to move tiles<br />
                Merge same numbers to reach 2048!
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="btn-secondary px-6 py-2"
            >
              Reset
            </motion.button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center space-y-6">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <div className="text-lg text-gray-300 mb-4">
              <p>Final Score: {score}</p>
              <p>High Score: {highScore}</p>
            </div>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-primary px-6 py-2"
              >
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="btn-secondary px-6 py-2"
              >
                Menu
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </GameModal>
  )
}

// Hangman Game
const HangmanGame = ({ onClose }: { onClose: () => void }) => {
  const words = ['JAVASCRIPT', 'REACT', 'PYTHON', 'TYPESCRIPT', 'NEXTJS', 'TAILWIND', 'FRAMER', 'MOTION', 'GAMING', 'DEVELOPER']
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  const maxWrongGuesses = 6
  const displayWord = word.split('').map(letter => 
    guessedLetters.has(letter) ? letter : '_'
  ).join(' ')

  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.has(letter)) return

    const newGuessedLetters = new Set(guessedLetters)
    newGuessedLetters.add(letter)
    setGuessedLetters(newGuessedLetters)

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1)
    }

    // Check win condition
    const isWon = word.split('').every(letter => newGuessedLetters.has(letter))
    if (isWon) {
      setWon(true)
      setGameOver(true)
    }

    // Check lose condition
    if (wrongGuesses + 1 >= maxWrongGuesses) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)])
    setGuessedLetters(new Set())
    setWrongGuesses(0)
    setGameOver(false)
    setWon(false)
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🪢 Hangman</h2>
        <div className="text-6xl font-mono text-cyan-400 mb-4 tracking-wider">{displayWord}</div>
        <div className="text-lg text-gray-300 mb-4">
          Wrong guesses: {wrongGuesses}/{maxWrongGuesses}
        </div>
        
        {/* Hangman drawing */}
        <div className="w-32 h-32 mx-auto mb-6 border-2 border-gray-600 rounded-lg flex items-center justify-center">
          <div className="text-4xl text-red-400">
            {wrongGuesses >= 1 && '😵'}
            {wrongGuesses === 0 && '😊'}
          </div>
        </div>
      </div>

      {gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            {won ? '🎉 You Won!' : '💀 Game Over!'}
          </div>
          <div className="text-lg text-gray-300 mb-6">
            The word was: <span className="text-cyan-400 font-bold">{word}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2 max-w-md">
          {alphabet.map(letter => (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.has(letter)}
              className={`w-10 h-10 rounded-lg font-bold text-lg transition-all duration-200 ${
                guessedLetters.has(letter)
                  ? word.includes(letter)
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-700 text-white hover:bg-cyan-500'
              }`}
            >
              {letter}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

// Math Quiz Game
const MathQuizGame = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)

  const generateQuestion = () => {
    const operations = ['+', '-', '*']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    let num1, num2, result

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        result = num1 + num2
        break
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25
        num2 = Math.floor(Math.random() * num1) + 1
        result = num1 - num2
        break
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        result = num1 * num2
        break
      default:
        num1 = num2 = result = 0
    }

    setQuestion(`${num1} ${operation} ${num2} = ?`)
    setAnswer(result.toString())
    setUserAnswer('')
    setFeedback('')
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [timeLeft, gameOver])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userAnswer === answer) {
      setScore(score + 10)
      setFeedback('✅ Correct! +10 points')
    } else {
      setFeedback(`❌ Wrong! The answer was ${answer}`)
    }
    setTimeout(() => {
      generateQuestion()
    }, 1000)
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    generateQuestion()
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🧮 Math Quiz</h2>
        <div className="text-lg text-gray-300 mb-4">
          Score: <span className="text-cyan-400 font-bold">{score}</span> | 
          Time: <span className="text-yellow-400 font-bold">{timeLeft}s</span>
        </div>
      </div>

      {gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🎯 Game Over!</div>
          <div className="text-lg text-gray-300 mb-6">
            Final Score: <span className="text-cyan-400 font-bold">{score}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-white mb-4">{question}</div>
            <div className="text-lg text-gray-300">{feedback}</div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 text-center text-2xl font-bold bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              placeholder="Enter answer..."
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
            >
              Submit Answer
            </motion.button>
          </form>
        </div>
      )}
    </div>
  )
}

// Whack-a-Mole Game
const WhackAMoleGame = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [activeMole, setActiveMole] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setActiveMole(null)
    
    const gameTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(gameTimer)
          setGameOver(true)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const moleTimer = setInterval(() => {
      if (!gameOver) {
        setActiveMole(Math.floor(Math.random() * 9))
        setTimeout(() => setActiveMole(null), 1000)
      } else {
        clearInterval(moleTimer)
      }
    }, 1500)
  }

  const whackMole = (index: number) => {
    if (activeMole === index && isPlaying) {
      setScore(score + 10)
      setActiveMole(null)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🔨 Whack-a-Mole</h2>
        <div className="text-lg text-gray-300 mb-4">
          Score: <span className="text-cyan-400 font-bold">{score}</span> | 
          Time: <span className="text-yellow-400 font-bold">{timeLeft}s</span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Click the moles as fast as you can!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Game
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🎯 Game Over!</div>
          <div className="text-lg text-gray-300 mb-6">
            Final Score: <span className="text-cyan-400 font-bold">{score}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {[...Array(9)].map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => whackMole(index)}
              className={`w-20 h-20 rounded-xl border-2 transition-all duration-200 ${
                activeMole === index
                  ? 'bg-yellow-500 border-yellow-400 shadow-lg shadow-yellow-400/50'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
              }`}
            >
              {activeMole === index ? '🦫' : ''}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

// Circuit Racing Game
const RacingGame = ({ onClose }: { onClose: () => void }) => {
  const [playerPosition, setPlayerPosition] = useState(50)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [obstacles, setObstacles] = useState<Array<{id: number, x: number, y: number}>>([])
  const [speed, setSpeed] = useState(2)

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setGameOver(false)
    setPlayerPosition(50)
    setObstacles([])
    setSpeed(2)
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameLoop = setInterval(() => {
      setScore(prev => prev + 1)
      
      // Move obstacles
      setObstacles(prev => 
        prev.map(obs => ({ ...obs, y: obs.y + speed }))
          .filter(obs => obs.y < 100)
      )

      // Generate new obstacles
      if (Math.random() < 0.1) {
        setObstacles(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: -10
        }])
      }

      // Check collisions
      obstacles.forEach(obs => {
        if (obs.y > 70 && obs.y < 90 && Math.abs(obs.x - playerPosition) < 10) {
          setGameOver(true)
          setIsPlaying(false)
        }
      })

      // Increase speed
      if (score % 100 === 0) {
        setSpeed(prev => prev + 0.5)
      }
    }, 50)

    return () => clearInterval(gameLoop)
  }, [isPlaying, gameOver, obstacles, playerPosition, score, speed])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isPlaying) return
    
    if (e.key === 'ArrowLeft' && playerPosition > 10) {
      setPlayerPosition(prev => prev - 5)
    }
    if (e.key === 'ArrowRight' && playerPosition < 90) {
      setPlayerPosition(prev => prev + 5)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🏎️ Circuit Racing</h2>
        <div className="text-lg text-gray-300 mb-4">
          Score: <span className="text-cyan-400 font-bold">{score}</span> | 
          Speed: <span className="text-yellow-400 font-bold">{speed.toFixed(1)}x</span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Use ← → arrow keys to dodge obstacles!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Race
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">💥 Crash!</div>
          <div className="text-lg text-gray-300 mb-6">
            Final Score: <span className="text-cyan-400 font-bold">{score}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Race Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-md h-64 bg-gray-800 rounded-xl border-2 border-gray-600 overflow-hidden">
          {/* Road */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900">
            {/* Road lines */}
            <div className="absolute left-1/2 top-0 w-1 h-full bg-yellow-400 transform -translate-x-1/2"></div>
          </div>
          
          {/* Player car */}
          <div 
            className="absolute bottom-4 w-8 h-12 bg-red-500 rounded-lg transform -translate-x-1/2"
            style={{ left: `${playerPosition}%` }}
          >
            <div className="w-full h-2 bg-red-600 rounded-t-lg"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-1 left-1"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-1 right-1"></div>
          </div>

          {/* Obstacles */}
          {obstacles.map(obs => (
            <div
              key={obs.id}
              className="absolute w-6 h-8 bg-blue-500 rounded-lg transform -translate-x-1/2"
              style={{ left: `${obs.x}%`, top: `${obs.y}%` }}
            >
              <div className="w-full h-1 bg-blue-600 rounded-t-lg"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Drag Racing Game
const DragRacingGame = ({ onClose }: { onClose: () => void }) => {
  const [playerSpeed, setPlayerSpeed] = useState(0)
  const [playerDistance, setPlayerDistance] = useState(0)
  const [opponentSpeed, setOpponentSpeed] = useState(0)
  const [opponentDistance, setOpponentDistance] = useState(0)
  const [gameState, setGameState] = useState<'waiting' | 'countdown' | 'racing' | 'finished'>('waiting')
  const [countdown, setCountdown] = useState(3)
  const [winner, setWinner] = useState<'player' | 'opponent' | null>(null)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)

  const startRace = () => {
    setGameState('countdown')
    setCountdown(3)
    setPlayerSpeed(0)
    setPlayerDistance(0)
    setOpponentSpeed(0)
    setOpponentDistance(0)
    setWinner(null)
    setReactionTime(null)
    setStartTime(null)
  }

  useEffect(() => {
    if (gameState === 'countdown') {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1)
        } else {
          setGameState('racing')
          setStartTime(Date.now())
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, gameState])

  useEffect(() => {
    if (gameState === 'racing') {
      const raceInterval = setInterval(() => {
        // Player acceleration
        if (playerSpeed < 200) {
          setPlayerSpeed(prev => prev + 5)
        }
        setPlayerDistance(prev => prev + playerSpeed / 100)

        // Opponent AI
        if (opponentSpeed < 180) {
          setOpponentSpeed(prev => prev + 4)
        }
        setOpponentDistance(prev => prev + opponentSpeed / 100)

        // Check finish line (quarter mile = 400 units)
        if (playerDistance >= 400 || opponentDistance >= 400) {
          setGameState('finished')
          if (playerDistance >= 400 && opponentDistance < 400) {
            setWinner('player')
          } else if (opponentDistance >= 400 && playerDistance < 400) {
            setWinner('opponent')
          } else {
            setWinner('player') // Tie goes to player
          }
        }
      }, 50)

      return () => clearInterval(raceInterval)
    }
  }, [gameState, playerSpeed, playerDistance, opponentSpeed, opponentDistance])

  const handleStart = () => {
    if (gameState === 'racing' && !reactionTime) {
      setReactionTime(Date.now() - (startTime || 0))
    }
  }

  useEffect(() => {
    if (gameState === 'racing') {
      window.addEventListener('keydown', handleStart)
      return () => window.removeEventListener('keydown', handleStart)
    }
  }, [gameState, reactionTime, startTime])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🏁 Drag Racing</h2>
        <div className="text-lg text-gray-300 mb-4">
          Press any key when lights turn green!
        </div>
      </div>

      {gameState === 'waiting' ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Quarter mile sprint - fastest reaction wins!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRace}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Race
          </motion.button>
        </div>
      ) : gameState === 'countdown' ? (
        <div className="text-center">
          <div className="text-6xl font-bold text-yellow-400 mb-4">{countdown}</div>
          <div className="text-lg text-gray-300">Get ready...</div>
        </div>
      ) : gameState === 'racing' ? (
        <div className="w-full max-w-md">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-green-400 mb-2">GO!</div>
            {reactionTime && (
              <div className="text-lg text-gray-300">
                Reaction: <span className="text-cyan-400">{(reactionTime / 1000).toFixed(3)}s</span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {/* Player lane */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold">You</span>
                <span className="text-cyan-400">{playerSpeed.toFixed(0)} mph</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-100"
                  style={{ width: `${(playerDistance / 400) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-400 mt-1">
                {playerDistance.toFixed(0)} / 400m
              </div>
            </div>

            {/* Opponent lane */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold">Opponent</span>
                <span className="text-cyan-400">{opponentSpeed.toFixed(0)} mph</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full transition-all duration-100"
                  style={{ width: `${(opponentDistance / 400) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-400 mt-1">
                {opponentDistance.toFixed(0)} / 400m
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            {winner === 'player' ? '🏆 You Won!' : '💥 You Lost!'}
          </div>
          <div className="text-lg text-gray-300 mb-6">
            {reactionTime && (
              <div>Reaction Time: <span className="text-cyan-400">{(reactionTime / 1000).toFixed(3)}s</span></div>
            )}
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRace}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Race Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}

// Off-Road Racing Game
const OffRoadRacingGame = ({ onClose }: { onClose: () => void }) => {
  const [playerPosition, setPlayerPosition] = useState(50)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [obstacles, setObstacles] = useState<Array<{id: number, x: number, y: number, type: 'rock' | 'mud' | 'water'}>>([])
  const [speed, setSpeed] = useState(1.5)

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setGameOver(false)
    setPlayerPosition(50)
    setObstacles([])
    setSpeed(1.5)
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameLoop = setInterval(() => {
      setScore(prev => prev + 1)
      
      // Move obstacles
      setObstacles(prev => 
        prev.map(obs => ({ ...obs, y: obs.y + speed }))
          .filter(obs => obs.y < 100)
      )

      // Generate new obstacles
      if (Math.random() < 0.15) {
        const types: Array<'rock' | 'mud' | 'water'> = ['rock', 'mud', 'water']
        const type = types[Math.floor(Math.random() * types.length)]
        setObstacles(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: -10,
          type
        }])
      }

      // Check collisions
      obstacles.forEach(obs => {
        if (obs.y > 70 && obs.y < 90 && Math.abs(obs.x - playerPosition) < 8) {
          if (obs.type === 'rock') {
            setGameOver(true)
            setIsPlaying(false)
          } else if (obs.type === 'mud') {
            setSpeed(prev => Math.max(0.5, prev - 0.2))
          } else if (obs.type === 'water') {
            setSpeed(prev => Math.max(0.3, prev - 0.3))
          }
        }
      })

      // Recover speed
      if (score % 50 === 0) {
        setSpeed(prev => Math.min(3, prev + 0.1))
      }
    }, 50)

    return () => clearInterval(gameLoop)
  }, [isPlaying, gameOver, obstacles, playerPosition, score, speed])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isPlaying) return
    
    if (e.key === 'ArrowLeft' && playerPosition > 10) {
      setPlayerPosition(prev => prev - 4)
    }
    if (e.key === 'ArrowRight' && playerPosition < 90) {
      setPlayerPosition(prev => prev + 4)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying])

  const getObstacleEmoji = (type: 'rock' | 'mud' | 'water') => {
    switch (type) {
      case 'rock': return '🪨'
      case 'mud': return '🌊'
      case 'water': return '💧'
      default: return '🪨'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🚙 Off-Road Racing</h2>
        <div className="text-lg text-gray-300 mb-4">
          Score: <span className="text-cyan-400 font-bold">{score}</span> | 
          Speed: <span className="text-yellow-400 font-bold">{speed.toFixed(1)}x</span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Avoid rocks! Mud and water slow you down!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Adventure
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">💥 Crashed!</div>
          <div className="text-lg text-gray-300 mb-6">
            Final Score: <span className="text-cyan-400 font-bold">{score}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-md h-64 bg-gradient-to-b from-green-800 to-brown-800 rounded-xl border-2 border-gray-600 overflow-hidden">
          {/* Terrain */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-brown-700">
            {/* Terrain details */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-600 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-brown-600 rounded-full"></div>
          </div>
          
          {/* Player vehicle */}
          <div 
            className="absolute bottom-4 w-10 h-8 bg-orange-500 rounded-lg transform -translate-x-1/2"
            style={{ left: `${playerPosition}%` }}
          >
            <div className="w-full h-1 bg-orange-600 rounded-t-lg"></div>
            <div className="w-3 h-3 bg-black rounded-full absolute -bottom-1 left-1"></div>
            <div className="w-3 h-3 bg-black rounded-full absolute -bottom-1 right-1"></div>
          </div>

          {/* Obstacles */}
          {obstacles.map(obs => (
            <div
              key={obs.id}
              className="absolute w-6 h-6 transform -translate-x-1/2 flex items-center justify-center text-lg"
              style={{ left: `${obs.x}%`, top: `${obs.y}%` }}
            >
              {getObstacleEmoji(obs.type)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Sudoku Game
const SudokuGame = ({ onClose }: { onClose: () => void }) => {
  const [board, setBoard] = useState<number[][]>([])
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const generateSudoku = () => {
    // Simple 4x4 Sudoku for demo
    const puzzle = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1]
    ]
    setBoard(puzzle)
    setIsPlaying(true)
    setGameOver(false)
  }

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col])
  }

  const handleNumberInput = (num: number) => {
    if (!selectedCell || !isPlaying) return
    const [row, col] = selectedCell
    const newBoard = [...board]
    newBoard[row][col] = num
    setBoard(newBoard)
  }

  const checkWin = () => {
    // Simple win check for 4x4
    const isValid = board.every(row => 
      row.every(cell => cell >= 1 && cell <= 4)
    )
    if (isValid) {
      setGameOver(true)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      checkWin()
    }
  }, [board, isPlaying])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">📊 Sudoku</h2>
        <div className="text-lg text-gray-300 mb-4">
          Fill the grid with numbers 1-4
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Complete the 4x4 Sudoku puzzle!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateSudoku}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Puzzle
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🎉 Puzzle Complete!</div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateSudoku}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              New Puzzle
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {/* Sudoku Grid */}
          <div className="grid grid-cols-4 gap-1 mb-6 bg-gray-700 p-2 rounded-lg">
            {board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-12 h-12 border border-gray-600 rounded flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                    selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {cell || ''}
                </button>
              ))
            )}
          </div>

          {/* Number Input */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(num => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNumberInput(num)}
                className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-lg text-white font-bold text-lg hover:bg-gray-600 transition-all duration-200"
              >
                {num}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Wordle Game
const WordleGame = ({ onClose }: { onClose: () => void }) => {
  const words = ['REACT', 'GAMES', 'FUNNY', 'SMART', 'QUICK', 'BRAVE', 'HAPPY', 'PEACE', 'DREAM', 'SPACE']
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  const maxGuesses = 6

  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameOver) return

    if (e.key === 'Enter' && currentGuess.length === 5) {
      const newGuesses = [...guesses, currentGuess]
      setGuesses(newGuesses)
      setCurrentGuess('')

      if (currentGuess === word) {
        setWon(true)
        setGameOver(true)
      } else if (newGuesses.length >= maxGuesses) {
        setGameOver(true)
      }
    } else if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (e.key.match(/^[A-Za-z]$/) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + e.key.toUpperCase())
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentGuess, gameOver])

  const getLetterColor = (letter: string, position: number, guess: string) => {
    if (word[position] === letter) return 'bg-green-500'
    if (word.includes(letter)) return 'bg-yellow-500'
    return 'bg-gray-600'
  }

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)])
    setGuesses([])
    setCurrentGuess('')
    setGameOver(false)
    setWon(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">📝 Wordle</h2>
        <div className="text-lg text-gray-300 mb-4">
          Guess the 5-letter word in 6 tries
        </div>
      </div>

      {gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            {won ? '🎉 You Won!' : '💀 Game Over!'}
          </div>
          <div className="text-lg text-gray-300 mb-6">
            The word was: <span className="text-cyan-400 font-bold">{word}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {/* Wordle Grid */}
          <div className="space-y-2 mb-6">
            {[...Array(maxGuesses)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 justify-center">
                {[...Array(5)].map((_, colIndex) => {
                  const guess = guesses[rowIndex] || ''
                  const letter = guess[colIndex] || ''
                  const isCurrentRow = rowIndex === guesses.length
                  const currentLetter = isCurrentRow ? currentGuess[colIndex] || '' : ''
                  
                  return (
                    <div
                      key={colIndex}
                      className={`w-12 h-12 border-2 rounded flex items-center justify-center text-xl font-bold ${
                        guess
                          ? `${getLetterColor(letter, colIndex, guess)} text-white border-transparent`
                          : isCurrentRow && currentLetter
                          ? 'bg-gray-700 text-white border-gray-500'
                          : 'bg-gray-800 text-white border-gray-600'
                      }`}
                    >
                      {guess ? letter : currentLetter}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-400">
            Type your guess and press Enter
          </div>
        </div>
      )}
    </div>
  )
}

// Bubble Pop Game
const BubblePopGame = ({ onClose }: { onClose: () => void }) => {
  const [bubbles, setBubbles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setBubbles([])
  }

  const createBubble = () => {
    const newBubble = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
      size: Math.random() * 20 + 20,
      color: colors[Math.floor(Math.random() * colors.length)]
    }
    setBubbles(prev => [...prev, newBubble])
  }

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id))
    setScore(prev => prev + 10)
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const bubbleTimer = setInterval(() => {
      if (!gameOver) {
        createBubble()
      } else {
        clearInterval(bubbleTimer)
      }
    }, 1000)

    return () => {
      clearInterval(gameTimer)
      clearInterval(bubbleTimer)
    }
  }, [isPlaying, gameOver])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🫧 Bubble Pop</h2>
        <div className="text-lg text-gray-300 mb-4">
          Score: <span className="text-cyan-400 font-bold">{score}</span> | 
          Time: <span className="text-yellow-400 font-bold">{timeLeft}s</span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Click bubbles to pop them and score points!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Popping
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🎯 Game Over!</div>
          <div className="text-lg text-gray-300 mb-6">
            Final Score: <span className="text-cyan-400 font-bold">{score}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-md h-64 bg-gradient-to-b from-blue-900 to-blue-700 rounded-xl border-2 border-blue-600 overflow-hidden">
          {bubbles.map(bubble => (
            <motion.button
              key={bubble.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => popBubble(bubble.id)}
              className={`absolute rounded-full ${bubble.color} shadow-lg hover:shadow-xl transition-all duration-200`}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Match 3 Game
const Match3Game = ({ onClose }: { onClose: () => void }) => {
  const [board, setBoard] = useState<string[][]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const colors = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠']

  const initializeBoard = () => {
    const newBoard = []
    for (let i = 0; i < 8; i++) {
      const row = []
      for (let j = 0; j < 8; j++) {
        row.push(colors[Math.floor(Math.random() * colors.length)])
      }
      newBoard.push(row)
    }
    setBoard(newBoard)
  }

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    initializeBoard()
  }

  const handleTileClick = (row: number, col: number) => {
    if (!isPlaying || gameOver) return

    // Simple match logic - just remove the clicked tile and add score
    const newBoard = [...board]
    newBoard[row][col] = colors[Math.floor(Math.random() * colors.length)]
    setBoard(newBoard)
    setScore(prev => prev + 10)
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, gameOver])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">💎 Match 3</h2>
        <div className="text-lg text-gray-300 mb-4">
          Score: <span className="text-cyan-400 font-bold">{score}</span> | 
          Time: <span className="text-yellow-400 font-bold">{timeLeft}s</span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Click tiles to match and score points!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Matching
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🎯 Game Over!</div>
          <div className="text-lg text-gray-300 mb-6">
            Final Score: <span className="text-cyan-400 font-bold">{score}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              Play Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="grid grid-cols-8 gap-1 bg-gray-700 p-2 rounded-lg">
            {board.map((row, rowIndex) => 
              row.map((tile, colIndex) => (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                  className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-sm hover:bg-gray-600 transition-all duration-200"
                >
                  {tile}
                </motion.button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 15 Puzzle Game
const Puzzle15Game = ({ onClose }: { onClose: () => void }) => {
  const [board, setBoard] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const initializeBoard = () => {
    const numbers = Array.from({length: 15}, (_, i) => i + 1)
    numbers.push(0) // Empty space
    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]
    }
    setBoard(numbers)
    setMoves(0)
    setIsPlaying(true)
    setGameOver(false)
  }

  const handleTileClick = (index: number) => {
    if (!isPlaying || gameOver) return

    const emptyIndex = board.indexOf(0)
    const row = Math.floor(index / 4)
    const emptyRow = Math.floor(emptyIndex / 4)
    const col = index % 4
    const emptyCol = emptyIndex % 4

    // Check if tiles are adjacent
    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) || 
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
      const newBoard = [...board]
      newBoard[emptyIndex] = board[index]
      newBoard[index] = 0
      setBoard(newBoard)
      setMoves(prev => prev + 1)

      // Check win condition
      const isWin = newBoard.every((num, i) => {
        if (i === 15) return num === 0
        return num === i + 1
      })
      if (isWin) {
        setGameOver(true)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🧩 15 Puzzle</h2>
        <div className="text-lg text-gray-300 mb-4">
          Moves: <span className="text-cyan-400 font-bold">{moves}</span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-6">
            Slide tiles to arrange numbers 1-15 in order!
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeBoard}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold text-lg"
          >
            Start Puzzle
          </motion.button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🎉 Puzzle Complete!</div>
          <div className="text-lg text-gray-300 mb-6">
            Moves: <span className="text-cyan-400 font-bold">{moves}</span>
          </div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initializeBoard}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl text-white font-semibold"
            >
              New Puzzle
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
            >
              Back to Library
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="grid grid-cols-4 gap-1 bg-gray-700 p-2 rounded-lg">
            {board.map((num, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTileClick(index)}
                className={`w-16 h-16 rounded flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                  num === 0 
                    ? 'bg-gray-800 text-transparent' 
                    : 'bg-cyan-500 text-white hover:bg-cyan-400'
                }`}
              >
                {num || ''}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Game Library selector - Performance Optimized
const GameLibrary = memo(({ onSelect, onClose, isClient }: { onSelect: (key: string) => void, onClose: () => void, isClient: boolean }) => {
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(true)

  // Performance optimization: Debounced search
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const categories = [
    { key: 'all', name: '🎮 All Games', count: 20 },
    { key: 'arcade', name: '🕹️ Arcade', count: 4 },
    { key: 'puzzle', name: '🧩 Puzzle', count: 7 },
    { key: 'action', name: '⚡ Action', count: 4 },
    { key: 'educational', name: '📚 Educational', count: 3 },
    { key: 'classic', name: '🏆 Classic', count: 2 }
  ]

  // Add favorites category only if user is logged in and hydrated
  const allCategories = isClient && session?.user?.email 
    ? [
        ...categories.slice(0, 1), // All Games
        { key: 'favorites', name: '⭐ Favorites', count: favorites.length },
        ...categories.slice(1) // Rest of categories
      ]
    : categories

  const games = [
    { key: 'tictactoe', name: 'Tic‑Tac‑Toe', emoji: '❌⭕', desc: 'Play vs computer', category: 'classic', difficulty: 'Easy', players: '1-2', rating: 4.5 },
    { key: 'number', name: 'Number Guess', emoji: '🎲', desc: 'Guess 1-100', category: 'puzzle', difficulty: 'Easy', players: '1', rating: 4.2 },
    { key: 'memory', name: 'Memory', emoji: '🧠', desc: 'Match pairs', category: 'puzzle', difficulty: 'Medium', players: '1', rating: 4.3 },
    { key: 'rps', name: 'Rock Paper Scissors', emoji: '✊✋✌️', desc: 'Best of luck', category: 'classic', difficulty: 'Easy', players: '1-2', rating: 4.0 },
    { key: 'snake', name: 'Snake', emoji: '🐍', desc: 'Classic arcade', category: 'arcade', difficulty: 'Medium', players: '1', rating: 4.7 },
    { key: 'tetris', name: 'Tetris', emoji: '🧩', desc: 'Block puzzle', category: 'puzzle', difficulty: 'Hard', players: '1', rating: 4.8 },
    { key: 'pong', name: 'Pong', emoji: '🏓', desc: 'Classic tennis', category: 'arcade', difficulty: 'Medium', players: '1-2', rating: 4.6 },
    { key: 'breakout', name: 'Breakout', emoji: '🧱', desc: 'Break the blocks', category: 'arcade', difficulty: 'Medium', players: '1', rating: 4.4 },
    { key: 'flappy', name: 'Flappy Bird', emoji: '🐦', desc: 'Navigate obstacles', category: 'action', difficulty: 'Hard', players: '1', rating: 4.3 },
    { key: '2048', name: '2048', emoji: '🔢', desc: 'Merge numbers', category: 'puzzle', difficulty: 'Medium', players: '1', rating: 4.5 },
    { key: 'hangman', name: 'Hangman', emoji: '🪢', desc: 'Guess the word', category: 'educational', difficulty: 'Easy', players: '1', rating: 4.0 },
    { key: 'mathquiz', name: 'Math Quiz', emoji: '🧮', desc: 'Test your skills', category: 'educational', difficulty: 'Easy', players: '1', rating: 4.0 },
    { key: 'whackamole', name: 'Whack-a-Mole', emoji: '🔨', desc: 'Quick reflexes', category: 'action', difficulty: 'Easy', players: '1', rating: 4.0 },
    { key: 'racing', name: 'Circuit Racing', emoji: '🏎️', desc: 'Speed challenge', category: 'action', difficulty: 'Medium', players: '1', rating: 4.5 },
    { key: 'dragracing', name: 'Drag Racing', emoji: '🏁', desc: 'Quarter mile sprint', category: 'action', difficulty: 'Easy', players: '1', rating: 4.3 },
    { key: 'offroad', name: 'Off-Road Racing', emoji: '🚙', desc: 'Mud and terrain', category: 'action', difficulty: 'Hard', players: '1', rating: 4.4 },
    { key: 'sudoku', name: 'Sudoku', emoji: '📊', desc: 'Logic puzzle', category: 'puzzle', difficulty: 'Hard', players: '1', rating: 4.7 },
    { key: 'wordle', name: 'Wordle', emoji: '📝', desc: 'Word guessing', category: 'educational', difficulty: 'Medium', players: '1', rating: 4.6 },
    { key: 'bubblepop', name: 'Bubble Pop', emoji: '🫧', desc: 'Pop the bubbles', category: 'arcade', difficulty: 'Easy', players: '1', rating: 4.0 },
    { key: 'match3', name: 'Match 3', emoji: '💎', desc: 'Match gems', category: 'puzzle', difficulty: 'Easy', players: '1', rating: 4.1 },
    { key: 'puzzle15', name: '15 Puzzle', emoji: '🧩', desc: 'Slide tiles', category: 'puzzle', difficulty: 'Medium', players: '1', rating: 4.3 },
  ]

  // Performance optimization: Memoized filtered games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      let matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
      
      // Handle favorites category
      if (selectedCategory === 'favorites') {
        matchesCategory = favorites.includes(game.key)
      }
      
      const matchesSearch = game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                           game.desc.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, favorites, debouncedSearchTerm])

  // Performance optimization: Memoized callback functions
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleGameHover = useCallback((gameKey: string | null) => {
    setHoveredGame(gameKey)
  }, [])

  // Fetch favorites on component mount
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

  const toggleFavorite = async (gameKey: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent game selection when clicking favorite button
    if (!session?.user?.email) return

    try {
      const isFavorite = favorites.includes(gameKey)
      const method = isFavorite ? 'DELETE' : 'POST'
      
      const response = await fetch('/api/favorites', {
        method,
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
      console.error('Failed to toggle favorite:', error)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Hard': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <GameModal title="🎮 Game Library" onClose={onClose}>
      <div className="h-full flex flex-col bg-gray-900/50 rounded-xl overflow-hidden">
        {/* Compact Header */}
        <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">🎮 Game Library</h2>
            <div className="text-sm text-gray-400">
              {filteredGames.length} games available
            </div>
          </div>
          
          {/* Compact Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="🔍 Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 pr-4 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Compact Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat.key
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {cat.name.split(' ')[0]} ({cat.count})
              </button>
            ))}
          </div>
          
          {/* Login Prompt for Favorites */}
          {!session?.user?.email && (
            <div className="mt-3 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-yellow-300">
                <Star className="w-4 h-4" />
                <span>💡 <strong>Login</strong> to save games to favorites and access them later!</span>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Games Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredGames.map((game, index) => (
              <motion.button
                key={game.key}
                onClick={() => onSelect(game.key)}
                onMouseEnter={() => setHoveredGame(game.key)}
                onMouseLeave={() => setHoveredGame(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-3 rounded-lg border transition-all duration-300 ${
                  hoveredGame === game.key
                    ? 'border-cyan-400/60 bg-gray-800/80 shadow-lg shadow-cyan-400/20'
                    : 'border-gray-600/30 bg-gray-800/30 hover:border-cyan-400/40 hover:bg-gray-800/50'
                }`}
              >
                {/* Game Icon and Favorite Button */}
                <div className="relative">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  
                  {/* Favorite Button */}
                  {session?.user?.email && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(game.key, e)}
                      className={`absolute -top-1 -right-1 p-1 rounded-full transition-all duration-300 ${
                        favorites.includes(game.key)
                          ? 'text-yellow-400 bg-yellow-400/20'
                          : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/20'
                      }`}
                      title={favorites.includes(game.key) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-3 h-3 ${favorites.includes(game.key) ? 'fill-current' : ''}`} />
                    </motion.button>
                  )}
                </div>
                
                {/* Game Name */}
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors duration-300 truncate">
                  {game.name}
                </h3>
                
                {/* Game Description */}
                <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                  {game.desc}
                </p>

                {/* Game Stats */}
                <div className="flex items-center justify-between">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getDifficultyColor(game.difficulty)} bg-gray-700/50`}>
                    {game.difficulty}
                  </span>
                  <span className="text-yellow-400 text-xs">⭐ {game.rating}</span>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <div className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    PLAY
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Empty State */}
          {filteredGames.length === 0 && (
            <div className="text-center py-8">
              {selectedCategory === 'favorites' ? (
                <>
                  <div className="text-4xl mb-2">⭐</div>
                  <h3 className="text-lg font-bold text-white mb-2">No Favorite Games Yet</h3>
                  <p className="text-gray-400 text-sm mb-4">Start playing games and add them to your favorites!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory('all')}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg text-white text-sm font-semibold"
                  >
                    Browse All Games
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-2">🎮</div>
                  <h3 className="text-lg font-bold text-white mb-2">No Games Found</h3>
                  <p className="text-gray-400 text-sm">Try adjusting your search or category filter.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </GameModal>
  )
})

GameLibrary.displayName = 'GameLibrary'

// Enhanced Game Modal wrapper with better game area feel
const GameModal = ({ title, onClose, children, showBackButton = false, onBack }: { 
  title: string, 
  onClose: () => void, 
  children: React.ReactNode,
  showBackButton?: boolean,
  onBack?: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed inset-0 md:inset-6 z-50 bg-gradient-to-br from-gray-900/98 via-gray-800/95 to-gray-900/98 backdrop-blur-xl border border-gray-700/50 rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-400/10 to-transparent rounded-full translate-x-20 translate-y-20"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-purple-400/5 to-transparent rounded-full -translate-x-12 -translate-y-12"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-gray-600/50 flex-shrink-0 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          {showBackButton && onBack && (
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200"
              title="Back to Game Library"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">{title}</span>
              {showBackButton && (
                <div className="text-xs text-gray-400 mt-1">Game in Progress</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Game Stats (if in game) */}
          {showBackButton && (
            <div className="flex items-center space-x-3 mr-4">
              <div className="flex items-center space-x-1 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>00:00</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-300">
                <Trophy className="w-4 h-4" />
                <span>0</span>
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200"
            title="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative flex-1 min-h-0 overflow-auto">
        {children}
      </div>
    </motion.div>
  )
}

// Tic-Tac-Toe with a simple computer AI opponent
const TicTacToeGame = ({ onClose }: { onClose: () => void }) => {
  const [board, setBoard] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null))
  const [human, setHuman] = useState<'X' | 'O'>('X')
  const [current, setCurrent] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<null | 'X' | 'O' | 'draw'>(null)

  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  const calculateWinner = (b: (null | 'X' | 'O')[]) => {
    for (const [a,bIndex,c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) return b[a]
    }
    if (b.every(cell => cell)) return 'draw'
    return null
  }

  const availableMoves = (b: (null | 'X' | 'O')[]) => b.map((v,i) => v ? -1 : i).filter(i => i !== -1)

  const tryWinOrBlock = (b: (null | 'X' | 'O')[], player: 'X' | 'O') => {
    for (const i of availableMoves(b)) {
      const copy = [...b]
      copy[i] = player
      if (calculateWinner(copy) === player) return i
    }
    return -1
  }

  const pickBestMove = (b: (null | 'X' | 'O')[], ai: 'X' | 'O') => {
    const opp: 'X' | 'O' = ai === 'X' ? 'O' : 'X'
    // 1) Win
    let move = tryWinOrBlock(b, ai)
    if (move !== -1) return move
    // 2) Block
    move = tryWinOrBlock(b, opp)
    if (move !== -1) return move
    // 3) Center
    if (b[4] === null) return 4
    // 4) Corners
    const corners = [0,2,6,8].filter(i => b[i] === null)
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)]
    // 5) Sides
    const sides = [1,3,5,7].filter(i => b[i] === null)
    if (sides.length) return sides[Math.floor(Math.random() * sides.length)]
    return -1
  }

  const handleClick = (idx: number) => {
    if (winner || board[idx] || current !== human) return
    const next = [...board]
    next[idx] = human
    const w = calculateWinner(next)
    setBoard(next)
    if (w) { setWinner(w); return }
    setCurrent(human === 'X' ? 'O' : 'X')
  }

  // Computer move
  useEffect(() => {
    if (winner) return
    const ai = human === 'X' ? 'O' : 'X'
    if (current === ai) {
      const timeout = setTimeout(() => {
        const move = pickBestMove(board, ai)
        if (move !== -1) {
          const next = [...board]
          next[move] = ai
          const w = calculateWinner(next)
          setBoard(next)
          if (w) { setWinner(w); return }
          setCurrent(human)
        }
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [current, board, human, winner])

  const reset = () => {
    setBoard(Array(9).fill(null))
    setCurrent('X')
    setWinner(null)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Tic‑Tac‑Toe</h2>
          <p className="text-gray-400 text-sm">You vs Computer</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">You are</span>
          <select
            value={human}
            onChange={(e) => {
              const val = (e.target as HTMLSelectElement).value as 'X'|'O'
              setHuman(val)
              reset()
            }}
            className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm"
          >
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
          <button onClick={reset} className="ml-2 px-3 py-1.5 text-sm rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30">Restart</button>
          <button onClick={onClose} className="ml-2 px-3 py-1.5 text-sm rounded-md bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600">Close</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full max-w-[360px] mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="aspect-square rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-3xl font-bold transition-all hover:bg-gray-700"
          >
            <span className={cell === 'X' ? 'text-red-400' : 'text-blue-400'}>{cell}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-300">
        {!winner && <span>Turn: <span className="font-semibold">{current}</span> {current !== human ? '(Computer)' : '(You)'}</span>}
        {winner === 'draw' && <span>It's a draw! 🤝</span>}
        {winner === 'X' && <span>Winner: X {human === 'X' ? '🎉' : '🤖'}</span>}
        {winner === 'O' && <span>Winner: O {human === 'O' ? '🎉' : '🤖'}</span>}
      </div>
    </div>
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

  const [messages, setMessages] = useState<Message[]>([])
  const [isClient, setIsClient] = useState(false)

  // Initialize messages after client-side hydration
  useEffect(() => {
    setIsClient(true)
    if (session?.user?.name) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello ${session.user.name}! I'm your AI assistant. How can I help you today?`,
          timestamp: new Date()
        }
      ])
    }
  }, [session?.user?.name])

  // Don't render if not hydrated
  if (!isClient) {
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
  const [showGameLauncher, setShowGameLauncher] = useState(false)
  const [activeGame, setActiveGame] = useState<null | 'tictactoe' | 'number' | 'memory' | 'rps' | 'snake' | 'tetris' | 'pong' | 'breakout' | 'flappy' | '2048' | 'hangman' | 'mathquiz' | 'whackamole' | 'racing' | 'dragracing' | 'offroad' | 'sudoku' | 'wordle' | 'bubblepop' | 'match3' | 'puzzle15'>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }



  const loadMessages = async (conversationId: string) => {
    if (!session?.user?.id) return

    try {
      // Load from localStorage first for immediate response
      const { loadFromStorage, getConversationMessages } = await import('@/app/lib/chatHistory')
      loadFromStorage()
      const localMessages = getConversationMessages(conversationId)
      
      if (localMessages.length > 0) {
        const formattedMessages: Message[] = localMessages.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(formattedMessages)
        return
      }
      
      // Fallback to API
      const response = await fetch(`/api/chat-history?userId=${session.user.id}&conversationId=${conversationId}`)
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
      // Show welcome message if loading fails
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hello ${session.user?.name || 'there'}! I'm your AI assistant. How can I help you today?`,
        timestamp: new Date()
      }])
    }
  }

  const startNewChat = () => {
    // Create a new conversation ID
    const newConversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setCurrentConversationId(newConversationId)
    
    // Reset messages with welcome message
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `Hello ${session.user?.name || 'there'}! I'm your AI assistant. How can I help you today?`,
      timestamp: new Date()
    }])
    setShowHistory(false)
    
    // Focus on input for immediate interaction
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
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
      
      // If no conversations exist, show welcome message
      if (conversations.length === 0 && messages.length === 0) {
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: `Hello ${session.user.name || 'there'}! I'm your AI assistant. How can I help you today?`,
          timestamp: new Date()
        }])
      }
    }
  }, [session, conversations.length, messages.length])

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
      
      // Save to localStorage for immediate persistence
      const { addMessage } = await import('@/app/lib/chatHistory')
      if (data.conversationId) {
        addMessage(session.user.id, data.conversationId, 'user', userMessage.content)
        addMessage(session.user.id, data.conversationId, 'assistant', data.response)
      }
    } catch (error) {
      console.error('Chat error:', error)
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
      // Load from localStorage first for immediate response
      const { loadFromStorage, getUserConversations } = await import('@/app/lib/chatHistory')
      loadFromStorage()
      const localConversations = getUserConversations(session.user.id)
      setConversations(localConversations)
      
      // Also try to load from API as backup
      const response = await fetch(`/api/chat-history?userId=${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        if (data.conversations && data.conversations.length > 0) {
          setConversations(data.conversations)
        }
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
              onClick={() => setShowGameLauncher(true)}
              className="p-2 rounded-xl text-gray-300 hover:text-pink-400 hover:bg-gray-800/50 transition-all duration-300 relative group"
              title="Game Library"
            >
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-2xl leading-none">🎮</div>
              </div>
              {/* Animated indicator */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
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
                
                {/* Premium Subscription Badge */}
                {subscriptionBadge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border-2 flex items-center justify-center shadow-lg`}
                  >
                    <subscriptionBadge.icon className="w-2 h-2 text-white" />
                  </motion.div>
                )}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{session.user?.name}</p>
                  {subscriptionBadge && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${subscriptionBadge.bgColor} ${subscriptionBadge.borderColor} border`}>
                      {subscriptionBadge.label}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{session.user?.email}</p>
              </div>
              <Link 
                href="/signout"
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
                        {/* Fallback CTA: Offer to play games */}
                        {message.role === 'assistant' && message.fallback && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-400">Service is busy. Want to play a game?</span>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setShowGameLauncher(true)}
                              className="px-3 py-1.5 text-xs rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30"
                            >
                              Open Games
                            </motion.button>
                          </div>
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

          {/* Game Library Overlay */}
          <AnimatePresence>
            {showGameLauncher && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowGameLauncher(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
                <GameLibrary
                  onSelect={(key) => { 
                    setActiveGame(key as any); 
                    setShowGameLauncher(false);
                  }}
                  onClose={() => setShowGameLauncher(false)}
                  isClient={isClient}
                />
              </>
            )}
          </AnimatePresence>

          {/* Active Game Overlay */}
          <AnimatePresence>
            {activeGame && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveGame(null)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
                <GameModal 
                  title={activeGame ? {
                    tictactoe: 'Tic‑Tac‑Toe', 
                    number: 'Number Guessing', 
                    memory: 'Memory Game', 
                    rps: 'Rock • Paper • Scissors',
                    snake: 'Snake Game',
                    tetris: 'Tetris',
                    pong: 'Pong',
                    breakout: 'Breakout',
                    flappy: 'Flappy Bird',
                    '2048': '2048',
                    hangman: 'Hangman',
                    mathquiz: 'Math Quiz',
                    whackamole: 'Whack-a-Mole',
                    racing: 'Circuit Racing',
                    dragracing: 'Drag Racing',
                    offroad: 'Off-Road Racing',
                    sudoku: 'Sudoku',
                    chess: 'Chess',
                    checkers: 'Checkers',
                    wordle: 'Wordle',
                    bubblepop: 'Bubble Pop',
                    match3: 'Match 3',
                    puzzle15: '15 Puzzle'
                  }[activeGame] || 'Game' : 'Game'} 
                  onClose={() => setActiveGame(null)}
                  showBackButton={true}
                  onBack={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }}
                >
                  {activeGame === 'tictactoe' && <TicTacToeGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'number' && <NumberGuessGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'memory' && <MemoryGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'rps' && <RockPaperScissorsGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'snake' && <SnakeGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'tetris' && <TetrisGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'pong' && <PongGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'breakout' && <BreakoutGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'flappy' && <FlappyBirdGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === '2048' && <Game2048 onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'hangman' && <HangmanGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'mathquiz' && <MathQuizGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'whackamole' && <WhackAMoleGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'racing' && <RacingGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'dragracing' && <DragRacingGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'offroad' && <OffRoadRacingGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'sudoku' && <SudokuGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'wordle' && <WordleGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'bubblepop' && <BubblePopGame onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'match3' && <Match3Game onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                  {activeGame === 'puzzle15' && <Puzzle15Game onClose={() => {
                    setActiveGame(null);
                    setShowGameLauncher(true);
                  }} />}
                </GameModal>
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

      {/* Floating Game Button - Shows when no messages or idle */}
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-30"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowGameLauncher(true)}
            className="group relative p-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300"
            title="Play Games While Waiting"
          >
            <div className="text-2xl">🎮</div>
            
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 opacity-20 animate-ping"></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Play 20 Games!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Quick Game Access - Shows when there are messages but user might want a break */}
      {messages.length > 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-6 left-6 z-30"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGameLauncher(true)}
            className="group p-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full shadow-lg hover:bg-gray-700/80 transition-all duration-300"
            title="Take a Break - Play Games"
          >
            <div className="text-lg">🎯</div>
            
            {/* Subtle pulse */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

// Placeholder game components for remaining games
const ChessGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">♟️ Chess</h2>
      <div className="text-lg text-gray-300 mb-6">Chess game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const CheckersGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🔴⚫ Checkers</h2>
      <div className="text-lg text-gray-300 mb-6">Checkers game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const PacmanGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">👻 Pac-Man</h2>
      <div className="text-lg text-gray-300 mb-6">Pac-Man game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const AsteroidsGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">☄️ Asteroids</h2>
      <div className="text-lg text-gray-300 mb-6">Asteroids game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const SpaceInvadersGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">👾 Space Invaders</h2>
      <div className="text-lg text-gray-300 mb-6">Space Invaders game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const BombermanGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">💣 Bomberman</h2>
      <div className="text-lg text-gray-300 mb-6">Bomberman game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const MinesweeperGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">💥 Minesweeper</h2>
      <div className="text-lg text-gray-300 mb-6">Minesweeper game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const Connect4Game = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🔵🔴 Connect 4</h2>
      <div className="text-lg text-gray-300 mb-6">Connect 4 game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const SolitaireGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🃏 Solitaire</h2>
      <div className="text-lg text-gray-300 mb-6">Solitaire game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const MahjongGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🀄 Mahjong</h2>
      <div className="text-lg text-gray-300 mb-6">Mahjong game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const CrosswordGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">📋 Crossword</h2>
      <div className="text-lg text-gray-300 mb-6">Crossword game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const TypingGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">⌨️ Speed Typing</h2>
      <div className="text-lg text-gray-300 mb-6">Speed Typing game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const ColorBlastGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🎨 Color Blast</h2>
      <div className="text-lg text-gray-300 mb-6">Color Blast game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const JigsawGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🧩 Jigsaw Puzzle</h2>
      <div className="text-lg text-gray-300 mb-6">Jigsaw Puzzle game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const SimonGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🎵 Simon Says</h2>
      <div className="text-lg text-gray-300 mb-6">Simon Says game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const PinballGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🎰 Pinball</h2>
      <div className="text-lg text-gray-300 mb-6">Pinball game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const PlatformerGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🏃 Platformer</h2>
      <div className="text-lg text-gray-300 mb-6">Platformer game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const ShooterGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🎯 Space Shooter</h2>
      <div className="text-lg text-gray-300 mb-6">Space Shooter game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const TowerDefenseGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🏰 Tower Defense</h2>
      <div className="text-lg text-gray-300 mb-6">Tower Defense game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const ReversiGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">⚫⚪ Reversi</h2>
      <div className="text-lg text-gray-300 mb-6">Reversi game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const BattleshipGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🚢 Battleship</h2>
      <div className="text-lg text-gray-300 mb-6">Battleship game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const WordSearchGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🔍 Word Search</h2>
      <div className="text-lg text-gray-300 mb-6">Word Search game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const SpotDiffGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">👁️ Spot Difference</h2>
      <div className="text-lg text-gray-300 mb-6">Spot Difference game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const MemoryCardGame = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🃏 Memory Cards</h2>
      <div className="text-lg text-gray-300 mb-6">Memory Cards game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const TicTacToe4Game = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">❌⭕ 4x4 Tic-Tac-Toe</h2>
      <div className="text-lg text-gray-300 mb-6">4x4 Tic-Tac-Toe game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const Snake2Game = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🐍 Snake 2</h2>
      <div className="text-lg text-gray-300 mb-6">Snake 2 game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const Tetris2Game = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🧩 Tetris 2</h2>
      <div className="text-lg text-gray-300 mb-6">Tetris 2 game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const Breakout2Game = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🧱 Breakout 2</h2>
      <div className="text-lg text-gray-300 mb-6">Breakout 2 game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

const Flappy2Game = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🐦 Flappy 2</h2>
      <div className="text-lg text-gray-300 mb-6">Flappy 2 game coming soon!</div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold"
      >
        Back to Library
      </motion.button>
    </div>
  </div>
)

export default function ChatPage() {
  return (
    <ErrorBoundary>
      <ChatPageContent />
    </ErrorBoundary>
  )
}
