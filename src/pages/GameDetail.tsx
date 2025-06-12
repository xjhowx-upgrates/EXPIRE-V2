import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Play, ArrowLeft, Trophy, Users, Star, Clock } from 'lucide-react'
import { GameService } from '../services/gameService'
import { Game } from '../lib/supabase'
import slotGames from '../data/slotGames'
import { useAuth } from '../hooks/useAuth'

const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [game, setGame] = useState<any>(null)
  const [topScores, setTopScores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (gameId) {
      loadGame()
      loadTopScores()
    }
  }, [gameId])

  const loadGame = async () => {
    try {
      // For now, use static data
      const gameData = slotGames.find(g => g.id === gameId)
      setGame(gameData)
    } catch (error) {
      console.error('Error loading game:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTopScores = async () => {
    try {
      // Mock top scores
      setTopScores([
        { id: 1, score: 15420, profiles: { display_name: 'ProGamer123' } },
        { id: 2, score: 12350, profiles: { display_name: 'SlotMaster' } },
        { id: 3, score: 11200, profiles: { display_name: 'CrashKing' } },
        { id: 4, score: 9800, profiles: { display_name: 'LuckyPlayer' } },
        { id: 5, score: 8750, profiles: { display_name: 'GameMaster' } },
      ])
    } catch (error) {
      console.error('Error loading top scores:', error)
    }
  }

  const handlePlayGame = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    // Navigate to game play page (would be implemented)
    navigate(`/play/${gameId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando jogo...</p>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Jogo não encontrado.</p>
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
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <button
            onClick={() => navigate('/games')}
            className="absolute top-6 left-4 text-white hover:text-gray-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Jogos
          </button>
          
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="w-48 h-48 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://via.placeholder.com/400x200?text=Jogo"
                }}
              />
            </div>
            
            <div className="flex-1 text-white text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{game.title}</h1>
              <p className="text-xl mb-6 opacity-90">{game.description}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <span className="text-sm">Provedor: {game.provider}</span>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <span className="text-sm">RTP: {game.rtp}%</span>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <span className="text-sm">Volatilidade: {game.volatility}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlayGame}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors flex items-center gap-2 mx-auto md:mx-0"
              >
                <Play className="w-6 h-6" />
                Jogar Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Características do Jogo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{game.rtp}%</p>
                  <p className="text-sm text-gray-600">RTP</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">1.2k</p>
                  <p className="text-sm text-gray-600">Jogadores</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">4.8</p>
                  <p className="text-sm text-gray-600">Avaliação</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">5min</p>
                  <p className="text-sm text-gray-600">Tempo Médio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Scores */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">🏆 Melhores Pontuações</h3>
              <div className="space-y-3">
                {topScores.map((score, index) => (
                  <div key={score.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{score.profiles.display_name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{score.score.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Como Jogar</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Faça sua aposta antes de começar</p>
                <p>• Use os controles para interagir com o jogo</p>
                <p>• Ganhe pontos baseados na sua performance</p>
                <p>• Compete com outros jogadores no ranking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetail