import { supabase } from '../lib/supabase'
import { Game, GameScore, GameSession } from '../lib/supabase'

export class GameService {
  static async getAllGames(): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getGameBySlug(slug: string): Promise<Game | null> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  }

  static async saveScore(gameId: number, score: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { error } = await supabase
      .from('game_scores')
      .insert({
        user_id: user.id,
        game_id: gameId,
        score: score,
      })

    if (error) throw error
  }

  static async getUserScores(userId: string): Promise<GameScore[]> {
    const { data, error } = await supabase
      .from('game_scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getTopScores(gameId: number, limit: number = 10): Promise<GameScore[]> {
    const { data, error } = await supabase
      .from('game_scores')
      .select(`
        *,
        profiles!inner(display_name)
      `)
      .eq('game_id', gameId)
      .order('score', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  static async createGameSession(gameType: string): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('game_sessions')
      .insert({
        user_id: user.id,
        game_type: gameType,
      })
      .select()
      .single()

    if (error) throw error
    return data.id
  }

  static async endGameSession(sessionId: string, coinsSpent: number, coinsWon: number): Promise<void> {
    const { error } = await supabase
      .from('game_sessions')
      .update({
        end_time: new Date().toISOString(),
        coins_spent: coinsSpent,
        coins_won: coinsWon,
      })
      .eq('id', sessionId)

    if (error) throw error
  }
}