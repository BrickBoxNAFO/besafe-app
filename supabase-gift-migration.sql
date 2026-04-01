-- Gift purchases table
-- Run this in your Supabase SQL Editor

create table if not exists gift_purchases (
  id uuid default gen_random_uuid() primary key,
  token uuid not null unique,
  package_id text not null,
  recipient_email text not null,
  recipient_name text,
  gifter_name text not null,
  stripe_session_id text,
  redeemed boolean default false not null,
  redeemed_by uuid references auth.users(id),
  redeemed_at timestamptz,
  created_at timestamptz default now() not null
);

alter table gift_purchases enable row level security;

-- Only service role (API routes) can read/write gift purchases
-- No public RLS policies needed as all operations go through API routes

create index if not exists gift_purchases_token_idx on gift_purchases(token);
create index if not exists gift_purchases_recipient_email_idx on gift_purchases(recipient_email);