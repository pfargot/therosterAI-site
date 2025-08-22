-- Supabase Database Setup for Roster.AI
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS dates ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dates table
CREATE TABLE IF NOT EXISTS dates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  chemistry_rating INTEGER CHECK (chemistry_rating >= 1 AND chemistry_rating <= 10),
  attraction_rating INTEGER CHECK (attraction_rating >= 1 AND attraction_rating <= 10),
  vibe_check TEXT CHECK (vibe_check IN ('amazing', 'good', 'meh', 'bad', 'terrible')),
  emotional_impact TEXT CHECK (emotional_impact IN ('energized', 'happy', 'comfortable', 'neutral', 'anxious', 'drained')),
  conversation_quality TEXT CHECK (conversation_quality IN ('flowing', 'good', 'awkward', 'forced', 'nonexistent')),
  notes TEXT,
  profile_image TEXT,
  image_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_dates_user_id ON dates(user_id);
CREATE INDEX IF NOT EXISTS idx_dates_created_at ON dates(created_at DESC);

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Create RLS policies for dates table
CREATE POLICY "Users can view their own dates" ON dates
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own dates" ON dates
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own dates" ON dates
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own dates" ON dates
  FOR DELETE USING (auth.uid()::text = user_id);

-- Insert some sample data for testing (optional)
-- INSERT INTO users (id, email, username, first_name, last_name, password, created_at) VALUES
--   ('user-1755905716281', 'test@example.com', 'testuser', 'Test', 'User', '$2a$12$hashedpassword', NOW());

-- INSERT INTO dates (id, user_id, name, rating, chemistry_rating, attraction_rating, vibe_check, emotional_impact, conversation_quality, notes, created_at) VALUES
--   ('date-1', 'user-1755905716281', 'Sample Date', 8, 9, 7, 'amazing', 'energized', 'flowing', 'Great conversation and chemistry!', NOW());

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated; 