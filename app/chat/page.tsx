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

// Game Library selector
const GameLibrary = ({ onSelect, onClose }: { onSelect: (key: string) => void, onClose: () => void }) => {
  const games = [
    { key: 'tictactoe', name: 'Tic‑Tac‑Toe', emoji: '❌⭕', desc: 'Play vs computer' },
    { key: 'number', name: 'Number Guess', emoji: '🎲', desc: 'Guess 1-100' },
    { key: 'memory', name: 'Memory', emoji: '🧠', desc: 'Match pairs' },
    { key: 'rps', name: 'Rock Paper Scissors', emoji: '✊✋✌️', desc: 'Best of luck' },
  ]
  return (
    <GameModal title="Game Library" onClose={onClose}>
      <div className="p-6 max-w-5xl mx-auto">
        <p className="text-gray-300 mb-4">Choose a game to play while the AI is busy.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map(g => (
            <button key={g.key} onClick={() => onSelect(g.key)}
              className="group rounded-2xl border border-gray-700 bg-gray-900/60 hover:bg-gray-800/60 transition-all p-5 text-left">
              <div className="text-3xl mb-2">{g.emoji}</div>
              <div className="text-white font-semibold">{g.name}</div>
              <div className="text-gray-400 text-sm">{g.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </GameModal>
  )
}

// Simple Game Modal wrapper
const GameModal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed inset-0 md:inset-6 z-50 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700/50 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Monitor className="w-5 h-5 text-cyan-400" />
          <span className="text-lg font-semibold text-white">{title}</span>
        </div>
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
      <div className="flex-1 min-h-0 overflow-auto">
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
        {winner === 'draw' && <span>It’s a draw! 🤝</span>}
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
  const [showGameLauncher, setShowGameLauncher] = useState(false)
  const [activeGame, setActiveGame] = useState<null | 'tictactoe' | 'number' | 'memory' | 'rps'>(null)
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
                  onSelect={(key) => { setActiveGame(key as any); setShowGameLauncher(false) }}
                  onClose={() => setShowGameLauncher(false)}
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
                <GameModal title={{ tictactoe: 'Tic‑Tac‑Toe', number: 'Number Guessing', memory: 'Memory Game', rps: 'Rock • Paper • Scissors' }[activeGame]} onClose={() => setActiveGame(null)}>
                  {activeGame === 'tictactoe' && <TicTacToeGame onClose={() => setActiveGame(null)} />}
                  {activeGame === 'number' && <NumberGuessGame onClose={() => setActiveGame(null)} />}
                  {activeGame === 'memory' && <MemoryGame onClose={() => setActiveGame(null)} />}
                  {activeGame === 'rps' && <RockPaperScissorsGame onClose={() => setActiveGame(null)} />}
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
