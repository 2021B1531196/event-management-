/*
  # Initial Schema Setup for Virtual Event Platform

  1. New Tables
    - users (managed by Supabase Auth)
    - events
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - category (text)
      - start_time (timestamptz)
      - end_time (timestamptz)
      - location (text)
      - cover_image (text)
      - price (numeric)
      - featured (boolean)
      - created_at (timestamptz)
      - user_id (uuid, foreign key)
    - registrations
      - id (uuid, primary key)
      - event_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamptz)
    - chat_messages
      - id (uuid, primary key)
      - event_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - content (text)
      - created_at (timestamptz)
    - questions
      - id (uuid, primary key)
      - event_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - content (text)
      - votes (integer)
      - answered (boolean)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text NOT NULL DEFAULT 'Virtual',
  cover_image text,
  price numeric NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  votes integer NOT NULL DEFAULT 0,
  answered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Public events are viewable by everyone"
  ON events
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
  ON events
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
  ON events
  FOR DELETE
  USING (auth.uid() = user_id);

-- Registrations policies
CREATE POLICY "Users can view registrations for their events"
  ON registrations
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM events WHERE id = registrations.event_id
    ) OR
    auth.uid() = user_id
  );

CREATE POLICY "Users can register for events"
  ON registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own registrations"
  ON registrations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view chat messages for events they're registered for"
  ON chat_messages
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM registrations WHERE event_id = chat_messages.event_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM events WHERE id = chat_messages.event_id
    )
  );

CREATE POLICY "Users can send chat messages for events they're registered for"
  ON chat_messages
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM registrations WHERE event_id = chat_messages.event_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM events WHERE id = chat_messages.event_id
    )
  );

-- Questions policies
CREATE POLICY "Everyone can view questions"
  ON questions
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create questions"
  ON questions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions"
  ON questions
  FOR UPDATE
  USING (auth.uid() = user_id);