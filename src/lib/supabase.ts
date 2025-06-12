import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  display_name?: string
  avatar_url?: string
  available_minutes?: number
  created_at?: string
  updated_at?: string
}

export interface GameScore {
  id: number
  user_id: string
  game_id: number
  score: number
  created_at: string
}

export interface Game {
  id: number
  name: string
  slug: string
  description?: string
  image_url?: string
  created_at: string
}

export interface GameSession {
  id: string
  user_id?: string
  game_type: string
  start_time?: string
  end_time?: string
  coins_spent?: number
  coins_won?: number
  created_at?: string
}

export interface LeaderboardEntry {
  id: string
  user_id?: string
  username?: string
  score?: number
  rank?: number
  updated_at?: string
}