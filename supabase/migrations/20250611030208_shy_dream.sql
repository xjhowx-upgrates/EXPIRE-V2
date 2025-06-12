/*
  # Complete EXPIRE Database Schema

  1. New Tables
    - `profiles` - User profiles with time management
    - `games` - Game catalog
    - `game_scores` - Player scores
    - `game_sessions` - Game session tracking
    - `leaderboard` - Global rankings
    - `achievements` - User achievements
    - `user_achievements` - Achievement progress tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access patterns

  3. Functions
    - Auto-create profile on user registration
    - Update timestamps automatically
    - Leaderboard ranking system
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table with time management
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  available_minutes integer DEFAULT 120,
  total_score integer DEFAULT 0,
  games_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Games catalog
CREATE TABLE IF NOT EXISTS games (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  category text NOT NULL,
  provider text DEFAULT 'EXPIRE Games',
  rtp decimal(5,2) DEFAULT 96.5,
  volatility text DEFAULT 'medium',
  min_bet integer DEFAULT 1,
  max_bet integer DEFAULT 100,
  minutes_per_play integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

-- Game scores
CREATE TABLE IF NOT EXISTS game_scores (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  game_id integer REFERENCES games(id) ON DELETE CASCADE,
  score integer NOT NULL,
  minutes_spent integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

-- Game sessions for tracking
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  game_id integer REFERENCES games(id) ON DELETE CASCADE,
  start_time timestamptz DEFAULT now(),
  end_time timestamptz,
  total_score integer DEFAULT 0,
  minutes_spent integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Global leaderboard
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  username text,
  total_score integer DEFAULT 0,
  rank integer,
  updated_at timestamptz DEFAULT now()
);

-- Achievements system
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT 'trophy',
  rarity text DEFAULT 'common',
  condition_type text NOT NULL,
  condition_value integer NOT NULL,
  points_reward integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- User achievements progress
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view any profile" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Games policies
CREATE POLICY "Anyone can view games" ON games FOR SELECT TO anon, authenticated USING (true);

-- Game scores policies
CREATE POLICY "Users can view all scores" ON game_scores FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own scores" ON game_scores FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Game sessions policies
CREATE POLICY "Users can manage own sessions" ON game_sessions FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Leaderboard policies
CREATE POLICY "Anyone can view leaderboard" ON leaderboard FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users can update own leaderboard entry" ON leaderboard FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Anyone can view achievements" ON achievements FOR SELECT TO anon, authenticated USING (true);

-- User achievements policies
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own achievements" ON user_achievements FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, display_name, available_minutes)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    120
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaderboard_updated_at BEFORE UPDATE ON leaderboard FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample games
INSERT INTO games (name, slug, description, category, provider, rtp, volatility, minutes_per_play) VALUES
('Fortune Tiger', 'fortune-tiger', 'Junte-se ao poderoso tigre em uma jornada para a riqueza', 'slots', 'PG Soft', 96.8, 'high', 5),
('Crash', 'crash', 'Veja o multiplicador subir e saque antes que ele caia', 'crash', 'EXPIRE Games', 97.3, 'high', 3),
('Roleta Europeia', 'roulette', 'Experimente o clássico jogo de cassino', 'table', 'EXPIRE Games', 97.3, 'medium', 4),
('Sweet Bonanza', 'sweet-bonanza', 'Delicie-se neste caça-níqueis com tema de doces', 'slots', 'Pragmatic Play', 96.5, 'high', 5),
('Mines', 'mines', 'Limpe o campo sem atingir nenhuma mina', 'dice', 'EXPIRE Games', 97.0, 'high', 3),
('Blackjack', 'blackjack', 'Vença o dealer com uma mão melhor', 'card', 'EXPIRE Games', 99.5, 'low', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample achievements
INSERT INTO achievements (title, description, condition_type, condition_value, rarity, points_reward) VALUES
('Primeiro Passo', 'Jogue seu primeiro jogo', 'games_played', 1, 'common', 50),
('Viciado em Jogos', 'Jogue 10 jogos diferentes', 'games_played', 10, 'rare', 200),
('Pontuação Alta', 'Alcance 1000 pontos em um único jogo', 'single_score', 1000, 'epic', 500),
('Mestre dos Slots', 'Jogue slots 50 vezes', 'category_plays', 50, 'legendary', 1000),
('Dedicação', 'Jogue por 7 dias consecutivos', 'consecutive_days', 7, 'rare', 300),
('Colecionador', 'Ganhe 10000 pontos no total', 'total_score', 10000, 'epic', 750)
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_game_id ON game_scores(game_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);