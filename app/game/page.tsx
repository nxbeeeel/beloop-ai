'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gamepad2, Sparkles, Trophy, Star, Heart, Target, 
  Dice1, Zap as Lightning, Trees as Tree, BookOpen, Map,
  ArrowLeft, Settings, Volume2, VolumeX, RotateCcw, 
  Play, Pause, SkipForward, SkipBack, Crown, Award, 
  Clock, Users, TrendingUp, Shield, Gem, Diamond, Brain, Zap, Palette,
  Type, Calculator, Puzzle, Music, Camera, Globe, Car, Plane 
} from 'lucide-react'

// Premium Falling Particles Component
const PremiumParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, type: string, delay: number}>>([])
  
  const particleTypes = ['✨', '💎', '🌟', '⭐', '💫', '🔥', '⚡', '🎯', '🏆', '👑']

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: -10,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        delay: Math.random() * 2
      }
      setParticles(prev => [...prev.slice(-30), newParticle])
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-lg"
          style={{ left: `${particle.x}%` }}
          initial={{ y: particle.y, opacity: 0, scale: 0 }}
          animate={{ 
            y: '110vh', 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 6, 
            delay: particle.delay,
            ease: "easeInOut"
          }}
          onAnimationComplete={() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id))
          }}
        >
          {particle.type}
        </motion.div>
      ))}
    </div>
  )
}

// Premium Game Components
const NumberGuessGame = () => {
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [gameWon, setGameWon] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [gameMode, setGameMode] = useState<'single' | 'vsComputer'>('single')
  const [computerScore, setComputerScore] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)

  const handleGuess = useCallback(() => {
    const numGuess = parseInt(guess)
    if (isNaN(numGuess)) return
    
    setAttempts(prev => prev + 1)
    
    if (numGuess === targetNumber) {
      const currentAttempts = attempts + 1
      setMessage(`🎉 Perfect! You got it in ${currentAttempts} attempts!`)
      setGameWon(true)
      setPlayerScore(prev => prev + 1)
      if (currentAttempts < highScore || highScore === 0) {
        setHighScore(currentAttempts)
      }
    } else if (numGuess < targetNumber) {
      setMessage('📈 Too low! Try a higher number.')
    } else {
      setMessage('📉 Too high! Try a lower number.')
    }
    setGuess('')
  }, [guess, targetNumber, attempts, highScore])

  const computerGuess = useCallback(() => {
    if (gameMode === 'vsComputer' && !gameWon) {
      const computerAttempt = Math.floor(Math.random() * 100) + 1
      if (computerAttempt === targetNumber) {
        setMessage(`🤖 Computer wins in ${attempts + 1} attempts!`)
        setGameWon(true)
        setComputerScore(prev => prev + 1)
      } else {
        setMessage(`🤖 Computer guessed ${computerAttempt} - ${computerAttempt < targetNumber ? 'Too low!' : 'Too high!'}`)
        setAttempts(prev => prev + 1)
      }
    }
  }, [gameMode, gameWon, targetNumber, attempts])

  const resetGame = useCallback(() => {
    setGuess('')
    setMessage('')
    setAttempts(0)
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGameWon(false)
  }, [])

  const resetScores = useCallback(() => {
    setPlayerScore(0)
    setComputerScore(0)
  }, [])

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-pink-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Number Guessing</h3>
            <p className="text-purple-300 text-sm">Beat your high score!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setGameMode(gameMode === 'single' ? 'vsComputer' : 'single')}
            className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
            title={gameMode === 'single' ? 'Switch to vs Computer' : 'Switch to Single Player'}
          >
            <Users className="w-4 h-4" />
          </button>
          <button
            onClick={resetScores}
            className="p-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
            title="Reset Scores"
          >
            <Trophy className="w-4 h-4" />
          </button>
          <button
            onClick={resetGame}
            className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-300 mb-2">Guess the number between 1 and 100!</p>
          <div className="flex justify-center gap-4 text-sm mb-4">
            <span className="text-purple-300">Attempts: {attempts}</span>
            <span className="text-pink-300">Best: {highScore || 'N/A'}</span>
          </div>
          {gameMode === 'vsComputer' && (
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">You</div>
                <div className="text-white">{playerScore}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-pink-400">Computer</div>
                <div className="text-white">{computerScore}</div>
              </div>
            </div>
          )}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            gameMode === 'single' 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
              : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
          }`}>
            {gameMode === 'single' ? <Gamepad2 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            {gameMode === 'single' ? 'Single Player' : 'vs Computer'}
          </div>
        </div>
        
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
          className="w-full px-6 py-4 bg-gray-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-center text-lg"
          placeholder="Enter your guess"
          disabled={gameWon}
        />
        
        <div className="flex gap-3">
          <button
            onClick={handleGuess}
            disabled={!guess || gameWon}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg"
          >
            Submit Guess
          </button>
          {gameMode === 'vsComputer' && (
            <button
              onClick={computerGuess}
              disabled={gameWon}
              className="px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              🤖 Computer
            </button>
          )}
        </div>
        
        {message && (
          <motion.div 
            className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-purple-200 font-medium text-lg">{message}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [xScore, setXScore] = useState(0)
  const [oScore, setOScore] = useState(0)
  const [gameMode, setGameMode] = useState<'player' | 'computer'>('computer')
  const [isComputerThinking, setIsComputerThinking] = useState(false)
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'hard'>('hard')

  const calculateWinner = useCallback((squares: (string | null)[]) => {
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
  }, [])

  const getBestMove = useCallback((squares: (string | null)[]) => {
    const availableMoves = squares.map((square, index) => square === null ? index : -1).filter(index => index !== -1)
    
    if (aiDifficulty === 'easy') {
      // Easy AI: mostly random moves
      return availableMoves[Math.floor(Math.random() * availableMoves.length)]
    }
    
    // Hard AI: find winning move, block opponent, or strategic
    // Check for winning move
    for (const move of availableMoves) {
      const testBoard = [...squares]
      testBoard[move] = 'O'
      if (calculateWinner(testBoard) === 'O') {
        return move
      }
    }
    
    // Check for blocking move
    for (const move of availableMoves) {
      const testBoard = [...squares]
      testBoard[move] = 'X'
      if (calculateWinner(testBoard) === 'X') {
        return move
      }
    }
    
    // Prefer center, then corners, then edges
    const center = 4
    const corners = [0, 2, 6, 8]
    const edges = [1, 3, 5, 7]
    
    if (availableMoves.includes(center)) return center
    for (const corner of corners) {
      if (availableMoves.includes(corner)) return corner
    }
    for (const edge of edges) {
      if (availableMoves.includes(edge)) return edge
    }
    
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }, [calculateWinner, aiDifficulty])

  const makeComputerMove = useCallback(() => {
    if (winner || board.every(square => square)) return
    
    setIsComputerThinking(true)
    setTimeout(() => {
      const computerMove = getBestMove(board)
      if (computerMove !== undefined) {
        const newBoard = board.slice()
        newBoard[computerMove] = 'O'
        setBoard(newBoard)
        setXIsNext(true)
        
        const newWinner = calculateWinner(newBoard)
        if (newWinner) {
          setWinner(newWinner)
          setOScore(prev => prev + 1)
        }
      }
      setIsComputerThinking(false)
    }, aiDifficulty === 'easy' ? 300 : 800)
  }, [board, winner, getBestMove, calculateWinner, aiDifficulty])

  const handleClick = useCallback((i: number) => {
    if (winner || board[i] || isComputerThinking) return
    
    const newBoard = board.slice()
    newBoard[i] = 'X'
    setBoard(newBoard)
    setXIsNext(false)
    
    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setXScore(prev => prev + 1)
    } else if (gameMode === 'computer' && !newBoard.every(square => square)) {
      makeComputerMove()
    }
  }, [board, winner, isComputerThinking, calculateWinner, gameMode, makeComputerMove])

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !winner && !board.every(square => square) && !isComputerThinking) {
      makeComputerMove()
    }
  }, [xIsNext, winner, board, gameMode, isComputerThinking, makeComputerMove])

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setWinner(null)
    setIsComputerThinking(false)
  }, [])

  const resetScores = useCallback(() => {
    setXScore(0)
    setOScore(0)
  }, [])

  const status = winner 
    ? `🎉 ${winner === 'X' ? 'You win!' : 'Computer wins!'}` 
    : board.every(square => square) 
    ? "🤝 It's a draw!" 
    : isComputerThinking 
    ? "🤔 Computer is thinking..." 
    : xIsNext 
    ? "🎯 Your turn (X)" 
    : "💻 Computer's turn (O)"

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-cyan-900/40 rounded-2xl border border-blue-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Tic Tac Toe vs AI</h3>
            <p className="text-blue-300 text-sm">Challenge the computer!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setGameMode(gameMode === 'player' ? 'computer' : 'player')}
            className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
            title={gameMode === 'computer' ? 'Switch to Player vs Player' : 'Switch to Player vs Computer'}
          >
            <Users className="w-4 h-4" />
          </button>
          {gameMode === 'computer' && (
            <button
              onClick={() => setAiDifficulty(aiDifficulty === 'easy' ? 'hard' : 'easy')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                aiDifficulty === 'easy' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
              title={`Switch to ${aiDifficulty === 'easy' ? 'Hard' : 'Easy'} AI`}
            >
              <Brain className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={resetScores}
            className="p-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
            title="Reset Scores"
          >
            <Trophy className="w-4 h-4" />
          </button>
          <button
            onClick={resetGame}
            className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">You (X)</div>
            <div className="text-lg text-white">{xScore}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{gameMode === 'computer' ? 'AI (O)' : 'Player 2 (O)'}</div>
            <div className="text-lg text-white">{oScore}</div>
          </div>
        </div>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            gameMode === 'computer' 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
              : 'bg-green-500/20 text-green-300 border border-green-500/30'
          }`}>
            {gameMode === 'computer' ? <Users className="w-4 h-4" /> : <Gamepad2 className="w-4 h-4" />}
            {gameMode === 'computer' ? `Player vs AI (${aiDifficulty})` : 'Player vs Player'}
          </div>
        </div>
        <motion.p 
          className="text-center text-blue-300 font-medium text-lg"
          animate={isComputerThinking ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1, repeat: isComputerThinking ? Infinity : 0 }}
        >
          {status}
        </motion.p>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs mx-auto">
        {board.map((square, i) => (
          <motion.button
            key={i}
            className={`w-20 h-20 rounded-xl text-3xl font-bold transition-all duration-200 shadow-lg ${
              square === 'X' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-400' 
                : square === 'O'
                ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-2 border-cyan-400'
                : 'bg-gray-900/50 border border-blue-500/30 text-white hover:bg-gray-800/50 hover:border-blue-400'
            } ${isComputerThinking ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            onClick={() => handleClick(i)}
            whileHover={!isComputerThinking ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!isComputerThinking ? { scale: 0.95 } : {}}
            disabled={isComputerThinking}
          >
            {square}
          </motion.button>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          {gameMode === 'computer' 
            ? 'You play as X, AI plays as O. Try to beat the computer!' 
            : 'Player 1 is X, Player 2 is O. Take turns to play!'
          }
        </p>
      </div>
    </motion.div>
  )
}

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null)
  const [computerChoice, setComputerChoice] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [streak, setStreak] = useState(0)

  const choices = useMemo(() => ['rock', 'paper', 'scissors'], [])

  const getComputerChoice = useCallback(() => choices[Math.floor(Math.random() * 3)], [choices])

  const determineWinner = useCallback((player: string, computer: string) => {
    if (player === computer) return 'tie'
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) return 'player'
    return 'computer'
  }, [])

  const handleChoice = useCallback((choice: string) => {
    const computer = getComputerChoice()
    setPlayerChoice(choice)
    setComputerChoice(computer)
    
    const winner = determineWinner(choice, computer)
    if (winner === 'player') {
      setResult('🎉 You win!')
      setScore(prev => ({ ...prev, player: prev.player + 1 }))
      setStreak(prev => prev + 1)
    } else if (winner === 'computer') {
      setResult('😔 Computer wins!')
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }))
      setStreak(0)
    } else {
      setResult('🤝 It\'s a tie!')
      setStreak(0)
    }
  }, [getComputerChoice, determineWinner])

  const resetGame = useCallback(() => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult('')
    setScore({ player: 0, computer: 0 })
    setStreak(0)
  }, [])

  const getEmoji = (choice: string) => {
    switch (choice) {
      case 'rock': return '🪨'
      case 'paper': return '📄'
      case 'scissors': return '✂️'
      default: return ''
    }
  }

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-green-900/40 via-green-800/30 to-emerald-900/40 rounded-2xl border border-green-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Rock Paper Scissors</h3>
            <p className="text-green-300 text-sm">Beat the AI opponent</p>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">You</div>
            <div className="text-lg text-white">{score.player}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">AI</div>
            <div className="text-lg text-white">{score.computer}</div>
          </div>
        </div>
        {streak > 0 && (
          <div className="text-yellow-400 font-bold mb-2">🔥 Win Streak: {streak}</div>
        )}
        {result && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-green-200 font-bold text-lg">{result}</p>
          </motion.div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {choices.map((choice) => (
          <motion.button
            key={choice}
            className="p-6 bg-gray-900/50 border border-green-500/30 rounded-xl hover:bg-gray-800/50 transition-all duration-200 shadow-lg"
            onClick={() => handleChoice(choice)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-3">{getEmoji(choice)}</div>
            <div className="text-white capitalize font-semibold">{choice}</div>
          </motion.button>
        ))}
      </div>
      
      {playerChoice && computerChoice && (
        <div className="text-center p-4 bg-gray-900/30 rounded-xl">
          <p className="text-gray-300 mb-2">You chose: {getEmoji(playerChoice)} vs AI: {getEmoji(computerChoice)}</p>
        </div>
      )}
    </motion.div>
  )
}

// Continue with more games...

const MemoryGame = () => {
  const [cards, setCards] = useState<Array<{id: number, emoji: string, isFlipped: boolean, isMatched: boolean}>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [bestScore, setBestScore] = useState(0)

  const emojis = ['🎮', '🎯', '🎲', '🏆', '⭐', '💎', '🔥', '⚡']

  const initializeGame = useCallback(() => {
    const gameEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    const newCards = gameEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }))
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleCardClick = useCallback((id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstId, secondId] = newFlippedCards
      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match found
        newCards[firstId].isMatched = true
        newCards[secondId].isMatched = true
        setCards(newCards)
        setFlippedCards([])
        
        // Check if game is won
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true)
          if (moves + 1 < bestScore || bestScore === 0) {
            setBestScore(moves + 1)
          }
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [cards, flippedCards, moves, bestScore])

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-yellow-900/40 via-yellow-800/30 to-orange-900/40 rounded-2xl border border-yellow-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Memory Game</h3>
            <p className="text-yellow-300 text-sm">Test your memory skills</p>
          </div>
        </div>
        <button
          onClick={initializeGame}
          className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">Moves</div>
            <div className="text-lg text-white">{moves}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">Best</div>
            <div className="text-lg text-white">{bestScore || 'N/A'}</div>
          </div>
        </div>
        {gameWon && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-yellow-200 font-bold text-lg">🎉 You won in {moves} moves!</p>
          </motion.div>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            className={`w-16 h-16 rounded-xl text-2xl font-bold transition-all duration-300 shadow-lg ${
              card.isFlipped || card.isMatched
                ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-gray-900'
                : 'bg-gray-900/50 border border-yellow-500/30 text-transparent hover:bg-gray-800/50'
            }`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={card.isMatched}
          >
            {card.emoji}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const boardSize = 20

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize)
    }
  }, [])

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection('RIGHT')
    setGameOver(false)
    setScore(0)
    setGameStarted(false)
  }, [generateFood])

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case 'UP': head.y = (head.y - 1 + boardSize) % boardSize; break
        case 'DOWN': head.y = (head.y + 1) % boardSize; break
        case 'LEFT': head.x = (head.x - 1 + boardSize) % boardSize; break
        case 'RIGHT': head.x = (head.x + 1) % boardSize; break
      }

      // Check collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        return prevSnake
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, gameOver, gameStarted, food, generateFood, score, highScore])

  useEffect(() => {
    const interval = setInterval(moveSnake, 200)
    return () => clearInterval(interval)
  }, [moveSnake])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && e.key === ' ') {
        setGameStarted(true)
        return
      }

      switch (e.key) {
        case 'ArrowUp': setDirection('UP'); break
        case 'ArrowDown': setDirection('DOWN'); break
        case 'ArrowLeft': setDirection('LEFT'); break
        case 'ArrowRight': setDirection('RIGHT'); break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted])

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-red-900/40 via-red-800/30 to-pink-900/40 rounded-2xl border border-red-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Snake Game</h3>
            <p className="text-red-300 text-sm">Classic arcade action</p>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="p-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">Score</div>
            <div className="text-lg text-white">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">Best</div>
            <div className="text-lg text-white">{highScore}</div>
          </div>
        </div>
        {!gameStarted && (
          <p className="text-red-400 text-sm mb-2">Press SPACE to start</p>
        )}
        {gameOver && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-red-200 font-bold text-lg">Game Over! Final Score: {score}</p>
          </motion.div>
        )}
      </div>
      
      <div className="bg-gray-900/50 rounded-xl p-4 mx-auto w-fit shadow-lg">
        <div 
          className="grid gap-0"
          style={{ 
            gridTemplateColumns: `repeat(${boardSize}, 10px)`,
            gridTemplateRows: `repeat(${boardSize}, 10px)`
          }}
        >
          {Array.from({ length: boardSize * boardSize }, (_, i) => {
            const x = i % boardSize
            const y = Math.floor(i / boardSize)
            const isSnake = snake.some(segment => segment.x === x && segment.y === y)
            const isFood = food.x === x && food.y === y
            
            return (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-sm ${
                  isSnake ? 'bg-green-400 shadow-sm' : isFood ? 'bg-red-400 shadow-sm' : 'bg-gray-700'
                }`}
              />
            )
          })}
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm">Use arrow keys to control the snake</p>
      </div>
    </motion.div>
  )
}

const ColorMatchGame = () => {
  const [currentColor, setCurrentColor] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan']

  const generateNewRound = useCallback(() => {
    const colorNames = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan']
    const colorValues = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316', '#ec4899', '#06b6d4']
    
    const randomIndex = Math.floor(Math.random() * colors.length)
    const correctColor = colors[randomIndex]
    const correctValue = colorValues[randomIndex]
    
    // Generate 3 random options including the correct one
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5)
    const gameOptions = [correctColor, ...shuffledColors.filter(c => c !== correctColor).slice(0, 2)]
    const shuffledOptions = gameOptions.sort(() => Math.random() - 0.5)
    
    setCurrentColor(correctValue)
    setOptions(shuffledOptions)
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(30)
    setGameActive(true)
    generateNewRound()
  }, [generateNewRound])

  const handleColorSelect = useCallback((selectedColor: string) => {
    if (!gameActive) return
    
    const colorNames = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan']
    const colorValues = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316', '#ec4899', '#06b6d4']
    
    const correctColorIndex = colorValues.indexOf(currentColor)
    const correctColorName = colorNames[correctColorIndex]
    
    if (selectedColor === correctColorName) {
      setScore(prev => prev + 1)
    }
    
    generateNewRound()
  }, [currentColor, gameActive, generateNewRound])

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      if (score > highScore) {
        setHighScore(score)
      }
    }
  }, [timeLeft, gameActive, score, highScore])

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-indigo-900/40 via-indigo-800/30 to-purple-900/40 rounded-2xl border border-indigo-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Color Match</h3>
            <p className="text-indigo-300 text-sm">Match the color name</p>
          </div>
        </div>
        <button
          onClick={startGame}
          disabled={gameActive}
          className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
        >
          <Play className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-400">Score</div>
            <div className="text-lg text-white">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">Best</div>
            <div className="text-lg text-white">{highScore}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">Time</div>
            <div className="text-lg text-white">{timeLeft}s</div>
          </div>
        </div>
        
        {!gameActive && timeLeft === 30 && (
          <p className="text-indigo-400 text-sm">Click Play to start!</p>
        )}
        
        {!gameActive && timeLeft === 0 && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-indigo-200 font-bold text-lg">Game Over! Final Score: {score}</p>
          </motion.div>
        )}
      </div>
      
      {gameActive && (
        <div className="space-y-6">
          <div className="text-center">
            <div 
              className="w-32 h-32 mx-auto rounded-2xl shadow-lg border-4 border-white/20"
              style={{ backgroundColor: currentColor }}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {options.map((option) => (
              <motion.button
                key={option}
                className="px-6 py-4 bg-gray-900/50 border border-indigo-500/30 rounded-xl hover:bg-gray-800/50 transition-all duration-200 text-white font-semibold text-lg shadow-lg"
                onClick={() => handleColorSelect(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

const WordGuessGame = () => {
  const [word, setWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameMode, setGameMode] = useState<'single' | 'vsComputer'>('single')
  const [computerScore, setComputerScore] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)

  const words = ['JAVASCRIPT', 'REACT', 'TYPESCRIPT', 'NEXTJS', 'TAILWIND', 'FRAMER', 'ANIMATION', 'GAMING', 'PREMIUM', 'EXPERIENCE']

  const currentWord = useMemo(() => {
    return words[Math.floor(Math.random() * words.length)]
  }, [gameWon, gameLost])

  const displayWord = useMemo(() => {
    return currentWord.split('').map(letter => 
      guessedLetters.has(letter) ? letter : '_'
    ).join(' ')
  }, [currentWord, guessedLetters])

  const handleGuess = useCallback((letter: string) => {
    if (gameWon || gameLost || guessedLetters.has(letter)) return

    const newGuessedLetters = new Set(guessedLetters)
    newGuessedLetters.add(letter)
    setGuessedLetters(newGuessedLetters)

    if (!currentWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1
      setWrongGuesses(newWrongGuesses)
      
      if (newWrongGuesses >= 6) {
        setGameLost(true)
        if (gameMode === 'vsComputer') {
          setComputerScore(prev => prev + 1)
        }
      }
    } else {
      // Check if word is complete
      const isComplete = currentWord.split('').every(letter => newGuessedLetters.has(letter))
      if (isComplete) {
        setGameWon(true)
        setScore(prev => prev + 1)
        setPlayerScore(prev => prev + 1)
        if (score + 1 > highScore) {
          setHighScore(score + 1)
        }
      }
    }
  }, [currentWord, guessedLetters, wrongGuesses, gameWon, gameLost, gameMode, score, highScore])

  const computerGuess = useCallback(() => {
    if (gameMode === 'vsComputer' && !gameWon && !gameLost) {
      const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => !guessedLetters.has(letter))
      if (availableLetters.length > 0) {
        const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)]
        setTimeout(() => handleGuess(randomLetter), 500)
      }
    }
  }, [gameMode, gameWon, gameLost, guessedLetters, handleGuess])

  const resetGame = useCallback(() => {
    setGuessedLetters(new Set())
    setWrongGuesses(0)
    setGameWon(false)
    setGameLost(false)
  }, [])

  const resetScores = useCallback(() => {
    setPlayerScore(0)
    setComputerScore(0)
    setScore(0)
    setHighScore(0)
  }, [])

  const hangmanParts = [
    'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'
  ]

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-teal-900/40 via-teal-800/30 to-cyan-900/40 rounded-2xl border border-teal-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl">
            <Type className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Word Guessing</h3>
            <p className="text-teal-300 text-sm">Guess the word before it's too late!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setGameMode(gameMode === 'single' ? 'vsComputer' : 'single')}
            className="p-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200"
            title={gameMode === 'single' ? 'Switch to vs Computer' : 'Switch to Single Player'}
          >
            <Users className="w-4 h-4" />
          </button>
          <button
            onClick={resetScores}
            className="p-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
            title="Reset Scores"
          >
            <Trophy className="w-4 h-4" />
          </button>
          <button
            onClick={resetGame}
            className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hangman Drawing */}
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4">
            {/* Gallows */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gray-400"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-48 bg-gray-400"></div>
            <div className="absolute bottom-0 left-0 w-48 h-2 bg-gray-400"></div>
            
            {/* Hangman */}
            {wrongGuesses >= 1 && <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full"></div>}
            {wrongGuesses >= 2 && <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-red-500"></div>}
            {wrongGuesses >= 3 && <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-red-500 transform -rotate-45 origin-left"></div>}
            {wrongGuesses >= 4 && <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-red-500 transform rotate-45 origin-right"></div>}
            {wrongGuesses >= 5 && <div className="absolute top-22 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-red-500 transform -rotate-45 origin-left"></div>}
            {wrongGuesses >= 6 && <div className="absolute top-22 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-red-500 transform rotate-45 origin-right"></div>}
          </div>
          
          <div className="text-center mb-4">
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-teal-400">You</div>
                <div className="text-white">{playerScore}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-400">Computer</div>
                <div className="text-white">{computerScore}</div>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              gameMode === 'single' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            }`}>
              {gameMode === 'single' ? <Gamepad2 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              {gameMode === 'single' ? 'Single Player' : 'vs Computer'}
            </div>
          </div>
        </div>
        
        {/* Game Area */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-white mb-4 tracking-wider">
              {displayWord}
            </div>
            <div className="text-sm text-gray-400 mb-4">
              Wrong guesses: {wrongGuesses}/6
            </div>
            {gameWon && (
              <motion.div 
                className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-green-200 font-bold text-lg">🎉 You won! The word was: {currentWord}</p>
              </motion.div>
            )}
            {gameLost && (
              <motion.div 
                className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-red-200 font-bold text-lg">💀 Game Over! The word was: {currentWord}</p>
              </motion.div>
            )}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <motion.button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.has(letter) || gameWon || gameLost}
                className={`w-10 h-10 rounded-lg font-bold transition-all duration-200 ${
                  guessedLetters.has(letter)
                    ? currentWord.includes(letter)
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-900/50 border border-teal-500/30 text-white hover:bg-gray-800/50 hover:border-teal-400'
                } ${(gameWon || gameLost) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                whileHover={!(gameWon || gameLost) ? { scale: 1.1 } : {}}
                whileTap={!(gameWon || gameLost) ? { scale: 0.95 } : {}}
              >
                {letter}
              </motion.button>
            ))}
          </div>
          
          {gameMode === 'vsComputer' && (
            <div className="text-center">
              <button
                onClick={computerGuess}
                disabled={gameWon || gameLost}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
              >
                🤖 Computer Guess
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const MathChallengeGame = () => {
  const [currentProblem, setCurrentProblem] = useState({ question: '', answer: 0 })
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  const generateProblem = useCallback(() => {
    let question = ''
    let answer = 0
    
    switch (difficulty) {
      case 'easy':
        const a = Math.floor(Math.random() * 10) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const operators = ['+', '-', '*']
        const operator = operators[Math.floor(Math.random() * operators.length)]
        
        switch (operator) {
          case '+': answer = a + b; break
          case '-': answer = a - b; break
          case '*': answer = a * b; break
        }
        question = `${a} ${operator} ${b} = ?`
        break
        
      case 'medium':
        const c = Math.floor(Math.random() * 20) + 1
        const d = Math.floor(Math.random() * 20) + 1
        const e = Math.floor(Math.random() * 10) + 1
        const medOperators = ['+', '-', '*', '/']
        const medOperator = medOperators[Math.floor(Math.random() * medOperators.length)]
        
        switch (medOperator) {
          case '+': answer = c + d + e; question = `${c} + ${d} + ${e} = ?`; break
          case '-': answer = c - d; question = `${c} - ${d} = ?`; break
          case '*': answer = c * d; question = `${c} × ${d} = ?`; break
          case '/': 
            answer = c; 
            question = `${c * d} ÷ ${d} = ?`; 
            break
        }
        break
        
      case 'hard':
        const f = Math.floor(Math.random() * 50) + 1
        const g = Math.floor(Math.random() * 50) + 1
        const h = Math.floor(Math.random() * 20) + 1
        const hardOperators = ['+', '-', '*', '/', '^']
        const hardOperator = hardOperators[Math.floor(Math.random() * hardOperators.length)]
        
        switch (hardOperator) {
          case '+': answer = f + g + h; question = `${f} + ${g} + ${h} = ?`; break
          case '-': answer = f - g; question = `${f} - ${g} = ?`; break
          case '*': answer = f * g; question = `${f} × ${g} = ?`; break
          case '/': answer = f; question = `${f * g} ÷ ${g} = ?`; break
          case '^': answer = Math.pow(f, 2); question = `${f}² = ?`; break
        }
        break
    }
    
    setCurrentProblem({ question, answer })
  }, [difficulty])

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(60)
    setGameActive(true)
    setStreak(0)
    generateProblem()
  }, [generateProblem])

  const handleSubmit = useCallback(() => {
    if (!gameActive) return
    
    const numAnswer = parseInt(userAnswer)
    if (isNaN(numAnswer)) return
    
    if (numAnswer === currentProblem.answer) {
      setScore(prev => prev + 1)
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }
    
    setUserAnswer('')
    generateProblem()
  }, [gameActive, userAnswer, currentProblem.answer, generateProblem])

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      if (score > highScore) {
        setHighScore(score)
      }
    }
  }, [timeLeft, gameActive, score, highScore])

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-orange-900/40 via-orange-800/30 to-red-900/40 rounded-2xl border border-orange-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Math Challenge</h3>
            <p className="text-orange-300 text-sm">Solve math problems quickly!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            className="px-3 py-2 bg-gray-900/50 border border-orange-500/30 rounded-lg text-white text-sm"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={startGame}
            disabled={gameActive}
            className="p-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
          >
            <Play className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">Score</div>
            <div className="text-lg text-white">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">Best</div>
            <div className="text-lg text-white">{highScore}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">Time</div>
            <div className="text-lg text-white">{timeLeft}s</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">Streak</div>
            <div className="text-lg text-white">{streak}</div>
          </div>
        </div>
        
        {!gameActive && timeLeft === 60 && (
          <p className="text-orange-400 text-sm">Click Play to start!</p>
        )}
        
        {!gameActive && timeLeft === 0 && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-orange-200 font-bold text-lg">Game Over! Final Score: {score}</p>
          </motion.div>
        )}
      </div>
      
      {gameActive && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-6">
              {currentProblem.question}
            </div>
          </div>
          
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 px-6 py-4 bg-gray-900/50 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 text-center text-2xl font-bold"
              placeholder="Answer"
            />
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

const PuzzleSliderGame = () => {
  const [tiles, setTiles] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [bestMoves, setBestMoves] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const initializePuzzle = useCallback(() => {
    const size = 3
    const totalTiles = size * size
    const newTiles = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1)
    newTiles.push(0) // Empty tile
    
    // Shuffle tiles
    for (let i = newTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]]
    }
    
    setTiles(newTiles)
    setMoves(0)
    setGameWon(false)
    setTimeElapsed(0)
    setGameStarted(false)
  }, [])

  useEffect(() => {
    initializePuzzle()
  }, [initializePuzzle])

  useEffect(() => {
    if (gameStarted && !gameWon) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameWon])

  const canMove = useCallback((index: number) => {
    const size = 3
    const emptyIndex = tiles.indexOf(0)
    const row = Math.floor(index / size)
    const col = index % size
    const emptyRow = Math.floor(emptyIndex / size)
    const emptyCol = emptyIndex % size
    
    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  }, [tiles])

  const moveTile = useCallback((index: number) => {
    if (!canMove(index) || gameWon) return
    
    const newTiles = [...tiles]
    const emptyIndex = newTiles.indexOf(0)
    ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
    
    setTiles(newTiles)
    setMoves(prev => prev + 1)
    
    if (!gameStarted) {
      setGameStarted(true)
    }
    
    // Check if puzzle is solved
    const solved = newTiles.every((tile, i) => {
      if (i === newTiles.length - 1) return tile === 0
      return tile === i + 1
    })
    
    if (solved) {
      setGameWon(true)
      if (moves + 1 < bestMoves || bestMoves === 0) {
        setBestMoves(moves + 1)
      }
    }
  }, [tiles, canMove, gameWon, gameStarted, moves, bestMoves])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-green-900/40 rounded-2xl border border-emerald-500/20 backdrop-blur-xl shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
            <Puzzle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Puzzle Slider</h3>
            <p className="text-emerald-300 text-sm">Arrange the tiles in order!</p>
          </div>
        </div>
        <button
          onClick={initializePuzzle}
          className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">Moves</div>
            <div className="text-lg text-white">{moves}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">Best</div>
            <div className="text-lg text-white">{bestMoves || 'N/A'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">Time</div>
            <div className="text-lg text-white">{formatTime(timeElapsed)}</div>
          </div>
        </div>
        
        {gameWon && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl border border-emerald-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-emerald-200 font-bold text-lg">🎉 Puzzle solved in {moves} moves!</p>
          </motion.div>
        )}
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2 w-48 h-48">
          {tiles.map((tile, index) => (
            <motion.button
              key={index}
              onClick={() => moveTile(index)}
              disabled={!canMove(index) || gameWon}
              className={`w-16 h-16 rounded-xl text-2xl font-bold transition-all duration-200 shadow-lg ${
                tile === 0
                  ? 'bg-transparent border-2 border-dashed border-emerald-500/30'
                  : canMove(index) && !gameWon
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 cursor-pointer'
                  : 'bg-gray-900/50 border border-emerald-500/30 text-white cursor-not-allowed opacity-50'
              }`}
              whileHover={canMove(index) && !gameWon ? { scale: 1.1 } : {}}
              whileTap={canMove(index) && !gameWon ? { scale: 0.95 } : {}}
            >
              {tile !== 0 ? tile : ''}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">Click adjacent tiles to move them to the empty space</p>
      </div>
    </motion.div>
  )
}

// Main Game Page Component
export default function GamePage() {
  const { data: session, status } = useSession()
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const games = useMemo(() => [
    { id: 'number-guess', name: 'Number Guessing', emoji: '🎯', component: NumberGuessGame, difficulty: 'Easy' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', emoji: '⭕', component: TicTacToe, difficulty: 'Easy' },
    { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', emoji: '🪨', component: RockPaperScissors, difficulty: 'Easy' },
    { id: 'memory', name: 'Memory Game', emoji: '🧠', component: MemoryGame, difficulty: 'Medium' },
    { id: 'snake', name: 'Snake Game', emoji: '🐍', component: SnakeGame, difficulty: 'Hard' },
    { id: 'color-match', name: 'Color Match', emoji: '🎨', component: ColorMatchGame, difficulty: 'Medium' },
    { id: 'word-guess', name: 'Word Guessing', emoji: '📝', component: WordGuessGame, difficulty: 'Medium' },
    { id: 'math-challenge', name: 'Math Challenge', emoji: '🧮', component: MathChallengeGame, difficulty: 'Hard' },
    { id: 'puzzle-slider', name: 'Puzzle Slider', emoji: '🧩', component: PuzzleSliderGame, difficulty: 'Hard' }
  ], [])

  // Early returns for loading and authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please log in to access games</h1>
          <Link
            href="/login"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 relative overflow-hidden">
      <PremiumParticles />
      
      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                Beloop AI
              </Link>
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Premium Gaming</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <Link
                href="/chat"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Chat
              </Link>
              
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                Home
              </Link>

              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                <Gem className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">{session.user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {selectedGame ? (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Games
              </button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {(() => {
                const game = games.find(game => game.id === selectedGame)
                if (!game) return null
                const GameComponent = game.component
                return <GameComponent />
              })()}
            </motion.div>
          </div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Crown className="w-12 h-12 text-cyan-400" />
                Premium Gaming Experience
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Immerse yourself in our collection of premium games. Each game features stunning visuals, 
                smooth animations, and engaging gameplay designed for the ultimate gaming experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer group"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-2xl">
                    <div className="text-center">
                      <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">{game.emoji}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                          game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {game.difficulty}
                        </div>
                      </div>
                      <div className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl inline-block text-sm font-semibold group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-200">
                        Play Now
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
