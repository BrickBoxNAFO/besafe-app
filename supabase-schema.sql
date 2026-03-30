-- ============================================================
-- The Be Safe Group — Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com > SQL Editor)
-- ============================================================

-- Stores completed purchases (one row per package per user)
create table if not exists purchases (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references auth.users(id) on delete cascade not null,
  package_id       text not null,
  stripe_payment_intent text,
  purchased_at     timestamptz default now() not null,
  unique(user_id, package_id)
);

-- Stores lesson-level progress for each user
create table if not exists progress (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references auth.users(id) on delete cascade not null,
  course_id        text not null,
  lesson_index     int not null,
  passed           boolean default false,
  score            int,
  completed_at     timestamptz default now(),
  unique(user_id, course_id, lesson_index)
);

-- Enable Row Level Security
alter table purchases enable row level security;
alter table progress enable row level security;

-- RLS Policies: users can only see and modify their own data
create policy "Users can read own purchases"
  on purchases for select
  using (auth.uid() = user_id);

create policy "Users can insert own purchases"
  on purchases for insert
  with check (auth.uid() = user_id);

create policy "Users can read own progress"
  on progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on progress for update
  using (auth.uid() = user_id);

-- Allow service role (webhook) to insert purchases on behalf of users
-- This is handled by the SUPABASE_SERVICE_ROLE_KEY in the webhook,
-- which bypasses RLS automatically.

-- Index for fast lookups
create index if not exists purchases_user_id_idx on purchases(user_id);
create index if not exists progress_user_course_idx on progress(user_id, course_id);
