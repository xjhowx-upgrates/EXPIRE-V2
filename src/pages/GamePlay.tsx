import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'
import SlotMachine from '../components/games/SlotMachine'
import CrashGame from '../components/games/CrashGame'
import RouletteGame from '../components/games/RouletteGame'
import slotGames from '../data/slotGames'
import { useAuth } from '../hooks/useAuth'
import { GameService } from '../services/gameService'

const GamePlay: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [game, setGame] = useState<any>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [totalMinutesSpent, setTotalMinutesSpent] = useState(0)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    if (gameId) {
      const gameData = slotGames.find(g => g.id === gameId)
      setGame(gameData)
    }
  }, [gameId, currentUser, navigate])

  const handleGameEnd = async (score: number, minutesSpent: number) => {
    setTotalScore(prev => prev + score)
    setTotalMinutesSpent(prev => prev + minutesSpent)

    // Salvar pontuação no banco de dados
    try {
      // Como não temos game_id real, vamos usar um mock
      await GameService.saveScore(1, score)
    } catch (error) {
      console.error('Error saving score:', error)
    }
  }

  const renderGame = () => {
    if (!game) return null

    switch (game.category) {
      case 'slots':
        return <SlotMachine onGameEnd={handleGameEnd} />
      case 'crash':
        return <CrashGame onGameEnd={handleGameEnd} />
      case 'table':
        return <RouletteGame onGameEnd={handleGameEnd} />
      default:
        return <SlotMachine onGameEnd={handleGameEnd} />
    }
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Jogo não encontrado.</p>
          <button
            onClick={() => navigate('/games')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar aos Jogos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Jogos
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{game.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{game.provider}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalScore.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Pontos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {totalMinutesSpent}m
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Gastos</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex justify-center">
          {renderGame()}
        </div>

        {/* Game Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Como Jogar</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Cada jogada custa alguns minutos do seu tempo</li>
              <li>• Ganhe pontos baseados na sua performance</li>
              <li>• Compete com outros jogadores no ranking</li>
              <li>• Desbloqueie conquistas jogando</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">RTP:</span>
                <span className="font-medium text-gray-900 dark:text-white">{game.rtp}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Volatilidade:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{game.volatility}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Provedor:</span>
                <span className="font-medium text-gray-900 dark:text-white">{game.provider}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePlay