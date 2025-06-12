import React, { useEffect, useState } from 'react'
import { User, Trophy, Clock, Settings, Edit2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { ProfileService } from '../services/profileService'
import { GameService } from '../services/gameService'
import { Profile, GameScore } from '../lib/supabase'

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userScores, setUserScores] = useState<GameScore[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    if (currentUser) {
      loadProfile()
      loadUserScores()
    }
  }, [currentUser])

  const loadProfile = async () => {
    if (!currentUser) return

    try {
      const profileData = await ProfileService.getProfile(currentUser.id)
      setProfile(profileData)
      setDisplayName(profileData?.display_name || '')
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const loadUserScores = async () => {
    if (!currentUser) return

    try {
      const scores = await GameService.getUserScores(currentUser.id)
      setUserScores(scores)
    } catch (error) {
      console.error('Error loading user scores:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!currentUser || !profile) return

    try {
      await ProfileService.updateProfile(currentUser.id, {
        display_name: displayName,
      })
      setProfile({ ...profile, display_name: displayName })
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Você precisa estar logado para ver seu perfil.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  const totalScore = userScores.reduce((sum, score) => sum + score.score, 0)
  const gamesPlayed = userScores.length
  const bestScore = userScores.length > 0 ? Math.max(...userScores.map(s => s.score)) : 0

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {(profile?.display_name || currentUser.email || 'U').charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="text-2xl font-bold border-b-2 border-blue-500 focus:outline-none bg-transparent"
                      placeholder="Seu nome"
                    />
                    <button
                      onClick={handleUpdateProfile}
                      className="text-green-600 hover:text-green-700"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">
                      {profile?.display_name || 'Jogador'}
                    </h1>
                    <button
                      onClick={() => setEditing(true)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-gray-600 mb-4">{currentUser.email}</p>
              <p className="text-sm text-gray-500">
                Membro desde {new Date(profile?.created_at || currentUser.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{totalScore.toLocaleString()}</h3>
            <p className="text-gray-600">Pontuação Total</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <User className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{gamesPlayed}</h3>
            <p className="text-gray-600">Jogos Jogados</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Trophy className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{bestScore.toLocaleString()}</h3>
            <p className="text-gray-600">Melhor Pontuação</p>
          </div>
        </div>

        {/* Recent Scores */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Pontuações Recentes</h2>
          
          {userScores.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Você ainda não jogou nenhum jogo.</p>
              <p className="text-gray-400 text-sm mt-2">Comece jogando para ver suas pontuações aqui!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userScores.slice(0, 10).map((score, index) => (
                <div key={score.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium">Jogo #{score.game_id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(score.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {score.score.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">pontos</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage