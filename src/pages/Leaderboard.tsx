import React, { useEffect, useState } from 'react'
import { Trophy, Medal, Award, Crown } from 'lucide-react'
import { ProfileService } from '../services/profileService'
import { LeaderboardEntry } from '../lib/supabase'

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      const data = await ProfileService.getLeaderboard(50)
      setLeaderboard(data)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
      // Mock data for demonstration
      setLeaderboard([
        { id: '1', username: 'ProGamer123', score: 15420, rank: 1, updated_at: new Date().toISOString() },
        { id: '2', username: 'SlotMaster', score: 12350, rank: 2, updated_at: new Date().toISOString() },
        { id: '3', username: 'CrashKing', score: 11200, rank: 3, updated_at: new Date().toISOString() },
        { id: '4', username: 'LuckyPlayer', score: 9800, rank: 4, updated_at: new Date().toISOString() },
        { id: '5', username: 'GameMaster', score: 8750, rank: 5, updated_at: new Date().toISOString() },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <Trophy className="w-6 h-6 text-blue-500" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      default:
        return 'bg-white'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando classificação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🏆 Classificação</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja como você se compara aos melhores jogadores da plataforma EXPIRE.
          </p>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="mb-12">
            <div className="flex justify-center items-end gap-4 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {leaderboard[1]?.username?.charAt(0).toUpperCase() || '2'}
                </div>
                <div className="bg-gray-200 p-4 rounded-lg min-h-[120px] flex flex-col justify-end">
                  <Medal className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="font-bold text-sm">{leaderboard[1]?.username}</p>
                  <p className="text-lg font-bold text-gray-700">{leaderboard[1]?.score?.toLocaleString()}</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
                  {leaderboard[0]?.username?.charAt(0).toUpperCase() || '1'}
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg min-h-[140px] flex flex-col justify-end">
                  <Crown className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
                  <p className="font-bold">{leaderboard[0]?.username}</p>
                  <p className="text-xl font-bold text-yellow-700">{leaderboard[0]?.score?.toLocaleString()}</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {leaderboard[2]?.username?.charAt(0).toUpperCase() || '3'}
                </div>
                <div className="bg-amber-100 p-4 rounded-lg min-h-[120px] flex flex-col justify-end">
                  <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-bold text-sm">{leaderboard[2]?.username}</p>
                  <p className="text-lg font-bold text-amber-700">{leaderboard[2]?.score?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold">Classificação Completa</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  index < 3 ? getRankColor(entry.rank || index + 1) : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getRankIcon(entry.rank || index + 1)}
                    </div>
                    <span className={`text-2xl font-bold ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                      #{entry.rank || index + 1}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      index < 3 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    }`}>
                      {entry.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className={`font-bold ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                        {entry.username || 'Jogador Anônimo'}
                      </p>
                      <p className={`text-sm ${index < 3 ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                        Atualizado em {new Date(entry.updated_at || '').toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-2xl font-bold ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                    {entry.score?.toLocaleString() || '0'}
                  </p>
                  <p className={`text-sm ${index < 3 ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                    pontos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum jogador na classificação ainda.</p>
            <p className="text-gray-400">Seja o primeiro a aparecer aqui!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard