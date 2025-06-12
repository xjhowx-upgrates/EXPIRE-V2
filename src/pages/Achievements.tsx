import React, { useEffect, useState } from 'react'
import { Trophy, Star, Target, Zap, Award, Lock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const Achievements: React.FC = () => {
  const { currentUser } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  useEffect(() => {
    loadAchievements()
  }, [currentUser])

  const loadAchievements = async () => {
    // Mock achievements data - in production, this would come from the database
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Primeiro Passo',
        description: 'Jogue seu primeiro jogo',
        icon: <Star className="w-6 h-6" />,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: 'common'
      },
      {
        id: '2',
        title: 'Viciado em Jogos',
        description: 'Jogue 10 jogos diferentes',
        icon: <Target className="w-6 h-6" />,
        unlocked: false,
        progress: 3,
        maxProgress: 10,
        rarity: 'rare'
      },
      {
        id: '3',
        title: 'Pontuação Alta',
        description: 'Alcance 1000 pontos em um único jogo',
        icon: <Zap className="w-6 h-6" />,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: 'epic'
      },
      {
        id: '4',
        title: 'Mestre dos Slots',
        description: 'Ganhe 10 vezes seguidas em slots',
        icon: <Trophy className="w-6 h-6" />,
        unlocked: false,
        progress: 2,
        maxProgress: 10,
        rarity: 'legendary'
      },
      {
        id: '5',
        title: 'Crash Survivor',
        description: 'Saque antes do crash 50 vezes',
        icon: <Award className="w-6 h-6" />,
        unlocked: false,
        progress: 15,
        maxProgress: 50,
        rarity: 'epic'
      },
      {
        id: '6',
        title: 'Jogador Dedicado',
        description: 'Jogue por 7 dias consecutivos',
        icon: <Star className="w-6 h-6" />,
        unlocked: false,
        progress: 3,
        maxProgress: 7,
        rarity: 'rare'
      }
    ]

    setAchievements(mockAchievements)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50'
      case 'rare':
        return 'border-blue-300 bg-blue-50'
      case 'epic':
        return 'border-purple-300 bg-purple-50'
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600'
      case 'rare':
        return 'text-blue-600'
      case 'epic':
        return 'text-purple-600'
      case 'legendary':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked
    if (filter === 'locked') return !achievement.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🏆 Conquistas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Desbloqueie conquistas jogando e dominando diferentes jogos na plataforma EXPIRE.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Progresso Geral</span>
              <span className="text-2xl font-bold text-blue-600">
                {unlockedCount}/{totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.round((unlockedCount / totalCount) * 100)}% completo
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todas ({totalCount})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'unlocked'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Desbloqueadas ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'locked'
                ? 'bg-gray-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Bloqueadas ({totalCount - unlockedCount})
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                achievement.unlocked
                  ? getRarityColor(achievement.rarity)
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-full ${
                  achievement.unlocked
                    ? getRarityColor(achievement.rarity)
                    : 'bg-gray-200'
                }`}>
                  {achievement.unlocked ? (
                    <div className={getRarityTextColor(achievement.rarity)}>
                      {achievement.icon}
                    </div>
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <div className="text-right">
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                    achievement.unlocked
                      ? `${getRarityTextColor(achievement.rarity)} bg-opacity-20`
                      : 'text-gray-400 bg-gray-200'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
              </div>

              <h3 className={`text-xl font-bold mb-2 ${
                achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h3>
              
              <p className={`text-sm mb-4 ${
                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>

              {!achievement.unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progresso</span>
                    <span className="font-medium text-gray-700">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {achievement.unlocked && (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <Trophy className="w-4 h-4 mr-1" />
                  Desbloqueada!
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma conquista encontrada.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Achievements