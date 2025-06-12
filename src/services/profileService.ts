import { supabase } from '../lib/supabase'
import { Profile } from '../lib/supabase'

export class ProfileService {
  static async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }

  static async updateProfile(userId: string, updates: Partial<Profile>): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) throw error
  }

  static async getLeaderboard(limit: number = 50) {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('rank', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  static async updateLeaderboardScore(userId: string, username: string, score: number): Promise<void> {
    const { error } = await supabase
      .from('leaderboard')
      .upsert({
        user_id: userId,
        username: username,
        score: score,
        updated_at: new Date().toISOString(),
      })

    if (error) throw error
  }
}