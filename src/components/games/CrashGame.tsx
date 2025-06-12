import React, { useState, useEffect, useRef } from 'react'
import { TrendingUp, DollarSign, X } from 'lucide-react'
import { useTime } from '../../contexts/TimeContext'

interface CrashGameProps {
  onGameEnd: (score: number, minutesSpent: number) => void
}

const CrashGame: React.FC<CrashGameProps> = ({ onGameEnd }) => {
  const { spendMinutes } = useTime()
  const [multiplier, setMultiplier] = useState(1.00)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasCrashed, setHasCrashed] = useState(false)
  const [cashedOut, setCashedOut] = useState(false)
  const [bet, setBet] = useState(10)
  const [gameStarted, setGameStarted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const startGame = async () => {
    const canPlay = await spendMinutes(3) // 3 minutos por jogo
    if (!canPlay) {
      alert('Você não tem minutos suficientes!')
      return
    }

    setGameStarted(true)
    setIsPlaying(true)
    setHasCrashed(false)
    setCashedOut(false)
    setMultiplier(1.00)

    // Simular o crash game
    const crashPoint = 1 + Math.random() * 10 // Crash entre 1x e 11x
    let currentMultiplier = 1.00

    intervalRef.current = setInterval(() => {
      currentMultiplier += 0.01
      setMultiplier(currentMultiplier)

      if (currentMultiplier >= crashPoint) {
        setHasCrashed(true)
        setIsPlaying(false)
        clearInterval(intervalRef.current!)
        
        if (!cashedOut) {
          // Perdeu
          onGameEnd(0, 3)
          setGameStarted(false)
        }
      }
    }, 100)
  }

  const cashOut = () => {
    if (isPlaying && !hasCrashed) {
      setCashedOut(true)
      setIsPlaying(false)
      clearInterval(intervalRef.current!)
      
      const score = Math.floor(bet * multiplier)
      onGameEnd(score, 3)
      setGameStarted(false)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setIsPlaying(false)
    setHasCrashed(false)
    setCashedOut(false)
    setMultiplier(1.00)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Crash Game</h2>
        <p className="text-gray-600 dark:text-gray-400">3 minutos por jogo</p>
      </div>

      {/* Multiplier Display */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-2 ${
          hasCrashed ? 'text-red-500' : 
          cashedOut ? 'text-green-500' : 
          'text-blue-600 dark:text-blue-400'
        }`}>
          {multiplier.toFixed(2)}x
        </div>
        {hasCrashed && !cashedOut && (
          <div className="text-red-500 font-bold">CRASHED!</div>
        )}
        {cashedOut && (
          <div className="text-green-500 font-bold">CASHED OUT!</div>
        )}
      </div>

      {/* Bet Input */}
      {!gameStarted && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Aposta (pontos)
          </label>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            min="1"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            Iniciar Jogo
          </button>
        ) : isPlaying ? (
          <button
            onClick={cashOut}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <DollarSign className="w-5 h-5" />
            Cash Out
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <X className="w-5 h-5" />
            Novo Jogo
          </button>
        )}
      </div>
    </div>
  )
}

export default CrashGame