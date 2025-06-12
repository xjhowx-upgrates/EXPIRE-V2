import React, { useState } from 'react'
import { RotateCw, Target } from 'lucide-react'
import { useTime } from '../../contexts/TimeContext'

interface RouletteGameProps {
  onGameEnd: (score: number, minutesSpent: number) => void
}

const RouletteGame: React.FC<RouletteGameProps> = ({ onGameEnd }) => {
  const { spendMinutes } = useTime()
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [bet, setBet] = useState({ type: 'red', amount: 10 })
  const [gameStarted, setGameStarted] = useState(false)

  const numbers = Array.from({ length: 37 }, (_, i) => i) // 0-36
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

  const spin = async () => {
    const canPlay = await spendMinutes(4) // 4 minutos por jogada
    if (!canPlay) {
      alert('Você não tem minutos suficientes!')
      return
    }

    setGameStarted(true)
    setIsSpinning(true)
    setResult(null)

    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37)
      setResult(winningNumber)
      setIsSpinning(false)

      // Calcular pontuação
      let score = 0
      if (bet.type === 'red' && redNumbers.includes(winningNumber)) {
        score = bet.amount * 2
      } else if (bet.type === 'black' && !redNumbers.includes(winningNumber) && winningNumber !== 0) {
        score = bet.amount * 2
      } else if (bet.type === 'even' && winningNumber % 2 === 0 && winningNumber !== 0) {
        score = bet.amount * 2
      } else if (bet.type === 'odd' && winningNumber % 2 === 1) {
        score = bet.amount * 2
      }

      setTimeout(() => {
        onGameEnd(score, 4)
        setGameStarted(false)
      }, 2000)
    }, 3000)
  }

  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-green-500'
    return redNumbers.includes(num) ? 'bg-red-500' : 'bg-black'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Roleta</h2>
        <p className="text-gray-600 dark:text-gray-400">4 minutos por jogada</p>
      </div>

      {/* Roulette Wheel */}
      <div className="flex justify-center mb-6">
        <div className={`w-32 h-32 rounded-full border-8 border-gray-300 dark:border-gray-600 flex items-center justify-center ${
          isSpinning ? 'animate-spin' : ''
        } bg-gradient-to-r from-red-500 via-black to-green-500`}>
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            {result !== null && (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getNumberColor(result)}`}>
                {result}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Betting Options */}
      {!gameStarted && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Aposta
            </label>
            <select
              value={bet.type}
              onChange={(e) => setBet({ ...bet, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="red">Vermelho</option>
              <option value="black">Preto</option>
              <option value="even">Par</option>
              <option value="odd">Ímpar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Valor da Aposta
            </label>
            <input
              type="number"
              value={bet.amount}
              onChange={(e) => setBet({ ...bet, amount: Number(e.target.value) })}
              min="1"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result !== null && (
        <div className="text-center mb-6">
          <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Número vencedor:
          </div>
          <div className={`inline-block px-4 py-2 rounded-lg text-white font-bold text-xl ${getNumberColor(result)}`}>
            {result}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center">
        <button
          onClick={spin}
          disabled={isSpinning || gameStarted}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          {isSpinning ? 'Girando...' : 'Girar Roleta'}
        </button>
      </div>
    </div>
  )
}

export default RouletteGame