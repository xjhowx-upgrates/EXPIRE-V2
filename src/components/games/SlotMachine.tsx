import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useTime } from '../../contexts/TimeContext'

interface SlotMachineProps {
  onGameEnd: (score: number, minutesSpent: number) => void
}

const SlotMachine: React.FC<SlotMachineProps> = ({ onGameEnd }) => {
  const { spendMinutes } = useTime()
  const [reels, setReels] = useState(['🍎', '🍊', '🍋'])
  const [isSpinning, setIsSpinning] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const symbols = ['🍎', '🍊', '🍋', '🍇', '🍒', '🔔', '💎', '⭐']

  const spin = async () => {
    if (!gameStarted) {
      const canPlay = await spendMinutes(5) // 5 minutos por jogada
      if (!canPlay) {
        alert('Você não tem minutos suficientes!')
        return
      }
      setGameStarted(true)
    }

    setIsSpinning(true)
    
    // Simular spinning
    const spinDuration = 2000
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ])
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      setIsSpinning(false)
      
      // Resultado final
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]
      setReels(finalReels)
      
      // Calcular pontuação
      let points = 0
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        points = 1000 // Três iguais
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
        points = 100 // Dois iguais
      } else {
        points = 10 // Participação
      }
      
      setScore(prev => prev + points)
    }, spinDuration)
  }

  const endGame = () => {
    onGameEnd(score, 5)
    setGameStarted(false)
    setScore(0)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Slot Machine</h2>
        <p className="text-gray-600 dark:text-gray-400">5 minutos por jogada</p>
      </div>

      {/* Slot Reels */}
      <div className="flex justify-center gap-4 mb-6">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className={`w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-4xl border-4 border-gray-300 dark:border-gray-600 ${
              isSpinning ? 'animate-bounce' : ''
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Score */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {score.toLocaleString()} pts
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {isSpinning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isSpinning ? 'Girando...' : 'Girar'}
        </button>
        
        {gameStarted && (
          <button
            onClick={endGame}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Finalizar
          </button>
        )}
      </div>
    </div>
  )
}

export default SlotMachine