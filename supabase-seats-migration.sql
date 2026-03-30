-- Family Seats System
create table if not exists seats (
  id               uuid default gen_random_uuid() primary key,
  owner_user_id    uuid references auth.users(id) on delete cascade not null,
  package_id       text not null,
  invite_email     text,
  invite_token     text unique,
  invite_sent_at   timestamptz,
  member_user_id   uuid references auth.users(id) on delete set null,
  member_name      text,
  accepted_at      timestamptz,
  created_at       timestamptz default now() not null
);
alter table seats enable row level security;
create policy "Owners can read their seats" on seats for select using (auth.uid() = owner_user_id);
create policy "Owners can insert seats" on seats for insert with check (auth.uid() = owner_user_id);
create policy "Owners can update their seats" on seats for update using (auth.uid() = owner_user_id);
create policy "Members can read their own seat" on seats for select using (auth.uid() = member_user_id);
create index if not exists seats_owner_idx on seats(owner_user_id);
create index if not exists seats_token_idx on seats(invite_token);
create index if not exists seats_member_idx on seats(member_user_id);
