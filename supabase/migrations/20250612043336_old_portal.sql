/*
  # Add available_minutes column to profiles table

  1. Changes
    - Add `available_minutes` column to `profiles` table with default value of 120 (2 hours)
    - Set up proper indexing for performance
    
  2. Security
    - Column will inherit existing RLS policies from profiles table
*/

-- Add available_minutes column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'available_minutes'
  ) THEN
    ALTER TABLE profiles ADD COLUMN available_minutes integer DEFAULT 120;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_available_minutes ON profiles(available_minutes);

-- Update existing profiles to have the default minutes if they don't have a value
UPDATE profiles 
SET available_minutes = 120 
WHERE available_minutes IS NULL;