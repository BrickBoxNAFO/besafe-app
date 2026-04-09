-- Create music_purchases table for tracking music download purchases
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS music_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT,
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  region TEXT DEFAULT 'US',
  purchased_at TIMESTAMPTZ DEFAULT now(),

  -- One purchase per user per product
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE music_purchases ENABLE ROW LEVEL SECURITY;

-- Users can read their own purchases
CREATE POLICY "Users can read own music purchases"
  ON music_purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert (via webhook)
CREATE POLICY "Service role can insert music purchases"
  ON music_purchases FOR INSERT
  WITH CHECK (true);

-- Index for quick lookups
CREATE INDEX idx_music_purchases_user ON music_purchases(user_id);
