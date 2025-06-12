/*
  # Fix profiles RLS policy

  1. Security Changes
    - Add INSERT policy for profiles table to allow users to create their own profile
    - Ensure users can only create profiles for themselves
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile" 
  ON profiles 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);